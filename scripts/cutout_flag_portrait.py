"""Cut the flag portrait out of its white background for the home page "nation" band.

Trims the flag's left blue border (the client's crop), then removes only the white background and the
white notch triangle (background showing between the flag's two pennants). Keeps the whole flag in its
original colours: red, its blue border on the right-hand edges, and the white moon and sun; and him,
including his white shirt.

Writes public/images/badri/nepal-flag-cutout.webp (and -md) with an alpha channel, and prints the
flag's average red so the page can shade its background to match.

Run: python scripts/cutout_flag_portrait.py
"""
import os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = os.path.join(os.path.dirname(__file__), '..', 'source-photos', '54EE0F31-2E8D-44F2-B249-5BB4DD498B17.JPG.jpeg')
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'badri', 'nepal-flag-cutout')

im = Image.open(SRC).convert('RGB')
# Trim the flag's left blue border (the client's crop: 25px on the 700px preview = 63px here), so the
# flag's red runs to the image edge and can flow straight into the red field behind it.
im = im.crop((63, 0, im.width, im.height))
a = np.asarray(im).astype(np.int16)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
H, W = r.shape

blue = (b > r + 45) & (b > g + 20)                       # the flag's border
red = (r > 150) & (r - np.maximum(g, b) > 70)             # the flag's crimson (strict: no purple fringe)
purple = (r - g > 40) & (b - g > 40)                      # red/blue anti-aliasing along the border
whiteish = (r > 205) & (g > 205) & (b > 205) & (np.abs(r - b) < 30)
# Light, slightly blue-tinted background (the notch triangle, the line along the top diagonal).
# Limited to the upper 75% of the photo so his light-blue jeans at the bottom are not caught; his
# white shirt is restored below because it is enclosed by his jacket.
yy = np.arange(H)[:, None]
whiteish |= (r > 180) & (g > 185) & (b > 195) & (b >= r) & (yy < H * 0.75)

# Build what to KEEP rather than what to remove.
# 1) The flag (red + blue border) with interior holes filled, which brings in the moon and sun but not
#    the notch triangle (open to the background).
flag_px = red | blue | purple                        # the flag including its blue border
flag = ndimage.binary_fill_holes(ndimage.binary_closing(flag_px, iterations=2))
flag = ndimage.binary_erosion(flag, iterations=1)
# 2) Him: the largest region that is not background white, blue, red or fringe; holes filled so his
#    shirt and buttons are included; trimmed 1px against the white background halo.
other = ~(whiteish | blue | red | purple)
# Opening removes thin structures: the few-pixel anti-aliased outlines tracing the blue bands, which
# would otherwise join his outline and fence in the notch triangle.
other = ndimage.binary_opening(other, iterations=6)
lab, n = ndimage.label(other)
sizes = ndimage.sum(other, lab, range(1, n + 1))
him0 = ndimage.binary_closing(lab == (int(np.argmax(sizes)) + 1), iterations=3)
# Fill only the holes surrounded entirely by him (his shirt, buttons), not gaps he shares with the
# flag (the notch triangle is bordered by his jacket on one side and the flag on the others).
holes = ndimage.binary_fill_holes(him0) & ~him0
hl, hn = ndimage.label(holes)
him = him0.copy()
for i in range(1, hn + 1):
    h = hl == i
    ring = ndimage.binary_dilation(h, iterations=4) & ~h
    if (ring & him0).sum() >= 0.9 * ring.sum():
        him |= h
him = ndimage.binary_erosion(him, iterations=1)
keep = flag | him
# A light feather on both outlines, so neither reads as a hard sticker edge.
flag_a = np.asarray(Image.fromarray(np.where(flag & ~him, 255, 0).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.6)))
him_a = np.asarray(Image.fromarray(np.where(him, 255, 0).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.6)))
alpha_img = Image.fromarray(np.maximum(flag_a, him_a).astype(np.uint8))
cut = ~keep

flag_red = a[red & ~cut].mean(axis=0)
print('flag red (avg sRGB):', [int(x) for x in flag_red], '#%02x%02x%02x' % tuple(int(x) for x in flag_red))

# Near the trimmed left edge, the flag's blue top border fades into the flag's red, so on the page it
# emerges out of the red band instead of starting at a cut. The right-hand blue edges are untouched.
rgb = a.astype(np.float32)
fr = np.array(red_rgb := a[red].mean(axis=0), dtype=np.float32)
xs = np.arange(W, dtype=np.float32)[None, :]
t = np.clip(xs / (W * 0.22), 0, 1)
w = (1 - t * t * (3 - 2 * t))                                   # smoothstep: 1 at the edge, 0 by 22% across
bluish = (blue | purple).astype(np.float32)
bluish = np.asarray(Image.fromarray((bluish * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(3))) / 255.0
k = (w * bluish)[..., None]
rgb = rgb * (1 - k) + fr * k
im = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8))
rgba = im.copy(); rgba.putalpha(alpha_img)
# Trim fully transparent margins.
bbox = rgba.getbbox(); rgba = rgba.crop(bbox)
print('cropped to', rgba.size, 'from', im.size, 'bbox', bbox)
for edge, suffix in ((1600, ''), (900, '-md')):
    o = rgba.copy(); o.thumbnail((edge, edge), Image.LANCZOS)
    o.save(OUT + suffix + '.webp', 'WEBP', quality=86, method=6)
    print('wrote', os.path.basename(OUT + suffix + '.webp'), o.size, os.path.getsize(OUT + suffix + '.webp') // 1024, 'KB')

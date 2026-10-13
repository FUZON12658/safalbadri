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
# Trim the flag's left blue border (the client's crop: 25px on the 700px preview = 63px here) plus the
# ~20px over which the border's soft edge still tints the red blue, so clean red runs to the image edge.
im = im.crop((84, 0, im.width, im.height - 30))   # a little past the border, and above the sliver of the flag's bottom border
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
alpha_np = np.maximum(flag_a, him_a).astype(np.uint8)
# No feather along the trimmed left border: there the flag must meet the page's red pixel-perfect.
alpha_np[:, :10] = alpha_np[:, 10:11]
# Nor along the bottom: the flag's red and his jacket run solid to the bottom of the band.
alpha_np[-10:, :] = alpha_np[-11:-10, :]
alpha_img = Image.fromarray(alpha_np)
cut = ~keep

flag_red = a[red & ~cut].mean(axis=0)
print('flag red (avg sRGB):', [int(x) for x in flag_red], '#%02x%02x%02x' % tuple(int(x) for x in flag_red))

# Clean the flag's top border. In the photo it is slightly out of focus; the page continues it as a crisp
# CSS shape, so the two must match. Redraw it as a crisp band on the same line, same thickness and colour,
# everywhere it is not covered by him. (Position and colours are the photo's own; only the blur goes.)
BLUE = np.array([24, 60, 140], dtype=np.float32)
top_y = np.full(W, -1)
for x in range(W):
    col = np.nonzero(flag[:, x])[0]
    if len(col): top_y[x] = col[0]
fit_x = np.arange(int(W * 0.05), int(W * 0.40))
k_, b_ = np.polyfit(fit_x, top_y[fit_x], 1)
tv_ = []
for x in fit_x[::8]:
    yy = np.nonzero(blue[:, x])[0]
    yy = yy[(yy > k_ * x + b_ - 20) & (yy < k_ * x + b_ + 200)]
    if len(yy) > 3: tv_.append(yy[-1] - yy[0] + 1)
tv_ = float(np.median(tv_))
# the border runs along this line until the pennant's tip (where the flag's top edge leaves the line)
on_line = np.abs(top_y - (k_ * np.arange(W) + b_)) < 6
x_end = int(np.nonzero(on_line)[0].max())
yy_, xx_ = np.mgrid[0:H, 0:W].astype(np.float32)
dist = yy_ - (k_ * xx_ + b_)                      # vertical distance below the flag's top edge
zone = (xx_ <= x_end) & ~him
rgb_c = a.astype(np.float32)
below = np.roll(rgb_c, -90, axis=0)               # the flag's own red from further down, clear of the blur
in_blue = np.clip(dist + 0.5, 0, 1) * np.clip(tv_ - dist + 0.5, 0, 1)            # 1 inside the band, 1px anti-aliased
in_fix = np.clip(dist - tv_ + 0.5, 0, 1) * np.clip((tv_ + 60 - dist) / 12, 0, 1)   # 60px under the band (feathered out): blur residue -> red
wz = zone[..., None].astype(np.float32)
rgb_c = rgb_c * (1 - wz * in_fix[..., None]) + below * (wz * in_fix[..., None])
rgb_c = rgb_c * (1 - wz * in_blue[..., None]) + BLUE * (wz * in_blue[..., None])
a = np.clip(rgb_c, 0, 255).astype(np.int16)
im = Image.fromarray(a.astype(np.uint8))
# crisp outer edge too: nothing above the line, solid from the line down (within the zone)
edge_a = (np.clip(dist + 0.5, 0, 1) * 255).astype(np.uint8)
alpha_np = np.where(zone & (dist < tv_ + 60), np.where(flag | (dist >= -1), edge_a, alpha_np), alpha_np).astype(np.uint8)
alpha_np[:, :10] = alpha_np[:, 10:11]
alpha_img = Image.fromarray(alpha_np)
print('top border: slope %.4f, thickness %.1fpx, cleaned to x=%d of %d' % (k_, tv_, x_end, W))
# the repainted pixels are red now: include them in what follows
r, g, b = a[..., 0], a[..., 1], a[..., 2]
red = (r > 150) & (r - np.maximum(g, b) > 70)

# The page draws the flag's red onward from the trimmed left edge as a flat colour (PAGE_RED). Nudge the
# photo's red toward exactly that colour near the edge (full correction at the edge, none by 30% across),
# so the two meet with no tone step. Only red pixels are touched; the shift is a few levels at most.
PAGE_RED = np.array([201, 51, 67], dtype=np.float32)
rgbf = a.astype(np.float32)
edge_mean = rgbf[:, :60][red[:, :60]].mean(axis=0)
xs_ = np.arange(W, dtype=np.float32)[None, :]
t_ = np.clip(xs_ / (W * 0.30), 0, 1)
w_ = (1 - t_ * t_ * (3 - 2 * t_))[..., None]
soft_red = np.asarray(Image.fromarray((red * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2)))[..., None] / 255.0
rgbf = rgbf + (PAGE_RED - edge_mean) * w_ * soft_red
im = Image.fromarray(np.clip(rgbf, 0, 255).astype(np.uint8))
print('photo red at left edge before correction:', edge_mean.round(1), '-> page red', PAGE_RED)
rgba = im.copy(); rgba.putalpha(alpha_img)
# Trim fully transparent margins.
bbox = rgba.getbbox(); rgba = rgba.crop(bbox)
print('cropped to', rgba.size, 'from', im.size, 'bbox', bbox)
for edge, suffix in ((1600, ''), (900, '-md')):
    o = rgba.copy(); o.thumbnail((edge, edge), Image.LANCZOS)
    o.save(OUT + suffix + '.webp', 'WEBP', quality=94, method=6)
    print('wrote', os.path.basename(OUT + suffix + '.webp'), o.size, os.path.getsize(OUT + suffix + '.webp') // 1024, 'KB')

# What the saved file actually decodes to at its left edge: the page's --flag-red must equal this.
d = np.asarray(Image.open(OUT + '.webp').convert('RGB')).astype(np.float32)
hh = d.shape[0]
print('decoded red at the left edge (set --flag-red to this):', d[int(hh * 0.25):int(hh * 0.95), :12].reshape(-1, 3).mean(axis=0).round(1))

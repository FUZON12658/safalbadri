"""Measure the flag cut-out and write its numbers into app/globals.css (the CSS that continues the flag).

Run after scripts/cutout_flag_portrait.py:  python scripts/sync_flag_css.py
"""
import os, re
import numpy as np
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..')
im = Image.open(os.path.join(ROOT, 'public/images/badri/nepal-flag-cutout.webp')); W, H = im.size
a = np.asarray(im).astype(int); r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]
xs = np.arange(int(W * 0.05), int(W * 0.40), 4)
ys = np.array([np.nonzero(al[:, x] > 128)[0][0] for x in xs])
k, b0 = np.polyfit(xs, ys, 1)                                   # the flag's top edge: y = k x + b0
blue = (b > r + 45) & (b > g + 20) & (al > 200)
tv = []
for x in xs:
    yy = np.nonzero(blue[:int(H * 0.5), x])[0]
    if len(yy) > 3: tv.append(yy[yy < yy[0] + 200][-1] - yy[0] + 1)
t = float(np.median(tv)) / H                                    # border thickness, vertical, as a fraction of height
core = blue & (b > r + 90)
bl = a[core][:, :3].mean(0).round().astype(int)
red = a[int(H * 0.25):int(H * 0.95), :12, :3].reshape(-1, 3).mean(0).round().astype(int)
print(f'{W}x{H}  slope {k:.4f}  top edge at x=0: {b0:.1f}px  border {t * 100:.2f}% of height  blue {tuple(bl)}  edge red {tuple(red)}')

p = os.path.join(ROOT, 'app/globals.css'); s = open(p, encoding='utf-8').read()
s = re.sub(r'--k: [\d.]+;', f'--k: {k:.4f};', s, count=1)
s = re.sub(r'(--y0: calc\(var\(--nh\) \* 0\.4 \+ var\(--nh\) \* 0\.86 \* )-?[\d.]+( / 1600\);)', rf'\g<1>{b0:.1f}\g<2>', s, count=1)
s = re.sub(r'(--bt: calc\(var\(--nh\) \* 0\.86 \* )[\d.]+(\);)', rf'\g<1>{t:.4f}\g<2>', s, count=1)
s = re.sub(r'--flag-red: rgb\(\d+ \d+ \d+\);', f'--flag-red: rgb({red[0]} {red[1]} {red[2]});', s, count=1)
s = re.sub(r'--flag-blue: rgb\(\d+ \d+ \d+\);', f'--flag-blue: rgb({bl[0]} {bl[1]} {bl[2]});', s, count=1)
open(p, 'w', encoding='utf-8').write(s)
h = os.path.join(ROOT, 'components/pages/HomePage.tsx'); t2 = open(h, encoding='utf-8').read()
t2 = re.sub(r'(nepal-flag-cutout\.webp" alt=\{t\.nation\.alt\} loading="lazy" width=\{)\d+(\} height=\{)\d+(\} />)', rf'\g<1>{W}\g<2>{H}\g<3>', t2, count=1)
open(h, 'w', encoding='utf-8').write(t2)

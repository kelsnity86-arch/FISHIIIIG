"""칸 없는 줄·대화창·통일한 아이콘을 자른다 (#408~#414).
  ui_rows_plain → h_row_plain · h_row_locked_plain      ui_talk2 → ui_talk
  ic_hud        → ui_ic_book · ui_ic_skill · ui_ic_map · ui_ic_harbor · ui_ic_gear
  ic_gear_a/b   → h_rod_N · h_line_N · h_reel_N · h_boat_N · h_outfit_N (1~8)
  ic_rows       → h_skill_1~3 · ic_skin · ic_gen · ic_up_<가게> · ic_up_hall · ic_town · ic_lock
  ic_settings   → st_<이름> 10개

python3 tools/slice_icons.py
"""
from pathlib import Path
import json
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RAW, OUT = ROOT / 'assets' / 'raw', ROOT / 'assets' / 'game'


def fit(im, px):
    k = min(1, px / max(im.size)); return im if k == 1 else im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)


def runs(on, gap):
    out = []; start = last = None
    for i, v in enumerate(on):
        if not v: continue
        if start is None: start = i
        elif i - last > gap: out.append((start, last + 1)); start = i
        last = i
    if start is not None: out.append((start, last + 1))
    return out


def grid(src, counts, th=60):
    """줄마다 같은 폭의 칸으로 나눈 뒤 칸 안의 그림만 오려 낸다 (그림에 딸린 작은 조각 — 화살표·떨림 표시 — 이 떨어져 나가지 않는다)"""
    a = np.array(Image.open(RAW / (src + '.png')).convert('RGBA')); m = a[..., 3] > th
    H, W = m.shape; rows = len(counts); cols = max(counts); out = []
    for r, n in enumerate(counts):
        y0, y1 = H * r // rows, H * (r + 1) // rows
        for c in range(n):
            x0, x1 = W * c // cols, W * (c + 1) // cols
            ys, xs = np.nonzero(m[y0:y1, x0:x1]); assert len(ys), (src, r, c)
            out.append(Image.fromarray(a[y0 + ys.min():y0 + ys.max() + 1, x0 + xs.min():x0 + xs.max() + 1]))
    return out


def bands(src, n, th=60):
    a = np.array(Image.open(RAW / (src + '.png')).convert('RGBA')); m = a[..., 3] > th
    bs = runs(m.any(axis=1), 12); assert len(bs) == n, (src, len(bs)); out = []
    for y0, y1 in bs:
        xs = np.nonzero(m[y0:y1].any(axis=0))[0]; out.append(Image.fromarray(a[y0:y1, xs.min():xs.max() + 1]))
    return out


def pack(items, file, manifest, width=2048, pad=2):
    x = y = rowh = 0; places = []
    for name, im in sorted(items, key=lambda t: -t[1].height):
        if x + im.width + pad > width: x, y, rowh = 0, y + rowh + pad, 0
        places.append((name, im, x, y)); x += im.width + pad; rowh = max(rowh, im.height)
    atlas = Image.new('RGBA', (width, y + rowh + pad), (0, 0, 0, 0))
    for name, im, px, py in places:
        atlas.paste(im, (px, py)); manifest[name] = dict(atlas=file, ax=px, ay=py, w=im.width, h=im.height, smooth=True)
    atlas.save(OUT / file, 'WEBP', quality=92, method=4)
    print(f'{file}: {len(places)}개, {atlas.size[0]}x{atlas.size[1]}')


mf = OUT / 'manifest.json'; doc = json.loads(mf.read_text()); manifest = doc['sprites']
big, ic = [], []
for n, im in zip(['h_row_plain', 'h_row_locked_plain'], bands('ui_rows_plain', 2)): big.append((n, fit(im, 1400)))
a = np.array(Image.open(RAW / 'ui_talk2.png').convert('RGBA')); ys, xs = np.nonzero(a[..., 3] > 60)
big.append(('ui_talk', fit(Image.fromarray(a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]), 1700)))
for n, im in zip(['ui_ic_book', 'ui_ic_skill', 'ui_ic_map', 'ui_ic_harbor', 'ui_ic_gear'], grid('ic_hud', [5])): big.append((n, fit(im, 300)))
pack(big, 'ui_rows.webp', manifest)
for n, im in zip([f'h_{k}_{t}' for k in ('rod', 'line', 'reel') for t in range(1, 9)], grid('ic_gear_a', [8, 8, 8])): ic.append((n, fit(im, 200)))
for n, im in zip([f'h_{k}_{t}' for k in ('boat', 'outfit') for t in range(1, 9)], grid('ic_gear_b', [8, 8])): ic.append((n, fit(im, 200)))
for n, im in zip(['h_skill_1', 'h_skill_2', 'h_skill_3', 'ic_skin', 'ic_gen', 'ic_up_market', 'ic_up_tackle', 'ic_up_yard', 'ic_up_tailor', 'ic_up_guild', 'ic_up_hall', 'ic_town', 'ic_lock'], grid('ic_rows', [5, 5, 3])): ic.append((n, fit(im, 220)))
for n, im in zip(['st_' + k for k in ('mus', 'sfx', 'amb', 'res', 'qual', 'vibe', 'lang', 'resume', 'set', 'quit')], grid('ic_settings', [5, 5])): ic.append((n, fit(im, 220)))
pack(ic, 'ui_icons.webp', manifest)
mf.write_text(json.dumps(doc, indent=1, ensure_ascii=False) + '\n')

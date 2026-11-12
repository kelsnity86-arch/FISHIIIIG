"""태초의 바다 그림을 게임용으로 자른다: 생물 24종(p_fish_a~d), 하늘·물속(c_sky_9·c_sea_9), 해도 표식(map_pin_9),
태초 등급 카드 틀(ui_card_7), 손저울을 든 생선 장수(h_npc_market).
(태초의 차림 — 찌·목도리·낚싯대·게이지 틀·배 — 은 tools/slice_gear.py 가 자른다.)

python3 tools/slice_primal.py
"""
from pathlib import Path
import json, re, sys
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RAW, OUT = ROOT / 'assets' / 'raw', ROOT / 'assets' / 'game'
sys.path.insert(0, str(ROOT / 'tools'))
from slice_port import bbox, cells, inner_empty, longest          # noqa: E402

# 한 장에 여섯 마리씩, 왼쪽에서 오른쪽으로·위에서 아래로 (주문서의 차례)
SHEETS = {
    'a': ['anchovy', 'mackerel', 'goby', 'shrimp', 'filefish', 'flounder'],
    'b': ['crab', 'bream', 'puffer', 'flying', 'squid', 'butterfly'],
    'c': ['seahorse', 'octopus', 'eel', 'manta', 'sturgeon', 'turtle'],
    'd': ['dolphin', 'tuna', 'marlin', 'sunfish', 'shark', 'whale'],
}


OLD_MARKET_H_PER_W = 398 / 300       # 예전 생선 장수 그림(물고기를 안은 것)의 높이/폭


def rgba(name): return np.array(Image.open(RAW / (name + '.png')).convert('RGBA'))
def fit(im, px):
    k = min(1, px / max(im.size)); return im if k == 1 else im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)


def run(manifest):
    keys = re.findall(r"^  \['[^']+',\s*'(\w+)'", (ROOT / 'src' / 'primal.js').read_text(), re.M)
    items = []
    for letter, names in SHEETS.items():
        if not (RAW / f'p_fish_{letter}.png').exists(): continue
        for key, piece in zip(names, cells(rgba(f'p_fish_{letter}'), 2, 3)):
            assert key in keys, key
            im = fit(Image.fromarray(piece), 480); items.append(('p_' + key, im, dict(w=im.width, h=im.height, smooth=True)))
    print('생물', len(items), '종. 빠진 것:', [k for k in keys if 'p_' + k not in [n for n, _, _ in items]])
    if (RAW / 'map_pin_9.png').exists():
        a = rgba('map_pin_9'); x0, y0, x1, y1 = bbox(a[..., 3] > 40); im = fit(Image.fromarray(a[y0:y1, x0:x1]), 220)
        items.append(('map_pin_9', im, dict(w=170, h=round(170 * im.height / im.width), smooth=True)))
    if (RAW / 'ui_card_7.png').exists():
        a = rgba('ui_card_7'); x0, y0, x1, y1 = bbox(a[..., 3] > 40); p = a[y0:y1, x0:x1]; H, W = p.shape[:2]
        hole = inner_empty(p); ys, xs = np.nonzero(hole)                       # 그림 창 = 틀에 둘러싸인 빈 곳
        win = [xs.min() / W, ys.min() / H, (xs.max() + 1) / W, (ys.max() + 1) / H]
        # 이름 칸·값 칸: 창 아래의 밝은 양피지 띠 두 줄. 가운데 세로줄에서 밝은 구간을 찾는다
        P = p.astype(int); lum = P[..., :3].sum(axis=2) / 3; col = lum[:, W // 2 - 20:W // 2 + 20].mean(axis=1); y = ys.max() + 4; bands = []
        light = col > 205
        while y < H and len(bands) < 2:
            if light[y]:
                y1b = y
                while y1b < H and light[y1b]: y1b += 1
                if y1b - y > H * 0.04: bands.append((y, y1b))
                y = y1b
            else: y += 1
        plates = []
        for b0, b1 in bands:
            row = lum[(b0 + b1) // 2] > 205; l, r = longest(row); plates.append([l / W, b0 / H, r / W, b1 / H])
        im = fit(Image.fromarray(p), 520)
        items.append(('ui_card_7', im, dict(w=480, h=round(480 * H / W), smooth=True)))
        print('ui_card_7 칸 자리: win', [round(v, 3) for v in win], 'name', [round(v, 3) for v in plates[0]], 'stat', [round(v, 3) for v in plates[1]])
    if (RAW / 'h_npc_market.png').exists():
        a = rgba('h_npc_market'); x0, y0, x1, y1 = bbox(a[..., 3] > 40); im = fit(Image.fromarray(a[y0:y1, x0:x1]), 400)
        # 키를 예전 그림과 같게 보이도록: 그릴 폭(dw) = 104 × (새 그림의 폭/높이) ÷ (예전 그림의 폭/높이)
        items.append(('h_npc_market', im, dict(w=im.width, h=im.height, smooth=True, dw=round(104 * (im.width / im.height) * (OLD_MARKET_H_PER_W), 2))))
    x = y = rowh = 0; places = []
    for name, im, meta in sorted(items, key=lambda t: -t[1].height):
        if x + im.width + 2 > 2048: x, y, rowh = 0, y + rowh + 2, 0
        places.append((name, im, meta, x, y)); x += im.width + 2; rowh = max(rowh, im.height)
    atlas = Image.new('RGBA', (2048, y + rowh + 2), (0, 0, 0, 0))
    for name, im, meta, px, py in places:
        atlas.paste(im, (px, py)); manifest[name] = dict(atlas='primal.webp', ax=px, ay=py, pw=im.width, ph=im.height, **meta)
    atlas.save(OUT / 'primal.webp', 'WEBP', quality=92, method=4)
    print(f'primal.webp: {len(places)}개, {atlas.size}')
    # 하늘·물속: 다른 해역과 같은 방식 (물속은 위쪽 수면 일렁임 20%를 잘라 낸다)
    for kind, top in (('sky', 0.0), ('sea', 0.2)):
        p = RAW / f'c_{kind}_9.png'
        if not p.exists(): continue
        im = Image.open(p).convert('RGB'); im = im.crop((0, round(im.height * top), im.width, im.height))
        if im.width > 1920: im = im.resize((1920, round(im.height * 1920 / im.width)), Image.LANCZOS)
        im.save(OUT / f'c_{kind}_9.webp', 'WEBP', quality=88, method=4)
        manifest[f'c_{kind}_9'] = dict(file=f'c_{kind}_9.webp', w=640, h=round(640 * im.height / im.width, 2), smooth=True)
        print(f'c_{kind}_9', manifest[f'c_{kind}_9'])


if __name__ == '__main__':
    mf = OUT / 'manifest.json'
    m = json.loads(mf.read_text())['sprites']
    run(m)
    mf.write_text(json.dumps(dict(sprites=m), indent=1, ensure_ascii=False) + '\n')

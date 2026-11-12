"""해역 배경, 화면 UI, 항구 그림(assets/raw/c_sky_N · c_sea_N · ui2_* · h_*)을 게임용으로 자른다.
조각이 여럿인 그림은 떨어져 있는 덩어리를 찾아 위→아래, 왼→오 순서로 이름을 붙이고, 묶음 그림(atlas) 한 장에 담는다.

python3 tools/slice_ui.py
"""
from pathlib import Path
import json
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RAW, OUT = ROOT / 'assets' / 'raw', ROOT / 'assets' / 'game'


def pieces(a, n, cell=4, grow=1, min_area=0.0015):
    """투명 배경 위에 떨어져 있는 덩어리 n개를 찾는다 (작은 반짝이·물방울은 가까운 덩어리에 붙는다)"""
    m = a[..., 3] > 24
    H, W = m.shape
    h, w = H // cell, W // cell
    small = m[:h * cell, :w * cell].reshape(h, cell, w, cell).any(axis=(1, 3))
    for _ in range(grow):
        g = small.copy(); g[1:] |= small[:-1]; g[:-1] |= small[1:]; g[:, 1:] |= small[:, :-1]; g[:, :-1] |= small[:, 1:]; small = g
    lab = -np.ones((h, w), int); boxes = []
    for y in range(h):
        for x in range(w):
            if not small[y, x] or lab[y, x] >= 0: continue
            st = [(y, x)]; lab[y, x] = len(boxes); x0 = x1 = x; y0 = y1 = y; cnt = 0
            while st:
                cy, cx = st.pop(); cnt += 1
                x0, x1, y0, y1 = min(x0, cx), max(x1, cx), min(y0, cy), max(y1, cy)
                for ny, nx in ((cy + 1, cx), (cy - 1, cx), (cy, cx + 1), (cy, cx - 1)):
                    if 0 <= ny < h and 0 <= nx < w and small[ny, nx] and lab[ny, nx] < 0: lab[ny, nx] = len(boxes); st.append((ny, nx))
            boxes.append([x0 * cell, y0 * cell, (x1 + 1) * cell, (y1 + 1) * cell, cnt])
    boxes.sort(key=lambda b: -b[4])
    big = boxes[:n]; rest = boxes[n:]
    for r in rest:                                   # 남은 조각은 가장 가까운 큰 덩어리에 합친다 (충분히 가까울 때만)
        if r[4] < 2: continue
        cx, cy = (r[0] + r[2]) / 2, (r[1] + r[3]) / 2
        d = [max(b[0] - cx, cx - b[2], 0) + max(b[1] - cy, cy - b[3], 0) for b in big]
        k = int(np.argmin(d))
        if d[k] < 60: b = big[k]; b[0], b[1], b[2], b[3] = min(b[0], r[0]), min(b[1], r[1]), max(b[2], r[2]), max(b[3], r[3])
    out = []
    for b in big:                                    # 덩어리마다 실제 그림 범위로 다듬는다
        sub = m[b[1]:b[3], b[0]:b[2]]; ys, xs = np.nonzero(sub)
        out.append((b[0] + xs.min(), b[1] + ys.min(), b[0] + xs.max() + 1, b[1] + ys.max() + 1))
    return out


def order(boxes, rows):
    """위→아래 rows 줄로 나누고, 줄 안에서 왼→오"""
    boxes = sorted(boxes, key=lambda b: (b[1] + b[3]) / 2)
    per = [len(boxes) // rows + (1 if i < len(boxes) % rows else 0) for i in range(rows)]
    out = []; i = 0
    for n in per:
        out += sorted(boxes[i:i + n], key=lambda b: b[0]); i += n
    return out


def cut(src, names, rows, maxw, **_):
    """격자 그림을 줄·칸으로 자른다. 칸 경계는 '그림이 가장 적게 걸리는 자리'로 잡는다
    (조각이 격자에서 조금 벗어나 있거나 서로 살짝 닿아 있어도 가장 가는 곳에서 갈라진다)."""
    a = np.array(Image.open(RAW / (src + '.png')).convert('RGBA'))
    m = a[..., 3] > 24
    H, W = m.shape; cols = len(names) // rows

    def cuts(prof, n):
        L = len(prof); out = [0]
        for i in range(1, n):
            c = i * L / n; r = L / n * 0.3
            lo, hi = int(c - r), int(c + r)
            seg = prof[lo:hi].astype(float) + np.abs(np.arange(lo, hi) - c) * 0.02      # 비슷하면 가운데에 가까운 쪽
            out.append(lo + int(np.argmin(seg)))
        return out + [L]

    res = []; ys = cuts(m.sum(axis=1), rows); k = 0
    for r in range(rows):
        band = m[ys[r]:ys[r + 1]]
        xs = cuts(band.sum(axis=0), cols)
        for c in range(cols):
            sub = band[:, xs[c]:xs[c + 1]]; yy, xx = np.nonzero(sub)
            box = (xs[c] + xx.min(), ys[r] + yy.min(), xs[c] + xx.max() + 1, ys[r] + yy.max() + 1)
            im = Image.fromarray(a[box[1]:box[3], box[0]:box[2]])
            if im.width > maxw: im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
            res.append((names[k], im)); k += 1
    return res


def pack(items, file, manifest, width=2048, pad=2):
    x = y = rowh = 0; places = []
    for name, im in sorted(items, key=lambda t: -t[1].height):
        if x + im.width + pad > width: x, y, rowh = 0, y + rowh + pad, 0
        places.append((name, im, x, y)); x += im.width + pad; rowh = max(rowh, im.height)
    atlas = Image.new('RGBA', (width, y + rowh + pad), (0, 0, 0, 0))
    for name, im, px, py in places:
        atlas.paste(im, (px, py))
        manifest[name] = dict(atlas=file, ax=px, ay=py, w=im.width, h=im.height, smooth=True)
    atlas.save(OUT / file, 'WEBP', quality=92, method=4)
    print(f'{file}: {len(places)}개, {atlas.size[0]}x{atlas.size[1]}')


def run(manifest):
    # 해역 배경: 하늘은 그대로, 물속은 위쪽의 수면 일렁임(올려다본 구도)을 잘라 낸다
    for n in range(2, 9):
        for kind, top in (('sky', 0.0), ('sea', 0.2)):
            p = RAW / f'c_{kind}_{n}.png'
            if (RAW / f'c_{kind}_{n}b.png').exists(): p = RAW / f'c_{kind}_{n}b.png'      # 숨은 흔적을 넣어 고친 그림이 있으면 그것을 쓴다
            if not p.exists(): continue
            im = Image.open(p).convert('RGB'); im = im.crop((0, round(im.height * top), im.width, im.height))
            if im.width > 1920: im = im.resize((1920, round(im.height * 1920 / im.width)), Image.LANCZOS)
            im.save(OUT / f'c_{kind}_{n}.webp', 'WEBP', quality=88, method=4)
            manifest[f'c_{kind}_{n}'] = dict(file=f'c_{kind}_{n}.webp', w=640, h=round(640 * im.height / im.width, 2), smooth=True)
    for n in range(1, 6):
        p = RAW / f'h_town_{n}.png'
        if not p.exists(): continue
        im = Image.open(p).convert('RGB'); im.save(OUT / f'h_town_{n}.webp', 'WEBP', quality=88, method=4)
        manifest[f'h_town_{n}'] = dict(file=f'h_town_{n}.webp', w=640, h=360, smooth=True)
    print('배경: 해역 2~8, 항구 5단계')

    SHOP = ['market', 'tackle', 'yard', 'tailor', 'guild', 'hall']
    ui = []
    ui += cut('ui2_gauge', ['ui_tension', 'ui_tension_fill', 'ui_power', 'ui_power_fill'], 4, 900)
    ui += cut('ui2_stamp', ['ui_stamp_new', 'ui_stamp_record', 'ui_ribbon2', 'ui_badge2'], 1, 320)
    ui += cut('ui2_hud', ['ui_plaque_gold', 'ui_plaque_hold', 'ui_btn', 'ui_btn_down', 'ui_ic_harbor', 'ui_ic_map', 'ui_ic_book', 'ui_ic_gear'], 2, 420)
    ui += cut('h_npc', ['h_npc_' + s for s in SHOP], 1, 300)
    ui += cut('h_panel', ['h_panel', 'h_row', 'h_row_locked', 'h_buy', 'h_buy_down', 'h_buy_off', 'h_close', 'h_ribbon', 'h_medal', 'h_bar', 'h_bar_fill'], 0, 1100) if False else []
    gear = cut('h_gear_a', [f'h_{k}_{t}' for k in ('rod', 'line', 'reel') for t in range(1, 9)], 3, 128)
    gear += cut('h_gear_b', [f'h_{k}_{t}' for k in ('boat', 'outfit') for t in range(1, 9)], 2, 128)
    gear += cut('h_skill', [f'h_skill_{i}' for i in range(1, 13)], 3, 128)
    pack(ui + gear, 'h_atlas.webp', manifest)

    # 가게 판: 조각의 배치가 격자가 아니라서 자리를 보고 이름을 붙인다
    a = np.array(Image.open(RAW / 'h_panel.png').convert('RGBA'))
    bs = sorted(pieces(a, 10, 4, 1), key=lambda b: (b[1] // 80, b[0]))
    names = ['h_panel', 'h_row', 'h_row_locked', 'h_buy', None, 'h_medal', 'h_close', 'h_ribbon', 'h_bar', 'h_bar_fill']
    panel = []
    for name, b in zip(names, bs):
        if name: panel.append((name, b)); continue
        # 눌린 단추와 꺼진 단추가 붙어 있다: 가운데 가장 가는 줄에서 가른다
        prof = (a[b[1]:b[3], b[0]:b[2], 3] > 24).sum(axis=1); h = len(prof)
        cuty = h // 3 + int(np.argmin(prof[h // 3: 2 * h // 3]))
        for nm, (y0, y1) in (('h_buy_down', (b[1], b[1] + cuty)), ('h_buy_off', (b[1] + cuty, b[3]))):
            ys, xs = np.nonzero(a[y0:y1, b[0]:b[2], 3] > 24)
            panel.append((nm, (b[0] + xs.min(), y0 + ys.min(), b[0] + xs.max() + 1, y0 + ys.max() + 1)))
    pack([(n, Image.fromarray(a[b[1]:b[3], b[0]:b[2]])) for n, b in panel], 'h_panel.webp', manifest)

    shops = []
    for n in range(1, 6):
        shops += cut(f'h_shops_{n}', [f'h_shop_{n}_{s}' for s in SHOP], 2, 300)
    pack(shops, 'h_shops.webp', manifest)
    big = cut('ui2_card', [f'ui_card_{i}' for i in range(1, 7)], 2, 520) + cut('ui2_caught', [f'ui_caught_{i}' for i in range(1, 7)], 3, 640)
    pack(big, 'ui_big.webp', manifest)

    # 이야기·도감·지도·숨은 흔적
    def blobs(src, names, rows_of, maxw):
        """빈 줄로 위→아래 띠를 나누고, 띠 안에서 빈 칸으로 왼→오 조각을 나눈다. rows_of = 띠마다 조각 수 (검사용)"""
        a = np.array(Image.open(RAW / (src + '.png')).convert('RGBA')); m = a[..., 3] > 40
        def runs(prof, gap):
            on = prof > 0; out = []; st = None; last = -99
            for k, v in enumerate(on):
                if v:
                    if st is None: st = k
                    last = k
                elif st is not None and k - last > gap: out.append((st, last + 1)); st = None
            if st is not None: out.append((st, last + 1))
            return [r for r in out if r[1] - r[0] > 12]
        out = []
        rows = runs(m.sum(axis=1), 5)
        assert len(rows) == len(rows_of), (src, '띠 수', len(rows), rows)
        for (y0, y1), n in zip(rows, rows_of):
            cols = runs(m[y0:y1].sum(axis=0), 10)
            assert len(cols) == n, (src, '조각 수', len(cols), n)
            for x0, x1 in cols:
                yy = np.nonzero(m[y0:y1, x0:x1].any(axis=1))[0]
                im = Image.fromarray(a[y0 + yy.min():y0 + yy.max() + 1, x0:x1]); mw = maxw.get(names[len(out)], maxw['*'])
                if im.width > mw: im = im.resize((mw, round(im.height * mw / im.width)), Image.LANCZOS)
                out.append((names[len(out)], im))
        return out
    extra = []
    if (RAW / 'ui_story.png').exists():
        extra += blobs('ui_story', ['ui_talk', 'ui_ff', 'ui_ff_down', 'ui_hand', 'ui_arrow'], [1, 1, 1, 1, 1], {'ui_talk': 1100, '*': 140})
    if (RAW / 'ui_dex.png').exists():
        extra += blobs('ui_dex', ['dex_book', 'dex_slot', 'dex_slot_off', 'dex_slot_on'] + [f'dex_fr_{i}' for i in range(1, 7)] + ['dex_tab', 'dex_tab_on', 'dex_prev', 'dex_next'],
                       [1, 3, 6, 2, 2], {'dex_book': 1180, '*': 150})
    if (RAW / 'ui_map_pins.png').exists():
        extra += cut('ui_map_pins', [f'map_pin_{i}' for i in range(1, 9)] + ['map_lock', 'map_boat', 'map_ring', 'map_token'], 3, 170)
    if (RAW / 'c_deep.png').exists():
        extra += cut('c_deep', [f'c_deep_{i}' for i in range(1, 9)], 2, 420)
    if (RAW / 'ui_relics.png').exists():
        extra += cut('ui_relics', [f'relic_{i}' for i in range(1, 13)], 3, 200)
    if extra: pack(extra, 'ui_extra.webp', manifest)
    if (RAW / 'ui_map.png').exists():
        im = Image.open(RAW / 'ui_map.png').convert('RGB').resize((1280, 720), Image.LANCZOS); im.save(OUT / 'ui_map.webp', 'WEBP', quality=88, method=4)
        manifest['ui_map'] = dict(file='ui_map.webp', w=640, h=360, smooth=True)


if __name__ == '__main__':
    mf = OUT / 'manifest.json'
    m = json.loads(mf.read_text())['sprites']
    run(m)
    mf.write_text(json.dumps(dict(sprites=m), indent=1, ensure_ascii=False) + '\n')

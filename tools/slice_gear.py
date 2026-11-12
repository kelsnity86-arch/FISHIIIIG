"""장비 외형 그림(assets/raw/c_boat_tN · c_rod_set · c_float_set · ui_tension_set · c_scarf_set · h_boats)을 게임용으로 자른다.

배: 낚싯대가 낚시꾼 손에 붙어야 하므로, 새 배 그림마다 원래 그림(c_boat.png)의 낚시꾼과 겹치는 자리를 찾아
    (머리·모자 부분을 맞대어 본다) 그만큼 옮겨 놓는다. 결과는 '원래 배의 바닥 가운데'를 기준으로 한 자리(ox, oy)로 적힌다.

python3 tools/slice_gear.py
"""
from pathlib import Path
import json
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RAW, OUT = ROOT / 'assets' / 'raw', ROOT / 'assets' / 'game'


def rgba(name): return np.array(Image.open(RAW / (name + '.png')).convert('RGBA'))
def bbox(m):
    ys, xs = np.nonzero(m); return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1
def runs(prof, gap, minlen=12):
    on = prof > 0; out = []; st = None; last = -99
    for k, v in enumerate(on):
        if v:
            if st is None: st = k
            last = k
        elif st is not None and k - last > gap: out.append((st, last + 1)); st = None
    if st is not None: out.append((st, last + 1))
    return [r for r in out if r[1] - r[0] >= minlen]


def boats(items, extra):
    base = rgba('c_boat'); H, W = base.shape[:2]; cw = W // 3
    for t in range(2, 9):
        p = RAW / f'c_boat_t{t}.png'
        if not p.exists(): continue
        new = rgba(f'c_boat_t{t}')
        if new.shape != base.shape: new = np.array(Image.fromarray(new).resize((W, H), Image.LANCZOS))
        for pose in range(3):
            a = base[:, pose * cw:(pose + 1) * cw]; b = new[:, pose * cw:(pose + 1) * cw]
            ax0, ay0, ax1, ay1 = bbox(a[..., 3] > 40)
            s = 36 / (ax1 - ax0)                                  # 원래 그림에서 화면 1칸이 몇 픽셀인가
            # 낚시꾼의 윗부분(모자·머리·주먹): 원래 그림에서 맨 위 80픽셀
            ty1 = ay0 + 80; m = a[ay0:ty1, :, 3] > 40; tx0, _, tx1, _ = bbox(m)
            tpl = a[ay0:ty1, tx0:tx1].astype(float); tm = tpl[..., 3] > 40
            best = None
            for step, rng, c0 in ((4, 90, (0, 0)), (1, 5, None)):
                if c0 is None: c0 = best[1]
                for dy in range(c0[1] - rng, c0[1] + rng + 1, step):
                    for dx in range(c0[0] - rng, c0[0] + rng + 1, step):
                        y, x = ay0 + dy, tx0 + dx
                        if y < 0 or x < 0 or y + tpl.shape[0] > H or x + tpl.shape[1] > cw: continue
                        w = b[y:y + tpl.shape[0], x:x + tpl.shape[1]].astype(float)
                        d = np.abs(w[..., :3] - tpl[..., :3]).sum(axis=2)[tm].mean() + 255 * ((w[..., 3] > 40) != tm).mean()
                        if best is None or d < best[0]: best = (d, (dx, dy))
            dx, dy = best[1]
            bx0, by0, bx1, by1 = bbox(b[..., 3] > 40)
            anchor = ((ax0 + ax1) / 2 + dx, ay1 + dy)             # 원래 배의 바닥 가운데가 새 그림에서 있는 자리
            im = Image.fromarray(b[by0:by1, bx0:bx1]); k = 6 * s  # 화면 1칸 = 6픽셀로 줄여 담는다
            im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
            name = f'c_boat_t{t}_{pose + 1}'
            items.append((name, im))
            extra[name] = dict(w=round((bx1 - bx0) * s, 2), h=round((by1 - by0) * s, 2), ox=round((bx0 - anchor[0]) * s, 2), oy=round((by0 - anchor[1]) * s, 2), smooth=True)
            print(f'{name}: 낚시꾼이 ({dx:+d}, {dy:+d})px 옮겨져 있다 (맞춘 정도 {best[0]:.0f}), 크기 {extra[name]["w"]}x{extra[name]["h"]}, 자리 {extra[name]["ox"]},{extra[name]["oy"]}')


def strips(src, prefix, items, extra, by_rows, size):
    """줄(또는 칸)마다 하나씩 놓인 그림을 자른다. size(name, w, h) → 화면 크기(w, h)와 덧붙일 값"""
    if not (RAW / (src + '.png')).exists(): return
    a = rgba(src); m = a[..., 3] > 40
    prof = m.sum(axis=1 if by_rows else 0)
    rs = runs(prof, 4)
    if len(rs) != 8:                                   # 서로 닿아 있으면 8등분한 자리 근처의 가장 가는 곳에서 가른다
        L = len(prof); on = np.nonzero(prof)[0]; a0, a1 = on.min(), on.max() + 1; cuts = [a0]
        for i in range(1, 8):
            c = a0 + (a1 - a0) * i / 8; r = (a1 - a0) / 8 * 0.3; lo, hi = int(c - r), int(c + r)
            cuts.append(lo + int(np.argmin(prof[lo:hi])))
        cuts.append(a1); rs = [(cuts[i], cuts[i + 1]) for i in range(8)]
    boxes = []
    for r0, r1 in rs:
        sub = m[r0:r1] if by_rows else m[:, r0:r1]
        x0, y0, x1, y1 = bbox(sub)
        boxes.append((x0, r0 + y0, x1, r0 + y1) if by_rows else (r0 + x0, y0, r0 + x1, y1))
    assert len(boxes) == 8, (src, len(boxes))
    for i, (x0, y0, x1, y1) in enumerate(boxes):
        piece = a[y0:y1, x0:x1]; name = f'{prefix}_{i + 1}'
        meta, px = size(i, piece, boxes)
        im = Image.fromarray(piece)
        if im.width > px: im = im.resize((px, max(1, round(im.height * px / im.width))), Image.LANCZOS)
        items.append((name, im)); extra[name] = dict(smooth=True, **meta)
    print(f'{src}: 8개')


def pack(items, extra, file, manifest, width=2048, pad=2):
    x = y = rowh = 0; places = []
    for name, im in sorted(items, key=lambda t: -t[1].height):
        if x + im.width + pad > width: x, y, rowh = 0, y + rowh + pad, 0
        places.append((name, im, x, y)); x += im.width + pad; rowh = max(rowh, im.height)
    atlas = Image.new('RGBA', (width, y + rowh + pad), (0, 0, 0, 0))
    for name, im, px, py in places:
        atlas.paste(im, (px, py))
        e = dict(atlas=file, ax=px, ay=py, pw=im.width, ph=im.height); e.update(extra[name]); manifest[name] = e
    atlas.save(OUT / file, 'WEBP', quality=92, method=4)
    print(f'{file}: {len(places)}개, {atlas.size[0]}x{atlas.size[1]}')


def run(manifest):
    items, extra = [], {}
    boats(items, extra)
    # 낚싯대: 곧은 옆모습, 화면에서 길이 44
    strips('c_rod_set', 'c_rod', items, extra, True, lambda i, p, bs: (dict(w=44, h=round(44 * p.shape[0] / p.shape[1], 2)), 704))
    # 찌: 높이 24. 수면이 걸리는 높이(water) = 둥근 몸통의 가장 넓은 곳
    def fl(i, p, bs):
        wid = (p[..., 3] > 40).sum(axis=1); top = int(np.argmax(wid >= wid.max() * 0.9)); bot = len(wid) - 1 - int(np.argmax(wid[::-1] >= wid.max() * 0.9))
        return dict(w=round(24 * p.shape[1] / p.shape[0], 2), h=24, water=round((top + bot) / 2 / p.shape[0], 3)), 200
    strips('c_float_set', 'c_float', items, extra, False, fl)
    # 줄다리기 게이지 틀: 폭 900. 어두운 홈의 자리(slot = 왼, 오른, 위, 아래. 틀 크기 대비)
    def tn(i, p, bs):
        P = p.astype(int); dark = (P[..., 0] < 75) & (P[..., 1] < 85) & (P[..., 2] < 140) & (P[..., 2] >= P[..., 0] + 12) & (P[..., 2] >= P[..., 1]) & (P[..., 3] > 200)   # 남색 홈 (가장자리의 조금 밝은 남색까지)
        H, W = dark.shape; cy, cx = H // 2, int(W * 0.55)
        def grow(line, c):                              # 홈 한가운데에서 바깥으로, 남색이 이어지는 데까지
            a = b = c
            while a > 0 and line[a - 1:a + 1].any() and (line[a - 1] or line[max(0, a - 3):a].any()): a -= 1
            while b < len(line) - 1 and (line[b + 1] or line[b + 1:b + 4].any()): b += 1
            while not line[a]: a += 1
            while not line[b]: b -= 1
            return a, b + 1
        x0, x1 = grow(dark[cy - 2:cy + 3].all(axis=0), cx); y0, y1 = grow(dark[:, cx - 2:cx + 3].all(axis=1), cy)
        return dict(w=900, h=round(900 * H / W, 2), slot=[round(x0 / W, 4), round(x1 / W, 4), round(y0 / H, 4), round(y1 / H, 4)]), 900
    strips('ui_tension_set', 'ui_tension', items, extra, True, tn)
    # 목도리: 가장 긴 것(8단계)이 화면에서 길이 26
    def sc(i, p, bs):
        w = 26 * p.shape[1] / (bs[7][2] - bs[7][0]); return dict(w=round(w, 2), h=round(w * p.shape[0] / p.shape[1], 2)), 420
    strips('c_scarf_set', 'c_scarf', items, extra, True, sc)
    # 항구에 매어 둔 배: 4칸 x 2줄. 가장 큰 것(8단계)이 화면에서 폭 96
    if (RAW / 'h_boats.png').exists():
        a = rgba('h_boats'); m = a[..., 3] > 40; boxes = []
        for r0, r1 in runs(m.sum(axis=1), 6):
            for c0, c1 in runs(m[r0:r1].sum(axis=0), 10):
                x0, y0, x1, y1 = bbox(m[r0:r1, c0:c1]); boxes.append((c0 + x0, r0 + y0, c0 + x1, r0 + y1))
        assert len(boxes) == 8, len(boxes)
        w8 = boxes[7][2] - boxes[7][0]
        for i, (x0, y0, x1, y1) in enumerate(boxes):
            name = f'h_boat_big_{i + 1}'; im = Image.fromarray(a[y0:y1, x0:x1]); w = 96 * (x1 - x0) / w8
            items.append((name, im)); extra[name] = dict(w=round(w, 2), h=round(w * (y1 - y0) / (x1 - x0), 2), smooth=True)
        print('h_boats: 8개')
    pack(items, extra, 'gear.webp', manifest)


if __name__ == '__main__':
    mf = OUT / 'manifest.json'
    m = json.loads(mf.read_text())['sprites']
    run(m)
    mf.write_text(json.dumps(dict(sprites=m), indent=1, ensure_ascii=False) + '\n')

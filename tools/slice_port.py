"""가게 판 둥근 창에 들어갈 그림을 자른다: 가게 상징 6개(h_shop_marks)와 마을 등급별 창 테두리 5단계(h_port_rims).

테두리는 가운데 뚫린 구멍의 자리(hole = 가운데 x, 가운데 y, 반지름. 그림 폭 대비)를 함께 적는다.
코드가 그 구멍을 판 그림의 둥근 창에 맞춰 얹는다.

python3 tools/slice_port.py
"""
from pathlib import Path
import json
import numpy as np
from PIL import Image
from PIL import ImageDraw

ROOT = Path(__file__).resolve().parents[1]
RAW, OUT = ROOT / 'assets' / 'raw', ROOT / 'assets' / 'game'
SHOPS = ['market', 'tackle', 'yard', 'tailor', 'guild', 'hall']


def bbox(m):
    ys, xs = np.nonzero(m); return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1
def longest(line):
    """참이 가장 길게 이어진 구간 (시작, 끝)"""
    best = (0, 0); st = None
    for k, v in enumerate(list(line) + [False]):
        if v and st is None: st = k
        elif not v and st is not None:
            if k - st > best[1] - best[0]: best = (st, k)
            st = None
    return best
def cells(a, cols, rows):
    """칸마다 하나씩 그려진 그림을 칸별로 잘라 돌려준다 (왼쪽 위부터)"""
    H, W = a.shape[:2]; out = []
    for r in range(rows):
        for c in range(cols):
            x0, y0 = W * c // cols, H * r // rows; sub = a[y0:H * (r + 1) // rows, x0:W * (c + 1) // cols]
            bx0, by0, bx1, by1 = bbox(sub[..., 3] > 40); out.append(sub[by0:by1, bx0:bx1])
    return out
def inner_empty(p):
    """그림에 둘러싸인 빈 곳 (바깥과 이어진 빈 곳은 뺀다)"""
    m = Image.fromarray(np.pad((p[..., 3] >= 40).astype(np.uint8) * 255, 1)).copy(); ImageDraw.floodfill(m, (0, 0), 128, thresh=0)
    return np.array(m)[1:-1, 1:-1] == 0


def run(manifest):
    items = []
    a = np.array(Image.open(RAW / 'h_shop_marks.png').convert('RGBA'))
    for sid, piece in zip(SHOPS, cells(a, 3, 2)):
        im = Image.fromarray(piece); im.thumbnail((300, 300), Image.LANCZOS)
        items.append((f'h_mark_{sid}', im, dict(w=im.width, h=im.height, smooth=True)))
    a = np.array(Image.open(RAW / 'h_port_rims.png').convert('RGBA'))
    prof = (a[..., 3] > 40).sum(axis=0) > 0; spans = []; st = None      # 한 줄로 놓인 테두리: 빈 세로줄로 가른다
    for k, v in enumerate(list(prof) + [False]):
        if v and st is None: st = k
        elif not v and st is not None: spans.append((st, k)); st = None
    spans = [sp for sp in spans if sp[1] - sp[0] > 100]; assert len(spans) == 5, spans
    rims = []
    for x0, x1 in spans:
        sub = a[:, x0:x1]; bx0, by0, bx1, by1 = bbox(sub[..., 3] > 40); rims.append(sub[by0:by1])
    for i, p in enumerate(rims):
        inner = inner_empty(p); W = p.shape[1]
        row = int(np.argmax(inner.sum(axis=1))); x0, x1 = longest(inner[row])      # 가장 넓은 줄 = 구멍의 지름
        col = (x0 + x1) // 2; y0, y1 = longest(inner[:, col])
        cx, cy, r = (x0 + x1) / 2, (y0 + y1) / 2, ((x1 - x0) + (y1 - y0)) / 4
        im = Image.fromarray(p); k = min(1, 420 / im.width); im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
        items.append((f'h_rim_{i + 1}', im, dict(w=im.width, h=im.height, smooth=True, hole=[round(cx / W, 4), round(cy / W, 4), round(r / W, 4)])))
        print(f'h_rim_{i + 1}: 구멍 가운데 ({cx:.0f}, {cy:.0f}) 반지름 {r:.0f} / 그림 {p.shape[1]}x{p.shape[0]}')
    x = y = rowh = 0; places = []
    for name, im, meta in items:
        if x + im.width + 2 > 1600: x, y, rowh = 0, y + rowh + 2, 0
        places.append((name, im, meta, x, y)); x += im.width + 2; rowh = max(rowh, im.height)
    atlas = Image.new('RGBA', (1600, y + rowh + 2), (0, 0, 0, 0))
    for name, im, meta, px, py in places:
        atlas.paste(im, (px, py)); manifest[name] = dict(atlas='port.webp', ax=px, ay=py, pw=im.width, ph=im.height, **meta)
    atlas.save(OUT / 'port.webp', 'WEBP', quality=92, method=4)
    print(f'port.webp: {len(places)}개, {atlas.size}')


if __name__ == '__main__':
    mf = OUT / 'manifest.json'
    m = json.loads(mf.read_text())['sprites']
    run(m)
    mf.write_text(json.dumps(dict(sprites=m), indent=1, ensure_ascii=False) + '\n')

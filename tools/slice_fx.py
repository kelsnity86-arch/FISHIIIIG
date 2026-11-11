"""연속 동작 이펙트 그림(assets/raw/c_erupt_seq 등)을 동작별로 잘라 assets/game/ 에 넣는다.
같은 묶음의 동작은 칸 안에서의 위치를 그대로 지켜 같은 크기로 자른다 → 순서대로 넘기면 제자리에서 움직인다."""
from pathlib import Path
import json
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RAW, OUT = ROOT / 'assets' / 'raw', ROOT / 'assets' / 'game'
#        원본          칸(가로, 세로)  이름               화면 폭(px)  묶음으로 정렬
FX = [('c_erupt_seq', 3, 2, 'c_erupt_seq_{}', 300, True),
      ('c_drops',     4, 2, 'c_drops_{}',     28,  False),
      ('c_plop',      4, 1, 'c_plop_{}',      40,  True),
      ('c_foam',      1, 4, 'c_foam_{}',      300, True),
      ('c_rays2',     1, 1, 'c_rays2',        300, False)]


def run(manifest):
    for src, cols, rows, name, w, group in FX:
        p = RAW / (src + '.png')
        if not p.exists():
            continue
        a = np.array(Image.open(p).convert('RGBA'))
        H, W = a.shape[:2]
        ch, cw = H // rows, W // cols
        cells = [a[r * ch:(r + 1) * ch, c * cw:(c + 1) * cw] for r in range(rows) for c in range(cols)]
        boxes = []
        for c in cells:
            ys, xs = np.nonzero(c[..., 3] > 12)
            boxes.append((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
        if group:                                   # 모든 동작을 덮는 하나의 상자
            u = (min(b[0] for b in boxes), min(b[1] for b in boxes), max(b[2] for b in boxes), max(b[3] for b in boxes))
            boxes = [u] * len(cells)
        for i, (c, b) in enumerate(zip(cells, boxes)):
            crop = Image.fromarray(c[b[1]:b[3], b[0]:b[2]])
            key = name.format(i + 1)
            crop.save(OUT / (key + '.webp'), 'WEBP', quality=90, method=4)
            manifest[key] = dict(file=key + '.webp', w=w, h=round(w * crop.height / crop.width, 2), smooth=True)
        print(f'{src}: {len(cells)}개')


if __name__ == '__main__':
    mf = OUT / 'manifest.json'
    m = json.loads(mf.read_text())['sprites']
    run(m)
    mf.write_text(json.dumps(dict(sprites=m), indent=1, ensure_ascii=False) + '\n')

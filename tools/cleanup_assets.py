"""이제 쓰지 않는 옛 그림을 치운다 (게임에 들어가는 assets/game 만. 원화 assets/raw 는 그대로).
  1. 코드가 더는 찾지 않는 그림 이름을 목록에서 뺀다 (새 그림으로 완전히 바뀐 것).
  2. 몇 개만 남은 큰 묶음 그림은 남은 것만 모아 다시 묶는다 (화질 손실 없이).
  3. 어느 그림도 가리키지 않는 파일을 지운다.
주의: 옛 자르기 도구(slice_ui.py·slice_port.py 등)를 다시 돌리면 옛 묶음이 되살아난다. 그 뒤에는 이 도구를 다시 돌린다.

python3 tools/cleanup_assets.py
"""
from pathlib import Path
import json, re
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'game'
DROP = re.compile(r'^(h_rim_\d|dex_idx_.+|dex_book|dex_tab|dex_tab_on)$')      # 가게 판의 둥근 창 테두리, 따로 얹던 인덱스 스티커, 옛 도감 책과 쪽지
REPACK = ['h_atlas.webp', 'ui_big.webp', 'ui_extra.webp', 'ui_set.webp']

mf = OUT / 'manifest.json'; doc = json.loads(mf.read_text()); m = doc['sprites']
before = sum(p.stat().st_size for p in OUT.iterdir())
for k in [k for k in m if DROP.match(k)]: del m[k]
for name in REPACK:
    keys = [k for k, v in m.items() if v.get('atlas') == name]
    if not keys or not (OUT / name).exists(): continue
    at = Image.open(OUT / name).convert('RGBA'); items = []
    for k in keys:
        v = m[k]; pw, ph = v.get('pw', v['w']), v.get('ph', v['h'])
        items.append((k, at.crop((v['ax'], v['ay'], v['ax'] + round(pw), v['ay'] + round(ph)))))
    x = y = rowh = 0; places = []
    for k, im in sorted(items, key=lambda t: -t[1].height):
        if x + im.width + 2 > 2048: x, y, rowh = 0, y + rowh + 2, 0
        places.append((k, im, x, y)); x += im.width + 2; rowh = max(rowh, im.height)
    new = Image.new('RGBA', (2048, y + rowh + 2), (0, 0, 0, 0))
    for k, im, px, py in places: new.paste(im, (px, py))
    tmp = OUT / (name + '.tmp'); new.save(tmp, 'WEBP', lossless=True, method=6); old = (OUT / name).stat().st_size
    if tmp.stat().st_size >= old: tmp.unlink(); print(f'{name}: 다시 묶어도 줄지 않아 그대로 둔다'); continue      # 화질 손실 없이 묶으면 더 커지는 묶음 (사진처럼 결이 많은 그림)
    for k, im, px, py in places: m[k]['ax'] = px; m[k]['ay'] = py
    tmp.replace(OUT / name)
    print(f'{name}: {len(keys)}개만 남겨 다시 묶음 {old / 1e6:.2f}MB → {(OUT / name).stat().st_size / 1e6:.2f}MB')
used = {v.get('atlas') or v.get('file') for v in m.values()}
for p in sorted(OUT.iterdir()):
    if p.name != 'manifest.json' and p.name not in used: print('지움', p.name, f'{p.stat().st_size / 1e6:.2f}MB'); p.unlink()
mf.write_text(json.dumps(doc, indent=1, ensure_ascii=False) + '\n')
after = sum(p.stat().st_size for p in OUT.iterdir())
print(f'assets/game: {before / 1e6:.1f}MB → {after / 1e6:.1f}MB')

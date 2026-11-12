"""영어판에서만 쓰는 그림(글자가 든 그림)을 자른다: '낚았다!' 글자판 6개, 첫 포획·신기록 도장.
이름 끝에 _en 이 붙고, 게임은 영어일 때 그 그림이 있으면 그것을 쓴다 (src/render.js 의 worded).

python3 tools/slice_en.py
"""
from pathlib import Path
import json, sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tools'))
from slice_ui import cut, pack, RAW          # noqa: E402

mf = ROOT / 'assets' / 'game' / 'manifest.json'
doc = json.loads(mf.read_text()); manifest = doc['sprites']
items = []
if (RAW / 'ui2_caught_en.png').exists():
    items += cut('ui2_caught_en', [f'ui_caught_{i}_en' for i in range(1, 7)], 3, 640)
if (RAW / 'ui2_stamp_en.png').exists():      # 리본·배지는 글자가 없어 한글판 그림을 그대로 쓴다
    items += cut('ui2_stamp_en', ['ui_stamp_new_en', 'ui_stamp_record_en', 'x1', 'x2'], 1, 320)[:2]
pack(items, 'ui_en.webp', manifest)
mf.write_text(json.dumps(doc, indent=1, ensure_ascii=False) + '\n')

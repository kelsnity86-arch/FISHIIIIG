"""설정 버튼·설정 판·줄 이펙트 그림을 자른다:
  ui_ic_skill  바다 화면의 기술 버튼 (낚싯바늘과 별)
  st_icons     설정·잠시 멈춤 판의 줄 아이콘 10개 → st_<이름>
  fx_line      줄다리기 때 줄의 이펙트: 불티 3 · 빛 알갱이 2 · 물살 2
  fx_motes     줄 단계마다 다른 빛 알갱이 7개 → fx_mote_3 ~ fx_mote_9

python3 tools/slice_set.py
"""
from pathlib import Path
import json, sys
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tools'))
from slice_ui import cut, pack, RAW          # noqa: E402


def fit(im, px):
    k = min(1, px / max(im.size)); return im if k == 1 else im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)


def runs(on, gap):
    """참인 구간들. 사이가 gap 보다 좁으면 한 덩어리로 본다"""
    out = []; start = None; last = None
    for i, v in enumerate(on):
        if not v: continue
        if start is None: start = i
        elif i - last > gap: out.append((start, last + 1)); start = i
        last = i
    if start is not None: out.append((start, last + 1))
    return out


def rows_of(src, counts, gap=70, th=10):
    """줄마다 조각 수가 다른 그림: 빈 가로띠로 줄을 나누고, 줄 안에서 빈 세로띠로 조각을 나눈다"""
    a = np.array(Image.open(RAW / (src + '.png')).convert('RGBA')); m = a[..., 3] > th
    bands = runs(m.any(axis=1), 40); assert len(bands) == len(counts), (len(bands), counts)
    out = []
    for (y0, y1), n in zip(bands, counts):
        cols = runs(m[y0:y1].any(axis=0), gap); assert len(cols) == n, (src, y0, len(cols), n)
        for x0, x1 in cols:
            ys = np.nonzero(m[y0:y1, x0:x1].any(axis=1))[0]
            out.append(Image.fromarray(a[y0 + ys.min():y0 + ys.max() + 1, x0:x1]))
    return out


mf = ROOT / 'assets' / 'game' / 'manifest.json'
doc = json.loads(mf.read_text()); manifest = doc['sprites']
items = []
if (RAW / 'ui_ic_skill.png').exists():
    a = np.array(Image.open(RAW / 'ui_ic_skill.png').convert('RGBA')); ys, xs = np.nonzero(a[..., 3] > 24)
    items.append(('ui_ic_skill', fit(Image.fromarray(a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]), 386)))
if (RAW / 'st_icons.png').exists():
    items += cut('st_icons', ['st_' + n for n in ('mus', 'sfx', 'amb', 'res', 'qual', 'vibe', 'lang', 'resume', 'set', 'quit')], 2, 128)
if (RAW / 'fx_line.png').exists():
    names = ['fx_spark_1', 'fx_spark_2', 'fx_spark_3', 'fx_glint_1', 'fx_glint_2', 'fx_wake_1', 'fx_wake_2']
    sizes = [96, 96, 96, 96, 96, 320, 320]
    for n, im, px in zip(names, rows_of('fx_line', [3, 2, 2]), sizes): items.append((n, fit(im, px)))
if (RAW / 'fx_motes.png').exists():      # 줄 단계마다 다른 빛 알갱이: 3단계 ~ 9(태초)
    for i, im in enumerate(rows_of('fx_motes', [7], gap=40)): items.append((f'fx_mote_{i + 3}', fit(im, 96)))
pack(items, 'ui_set.webp', manifest)
mf.write_text(json.dumps(doc, indent=1, ensure_ascii=False) + '\n')

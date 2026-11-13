"""설정 버튼·설정 판·줄 이펙트 그림을 자른다:
  ui_ic_skill  바다 화면의 기술 버튼 (낚싯바늘과 별)
  st_icons     설정·잠시 멈춤 판의 줄 아이콘 10개 → st_<이름>
  fx_line      줄다리기 때 줄의 이펙트: 불티 3 · 빛 알갱이 2 · 물살 2
  fx_motes     줄 단계마다 다른 빛 알갱이 7개 → fx_mote_3 ~ fx_mote_9
  dex_index    도감의 인덱스 스티커 11개 → dex_idx_<해역>

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
    bands = runs(m.any(axis=1), min(40, gap)); assert len(bands) == len(counts), (len(bands), counts)
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
if (RAW / 'dex_index.png').exists():      # 도감의 인덱스 스티커: 해역 1~8, 공(0), 태(9), 옛(R)
    for key, im in zip([1, 2, 3, 4, 5, 6, 7, 8, 0, 9, 'R'], rows_of('dex_index', [4, 4, 3], gap=14, th=30)): items.append((f'dex_idx_{key}', fit(im, 170)))
if (RAW / 'h_signs.png').exists():      # 항구 건물의 이름판: 마을 겉모습 5단계
    for i, im in enumerate(rows_of('h_signs', [1, 1, 1, 1, 1], gap=14, th=120)): items.append((f'h_sign_{i + 1}', fit(im, 560)))
if (RAW / 'ui_notes.png').exists():     # 글 뒤에 까는 판: 양피지 띠 · 의뢰 쪽지 · 작은 누름 판
    for n, im in zip(['ui_note', 'ui_tag', 'ui_chip'], rows_of('ui_notes', [1, 1, 1], gap=14, th=120)): items.append((n, fit(im, 560)))
if (RAW / 'h_boat_foam.png').exists():  # 매어 둔 배가 물과 만나는 자리의 잔물결 (2 = 선이 또렷하게 다시 그린 것)
    a = np.array(Image.open(RAW / ('h_boat_foam2.png' if (RAW / 'h_boat_foam2.png').exists() else 'h_boat_foam.png')).convert('RGBA')); ys, xs = np.nonzero(a[..., 3] > 40)
    items.append(('h_boat_foam', fit(Image.fromarray(a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]), 700)))
pack(items, 'ui_set.webp', manifest)

# 도감 책 (꼬리표가 책장 사이에 그려진 그림). dex_book2b = 열한 개 다, dex_book2 = 태초의 바다가 열리기 전(열째 자리가 비어 있다).
# GPT가 두 장을 따로 그려 나머지 꼬리표의 자리가 조금씩 달랐다 → 열한 개짜리 그림을 바탕으로 하고, 열째 자리만 '빈 칸' 그림에서 떼어다 붙여 만든다 (그래야 열릴 때 다른 꼬리표가 움직이지 않는다)
if (RAW / 'dex_book2.png').exists() and (RAW / 'dex_book2b.png').exists():
    from PIL import ImageFilter
    A = Image.open(RAW / 'dex_book2.png').convert('RGBA'); B = Image.open(RAW / 'dex_book2b.png').convert('RGBA')
    box = (99, 0, 1675, 871)
    mask = Image.new('L', A.size, 0); mask.paste(255, (1566, 612, 1690, 668)); mask = mask.filter(ImageFilter.GaussianBlur(3))
    locked = B.copy(); locked.paste(A, (0, 0), mask)
    for name, im in (('dex_book2b', B), ('dex_book2', locked)):
        im = im.crop(box); im = im.resize((1200, round(1200 * im.height / im.width)), Image.LANCZOS)
        im.save(ROOT / 'assets' / 'game' / (name + '.webp'), 'WEBP', quality=92, method=4)
        manifest[name] = dict(file=name + '.webp', w=600, h=round(600 * im.height / im.width, 2), smooth=True)
    print('dex_book2 · dex_book2b')

mf.write_text(json.dumps(doc, indent=1, ensure_ascii=False) + '\n')

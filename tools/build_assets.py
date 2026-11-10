#!/usr/bin/env python3
"""GPT 원본(assets/raw/) → 게임용 그림(assets/game/) 변환 도구.

하는 일
  1. 시트 한 장에서 그림들을 자동으로 찾아 낸다 (빈 줄·빈 칸 기준, 위→아래 · 왼쪽→오른쪽 순서).
  2. 여백을 잘라내고 게임 크기에 맞게 줄인다.
  3. assets/game/ 에 저장하고 manifest.json 을 쓴다. 게임은 manifest 에 있는 그림만 임시 그림 대신 쓴다.

쓰는 법
  python3 tools/build_assets.py

배경은 투명이어야 한다. 흰색·마젠타 배경이면 자동으로 지운다(테두리에서 이어진 부분만).
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / 'assets' / 'raw'
OUT = ROOT / 'assets' / 'game'

# 시트 정의: 원본 파일명 → 잘라낼 그림 이름(순서대로)과 게임 크기.
#   w / h : 게임 좌표 크기. 하나만 적으면 비율을 유지한다.
#   upscale=True : 게임에서 원본보다 크게 그리는 그림(물고기). 원본 해상도를 유지하고 도트를 또렷하게 둔다.
FISH = dict(w=256, upscale=True)
CREATURES = ['mackerel', 'anchovy', 'bream', 'flounder', 'puffer', 'filefish', 'butterfly', 'goby', 'flying', 'seahorse', 'shrimp', 'crab', 'squid', 'octopus', 'jellyfish', 'starfish', 'tuna', 'shark', 'manta', 'eel', 'marlin', 'sawshark', 'sunfish', 'sturgeon', 'whale', 'dolphin', 'angler', 'coelacanth', 'giant_squid', 'giant_octopus', 'turtle', 'oarfish', 'seal', 'walrus', 'manatee', 'narwhal', 'sea_snake', 'crocodile', 'plesiosaur', 'ammonite']
SHEETS = {
    **{f'fish_{n}': [dict(name=f'fish_{n}' + ('' if r == 1 else f'_c{r}') + s, **FISH)
                     for r in range(1, 5) for s in ['', '_s']] for n in CREATURES},
    'boat_a': [dict(name=f'boat_{i + 1}', w=w) for i, w in enumerate([32, 40, 48, 56])],
    'boat_b': [dict(name=f'boat_{i + 5}', w=w) for i, w in enumerate([64, 72, 80, 88])],
    'char_body': [dict(name=f'body_{i + 1}', h=40) for i in range(8)],
    # 생물 하나당 한 장: 4행(색) × 2열(평소·놀람). 1행 = 기본 이름, 2~4행 = _c2~_c4, 놀람 = _s
    'shadow': [dict(name='shadow', w=256, upscale=True)],   # 여러 개가 와도 첫 번째만 쓴다
    'char_head': [dict(name='head', h=28)] + [dict(name=f'hat_{i + 1}', w=36) for i in range(8)] + [dict(name='char_sea', h=6)],
    **{f'fantasy_{i:02d}': [dict(name=f'fantasy_{i:02d}', w=384, upscale=True), dict(name=f'fantasy_{i:02d}_s', w=384, upscale=True)]
       for i in range(1, 41)},
    'rod': [dict(name=f'rod_{i + 1}', w=36) for i in range(8)],
    'float': [dict(name=f'float_{i + 1}', h=12) for i in range(8)],
    # ── 배경 (whole: 그림 전체를 한 장으로, opaque: 배경을 지우지 않음) ──
    **{f'bg_region{i}': [dict(name=f'bg_region{i}', w=640, whole=True)] for i in range(1, 9)},
    'bg_sky': [dict(name='bg_sky', w=640, whole=True, opaque=True)],
    'bg_sea': [dict(name='bg_sea', w=640, whole=True, opaque=True)],
    'map_bg': [dict(name='map_bg', w=640, whole=True, opaque=True)],
    'harbor_bg': [dict(name='harbor_bg', w=640, whole=True, opaque=True)],
    'bg_cloud': [dict(name=f'cloud_{i + 1}', w=64, grid=(2, 3)) for i in range(6)],
    'bg_wave': [dict(name=f'wave_{i + 1}', w=64, grid=(3, 1)) for i in range(3)],
    # ── 물고기 장식 ──
    'fish_pattern': [dict(name=f'pattern_{i + 1}', w=64, grid=(2, 3)) for i in range(6)],
    'fish_parts': [dict(name=f'part_{i + 1}', w=32, grid=(4, 4)) for i in range(16)],
    # ── 이펙트·상자 ──
    'fx_small': [dict(name=f'fx_{n}', w=16, grid=(4, 4)) for n in
                 ['drop', 'splash', 'ring', 'foam', 'rain', 'snow', 'fog', 'bolt',
                  'sparkle', 'dot', 'bang', 'sweat', 'tear', 'note', 'heart', 'ash']],
    'fx_big': [dict(name='fx_column', w=96, grid=(1, 2)), dict(name='fx_crown', w=96, grid=(1, 2))],
    'chest': [dict(name='chest_closed', w=40, grid=(1, 2)), dict(name='chest_open', w=40, grid=(1, 2))],
    # ── 지도·항구 ──
    'map_node': [dict(name=f'map_node_{i + 1}', w=32, grid=(2, 4)) for i in range(8)],
    'shop_a': [dict(name=n, w=72, grid=(1, 3)) for n in ['shop_shipyard', 'shop_tackle', 'shop_bait']],
    'shop_b': [dict(name=n, w=72, grid=(1, 3)) for n in ['shop_clothes', 'shop_market', 'shop_guild']],
    'npc': [dict(name=f'npc_{i + 1}', h=24, grid=(1, 6)) for i in range(6)],
    # ── UI ──
    'ui_frame': [dict(name=n, w=48, grid=(2, 4)) for n in
                 ['ui_panel', 'ui_button', 'ui_gauge', 'ui_ribbon', 'ui_badge_star', 'ui_badge_diamond', 'ui_medal', 'ui_frame']],
    'ui_icon': [dict(name=f'icon_{n}', w=16, grid=(4, 8)) for n in
                ['gold', 'crate', 'bait', 'book', 'bag', 'gear', 'anchor', 'map',
                 'upgrade', 'close', 'arrow', 'lock', 'sound_on', 'sound_off', 'gem', 'star',
                 'dawn', 'day', 'dusk', 'night', 'clear', 'rain', 'storm', 'fog',
                 'snow', 'auto_cast', 'auto_sell', 'auto_hook', 'auto_fight', 'check', 'question', 'crown']],
    'item_icon': [dict(name=f'item_{i + 1}', w=24, grid=(3, 8)) for i in range(24)],
    'web_icon': [dict(name=f'web_icon_{i + 1}', w=24, grid=(3, 6)) for i in range(18)],
    'web_node': [dict(name=f'web_node_{i + 1}', w=48, grid=(3, 4)) for i in range(12)],
}

GRID = {8: (4, 2), 2: (2, 1)}   # 자동 분리가 안 될 때 쓰는 격자 (생물 시트, 환상종)
OVERSAMPLE = 4      # 줄이는 그림은 게임 크기의 4배로 저장 (화면 확대 배율까지 선명하게)
ALPHA_MIN = 40      # 이보다 흐린 점은 배경으로 본다
MIN_GAP = 6         # 그림 사이로 인정하는 최소 빈 줄 수
MIN_SIZE = 12       # 이보다 작은 조각은 잡티로 보고 버린다


def load(path, opaque=False):
    im = Image.open(path).convert('RGBA')
    a = np.array(im)
    if opaque:
        a[..., 3] = 255
        return a
    if (a[..., 3] < 250).mean() < 0.02:          # 투명 배경이 아님 → 테두리에서 이어진 흰색/마젠타를 지운다
        rgb = im.convert('RGB')
        for corner in [(0, 0), (im.width - 1, 0), (0, im.height - 1), (im.width - 1, im.height - 1)]:
            ImageDraw.floodfill(rgb, corner, (1, 254, 2), thresh=40)
        key = np.all(np.array(rgb) == (1, 254, 2), axis=-1)
        a[key, 3] = 0
        alpha = Image.fromarray(a[..., 3]).filter(ImageFilter.MinFilter(3))   # 가장자리 흰 테 제거
        a[..., 3] = np.array(alpha)
    a[a[..., 3] < ALPHA_MIN] = 0     # 배경 제거 후 남은 희미한 잡티 제거
    return a


def runs(mask):
    """True 가 이어지는 구간들을 (시작, 끝) 으로. 짧은 빈틈은 같은 구간으로 합친다."""
    out, start, gap = [], None, 0
    for i, v in enumerate(mask):
        if v:
            if start is None:
                start = i
            gap = 0
        elif start is not None:
            gap += 1
            if gap >= MIN_GAP:
                out.append((start, i - gap + 1))
                start = None
    if start is not None:
        out.append((start, len(mask) - gap))
    return [(a, b) for a, b in out if b - a >= MIN_SIZE]


def find_sprites(a):
    solid = a[..., 3] > ALPHA_MIN
    boxes = []
    for y0, y1 in runs(solid.any(axis=1)):
        for x0, x1 in runs(solid[y0:y1].any(axis=0)):
            ys = np.where(solid[y0:y1, x0:x1].any(axis=1))[0]
            boxes.append((x0, y0 + ys[0], x1, y0 + ys[-1] + 1))
    return boxes


def split_grid(a, rows, cols):
    """그림끼리 닿아 자동으로 못 나눌 때: 정해진 격자(rows×cols)로, 경계 근처에서 가장 빈 줄을 골라 자른다."""
    solid = a[..., 3] > ALPHA_MIN
    ys = np.where(solid.any(axis=1))[0]; xs = np.where(solid.any(axis=0))[0]
    y0, y1, x0, x1 = ys[0], ys[-1] + 1, xs[0], xs[-1] + 1

    def cuts(profile, start, end, n):
        out, step = [start], (end - start) / n
        for k in range(1, n):
            c = start + step * k
            lo, hi = int(c - step * 0.2), int(c + step * 0.2)
            out.append(lo + int(np.argmin(profile[lo:hi])))
        return out + [end]

    boxes = []
    yc = cuts(solid.sum(axis=1), y0, y1, rows)
    for r in range(rows):
        band = solid[yc[r]:yc[r + 1]]
        xc = cuts(band.sum(axis=0), x0, x1, cols)
        for c in range(cols):
            cell = band[:, xc[c]:xc[c + 1]]
            yy = np.where(cell.any(axis=1))[0]; xx = np.where(cell.any(axis=0))[0]
            if len(yy) == 0:
                return None
            boxes.append((xc[c] + xx[0], yc[r] + yy[0], xc[c] + xx[-1] + 1, yc[r] + yy[-1] + 1))
    return boxes


def build():
    OUT.mkdir(parents=True, exist_ok=True)
    for old in list(OUT.glob('*.png')) + list(OUT.glob('*.webp')):   # 이전 결과 정리
        old.unlink()
    manifest, problems = {}, []
    for sheet, items in SHEETS.items():
        src = next((p for p in sorted(RAW.glob(sheet + '.*')) if p.suffix.lower() in ('.png', '.webp')), None)
        if not src:
            continue
        first = items[0]
        a = load(src, first.get('opaque', False))
        if first.get('whole'):
            ys = np.where((a[..., 3] > ALPHA_MIN).any(axis=1))[0]; xs = np.where((a[..., 3] > ALPHA_MIN).any(axis=0))[0]
            boxes = [(0, ys[0], a.shape[1], ys[-1] + 1)]   # 가로는 전체 폭 유지 (풍경 위치가 바뀌지 않게)
        elif first.get('grid'):
            boxes = split_grid(a, *first['grid']) or []
        else:
            boxes = find_sprites(a)
        if len(items) == 1 and boxes:
            boxes = boxes[:1]
        if len(boxes) != len(items) and len(items) in GRID:
            boxes = split_grid(a, *GRID[len(items)]) or boxes
        if len(boxes) != len(items):
            problems.append(f'{src.name}: 그림 {len(items)}개가 필요한데 {len(boxes)}개를 찾음 → 건너뜀')
            continue
        for item, (x0, y0, x1, y1) in zip(items, boxes):
            crop = Image.fromarray(a[y0:y1, x0:x1])
            ratio = crop.width / crop.height
            w = item.get('w') or item['h'] * ratio
            h = item.get('h') or w / ratio
            if item.get('upscale'):
                smooth = False                                   # 크게 그리는 그림: 원본 도트 그대로
            else:
                size = (max(1, round(w * OVERSAMPLE)), max(1, round(h * OVERSAMPLE)))
                if size[0] < crop.width:
                    crop = crop.resize(size, Image.LANCZOS)
                smooth = True
            if item.get('upscale'):                              # 큰 생물 그림: 용량이 커서 webp 로 압축
                file = item['name'] + '.webp'
                crop.save(OUT / file, 'WEBP', quality=88, method=6)
            else:
                file = item['name'] + '.png'
                crop.save(OUT / file)
            manifest[item['name']] = dict(file=file, w=round(w, 2), h=round(h, 2), smooth=smooth)
        print(f'{src.name}: {len(items)}개 변환')
    (OUT / 'manifest.json').write_text(json.dumps(dict(sprites=manifest), indent=1, ensure_ascii=False) + '\n')
    print(f'manifest.json: 그림 {len(manifest)}개 등록')
    for p in problems:
        print('문제:', p)
    return 1 if problems else 0


if __name__ == '__main__':
    sys.exit(build())

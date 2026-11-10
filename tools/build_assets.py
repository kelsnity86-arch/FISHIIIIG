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
SHEETS = {
    'boat_a': [dict(name=f'boat_{i + 1}', w=w) for i, w in enumerate([32, 40, 48, 56])],
    'boat_b': [dict(name=f'boat_{i + 5}', w=w) for i, w in enumerate([64, 72, 80, 88])],
    'char_body': [dict(name=f'body_{i + 1}', h=40) for i in range(8)],
    'fish_s1': [dict(name=f'fish_{n}{s}', **FISH)
                for n in ['mackerel', 'anchovy', 'bream', 'flounder'] for s in ['', '_s']],
    'fish_s2': [dict(name=f'fish_{n}{s}', **FISH)
                for n in ['puffer', 'filefish', 'butterfly', 'goby'] for s in ['', '_s']],
    'fish_s3': [dict(name=f'fish_{n}{s}', **FISH)
                for n in ['flying', 'seahorse', 'shrimp', 'crab'] for s in ['', '_s']],
    'fish_s4': [dict(name=f'fish_{n}{s}', **FISH)
                for n in ['squid', 'octopus', 'jellyfish', 'starfish'] for s in ['', '_s']],
    'rod': [dict(name=f'rod_{i + 1}', w=36) for i in range(8)],
    'float': [dict(name=f'float_{i + 1}', h=12) for i in range(8)],
}

OVERSAMPLE = 4      # 줄이는 그림은 게임 크기의 4배로 저장 (화면 확대 배율까지 선명하게)
ALPHA_MIN = 40      # 이보다 흐린 점은 배경으로 본다
MIN_GAP = 6         # 그림 사이로 인정하는 최소 빈 줄 수
MIN_SIZE = 12       # 이보다 작은 조각은 잡티로 보고 버린다


def load(path):
    im = Image.open(path).convert('RGBA')
    a = np.array(im)
    if (a[..., 3] < 250).mean() < 0.02:          # 투명 배경이 아님 → 테두리에서 이어진 흰색/마젠타를 지운다
        rgb = im.convert('RGB')
        for corner in [(0, 0), (im.width - 1, 0), (0, im.height - 1), (im.width - 1, im.height - 1)]:
            ImageDraw.floodfill(rgb, corner, (1, 254, 2), thresh=40)
        key = np.all(np.array(rgb) == (1, 254, 2), axis=-1)
        a[key, 3] = 0
        alpha = Image.fromarray(a[..., 3]).filter(ImageFilter.MinFilter(3))   # 가장자리 흰 테 제거
        a[..., 3] = np.array(alpha)
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


def build():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest, problems = {}, []
    for sheet, items in SHEETS.items():
        src = next((p for p in sorted(RAW.glob(sheet + '.*')) if p.suffix.lower() in ('.png', '.webp')), None)
        if not src:
            continue
        a = load(src)
        boxes = find_sprites(a)
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

"""동화책 항구/UI 원화를 게임용 묶음 그림으로 자른다.

python3 tools/slice_storybook.py
기존 slice_ui / slice_port / slice_set 작업 뒤에 실행한다.
그림은 다시 그리거나 필터링하지 않는다. 투명 여백 자르기와 atlas 배치만 한다.
layout.json의 논리 크기/기준점은 유지하므로 조작 영역과 성장 수치는 바뀌지 않는다.
"""
from pathlib import Path
import json
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / 'assets/raw/storybook'
OUT = ROOT / 'assets/game'


def split_sheet(im, columns, rows, count):
    """행/열 사이 투명한 골을 찾아 자른다. 원본 픽셀/알파는 그대로 보존한다."""
    alpha = np.asarray(im.getchannel('A')) > 24

    def divisions(profile, n):
        length = len(profile)
        result = [0]
        for i in range(1, n):
            mid, radius = i * length / n, length / n * .22
            lo, hi = int(mid - radius), int(mid + radius)
            score = profile[lo:hi] + abs(np.arange(lo, hi) - mid) * .025
            result.append(lo + int(score.argmin()))
        return result + [length]

    ys = divisions(alpha.sum(axis=1), rows)
    result = []
    for r in range(rows):
        band = alpha[ys[r]:ys[r + 1]]
        xs = divisions(band.sum(axis=0), columns)
        for c in range(columns):
            if len(result) == count:
                return result
            mask = band[:, xs[c]:xs[c + 1]]
            yy, xx = np.nonzero(mask)
            if not len(xx):
                raise ValueError(f'빈 칸: {r + 1}행 {c + 1}열')
            box = (xs[c] + int(xx.min()), ys[r] + int(yy.min()),
                   xs[c] + int(xx.max()) + 1, ys[r] + int(yy.max()) + 1)
            result.append(im.crop(box))
    return result


def main():
    layout = json.loads((RAW / 'layout.json').read_text())
    manifest_path = OUT / 'manifest.json'
    manifest = json.loads(manifest_path.read_text())
    sprites = manifest['sprites']
    buckets = {}
    count = 0
    for group, spec in layout.items():
        source = RAW / (group + '.png')
        if not source.exists():
            raise FileNotFoundError(source)
        im = Image.open(source).convert('RGBA')
        if group.startswith('town_') or group == 'map':
            name = spec['names'][0]
            file = 'storybook_' + group + '.webp'
            im.save(OUT / file, 'WEBP', quality=92, method=6)
            meta = {k: v for k, v in spec['old_meta'][name].items()
                    if k not in ('file', 'atlas', 'ax', 'ay', 'pw', 'ph')}
            sprites[name] = dict(meta, file=file)
            count += 1
            continue
        pieces = split_sheet(im, spec['cols'], spec['rows'], len(spec['names']))
        bucket = ('shops' if group.startswith('shops_') else
                  'gear' if group.startswith('gear_') else
                  'boats' if group.startswith('boats') else
                  group if group in ('npc', 'boats', 'book') else 'ui')
        for name, piece in zip(spec['names'], pieces):
            meta = {k: v for k, v in spec['old_meta'][name].items()
                    if k not in ('file', 'atlas', 'ax', 'ay', 'pw', 'ph')}
            # 아틀라스에 들어갈 픽셀 크기만 제한한다. 화면 논리 크기는 원본 그대로.
            if max(piece.size) > 1600:
                piece.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
            buckets.setdefault(bucket, []).append((name, piece, meta))
            count += 1

    for bucket, items in buckets.items():
        pages, placed = [], []
        x = y = rowh = 2
        for name, im, meta in sorted(items, key=lambda it: (-it[1].height, it[0])):
            if x + im.width + 2 > 2048:
                x, y, rowh = 2, y + rowh + 2, 0
            if y + im.height + 2 > 4096:
                pages.append((placed, y + rowh + 2))
                placed, x, y, rowh = [], 2, 2, 0
            placed.append((name, im, meta, x, y))
            x += im.width + 2
            rowh = max(rowh, im.height)
        if placed:
            pages.append((placed, y + rowh + 2))
        for page, (placed, height) in enumerate(pages):
            atlas = Image.new('RGBA', (2048, height))
            file = f'storybook_{bucket}_{page + 1}.webp'
            for name, im, meta, px, py in placed:
                atlas.paste(im, (px, py))
                sprites[name] = dict(meta, atlas=file, ax=px, ay=py, pw=im.width, ph=im.height)
            atlas.save(OUT / file, 'WEBP', quality=92, method=6)
            print(f'{file}: {len(placed)}개, {atlas.width}×{atlas.height}')
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=1) + '\n')
    print(f'동화책 그림 {count}개 반영. 기존 논리 크기/게임 수치 유지.')


if __name__ == '__main__':
    main()

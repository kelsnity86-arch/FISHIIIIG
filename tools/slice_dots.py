"""도트 생물 시트(assets/raw/d_sheet_*.png, 5×5 = 25마리)를 원래 해상도의 도트 그림으로 되돌린다.

GPT 그림은 도트 1칸이 큰 사각형으로 확대돼 있다. slice16.py(gotzoo 에서 검증된 도구)가 칸 크기를 찾아
칸마다 색 하나를 뽑아 진짜 저해상도 그림으로 복원한다. 결과는 assets/game/d_<이름>.png.
"""
from pathlib import Path
import numpy as np
from PIL import Image
import slice16 as S

ROOT = Path(__file__).resolve().parents[1]
RAW, OUT = ROOT / 'assets' / 'raw', ROOT / 'assets' / 'game'

# 시트마다 줄 순서(왼→오, 위→아래)대로의 이름
SHEETS = {
    'd_sheet_01': ['hammer_shark', 'saw_shark', 'bulb_angler', 'straw_seahorse', 'scissor_crab',
                   'umbrella_jelly', 'drill_narwhal', 'pizza_ray', 'ball_turtle', 'cactus_puffer',
                   'fan_puffer', 'candle_eel', 'trumpet_fish', 'knight_swordfish', 'crown_tuna',
                   'plug_octopus', 'train_eel', 'teapot_whale', 'sub_whale', 'dino_shark',
                   'volcano_turtle', 'rocket_marlin', 'castle_kraken', 'ship_whale', 'moon_whale'],
}


def bg_mask(a):
    """배경(순수한 마젠타)만. 보라색 생물이 배경으로 잘못 지워지지 않게 좁게 잡는다."""
    r, g, b = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int)
    return (r > 215) & (b > 215) & (g < 60)


FRINGE = [(0x5d, 0x27, 0x5d), (0x8e, 0x44, 0xad)]       # 배경과 테두리가 섞여 생긴 보랏빛 찌꺼기 색

def clean_fringe(arr):
    """투명한 곳에 닿아 있는 보랏빛 가장자리 점을 지운다 (몸 안쪽의 보라색은 테두리에 싸여 있어 남는다)"""
    for _ in range(2):
        tr = arr[..., 3] == 0
        pad = np.pad(tr, 1, constant_values=True)
        near = pad[:-2, 1:-1] | pad[2:, 1:-1] | pad[1:-1, :-2] | pad[1:-1, 2:]
        pur = np.zeros(tr.shape, bool)
        for c in FRINGE:
            pur |= (arr[..., 0] == c[0]) & (arr[..., 1] == c[1]) & (arr[..., 2] == c[2])
        kill = pur & near & ~tr
        if not kill.any(): break
        arr[kill] = 0
    al = arr[..., 3] > 0
    ys, xs = np.nonzero(al)
    return arr[ys.min():ys.max() + 1, xs.min():xs.max() + 1]


def dot_sheets(manifest):
    problems = []
    for sheet, names in SHEETS.items():
        src = RAW / (sheet + '.png')
        if not src.exists():
            continue
        a = np.array(Image.open(src).convert('RGB'))
        fg = ~bg_mask(a)
        s = S.pixel_size(a, fg)
        cells = S.grid_cells(a, fg, 5, 5, s)
        for name, arr in zip(names, cells):
            if arr is None or arr.size == 0:
                problems.append(f'{sheet}: {name} 칸이 비어 있음'); continue
            arr = clean_fringe(arr.copy())
            key = 'd_' + name
            Image.fromarray(arr, 'RGBA').save(OUT / (key + '.png'))
            manifest[key] = dict(file=key + '.png', w=arr.shape[1], h=arr.shape[0], smooth=False)
        print(f'{sheet}: 도트 1칸 {s:.2f}px, {len(names)}마리')
    return problems


if __name__ == '__main__':
    import json
    mf = OUT / 'manifest.json'
    m = json.loads(mf.read_text())['sprites']
    for p in dot_sheets(m):
        print('문제:', p)
    mf.write_text(json.dumps(dict(sprites=m), indent=1, ensure_ascii=False) + '\n')

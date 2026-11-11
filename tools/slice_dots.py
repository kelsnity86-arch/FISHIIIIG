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

# 시트마다 줄 순서(왼→오, 위→아래)대로의 생물 목록: tools/dot_sheets.json (해역·등급·이름 포함)
import json
DATA = json.loads((ROOT / 'tools' / 'dot_sheets.json').read_text(encoding='utf-8'))
SHEETS = {f'd_sheet_{int(n):02d}': [c['id'] for c in v['creatures']] for n, v in DATA.items()}
SHEETS.update({k + '_s': [i + '_s' for i in v] for k, v in list(SHEETS.items())})   # 놀람 표정 장: 같은 순서, 이름 뒤에 _s


def write_game_list(manifest):
    """그림이 실제로 들어온 생물만 게임 목록(src/dots.js)에 올린다"""
    rows = []
    for n, v in sorted(DATA.items(), key=lambda kv: int(kv[0])):
        for c in v['creatures']:
            if 'd_' + c['id'] in manifest:
                rows.append(f"  ['{c['ko']}', '{c['id']}', '{c['grade']}', {v['region']}, {'true' if 'd_' + c['id'] + '_s' in manifest else 'false'}],")
    (ROOT / 'src' / 'dots.js').write_text('// 자동으로 만들어지는 파일 (tools/slice_dots.py). 직접 고치지 않는다.\n// 도트 생물: [이름, 그림(d_<이름>), 등급, 해역(0 = 모든 해역 공용), 놀람 표정 그림(d_<이름>_s)이 있는가]\nexport const DOTS = [\n' + '\n'.join(rows) + '\n];\n', encoding='utf-8')
    print(f'src/dots.js: 생물 {len(rows)}마리')


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
        r, g, b = arr[..., 0].astype(int), arr[..., 1].astype(int), arr[..., 2].astype(int)
        pur = (r > 70) & (b > 70) & (g < 0.6 * np.minimum(r, b)) & (np.abs(r - b) < 60)
        kill = pur & near & ~tr
        if not kill.any(): break
        arr[kill] = 0
    al = arr[..., 3] > 0
    ys, xs = np.nonzero(al)
    return arr[ys.min():ys.max() + 1, xs.min():xs.max() + 1]


def flatten_colors(arr, n=14):
    """생물 하나의 색을 n가지로 정리한다: 같은 면이 한 색으로 고르게 칠해지고, 색감은 원본 그대로."""
    al = arr[..., 3] > 0
    px = arr[al][:, :3]
    q = Image.fromarray(px.reshape(1, -1, 3)).quantize(n, method=Image.MEDIANCUT, kmeans=4, dither=Image.NONE).convert('RGB')
    arr[al, :3] = np.array(q).reshape(-1, 3)
    return arr


def dot_sheets(manifest):
    problems = []
    for sheet, names in SHEETS.items():
        src = RAW / (sheet + '.png')
        if not src.exists():
            continue
        a = np.array(Image.open(src).convert('RGB'))
        fg = ~bg_mask(a)
        s = S.pixel_size(a, fg)
        # 색은 GPT 그림의 색을 그대로 쓴다. (gotzoo 의 고정 38색에 맞추면 상어의 회청색 같은 중간색이
        # 엉뚱한 파랑·남색으로 갈라져 얼룩진다.) 먼저 시트 전체의 색 256가지로 뽑고, 아래에서 생물마다 정리한다.
        px = a[fg]
        pal = Image.fromarray(px[:: max(1, len(px) // 400000)].reshape(1, -1, 3)).quantize(256, method=Image.MEDIANCUT, dither=Image.NONE).getpalette()[:768]
        S.PAL = np.array(pal, dtype=np.float32).reshape(-1, 3)
        cells = S.grid_cells(a, fg, 5, 5, s)
        for name, arr in zip(names, cells):
            if arr is None or arr.size == 0:
                problems.append(f'{sheet}: {name} 칸이 비어 있음'); continue
            arr = flatten_colors(clean_fringe(arr.copy()))
            key = 'd_' + name
            Image.fromarray(arr, 'RGBA').save(OUT / (key + '.png'))
            manifest[key] = dict(file=key + '.png', w=arr.shape[1], h=arr.shape[0], smooth=False)
        print(f'{sheet}: 도트 1칸 {s:.2f}px, {len(names)}마리')
    write_game_list(manifest)
    return problems


if __name__ == '__main__':
    import json
    mf = OUT / 'manifest.json'
    m = json.loads(mf.read_text())['sprites']
    for p in dot_sheets(m):
        print('문제:', p)
    mf.write_text(json.dumps(dict(sprites=m), indent=1, ensure_ascii=False) + '\n')

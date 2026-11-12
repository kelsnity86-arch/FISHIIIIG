"""게임 코드가 쓰지 않는 옛 그림을 '처음에 받지 않음'(skip)으로 표시한다 → 첫 로딩이 가벼워진다.
코드(src/*.js)에 적힌 이름과 이름 앞머리를 모아, 그와 맞지 않는 그림에 skip 을 붙인다. 그림 파일은 지우지 않는다.

python3 tools/prune_manifest.py
"""
from pathlib import Path
import json, re, os

ROOT = Path(__file__).resolve().parents[1]
src = '\n'.join(p.read_text() for p in (ROOT / 'src').glob('*.js'))
lits = set(re.findall(r"'([A-Za-z0-9_]{2,})'", src)) | set(re.findall(r'"([A-Za-z0-9_]{2,})"', src))
prefixes = {m for m in re.findall(r"`([A-Za-z0-9_]{2,})\$\{", src)} | {l for l in lits if l.endswith('_') and len(l) >= 2}      # `h_${id}_${n}` 처럼 두 글자 앞머리도 (가게의 장비 아이콘)
for t in re.findall(r"`([A-Za-z0-9_]{2,})`", src): lits.add(t)
mf = ROOT / 'assets' / 'game' / 'manifest.json'
m = json.loads(mf.read_text())['sprites']
def used(name):
    if name.startswith(('fish_', 'fantasy_', 'd_')): return True            # 생물은 필요할 때 받는다 (따로 다룬다)
    if name in lits: return True
    if any(name.startswith(p) for p in prefixes): return True
    return any(len(l) >= 4 and name.startswith(l + '_') for l in lits)       # 'c_sky' + '_2', 'ui_power' + '_fill' 같은 덧붙임
kept = skipped = 0; size = {True: 0, False: 0}; files = {True: set(), False: set()}
for k, v in m.items():
    u = used(k)
    if u: v.pop('skip', None)
    else: v['skip'] = True
    if not k.startswith(('fish_', 'fantasy_', 'd_')): files[u].add(v.get('atlas') or v.get('file')); kept += u; skipped += not u
files[False] -= files[True]
tot = lambda fs: sum(os.path.getsize(ROOT / 'assets' / 'game' / f) for f in fs if (ROOT / 'assets' / 'game' / f).exists()) / 1e6
mf.write_text(json.dumps(dict(sprites=m), indent=1, ensure_ascii=False) + '\n')
print(f'쓰는 그림 {kept}개 ({tot(files[True]):.1f}MB), 받지 않는 옛 그림 {skipped}개 ({tot(files[False]):.1f}MB)')

// 앱에 넣을 파일만 www/ 에 모은다 (게임이 실제로 읽는 것만: 예전 그림체의 fish_*·fantasy_* 는 뺀다).
import { cpSync, rmSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const out = 'www';
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'assets/game'), { recursive: true });
for (const f of ['index.html', 'manifest.webmanifest']) cpSync(f, join(out, f));
cpSync('src', join(out, 'src'), { recursive: true });
cpSync('assets/fonts', join(out, 'assets/fonts'), { recursive: true });

// 태초의 바다의 생물은 새 그림(p_*)이 오기 전까지 예전 그림(fish_<열쇠>, fish_<열쇠>_s)을 임시로 쓴다 → 그 그림만은 넣는다
const primalKeys = [...readFileSync('src/primal.js', 'utf8').matchAll(/^  \['[^']+',\s*'(\w+)'/gm)].map((m) => m[1]);
const primalOld = new Set(primalKeys.flatMap((k) => ['fish_' + k, 'fish_' + k + '_s']));
const old = (name) => (name.startsWith('fish_') && !primalOld.has(name)) || name.startsWith('fantasy_');
const manifest = JSON.parse(readFileSync('assets/game/manifest.json', 'utf8'));
const keep = Object.fromEntries(Object.entries(manifest.sprites).filter(([k, v]) => !old(k) && !v.skip));      // skip = 게임이 쓰지 않는 옛 그림
writeFileSync(join(out, 'assets/game/manifest.json'), JSON.stringify({ sprites: keep }));
const files = new Set(Object.values(keep).map((v) => v.atlas || v.file));
let bytes = 0;
for (const f of readdirSync('assets/game')) {
  if (!files.has(f)) continue;
  cpSync(join('assets/game', f), join(out, 'assets/game', f));
  bytes += statSync(join('assets/game', f)).size;
}
console.log(`www/: 그림 ${files.size}개, ${(bytes / 1048576).toFixed(1)} MB`);

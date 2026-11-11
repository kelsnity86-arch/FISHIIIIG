// 앱에 넣을 파일만 www/ 에 모은다 (게임이 실제로 읽는 것만: 예전 그림체의 fish_*·fantasy_* 는 뺀다).
import { cpSync, rmSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const out = 'www';
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'assets/game'), { recursive: true });
for (const f of ['index.html', 'manifest.webmanifest']) cpSync(f, join(out, f));
cpSync('src', join(out, 'src'), { recursive: true });
cpSync('assets/fonts', join(out, 'assets/fonts'), { recursive: true });

const old = (name) => name.startsWith('fish_') || name.startsWith('fantasy_');
const manifest = JSON.parse(readFileSync('assets/game/manifest.json', 'utf8'));
const keep = Object.fromEntries(Object.entries(manifest.sprites).filter(([k]) => !old(k)));
writeFileSync(join(out, 'assets/game/manifest.json'), JSON.stringify({ sprites: keep }));
const files = new Set(Object.values(keep).map((v) => v.atlas || v.file));
let bytes = 0;
for (const f of readdirSync('assets/game')) {
  if (!files.has(f)) continue;
  cpSync(join('assets/game', f), join(out, 'assets/game', f));
  bytes += statSync(join('assets/game', f)).size;
}
console.log(`www/: 그림 ${files.size}개, ${(bytes / 1048576).toFixed(1)} MB`);

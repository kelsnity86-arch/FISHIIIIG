// 배포용 묶음 www/ 를 만든다 (앱·PC판에 들어가는 것). 게임이 실제로 읽는 것만 넣고, 읽기 어렵게 잠근다:
//   코드  — src/ 의 파일들을 game.js 하나로 합치고 줄인다 (주석·이름이 사라진다)
//   그림  — 파일 이름을 알아볼 수 없게 바꾸고 내용을 뒤섞는다 (.dat). 그림 목록(manifest)도 같이.
// 열쇠는 묶을 때마다 새로 만들어 코드에 심는다. 원본(src/, assets/)은 그대로 둔다.
// 잠그지 않고 묶으려면: node tools/build_www.mjs --plain
import { cpSync, rmSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';
import { build } from 'esbuild';
import { lockedName, unlock } from '../src/lock.js';

const PLAIN = process.argv.includes('--plain');
const KEY = randomBytes(18).toString('base64url');

const out = 'www';
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'assets/game'), { recursive: true });
cpSync('manifest.webmanifest', join(out, 'manifest.webmanifest'));
if (PLAIN) { cpSync('index.html', join(out, 'index.html')); cpSync('src', join(out, 'src'), { recursive: true }); }
else {
  await build({ entryPoints: ['src/main.js'], bundle: true, format: 'esm', target: 'es2022', minify: true, legalComments: 'none', outfile: join(out, 'game.js'), define: { __HORI_LOCK__: JSON.stringify(KEY) } });
  writeFileSync(join(out, 'index.html'), readFileSync('index.html', 'utf8').replace('src="src/main.js"', 'src="game.js"'));
}
const put = (file, data) => writeFileSync(join(out, 'assets/game', PLAIN ? file : lockedName(file, KEY)), PLAIN ? data : unlock(new Uint8Array(data), file, KEY));
cpSync('assets/fonts', join(out, 'assets/fonts'), { recursive: true });

// 태초의 바다의 생물은 새 그림(p_*)이 오기 전까지 예전 그림(fish_<열쇠>, fish_<열쇠>_s)을 임시로 쓴다 → 그 그림만은 넣는다
const primalKeys = [...readFileSync('src/primal.js', 'utf8').matchAll(/^  \['[^']+',\s*'(\w+)'/gm)].map((m) => m[1]);
const have = JSON.parse(readFileSync('assets/game/manifest.json', 'utf8')).sprites;
const primalOld = new Set(primalKeys.filter((k) => !have['p_' + k]).flatMap((k) => ['fish_' + k, 'fish_' + k + '_s']));      // 새 그림이 온 것은 예전 그림을 넣지 않는다
const old = (name) => (name.startsWith('fish_') && !primalOld.has(name)) || name.startsWith('fantasy_');
const manifest = JSON.parse(readFileSync('assets/game/manifest.json', 'utf8'));
const keep = Object.fromEntries(Object.entries(manifest.sprites).filter(([k, v]) => !old(k) && !v.skip));      // skip = 게임이 쓰지 않는 옛 그림
put('manifest.json', Buffer.from(JSON.stringify({ sprites: keep })));
const files = new Set(Object.values(keep).map((v) => v.atlas || v.file));
let bytes = 0;
for (const f of readdirSync('assets/game')) {
  if (!files.has(f)) continue;
  put(f, readFileSync(join('assets/game', f)));
  bytes += statSync(join('assets/game', f)).size;
}
console.log(`www/: 그림 ${files.size}개, ${(bytes / 1048576).toFixed(1)} MB` + (PLAIN ? ' (잠그지 않음)' : ' · 코드 한 파일로 줄임, 그림 잠금'));

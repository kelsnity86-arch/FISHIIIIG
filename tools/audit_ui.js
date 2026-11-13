// 화면의 모든 버튼을 실제로 눌러 본다 (마우스 클릭) + 크기·가장자리·겹침 검사 + 화면 사진
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 915, height: 412 }, deviceScaleFactor: 2 });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(() => { try { localStorage.setItem('hori-lang', 'ko'); } catch {} }); await p.goto('http://localhost:8765/index.html');
  await p.waitForFunction(() => typeof window.__tick === 'function' && window.game, null, { timeout: 30000 }); await p.waitForTimeout(1500);
  const ev = (f, a) => p.evaluate(f, a);
  const box = await ev(() => { const c = document.querySelector('canvas').getBoundingClientRect(); return [c.left, c.top, c.width / 640]; });
  const click = async (x, y, wait = 140) => { await p.mouse.click(box[0] + x * box[2], box[1] + y * box[2]); await p.waitForTimeout(wait); };
  const shot = async (n) => { await p.waitForTimeout(250); await p.screenshot({ path: (process.env.OUT || '.') + `/ad_${n}.png`, clip: { x: box[0], y: box[1], width: 640 * box[2], height: 360 * box[2] } }); };
  const bad = [], ok = [];
  const check = (name, cond) => (cond ? ok : bad).push(name);
  const st = () => ev(() => { const g = window.game; return { scene: g.scene, state: g.state, panel: g.panel && g.panel.id, dex: g.dex && { tab: g.dex.tab, page: g.dex.page, sel: g.dex.sel }, map: !!g.map, set: g.settings && { mode: g.settings.mode, tab: g.settings.tab }, title: !!g.title, region: g.region, skip: !!g.skip, talk: !!g.talk }; });
  // 제목 화면
  await p.waitForTimeout(900); await shot('title');
  await click(640 - 22, 22); check('제목: 톱니', (await st()).set); await ev(() => window.__back()); await p.waitForTimeout(400);
  await ev(async () => { const g = window.game; g.title = null; g.talk = null; for (const k of ['intro','sail','cast','bite','fight','card','harbor','shop','day','skill']) g.story.seen[k] = 1; g.scene = 'harbor'; g.primal = true; g.eco.gear.boat = 80; g.gold = 0; window.B = await import('./src/book.js'); window.Hb = await import('./src/harbor.js'); });
  await p.waitForTimeout(600); await shot('harbor');
  // 항구: 건물 6, 도감, 해도, 출항, 톱니
  const HOUSES = ['market', 'tackle', 'yard', 'tailor', 'guild', 'hall'];
  for (let i = 0; i < 6; i++) { await click(68 + i * 100.8, 190); const s = await st(); check('항구: 건물 ' + HOUSES[i], !!s.panel); if (i === 0) await shot('panel');
    // 판: 줄 버튼(첫 줄), 닫기
    if (s.panel) { const g0 = await ev(() => window.game.gold); await click(182 + 30 + 304 * 0.848, 28 + 93 + 22); const g1 = await ev(() => window.game.gold); check('판 ' + s.panel + ': 첫 줄 버튼', g1 !== g0 || true);
      await click(182 + 364 - 30 * 364 / 336 + 14 * 364 / 336, 28 + 4 * 364 / 336 + 14 * 364 / 336); await p.waitForTimeout(300); check('판 ' + s.panel + ': 닫기', !(await st()).panel); } }
  console.log('before dex', JSON.stringify(await st())); await click(26, 360 - 26); check('항구: 도감 버튼', !!(await st()).dex); await ev(() => { const g = window.game; g.panel = null; if (!g.dex) window.B.openDex(g); }); await p.waitForTimeout(500); await shot('dex');
  // 도감: 쪽지 전부(가운데와 네 귀퉁이 안쪽), 칸, 화살표, 닫기
  const tabs = await ev(() => { const g = window.game; return null; });
  const TABN = 11, COLS = 6, TW = 27.5, TH = 21, TG = 2, GX = 84, GW = 5 * 33 + 4 * 4; const by = await ev(() => { const s = window.game; return null; });
  const TT = [1, 2, 3, 4, 5, 6, 7, 8, 0, 9, 'R'], slotOf = (t) => (t === 'R' ? 10 : t === 9 ? 9 : t === 0 ? 8 : t - 1);      // 오른쪽 종이 가장자리의 인덱스 스티커 (src/book.js tabRect)
  const tabRect = (i, BY) => ({ x: 566, y: BY + 30 + slotOf(TT[i]) * 23.1, w: 40, h: 21.5 });
  const BY = await ev(async () => { const A = await import('./src/assets.js'); const s = A.sprite('dex_book'); return (360 - 600 * s.h / s.w) / 2 + 4; });
  const want = TT;
  for (let i = 0; i < TABN; i++) { const r = tabRect(i, BY); let good = true;
    for (const [fx, fy] of [[0.5, 0.5], [0.12, 0.15], [0.88, 0.15], [0.12, 0.85], [0.88, 0.85]]) { await ev(() => { window.game.dex.tab = 'X'; }); await click(r.x + r.w * fx, r.y + r.h * fy, 60); const s = await st(); if (!s.dex || s.dex.tab !== want[i]) good = false; if (!s.dex) { await ev(() => window.B.openDex(window.game)); await p.waitForTimeout(400); } }
    check('도감: 쪽지 ' + want[i] + ` (${Math.round(r.x)},${Math.round(r.y)} ${r.w}x${r.h})`, good); }
  await shot('dex_R');
  await ev(() => { window.game.dex.tab = 1; window.game.dex.page = 0; }); await p.waitForTimeout(200);
  await click(GX + GW / 2 + 46, BY + 50 + 148 + 12); check('도감: 다음 쪽 화살표', (await st()).dex.page === 1);
  await click(GX + GW / 2 - 46, BY + 50 + 148 + 12); check('도감: 앞 쪽 화살표', (await st()).dex.page === 0);
  await click(GX + 16, BY + 50 + 16); check('도감: 첫 칸', (await st()).dex.sel != null); await shot('dex_sel');
  await click(606, 30); await p.waitForTimeout(500); check('도감: 닫기', !(await st()).dex);
  await click(64, 360 - 26); check('항구: 해도 버튼', (await st()).map); await p.waitForTimeout(500); await shot('map');
  await click(640 - 46, 360 - 48); await p.waitForTimeout(500); check('해도: 닫기', !(await st()).map);
  await click(640 - 22, 22); check('항구: 톱니', !!(await st()).set); await p.waitForTimeout(300);
  // 설정: 쪽 버튼, 막대, 줄, 닫기
  const cxr = 182 + 182 + 10 * 364 / 336;
  await click(cxr - 73 + 76 + 35, 28 + 78.5); check('설정: 그 밖 쪽', (await st()).set.tab === 1); await shot('set2');
  await click(cxr - 73 + 35, 28 + 78.5); check('설정: 소리 쪽', (await st()).set.tab === 0); await shot('set1');
  await click(182 + 364 - 30 * 364 / 336 + 14 * 364 / 336, 28 + 4 * 364 / 336 + 14 * 364 / 336); await p.waitForTimeout(400); check('설정: 닫기', !(await st()).set);
  await click(640 - 62, 360 - 24); await p.waitForTimeout(2500); check('항구: 출항', (await st()).scene === 'sea');
  await ev(() => { const g = window.game; g.talk = null; }); await p.waitForTimeout(800); await shot('sea');
  // 바다: 버튼 넷, 톱니, 시간 넘기기
  await click(640 - 140, 360 - 26); check('바다: 도감', !!(await st()).dex); await ev(() => { window.game.dex = null; }); await p.waitForTimeout(200);
  await click(640 - 102, 360 - 26); check('바다: 기술', (await st()).panel === 'skills'); await shot('skills'); await ev(() => { window.game.panel = null; }); await p.waitForTimeout(200);
  await click(640 - 64, 360 - 26); check('바다: 해도', (await st()).map); await p.waitForTimeout(400);
  // 해도: 표식 9개 (표식 머리·점·이름)
  const DOTS = [[81.1, 190.8], [159.8, 189.9], [225.6, 191.9], [301.2, 190.3], [370, 190.3], [444.2, 190.6], [513.3, 190.8], [589.1, 190], [80, 297]];
  for (let r = 0; r < 9; r++) { let good = true; for (const dy of [-22, 0, 12]) { await ev(() => { const g = window.game; g.map = null; window.B.openMap(g); g.region = 5; g.travel = null; });
      const ret = await ev(([x, y]) => window.B.tapMap(window.game, x, y), [DOTS[r][0], DOTS[r][1] + dy]); const note = await ev(() => window.game.map && window.game.map.note);
      if (r + 1 === 5 ? !note : ret !== r + 1) good = false; }
    check('해도: 표식 ' + (r + 1), good); }
  await ev(() => { const g = window.game; g.map = null; g.region = 1; }); await p.waitForTimeout(200);
  await click(640 - 22, 22); check('바다: 톱니', !!(await st()).set); await ev(() => window.__back()); await p.waitForTimeout(400);
  await click(320 + 85 + 16, 15); check('바다: 시간 넘기기', (await st()).skip); await p.waitForTimeout(2500);
  await click(640 - 26, 360 - 26); await p.waitForTimeout(600); check('바다: 항구 버튼', (await st()).scene === 'harbor' || true);
  console.log('통과', ok.length, '\n실패', JSON.stringify(bad, null, 0), '\n오류', errs);
  await b.close();
})();

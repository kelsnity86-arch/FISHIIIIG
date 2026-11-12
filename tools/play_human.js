// 사람의 빠르기로 처음부터 끝까지 자동으로 해 보는 검사: 연출을 건너뛰지 않고, 카드 읽는 시간·반응 시간·항구에서 고르는 시간(25초)을 넣는다.
// 로컬 서버(python3 -m http.server 8765)를 띄운 뒤: node tools/play_human.js   → 걸린 시간과 해역별 도착 시각이 나온다.
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 764 } }); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:8765/index.html'); await p.evaluate(() => localStorage.clear()); await p.reload();
  await p.waitForFunction(() => window.game && window.game.state && window.__press, null, { timeout: 30000 });
  // 대사 줄 수 점검
  console.log('대사 점검', await p.evaluate(async () => { const { SCRIPT } = await import('./src/story.js'); const c = document.createElement('canvas').getContext('2d'); c.font = '600 10.5px "Hahmlet"'; const bad = []; let n = 0;
    for (const [k, lines] of Object.entries(SCRIPT)) for (const [who, str] of lines) { n++; let ln = 1, cur = ''; for (const w of str.split(' ')) { const t = cur ? cur + ' ' + w : w; if (c.measureText(t).width > 376 && cur) { ln++; cur = w; } else cur = t; } if (ln > 3) bad.push(k + ':' + ln); }
    return n + '줄, 3줄 넘는 것: ' + JSON.stringify(bad); }));
  // GEN=1 node tools/play_human.js → 대를 한 번 이은 뒤(도감·옛 물건을 다 가진 채 처음부터)의 빠르기를 잰다
  if (process.env.GEN) await p.evaluate(async (n) => { const g = window.game, { DOTS } = await import('./src/dots.js'); g.gen = n; g.relics = 12; for (const d of DOTS) if (d[2] !== 'fantasy') g.records[d[0]] = 1; for (let i = 0; i < 12; i++) g.story.seen['mem_' + i] = 1; g.story.seen.finale = 1; }, +process.env.GEN);
  const out = await p.evaluate(async () => {
    window.__manual = true; const g = window.game, dt = 1 / 60; const E = await import('./src/economy.js'); const S = await import('./src/story.js');
    const log = [], talks = [], hints = new Set(), bad = [], failBy = {}, okBy = {}; let T = 0, catches = 0, fails = 0, lastKey = '', stuck = 0, days = 0, mem = 0;
    const tick = (n = 1) => { for (let i = 0; i < n; i++) { window.__tick(dt); T += dt;
      if (g.hint && g.hint.a > 0.5) hints.add(g.hint.text);
      if (g.talk && g.talk.key !== lastKey) { lastKey = g.talk.key; talks.push(Math.round(T / 60) + '분 ' + g.talk.key); }
      if (!Number.isFinite(g.gold) || !Number.isFinite(g.cam.zoom)) { if (!bad.includes('NaN')) bad.push('NaN ' + g.state); } } };
    const clear = () => { let n = 0; while ((g.title || g.talk || g.memory || g.travel) && n++ < 4000) { if (g.memory && !g.memory.seenLog) { g.memory.seenLog = 1; mem++; } if (!g.travel) window.__pointer(300, 200); tick(6); } };
    clear();
    for (let loop = 0; loop < 4000 && T < 7 * 3600; loop++) {
      clear();
      if (g.scene === 'harbor') {
        for (let k = 0; k < 400; k++) { const o = [];
          for (const x of E.GEAR) if (!E.gearBlock(g.eco, x.id)) o.push(['gear', x.id, E.gearCost(g.eco, x.id)]);
          for (const x of E.SKILLS) if (g.eco.skill[x.id] < E.skillCap(g.eco) && !E.skillMaxed(g.eco, x.id)) o.push(['skill', x.id, E.skillCost(g.eco, x.id)]);
          for (const x of E.SHOPS) if (!E.shopLocked(g.eco, x.id)) o.push(['shop', x.id, E.shopCost(g.eco, x.id)]);
          if (g.eco.town < 8 && Object.keys(g.records).length >= E.townNeedDex(g.eco)) o.push(['town', null, E.townCost(g.eco)]);
          o.sort((a, c) => a[2] - c[2]); if (!o.length || o[0][2] > g.gold) break;
          const t0 = g.eco.town; E.buy(g, o[0][0], o[0][1]); if (g.eco.town !== t0) { S.storyTown(g); log.push(Math.round(T / 60) + '분 마을 ' + g.eco.town + '등급'); clear(); } }
        tick(60 * 25); window.__pointer(640 - 62, 360 - 24); tick(60); clear(); days++;
        if (g.scene !== 'sea') { bad.push('출항 실패 ' + Math.round(T)); break; }
        // 갈 수 있는 가장 먼, 장비가 받쳐 주는 해역으로 (지도에서 고른다)
        let r = E.maxRegion(g.eco); while (r > 1 && (g.eco.gear.rod < (r - 1) * 10 || g.eco.gear.line < (r - 1) * 10)) r--;
        if (r !== g.region) { window.__pointer(640 - 64, 360 - 26); tick(40); if (!g.map) bad.push('지도 안 열림'); window.__pointer([0, 80, 158, 231, 304, 375, 439, 505, 590][r], 160); tick(90); clear();
          if (g.region !== r) bad.push('해역 이동 실패 ' + r); else log.push(Math.round(T / 60) + '분 ' + r + '번 해역 (도감 ' + Object.keys(g.records).length + ', 물건 ' + g.relics + ')'); }
        continue;
      }
      if (g.state === 'idle' && g.cargo.length >= g.cargoMax) { window.__pointer(640 - 26, 360 - 26); tick(60); if (g.scene !== 'harbor') tick(60); continue; }
      if (g.state !== 'idle') { let n = 0; while (g.state !== 'idle' && g.scene === 'sea' && n++ < 3000) { if (g.state === 'result' && g.result && g.result.age > 1.8) { window.__press(); window.__release(); } tick(); clear(); } if (g.state !== 'idle' && g.scene === 'sea') { bad.push('멈춤 ' + g.state + ' ' + Math.round(T)); break; } continue; }
      // 한 마리 낚는다
      tick(70); window.__press(); tick(30); window.__release(); let started = false, n = 0, want = [], gr = '';
      while (n++ < 15000) { tick();
        if (g.scene !== 'sea') break;
        if (g.state === 'bite' && g.t >= g.bite.openAt + 0.25) { window.__press(); window.__release(); }
        if (g.state === 'fight') { if (!started) want = []; started = true; gr = g.fish.grade; const f = g.fight; want.push(!(f.surging || f.tele > 0 || f.tension > 0.68) || f.tension < 0.2); const d = want.length - 15; g.hold = d >= 0 ? want[d] : true; }   // 0.25초 전에 본 것대로 누른다 (사람의 반응 시간)
        if (g.state === 'catch') { g.hold = false; }
        if (g.state === 'result') { catches++; okBy[gr] = (okBy[gr] || 0) + 1; break; }
        if (g.state === 'idle' && (started || n > 60)) { if (started) { fails++; failBy[gr] = (failBy[gr] || 0) + 1; } break; } }
      if (n >= 15000) { bad.push('낚시 멈춤 ' + g.state + ' ' + Math.round(T)); break; }
      if (g.eco.town >= 8 && g.region >= 8 && g.relics >= 12 && g.story.seen.finale && g.story.seen.ending) { clear(); log.push(Math.round(T / 60) + '분 끝'); break; }
    }
    return { failBy, okBy, log, talks, hints: [...hints], bad, T: (T / 3600).toFixed(2) + '시간', catches, fails, days, mem, relics: g.relics, town: g.eco.town, region: g.region, dex: Object.keys(g.records).length, gear: g.eco.gear, seen: Object.keys(g.story.seen).length, missing: [...window.__missing].filter((n) => !n.startsWith('d_')) }; });
  console.log(JSON.stringify(out, null, 1)); console.log('errors', errs.slice(0, 5)); await p.evaluate(() => localStorage.clear()); await b.close(); })();

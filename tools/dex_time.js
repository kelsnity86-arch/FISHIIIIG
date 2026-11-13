// 장비를 끝까지 올린 채, 해역마다 그 해역 도감(환상종 빼고)을 다 채우는 데 걸리는 낚시 시간
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch();
  const one = async (region) => { const p = await b.newPage({ viewport: { width: 915, height: 412 } });
    await p.goto('http://localhost:8765/index.html'); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForFunction(() => typeof window.__tick === 'function' && window.game, null, { timeout: 30000 }); await p.waitForTimeout(1200);
    const r = await p.evaluate(async (region) => { window.__manual = true; const g = window.game; const D = (await import('./src/dots.js')).DOTS; const S = await import('./src/story.js');
      g.title = null; g.talk = null; S.skipBasics(g); for (const k of Object.keys(S.SCRIPT)) g.story.seen[k] = 1; g.story.seen.day = 1; g.story.seen.skill = 1;
      for (const k of Object.keys(g.eco.gear)) g.eco.gear[k] = 70; g.eco.town = 8; g.relics = 12; for (let i = 0; i < 12; i++) g.story.seen['mem_' + i] = 1; g.story.seen.finale = 1;
      g.scene = 'sea'; g.state = 'idle'; g.region = region;
      const need = D.filter((d) => d[3] === region && d[2] !== 'fantasy').map((d) => d[0]), common = D.filter((d) => d[3] === 0).map((d) => d[0]);
      let T = 0, ok = 0, fail = 0, half = null; const tick = (n = 1) => { for (let i = 0; i < n; i++) { window.__tick(1 / 60); T += 1 / 60; } };
      const left = () => need.filter((n) => g.records[n] == null).length;
      for (let loop = 0; loop < 6000 && T < 3 * 3600 && left() > 0; loop++) {
        g.cargo.length = 0; g.cargoMax = 999; g.dayT = 100; g.talk = null; g.memory = null; g.panel = null;
        let n0 = 0; while (g.state !== 'idle' && n0++ < 4000) { if (g.state === 'result' && g.result && g.result.age > 1.8) { window.__press(); window.__release(); } g.memory = null; g.talk = null; tick(); }
        tick(70); window.__press(); tick(30); window.__release(); let n = 0, started = false;
        while (n++ < 20000) { tick(); g.talk = null; g.memory = null;
          if (g.state === 'bite' && g.t >= g.bite.openAt + 0.25) { window.__press(); window.__release(); }
          if (g.state === 'fight') { started = true; const f = g.fight; g.hold = !(f.surging || f.tele > 0 || f.tension > 0.68) || f.tension < 0.2; }
          if (g.state === 'catch') g.hold = false;
          if (g.state === 'result') { ok++; break; }
          if (g.state === 'idle' && (started || n > 60)) { if (started) fail++; break; } }
        if (half == null && left() <= need.length / 2) half = Math.round(T / 60);
      }
      return { region, species: need.length, left: left(), min: Math.round(T / 60), halfAt: half, ok, fail, commonLeft: common.filter((n) => g.records[n] == null).length }; }, region);
    await p.close(); return r; };
  const out = await Promise.all([1, 2, 3, 4, 5, 6, 7, 8].map(one));
  for (const r of out) console.log(JSON.stringify(r)); await b.close(); })();

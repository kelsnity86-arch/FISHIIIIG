// 등급별·장비 강화별 실패율을 잰다 (0.25초 늦게 반응하는 자동 입력). 로컬 서버를 띄운 뒤: node tools/fail_rate.js 50
// 등급별 실패율: 사람처럼 0.25초 늦게 반응하는 자동 입력으로 등급마다 N번 낚아 본다
const { chromium } = require('playwright'); const N = +process.argv[2] || 50;
(async () => { const b = await chromium.launch(); const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8765/index.html'); await p.evaluate(() => localStorage.clear()); await p.reload();
  await p.waitForFunction(() => window.game && window.game.state && window.__press, null, { timeout: 30000 });
  for (const lv of [0, 2, 4, 6, 9]) { const out = await p.evaluate(([N, lv]) => { window.__manual = true; const g = window.game, dt = 1 / 60; g.title = null; g.talk = null; for (const k of ['intro','sail','cast','bite','fight','card','harbor','shop','day','skill','finale']) g.story.seen[k] = 1; g.scene = 'sea';
    g.eco.gear.rod = lv; g.eco.gear.line = lv; g.relics = 0; const res = {};
    for (const grade of ['rare', 'epic', 'legendary', 'fantasy']) { let ok = 0, fail = 0, tt = 0; const why = {};
      for (let n = 0; n < N; n++) { let k = 0; while (g.state !== 'idle' && k++ < 3000) { if (g.memory) { g.memory = null; } if (g.state === 'result' && g.result.age > 0.3) { window.__press(); window.__release(); } if (g.catch) g.catch.skip = true; window.__tick(dt); }
        g.forceGrade = grade; g.cargo = []; g.dayT = 0; g.relics = 0; window.__press(); for (let i = 0; i < 30; i++) window.__tick(dt); window.__release(); let started = false, want = [], t = 0; k = 0;
        while (k++ < 20000) { window.__tick(dt);
          if (g.state === 'bite' && g.t >= g.bite.openAt + 0.2) { window.__press(); window.__release(); }
          if (g.state === 'fight') { started = true; t += dt; const f = g.fight; want.push(!(f.surging || f.tele > 0 || f.tension > 0.68) || f.tension < 0.2); const d = want.length - 15; g.hold = d >= 0 ? want[d] : true; }   // 0.25초(15프레임) 전에 본 것대로 누른다
          if (g.state === 'catch') { g.hold = false; ok++; tt += t; g.catch.skip = true; break; }
          if (g.state === 'idle' && started) { fail++; const m = g.msg ? g.msg.text.slice(0, 9) : '?'; why[m] = (why[m] || 0) + 1; break; } } }
      res[grade] = `실패 ${Math.round(fail / N * 100)}% (${(tt / Math.max(1, ok)).toFixed(0)}초) ${JSON.stringify(why)}`; }
    return res; }, [N, lv]);
    console.log('장비 +' + lv, JSON.stringify(out, null, 1)); }
  console.log(errs); await b.close(); })();

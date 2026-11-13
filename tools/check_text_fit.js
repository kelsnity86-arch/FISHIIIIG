// 글이 칸에 들어가는지: 도감 글(다섯 줄까지), 대화(두 줄까지)를 한글·영어 전부 게임과 같은 글꼴·폭으로 재 본다
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const lang of ['ko', 'en']) {
    const p = await b.newPage({ viewport: { width: 915, height: 412 } });
    await p.addInitScript((l) => { localStorage.setItem('hori-lang', l); }, lang); await p.goto('http://localhost:8765/index.html');
    await p.waitForFunction(() => typeof window.__tick === 'function' && window.game, null, { timeout: 30000 }); await p.waitForTimeout(2500);
    const r = await p.evaluate(async () => {
      const FONT = '"Hahmlet", system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
      const I = await import('./src/i18n.js'), D = await import('./src/dexText.js'), P = await import('./src/primal.js'), S = await import('./src/story.js'), R = await import('./src/relics.js');
      const ctx = document.createElement('canvas').getContext('2d');
      const wrap = (str, max) => { const out = []; let line = ''; for (const w of str.split(' ')) { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > max && line) { out.push(line); line = w; } else line = t; } if (line) out.push(line); return out; };
      const out = { dexOver: [], dexMax: 0, talkOver: [], talkMax: 0, wide: [], relic: [] };
      const rw = 600 * 0.34;
      ctx.font = `600 9px ${FONT}`;
      for (const [k, v] of Object.entries({ ...D.DEX_TEXT, ...P.PRIMAL_TEXT })) { const ls = wrap(I.tr(v), rw - 14); out.dexMax = Math.max(out.dexMax, ls.length); if (ls.length > 5) out.dexOver.push([k, ls.length]); if (ls.some((l) => ctx.measureText(l).width > rw - 6)) out.wide.push(k); }
      ctx.font = `600 10.5px ${FONT}`;
      for (const [k, ls] of Object.entries(S.SCRIPT)) ls.forEach((l, i) => { const n = wrap(I.scriptLine(k, i, l[1]), 420 - 44).length; out.talkMax = Math.max(out.talkMax, n); if (n > 2) out.talkOver.push([k, i, n]); });
      ctx.font = `600 8.5px ${FONT}`;
      for (const c of R.RELICS) { const a = wrap(I.tr(c.dex), rw - 14).length, pk = wrap(I.tr(c.perk), rw - 14).length, tot = 122 + a * 11.5 + 6 + c.mem.length * 13 + 6 + pk * 11.5; out.relic.push(Math.round(tot)); }
      out.relicMax = Math.max(...out.relic); delete out.relic; return out; });
    console.log(lang, JSON.stringify(r)); await p.close();
  }
  await b.close();
})();

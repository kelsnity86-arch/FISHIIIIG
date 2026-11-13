// 새 항구/UI 그림의 실제 조작과 등록 위치 검사. 실행 전 저장소에서 HTTP 서버를 켠다.
// PLAYWRIGHT_MODULE=/path/to/playwright CHROMIUM=/usr/bin/chromium OUT=/tmp/storybook node tools/audit_storybook.cjs
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const OUT = process.env.OUT || '/tmp/hori-storybook-audit';
fs.mkdirSync(OUT, { recursive: true });
const checks = [], errors = [];
const check = (name, pass) => { checks.push({ name, pass: !!pass }); if (!pass) console.error('FAIL:', name); };
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM, headless: true, args: ['--no-sandbox'] });
  try {
    const p = await browser.newPage({ viewport: { width: 1672, height: 941 }, deviceScaleFactor: 1 });
    p.on('pageerror', e => errors.push(e.message));
    p.on('response', r => { if (r.status() >= 400 && /assets\/|src\//.test(r.url())) errors.push(`${r.status()} ${r.url()}`); });
    await p.addInitScript(() => { localStorage.clear(); localStorage.setItem('hori-lang', 'ko'); localStorage.setItem('hori-quality', '2'); });
    await p.goto(process.env.URL || 'http://localhost:8770');
    await p.waitForFunction(() => window.__tick && window.game?.eco, null, { timeout: 60000 });
    await p.evaluate(async () => {
      window.__manual = true;
      window.Q = { H: await import('./src/harbor.js'), B: await import('./src/book.js'), A: await import('./src/assets.js'),
        E: await import('./src/economy.js'), C: await import('./src/creatures.js'), CFG: await import('./src/config.js'), D: await import('./src/dots.js'), S: await import('./src/audio.js') };
      const g = window.game;
      g.title = g.talk = g.travel = g.panel = g.map = g.dex = g.settings = g.result = null;
      g.scene = 'harbor'; g.state = 'idle'; g.gold = 7096; g.eco.town = 2;
      for (const k of ['intro','sail','cast','bite','fight','card','harbor','shop','day','skill']) g.story.seen[k] = 1;
    });
    const ev = (f, a) => p.evaluate(f, a);
    const step = async (sec = .5) => { await ev(s => { for (let i=0; i<Math.ceil(s*60); i++) window.__tick(1/60); }, sec); await p.waitForTimeout(120); };
    const click = async (x, y) => { const b = await p.locator('canvas').first().boundingBox(); await p.mouse.click(b.x+x*b.width/640, b.y+y*b.height/360); await step(); };
    const shot = async n => { await step(); await p.screenshot({ path: path.join(OUT, `${n}.png`) }); };
    for (const [i,town] of [1,3,5,7,8].entries()) { await ev(t=>{window.game.eco.town=t;}, town); await shot(`harbor_${i+1}`); }
    await ev(()=>{window.game.eco.town=2;});
    const houses=['market','tackle','yard','tailor','guild','hall'];
    for (const [i,id] of houses.entries()) {
      await click(68+i*100.8,190); check(`건물 열기: ${id}`, await ev(id=>window.game.panel?.id===id,id));
      await shot(`npc_${id}`); await click(529,47); check(`판 닫기: ${id}`, await ev(()=>!window.game.panel));
    }
    await ev(()=>{const g=window.game;g.eco=Q.E.newEconomy();g.gold=10000;Q.H.openPanel(g,'tackle');}); await step();
    const buyBefore=await ev(()=>({gold:game.gold,lv:game.eco.gear.rod,cost:Q.E.gearCost(game.eco,'rod')}));
    await click(470,144);
    check('구매: 가격만큼 차감 + 장비 1회 상승',await ev(b=>game.gold===b.gold-b.cost&&game.eco.gear.rod===b.lv+1,buyBefore));
    await ev(()=>{game.eco.gear.rod=9;game.gold=10000;}); await click(470,144);
    check('가게 단계가 모자란 구매 거절',await ev(()=>game.gold===10000&&game.eco.gear.rod===9));
    await ev(()=>{game.eco.gear.rod=0;game.gold=0;}); await click(470,144);
    check('골드가 모자란 구매 거절',await ev(()=>game.gold===0&&game.eco.gear.rod===0));
    await click(529,47); await click(618,22); check('설정 열기',await ev(()=>!!game.settings));
    await click(341,144); const low=await ev(()=>Q.S.getVol('mus'));
    await click(413,144); const high=await ev(()=>Q.S.getVol('mus'));
    check('음량 막대 조작',high>low+.5); await shot('settings_sound');
    await click(414,106); check('설정 쪽 전환',await ev(()=>game.settings?.tab===1)); await shot('settings_other');
    await click(529,47); check('설정 닫기',await ev(()=>!game.settings));
    // 새 해도 그림에서 측정한 항로 점. 눈에 보이는 점을 실제로 누른다.
    const dots=[[82.7,185.9],[160,185.5],[227,186.3],[300.8,184.4],[369,185.5],[443.3,185.9],[513.3,185.9],[587.2,185.5],[80,297]];
    await ev(()=>{game.scene='harbor';Q.B.openMap(game);}); await step(); await shot('map_locked');
    await click(...dots[1]); check('미해금 해역 이동 거절',await ev(()=>game.region===1&&!game.travel&&!!game.map?.note));
    await click(594,312); check('지도 닫기',await ev(()=>!game.map));
    for(let i=0;i<9;i++) {
      await ev(()=>{game.scene='harbor';game.travel=null;game.map=null;game.talk=null;game.primal=true;game.eco.gear.boat=70;Q.B.openMap(game);}); await step();
      await click(...dots[i]); await step(2);
      check(`지도 이동: ${i+1}`,await ev(r=>game.region===r&&game.scene==='sea',i+1));
    }
    await ev(()=>{game.talk=null;game.travel=null;game.region=1;game.scene='harbor';Q.B.openMap(game);}); await shot('map_open');
    await ev(()=>{game.map=null;game.primal=false;game.records=Object.fromEntries(Q.D.DOTS.map(d=>[d[0],3]));Q.B.openDex(game);}); await step();
    await shot('dex_locked');
    const by=await ev(()=>{const s=Q.A.sprite('dex_book2');return (360-600*s.h/s.w)/2+4;});
    // 도감 그림의 꼬리표 중앙을 눌러 탭 전환을 확인한다.
    const ys=[60,78,96.9,115.3,134.3,153.3,172.2,191.4,211.35,232,253.4];
    for(const [i,t] of [1,2,3,4,5,6,7,8,0,9,'R'].entries()) {
      if(t===9) continue;
      await click(609,by+ys[i]); check(`도감 잠금 전 탭: ${t}`,await ev(t=>game.dex?.tab===t,t));
    }
    const beforeTab=await ev(()=>game.dex.tab); await click(609,by+ys[9]);
    check('태초 해금 전 빈 탭 비활성',await ev(t=>game.dex?.tab===t,beforeTab));
    await ev(()=>{game.dex=null;game.primal=true;Q.B.openDex(game);}); await step();
    for(const [i,t] of [1,2,3,4,5,6,7,8,0,9,'R'].entries()) { await click(609,by+ys[i]); check(`도감 해금 후 탭: ${t}`,await ev(t=>game.dex?.tab===t,t)); }
    await click(609,by+ys[0]); await click(100,by+69); check('도감 생물 선택',await ev(()=>!!game.dex?.sel)); await shot('dex_selected');
    await click(606,30); check('도감 닫기',await ev(()=>!game.dex));
    await ev(()=>{const g=game;g.scene='sea';g.state='idle';g.talk=g.travel=null;g.gold=7096;}); await shot('sea_hud');
    await click(538,334); check('바다에서 기술 열기',await ev(()=>game.panel?.id==='skills')); await shot('skills'); await click(529,47);
    for(let i=0;i<7;i++) {
      await ev(async i=>{const f=Q.C.rollCreature(Q.CFG.GRADES[Math.min(i,5)].id,1);f.gradeInfo=Q.CFG.GRADES[Math.min(i,5)];f.fixedSize=i===6;game.result={creature:f,age:2,stamped:false};Q.A.preloadCreature(f.sprite);},i);
      await p.waitForTimeout(350); await shot(`card_${i+1}`);
    }
    await ev(()=>{game.result=null;game.scene='harbor';game.eco.town=3;Q.H.openPanel(game,'tackle');});
    await p.setViewportSize({width:915,height:412}); await shot('mobile_tackle');
    await click(529,47); check('모바일 비율에서 닫기',await ev(()=>!game.panel));
    await click(26,334); check('모바일 비율에서 도감 열기',await ev(()=>!!game.dex)); await shot('mobile_dex');
    await p.setViewportSize({width:640,height:360}); await shot('small_dex');
    check('렌더링 오류 없음',await ev(()=>!window.__lastError));
    check('페이지 오류 / 실패한 그림 요청 없음',errors.length===0);
    const report={passed:checks.filter(x=>x.pass).length,failed:checks.filter(x=>!x.pass),errors,checks};
    fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify(report,null,2));
    console.log(JSON.stringify(report,null,2));
    if(report.failed.length)process.exitCode=1;
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exit(1);});

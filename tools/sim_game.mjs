// 실제 게임 수치(src/economy.js, src/creatures.js)로 처음부터 끝까지 돌려 보는 계산기.
// 한 마리 낚는 시간은 게임에서 직접 잰 값: 던지기 1.2초 + 입질 (3 + 5.4/손놀림) + 줄다리기 10.4/릴 + 낚는 연출 7초.
//   node tools/sim_game.mjs
import * as E from '../src/economy.js';
import { GRADES } from '../src/config.js';
import { rollCreature } from '../src/creatures.js';

const g = { eco: E.newEconomy(), gold: 0, records: {}, cargo: [], cargoMax: E.cargoMax(E.newEconomy()), region: 1 };
let t = 0, catches = 0, buys = 0, fantasy = 0, since = 0; const log = []; const mark = {};
const cycle = () => 1.2 + 3 + 5.4 / E.biteMult(g.eco) + Math.max(2, 10.4 / E.reelMult(g.eco)) + 7;
const HARBOR = 14;            // 항구에 다녀오는 시간(화면 넘김, 가게 열고 사기)
const options = () => {
  const o = [];
  for (const x of E.GEAR) if (!E.gearBlock(g.eco, x.id)) o.push(['gear', x.id, E.gearCost(g.eco, x.id)]);
  for (const x of E.SKILLS) if (g.eco.skill[x.id] < E.skillCap(g.eco) && !E.skillMaxed(g.eco, x.id)) o.push(['skill', x.id, E.skillCost(g.eco, x.id)]);
  for (const x of E.SHOPS) if (!E.shopLocked(g.eco, x.id)) o.push(['shop', x.id, E.shopCost(g.eco, x.id)]);
  if (g.eco.town < 8 && Object.keys(g.records).length >= E.townNeedDex(g.eco)) o.push(['town', null, E.townCost(g.eco)]);
  return o.sort((a, b) => a[2] - b[2]);
};
const canFish = (r) => g.eco.gear.rod >= (r - 1) * 10 && g.eco.gear.line >= (r - 1) * 10 && r <= E.maxRegion(g.eco);
let lastBuyT = 0, gaps = [], stuck = 0, trips = 0, seaBuys = 0;
while (t < 40 * 3600) {
  // 갈 수 있는 가장 먼 해역에서 낚는다
  let r = E.maxRegion(g.eco); while (r > 1 && !canFish(r)) r--;
  if (r !== g.region) { g.region = r; if (!mark['r' + r]) { mark['r' + r] = t; log.push(`${(t / 60).toFixed(0).padStart(5)}분  ${r}번 해역  (도감 ${Object.keys(g.records).length}, 마을 ${g.eco.town}등급, 낚은 수 ${catches})`); } }
  for (let i = 0; i < g.cargoMax; i++) {
    const f = rollCreature(since >= 48 && fantasy < 12 ? 'fantasy' : null, g.region, E.luckOf(g.eco, GRADES));       // 게임과 같은 보장 (src/game.js 의 PITY)
    since = f.isFantasy ? 0 : since + 1;
    t += cycle(); catches++;
    g.records[f.sprite] = 1;
    if (f.isFantasy) { fantasy++; if (fantasy > 12) g.cargo.push(Math.round(9000 * E.priceMult(g.eco, g.region))); }   // 물건 12점을 다 찾은 뒤에는 바다의 답례 (src/game.js 의 THANKS_GOLD)
    if (!f.isFantasy) { const pr = Math.round(f.price * E.priceMult(g.eco, g.region)), adv = Math.floor(pr * E.ADVANCE); g.gold += adv; g.cargo.push(pr - adv); }   // 선금은 바로, 잔금은 항구에서
    for (;;) { const o = options().filter((x) => x[0] === 'skill'); if (!o.length || o[0][2] > g.gold) break; E.buy(g, 'skill', o[0][1]); buys++; seaBuys++; }   // 바다에서는 스킬만
  }
  t += HARBOR; trips++; g.cargoMax = E.cargoMax(g.eco);
  g.gold += Math.round(g.cargo.reduce((a, b) => a + b, 0) * E.fullBonus(g.eco)); g.cargo = [];
  let bought = 0;
  for (;;) { const o = options(); if (!o.length || o[0][2] > g.gold) break; const before = g.eco.town; E.buy(g, o[0][0], o[0][1]); buys++; bought++; gaps.push(t - lastBuyT); lastBuyT = t;
    if (g.eco.town !== before) log.push(`${(t / 60).toFixed(0).padStart(5)}분  마을 ${g.eco.town}등급`); }
  stuck = bought ? 0 : stuck + 1;
  if (g.eco.town >= 8 && g.region >= 8 && g.eco.gear.rod >= 70) { log.push(`${(t / 60).toFixed(0).padStart(5)}분  끝 (마을 8등급, 8번 해역, 장비 8단계)`); break; }
  if (stuck > 400) { const o = options(); log.push(`${(t / 60).toFixed(0).padStart(5)}분  막힘: 가장 싼 것 ${o[0] ? o[0].join(' ') : '없음'} / 가진 돈 ${g.gold} / 도감 ${Object.keys(g.records).length} 필요 ${E.townNeedDex(g.eco)}`); break; }
}
console.log(log.join('\n'));
gaps.sort((a, b) => a - b);
console.log(`\n환상종(오래된 물건) ${fantasy}마리, 항구 ${trips}번 (한 번에 평균 ${((buys - seaBuys) / trips).toFixed(1)}번 삼), 바다에서 스킬 ${seaBuys}번`);
console.log(`\n낚은 수 ${catches}, 산 횟수 ${buys}, 총 ${(t / 3600).toFixed(1)}시간, 도감 ${Object.keys(g.records).length}/350`);
console.log(`한 마리 ${cycle().toFixed(1)}초(끝 무렵), 살 것 사이 간격: 가운데값 ${gaps[gaps.length >> 1].toFixed(0)}초, 가장 긴 ${gaps[gaps.length - 1].toFixed(0)}초`);
console.log('장비', JSON.stringify(g.eco.gear), '스킬', JSON.stringify(g.eco.skill), '가게', JSON.stringify(g.eco.shop));

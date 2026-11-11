// 성장(인크리멘탈) 수치. tools/sim_economy.py 로 계산해 맞춘 값: 처음부터 끝까지 같은 속도(해역마다 20~30분),
// 약 16초마다 한 번 살 것이 생기고, 해역을 넘을 때마다 수입이 수십 배가 된다. 전체 약 3시간.
export const POWER_X = 4;        // 해역마다 생물의 힘
export const PRICE_X = 6;        // 해역마다 생물의 값
export const GEAR_X = 22.5;      // 장비 한 단계마다 값
const FIRST_SET = 131520;        // 2단계 장비 한 벌의 기준 값
const START_CUT = 0.3;           // 첫 해역에서는 이만큼만 받는다 (시작이 느리지 않게)
const SKILL_BASE = FIRST_SET * 0.003 * START_CUT;

// 장비 5종. 단계마다 10번 산다: 9번의 강화 + 10번째는 다음 단계 장비.
//                 이름      값의 비중  설명
export const GEAR = [
  { id: 'outfit', name: '복장',   share: 0.10, desc: '값 +' },
  { id: 'reel',   name: '릴',     share: 0.15, desc: '낚는 속도 +' },
  { id: 'line',   name: '줄',     share: 0.20, desc: '힘 +' },
  { id: 'rod',    name: '낚싯대', share: 0.25, desc: '힘 +' },
  { id: 'boat',   name: '배',     share: 0.30, desc: '어창 +, 다음 해역' },
];
const STEP_W = (() => { const w = []; for (let j = 0; j < 9; j++) w.push(1.15 ** j); w.push(1.15 ** 9 * 3); const s = w.reduce((a, b) => a + b); return w.map((x) => x / s); })();

// 스킬 노드 (레벨 무제한, 값은 레벨마다 1.15배). 10·25·50·100레벨에 보너스.
export const SKILLS = [
  { id: 'profit', name: '흥정',     desc: '값 ×1.02',       mult: 1.02 },
  { id: 'speed',  name: '손놀림',   desc: '낚는 속도 +2%',  add: 0.02, max: 2 },
  { id: 'big',    name: '큰 개체',  desc: '값 ×1.015',      mult: 1.015 },
];
const MILE = [[10, 1.1], [25, 1.1], [50, 1.15], [100, 1.2]];

// ── 항구 마을 발전 ──
// 사슬: 시청(마을 등급) → 가게 레벨 → 그 단계 장비 → 다음 해역.
// 값은 새로 얹지 않고 한 단계 총액에서 떼어 낸다: 시청 10% + 가게 5곳 20% + 장비 70% (속도는 그대로).
export const SHOPS = [
  { id: 'market', name: '수산시장',   desc: '판매가 +3%' },
  { id: 'tackle', name: '낚시도구점', desc: '다음 단계 낚싯대·줄·릴', gear: ['rod', 'line', 'reel'] },
  { id: 'yard',   name: '조선소',     desc: '다음 단계 배', gear: ['boat'] },
  { id: 'tailor', name: '옷가게',     desc: '다음 단계 복장', gear: ['outfit'] },
  { id: 'guild',  name: '어부 길드',  desc: '스킬 상한 +25' },
];
export const TOWN_NAMES = ['', '작은 어촌', '어촌', '포구 마을', '항구 마을', '번화한 항구', '큰 항구', '무역항', '환상의 항구'];
export const TOWN_LOOK = [0, 1, 1, 2, 2, 3, 3, 4, 5];            // 마을 등급 → 겉모습 5단계
const DEX_NEED = [0, 0, 0, 0, 40, 80, 130, 180, 230];            // 그 등급이 되려면 도감에 있어야 하는 수 (3등급까지는 골드만)
const TOWN_SHARE = 0.10, SHOP_SHARE = 0.04, GEAR_SHARE = 0.70;
const tierTotal = (tier) => FIRST_SET * GEAR_X ** tier * (tier === 0 ? START_CUT : 1);   // tier 0 = 1단계에서 2단계로 가는 값

export function newEconomy() {
  return {
    gear: { outfit: 0, reel: 0, line: 0, rod: 0, boat: 0 }, skill: { profit: 0, speed: 0, big: 0 },
    town: 1, shop: { market: 1, tackle: 1, yard: 1, tailor: 1, guild: 1 },
  };
}
export const townCost = (e) => Math.ceil(tierTotal(e.town - 1) * TOWN_SHARE);
export const townNeedDex = (e) => DEX_NEED[Math.min(8, e.town + 1)];
export const shopCost = (e, id) => Math.ceil(tierTotal(e.shop[id] - 1) * SHOP_SHARE);
export const shopLocked = (e, id) => e.shop[id] >= e.town || e.shop[id] >= 8;                // 가게는 마을 등급까지만
const shopOf = (id) => SHOPS.find((x) => x.gear && x.gear.includes(id));
export const skillCap = (e) => 25 * e.shop.guild;
// 손놀림은 2배가 한계: 거기 닿으면 더 팔지 않는다
export const skillMaxed = (e, id) => { const sk = SKILLS.find((x) => x.id === id); return !!sk.max && node(e, sk) >= sk.max - 1e-6; };

const node = (e, s) => {
  let v = s.mult ? s.mult ** e.skill[s.id] : 1 + s.add * e.skill[s.id];
  for (const [lv, b] of MILE) if (e.skill[s.id] >= lv) v *= b;
  return s.max ? Math.min(s.max, v) : v;
};
const SK = Object.fromEntries(SKILLS.map((s) => [s.id, s]));

export const maxRegion = (e) => Math.min(8, Math.floor(e.gear.boat / 10) + 1);     // 갈 수 있는 가장 먼 해역
export const cargoMax = (e) => 8 + 2 * Math.floor(e.gear.boat / 10);
export const priceMult = (e, region) => PRICE_X ** (region - 1) * 1.25 ** (e.gear.outfit / 10) * node(e, SK.profit) * node(e, SK.big)
  * 1.03 ** (e.shop.market - 1) * 1.05 ** (e.town - 1);                                          // 수산시장 +3%, 마을 등급 +5%
const SPEED_CAP = 3.3;
export const speedMult = (e) => Math.min(SPEED_CAP, 1.25 ** (e.gear.reel / 10) * node(e, SK.speed));   // 클수록 빨리 낚는다
// 줄다리기에서 생물이 당기는 세기: 생물의 힘 ÷ 내 장비의 힘. 그 해역 단계의 장비면 1배, 한 단계 모자라면 4배.
export const pullOf = (e, region) => POWER_X ** (region - 1) / POWER_X ** (0.05 * (e.gear.line + e.gear.rod));

export function gearCost(e, id) {
  const g = GEAR.find((x) => x.id === id), lv = e.gear[id], tier = Math.floor(lv / 10), step = lv % 10;
  return Math.ceil(tierTotal(tier) * GEAR_SHARE * g.share * STEP_W[step]);
}
// 장비를 못 사는 이유 (살 수 있으면 null). 강화(+1~+9)는 언제든 되고, 다음 단계 장비(10번째)는 그 가게의 레벨이 받쳐 줘야 한다.
export function gearBlock(e, id) {
  const lv = e.gear[id];
  if (lv >= 70) return '끝';
  if (id === 'reel' && speedMult(e) >= SPEED_CAP - 1e-6) return '끝';        // 더 사도 빨라지지 않으면 팔지 않는다
  if (id !== 'boat' && lv >= maxRegion(e) * 10) return '배를 먼저';
  if (lv % 10 === 9 && shopOf(id).id && e.shop[shopOf(id).id] < Math.floor(lv / 10) + 2) return shopOf(id).name + ' 레벨';
  return null;
}
export const gearLocked = (e, id) => gearBlock(e, id) !== null;
export const skillCost = (e, id) => Math.ceil(SKILL_BASE * 1.15 ** e.skill[id]);
export const gearLabel = (lv) => `${Math.floor(lv / 10) + 1}단계 +${lv % 10}`;

export function buy(g, kind, id) {
  const e = g.eco;
  if (kind === 'gear' && gearLocked(e, id)) return false;
  if (kind === 'skill' && (e.skill[id] >= skillCap(e) || skillMaxed(e, id))) return false;
  if (kind === 'shop' && shopLocked(e, id)) return false;
  if (kind === 'town' && (e.town >= 8 || Object.keys(g.records).length < townNeedDex(e))) return false;
  const cost = kind === 'gear' ? gearCost(e, id) : kind === 'skill' ? skillCost(e, id) : kind === 'shop' ? shopCost(e, id) : townCost(e);
  if (g.gold < cost) return false;
  g.gold -= cost;
  if (kind === 'gear') e.gear[id]++; else if (kind === 'skill') e.skill[id]++; else if (kind === 'shop') e.shop[id]++; else e.town++;
  g.cargoMax = cargoMax(e);
  return true;
}

// 큰 수 표기: 1,234 / 12.3만 / 4.5억 / 6.7조
export function fmt(n) {
  n = Math.floor(n);
  if (n < 1e5) return n.toLocaleString('ko-KR');
  for (const [v, u] of [[1e16, '경'], [1e12, '조'], [1e8, '억'], [1e4, '만']]) if (n >= v) return (n / v).toFixed(n / v < 100 ? 1 : 0) + u;
  return String(n);
}

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

export function newEconomy() {
  return { gear: { outfit: 0, reel: 0, line: 0, rod: 0, boat: 0 }, skill: { profit: 0, speed: 0, big: 0 } };
}

const node = (e, s) => {
  let v = s.mult ? s.mult ** e.skill[s.id] : 1 + s.add * e.skill[s.id];
  for (const [lv, b] of MILE) if (e.skill[s.id] >= lv) v *= b;
  return s.max ? Math.min(s.max, v) : v;
};
const SK = Object.fromEntries(SKILLS.map((s) => [s.id, s]));

export const maxRegion = (e) => Math.min(8, Math.floor(e.gear.boat / 10) + 1);     // 갈 수 있는 가장 먼 해역
export const cargoMax = (e) => 8 + 2 * Math.floor(e.gear.boat / 10);
export const priceMult = (e, region) => PRICE_X ** (region - 1) * 1.25 ** (e.gear.outfit / 10) * node(e, SK.profit) * node(e, SK.big);
export const speedMult = (e) => Math.min(3.3, 1.25 ** (e.gear.reel / 10) * node(e, SK.speed));   // 클수록 빨리 낚는다
// 줄다리기에서 생물이 당기는 세기: 생물의 힘 ÷ 내 장비의 힘. 그 해역 단계의 장비면 1배, 한 단계 모자라면 4배.
export const pullOf = (e, region) => POWER_X ** (region - 1) / POWER_X ** (0.05 * (e.gear.line + e.gear.rod));

export function gearCost(e, id) {
  const g = GEAR.find((x) => x.id === id), lv = e.gear[id], tier = Math.floor(lv / 10), step = lv % 10;
  return Math.ceil(FIRST_SET * GEAR_X ** tier * g.share * STEP_W[step] * (tier === 0 ? START_CUT : 1));
}
export const gearLocked = (e, id) => e.gear[id] >= maxRegion(e) * 10 && !(id === 'boat' && e.gear.boat < 70);   // 지금 갈 수 있는 해역의 다음 단계까지만
export const skillCost = (e, id) => Math.ceil(SKILL_BASE * 1.15 ** e.skill[id]);
export const gearLabel = (lv) => `${Math.floor(lv / 10) + 1}단계 +${lv % 10}`;

export function buy(g, kind, id) {
  const e = g.eco;
  if (kind === 'gear' && gearLocked(e, id)) return false;
  const cost = kind === 'gear' ? gearCost(e, id) : skillCost(e, id);
  if (g.gold < cost) return false;
  g.gold -= cost;
  if (kind === 'gear') e.gear[id]++; else e.skill[id]++;
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

// 낚시 사이에 끼어드는 작은 목표들: 도감 완성 보상 · 길드 의뢰 · 대 잇기(다음 세대)
import { DOTS } from './dots.js';
import { REGIONS } from './creatures.js';
import { GRADES } from './config.js';
import { priceMult, sizeMult, cargoMax, fmt } from './economy.js';

// ── 도감 완성 보상 ──
// 해역마다(0 = 어느 바다에나 사는 물고기) 따로 센다. 절반을 채우면 그 해역 생물의 파는 값 +5%, 다 채우면 +10%.
// 환상종은 세지 않는다 (운에 달려 있어 끝이 나지 않는다).
const LIST = Array.from({ length: 9 }, (_, r) => DOTS.filter((d) => d[3] === r && d[2] !== 'fantasy'));
export function dexCount(g, r) { const l = LIST[r] || []; return [l.filter((d) => g.records[d[0]] != null).length, l.length]; }
export function dexStage(g, r) { const [n, t] = dexCount(g, r); return !t ? 0 : n >= t ? 2 : n >= Math.ceil(t / 2) ? 1 : 0; }
export const DEX_PCT = [0, 5, 10];
export const dexBonus = (g, r) => 1 + DEX_PCT[dexStage(g, r)] / 100;
export const dexName = (r) => (r ? REGIONS[r] : '온 바다의 물고기');

// ── 대 잇기 ── 대를 한 번 이을 때마다 파는 값 +25%
export const GEN_X = 1.25;
export const genMult = (g) => GEN_X ** (g.gen || 0);

// ── 길드 의뢰 ── 항구에 들어올 때마다 하나씩 새로 걸린다. 채워서 돌아오면 포상금에 얹어 받는다. 못 채워도 벌은 없다.
const pick = (a) => a[Math.floor(Math.random() * a.length)];
export function newQuest(g) {
  const e = g.eco, r = g.region, kinds = ['grade', 'size', 'species', 'perfect'];
  if (DOTS.filter((d) => (d[3] === r || d[3] === 0) && d[2] !== 'fantasy' && g.records[d[0]] == null).length >= 8) kinds.push('new');
  let kind; do kind = pick(kinds); while (g.quest && kind === g.quest.kind);      // 같은 종류가 잇달아 나오지 않게
  // 보상: 그 해역에서 어창을 한 번 채운 값의 절반쯤
  const q = { kind, n: 0, need: 1, region: r, reward: Math.max(10, Math.round(80 * cargoMax(e) * priceMult(e, r) * genMult(g) / 10) * 10), done: false };
  if (kind === 'grade') { const o = pick([[1, 4], [2, 2], [3, 1]]); q.gi = o[0]; q.need = o[1]; q.text = `${GRADES[q.gi].name} 등급 이상 ${q.need}마리`; }
  else if (kind === 'size') { const gr = GRADES[pick([1, 2])]; q.m = Math.round((gr.len[0] + (gr.len[1] - gr.len[0]) * 0.55) / 32 * 3 * sizeMult(e) * 10) / 10; q.text = `${q.m.toFixed(1)} m가 넘는 것 1마리`; }
  else if (kind === 'species') { q.need = 4; q.names = []; q.text = `${REGIONS[r]}의 생물 ${q.need}종`; }
  else if (kind === 'perfect') { q.need = 4; q.text = `PERFECT 챔질 ${q.need}번`; }
  else { q.need = 2; q.text = `도감에 없는 생물 ${q.need}종`; }
  return q;
}
function bump(g, q) { q.n = Math.min(q.need, q.n + 1); g.questT = 0; if (q.n >= q.need) { q.done = true; g.sfx.push(['stamp']); } g.dirty = true; }
// 낚았을 때 (f = 낚은 생물, isNew = 도감에 처음 오른 것인가)
export function questCatch(g, f, isNew) {
  const q = g.quest; if (!q || q.done || f.isFantasy) return;
  const gi = GRADES.findIndex((x) => x.id === f.grade);
  if (q.kind === 'grade' && gi >= q.gi) bump(g, q);
  else if (q.kind === 'size' && f.meters >= q.m) bump(g, q);
  else if (q.kind === 'species' && f.region === q.region && !q.names.includes(f.name)) { q.names.push(f.name); bump(g, q); }
  else if (q.kind === 'new' && isNew) bump(g, q);
}
export function questPerfect(g) { const q = g.quest; if (q && !q.done && q.kind === 'perfect') bump(g, q); }
// 항구에 들어왔을 때: 채웠으면 보상을 돌려주고, 새 의뢰를 건다
export function settleQuest(g) { const q = g.quest, pay = q && q.done ? q.reward : 0; g.quest = newQuest(g); g.dirty = true; return pay; }
export const questLine = (g) => { const q = g.quest; return !q ? '' : q.done ? `의뢰 완료 · 항구에서 +${fmt(q.reward)} G` : `의뢰 · ${q.text} (${q.n}/${q.need})`; };

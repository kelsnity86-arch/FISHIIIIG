// 언어: 한국어(원문) / English. 원문은 한국어로 쓰여 있고, 영어일 때는 화면에 그리기 직전에 바꿔 그린다 (main.js 가 글자 그리는 함수에 tr 을 끼운다).
// 그래서 게임 로직은 늘 한국어 글로 돈다 (기록의 이름, 글 내용으로 가르는 판정 등이 언어와 상관없이 같다).
//   · 딱 맞는 글 → UI 사전 / 생물 이름 / 도감 글 / 대사 / 옛 물건 / 주인의 한마디
//   · 숫자가 섞인 글 → 아래 RULES (' · ' 로 이어진 글은 조각마다 따로 옮긴다)
import { DOTS } from './dots.js';
import { DEX_TEXT } from './dexText.js';
import { PRIMAL, PRIMAL_TEXT } from './primal.js';
import { RELICS } from './relics.js';
import { QUIPS } from './quips.js';
import { EN_NAMES, EN_PRIMAL_NAMES } from './en/names.js';
import { EN_DEX_A } from './en/dex_a.js';
import { EN_DEX_B, EN_PRIMAL_TEXT } from './en/dex_b.js';
import { EN_SCRIPT, EN_FINALE, EN_QUIPS, EN_RELICS } from './en/story.js';
import { EN_UI } from './en/ui.js';

import { EN, onLang } from './lang.js';
export { EN, langName, nextLang, L } from './lang.js';

// ── 사전 (한국어 글 → 영어 글) ──
const D = new Map(Object.entries(EN_UI));
for (const d of DOTS) { D.set(d[0], EN_NAMES[d[1]] || d[0]); const k = DEX_TEXT[d[1]], e = EN_DEX_A[d[1]] || EN_DEX_B[d[1]]; if (k && e) D.set(k, e); }
for (const d of PRIMAL) { D.set(d[0], EN_PRIMAL_NAMES[d[1]] || d[0]); if (PRIMAL_TEXT[d[1]] && EN_PRIMAL_TEXT[d[1]]) D.set(PRIMAL_TEXT[d[1]], EN_PRIMAL_TEXT[d[1]]); }
for (const r of RELICS) { const e = EN_RELICS[r.id]; if (!e) continue; D.set(r.name, e.name); D.set(r.dex, e.dex); D.set(r.perk, e.perk); r.mem.forEach((m, i) => D.set(m, e.mem[i])); }
for (const who of Object.keys(QUIPS)) QUIPS[who].forEach((stage, i) => stage.forEach((q, j) => { const e = EN_QUIPS[who] && EN_QUIPS[who][i] && EN_QUIPS[who][i][j]; if (e) D.set(q, e); }));
// 대사와 마지막 회상은 story.js 가 줄 번호로 직접 찾는다
export const scriptLine = (key, i, ko) => (EN() && EN_SCRIPT[key] && EN_SCRIPT[key][i]) || ko;
export const finaleLine = (i, ko) => (EN() && EN_FINALE[i]) || ko;

// ── 숫자가 섞인 글 (조각 단위) ──
const t = (s) => one(s);
const RULES = [
  [/^“(.+)”$/, (m) => `“${t(m[1])}”`],
  [/^(.+) 도감을 다 채웠다고\? 장하구나!$/, (m) => `The whole ${t(m[1])} Logbook? Well done!`],
  [/^(.+) 도감이 절반을 넘었구나\. 에헴!$/, (m) => `Half the ${t(m[1])} Logbook already. Ahem!`],
  [/^(\d)\. (.+)$/, (m) => `${m[1]}. ${t(m[2])}`],
  [/^(.+?) {2}(Lv\.\d+)$/, (m) => `${t(m[1])}  ${m[2]}`],
  [/^(.+?) {2}(\d+)등급$/, (m) => `${t(m[1])}  Rank ${m[2]}`],
  [/^(\d+)등급$/, (m) => `Rank ${m[1]}`],
  [/^(\d+)단계 \+(\d+)$/, (m) => `Tier ${m[1]} +${m[2]}`],
  [/^이번에 (\d+)단계$/, (m) => `next one: Tier ${m[1]}`],
  [/^(\d+)단계까지 (\d+)번$/, (m) => `${m[2]} to Tier ${m[1]}`],
  [/^(\d+)단계$/, (m) => `Tier ${m[1]}`],
  [/^(\d+)번 더 올리면 어창 \+1$/, (m) => `Hold +1 in ${m[1]} more`],
  [/^어창 \+(\d+)$/, (m) => `Hold +${m[1]}`],
  [/^(\d+)번 해역$/, (m) => `Sea ${m[1]}`],
  [/^지금 (\d+)대째$/, (m) => `Generation ${m[1]}`],
  [/^(\d+)대째$/, (m) => `Generation ${m[1]}`],
  [/^도감·옛 물건은 남고 파는 값 \+(\d+)%$/, (m) => `Keeps Logbook and keepsakes, prices +${m[1]}%`],
  [/^(.+) 키우기$/, (m) => `Grow the ${t(m[1])}`],
  [/^(.+?)(?:으로|로) 커진다$/, (m) => `grows into a ${t(m[1])}`],
  [/^도감 (\d+)\/(\d+)$/, (m) => `Logbook ${m[1]}/${m[2]}`],
  [/^길드 Lv\.(\d+) 필요$/, (m) => `Needs Guild Lv.${m[1]}`],
  [/^(.+) 레벨 필요$/, (m) => `Needs a bigger ${t(m[1])}`],
  [/^(.+) 필요$/, (m) => `Needs ${t(m[1])}`],
  [/^(파는 값|입질 빠르기|크기와 값) (.+)$/, (m) => `${t(m[1])} ${m[2]}`],
  [/^어창에 실었다 \((\d+)\/(\d+)\)$/, (m) => `Stowed (${m[1]}/${m[2]})`],
  [/^선금 \+(.+) G$/, (m) => `advance +${m[1]} G`],
  [/^(만선! )?(\d+)마리 팔았다$/, (m) => `${m[1] ? 'Full hold! ' : ''}Sold ${m[2]}`],
  [/^포상금 {2}\+(.+) G$/, (m) => `bounty  +${m[1]} G`],
  [/^의뢰 삯 {2}\+(.+) G$/, (m) => `request pay  +${m[1]} G`],
  [/^바다의 답례 {2}\+(.+) G$/, (m) => `The sea's thanks  +${m[1]} G`],
  [/^(.+) 도감 (완성|절반)! 파는 값 \+(\d+)%$/, (m) => `${t(m[1])} Logbook ${m[2] === '완성' ? 'complete' : 'half full'}! Prices +${m[3]}%`],
  [/^(.+)[을를] 얻었다$/, (m) => `Got the ${t(m[1])}`],
  [/^(.+) \((\d+)\/(\d+)\)$/, (m) => `${t(m[1])} (${m[2]}/${m[3]})`],
  [/^(.+) 등급 이상 (\d+)마리$/, (m) => `${m[2]} of ${t(m[1])} or better`],
  [/^([\d.]+) m가 넘는 것 1마리$/, (m) => `One longer than ${m[1]} m`],
  [/^(.+)의 생물 (\d+)종$/, (m) => `${m[2]} species of the ${t(m[1])}`],
  [/^PERFECT 챔질 (\d+)번$/, (m) => `${m[1]} PERFECT hooks`],
  [/^도감에 없는 생물 (\d+)종$/, (m) => `${m[1]} new species`],
  [/^항구에서 \+(.+) G$/, (m) => `+${m[1]} G at the harbor`],
  [/^값 \+(\d+)%$/, (m) => `+${m[1]}%`],
  [/^가장 큰 기록 ([\d.]+) m$/, (m) => `best ${m[1]} m`],
  [/^(.+) 등급$/, (m) => `${t(m[1])}`],
  [/^조선소에서 배를 (\d+)단계로 키워야 갈 수 있다$/, (m) => `needs a Tier ${m[1]} boat from the Shipyard`],
  [/^오류: (.+)$/, (m) => `Error: ${m[1]}`],
];
function one(s) {
  const d = D.get(s); if (d != null) return d;
  if (s.includes(' · ')) return s.split(' · ').map(one).join(' · ');      // 이어 붙인 글은 조각마다 따로 옮긴다
  for (const [re, fn] of RULES) { const m = re.exec(s); if (m) return fn(m); }
  return s;
}
const HANGUL = /[가-힣]/, cache = new Map();
onLang(() => cache.clear());
export function tr(s) {
  if (!EN() || typeof s !== 'string' || !HANGUL.test(s)) return s;
  let v = cache.get(s); if (v !== undefined) return v;
  v = one(s);
  if (cache.size > 4000) cache.clear();
  cache.set(s, v);
  return v;
}

// 항구 마을 화면과 가게 판. 화면에 보이는 것은 전부 GPT 그림이고, 코드는 놓고·넘기고·글자를 얹을 뿐이다.
import { pickQuip } from './quips.js';
import { tapSettings } from './settings.js';
import { settleQuest, newQuest, questLine, dexName, GEN_X, topRegion, skinsOwned, skinOn, SKINS } from './goals.js';
import { W, H, COLORS, DAY_SEC } from './config.js';
import { sprite, hasSprite } from './assets.js';
import { REGIONS } from './creatures.js';
import { startTalk, tapTalk, tapSkip, storyTown, storyRegion, tapMemory, tapTitle, tapSound } from './story.js';
import { openMap, tapMap, openDex, tapDex } from './book.js';
import { buzz } from './haptic.js';
import {
  GEAR, SKILLS, SHOPS, newEconomy, cargoMax, skillPct, TOWN_NAMES, TOWN_LOOK, buy, gearCost, skillCost, gearBlock, gearLabel, maxRegion, fmt,
  townCost, townNeedDex, shopCost, shopLocked, skillCap, skillMaxed, fullBonus,
 } from './economy.js';

const FONT = '"Hahmlet", system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const easeOut = (k) => 1 - Math.pow(1 - k, 3);
const rand = (a, b) => a + Math.random() * (b - a);

// 건물 6채: 부둣가에 왼쪽부터
const HOUSES = ['market', 'tackle', 'yard', 'tailor', 'guild', 'hall'];
const HOUSE_NAME = { market: '수산시장', tackle: '낚시도구점', yard: '조선소', tailor: '옷가게', guild: '어부 길드', hall: '시청' };
const HX = (i) => 68 + i * 100.8, HY = 228, HW = 88;      // 건물 가운데 x, 바닥 y, 폭
const LEAVE = { x: W - 62, y: H - 24, w: 104, h: 30 };    // 출항 단추
const HDEX = { x: 26, y: H - 26, r: 17 };                 // 항구에서도 도감을 펼쳐 볼 수 있다
const HMAP = { x: 64, y: H - 26, r: 17 };                 // 항구에서 지도를 펴고 갈 바다를 골라 바로 출항한다
// 바다 화면의 둥근 단추 (낚시 중이 아닐 때만)
export const SEA_BTNS = [
  { id: 'harbor', icon: 'ui_ic_harbor', x: W - 26, y: H - 26, r: 17, label: '항구' },
  { id: 'map',    icon: 'ui_ic_map',    x: W - 64, y: H - 26, r: 17, label: '해역' },
  { id: 'skill',  icon: 'ui_ic_gear',   x: W - 102, y: H - 26, r: 17, label: '기술' },
  { id: 'dex',    icon: 'ui_ic_book',   x: W - 140, y: H - 26, r: 17, label: '도감' },
];

function label(ctx, str, x, y, size, color, align = 'center', weight = 600, stroke = 'rgba(16,28,56,0.55)') {
  ctx.font = `${weight} ${size}px ${FONT}`;
  ctx.textAlign = align; ctx.textBaseline = 'middle';
  if (stroke) { ctx.lineWidth = Math.max(1.6, size * 0.18); ctx.lineJoin = 'round'; ctx.strokeStyle = stroke; ctx.strokeText(str, x, y); }
  ctx.fillStyle = color; ctx.fillText(str, x, y);
}
function img(ctx, name, x, y, w, h) {
  const s = sprite(name);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(s.img, x, y, w, h ?? w * s.h / s.w);
  return s;
}

// ── 화면 넘기기: 화면이 짙은 남색으로 잠겼다가 풀린다 (뚝 바뀌지 않게) ──
export function travel(g, fn) {
  if (g.travel) return false;
  g.travel = { t: 0, fn, done: false };
  g.sfx.push(['travel']);
  return true;
}
export function updateTravel(g, dt) {
  const tr = g.travel;
  if (!tr) { g.veil = 0; return; }
  tr.t += dt;
  if (!tr.done && tr.t >= 0.32) { tr.done = true; tr.fn(); }
  g.veil = clamp(1 - Math.abs(tr.t / 0.32 - 1), 0, 1);
  if (tr.t >= 0.64) { g.travel = null; g.veil = 0; }
}

// ── 항구 드나들기 ──
export function enterHarbor(g) {
  if (g.state !== 'idle' || g.scene !== 'sea') return false;
  return travel(g, () => {
    g.scene = 'harbor'; g.panel = null;
    // 들어오자마자 어창의 생물이 수산시장에서 팔린다
    if (g.dayT >= DAY_SEC) g.dayOver = true;                                        // 밤이 끝나 돌아왔다: 다음 출항은 새 하루
    const quest = g.quest && g.quest.done ? settleQuest(g) : 0; if (quest) g.quest = null;                     // 다 채운 의뢰만 삯을 받는다. 새 의뢰는 다음 날 걸린다 (채우지 못한 의뢰는 그대로 들고 있는다)
    if (quest) { g.gold += quest; g.msg = { text: `의뢰 삯  +${fmt(quest)} G`, color: '#ffe27a', age: -0.3 }; g.sfx.push(['coin', 6]); }
    if (g.cargo.length) {
      const full = g.cargo.length >= g.cargoMax && fullBonus(g.eco) > 1;            // 만선: 수산시장이 값을 더 쳐 준다
      const sum = Math.round(g.cargo.reduce((a, c) => a + c.price, 0) * (full ? fullBonus(g.eco) : 1)), n = Math.min(16, 5 + g.cargo.length);
      g.gold += sum;
      for (let i = 0; i < n; i++) g.coins.push({ age: -i * 0.04 - 0.35, life: 0.6, sx: HX(0) + rand(-24, 24), sy: HY - 30 + rand(-14, 14) });
      g.sfx.push(['coin', n]);
      g.msg = { text: `${full ? '만선! ' : ''}${g.cargo.length}마리 팔았다 · 포상금  +${fmt(sum)} G` + (quest ? ` · 의뢰 삯  +${fmt(quest)} G` : ''), color: '#ffe27a', age: -0.3 };
      g.cargo.length = 0;
    }
  });
}
// ── 하루 ── 하루는 항구에 들렀다고 넘어가지 않는다. 밤이 끝나 돌아왔거나(dayOver) 항구에서 '오늘은 쉬기'를 눌렀을 때만 새 하루가 된다.
// 새 하루에만 다시 채워지는 것: 시간(새벽부터), 가족 사진(하루 한 번), 의뢰.
//  · 다 채운 의뢰는 항구에서 삯을 받고, 새 의뢰는 다음 날 걸린다
//  · 채우지 못한 의뢰는 그대로 들고 간다. 이틀을 넘겨도 못 채우면 그때 새 의뢰로 바뀐다 (들락거려 다시 뽑을 수 없게, 그러나 막히지는 않게)
export function newDay(g) {
  g.dayT = 0; g.dayWarned = false; g.phase = 3; g.savedToday = false; g.dayOver = false; g.questToday = false; g.dirty = true;
  const q = g.quest; if (q && !q.done && (q.days = (q.days || 0) + 1) >= 2) q.stale = true;      // 다음 출항 때 다른 종류의 새 의뢰로 바뀐다
}
// 바다로 나갈 때: 날이 넘어갔으면 새 하루를 열고, 오늘 걸 의뢰가 아직 없으면 건다 (의뢰는 첫 낚시를 마친 뒤부터)
function setSail(g) {
  g.scene = 'sea'; g.panel = null;
  if (g.dayOver) newDay(g);
  if ((!g.quest || g.quest.stale) && !g.questToday && g.story.seen.card) { g.quest = newQuest(g); g.questToday = true; g.dirty = true; }
}
export function leaveHarbor(g) { return travel(g, () => setSail(g)); }
// 오늘은 쉬기: 항구에서 날을 넘긴다 (오후부터). 항구에 그대로 있고, 다음 출항이 새 하루의 새벽이 된다
const REST = { x: LEAVE.x, y: LEAVE.y - LEAVE.h - 4, w: LEAVE.w, h: LEAVE.h };      // 출항 버튼과 같은 크기로, 바로 위에
const canRest = (g) => g.dayT >= DAY_SEC * 0.5;
const restShown = (g) => !g.dayOver && g.story.seen.day && !g.panel && !g.talk;
function rest(g) {
  if (!canRest(g)) { g.msg = { text: '아직 해가 높다 · 오후부터 쉴 수 있다', color: '#ffd0c0', age: 0 }; g.sfx.push(['deny']); return; }
  if (!(g.restAsk != null && g.harborT - g.restAsk < 3)) { g.restAsk = g.harborT; g.sfx.push(['tap']); return; }      // 잘못 누르지 않게 두 번 눌러야 쉰다 (3초 안에 한 번 더)
  g.restAsk = null;
  travel(g, () => { g.dayOver = true; g.dirty = true; g.msg = { text: '푹 쉬었다 · 다음 출항은 새 하루의 새벽', color: '#cfd8ff', age: -0.2 }; });
}
// 지도에서 고른 해역으로 간다
function goRegion(g, n) {
  travel(g, () => {
    const sail = g.scene === 'harbor'; g.region = n; if (sail) setSail(g);   // 항구에서 골랐으면 그 바다로 출항 (의뢰는 가는 바다의 것으로 걸린다)
    g.msg = { text: n === 9 ? REGIONS[9] : `${n}번 해역 · ${REGIONS[n]}`, color: '#fff4dc', age: -0.2 }; storyRegion(g);
  });
}
function nextRegion(g) {
  const n = g.region % topRegion(g) + 1;
  if (n === g.region) { g.msg = { text: '더 큰 배가 있어야 먼바다로 나갈 수 있다', color: '#ffd0c0', age: 0 }; return; }
  travel(g, () => { g.region = n; g.msg = { text: n === 9 ? REGIONS[9] : `${n}번 해역 · ${REGIONS[n]}`, color: '#fff4dc', age: -0.2 }; storyRegion(g); });
}

// 장비 설명: 이번에 사면 무엇이 달라지는지와, 다음 단계까지 몇 번 남았는지를 따로 알려 준다
function gearDesc(e, id, x) {
  const lv = e.gear[id], left = 10 - lv % 10, tier = Math.floor(lv / 10) + 1, next = left === 1 ? `이번에 ${tier + 1}단계` : `${tier + 1}단계까지 ${left}번`;
  if (id === 'boat') return lv % 10 < 5 ? `${5 - lv % 10}번 더 올리면 어창 +1 · ${tier + 1}단계까지 ${left}번` : (left === 1 ? `이번에 ${tier + 1}단계 · 어창 +1 · 다음 바다` : `${next} · 오르면 어창 +1, 다음 바다`);      // 배는 단계가 올라야 달라진다
  return `${x.desc} · ${next}`;
}
// ── 가게 판에 놓이는 줄 ──
const SKILL_ICON = { profit: 'h_skill_1', speed: 'h_skill_2', big: 'h_skill_3' };
function rowsOf(g, id) {
  const gear = (x) => ['gear', x], skill = (x) => ['skill', x];
  switch (id) {
    case 'market': return [['shop', 'market']];
    case 'tackle': return [gear('rod'), gear('line'), gear('reel'), ['shop', 'tackle']];
    case 'yard': return [gear('boat'), ['shop', 'yard']];
    case 'tailor': return skinsOwned(g).length ? [gear('outfit'), ['shop', 'tailor'], ['skin', 'skin']] : [gear('outfit'), ['shop', 'tailor']];      // 태초의 차림을 하나라도 얻었으면 켜고 끌 수 있다
    case 'guild': return [skill('profit'), skill('speed'), skill('big'), ['shop', 'guild']];
    case 'hall': return g.story.seen.finale ? [['town', 'town'], ['gen', 'gen']] : [['town', 'town']];      // 모든 기억을 되찾은 뒤에는 대를 이을 수 있다
    case 'skills': return [skill('profit'), skill('speed'), skill('big')];
  }
  return [];
}
function rowInfo(g, kind, id) {
  const e = g.eco, look = TOWN_LOOK[e.town], dex = Object.keys(g.records).length;
  if (kind === 'gear') {
    const x = GEAR.find((v) => v.id === id), lv = e.gear[id];
    return { name: x.name, level: gearLabel(lv), desc: gearDesc(e, id, x), cost: gearCost(e, id), block: gearBlock(e, id), icon: `h_${id}_${Math.min(8, Math.floor(lv / 10) + 1)}` };
  }
  if (kind === 'skill') {
    const x = SKILLS.find((v) => v.id === id), lv = e.skill[id];
    const pct = (v) => '+' + (v >= 100 ? v.toFixed(0) : v.toFixed(1)) + '%';
    const desc = `${x.label} ${pct(skillPct(e, id))} → ${pct(skillPct(e, id, 1))}` + (lv % 10 === 9 ? ' ★' : '');      // 지금 효과 → 올린 뒤 효과. 열 번째마다 크게 오른다
    return { name: x.name, level: `Lv.${lv}`, desc, cost: skillCost(e, id), block: skillMaxed(e, id) ? '끝' : lv >= skillCap(e) ? (e.shop.guild >= 8 ? '끝' : `길드 Lv.${e.shop.guild + 1}`) : null, icon: SKILL_ICON[id] };
  }
  if (kind === 'shop') {
    const x = SHOPS.find((v) => v.id === id), lv = e.shop[id];
    return { name: `${x.name} 키우기`, level: `Lv.${lv}`, desc: x.desc, cost: shopCost(e, id), block: lv >= 8 ? '끝' : shopLocked(e, id) ? '마을 등급' : null, icon: `h_shop_${look}_${id}` };
  }
  if (kind === 'skin') return { name: '태초의 차림', level: `${skinsOwned(g).length}/${SKINS.length}`, desc: g.skin !== false ? '태초의 바다에서 얻은 겉모습으로 보인다' : '장비 단계에 맞는 겉모습으로 보인다', cost: 0, btn: g.skin !== false ? '켬' : '끔', block: null, icon: `h_outfit_${Math.min(8, Math.floor(e.gear.outfit / 10) + 1)}` };
  if (kind === 'gen') return { name: '대를 잇는다', level: `지금 ${(g.gen || 0) + 1}대째`, desc: g.panel && g.panel.confirm ? '한 번 더 누르면 처음으로 돌아갑니다' : `도감·옛 물건은 남고 파는 값 +${Math.round((GEN_X - 1) * 100)}%`, cost: 0, btn: '잇기', block: null, icon: `h_shop_${look}_hall` };
  const need = townNeedDex(e);
  return { name: '마을 키우기', level: `${e.town}등급`, desc: e.town >= 8 ? '환상의 항구가 되었다' : `${ro(TOWN_NAMES[e.town + 1])} 커진다 · 가게를 더 키울 수 있다`, cost: townCost(e),
    block: e.town >= 8 ? '끝' : dex < need ? `도감 ${dex}/${need}` : null, icon: `h_shop_${look}_hall` };
}

// 판의 자리
const PANEL = { x: 182, y: 28, w: 364 }, PS = PANEL.w / 336;      // PS: 판을 키운 비율 (판 그림에서 잰 자리들은 폭 336 기준)
const panelH = () => PANEL.w * sprite('h_panel').h / sprite('h_panel').w;
// 줄은 왼쪽 위 둥근 창(테두리 아래 끝 = 판 위에서 86)에서 한 뼘 띄우고 시작한다. 그만큼 판 전체를 키워서 줄은 줄이지 않았다
const rowRect = (i) => ({ x: PANEL.x + 30, y: PANEL.y + 93 + i * 47.5, w: 304, h: 45.5 });
const closeRect = () => ({ x: PANEL.x + PANEL.w - 30 * PS, y: PANEL.y + 4 * PS, w: 28 * PS, h: 28 * PS });

// ── 대 잇기: 모든 기억을 되찾은 뒤, 시청에서. 장비·마을·돈은 처음으로 돌아가고 도감·옛 물건(능력)은 남는다. 대를 이을 때마다 파는 값이 오른다 ──
function nextGen(g) {
  travel(g, () => {
    const f = newEconomy();
    Object.assign(g.eco.gear, f.gear); Object.assign(g.eco.skill, f.skill); Object.assign(g.eco.shop, f.shop); g.eco.town = 1;
    g.gen = (g.gen || 0) + 1; g.gold = 0; g.goldShown = 0; g.region = 1; g.cargo.length = 0; g.cargoMax = cargoMax(g.eco); g.dayT = 0; g.dayOver = false; g.savedToday = false; g.questToday = false;
    g.quest = null; g.panel = null; g.scene = 'harbor'; g.msg = null; g.dirty = true;
    g.story.seen.gen = 0; g.pendingGen = true;
  });
}
// '어촌으로', '항구 마을로': 받침에 맞는 조사 (받침이 없거나 ㄹ이면 '로')
const ro = (w) => { const c = (w.charCodeAt(w.length - 1) - 0xac00) % 28; return w + (c === 0 || c === 8 ? '로' : '으로'); };
const lastQuip = {};
export function openPanel(g, id) {
  const who = id === 'skills' ? 'guild' : id; let quip = lastQuip[who] = pickQuip(who, TOWN_LOOK[g.eco.town], lastQuip[who]);      // 주인의 한마디: 열 때마다 하나
  if (id === 'hall' && g.dexNews) { quip = g.dexNews.stage === 2 ? `${dexName(g.dexNews.r)} 도감을 다 채웠다고? 장하구나!` : `${dexName(g.dexNews.r)} 도감이 절반을 넘었구나. 에헴!`; g.dexNews = null; g.dirty = true; }      // 도감 소식을 들은 시장
  if (who === 'guild' && !g.quest && !g.questToday) { g.quest = newQuest(g); g.questToday = true; }      // 오늘 의뢰를 아직 받지 않았을 때만 (하루에 하나)
  g.panel = { id, t: 0, hit: -1, hitT: 0, closing: null, quip };
}
function closePanel(g) { if (g.panel && g.panel.closing == null) { g.panel.closing = 0; g.sfx.push(['paper']); } }      // 뚝 사라지지 않고 스르르 닫힌다

// ── 누르기. 처리했으면 true (낚시 조작으로 넘기지 않는다) ──
export function pointer(g, x, y) {
  if (g.travel) return true;
  if (g.settings) { tapSettings(g, x, y); return true; }      // 설정 판이 떠 있으면 다른 것은 눌리지 않는다
  if (g.title) { tapTitle(g, x, y); return true; }
  if (g.memory) { tapMemory(g); return true; }
  if (g.talk) { tapTalk(g, x, y); return true; }       // 대화가 떠 있으면 다른 것은 눌리지 않는다
  if (g.map) { const r = tapMap(g, x, y, g.scene === 'harbor'); if (r) goRegion(g, r); return true; }
  if (g.dex) { tapDex(g, x, y); return true; }
  if (tapSkip(g, x, y) || g.skip) return true;
  if (tapSound(g, x, y)) return true;
  if (g.panel) {
    if (g.panel.closing != null) return true;
    const rows = rowsOf(g, g.panel.id), c = closeRect();
    if (x >= c.x - 4 && x <= c.x + c.w + 4 && y >= c.y - 4 && y <= c.y + c.h + 4) { closePanel(g); return true; }
    for (let i = 0; i < rows.length; i++) {
      const r = rowRect(i);
      if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
        if (rows[i][0] === 'skin') { g.skin = g.skin === false; g.panel.hit = i; g.panel.hitT = 0; g.sfx.push(['tap']); g.dirty = true; return true; }
        if (rows[i][0] === 'gen') { if (!g.panel.confirm) { g.panel.confirm = true; g.panel.hit = i; g.panel.hitT = 0; g.sfx.push(['tap']); } else nextGen(g); return true; }
        if (buy(g, rows[i][0], rows[i][1])) { g.panel.hit = i; g.panel.hitT = 0; g.sfx.push([rows[i][0] === 'town' ? 'townup' : 'buy']); if (rows[i][0] === 'town') storyTown(g);
          if (rows[i][0] === 'skill') { g.panel.rep = { i, t: 0, next: 0.38, n: 0 }; if (g.eco.skill[rows[i][1]] % 10 === 0) buzz(30); } else buzz(20); }      // 마디 보너스와 큰 구매는 손끝으로도      // 스킬: 누르고 있으면 계속 올라간다
        else { g.panel.hit = -2 - i; g.panel.hitT = 0; g.sfx.push(['deny']); }
        return true;
      }
    }
    if (x < PANEL.x - 100 || x > PANEL.x + PANEL.w || y < PANEL.y || y > PANEL.y + panelH()) closePanel(g);   // 판 밖을 누르면 닫힌다
    return true;
  }
  if (g.scene === 'harbor') {
    if (!g.story.seen.sail) { if (Math.abs(x - LEAVE.x) < LEAVE.w / 2 + 6 && Math.abs(y - LEAVE.y) < LEAVE.h / 2 + 6) leaveHarbor(g); return true; }   // 처음에는 출항 단추만 눌린다 (가게는 첫 낚시 뒤에)
    if (Math.abs(x - LEAVE.x) < LEAVE.w / 2 && Math.abs(y - LEAVE.y) < LEAVE.h / 2) { leaveHarbor(g); return true; }
    if (restShown(g) && Math.abs(x - REST.x) < REST.w / 2 && Math.abs(y - REST.y) < REST.h / 2) { rest(g); return true; }
    if (Math.hypot(x - HDEX.x, y - HDEX.y) <= HDEX.r + 3) { openDex(g); return true; }
    if (Math.hypot(x - HMAP.x, y - HMAP.y) <= HMAP.r + 3) { openMap(g); return true; }
    for (let i = 0; i < HOUSES.length; i++) {
      if (Math.abs(x - HX(i)) < HW / 2 + 4 && y > HY - 92 && y < HY + 22) { openPanel(g, HOUSES[i]); g.sfx.push(['door']); return true; }
    }
    return true;
  }
  if (g.state === 'idle') {
    for (const b of SEA_BTNS) {
      if (Math.hypot(x - b.x, y - b.y) <= b.r + 3) {
        if (b.id === 'harbor') enterHarbor(g); else if (b.id === 'map') openMap(g); else if (b.id === 'dex') openDex(g); else { openPanel(g, 'skills'); g.sfx.push(['paper']); }
        return true;
      }
    }
  }
  return false;
}

export function updateHarbor(g, dt) {
  if (g.panel) {
    g.panel.t += dt; g.panel.hitT += dt;
    // 스킬 단추를 누르고 있는 동안: 처음엔 천천히, 갈수록 빠르게 연달아 올린다 (초당 4번 → 16번). 돈이 모자라거나 손을 떼면 멈춘다
    const rp = g.panel.rep;
    if (rp && g.panel.closing == null) {
      rp.t += dt;
      while (rp && rp.t >= rp.next) {
        const row = rowsOf(g, g.panel.id)[rp.i];
        if (row && buy(g, row[0], row[1])) { if (g.eco.skill[row[1]] % 10 === 0) buzz(30); rp.n++; rp.next += Math.max(0.062, 0.25 * 0.86 ** rp.n); g.panel.hit = rp.i; g.panel.hitT = 0; g.sfx.push(['tick']); g.dirty = true; }
        else { g.panel.rep = null; break; }
      }
    }
    if (g.panel.closing != null && (g.panel.closing += dt) > 0.18) g.panel = null;
  }
  g.harborT = (g.harborT || 0) + dt;
}

// 그 가게에서 지금 살 수 있는 것이 있는가 (건물 위에 동전이 뜬다)
function canBuyAt(g, id) {
  return rowsOf(g, id).some(([k, i]) => { if (k === 'skin' || k === 'gen') return false; const r = rowInfo(g, k, i); return !r.block && g.gold >= r.cost; });      // 겉모습 켜고 끄기·대 잇기는 '살 것'이 아니다
}

// ── 그리기 ──
let btnA = 0, btnT = 0;
export function drawSeaButtons(ctx, g) {
  const now = performance.now() / 1000, dt = Math.min(0.1, now - btnT); btnT = now;
  btnA += ((g.state === 'idle' && g.scene === 'sea' && !g.talk ? 1 : 0) - btnA) * (1 - Math.exp(-9 * dt));      // 대화 중에는 대화창에 가리므로 숨긴다
  if (btnA < 0.01) return;
  ctx.save(); ctx.globalAlpha = btnA;
  for (const b of SEA_BTNS) {
    img(ctx, b.id === 'skill' && hasSprite('ui_ic_skill') ? 'ui_ic_skill' : b.icon, b.x - b.r, b.y - b.r, b.r * 2, b.r * 2);      // 기술 버튼: 제 그림(낚싯바늘과 별)이 오기 전까지는 톱니
    if (b.id === 'skill' && canBuyAt(g, 'skills')) img(ctx, 'icon_gold', b.x + 6, b.y - b.r - 2 + Math.sin(g.time * 4) * 1.5, 10, 10);
    if (b.id === 'harbor' && g.cargo.length >= g.cargoMax) img(ctx, 'icon_gold', b.x + 6, b.y - b.r - 2 + Math.sin(g.time * 4) * 1.5, 10, 10);
  }
  ctx.restore();
}

// 매어 둔 배: 물에 떠 있는 것처럼 보이게 한다 (그림은 그대로, 코드는 뒤집고·풀어 줄 뿐)
//  · 배 밑은 반듯하게 잘린 선이 보이지 않게 아래로 갈수록 서서히 물빛에 잠긴다
//  · 그 아래 물에는 배가 뒤집혀 옅게 비치고, 물결 따라 가로로 일렁인다 (뒤의 건물들이 물에 비치는 것과 같이)
const moorCache = new Map();
function moored(ctx, b, x, y, w, h, t) {
  let c = moorCache.get(b.img);
  if (!c) {      // 밑을 풀어 준 그림은 한 번만 만든다
    c = document.createElement('canvas'); c.width = b.img.width; c.height = b.img.height;
    const q = c.getContext('2d'); q.drawImage(b.img, 0, 0);
    const g0 = q.createLinearGradient(0, c.height * 0.86, 0, c.height); g0.addColorStop(0, 'rgba(0,0,0,0)'); g0.addColorStop(1, 'rgba(0,0,0,1)');
    q.globalCompositeOperation = 'destination-out'; q.fillStyle = g0; q.fillRect(0, c.height * 0.86, c.width, c.height * 0.14);
    moorCache.set(b.img, c);
  }
  const wl = y + h * 0.93, n = 14, rh = Math.min(h * 0.5, 30), sh = c.height * 0.5 / n;      // 물에 잠기는 선, 비친 모습의 높이
  ctx.save();
  for (let i = 0; i < n; i++) {      // 비친 모습: 가로 띠로 나눠 띠마다 조금씩 밀어 일렁이게, 아래로 갈수록 옅게
    const k = i / n, dx = Math.sin(t * 1.6 + i * 0.9) * (0.6 + k * 2.2);
    ctx.globalAlpha = 0.34 * (1 - k) * (1 - k);
    ctx.drawImage(c, 0, c.height * 0.93 - (i + 1) * sh, c.width, sh, x + dx, wl + k * rh, w, rh / n + 0.6);
  }
  ctx.restore();
  ctx.drawImage(c, x, y, w, h);
  // 배와 물이 만나는 자리의 잔물결 (그림: h_boat_foam). 배와는 조금 다른 박자로 오르내리고 좌우로 살짝 밀린다
  if (hasSprite('h_boat_foam')) { const f = sprite('h_boat_foam'), fw = w * 1.06, fh = fw * f.h / f.w;
    ctx.save(); ctx.globalAlpha = 0.9; ctx.drawImage(f.img, x - w * 0.03 + Math.sin(t * 0.9) * 1.2, wl - fh * 0.55 + Math.sin(t * 1.9 + 1) * 0.6, fw, fh); ctx.restore(); }
}

export function drawHarbor(ctx, g) {
  const e = g.eco, look = TOWN_LOOK[e.town], t = g.harborT || 0;
  img(ctx, hasSprite('h_town_' + look) ? 'h_town_' + look : 'h_town_1', 0, 0, W, H);
  HOUSES.forEach((id, i) => {
    const s = sprite(`h_shop_${look}_${id}`), w = HW, h = w * s.h / s.w, x = HX(i);
    const open = g.panel && g.panel.id === id, lift = open ? 3 : 0;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(s.img, x - w / 2, HY - h - lift, w, h);
    const tag = `${HOUSE_NAME[id]}  ${id === 'hall' ? e.town + '등급' : 'Lv.' + e.shop[id]}`;
    ctx.font = `600 9px ${FONT}`; const tw = ctx.measureText(tag).width + 12;
    const signKey = hasSprite('h_sign_' + look) ? 'h_sign_' + look : 'h_sign';      // 마을 겉모습 5단계마다 다른 이름판
    if (hasSprite(signKey)) {      // 이름판 (그림): 양 끝은 그대로 두고 가운데만 글 길이에 맞춰 늘린다
      const sp = sprite(signKey), sh = 19, k = sh / sp.h, cap = sp.w * k * 0.22, sw = Math.max(tw + 14, cap * 2 + 8), sx = x - sw / 2, sy = HY + 2.5, iw = sp.img.width, ih = sp.img.height, ic = iw * 0.22;
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(sp.img, 0, 0, ic, ih, sx, sy, cap, sh); ctx.drawImage(sp.img, iw - ic, 0, ic, ih, sx + sw - cap, sy, cap, sh);
      ctx.drawImage(sp.img, ic, 0, iw - 2 * ic, ih, sx + cap - 0.3, sy, sw - 2 * cap + 0.6, sh);
      label(ctx, tag, x, sy + sh * 0.53, 9, '#4a2f14', 'center', 700, null);
    } else {
      ctx.fillStyle = 'rgba(16,28,56,0.62)'; ctx.beginPath(); ctx.roundRect(x - tw / 2, HY + 5, tw, 14, 7); ctx.fill();
      label(ctx, tag, x, HY + 12.5, 9, '#fff4dc', 'center', 600, null);
    }
    if (!g.panel && canBuyAt(g, id)) img(ctx, 'icon_gold', x - 6, HY - h - 15 + Math.sin(t * 4 + i) * 2, 12, 12);
  });
  // 정박한 내 배
  // 장비 외형(배): 항구에서는 단계마다 확실하게 커지고 화려해진다
  const bt8 = skinOn(g, 'boat') && hasSprite('h_boat_big_9') ? 9 : Math.min(8, Math.floor(e.gear.boat / 10) + 1);
  // 출항 단추 바로 왼쪽 물 위에 매여 있다. 아래쪽 넓은 물에 두어 크게 그려도 가게와 이름표를 가리지 않는다
  if (hasSprite('h_boat_big_' + bt8)) { const b = sprite('h_boat_big_' + bt8), k = 1.3 + (Math.min(8, bt8) - 1) * 0.057, bw = b.w * k, bh = b.h * k;      /* 뒤 단계일수록 더 크게: 1단계 1.3배 → 8단계 1.7배 */ ctx.imageSmoothingEnabled = true; moored(ctx, b, LEAVE.x - LEAVE.w / 2 - 8 - bw, 351 - bh + Math.sin(t * 1.3) * 1 + bh * 0.05 - 7, bw, bh, t); }
  else if (hasSprite('c_boat_1')) { const b = sprite('c_boat_1'); ctx.drawImage(b.img, W - 150, 262 - b.h + Math.sin(t * 1.3) * 0.8, b.w, b.h); }
  // 마을 이름
  const title = `${e.town}등급 · ${TOWN_NAMES[e.town]}`;
  ctx.font = `600 10.5px ${FONT}`;
  const rb = sprite('h_ribbon'), rh = 150 * rb.h / rb.w, rw = Math.max(150, ctx.measureText(title).width / 0.6);      // 글이 길면 리본을 옆으로 늘린다 (글이 놓이는 반듯한 부분은 폭의 0.6쯤)
  ctx.drawImage(rb.img, W / 2 - rw / 2, 6, rw, rh);
  label(ctx, title, W / 2, 6 + rh * 0.42, 10.5, COLORS.navy, 'center', 600, null);
  if (g.gen) label(ctx, `${g.gen + 1}대째`, W / 2, 6 + rh + 3, 9, '#fff4dc', 'center', 600);      // 대를 이은 뒤: 리본 아래에 작게
  ctx.globalAlpha = g.panel || !g.story.seen.sail ? 0.4 : 1;
  img(ctx, 'ui_ic_book', HDEX.x - HDEX.r, HDEX.y - HDEX.r, HDEX.r * 2, HDEX.r * 2);
  img(ctx, 'ui_ic_map', HMAP.x - HMAP.r, HMAP.y - HMAP.r, HMAP.r * 2, HMAP.r * 2);
  ctx.globalAlpha = 1;
  // 출항
  const bt = sprite('ui_btn');
  g.leaveA = (g.leaveA ?? 1) + ((g.talk ? 0 : g.panel ? 0.4 : 1) - (g.leaveA ?? 1)) * 0.18;      // 대화 중에는 대화창에 반쯤 가리므로 스르르 숨긴다
  ctx.globalAlpha = g.leaveA;
  ctx.drawImage(bt.img, LEAVE.x - LEAVE.w / 2, LEAVE.y - LEAVE.h / 2, LEAVE.w, LEAVE.h);
  label(ctx, '출항', LEAVE.x, LEAVE.y, 12, COLORS.navy, 'center', 600, null);
  if (restShown(g)) {      // 오늘은 쉬기 (출항 버튼 위에 작게). 아직 이르면 흐리다
    ctx.save(); ctx.globalAlpha *= canRest(g) ? 1 : 0.55; ctx.drawImage(bt.img, REST.x - REST.w / 2, REST.y - REST.h / 2, REST.w, REST.h);
    const ask = g.restAsk != null && t - g.restAsk < 3;
    label(ctx, ask ? '정말로?' : '오늘은 쉬기', REST.x, REST.y, 12, ask ? '#8a2f1a' : COLORS.navy, 'center', 600, null); ctx.restore();
  }
  ctx.globalAlpha = 1;
}

export function drawPanel(ctx, g) {
  const p = g.panel;
  if (!p) return;
  const k = easeOut(clamp(p.t / 0.22, 0, 1)) * (p.closing != null ? 1 - clamp(p.closing / 0.18, 0, 1) : 1), ph = panelH();
  const shopId = p.id === 'skills' ? 'guild' : p.id;
  ctx.save();
  ctx.fillStyle = `rgba(10,18,40,${0.42 * k})`; ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = k;
  ctx.translate(0, (1 - k) * 14);
  // 가게 주인이 판 왼쪽에 서 있다
  const npc = sprite('h_npc_' + shopId), nw = npc.dw || 104, nh = nw * npc.h / npc.w;      // dw: 그림의 폭이 달라져도 키가 같아 보이도록 따로 적은 폭
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(npc.img, PANEL.x - nw + 22, PANEL.y + ph - nh - 4 + Math.sin(g.time * 1.6) * 0.8, nw, nh);
  img(ctx, 'h_panel', PANEL.x, PANEL.y, PANEL.w, ph);
  const rb = sprite('h_ribbon'), rw = 170 * PS, rh = rw * rb.h / rb.w;
  ctx.drawImage(rb.img, PANEL.x + PANEL.w / 2 - rw / 2 + 10 * PS, PANEL.y + 10 * PS, rw, rh);
  label(ctx, p.id === 'skills' ? '어부의 기술' : HOUSE_NAME[p.id], PANEL.x + PANEL.w / 2 + 10 * PS, PANEL.y + 10 * PS + rh * 0.42, 12.5, COLORS.navy, 'center', 600, null);
  const c = closeRect(); img(ctx, 'h_close', c.x, c.y, c.w, c.h);
  // 판 왼쪽 위 둥근 창: 그 가게의 상징 (그림이 없으면 건물). 마을이 커지면 창 테두리 장식만 달라진다
  const look = TOWN_LOOK[g.eco.town], rx = PANEL.x + PANEL.w * 0.1503, ry = PANEL.y + ph * 0.1547, rr = PANEL.w * 0.0909;      // 판 그림의 둥근 창: 구멍의 가운데와 반지름 (그림의 구멍 가장자리에 원을 맞춰 잰 값)
  const mark = hasSprite('h_mark_' + shopId), hs = sprite(mark ? 'h_mark_' + shopId : `h_shop_${look}_${shopId}`);
  ctx.save(); ctx.beginPath(); ctx.arc(rx, ry, rr, 0, Math.PI * 2); ctx.clip();
  { const fit = rr * (mark ? 1.38 : 1.55), k = Math.min(fit / hs.w, fit / hs.h); ctx.drawImage(hs.img, rx - hs.w * k / 2, ry - hs.h * k / 2 + (mark ? 0 : rr * 0.04), hs.w * k, hs.h * k); }      // 창 한가운데에 통째로 들어온다
  ctx.restore();
  rowsOf(g, p.id).forEach(([kind, id], i) => {
    const r = rowRect(i), info = rowInfo(g, kind, id), can = !info.block && g.gold >= info.cost;
    const bump = p.hit === i ? Math.sin(clamp(p.hitT / 0.18, 0, 1) * Math.PI) * 2.5 : 0;        // 샀을 때 톡 튄다
    const shake = p.hit === -2 - i ? Math.sin(p.hitT * 50) * 2 * clamp(1 - p.hitT / 0.25, 0, 1) : 0;   // 못 살 때 도리도리
    ctx.save();
    ctx.translate(shake, -bump);
    const done = info.block === '끝';                       // 끝까지 올린 것: 잠긴 것이 아니라 완성된 것으로 보인다
    if (!can && !done) ctx.globalAlpha = k * (info.block ? 0.8 : 0.78);
    img(ctx, info.block && !done ? 'h_row_locked' : 'h_row', r.x, r.y, r.w, r.h);
    const ic = sprite(info.icon), is = 33, iw = ic.w >= ic.h ? is : is * ic.w / ic.h, ih = iw * ic.h / ic.w;
    ctx.drawImage(ic.img, r.x + r.w * 0.109 - iw / 2, r.y + r.h * 0.48 - ih / 2, iw, ih);
    label(ctx, info.name, r.x + 56, r.y + r.h / 2 - 6, 11, COLORS.navy, 'left', 600, null);
    label(ctx, info.level, r.x + 56 + ctx.measureText(info.name).width + 6, r.y + r.h / 2 - 6, 9, '#8a5a2b', 'left', 600, null);
    { const desc = done ? '끝까지 올렸다' : info.block ? `${info.block} 필요` : info.desc, room = r.w * 0.715 - 56;      // 설명은 버튼 왼쪽 끝 앞에서 끝나야 한다. 넘치면 글자를 줄인다
      ctx.font = `600 8.5px ${FONT}`; const dw = ctx.measureText(desc).width;
      label(ctx, desc, r.x + 56, r.y + r.h / 2 + 8.5, dw > room ? Math.max(6.5, 8.5 * room / dw) : 8.5, info.block && !done ? '#9a3b2b' : '#6b5a48', 'left', 600, null); }
    if (done) label(ctx, '완성', r.x + r.w * 0.848, r.y + r.h * 0.492, 9.5, '#4a2a08', 'center', 600, null);
    else if (!info.block) label(ctx, info.btn || fmt(info.cost), r.x + r.w * 0.848, r.y + r.h * 0.492, 9.5, can ? '#4a2a08' : '#b0281c', 'center', 600, null);
    ctx.restore();
  });
  if (hasSprite('h_rim_' + look)) {                          // 테두리: 그림의 구멍을 판의 창에 맞춰 얹는다. 아래로 늘어진 장식이 가려지지 않게 줄보다 나중에 그린다
    const rim = sprite('h_rim_' + look), [hx, hy, hr] = rim.hole, dw = rr * 1.017 / hr;      // 판에 그려진 원래 테두리가 밖으로 비어져 나오지 않도록 조금 크게, 조금 위로 (원래 테두리는 위쪽이 더 두껍다)
    ctx.drawImage(rim.img, rx + PANEL.w * 0.0005 - hx * dw, ry - PANEL.w * 0.0015 - hy * dw, dw, dw * rim.h / rim.w);
  }
  // 둥근 창 오른쪽 빈자리: 주인의 한마디 (길드는 판 아래 바깥에 누르고 있기 안내)
  { const hold = p.id === 'skills' || p.id === 'guild';
    if (p.quip) {                                             // 제목 리본과 같은 가운데 줄에 맞춘다. 긴 말이 둥근 창에 닿을 때만 그만큼 오른쪽으로 비킨다
      const str = `“${p.quip}”`; ctx.font = `600 9px ${FONT}`;
      const half = ctx.measureText(str).width / 2, qx = Math.max(PANEL.x + PANEL.w / 2 + 10 * PS, PANEL.x + 108 * PS + half);
      const ql = p.id === 'guild' || p.id === 'skills' ? questLine(g) : '';      // 길드: 한마디 아래에 오늘의 의뢰
      label(ctx, str, qx, PANEL.y + (ql ? 73 : 79), 9, '#6b4a2b', 'center', 600, null);
      if (ql) { ctx.font = `600 8.5px ${FONT}`; const h2 = ctx.measureText(ql).width / 2; label(ctx, ql, Math.max(PANEL.x + PANEL.w / 2 + 10 * PS, PANEL.x + 108 * PS + h2), PANEL.y + 85.5, 8.5, g.quest.done ? '#b0641c' : '#8a4a22', 'center', 600, null); }
    }
    if (hold) label(ctx, '버튼을 누르고 있으면 계속 올라갑니다', PANEL.x + PANEL.w / 2 - 22, PANEL.y + panelH() + 9, 9, '#fff4dc', 'center', 600); }      // 판 아래 바깥에
  ctx.restore();
}

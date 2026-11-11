// 항구 마을 화면과 가게 판. 화면에 보이는 것은 전부 GPT 그림이고, 코드는 놓고·넘기고·글자를 얹을 뿐이다.
import { W, H, COLORS } from './config.js';
import { sprite, hasSprite } from './assets.js';
import { REGIONS } from './creatures.js';
import {
  GEAR, SKILLS, SHOPS, TOWN_NAMES, TOWN_LOOK, buy, gearCost, skillCost, gearBlock, gearLabel, maxRegion, fmt,
  townCost, townNeedDex, shopCost, shopLocked, skillCap,
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
// 바다 화면의 둥근 단추 (낚시 중이 아닐 때만)
export const SEA_BTNS = [
  { id: 'harbor', icon: 'ui_ic_harbor', x: W - 26, y: H - 26, r: 17, label: '항구' },
  { id: 'map',    icon: 'ui_ic_map',    x: W - 64, y: H - 26, r: 17, label: '해역' },
  { id: 'book',   icon: 'ui_ic_book',   x: W - 102, y: H - 26, r: 17, label: '스킬' },
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
    if (g.cargo.length) {
      const sum = g.cargo.reduce((a, c) => a + c.price, 0), n = Math.min(16, 5 + g.cargo.length);
      g.gold += sum;
      for (let i = 0; i < n; i++) g.coins.push({ age: -i * 0.04 - 0.35, life: 0.6, sx: HX(0) + rand(-24, 24), sy: HY - 30 + rand(-14, 14) });
      g.sfx.push(['coin', n]);
      g.msg = { text: `${g.cargo.length}마리 판매  +${fmt(sum)} G`, color: '#ffe27a', age: -0.3 };
      g.cargo.length = 0;
    }
  });
}
export function leaveHarbor(g) { return travel(g, () => { g.scene = 'sea'; g.panel = null; g.dayT = 0; g.dayWarned = false; g.phase = 3; }); }   // 새 하루가 새벽에 시작된다
function nextRegion(g) {
  const n = g.region % maxRegion(g.eco) + 1;
  if (n === g.region) { g.msg = { text: '더 큰 배가 있어야 먼바다로 나갈 수 있다', color: '#ffd0c0', age: 0 }; return; }
  travel(g, () => { g.region = n; g.msg = { text: `${n}번 해역 · ${REGIONS[n]}`, color: '#fff4dc', age: -0.2 }; });
}

// ── 가게 판에 놓이는 줄 ──
const SKILL_ICON = { profit: 'h_skill_1', speed: 'h_skill_2', big: 'h_skill_3' };
const GEAR_DESC = { outfit: '낚은 생물의 값 +', reel: '입질과 감기가 빨라진다', line: '더 센 생물을 버틴다', rod: '더 센 생물을 버틴다', boat: '어창 +2 · 다음 해역' };
function rowsOf(g, id) {
  const gear = (x) => ['gear', x], skill = (x) => ['skill', x];
  switch (id) {
    case 'market': return [['shop', 'market']];
    case 'tackle': return [gear('rod'), gear('line'), gear('reel'), ['shop', 'tackle']];
    case 'yard': return [gear('boat'), ['shop', 'yard']];
    case 'tailor': return [gear('outfit'), ['shop', 'tailor']];
    case 'guild': return [skill('profit'), skill('speed'), skill('big'), ['shop', 'guild']];
    case 'hall': return [['town', 'town']];
    case 'skills': return [skill('profit'), skill('speed'), skill('big')];
  }
  return [];
}
function rowInfo(g, kind, id) {
  const e = g.eco, look = TOWN_LOOK[e.town], dex = Object.keys(g.records).length;
  if (kind === 'gear') {
    const x = GEAR.find((v) => v.id === id), lv = e.gear[id];
    return { name: x.name, level: gearLabel(lv), desc: GEAR_DESC[id], cost: gearCost(e, id), block: gearBlock(e, id), icon: `h_${id}_${Math.min(8, Math.floor(lv / 10) + 1)}` };
  }
  if (kind === 'skill') {
    const x = SKILLS.find((v) => v.id === id), lv = e.skill[id];
    return { name: x.name, level: `Lv.${lv}`, desc: x.desc, cost: skillCost(e, id), block: lv >= skillCap(e) ? (e.shop.guild >= 8 ? '끝' : `길드 Lv.${e.shop.guild + 1}`) : null, icon: SKILL_ICON[id] };
  }
  if (kind === 'shop') {
    const x = SHOPS.find((v) => v.id === id), lv = e.shop[id];
    return { name: `${x.name} 키우기`, level: `Lv.${lv}`, desc: x.desc, cost: shopCost(e, id), block: lv >= 8 ? '끝' : shopLocked(e, id) ? '마을 등급' : null, icon: `h_shop_${look}_${id}` };
  }
  const need = townNeedDex(e);
  return { name: '마을 키우기', level: `${e.town}등급`, desc: e.town >= 8 ? '환상의 항구가 되었다' : `${TOWN_NAMES[e.town + 1]}(으)로 · 판매가 +5%`, cost: townCost(e),
    block: e.town >= 8 ? '끝' : dex < need ? `도감 ${dex}/${need}` : null, icon: `h_shop_${look}_hall` };
}

// 판의 자리
const PANEL = { x: 196, y: 40, w: 336 };
const panelH = () => PANEL.w * sprite('h_panel').h / sprite('h_panel').w;
const rowRect = (i) => ({ x: PANEL.x + 30, y: PANEL.y + 54 + i * 51, w: 280, h: 48 });
const closeRect = () => ({ x: PANEL.x + PANEL.w - 30, y: PANEL.y + 4, w: 28, h: 28 });

export function openPanel(g, id) { g.panel = { id, t: 0, hit: -1, hitT: 0, closing: null }; }
function closePanel(g) { if (g.panel && g.panel.closing == null) { g.panel.closing = 0; g.sfx.push(['paper']); } }      // 뚝 사라지지 않고 스르르 닫힌다

// ── 누르기. 처리했으면 true (낚시 조작으로 넘기지 않는다) ──
export function pointer(g, x, y) {
  if (g.travel) return true;
  if (g.panel) {
    if (g.panel.closing != null) return true;
    const rows = rowsOf(g, g.panel.id), c = closeRect();
    if (x >= c.x - 4 && x <= c.x + c.w + 4 && y >= c.y - 4 && y <= c.y + c.h + 4) { closePanel(g); return true; }
    for (let i = 0; i < rows.length; i++) {
      const r = rowRect(i);
      if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
        if (buy(g, rows[i][0], rows[i][1])) { g.panel.hit = i; g.panel.hitT = 0; g.sfx.push([rows[i][0] === 'town' ? 'townup' : 'buy']); }
        else { g.panel.hit = -2 - i; g.panel.hitT = 0; g.sfx.push(['deny']); }
        return true;
      }
    }
    if (x < PANEL.x - 100 || x > PANEL.x + PANEL.w || y < PANEL.y || y > PANEL.y + panelH()) closePanel(g);   // 판 밖을 누르면 닫힌다
    return true;
  }
  if (g.scene === 'harbor') {
    if (Math.abs(x - LEAVE.x) < LEAVE.w / 2 && Math.abs(y - LEAVE.y) < LEAVE.h / 2) { leaveHarbor(g); return true; }
    for (let i = 0; i < HOUSES.length; i++) {
      if (Math.abs(x - HX(i)) < HW / 2 + 4 && y > HY - 92 && y < HY + 22) { openPanel(g, HOUSES[i]); g.sfx.push(['door']); return true; }
    }
    return true;
  }
  if (g.state === 'idle') {
    for (const b of SEA_BTNS) {
      if (Math.hypot(x - b.x, y - b.y) <= b.r + 3) {
        if (b.id === 'harbor') enterHarbor(g); else if (b.id === 'map') nextRegion(g); else { openPanel(g, 'skills'); g.sfx.push(['paper']); }
        return true;
      }
    }
  }
  return false;
}

export function updateHarbor(g, dt) {
  if (g.panel) {
    g.panel.t += dt; g.panel.hitT += dt;
    if (g.panel.closing != null && (g.panel.closing += dt) > 0.18) g.panel = null;
  }
  g.harborT = (g.harborT || 0) + dt;
}

// 그 가게에서 지금 살 수 있는 것이 있는가 (건물 위에 동전이 뜬다)
function canBuyAt(g, id) {
  return rowsOf(g, id).some(([k, i]) => { const r = rowInfo(g, k, i); return !r.block && g.gold >= r.cost; });
}

// ── 그리기 ──
let btnA = 0, btnT = 0;
export function drawSeaButtons(ctx, g) {
  const now = performance.now() / 1000, dt = Math.min(0.1, now - btnT); btnT = now;
  btnA += ((g.state === 'idle' && g.scene === 'sea' ? 1 : 0) - btnA) * (1 - Math.exp(-9 * dt));
  if (btnA < 0.01) return;
  ctx.save(); ctx.globalAlpha = btnA;
  for (const b of SEA_BTNS) {
    img(ctx, b.icon, b.x - b.r, b.y - b.r, b.r * 2, b.r * 2);
    if (b.id === 'book' && canBuyAt(g, 'skills')) img(ctx, 'icon_gold', b.x + 6, b.y - b.r - 2 + Math.sin(g.time * 4) * 1.5, 10, 10);
    if (b.id === 'harbor' && g.cargo.length >= g.cargoMax) img(ctx, 'icon_gold', b.x + 6, b.y - b.r - 2 + Math.sin(g.time * 4) * 1.5, 10, 10);
  }
  ctx.restore();
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
    ctx.fillStyle = 'rgba(16,28,56,0.62)'; ctx.beginPath(); ctx.roundRect(x - tw / 2, HY + 5, tw, 14, 7); ctx.fill();
    label(ctx, tag, x, HY + 12.5, 9, '#fff4dc', 'center', 600, null);
    if (!g.panel && canBuyAt(g, id)) img(ctx, 'icon_gold', x - 6, HY - h - 15 + Math.sin(t * 4 + i) * 2, 12, 12);
  });
  // 정박한 내 배
  if (hasSprite('c_boat_1')) { const b = sprite('c_boat_1'); ctx.drawImage(b.img, W - 150, 262 - b.h + Math.sin(t * 1.3) * 0.8, b.w, b.h); }
  // 마을 이름
  const rb = sprite('h_ribbon'), rw = 150, rh = rw * rb.h / rb.w;
  ctx.drawImage(rb.img, W / 2 - rw / 2, 6, rw, rh);
  label(ctx, `${e.town}등급 · ${TOWN_NAMES[e.town]}`, W / 2, 6 + rh * 0.42, 10.5, COLORS.navy, 'center', 600, null);
  // 출항
  const bt = sprite('ui_btn');
  ctx.globalAlpha = g.panel ? 0.4 : 1;
  ctx.drawImage(bt.img, LEAVE.x - LEAVE.w / 2, LEAVE.y - LEAVE.h / 2, LEAVE.w, LEAVE.h);
  label(ctx, '출항', LEAVE.x, LEAVE.y, 12, COLORS.navy, 'center', 600, null);
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
  const npc = sprite('h_npc_' + shopId), nw = 104, nh = nw * npc.h / npc.w;
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(npc.img, PANEL.x - nw + 22, PANEL.y + ph - nh - 4 + Math.sin(g.time * 1.6) * 0.8, nw, nh);
  img(ctx, 'h_panel', PANEL.x, PANEL.y, PANEL.w, ph);
  const rb = sprite('h_ribbon'), rw = 170, rh = rw * rb.h / rb.w;
  ctx.drawImage(rb.img, PANEL.x + PANEL.w / 2 - rw / 2 + 10, PANEL.y + 10, rw, rh);
  label(ctx, p.id === 'skills' ? '어부의 기술' : HOUSE_NAME[p.id], PANEL.x + PANEL.w / 2 + 10, PANEL.y + 10 + rh * 0.42, 12, COLORS.navy, 'center', 600, null);
  const c = closeRect(); img(ctx, 'h_close', c.x, c.y, c.w, c.h);
  // 판 왼쪽 위 둥근 창: 그 가게 건물
  const hs = sprite(`h_shop_${TOWN_LOOK[g.eco.town]}_${shopId}`), rx = PANEL.x + PANEL.w * 0.097, ry = PANEL.y + ph * 0.118, rr = PANEL.w * 0.068;
  ctx.save(); ctx.beginPath(); ctx.arc(rx, ry, rr, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(hs.img, rx - rr * 1.15, ry - rr * 1.15 * hs.h / hs.w + 2, rr * 2.3, rr * 2.3 * hs.h / hs.w);
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
    const ic = sprite(info.icon), is = 34, iw = ic.w >= ic.h ? is : is * ic.w / ic.h, ih = iw * ic.h / ic.w;
    ctx.drawImage(ic.img, r.x + 27 - iw / 2, r.y + r.h / 2 - ih / 2, iw, ih);
    label(ctx, info.name, r.x + 52, r.y + 17, 11, COLORS.navy, 'left', 600, null);
    label(ctx, info.level, r.x + 52 + ctx.measureText(info.name).width + 6, r.y + 17, 9, '#8a5a2b', 'left', 600, null);
    label(ctx, done ? '끝까지 올렸다' : info.block ? `${info.block} 필요` : info.desc, r.x + 52, r.y + 32, 8.5, info.block && !done ? '#9a3b2b' : '#6b5a48', 'left', 600, null);
    if (done) label(ctx, '완성', r.x + r.w * 0.862, r.y + r.h / 2 + 0.5, 9.5, '#4a2a08', 'center', 600, null);
    else if (!info.block) label(ctx, fmt(info.cost), r.x + r.w * 0.862, r.y + r.h / 2 + 0.5, 9.5, can ? '#4a2a08' : '#b0281c', 'center', 600, null);
    ctx.restore();
  });
  ctx.restore();
}

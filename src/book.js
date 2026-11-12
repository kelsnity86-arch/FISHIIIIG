// 해역 지도와 도감. 화면에 보이는 것은 GPT 그림(해도, 표식, 책, 칸)과 글자뿐이고, 코드는 놓고·넘기고·글자를 얹는다.
import { W, H, GRADES } from './config.js';
import { sprite, hasSprite, preloadCreature } from './assets.js';
import { REGIONS } from './creatures.js';
import { DOTS } from './dots.js';
import { maxRegion } from './economy.js';
import { DEX_TEXT } from './dexText.js';
import { RELICS } from './relics.js';

const FONT = '"Hahmlet", system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
const FONT2 = '"Jua", system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = (k) => k * k * (3 - 2 * k);
const GI = Object.fromEntries(GRADES.map((g, i) => [g.id, i]));

function label(ctx, str, x, y, size, color, align = 'center', weight = 600, stroke = 'rgba(16,28,56,0.6)', font = FONT) {
  ctx.font = `${weight} ${size}px ${font}`; ctx.textAlign = align; ctx.textBaseline = 'middle';
  if (stroke) { ctx.lineWidth = Math.max(1.8, size * 0.22); ctx.lineJoin = 'round'; ctx.strokeStyle = stroke; ctx.strokeText(str, x, y); }
  ctx.fillStyle = color; ctx.fillText(str, x, y);
}
function img(ctx, name, x, y, w, h) { const s = sprite(name); ctx.imageSmoothingEnabled = true; ctx.drawImage(s.img, x, y, w, h ?? w * s.h / s.w); return s; }
function wrap(ctx, str, max) {
  const out = []; let line = '';
  for (const word of str.split(' ')) { const t = line ? line + ' ' + word : word; if (ctx.measureText(t).width > max && line) { out.push(line); line = word; } else line = t; }
  if (line) out.push(line);
  return out;
}
// 열고 닫을 때 스르르 (뚝 나타나지 않게)
function fade(o, dt) {
  if (o.closing != null) { o.closing += dt; o.a = Math.max(0, o.a - dt / 0.2); return o.closing > 0.2; }
  o.a = Math.min(1, o.a + dt / 0.25); o.t += dt;
  return false;
}
const CLOSE = { x: W - 34, y: 30, r: 13 };
const hitClose = (x, y) => Math.hypot(x - CLOSE.x, y - CLOSE.y) < CLOSE.r + 5;

export function updateBook(g, dt) {
  if (g.map && fade(g.map, dt)) g.map = null;
  if (g.dex && fade(g.dex, dt)) g.dex = null;
}

// ── 해역 지도: 표식을 눌러 그 바다로 간다 ──
const PIN_X = [0, 80, 158, 231, 304, 375, 439, 505, 590], PIN_TIP = 174, PIN_W = 30;
const MCLOSE = { x: W - 46, y: H - 48 };      // 해도의 나침반을 가리지 않게 오른쪽 아래에
export function openMap(g) { g.map = { a: 0, t: 0, closing: null, note: null }; g.sfx.push(['paper']); }
// 누른 결과: 갈 해역 번호(이동은 부른 쪽에서), 없으면 null
export function tapMap(g, x, y, fromHarbor = false) {
  const m = g.map; if (!m || m.closing != null) return null;
  if (Math.hypot(x - MCLOSE.x, y - MCLOSE.y) < 19) { m.closing = 0; g.sfx.push(['paper']); return null; }
  for (let r = 1; r <= 8; r++) {
    if (Math.abs(x - PIN_X[r]) < 26 && y > PIN_TIP - 46 && y < PIN_TIP + 34) {
      if (r > maxRegion(g.eco)) { m.note = `${REGIONS[r]} · 조선소에서 배를 ${r}단계로 키워야 갈 수 있다`; m.noteT = m.t; g.sfx.push(['deny']); return null; }
      if (r === g.region && !fromHarbor) { m.note = `${REGIONS[r]} · 지금 있는 바다`; m.noteT = m.t; g.sfx.push(['tap']); return null; }
      m.closing = 0; return r;
    }
  }
  return null;
}
export function drawMap(ctx, g) {
  const m = g.map; if (!m) return;
  const a = ease(m.a), top = maxRegion(g.eco);
  ctx.save(); ctx.globalAlpha = a;
  img(ctx, 'ui_map', 0, (1 - a) * 8, W, H);
  for (let r = 1; r <= 8; r++) {
    const open = r <= top, here = r === g.region, s = sprite(open ? 'map_pin_' + r : 'map_lock');
    const w = PIN_W * (here ? 1.12 : 1), h = w * s.h / s.w, bob = here ? Math.sin(m.t * 2.6) * 1.5 : 0;
    if (here) { const rg = sprite('map_ring'), rw = w * 1.02; ctx.drawImage(rg.img, PIN_X[r] - rw / 2, PIN_TIP - h + bob - (rw * rg.h / rg.w - w * 0.96) / 2 - 1, rw, rw * rg.h / rg.w); }
    ctx.globalAlpha = a * (open ? 1 : 0.9);
    ctx.drawImage(s.img, PIN_X[r] - w / 2, PIN_TIP - h + bob, w, h);
    ctx.globalAlpha = a;
    if (here) { const b = sprite('map_boat'), bw = 26; ctx.drawImage(b.img, PIN_X[r] - bw / 2, PIN_TIP + 3 + Math.sin(m.t * 2) * 1, bw, bw * b.h / b.w); }
    label(ctx, REGIONS[r], PIN_X[r], PIN_TIP + (here ? 26 : 12), 7.5, open ? '#fff4dc' : 'rgba(255,244,220,0.6)', 'center', here ? 700 : 600);
  }
  label(ctx, '해역 지도', W / 2, 256, 15, '#5a3a1e', 'center', 700, null);
  const noteA = m.note ? clamp(1 - (m.t - m.noteT - 2.2) / 0.5, 0, 1) * clamp((m.t - m.noteT) / 0.15, 0, 1) : 0;
  if (noteA > 0.01) { ctx.globalAlpha = a * noteA; label(ctx, m.note, W / 2, 280, 10, '#8a3b22', 'center', 600, null); ctx.globalAlpha = a; }
  else label(ctx, g.scene === 'harbor' ? '표식을 누르면 그 바다로 출항한다' : '표식을 누르면 그 바다로 간다', W / 2, 280, 9.5, '#7a6248', 'center', 600, null);
  img(ctx, 'h_close', MCLOSE.x - 14, MCLOSE.y - 14, 28, 28);
  ctx.restore();
}

// ── 도감: 왼쪽 쪽에 그 해역의 생물 칸, 오른쪽 쪽에 고른 생물 ──
const BW = 600, BX = (W - BW) / 2;
const bookH = () => BW * sprite('dex_book').h / sprite('dex_book').w, BY = () => (H - bookH()) / 2 + 4;
const TABS = [1, 2, 3, 4, 5, 6, 7, 8, 0, 'R'];            // 0 = 모든 해역 공용(평범한 물고기), 'R' = 오래된 물건
const COLS = 5, ROWS = 4, PER = COLS * ROWS, SLOT = 33, GAP = 4;
const GX = 84, GW = COLS * SLOT + (COLS - 1) * GAP;        // 칸들의 왼쪽 끝과 폭: 오른쪽의 가름끈(책갈피)에 닿지 않는 자리까지만
const LX = () => BX + BW * 0.135, RX = () => BX + BW * 0.53, PW = () => BW * 0.34;      // 왼쪽·오른쪽 쪽의 안쪽 자리와 폭
const gridY = () => BY() + 50;
const listOf = (tab) => tab === 'R' ? RELICS : DOTS.filter((d) => d[3] === tab).sort((p, q) => GI[p[2]] - GI[q[2]]);
const known = (g, d) => d.mem ? RELICS.indexOf(d) < (g.relics || 0) : g.records[d[0]] != null;
const tabRect = (i) => ({ x: GX - 1 + i * 18.3, y: BY() - 5, w: 17.6, h: 17 });      // 칸들의 폭을 꽉 채워 최대한 넓게
const slotRect = (i) => ({ x: GX + (i % COLS) * (SLOT + GAP), y: gridY() + Math.floor(i / COLS) * (SLOT + GAP), w: SLOT, h: SLOT });
const arrowRect = (dir) => ({ x: GX + GW / 2 + dir * 46 - 9, y: gridY() + ROWS * (SLOT + GAP) + 3, w: 18, h: 18 });
function loadPage(g) { const d = g.dex, list = listOf(d.tab).slice(d.page * PER, d.page * PER + PER); if (d.tab !== 'R') preloadCreature(...list.filter((c) => known(g, c)).map((c) => 'd_' + c[1])); }
export function openDex(g) { g.dex = { a: 0, t: 0, closing: null, tab: g.region, page: 0, sel: null, selT: 0 }; loadPage(g); g.sfx.push(['paper']); }
const inRect = (x, y, r, pad = 0) => x >= r.x - pad && x <= r.x + r.w + pad && y >= r.y - pad && y <= r.y + r.h + pad;
export function tapDex(g, x, y) {
  const d = g.dex; if (!d || d.closing != null) return;
  if (hitClose(x, y)) { d.closing = 0; g.sfx.push(['paper']); return; }
  for (let i = 0; i < TABS.length; i++) if (x >= tabRect(i).x - 0.4 && x < tabRect(i).x + 18.3 && y >= BY() - 16 && y <= BY() + 22) {      /* 누르는 자리는 그림보다 위아래로 넉넉하게 */ if (d.tab !== TABS[i]) { d.tab = TABS[i]; d.page = 0; d.sel = null; d.t = 0; loadPage(g); g.sfx.push(['paper']); } return; }
  const list = listOf(d.tab), pages = Math.ceil(list.length / PER);
  for (const dir of [-1, 1]) if (inRect(x, y, arrowRect(dir), 5)) { const p = clamp(d.page + dir, 0, pages - 1); if (p !== d.page) { d.page = p; d.t = 0; loadPage(g); g.sfx.push(['paper']); } return; }
  const shown = list.slice(d.page * PER, d.page * PER + PER);
  for (let i = 0; i < shown.length; i++) if (inRect(x, y, slotRect(i), 2)) { d.sel = shown[i]; d.selT = d.t; g.sfx.push(['tap']); return; }
}
function creature(ctx, name, cx, cy, maxW, maxH) {
  if (!hasSprite(name)) return;
  const s = sprite(name), k = Math.min(maxW / s.w, maxH / s.h);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(s.img, cx - s.w * k / 2, cy - s.h * k / 2, s.w * k, s.h * k);
  ctx.imageSmoothingEnabled = true;
}
export function drawDex(ctx, g) {
  const d = g.dex; if (!d) return;
  const a = ease(d.a), by = BY() + (1 - a) * 10, bh = bookH();
  ctx.save(); ctx.globalAlpha = a * 0.55; ctx.fillStyle = '#0c1630'; ctx.fillRect(0, 0, W, H);     // 뒤 화면을 살짝 가라앉힌다
  ctx.globalAlpha = a; ctx.translate(0, by - BY());
  // 해역 탭 (책 위쪽에 꽂힌 쪽지)
  TABS.forEach((t, i) => { const r = tabRect(i), on = d.tab === t; img(ctx, on ? 'dex_tab_on' : 'dex_tab', r.x - (on ? 1 : 0), r.y - (on ? 3 : 0), r.w + (on ? 2 : 0)); });
  img(ctx, 'dex_book', BX, BY(), BW, bh);
  TABS.forEach((t, i) => { const r = tabRect(i), on = d.tab === t; label(ctx, t === 'R' ? '옛' : t ? String(t) : '공', r.x + r.w / 2, r.y + 6.5 - (on ? 2 : 0), 8.5, on ? '#5a3a1e' : '#8a7458', 'center', 700, null); });

  const list = listOf(d.tab), pages = Math.max(1, Math.ceil(list.length / PER)), got = list.filter((c) => known(g, c)).length;
  label(ctx, d.tab === 'R' ? '오래된 물건' : d.tab ? `${d.tab}. ${REGIONS[d.tab]}` : '어느 바다에나 사는 물고기', GX + 1, BY() + 34, 10.5, '#5a3a1e', 'left', 700, null);
  label(ctx, `${got} / ${list.length}`, GX + GW - 1, BY() + 34, 9.5, '#8a6a48', 'right', 600, null);     // 가름끈에 가리지 않는 자리
  const shown = list.slice(d.page * PER, d.page * PER + PER), pageA = clamp(d.t / 0.2, 0, 1);
  ctx.globalAlpha = a * (0.3 + 0.7 * pageA);
  shown.forEach((c, i) => {
    const r = slotRect(i), ok = known(g, c), sel = d.sel === c;
    img(ctx, sel ? 'dex_slot_on' : ok ? 'dex_slot' : 'dex_slot_off', r.x, r.y, r.w, r.h);
    if (ok && c.mem) { const rs = sprite('relic_' + c.art), k = Math.min((r.w - 10) / rs.w, (r.h - 10) / rs.h); ctx.drawImage(rs.img, r.x + r.w / 2 - rs.w * k / 2, r.y + r.h / 2 - rs.h * k / 2, rs.w * k, rs.h * k); }
    else if (ok) { creature(ctx, 'd_' + c[1], r.x + r.w / 2, r.y + r.h / 2, r.w - 11, r.h - 11); img(ctx, 'dex_fr_' + (GI[c[2]] + 1), r.x + 1, r.y + 1, r.w - 2, r.h - 2); }
    else label(ctx, '?', r.x + r.w / 2, r.y + r.h / 2 + 1, 13, 'rgba(90,70,50,0.55)', 'center', 700, null);
  });
  ctx.globalAlpha = a;
  if (pages > 1) {
    for (const dir of [-1, 1]) { const r = arrowRect(dir), off = (dir < 0 && d.page === 0) || (dir > 0 && d.page === pages - 1); ctx.globalAlpha = a * (off ? 0.3 : 1); img(ctx, dir < 0 ? 'dex_prev' : 'dex_next', r.x, r.y, r.w, r.h); }
    ctx.globalAlpha = a; label(ctx, `${d.page + 1} / ${pages}`, GX + GW / 2, arrowRect(1).y + 9, 9, '#8a6a48', 'center', 600, null);
  }

  // 오른쪽 쪽: 고른 생물
  const rx = RX(), rw = PW(), cx = rx + rw / 2, c = d.sel;
  if (!c) {
    const all = DOTS.filter((x) => known(g, x)).length;
    label(ctx, '도감', cx, BY() + 60, 16, '#5a3a1e', 'center', 700, null);
    label(ctx, `${all} / ${DOTS.length}`, cx, BY() + 86, 13, '#8a4a22', 'center', 700, null);
    label(ctx, '칸을 누르면 낚은 생물을 볼 수 있다', cx, BY() + 120, 9, '#8a7458', 'center', 600, null);
  } else if (c.mem) {
    // 오래된 물건: 마을 사람이 적은 한 줄, 떠오른 기억, 붙은 능력
    const ok = known(g, c), k = clamp((d.t - d.selT) / 0.22, 0, 1), e = 1 - Math.pow(1 - k, 3);
    ctx.globalAlpha = a * e;
    if (ok) {
      const rs = sprite('relic_' + c.art), kk = Math.min(rw * 0.42 / rs.w, 62 / rs.h);
      ctx.drawImage(rs.img, cx - rs.w * kk / 2, BY() + 76 - rs.h * kk / 2 + (1 - e) * 5, rs.w * kk, rs.h * kk);
      ctx.font = `600 8.5px ${FONT}`;
      let yy = BY() + 122;
      wrap(ctx, c.dex, rw - 14).forEach((ln) => { label(ctx, ln, cx, yy, 8.5, '#8a6a48', 'center', 600, null); yy += 11.5; });
      yy += 6; c.mem.forEach((ln) => { label(ctx, ln, cx, yy, 9.5, '#3b2c1e', 'center', 700, null); yy += 13; });
      yy += 6; ctx.font = `600 8.5px ${FONT}`; wrap(ctx, c.perk, rw - 14).forEach((ln) => { label(ctx, ln, cx, yy, 8.5, '#8a4a22', 'center', 700, null); yy += 11.5; });
    } else {
      label(ctx, '?', cx, BY() + 92, 44, 'rgba(90,70,50,0.4)', 'center', 700, null);
      label(ctx, '아직 찾지 못했다', cx, BY() + 142, 12, '#5a4630', 'center', 700, null);
      label(ctx, '환상의 생물을 놓아주면 무언가 남기고 간다', cx, BY() + 160, 8.5, '#8a6a48', 'center', 600, null);
    }
    ctx.globalAlpha = a;
  } else {
    const ok = known(g, c), gr = GRADES[GI[c[2]]], k = clamp((d.t - d.selT) / 0.22, 0, 1), e = 1 - Math.pow(1 - k, 3);
    ctx.globalAlpha = a * e;
    if (ok) {
      creature(ctx, 'd_' + c[1], cx, BY() + 88 + (1 - e) * 5, rw * 0.62, 78);
      label(ctx, c[0], cx, BY() + 142, 15, '#3b2c1e', 'center', 400, null, FONT2);
      label(ctx, `${gr.name} · 가장 큰 기록 ${g.records[c[0]].toFixed(1)} m`, cx, BY() + 160, 8.5, '#8a6a48', 'center', 600, null);
      ctx.font = `600 9px ${FONT}`;
      wrap(ctx, DEX_TEXT[c[1]] || '아직 아무도 이 생물에 대해 적지 않았다.', rw - 14).slice(0, 5).forEach((ln, i) => label(ctx, ln, cx, BY() + 180 + i * 12.5, 9, '#5a4630', 'center', 600, null));
    } else {
      label(ctx, '?', cx, BY() + 92, 44, 'rgba(90,70,50,0.4)', 'center', 700, null);
      label(ctx, '아직 낚지 못했다', cx, BY() + 142, 12, '#5a4630', 'center', 700, null);
      label(ctx, `${gr.name} 등급 · ${c[3] ? REGIONS[c[3]] : '모든 바다'}`, cx, BY() + 160, 9, '#8a6a48', 'center', 600, null);
    }
    ctx.globalAlpha = a;
  }
  ctx.translate(0, -(by - BY()));
  img(ctx, 'h_close', CLOSE.x - CLOSE.r, CLOSE.y - CLOSE.r, CLOSE.r * 2, CLOSE.r * 2);
  ctx.restore();
}

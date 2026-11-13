// 해역 지도와 도감. 화면에 보이는 것은 GPT 그림(해도, 표식, 책, 칸)과 글자뿐이고, 코드는 놓고·넘기고·글자를 얹는다.
import { W, H, GRADES } from './config.js';
import { sprite, hasSprite, preloadCreature } from './assets.js';
import { REGIONS } from './creatures.js';
import { DOTS } from './dots.js';
import { maxRegion } from './economy.js';
import { dexStage, dexCount, topRegion } from './goals.js';
import { PRIMAL, PRIMAL_TEXT, spriteOf } from './primal.js';
import { startTalk } from './story.js';
import { DEX_TEXT } from './dexText.js';
import { tr } from './i18n.js';
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
  str = tr(str);      // 영어일 때는 옮긴 글을 줄바꿈한다
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
  if (g.map && fade(g.map, dt)) { const first = g.map.reveal != null; g.map = null; if (first) startTalk(g, 'primal'); }      // 태초의 바다가 처음 떠오른 해도를 덮으면 길드장이 한마디 한다
  if (g.dex && fade(g.dex, dt)) g.dex = null;
}

// ── 해역 지도: 표식을 눌러 그 바다로 간다 ──
// 해도 그림의 항로 위에 찍힌 점 8개의 자리 (그림에서 잰 값. 점은 해역 그림마다 한가운데에 있다). 표식의 뾰족한 끝이 그 점을 가리킨다.
const DOTS_XY = [null, [81.1, 190.8], [159.8, 189.9], [225.6, 191.9], [301.2, 190.3], [370, 190.3], [444.2, 190.6], [513.3, 190.8], [589.1, 190], [80, 297]];      // 9 = 태초의 바다: 왼쪽 아래 구름 속, 처음 떠난 항구 바로 곁 (가장 먼 곳이 아니라 출발점 옆에 있었다)
const HARBOR_XY = [63, 187];      // 해도 그림의 부두 끝 (항로가 시작하는 곳): 태초의 바다로 가는 항로가 여기서 갈라진다
const PIN_W = 30;
const MCLOSE = { x: W - 46, y: H - 48 };      // 해도의 나침반을 가리지 않게 오른쪽 아래에
export function openMap(g) { g.map = { a: 0, t: 0, closing: null, note: null }; g.sfx.push(['paper']); }
// 누른 결과: 갈 해역 번호(이동은 부른 쪽에서), 없으면 null
export function tapMap(g, x, y, fromHarbor = false) {
  const m = g.map; if (!m || m.closing != null) return null;
  if (Math.hypot(x - MCLOSE.x, y - MCLOSE.y) < 19) { m.closing = 0; g.sfx.push(['paper']); return null; }
  for (let r = 1; r <= (g.primal ? 9 : 8); r++) {
    const [dx, dy] = DOTS_XY[r];
    if (Math.abs(x - dx) < 30 && y > dy - 50 && y < dy + 34) {      // 표식·점·이름 어디를 눌러도
      if (r > topRegion(g)) { m.note = `${REGIONS[r]} · 조선소에서 배를 ${Math.min(8, r)}단계로 키워야 갈 수 있다`; m.noteT = m.t; g.sfx.push(['deny']); return null; }
      if (r === g.region && !fromHarbor) { m.note = `${REGIONS[r]} · 지금 있는 바다`; m.noteT = m.t; g.sfx.push(['tap']); return null; }
      m.closing = 0; return r;
    }
  }
  return null;
}
export function drawMap(ctx, g) {
  const m = g.map; if (!m) return;
  const a = ease(m.a), top = topRegion(g);
  ctx.save(); ctx.globalAlpha = a;
  img(ctx, 'ui_map', 0, (1 - a) * 8, W, H);
  for (let r = 1; r <= (g.primal ? 9 : 8); r++) {
    const open = r <= top, here = r === g.region, s = sprite(!open ? 'map_lock' : hasSprite('map_pin_' + r) ? 'map_pin_' + r : 'map_pin_1'), [dx, dy] = DOTS_XY[r];
    const rv = r === 9 && m.reveal != null ? ease(clamp((m.t - 1.7) / 1.4, 0, 1)) : 1;      // 처음 열릴 때: 항로가 그어진 뒤 구름 속에서 표식이 서서히 떠오른다
    if (rv <= 0) continue;
    if (r === 9) {                                          // 1번 해역에서 이어지는 점선 항로와 끝점 (해도에 그려진 항로와 같은 모양으로). 처음 열릴 때는 항구 쪽에서부터 그어진다
      const [x0, y0] = HARBOR_XY, qx = 12, qy = 250, n = 40,      /* 1번 해역 이름표를 지나지 않게 왼쪽 바닷가로 돌아 내려온다 */ k = m.reveal != null ? ease(clamp((m.t - 0.4) / 1.6, 0, 1)) : 1;
      const at = (u) => [(1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * qx + u * u * dx, (1 - u) * (1 - u) * (y0 + 3) + 2 * (1 - u) * u * qy + u * u * dy];
      ctx.save(); ctx.globalAlpha = a; ctx.lineCap = 'round'; ctx.setLineDash([2.6, 3.4]);
      for (const [col, lw] of [['rgba(60,40,24,0.35)', 2.4], ['#fff8e6', 1.3]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); for (let i = 0; i <= Math.round(n * k); i++) { const [px, py] = at(i / n); if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py); } ctx.stroke(); }
      ctx.restore();
    }
    // 태초의 바다의 점은 해도 그림에 없다 (열린 뒤에만 보인다): 해도에 찍힌 점과 같은 모양으로 찍는다
    ctx.save(); ctx.globalAlpha = r === 9 ? a * rv : 0;
    ctx.fillStyle = 'rgba(60,40,24,0.5)'; ctx.beginPath(); ctx.arc(dx, dy, 3.1, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#fff8e6'; ctx.beginPath(); ctx.arc(dx, dy, 2.2, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.save(); ctx.globalAlpha = a * rv; ctx.translate(0, (1 - rv) * 6);
    const w = PIN_W * (here ? 1.12 : 1), h = w * s.h / s.w, bob = here ? Math.sin(m.t * 2.6) * 1.5 : 0, tip = dy - 3;      // 뾰족한 끝이 점 바로 위에
    if (here) { const rg = sprite('map_ring'), rw = w * 1.02; ctx.drawImage(rg.img, dx - rw / 2, tip - h + bob - (rw * rg.h / rg.w - w * 0.96) / 2 - 1, rw, rw * rg.h / rg.w); }
    ctx.globalAlpha = a * rv * (open ? 1 : 0.9);
    ctx.drawImage(s.img, dx - w / 2, tip - h + bob, w, h);
    ctx.globalAlpha = a * rv;
    if (here) { const b = sprite('map_boat'), bw = 24; ctx.drawImage(b.img, dx - bw / 2, dy + 5 + Math.sin(m.t * 2) * 1, bw, bw * b.h / b.w); }      // 지금 있는 바다: 점 아래에 내 배
    label(ctx, REGIONS[r], dx, dy + (here ? 27 : 13), 7.5, open ? '#fff4dc' : 'rgba(255,244,220,0.7)', 'center', here ? 700 : 600);
    ctx.restore();
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
// 책 그림: 꼬리표가 책장 사이에 그려진 새 그림이 있으면 그것을 쓴다 (태초의 바다가 열리면 열째 꼬리표까지 있는 그림으로 바뀐다)
let BOOK = 'dex_book';
const pickBook = (g) => { BOOK = hasSprite('dex_book2') ? (g.primal && hasSprite('dex_book2b') ? 'dex_book2b' : 'dex_book2') : 'dex_book'; };
const PAINTED = () => BOOK !== 'dex_book';
const bookH = () => BW * sprite(BOOK).h / sprite(BOOK).w, BY = () => (H - bookH()) / 2 + 4;
const TABS0 = [1, 2, 3, 4, 5, 6, 7, 8, 0, 'R'], TABS1 = [1, 2, 3, 4, 5, 6, 7, 8, 0, 9, 'R']; let TABS = TABS0;      // 태초의 바다가 열리면 쪽지가 하나 는다            // 0 = 모든 해역 공용(평범한 물고기), 'R' = 오래된 물건
const COLS = 5, ROWS = 4, PER = COLS * ROWS, SLOT = 33, GAP = 4;
const GX = 84, GW = COLS * SLOT + (COLS - 1) * GAP;        // 칸들의 왼쪽 끝과 폭: 오른쪽의 가름끈(책갈피)에 닿지 않는 자리까지만
const LX = () => BX + BW * 0.135, RX = () => BX + BW * 0.53, PW = () => BW * 0.34;      // 왼쪽·오른쪽 쪽의 안쪽 자리와 폭
const gridY = () => BY() + 53;
const listOf = (tab) => tab === 'R' ? RELICS : tab === 9 ? PRIMAL : DOTS.filter((d) => d[3] === tab).sort((p, q) => GI[p[2]] - GI[q[2]]);
const known = (g, d) => d.mem ? RELICS.indexOf(d) < (g.relics || 0) : g.records[d[0]] != null;
// 해역을 고르는 인덱스 스티커: 오른쪽 쪽의 종이 가장자리에 세로로 한 줄 (공책에 붙이는 색 인덱스처럼 옆으로 삐져나온다).
// 위에서부터 1~8, 공(온 바다의 물고기), 태(태초의 바다), 옛(오래된 물건). 해역마다 색이 다르다.
// '태'의 자리는 처음부터 비워 둔다: 태초의 바다가 열리기 전에는 '공'과 '옛' 사이가 한 칸 비어 있어, 뭔가 더 있을 것처럼 보인다.
const TAB_SLOT = (t) => (t === 'R' ? 10 : t === 9 ? 9 : t === 0 ? 8 : t - 1);      // 스티커가 붙는 자리 (0~10)
// 진짜 인덱스처럼 뒤 번호일수록 더 뒤쪽 장에 붙어 있다: 한 칸 내려갈 때마다 종이 한 묶음만큼 오른쪽으로 물러나고(책 그림의 종이 단면이 566~580),
// 앞 장에 덮여 붙은 쪽은 가려지고, 조금씩 어두워진다. 맨 앞 장(1)의 것만 붙은 쪽까지 다 보인다.
const IDX = { x: 565.5, w: 47, y0: 31, pitch: 23.1, h: 19.5, step: 1.9, glue: 13 };      // glue: 스티커 그림에서 종이에 붙는 쪽의 폭 (그림의 왼쪽 28%).      // step: 책 그림의 종이 단면(일곱 겹, x 566~587)에 열한 장을 고루 나눈 간격 → 스티커마다 다른 장 사이에서 나온다      // 종이 가장자리에 걸쳐 붙는다. 세로는 책 종이의 위~아래
// 스티커는 책장 사이에서 나온다: k번째 것은 종이 단면의 k번째 장 자리(edge)에서 밖으로 나오고, 그 안쪽(붙은 쪽 12)은 앞 장들에 덮여 안 보인다
const tabEdge = (k) => IDX.x + 1 + k * IDX.step;
// 책 그림에 그려진 꼬리표 열한 개의 자리 (그림에서 잰 값. 책 그림의 왼쪽 위에서부터): [오른쪽 끝 x, 위 y, 높이]. 보이는 폭은 26쯤
const TAB_ART = [[582.5, 55.6, 15.2], [583.6, 73.1, 16], [585.9, 92.1, 16.8], [589, 112.7, 16.4], [592.4, 131.7, 16.8], [596.2, 152.3, 16.4], [596.2, 171.7, 16.8], [597.3, 192.3, 17.1], [596.2, 213.2, 17.5], [596.6, 234.5, 18.7], [597, 255.1, 17.1]];
const tabRect = (i) => { const k = TAB_SLOT(TABS[i]);
  if (PAINTED()) { const [xr, y, h] = TAB_ART[k]; return { x: BX + xr - 26, y: BY() + y, w: 26, h, k }; }
  return { x: tabEdge(k) - IDX.glue, y: BY() + IDX.y0 + k * IDX.pitch, w: IDX.w, h: IDX.h, k }; };
const tabHit = (x, y, r) => (PAINTED() ? x >= r.x - 8 && y >= r.y - 1.6 && y < r.y + r.h + 1.6      /* 그려진 꼬리표는 작아서, 누르는 자리는 화면 오른쪽 끝까지 넓힌다 */
  : x >= r.x - 6 && x <= r.x + r.w + 10 && y >= r.y - (IDX.pitch - IDX.h) / 2 && y < r.y + r.h + (IDX.pitch - IDX.h) / 2);      // 스티커 사이의 틈도 가까운 쪽이 받는다
const tabKey = (t) => 'dex_idx_' + t;
// 손으로 붙인 것처럼 조금씩 삐뚤다: 자리마다 정해진 기울기(도)·위아래 어긋남·나온 길이. (늘 같은 모양이라 볼 때마다 달라지지 않는다)
const TAB_SKEW = [[-1.6, 0.4, 0.6], [2.2, -0.7, -1.2], [-0.8, 0.9, 1.4], [1.3, -0.3, -0.5], [-2.4, 0.6, 0.9], [0.7, -1.0, -1.5], [2.6, 0.3, 0.4], [-1.2, -0.6, 1.1], [1.8, 0.8, -0.9], [-2.0, -0.4, 0.7], [1.1, 0.5, -0.6]];
const slotRect = (i) => ({ x: GX + (i % COLS) * (SLOT + GAP), y: gridY() + Math.floor(i / COLS) * (SLOT + GAP), w: SLOT, h: SLOT });
const arrowRect = (dir) => ({ x: GX + GW / 2 + dir * 46 - 9, y: gridY() + ROWS * (SLOT + GAP) + 3, w: 18, h: 18 });
function loadPage(g) { const d = g.dex, list = listOf(d.tab).slice(d.page * PER, d.page * PER + PER); if (d.tab !== 'R') preloadCreature(...list.filter((c) => known(g, c)).map((c) => spriteOf(c))); }
export function openDex(g) { pickBook(g); TABS = g.primal ? TABS1 : TABS0; g.dex = { a: 0, t: 0, closing: null, tab: g.region, page: 0, sel: null, selT: 0 }; loadPage(g); g.sfx.push(['paper']); }
const inRect = (x, y, r, pad = 0) => x >= r.x - pad && x <= r.x + r.w + pad && y >= r.y - pad && y <= r.y + r.h + pad;
export function tapDex(g, x, y) {
  const d = g.dex; if (!d || d.closing != null) return;
  if (hitClose(x, y)) { d.closing = 0; g.sfx.push(['paper']); return; }
  for (let i = 0; i < TABS.length; i++) if (tabHit(x, y, tabRect(i))) { if (d.tab !== TABS[i]) { d.tab = TABS[i]; d.page = 0; d.sel = null; d.t = 0; loadPage(g); g.sfx.push(['paper']); } return; }
  const list = listOf(d.tab), pages = Math.ceil(list.length / PER);
  for (const dir of [-1, 1]) if (inRect(x, y, arrowRect(dir), 5)) { const p = clamp(d.page + dir, 0, pages - 1); if (p !== d.page) { d.page = p; d.t = 0; loadPage(g); g.sfx.push(['paper']); } return; }
  const shown = list.slice(d.page * PER, d.page * PER + PER);
  for (let i = 0; i < shown.length; i++) if (inRect(x, y, slotRect(i), 2)) { d.sel = shown[i]; d.selT = d.t; g.sfx.push(['tap']); return; }
}
function creature(ctx, name, cx, cy, maxW, maxH) {
  if (!hasSprite(name)) return;
  const s = sprite(name), k = Math.min(maxW / s.w, maxH / s.h);
  ctx.imageSmoothingEnabled = !!s.smooth;      // 도트 생물은 또렷하게, 붓 그림(태초의 생물)은 부드럽게
  ctx.drawImage(s.img, cx - s.w * k / 2, cy - s.h * k / 2, s.w * k, s.h * k);
  ctx.imageSmoothingEnabled = true;
}
export function drawDex(ctx, g) {
  const d = g.dex; if (!d) return;
  const a = ease(d.a), by = BY() + (1 - a) * 10, bh = bookH();
  ctx.save(); ctx.globalAlpha = a * 0.55; ctx.fillStyle = '#0c1630'; ctx.fillRect(0, 0, W, H);     // 뒤 화면을 살짝 가라앉힌다
  ctx.globalAlpha = a; ctx.translate(0, by - BY());
  if (PAINTED()) {
    img(ctx, BOOK, BX, BY(), BW, bh);
    // 꼬리표는 책 그림에 그려져 있다. 고른 것은 그 조각을 밖으로 조금 당겨 밝게 겹쳐 그리고, 다 채운 해역의 것은 금빛으로 물들인다. 글자만 쓴다
    const sp = sprite(BOOK), kx = sp.img.width / BW;
    TABS.forEach((t, i) => { const r = tabRect(i), on = d.tab === t, gold = t !== 'R' && dexStage(g, t) === 2;
      if (on || gold) { const px = 3, sx = (r.x - BX - 1) * kx, sy = (r.y - BY() - 1.5) * kx, sw = (r.w + 3) * kx, sh = (r.h + 3) * kx;
        ctx.save(); ctx.imageSmoothingEnabled = true; ctx.filter = (gold ? 'sepia(1) saturate(2.6) ' : '') + `brightness(${on ? 1.13 : 1.04})`;
        ctx.drawImage(sp.img, sx, sy, sw, sh, r.x - 1 + (on ? px : 0), r.y - 1.5, r.w + 3, r.h + 3); ctx.restore(); }
      label(ctx, t === 'R' ? '옛' : t === 9 ? '태' : t ? String(t) : '공', r.x + r.w - 9 + (on ? 3 : 0), r.y + r.h / 2 + 0.3, 9, on ? '#2e1c0a' : '#4a3520', 'center', 700, null); });
  } else {
  img(ctx, 'dex_book', BX, BY(), BW, bh);
  // 인덱스 스티커: 뒤쪽 장의 것부터 그린다 (앞 장의 것이 위에 온다). 고른 것은 옆으로 조금 더 나오고 또렷하다. 다 채운 해역의 것은 금빛으로 물든다
  TABS.map((t, i) => [t, tabRect(i)]).sort((p, q) => q[1].k - p[1].k).forEach(([t, r]) => { const on = d.tab === t, out = on ? 4 : 0;
    const dim = on ? 1 : 1 - r.k * 0.016, gold = t !== 'R' && dexStage(g, t) === 2;
    ctx.save(); ctx.imageSmoothingEnabled = true; ctx.globalAlpha = a * (on ? 1 : 0.94);
    ctx.beginPath(); ctx.rect(tabEdge(r.k), r.y - 4, 80, r.h + 8); ctx.clip();      // 앞 장들에 덮인 쪽(붙은 쪽)은 보이지 않는다: 책장 사이에서 나온 것처럼
    ctx.filter = (gold ? 'sepia(1) saturate(2.6) ' : 'sepia(0.38) saturate(1.15) ') + `brightness(${(gold ? 1.06 : 0.95) * dim})`;      // 새 스티커의 맑은 색을 낡은 양피지 빛에 맞춰 누렇게 바랜 느낌으로
    const [deg, dy, dx] = TAB_SKEW[r.k], cx = r.x + out + dx + r.w / 2, cy = r.y + dy + r.h / 2;
    ctx.translate(cx, cy); ctx.rotate(deg * Math.PI / 180);
    if (hasSprite(tabKey(t))) { const sp = sprite(tabKey(t)); ctx.drawImage(sp.img, -r.w / 2, -r.h / 2, r.w, r.h); }
    else { const sp = sprite(on ? 'dex_tab_on' : 'dex_tab'); ctx.rotate(Math.PI / 2); ctx.drawImage(sp.img, -r.h / 2, -r.w / 2, r.h, r.w); ctx.rotate(-Math.PI / 2); }      // 제 그림이 오기 전: 옛 쪽지 그림을 옆으로 눕혀 쓴다
    ctx.filter = 'none'; ctx.globalAlpha = a;
    label(ctx, t === 'R' ? '옛' : t === 9 ? '태' : t ? String(t) : '공', IDX.w * 0.14, 0.5, 10.5, on ? '#4a2f14' : '#6b5238', 'center', 700, null);      // 글자도 스티커와 같이 기운다
    ctx.restore(); });

  }
  const list = listOf(d.tab), pages = Math.max(1, Math.ceil(list.length / PER)), got = list.filter((c) => known(g, c)).length;
  label(ctx, d.tab === 'R' ? '오래된 물건' : d.tab === 9 ? REGIONS[9] : d.tab ? `${d.tab}. ${REGIONS[d.tab]}` : '온 바다의 물고기', GX + 1, BY() + 38.5, 10.5, '#5a3a1e', 'left', 700, null);
  if (d.tab === 'R') label(ctx, `${got} / ${list.length}`, GX + GW - 1, BY() + 38.5, 9.5, '#8a6a48', 'right', 600, null);     // 가름끈에 가리지 않는 자리
  else {                                                 // 도감 보상: 절반을 채우면 그 해역 생물의 파는 값 +5%, 다 채우면 +10%. 환상종은 세지 않는다 (운에 달려 있어서)
    const st = dexStage(g, d.tab), [n, t] = dexCount(g, d.tab);
    label(ctx, `${n} / ${t}` + (st ? ` · 값 +${st === 2 ? 10 : 5}%` : ''), GX + GW - 1, BY() + 38.5, 9.5, st ? '#b0641c' : '#8a6a48', 'right', 600, null);
  }
  const shown = list.slice(d.page * PER, d.page * PER + PER), pageA = clamp(d.t / 0.2, 0, 1);
  ctx.globalAlpha = a * (0.3 + 0.7 * pageA);
  shown.forEach((c, i) => {
    const r = slotRect(i), ok = known(g, c), sel = d.sel === c;
    img(ctx, sel ? 'dex_slot_on' : ok ? 'dex_slot' : 'dex_slot_off', r.x, r.y, r.w, r.h);
    if (ok && c.mem) { const rs = sprite('relic_' + c.art), k = Math.min((r.w - 10) / rs.w, (r.h - 10) / rs.h); ctx.drawImage(rs.img, r.x + r.w / 2 - rs.w * k / 2, r.y + r.h / 2 - rs.h * k / 2, rs.w * k, rs.h * k); }
    else if (ok) { creature(ctx, spriteOf(c), r.x + r.w / 2, r.y + r.h / 2, r.w - 11, r.h - 11); img(ctx, c[3] === 9 ? (hasSprite('dex_fr_7') ? 'dex_fr_7' : 'dex_fr_1') : 'dex_fr_' + (GI[c[2]] + 1), r.x + 1,      /* 태초의 생물은 등급이 하나라 테두리도 모두 같다 */ r.y + 1, r.w - 2, r.h - 2); }
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
    const pool = g.primal ? DOTS.concat(PRIMAL) : DOTS, all = pool.filter((x) => known(g, x)).length;      // 태초의 바다가 열린 뒤에는 그 생물까지 센다
    label(ctx, '도감', cx, BY() + 60, 16, '#5a3a1e', 'center', 700, null);
    label(ctx, `${all} / ${pool.length}`, cx, BY() + 86, 13, '#8a4a22', 'center', 700, null);
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
    const ok = known(g, c), gr = c[3] === 9 ? { name: '태초' } : GRADES[GI[c[2]]],      /* 태초의 바다의 생물은 등급이 하나뿐이다: 태초 */  k = clamp((d.t - d.selT) / 0.22, 0, 1), e = 1 - Math.pow(1 - k, 3);
    ctx.globalAlpha = a * e;
    if (ok) {
      creature(ctx, spriteOf(c), cx, BY() + 88 + (1 - e) * 5, rw * 0.62, 78);
      label(ctx, c[0], cx, BY() + 142, 15, '#3b2c1e', 'center', 400, null, FONT2);
      label(ctx, `${gr.name} · 가장 큰 기록 ${g.records[c[0]].toFixed(1)} m`, cx, BY() + 160, 8.5, '#8a6a48', 'center', 600, null);
      ctx.font = `600 9px ${FONT}`;
      wrap(ctx, (c[3] === 9 ? PRIMAL_TEXT[c[1]] : DEX_TEXT[c[1]]) || '아직 아무도 이 생물에 대해 적지 않았다.', rw - 14).slice(0, 5).forEach((ln, i) => label(ctx, ln, cx, BY() + 180 + i * 12.5, 9, '#5a4630', 'center', 600, null));
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

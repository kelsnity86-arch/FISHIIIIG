// 화면 그리기. 목표 화면(assets/concept)의 구도와 레이어를 그대로 쌓는다.
// 보이는 것은 전부 GPT 그림이고, 코드는 움직이고·늘리고·색을 입힐 뿐이다. 예외: 낚싯줄과 글자.
//
// 레이어 (뒤 → 앞)
//   하늘·섬 / 먼 바다 띠 / 물 단면            ← 배경: 카메라가 물러나도 그대로
//   물속 빛살 / 그림자 / 생물의 물속 부분 / 공기방울 / 물속 낚싯줄
//   뒤쪽 파도 / 빛줄기 / 생물의 물 위 부분 / 배·낚시꾼·낚싯대 / 낚싯줄·찌
//   앞쪽 파도 / 물 폭발·몸부림 파도 / 물보라 조각
import { W, H, HORIZON, WL, DEEP, PHASES, COLORS, GRADES, DAY_SEC, DAY_PLAN } from './config.js';
import { sprite, hasSprite, creatureSprite, tinted } from './assets.js';
import { fmt } from './economy.js';
import { questLine, skinOn } from './goals.js';
import { drawHarbor, drawPanel, drawSeaButtons } from './harbor.js';
import { drawTalk, drawHint, drawSkip, drawMemory, drawTitle, drawSound } from './story.js';
import { drawMap, drawDex } from './book.js';
import { boatPose, rodPose, surfaceY, mouthPos, leapMouth, leapHeight } from './game.js';

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const easeOut = (k) => 1 - Math.pow(1 - k, 3);
const FONT = '"Hahmlet", system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';     // 낚기 전: 차분한 명조
const FONT2 = '"Jua", system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';        // 낚은 뒤: 통통한 글씨
const CAM_X = W * 0.82;      // 카메라가 물러날 때의 기준점 = 배의 자리 (수면선 위)
const easeOutBack = (k) => { const c = 1.70158; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };

function draw(ctx, spr, x, y, w = spr.w, h = spr.h) {
  ctx.imageSmoothingEnabled = spr.smooth;
  ctx.drawImage(spr.img, x, y, w, h);
}

// 그림 1장을 세로 조각으로 나눠 휘게 그린다. 원점 = 그림 중심, 머리는 왼쪽.
//   amp   : 꼬리 쪽일수록 커지는 헤엄 물결
//   curve : 몸 전체가 C자로 휘는 정도(돌아설 때)
//   shake : 머리 털기
function drawBendy(ctx, spr, len, phase, amp, curve = 0, shake = 0, time = 0) {
  const n = Math.round(clamp(len / 5, 32, 220)), hgt = len * spr.h / spr.w;   // 크게 그릴수록 조각을 잘게 (계단 방지)
  const sw = spr.img.width / n, dw = len / n;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  for (let i = 0; i < n; i++) {
    const k = i / (n - 1);
    let off = Math.sin(phase - k * 4.2) * amp * (0.15 + k * 0.85);
    off += curve * (k - 0.35) * (k - 0.35) * 2;
    off += shake * Math.sin(time * 16) * len * 0.05 * (1 - k) * (1 - k);
    ctx.drawImage(spr.img, i * sw, 0, sw + 0.5, spr.img.height, -len / 2 + i * dw, -hgt / 2 + off, dw + 0.6, hgt);
  }
}

// 틀 그림을 모서리는 그대로, 가운데만 늘려서 그린다 (패널·게이지)
function draw9(ctx, spr, x, y, w, h, edge = 0.28) {
  const iw = spr.img.width, ih = spr.img.height;
  const sx = iw * edge, sy = ih * edge;
  const dx = Math.min(w / 2, spr.w * edge), dy = Math.min(h / 2, spr.h * edge);
  const cols = [[0, sx, x, dx], [sx, iw - 2 * sx, x + dx, w - 2 * dx], [iw - sx, sx, x + w - dx, dx]];
  const rows = [[0, sy, y, dy], [sy, ih - 2 * sy, y + dy, h - 2 * dy], [ih - sy, sy, y + h - dy, dy]];
  ctx.imageSmoothingEnabled = spr.smooth;
  for (const [sx0, sw0, dx0, dw0] of cols) for (const [sy0, sh0, dy0, dh0] of rows) {
    if (dw0 > 0 && dh0 > 0) ctx.drawImage(spr.img, sx0, sy0, sw0, sh0, dx0, dy0, dw0 + 0.3, dh0 + 0.3);
  }
}

function lineColor(t) {
  const mix = (a, b, k) => a.map((v, i) => Math.round(lerp(v, b[i], clamp(k, 0, 1))));
  let c = COLORS.lineSafe;
  if (t > 0.55) c = mix(COLORS.lineSafe, COLORS.lineWarn, (t - 0.55) / 0.2);
  if (t > 0.8) c = mix(COLORS.lineWarn, COLORS.lineDanger, (t - 0.8) / 0.15);
  return c;
}

function drawEmote(ctx, g) {
  if (!g.emote) return;
  const e = g.emote, pop = Math.min(1, e.age / 0.12);
  const s = (0.6 + 0.4 * pop) * (1 + Math.max(0, 0.15 - e.age) * 2);
  const b = boatPose(g);
  const spr = sprite({ bang: 'fx_bang', sweat: 'fx_sweat', tear: 'fx_tear' }[e.icon]);
  const w = 14 * s, h = w * spr.h / spr.w;
  ctx.globalAlpha = clamp((1.1 - e.age) / 0.25, 0, 1);
  draw(ctx, spr, b.x + 5 - w / 2, b.y - 26 - pop * 3 - h, w, h);
  ctx.globalAlpha = 1;
}

function text(ctx, str, x, y, size, color, align = 'center', weight = 700) {
  ctx.font = `${weight} ${size}px ${FONT}`;
  ctx.textAlign = align; ctx.textBaseline = 'middle';
  ctx.lineWidth = Math.max(1.6, size * 0.17); ctx.lineJoin = 'round';
  ctx.strokeStyle = 'rgba(16,28,56,0.72)'; ctx.strokeText(str, x, y);
  ctx.fillStyle = color; ctx.fillText(str, x, y);
}

// "낚았다!" — 문구는 고정, 등급이 높을수록 글자 연출이 화려해진다
// "낚았다!" — 등급별 현판 그림. 톡 튀어나와 자리를 잡고, 높은 등급일수록 크고 들썩인다.
function drawCatchText(ctx, g) {
  const fx = g.catchFx;
  if (!fx) return;
  const gi = g.fish && g.fish.fixedSize ? 2 : fx.gi, spr = sprite('ui_caught_' + (gi + 1)), t = performance.now() / 1000;      // 태초의 생물은 등급이 하나라 '낚았다!' 글자도 하나(물결)로 같다
  const w = [150, 162, 176, 190, 208, 232][gi], h = w * spr.h / spr.w;
  const gone = fx.out != null ? clamp(fx.out / 0.25, 0, 1) : 0;
  const pop = easeOutBack(Math.min(1, fx.age / 0.32)) * (1 - 0.25 * gone);
  const sway = gi >= 3 ? Math.sin(t * 5) * 0.035 : gi >= 1 ? Math.sin(t * 3) * 0.015 : 0;
  const bob = gi >= 4 ? Math.sin(t * 4) * 2.5 : 0;
  ctx.save();
  ctx.globalAlpha = 1 - gone;
  ctx.translate(W * 0.6, H - 70 + bob + gone * 8); ctx.rotate(sway + (1 - Math.min(1, fx.age / 0.32)) * -0.25); ctx.scale(pop, pop);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(spr.img, -w / 2, -h / 2, w, h);
  ctx.restore();
}
function drawCoins(ctx, g) {
  const spr = sprite('icon_gold');
  for (const c of g.coins) {
    if (c.age < 0) continue;
    const k = c.age / c.life, e = k * k;
    const mx = c.sx - 70, my = c.sy - 90;
    const x = (1 - e) * (1 - e) * c.sx + 2 * (1 - e) * e * mx + e * e * 16;
    const y = (1 - e) * (1 - e) * c.sy + 2 * (1 - e) * e * my + e * e * 16;
    draw(ctx, spr, x - 6, y - 6, 12, 12);
  }
}

// 결과 카드: 등급별 틀 그림. 틀마다 창과 글자 칸의 자리가 달라서, 그림에서 잰 자리(폭·높이 대비 [왼, 위, 오른, 아래])에 맞춘다.
const CARD = [
  { win: [0.104, 0.136, 0.9, 0.589], name: [0.117, 0.642, 0.887, 0.735], stat: [0.121, 0.764, 0.887, 0.861] },
  { win: [0.095, 0.186, 0.907, 0.623], name: [0.12, 0.673, 0.886, 0.764], stat: [0.12, 0.786, 0.886, 0.877] },
  { win: [0.091, 0.239, 0.911, 0.622], name: [0.112, 0.67, 0.89, 0.757], stat: [0.112, 0.783, 0.89, 0.87] },
  { win: [0.108, 0.145, 0.898, 0.602], name: [0.116, 0.655, 0.89, 0.752], stat: [0.121, 0.781, 0.886, 0.877] },
  { win: [0.091, 0.2, 0.909, 0.608], name: [0.12, 0.656, 0.884, 0.745], stat: [0.12, 0.772, 0.884, 0.86] },
  { win: [0.108, 0.23, 0.892, 0.617], name: [0.132, 0.664, 0.872, 0.749], stat: [0.136, 0.774, 0.868, 0.86] },
];
// 태초 등급의 카드 틀 (tools/slice_primal.py 가 잰 값)
const CARD7 = { win: [0.1, 0.147, 0.9, 0.621], name: [0.143, 0.667, 0.857, 0.749], stat: [0.135, 0.777, 0.831, 0.865] };
// 글자를 칸 한가운데에 놓는다. 칸보다 길면 글자를 줄인다.
function fitText(ctx, str, box, size, font, weight, color) {
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';     // 재기 전에 기준선부터: 기준선이 다르면 잰 높이가 틀어진다
  ctx.font = `${weight} ${size}px ${font}`;
  const w = ctx.measureText(str).width, max = (box[2] - box[0]) * 0.9;
  if (w > max) ctx.font = `${weight} ${size * max / w}px ${font}`;
  const mt = ctx.measureText(/[가-힣]/.test(str) ? '가힣' : '0G'), asc = mt.actualBoundingBoxAscent, desc = mt.actualBoundingBoxDescent;
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = color;
  ctx.fillText(str, (box[0] + box[2]) / 2, (box[1] + box[3]) / 2 + (asc - desc) / 2);     // 실제 글자 높이의 가운데를 칸의 가운데에
}
function drawResultCard(ctx, g) {
  const f = g.fish, gi = GRADES.indexOf(f.gradeInfo), p7 = f.fixedSize && hasSprite('ui_card_7'), fr = sprite(p7 ? 'ui_card_7' : 'ui_card_' + (gi + 1)), L = p7 ? CARD7 : CARD[gi];      // 태초 등급의 카드 틀 (그림이 오기 전에는 원래 틀)
  const r = g.result, T = r.age || 0, gone = r.out != null ? clamp(r.out / 0.25, 0, 1) : 0;
  const k = clamp(T / 0.3, 0, 1), e = (1 - Math.pow(1 - k, 3)) * (1 - gone);
  const cw = 196, ch = cw * fr.h / fr.w, cx = 10, cy = H - ch - 10 + (1 - e) * 26 + gone * 10;   // 왼쪽 아래: 생물과 배를 가리지 않는다
  const box = (b) => [cx + b[0] * cw, cy + b[1] * ch, cx + b[2] * cw, cy + b[3] * ch];
  ctx.save();
  ctx.globalAlpha = e;
  // 창 안: 옅은 양피지 바탕 위에 생물 (창보다 살짝 크게 깔아 틀 밑으로 들어가게)
  const wn = box(L.win), ww = wn[2] - wn[0], wh = wn[3] - wn[1];
  ctx.fillStyle = '#f3e3c2'; ctx.fillRect(wn[0] - 3, wn[1] - 3, ww + 6, wh + 6);
  const spr = sprite(f.sprite), fit = Math.min(ww * 0.78 / spr.w, wh * 0.78 / spr.h);
  ctx.imageSmoothingEnabled = !!spr.smooth;      // 도트 생물은 또렷하게, 붓 그림(태초의 생물)은 부드럽게
  ctx.drawImage(spr.img, (wn[0] + wn[2]) / 2 - spr.w * fit / 2, (wn[1] + wn[3]) / 2 - spr.h * fit / 2, spr.w * fit, spr.h * fit);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(fr.img, cx, cy, cw, ch);

  fitText(ctx, f.name, box(L.name), 12.5, FONT2, 400, COLORS.navy);
  // 숫자가 차르르 올라가며 측정된다
  const cu = clamp((T - 0.3) / 0.6, 0, 1), count = 1 - Math.pow(1 - cu, 3);
  fitText(ctx, f.isFantasy ? `${(f.meters * count).toFixed(1)} m · 놓아준다` : `${(f.meters * count).toFixed(1)} m · ${fmt(f.price * count)} G`, box(L.stat), 9, FONT, 600, '#5a4630');
  if (T > (g.catch && g.catch.quick ? 0.55 : 1.1) && !gone) text(ctx, f.isFantasy ? '눌러서 놓아주기' : '눌러서 계속', cx + cw + 8, H - 18, 10, 'rgba(255,244,220,0.92)', 'left', 600);

  // 첫 포획 / 신기록 도장: 크게 나타나 쾅 찍힌다
  if (r.stamped) {
    const age = T - 1.0, k2 = Math.min(1, age / 0.16);
    const sc = lerp(2.8, 1, 1 - Math.pow(1 - k2, 3));
    const st = sprite(r.isNew ? 'ui_stamp_new' : 'ui_stamp_record');
    ctx.save();
    ctx.globalAlpha = e * Math.min(1, k2 * 2);
    ctx.translate(wn[2] - 5, wn[1] + 4); ctx.rotate(-0.2); ctx.scale(sc, sc);     // 틀 모서리에 걸쳐 찍는다: 생물을 가리지 않게
    ctx.drawImage(st.img, -17, -17 * st.h / st.w, 34, 34 * st.h / st.w);
    ctx.restore();
  }
  ctx.restore();
}

export function render(ctx, g) {
  if (g.scene === 'harbor') {
    drawHarbor(ctx, g);
    drawTint(ctx, g);
    drawGold(ctx, g);
    drawPanel(ctx, g);
    drawMsg(ctx, g);
    drawCoins(ctx, g);
    drawSound(ctx, g);
    drawMap(ctx, g); drawDex(ctx, g); drawHint(ctx, g); drawTalk(ctx, g); drawTitle(ctx, g);
    drawVeil(ctx, g);
    return;
  }
  renderSea(ctx, g);
  drawPanel(ctx, g);
  if (g.panel) { drawGold(ctx, g); drawMsg(ctx, g); drawCoins(ctx, g); }
  if (uiA > 0.5) { drawSkip(ctx, g); drawSound(ctx, g); }
  drawMap(ctx, g); drawDex(ctx, g); drawHint(ctx, g); drawTalk(ctx, g); drawMemory(ctx, g); drawTitle(ctx, g);
  drawVeil(ctx, g);
}
// 시간대의 빛: 화면 전체에 곱해지는 색. 시간대가 바뀌면 몇 초에 걸쳐 서서히 물든다.
const tintNow = [255, 255, 255]; let tintT = 0;
function drawTint(ctx, g) {
  const hex = PHASES[g.phase].tint, want = hex ? [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) : [255, 255, 255];
  const now = performance.now() / 1000, dt = Math.min(0.1, now - tintT); tintT = now;
  for (let i = 0; i < 3; i++) tintNow[i] += (want[i] - tintNow[i]) * (1 - Math.exp(-0.35 * dt));
  if (tintNow[0] + tintNow[1] + tintNow[2] > 762) return;
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = `rgb(${tintNow.map(Math.round).join(',')})`;
  ctx.fillRect(-20, -20, W + 40, H + 40);
  ctx.globalCompositeOperation = 'source-over';
}
function drawVeil(ctx, g) {
  if (g.veil > 0.01) { ctx.fillStyle = `rgba(12,22,46,${g.veil})`; ctx.fillRect(0, 0, W, H); }
}
// 골드 판 (바다·항구 공용)
function drawGold(ctx, g) {
  const pl = sprite('ui_plaque_gold'), pw = 92, ph = pw * pl.h / pl.w;
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(pl.img, 5, 4, pw, ph);
  ctx.font = `600 11px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffe9b8'; ctx.fillText(fmt(g.goldShown), 5 + pw * 0.62, 4 + ph / 2 + 0.5);
}
function drawMsg(ctx, g) {
  if (!g.msg || g.msg.age < 0) return;
  const k = g.msg.age / 1.4, y = g.msg.y || 100;
  let size = 18;
  ctx.font = `700 ${size}px ${FONT}`;
  const tw = ctx.measureText(g.msg.text).width;
  if (tw > W - 60) size = Math.max(11, size * (W - 60) / tw);        // 긴 글은 화면 안에 들어오게 줄인다
  ctx.globalAlpha = clamp(k * 8, 0, 1) * clamp((1 - k) * 3, 0, 1);
  text(ctx, g.msg.text, W / 2, y - k * 10, size, g.msg.color);
  ctx.globalAlpha = 1;
}
let uiA = 0;
function renderSea(ctx, g) {
  const phase = PHASES[g.phase];
  ctx.save();
  if (g.shake > 0.05) ctx.translate(Math.sin(g.time * 61) * g.shake, Math.cos(g.time * 47) * g.shake);

  drawBackdrop(ctx, g);
  if (g.dim > 0.01) { ctx.fillStyle = `rgba(10,18,40,${g.dim})`; ctx.fillRect(-20, -20, W + 40, H + 40); }

  // 세계: 화면보다 큰 생물을 낚아 올릴 때 수면선을 기준으로 물러난다
  const z = g.cam.zoom;
  ctx.save();
  const ox = g.cam.ox, oy = g.cam.oy;
  ctx.translate(ox, oy); ctx.scale(z, z);
  const view = { l: -ox / z - 12, r: (W - ox) / z + 12 };

  ctx.save();                                   // 수면 아래에만 그리는 것들
  ctx.beginPath(); ctx.rect(view.l, WL - 2, view.r - view.l, Math.max(4, (H - oy) / z - WL + 42)); ctx.clip();
  drawDeep(ctx, g);
  drawShafts(ctx, g);
  drawShadow(ctx, g);
  drawLeap(ctx, g, true);
  drawBubbles(ctx, g);
  ctx.restore();

  drawWave(ctx, g, view, -2.5, 0.75, -g.time * 5, false);     // 뒤쪽 파도
  drawRays(ctx, g);
  // 물기둥은 솟아오르는 그림자의 밑동을 가리지만, 드러난 생물은 가리지 않는다
  const revealed = g.catch && g.catch.reveal;
  if (revealed) { drawBulge(ctx, g); drawBursts(ctx, g); drawLeap(ctx, g, false); }
  else { drawLeap(ctx, g, false); drawBulge(ctx, g); drawBursts(ctx, g); }
  drawBoat(ctx, g);
  drawWave(ctx, g, view, 0, 1, g.time * 9, true);             // 앞쪽 파도 (배 밑동을 가린다)
  drawLineAndFloat(ctx, g, phase);
  drawSprays(ctx, g);
  ctx.restore();

  drawTint(ctx, g);
  if (g.flash > 0.01) { ctx.fillStyle = `rgba(255,255,255,${g.flash})`; ctx.fillRect(-20, -20, W + 40, H + 40); }
  ctx.restore();

  // 제목 화면에서는 바다와 제목만 보인다. 시작하면 화면의 판·단추가 스르르 나타난다.
  uiA += ((g.title ? 0 : 1) - uiA) * 0.08;
  if (uiA > 0.02) {
    if (uiA < 0.98) ctx.filter = `opacity(${uiA.toFixed(3)})`;
    drawHud(ctx, g);
    ctx.filter = 'none';
  }
}

// 숨은 흔적: 물고기 그림자보다 훨씬 깊은 바닥에, 가끔 움직이지 않는 큰 윤곽이 흐릿하게 비쳤다가 사라진다.
// 아무 설명도 없다. 눈여겨본 사람만 "방금 저게 뭐였지" 한다. (8번 해역에서만 조금 더 자주, 조금 더 또렷하게)
function drawDeep(ctx, g) {
  if (g.region === 9) return;                             // 태초의 바다에는 가라앉은 것이 없다
  if (!hasSprite('c_deep_1')) return;
  const far = g.region >= 8, T = far ? 45 : 80, SHOW = 18;
  const n = Math.floor(g.time / T), ph = g.time - n * T;
  if (ph > SHOW) return;
  const h1 = Math.abs(Math.sin(n * 12.9898 + g.region * 78.233) * 43758.5453) % 1, h2 = Math.abs(Math.sin(n * 39.346 + g.region * 11.135) * 24634.6345) % 1;
  if (!far && h2 < 0.35) return;                                        // 매번 나오지는 않는다
  const k = Math.min(1, ph / 5, (SHOW - ph) / 5), e = k * k * (3 - 2 * k);
  const s = sprite('c_deep_' + (1 + Math.floor(h1 * 8))), w = 170 + h2 * 60, h = w * s.h / s.w;
  const x = 30 + h1 * 300 - ph * 1.2;                                   // 배가 아주 천천히 떠가는 만큼 뒤로 흐른다
  ctx.save(); ctx.globalAlpha = e * (far ? 0.3 : 0.17); ctx.imageSmoothingEnabled = true;
  ctx.drawImage(s.img, x, H - h * 0.78, w, h);
  ctx.restore();
}

const wrapX = (v, span) => ((v % span) + span) % span;

// 배경: 하늘·구름·섬, 먼 바다 띠, 물의 단면
// 하늘 그림 맨 윗줄에서 구름이 아닌 하늘색(가장 흔한 어두운 쪽 색)을 한 번만 뽑아 둔다
const skyTopColors = new Map();
function skyTop(sky) {
  if (skyTopColors.has(sky.img)) return skyTopColors.get(sky.img);
  const c = document.createElement('canvas'); c.width = 64; c.height = 1;
  const x = c.getContext('2d'); x.drawImage(sky.img, 0, 0, sky.img.width, 1, 0, 0, 64, 1);
  const d = x.getImageData(0, 0, 64, 1).data;
  const px = []; for (let i = 0; i < 64; i++) px.push([d[i * 4], d[i * 4 + 1], d[i * 4 + 2]]);
  px.sort((p, q) => (p[0] + p[1] + p[2]) - (q[0] + q[1] + q[2]));
  const m = px[16];                                   // 어두운 쪽 1/4 지점 = 구름이 아닌 하늘
  const col = `rgb(${m[0]},${m[1]},${m[2]})`;
  skyTopColors.set(sky.img, col);
  return col;
}

// 수면 띠·파도 그림은 한 벌뿐이라, 해역의 물빛에 맞춰 색을 입혀 쓴다
const REGION_TINT = { 2: ['#35d6c4', 0.22], 3: ['#93a3a6', 0.5], 4: ['#1d55a8', 0.28], 5: ['#cfeaf6', 0.34], 6: ['#5c2016', 0.56], 7: ['#261e5c', 0.58], 8: ['#8d5fd6', 0.42] };
function regional(name, g) {
  const t = REGION_TINT[g.region];
  return t ? tinted(name, t[0], t[1]) : sprite(name);
}

function drawBackdrop(ctx, g) {
  const z = g.cam.zoom, ox = g.cam.ox, oy = g.cam.oy;
  const rg = g.region > 1 && hasSprite('c_sky_' + g.region) ? '_' + g.region : '';     // 해역마다 다른 하늘과 물
  const sea = sprite('c_sea' + rg);
  const seaY = WL * z + oy - 8;                      // 물속 그림은 화면에서 수면선이 있는 높이부터 아래로
  if (seaY < H + 10) draw(ctx, sea, -10, seaY, W + 20, Math.max(H - WL + 18, H - seaY + 10));
  // 하늘·섬·먼바다도 같은 카메라를 따라 커지고 작아진다 (가까운 것보다는 덜). 수평선은 늘 수면선에 붙어 있다.
  // 드러나는 가장자리는 같은 하늘 그림을 좌우로 뒤집어 이어 붙이고, 위쪽은 하늘색으로 잇는다.
  const still = Math.abs(z - 1) < 0.001 && Math.abs(ox) < 0.01;
  const sky = sprite('c_sky' + rg), far = regional('c_farsea', g);
  const sw = W + 20, sy = HORIZON - sky.h - 2, sh = sky.h + 3;
  // 하늘은 아주 멀리 있어서 덜 물러난다: 생물·배·바다가 줄어드는 것의 절반만(z^0.5), 그리고 화면 맨 위부터 수평선까지는 늘 덮을 만큼.
  // 가로·세로를 같은 비율로 줄여 구름이 길쭉해지지 않고, 덜 줄어드니 좌우로 뒤집어 이어 붙인 자리도 거의 드러나지 않는다.
  const hy = HORIZON * z + oy, bz = Math.max(Math.pow(z, 0.5), (hy + 6) / (sky.h + 2)), vz = bz;
  const bx = lerp(CAM_X, CAM_X * z + ox, 0.6) - CAM_X * bz, by = hy - HORIZON * vz;
  ctx.save();
  ctx.translate(bx, by); ctx.scale(bz, vz);
  const skyAt = (x, flip) => {
    ctx.save();
    if (flip) { ctx.translate(x + sw, 0); ctx.scale(-1, 1); ctx.translate(-x, 0); }
    draw(ctx, sky, x, sy, sw, sh);
    if (!still) { ctx.fillStyle = skyTop(sky); ctx.fillRect(x, sy - 900, sw, 901); }
    ctx.restore();
  };
  if (!still) {
    const need = Math.ceil((W / bz + Math.abs(bx) / bz) / sw) + 1;        // 화면을 덮는 데 필요한 장 수
    for (let i = 1; i <= Math.min(8, need); i++) { skyAt(-10 - i * (sw - 1), i % 2 === 1); skyAt(-10 + i * (sw - 1), i % 2 === 1); }
  }
  skyAt(-10, false);
  const fx = wrapX(g.time * 2.5, W);
  for (let i = still ? -1 : -2; i <= (still ? 0 : 1); i++) draw(ctx, far, fx + i * W, HORIZON - 4, W + 0.5, far.h);
  ctx.restore();
}

function drawWave(ctx, g, view, dy, alpha, scroll, front) {
  const STEP = 8, N = W / STEP;
  scroll = Math.round(scroll * 2) / 2;
  //         그림        수면선 위치  높이 배율  진하기
  const layers = [['c_wave', 0.15, 0.62, alpha * (front ? 1 - g.rough * 0.35 : 1 - g.rough * 0.6)]];
  if (!front && g.rough > 0.08) layers.unshift(['c_wave_rough', 0.5, 0.34 + g.rough * 0.1, clamp((g.rough - 0.08) * 1.7, 0, 1)]);
  ctx.imageSmoothingEnabled = true;
  for (const [name, surf, hs, a] of layers) {
    if (a < 0.02) continue;
    const spr = regional(name, g), sw = spr.img.width / N, h = spr.h * hs;
    ctx.globalAlpha = a;
    const k0 = Math.floor((view.l + scroll) / STEP), k1 = Math.ceil((view.r + scroll) / STEP);
    for (let k = k0; k <= k1; k++) {
      const x = k * STEP - scroll;
      ctx.drawImage(spr.img, wrapX(k, N) * sw, 0, sw, spr.img.height, x, surfaceY(g, x + STEP / 2) - h * surf + dy, STEP, h);
    }
  }
  ctx.globalAlpha = 1;
}

// 물속 빛살 (낚아 올릴 때 수면 아래로 쏟아진다)
function drawShafts(ctx, g) {
  if (g.shafts < 0.02 || !g.catch) return;
  const spr = sprite('c_shafts'), w = Math.max(360, g.catch.lw * 1.5), h = w * spr.h / spr.w;
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.globalAlpha = g.shafts * 0.38;
  draw(ctx, spr, g.catch.ex - g.catch.lw * 0.1 - w / 2 + Math.sin(g.time * 0.7) * 6, WL - 6, w, h);
  ctx.restore();
}

// 그림자 (모든 생물 공통). 그림 한 장을 늘리거나 뒤집지 않고 자세 그림을 넘긴다:
//   헤엄 = 꼬리가 오르내리는 4동작을 번갈아, 돌아서기 = 몸을 트는 3동작을 거쳐 반대쪽으로,
//   몸부림·잠수·솟구침 = 각각의 자세.
// 물색을 어둡게 물들이는 방식(multiply)으로 찍어 물속에 잠긴 것처럼 보이게 한다.
//                 그림 폭 ÷ 몸길이   기울기 반영 정도
const POSE = {
  swim:   { span: 1.0,  tilt: 1 },
  turn_1: { span: 0.8,  tilt: 0.3 },
  turn_2: { span: 0.68, tilt: 0.2 },
  turn_3: { span: 0.62, tilt: 0 },
  thrash: { span: 0.92, tilt: 0.3 },
  dive:   { span: 0.86, tilt: 0.3 },
  surge:  { span: 0.86, tilt: 0.3 },
};

function drawShadowPose(ctx, s, name, pose, alpha) {
  if (alpha < 0.01) return;
  const spr = sprite(name), d = POSE[pose];
  const k = s.show || 1, w = s.len * k * d.span, h = w * spr.h / spr.w;      // show: 본래 크기로 작게 보일 때의 비율. 입이 있던 자리(찌 밑)는 그대로 지킨다
  ctx.save();
  ctx.translate(s.x + s.len * (1 - k) * 0.46 * clamp(s.face, -1, 1), WL + s.y);
  ctx.scale(s.face > 0 ? -1 : 1, 1);            // 그림은 왼쪽을 본다
  ctx.rotate(-s.pitch * d.tilt - (s.wob || 0));     // 몸부림칠 때 몸을 비튼다
  ctx.imageSmoothingEnabled = true;
  ctx.globalAlpha = alpha;                       // 농도는 판을 화면에 얹을 때 한 번에 준다
  ctx.drawImage(spr.img, -w / 2, -h / 2, w, h);
  ctx.restore();
}

// 그림자는 따로 마련한 판에 먼저 그린 뒤, 수면에 가까운 쪽을 서서히 지워서 화면에 얹는다.
// 수면선에서 칼로 자른 듯 끊기지 않고 물빛 속으로 풀려 사라진다.
let shadowBuf = null;
function drawShadow(ctx, g) {
  const s = g.sw;
  if (!s || s.vis < 0.01) return;
  const cv = ctx.canvas;
  if (!shadowBuf) shadowBuf = document.createElement('canvas');
  if (shadowBuf.width !== cv.width || shadowBuf.height !== cv.height) { shadowBuf.width = cv.width; shadowBuf.height = cv.height; }
  const b = shadowBuf.getContext('2d');
  b.setTransform(1, 0, 0, 1, 0, 0);
  b.globalCompositeOperation = 'source-over'; b.globalAlpha = 1;
  b.clearRect(0, 0, cv.width, cv.height);
  b.setTransform(ctx.getTransform());
  // 자세를 넘길 때 두 그림의 농도를 더해서 합친다: 겹치는 곳은 늘 같은 농도라, 넘어가는 중간에 흐려졌다 진해지며 깜빡이지 않는다
  b.globalCompositeOperation = 'lighter';
  const one = (pose, alpha) => {
    if (pose !== 'swim') return drawShadowPose(b, s, 'c_shadow_' + pose, pose, alpha);
    // 헤엄: 꼬리 박자에 맞춰 4동작을 이어 넘긴다
    const ph = wrapX(s.tail / (Math.PI * 2), 1) * 4, i = Math.floor(ph), f = ph - i;
    const k = f * f * (3 - 2 * f);
    drawShadowPose(b, s, 'c_shadow_swim_' + (i + 1), 'swim', alpha * (1 - k));
    drawShadowPose(b, s, 'c_shadow_swim_' + ((i + 1) % 4 + 1), 'swim', alpha * k);
  };
  if (s.prevPose && s.mix < 1) one(s.prevPose, 1 - s.mix);
  one(s.pose, s.prevPose ? s.mix : 1);
  // 수면 쪽을 서서히 지운다
  const fade = b.createLinearGradient(0, WL + 3, 0, WL + 46);
  fade.addColorStop(0, 'rgba(0,0,0,0)'); fade.addColorStop(1, 'rgba(0,0,0,1)');
  b.globalCompositeOperation = 'destination-in'; b.globalAlpha = 1; b.fillStyle = fade;
  b.fillRect(-6000, -6000, 12000, 12000);

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'multiply';     // 물을 어둡게 물들인다
  const depth = clamp(s.y / DEEP, 0, 1), dens = lerp(0.8, 0.5, depth) * s.vis;   // 목표 화면처럼 물빛이 비쳐 보이는 농도
  ctx.globalAlpha = dens;
  ctx.drawImage(shadowBuf, 0, 0);
  ctx.globalCompositeOperation = 'source-over';  // 형태가 읽히도록 한 번 더 옅게
  ctx.globalAlpha = 0.1 * dens;
  ctx.drawImage(shadowBuf, 0, 0);
  ctx.restore();
}

function drawBubbles(ctx, g) {
  for (const b of g.bubbles) {
    const spr = sprite(b.sprite), k = b.age / b.life;
    ctx.save();
    ctx.globalAlpha = Math.sin(Math.min(1, k) * Math.PI) * 0.85;
    ctx.translate(b.x, b.y); ctx.rotate(b.rot);
    draw(ctx, spr, -b.size / 2, -b.size * spr.h / spr.w / 2, b.size, b.size * spr.h / spr.w);
    ctx.restore();
  }
}

// 생물 뒤에서 퍼지는 금빛 빛줄기
function drawRays(ctx, g) {
  const c = g.catch;
  if (!c || g.rays < 0.02) return;
  const spr = sprite('c_rays2'), size = c.lw * 1.9 * c.scale, lh = leapHeight(c);
  const t = performance.now() / 1000;
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.globalAlpha = g.rays * c.alpha * 0.85;
  ctx.translate(c.x + c.lw * 0.06, c.y - lh * 0.12);
  ctx.rotate(t * 0.12);
  ctx.drawImage(spr.img, -size / 2, -size / 2 * spr.h / spr.w, size, size * spr.h / spr.w);
  ctx.restore();
}

// 낚아 올린 생물. under=true 는 수면 아래에 잠긴 부분, false 는 물 위 부분.
// 솟아오르는 동안은 정체 모를 그림자(공통 그림)이고, 꼭대기에서 뿅 하고 도트 생물로 바뀐다.
// 도트 생물은 옛 휴대용 게임기처럼 2동작을 뚝뚝 끊어 넘기며 펄떡인다 (이것만은 일부러 부드럽지 않게).
// 낚인 뒤의 몸짓 (1.9초 주기, 옛 휴대용 게임기처럼 뚝뚝 끊어서):
//   파닥파닥 발버둥(놀란 얼굴) → 축 늘어져 멈춤(놀란 얼굴) → 잠깐 멍한 평소 얼굴 → 다시 화들짝.
// 돌려주는 값: [기울기, 튀는 높이(몸길이 대비), 얼굴(1 놀람 / 0 평소), 크기]
function flopStep(t) {
  const u = t % 1.9;
  if (u < 0.9) { const i = Math.floor(u / 0.1) % 2; return [i ? 0.2 : -0.22, i ? -0.03 : -0.06, 1, 1]; }   // 발버둥
  if (u < 1.45) return [0.05, 0.015, 1, 1];                                                               // 늘어짐
  if (u < 1.8) return [0.08, 0.02, 0, 0.97];                                                              // 멍
  return [-0.12, -0.07, 1, 1.1];                                                                          // 화들짝
}
function drawLeap(ctx, g, under) {
  const c = g.catch;
  if (!c || c.phase === 'pull') return;
  ctx.save();
  if (!under) { ctx.beginPath(); ctx.rect(-4000, -4000, 8000, 4000 + WL + 1.5); ctx.clip(); }
  if (!c.reveal) {
    const spr = sprite('c_shadow_surge'), w = c.lw * 0.9, h = w * spr.h / spr.w;
    ctx.imageSmoothingEnabled = true;
    ctx.globalAlpha = c.alpha * (under ? 0.7 : 0.96);
    ctx.translate(c.x, c.y); ctx.scale(-1, 1); ctx.rotate(-c.rot * 0.4);
    ctx.drawImage(spr.img, -w / 2, -h / 2, w, h);
  } else if (!under) {
    const step = flopStep(c.popT);
    const flop = c.phase === 'leap' || c.phase === 'hang';
    const f = g.fish, base = sprite(f.sprite), shocked = hasSprite(f.sprite2) && !(flop && step[2] === 0);
    const spr = shocked ? sprite(f.sprite2) : base;
    const pop = Math.min(1, c.popT / 0.12), over = 1 + 0.35 * Math.sin(Math.min(1, c.popT / 0.3) * Math.PI);   // 뿅: 톡 튀어나오며 잠깐 부푼다
    const w = c.lw * c.fit * c.scale * pop * over * (flop ? step[3] : 1), h = w * base.h / base.w;
    // 놀람 그림은 평소 그림과 몸 크기가 같게, 왼쪽 아래를 맞춰 겹친다 (땀방울만큼 위·오른쪽으로 더 나온다)
    const k = w / base.sw, w2 = spr.sw * k, h2 = spr.sh * k;
    ctx.imageSmoothingEnabled = !!spr.smooth;      // 도트는 네모 그대로, 붓 그림(태초의 생물)은 부드럽게
    ctx.globalAlpha = c.alpha;
    ctx.translate(c.x, c.y + (flop ? step[1] * c.lw : 0));
    ctx.rotate(c.rot + (flop ? step[0] : 0));
    ctx.drawImage(spr.img, -w / 2, h / 2 - h2, w2, h2);
  }
  ctx.restore();
}

// 낚이기 직전: 머리가 밀어 올린 수면이 둥글게 부풀다가(1) 터지며 갈라진다(2)
function drawBulge(ctx, g) {
  const c = g.catch;
  if (!c) return;
  let k, frame, a = 1;
  if (c.phase === 'pull' && c.bulgeK > 0) { k = Math.min(1, c.bulgeK); frame = c.bulgeK > 1 ? 2 : 1; }
  else if (c.phase === 'leap' && c.pt < 0.3) { k = 1; frame = 2; a = 1 - c.pt / 0.3; }
  else return;
  const spr = sprite('c_bulge_' + frame);
  const e2 = k * k * (3 - 2 * k);
  const w = c.lw * 0.85 * (0.3 + 0.7 * e2), h = w * spr.h / spr.w * (0.1 + 0.9 * e2);
  ctx.save();
  ctx.globalAlpha = a * Math.min(1, k * 2.2);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(spr.img, c.hitX - w / 2, surfaceY(g, c.hitX) + h * 0.4 - h, w, h);
  ctx.restore();
}

const boatFade = { cur: null, prev: null, t0: 0 };
const SKIN_ART = { line: 'c_float_9', outfit: 'c_scarf_9', reel: 'ui_tension_9', rod: 'c_rod_9', boat: 'c_boat_t9_1' };
const gearTier = (g, id) => (skinOn(g, id) && hasSprite(SKIN_ART[id]) ? 9 : Math.min(8, Math.floor(g.eco.gear[id] / 10) + 1));      // 9 = 태초의 차림 (얻었고 켜 두었고 그림이 있을 때)
// 장비 외형(복장): 낚시꾼 목에서 뒤로 날리는 목도리. 곧은 그림을 조각내어 바람에 펄럭이게 그린다 (배 안의 자리 기준).
// 높은 등급(영웅 이상)이 입질하는 순간에는 목도리 끝이 잠깐 반짝인다 — 복장은 행운의 장비다.
const NECK = { 1: [5.4, -12.8], 2: [11.6, -11.4], 3: [8.6, -16.2] };
const scarf = { x: 5.4, y: -12.8, glow: 0, t: 0 };
function drawScarf(ctx, g, pose) {
  const T = gearTier(g, 'outfit'); if (!hasSprite('c_scarf_' + T)) return;
  const s = sprite('c_scarf_' + T), now = performance.now() / 1000, dt = Math.min(0.05, now - scarf.t); scarf.t = now;
  const [nx, ny] = NECK[pose] || NECK[1], q = 1 - Math.exp(-10 * dt);
  scarf.x += (nx - scarf.x) * q; scarf.y += (ny - scarf.y) * q;                       // 자세가 바뀌어도 목을 따라 스르르 옮겨 간다
  const lucky = (g.state === 'bite' || g.state === 'hook') && g.fish && GRADES.indexOf(g.fish.gradeInfo) >= 3;
  scarf.glow += ((lucky ? 1 : 0) - scarf.glow) * (1 - Math.exp(-(lucky ? 12 : 3) * dt));
  const n = 12, h = Math.max(2, s.h * 1.7), wind = 1 + g.boat.spray * 1.5 + g.rough * 0.6, sw = s.img.width / n;
  ctx.save(); ctx.imageSmoothingEnabled = true;
  let tip = [scarf.x, scarf.y];
  for (let i = 0; i < n; i++) {
    const u = i / n, x = scarf.x + u * s.w, y = scarf.y + Math.sin(g.time * 6.5 - u * 5.2) * 1.5 * u * wind + u * u * 1.6;   // 끝으로 갈수록 크게 펄럭이고 살짝 처진다
    ctx.drawImage(s.img, i * sw, 0, sw, s.img.height, x, y - h / 2, s.w / n + 0.35, h);
    tip = [x + s.w / n, y];
  }
  if (scarf.glow > 0.02 && hasSprite('fx_sparkle')) {
    const sp = sprite('fx_sparkle'), k = 5 + 2 * Math.sin(now * 14);
    ctx.globalAlpha = scarf.glow; ctx.drawImage(sp.img, tip[0] - k / 2, tip[1] - k / 2, k, k * sp.h / sp.w);
  }
  ctx.restore();
}
function drawBoat(ctx, g) {
  const pose = rodPose(g), b = pose.boat;
  // 장비 외형: 배 단계에 따라 배 그림이, 낚싯대 단계에 따라 낚싯대 그림이 달라진다 (바다에서는 크기는 그대로)
  const bT = gearTier(g, 'boat'), rT = gearTier(g, 'rod');
  const boatName = (pose) => bT > 1 && hasSprite(`c_boat_t${bT}_${pose}`) ? `c_boat_t${bT}_${pose}` : 'c_boat_' + pose;
  const boat = sprite(boatName(b.pose)), rod = sprite(hasSprite('c_rod_' + rT) ? 'c_rod_' + rT : 'c_rod');
  const at = (sp) => [sp.ox ?? -sp.w / 2, sp.oy ?? -sp.h];          // 새 배 그림은 낚시꾼이 제자리에 오도록 잰 자리에 놓는다
  // 낚시꾼 자세 그림은 뚝 바뀌지 않고 0.16초 동안 겹쳐 넘어간다
  const now = performance.now() / 1000;
  if (b.pose !== boatFade.cur) { boatFade.prev = boatFade.cur; boatFade.cur = b.pose; boatFade.t0 = now; }
  const mixB = boatFade.prev ? clamp((now - boatFade.t0) / 0.16, 0, 1) : 1;
  ctx.save();
  ctx.translate(b.x, b.y); ctx.rotate(b.rot);
  if (mixB < 1) { const old = sprite(boatName(boatFade.prev)); draw(ctx, old, ...at(old)); ctx.globalAlpha = mixB; }
  draw(ctx, boat, ...at(boat));
  ctx.globalAlpha = 1;
  drawScarf(ctx, g, b.pose);
  ctx.globalAlpha = 1;
  if (g.boat.spray > 0.04) {                 // 끌려갈 때 뱃머리 물살
    const sp = sprite('c_bowspray_2'), k = 0.6 + g.boat.spray * 0.6;
    ctx.globalAlpha = clamp(g.boat.spray * 1.5, 0, 1);
    draw(ctx, sp, -18 - sp.w * k * 0.75, -sp.h * k - 0.5, sp.w * k, sp.h * k);
    ctx.globalAlpha = 1;
  }
  ctx.restore();

  // 낚싯대: 곧은 그림을 곡선을 따라 조각내어 휘게 그린다
  const n = 16, th = Math.max(1.5, rod.h);
  const pt = (u) => { // u=0 끝, u=1 손잡이
    const t = 1 - u, a = (1 - t) * (1 - t), bb = 2 * (1 - t) * t, c = t * t;
    return { x: a * pose.base.x + bb * pose.mid.x + c * pose.tip.x, y: a * pose.base.y + bb * pose.mid.y + c * pose.tip.y };
  };
  ctx.imageSmoothingEnabled = true;
  const sw = rod.img.width / n;
  for (let i = 0; i < n; i++) {
    const p0 = pt(i / n), p1 = pt((i + 1) / n);
    const ang = Math.atan2(p1.y - p0.y, p1.x - p0.x), seg = Math.hypot(p1.x - p0.x, p1.y - p0.y);
    ctx.save(); ctx.translate(p0.x, p0.y); ctx.rotate(ang);
    ctx.drawImage(rod.img, i * sw, 0, sw, rod.img.height, 0, -th / 2, seg + 0.4, th);
    ctx.restore();
  }
}

// 낚싯줄(코드로 그리는 유일한 선)과 찌
const lineSpring = { o: 0, v: 0, t: 0, on: false };
function drawLineAndFloat(ctx, g, phase) {
  const tip = rodPose(g).tip, bob = g.bob, c = g.catch;
  const tension = g.fight ? g.fight.tension : (c && c.phase !== 'stow' ? 0.5 : 0);
  const lT = gearTier(g, 'line');                      // 장비 외형(줄): 찌 모양
  const fl = sprite(hasSprite('c_float_' + lT) ? 'c_float_' + lT : 'c_float'), WATER = fl.water ?? 0.27;          // 찌 그림에서 수면이 걸리는 높이
  const [r, gg, b] = lineColor(tension);
  // 줄은 가운데가 처지는 곡선. 처짐은 뚝 바뀌지 않고 용수철처럼 따라온다:
  // 팽팽해지면 튕기듯 펴지고, 느슨해지면 출렁이며 늘어진다. 물속 부분은 깊어질수록 옅어진다.
  const stroke = (pts, sag, alpha, width, spring = false, fadeTo = alpha) => {
    const [p0, p1] = pts, d = Math.hypot(p1.x - p0.x, p1.y - p0.y);
    let cx = (p0.x + p1.x) / 2, cy = (p0.y + p1.y) / 2 + d * sag;
    if (spring) {
      const L = lineSpring, now = performance.now() / 1000, dt = Math.min(0.05, now - L.t); L.t = now;
      const sw = Math.sin(g.time * 1.3) * d * 0.006 * (1 - clamp(tension, 0, 1));      // 느슨한 줄은 바람에 살짝 흔들린다
      const tx = d * sag, mx = (p0.x + p1.x) / 2, my = (p0.y + p1.y) / 2;
      if (!L.on || Math.abs(L.o - tx) > 120) { L.o = tx; L.v = 0; L.on = true; }
      for (let i = 0; i < 2; i++) { L.v += ((tx - L.o) * 130 - L.v * 9) * dt / 2; L.o += L.v * dt / 2; }
      cx = mx + sw; cy = my + L.o;
    }
    if (tension > 0.8) { const j = Math.sin(g.time * 95) * 0.9 * (tension - 0.8) / 0.2; cy += j; cx += j * 0.4; }
    const path = () => { ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.quadraticCurveTo(cx, cy, p1.x, p1.y); };
    const col = (a) => `rgba(${r},${gg},${b},${a})`;
    const paint = (a0, a1) => {
      if (a0 === a1) return col(a0);
      const gr = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y); gr.addColorStop(0, col(a0)); gr.addColorStop(1, col(a1)); return gr;
    };
    ctx.lineCap = 'round';
    ctx.strokeStyle = paint(0.16 * alpha, 0.16 * fadeTo); ctx.lineWidth = width * 2.6; path(); ctx.stroke();   // 빛 번짐
    ctx.strokeStyle = paint(alpha, fadeTo); ctx.lineWidth = width; path(); ctx.stroke();
    return (u) => ({ x: (1 - u) * (1 - u) * p0.x + 2 * (1 - u) * u * cx + u * u * p1.x, y: (1 - u) * (1 - u) * p0.y + 2 * (1 - u) * u * cy + u * u * p1.y });
  };
  const drawFloat = (x, y, rot, wet) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    draw(ctx, fl, -fl.w / 2, wet ? -fl.h * WATER : -fl.h * 0.2);
    ctx.restore();
  };

  if (c && c.phase !== 'pull') {
    // 낚아 올리는 중: 줄이 낚싯대 끝에서 입까지 팽팽하고, 찌는 줄에 매달려 공중에 있다
    if (c.phase === 'release' || c.alpha < 0.5) return;
    // 펄떡이는 동안에는 줄 끝도 생물의 입을 따라 같이 움직인다 (생물이 튀고 비틀리는 만큼)
    const fs = c.phase === 'hang' && c.reveal ? flopStep(c.popT) : null;
    const cc = fs ? { ...c, y: c.y + fs[1] * c.lw, rot: c.rot + fs[0], scale: c.scale * fs[3] } : c;
    const m = c.phase === 'stow' ? { x: c.x, y: c.y } : leapMouth(cc, leapHeight(c));
    const at = stroke([tip, m], -0.03, 1, 1.1);
    const p = at(0.24), q = at(0.28);
    drawFloat(p.x, p.y, Math.atan2(q.y - p.y, q.x - p.x) + Math.PI / 2, false);
    return;
  }
  const hooked = g.state === 'fight' || g.state === 'hook' || (c && c.phase === 'pull');
  if (hooked && g.sw) {
    // 걸린 뒤: 줄이 수면을 가르고 물속 주둥이까지 이어진다. 찌는 그 자리에 끌려 잠긴다.
    // 찌는 줄이 당기는 쪽으로 끌려간다: 물속 줄이 향하는 방향(주둥이 쪽)으로 조금 딸려 가고, 그쪽으로 눕는다. 팽팽할수록 더.
    const mp = mouthPos(g), tn = clamp(tension, 0, 1), F = floatDrag, now = performance.now() / 1000, fdt = Math.min(0.05, now - F.t); F.t = now;
    const wantX = clamp((mp.x - bob.x) * 0.3, -34, 34) * (0.35 + 0.65 * tn);
    const dy = Math.max(6, mp.y - surfaceY(g, bob.x)), wantRot = clamp(Math.atan2(-(mp.x - (bob.x + wantX)), dy), -1.15, 1.15) * (0.3 + 0.7 * tn);
    if (!F.on) { F.x = 0; F.rot = 0; F.on = true; }
    F.x += (wantX - F.x) * Math.min(1, fdt * 5); F.rot += (wantRot - F.rot) * Math.min(1, fdt * 7);      // 뚝 꺾이지 않고 부드럽게 따라간다
    const ex = bob.x + F.x, sy = surfaceY(g, ex), entry = { x: ex, y: sy };
    stroke([entry, mp], 0.02, 0.6, 0.85, false, 0.42);       // 입에 닿는 끝까지 보이게
    stroke([tip, entry], 0.1 * Math.pow(1 - tn, 2), 1, 0.95, true);
    drawFloat(ex, sy + bob.dip, F.rot + Math.sin(g.time * 9) * 0.1, true);
    return;
  }
  floatDrag.on = false;
  const wet = bob.inWater;
  const fy = wet ? bob.y : bob.y;
  const top = { x: bob.x, y: wet ? fy - fl.h * WATER + bob.dip : fy - fl.h * 0.2 };
  stroke([tip, top], g.state === 'wait' || g.state === 'bite' ? 0.06 : g.state === 'cast' ? -0.05 : 0, 1, 0.95, true);
  drawFloat(bob.x, wet ? fy + bob.dip + Math.sin(g.time * 2.3) * 0.5 : fy, wet ? Math.sin(g.time * 1.7) * 0.07 : 0, wet);
}

const floatDrag = { on: false, x: 0, rot: 0, t: 0 };      // 걸린 뒤 찌가 줄에 끌려간 정도 (부드럽게 따라가도록 기억해 둔다)

// 수면에서 터지는 큰 물 덩어리 (몸부림 파도, 물 폭발): 솟았다가 가라앉으며 사라진다
const easeIn = (t) => t * t;
// 연속 동작 그림을 순서대로 넘겨 그린다 (앞 동작 위에 다음 동작이 겹쳐 나타난다). pos 0~1.
function drawSeq(ctx, names, pos, x, y, w, alpha, flip = false, squash = 1) {
  const f = clamp(pos, 0, 1) * (names.length - 1), i = Math.min(names.length - 2, Math.floor(f)), k = f - i;
  ctx.save();
  ctx.translate(x, y); if (flip) ctx.scale(-1, 1);
  ctx.imageSmoothingEnabled = true;
  for (const [n, a] of [[names[i], 1 - k * k], [names[i + 1], k]]) {
    if (a < 0.02) continue;
    const spr = sprite(n), h = w * spr.h / spr.w * squash;
    ctx.globalAlpha = alpha * a;
    ctx.drawImage(spr.img, -w / 2, -h, w, h);
  }
  ctx.restore();
}
const SEQ = {
  c_erupt: [1, 2, 3, 4, 5, 6].map((i) => 'c_erupt_seq_' + i),        // 솟음 → 퍼짐 → 무너짐 → 잔거품
  c_plop: [1, 2, 3, 4].map((i) => 'c_plop_' + i),                    // 찌가 떨어질 때의 작은 튐
  c_thrash: [1, 2, 3, 3, 2, 1].map((i) => 'c_foam_' + i),         // 몸부림: 수면이 끓어올랐다 가라앉는다
};
function drawBursts(ctx, g) {
  // 걸린 동안: 줄이 물을 가르는 자리에 작은 거품이 인다 (세게 당길수록 거칠게). 수면에 낮게 붙어 있다.
  const s = g.sw, c = g.catch;
  if (s && g.state === 'fight' && s.shake > 0.05) {
    const k = clamp(s.shake, 0, 1), x = g.bob.x;
    drawSeq(ctx, SEQ.c_thrash.slice(0, 2), clamp((k - 0.5) / 0.5, 0, 1), x, surfaceY(g, x) + 3, 46 + k * 34, clamp(k * 1.4, 0, 0.9), false, 0.55);
  }
  // 낚아 올릴 때: 몸이 수면을 뚫는 자리에 물기둥 하나. 몸이 솟는 만큼 같이 솟고, 정체가 드러나면 무너져 잔거품이 된다.
  if (c && c.eruptW && (c.phase === 'leap' || c.phase === 'hang')) {
    const pos = !c.reveal ? Math.min(0.62, c.out * 0.72) : 0.62 + 0.38 * clamp(c.popT / 0.9, 0, 1);
    const fade = c.reveal ? 1 - clamp((c.popT - 0.9) / 0.5, 0, 1) : 1;
    if (fade > 0.01) drawSeq(ctx, SEQ.c_erupt, pos, c.eruptX, surfaceY(g, c.eruptX) + 6, c.eruptW, fade, false, 0.8);
  }
  for (const b of g.bursts) {
    const k = b.age / b.life, names = SEQ[b.sprite];
    if (!names) continue;
    const fade = k < 0.8 ? 1 : 1 - (k - 0.8) / 0.2;
    const foam = b.sprite === 'c_thrash';
    drawSeq(ctx, names, k, b.x, surfaceY(g, b.x) + (b.sprite === 'c_plop' ? 3 : 5), b.size * (foam ? 0.9 : 1), fade, b.flip, foam ? 0.6 : 1);
  }
}
function drawSprays(ctx, g) {
  for (const p of g.sprays) {
    const spr = sprite(p.sprite), k = p.age / p.life;
    const w = p.size * (0.7 + k * 0.5), h = w * spr.h / spr.w;
    ctx.save();
    ctx.globalAlpha = k < 0.5 ? 1 : 1 - (k - 0.5) / 0.5;
    ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    if (p.flip) ctx.scale(-1, 1);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(spr.img, -w / 2, -h / 2, w, h);
    ctx.restore();
  }
}

// 나타났다 사라지는 UI 의 진하기 (0~1). 켜고 끌 때 뚝 바뀌지 않게 실제 시간 기준으로 따라간다.
const fades = new Map();
function fade(key, on, rate = 9) {
  const now = performance.now() / 1000, f = fades.get(key) || { v: 0, t: now };
  const dt = Math.min(0.1, now - f.t);
  f.v += ((on ? 1 : 0) - f.v) * (1 - Math.exp(-rate * dt)); f.t = now;
  fades.set(key, f);
  return f.v;
}
let lastTension = 0, lastPower = 0, lastDist = 0;

// 하루 시계 (위쪽 가운데): 해가 길을 따라 가다가 노을을 지나 달이 되고, 끝에 닿으면 하루가 저문다.
const DAY_ICON = ['icon_day', 'icon_dusk', 'icon_night', 'icon_dawn'];
// 하루의 네 구간: 새벽 · 낮 · 오후 · 밤. 구간마다 빛깔이 다르고 사이가 떨어져 있어 한눈에 구분된다.
const DAY_SEG = { 3: ['새벽', '#c9a8f0'], 0: ['낮', '#ffd24a'], 1: ['오후', '#ff8a45'], 2: ['밤', '#5a6fd8'] };
let clockA = 1, clockStrip = null;
function drawDayClock(ctx, g) {
  // 낚아 올리는 동안에는 큰 생물을 가리지 않게 서서히 사라졌다가, 끝나면 다시 나타난다
  const hide = g.state === 'catch' || g.state === 'result';
  clockA += ((hide ? 0 : 1) - clockA) * 0.1;
  const A = clockA; if (A < 0.01) return;
  ctx.save(); ctx.globalAlpha = A;
  const k = clamp(g.dayT / DAY_SEC, 0, 1), w = 170, x0 = W / 2 - w / 2, y = 15;
  const bar = sprite('h_bar'), bh = w * bar.h / bar.w, fl = sprite('h_bar_fill');
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(bar.img, x0, y - bh / 2, w, bh);
  // 틀 안쪽 홈(둥근 끝)의 자리. 채움도 아이콘도 이 안에서만 움직인다 → 틀 밖으로 삐져나오지 않는다.
  const gx = x0 + w * 0.03, gw = w * 0.94, gh = bh * 0.6, gy = y - gh / 2 + bh * 0.005, r = gh / 2;
  const s = gh * 0.92, ix = gx + r + (gw - 2 * r) * k;                       // 해·달: 홈 높이에 맞춘 크기, 홈의 둥근 끝 안쪽까지만
  const segX = (at) => gx + r + (gw - 2 * r) * at;
  ctx.save();
  ctx.beginPath(); ctx.roundRect(gx, gy, gw, gh, r); ctx.clip();            // 홈 모양대로 잘라 낸다
  // 구간마다 빛깔을 입힌 채움 그림은 한 번만 만들어 두고(색 입히기는 비싼 연산이라 매 프레임 하지 않는다), 그릴 때는 잘라 붙이기만 한다
  if (!clockStrip) {
    const K = 4, c = document.createElement('canvas'); c.width = Math.round(gw * K); c.height = Math.round(gh * K);
    const x = c.getContext('2d'); x.scale(K, K);
    DAY_PLAN.forEach(([at, id], i) => {
      const a0 = i === 0 ? 0 : segX(at) - gx + 0.6, a1 = i === DAY_PLAN.length - 1 ? gw : segX(DAY_PLAN[i + 1][0]) - gx - 0.6;   // 구간 사이는 홈이 비쳐 보이는 틈
      x.globalCompositeOperation = 'source-over';
      x.drawImage(fl.img, a0 / gw * fl.img.width, 0, (a1 - a0) / gw * fl.img.width, fl.img.height, a0, 0, a1 - a0, gh);
      x.globalCompositeOperation = 'color'; x.fillStyle = DAY_SEG[id][1]; x.fillRect(a0, 0, a1 - a0, gh);
    });
    clockStrip = c;
  }
  const cut = clamp(ix - gx, 0, gw), sw = clockStrip.width / gw;
  ctx.globalAlpha = 0.95 * A; if (cut > 0.2) ctx.drawImage(clockStrip, 0, 0, cut * sw, clockStrip.height, gx, gy, cut, gh);                       // 지나온 만큼은 또렷하게
  ctx.globalAlpha = 0.3 * A; if (gw - cut > 0.2) ctx.drawImage(clockStrip, cut * sw, 0, (gw - cut) * sw, clockStrip.height, gx + cut, gy, gw - cut, gh);   // 남은 만큼은 흐리게
  ctx.restore();
  // 구간 이름: 지금 구간은 밝게, 나머지는 흐리게
  DAY_PLAN.forEach(([at, id], i) => {
    const end = i === DAY_PLAN.length - 1 ? 1 : DAY_PLAN[i + 1][0], now = g.phase === id;
    ctx.globalAlpha = A * (now ? 1 : 0.5);
    text(ctx, DAY_SEG[id][0], segX((at + end) / 2), y + bh / 2 + 5, now ? 7.5 : 7, '#fff4dc', 'center', now ? 700 : 600);
  });
  ctx.globalAlpha = A;
  const ic = sprite(DAY_ICON[g.phase]), late = k > 0.9 ? 1 + 0.1 * Math.sin(performance.now() / 160) : 1;   // 끝이 가까우면 두근거린다
  const iw = s * late * Math.min(1, ic.w / ic.h), ih = iw * ic.h / ic.w;     // 세로로 긴 그림도 홈 높이를 넘지 않게
  ctx.drawImage(ic.img, ix - iw / 2, y - ih / 2, iw, ih);
  ctx.restore();
}

// 게이지: 틀 그림 위에 채움 그림을 채워진 만큼만 잘라 얹는다. x0·x1 = 틀에서 홈이 시작하고 끝나는 자리(폭 대비)
function gauge(ctx, name, cx, cy, w, v, x0, x1) {
  const fr = sprite(name), fl = sprite(name + '_fill'), h = w * fr.h / fr.w, x = cx - w / 2, y = cy - h / 2;
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(fr.img, x, y, w, h);
  const tw = w * (x1 - x0), th = tw * fl.h / fl.w, k = clamp(v, 0, 1);
  if (k > 0.004) ctx.drawImage(fl.img, 0, 0, fl.img.width * k, fl.img.height, x + w * x0, cy - th / 2, tw * k, th);
}

// 틀 그림에 홈의 자리(slot)가 적혀 있는 게이지: 홈 모양대로 잘라 그 안에 채움 그림을 채운다
function gaugeSlot(ctx, name, fill, cx, cy, w, v) {
  const fr = sprite(name), fl = sprite(fill), h = w * fr.h / fr.w, x = cx - w / 2, y = cy - h / 2, [a, b, c, d] = fr.slot;
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(fr.img, x, y, w, h);
  const sx = x + w * a, sw = w * (b - a), sy = y + h * c, sh = h * (d - c), k = clamp(v, 0, 1);
  if (k < 0.004) return;
  ctx.save(); ctx.beginPath(); ctx.roundRect(sx, sy, sw, sh, sh / 2); ctx.clip();
  const [bx, by, bw, bh] = inkBox(fl);                 // 채움 그림의 빈 가장자리를 빼고, 실제 그림 부분만 홈에 꽉 차게
  ctx.drawImage(fl.img, bx, by, bw * k, bh, sx, sy, sw * k, sh);
  ctx.restore();
}
// 그림에서 투명한 가장자리를 뺀 실제 그림 범위 (한 번만 잰다)
const inkBoxes = new Map();
function inkBox(sp) {
  if (inkBoxes.has(sp.img)) return inkBoxes.get(sp.img);
  const w = sp.img.width, h = sp.img.height, c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d'); x.drawImage(sp.img, 0, 0);
  const d = x.getImageData(0, 0, w, h).data, rows = new Array(h).fill(0), cols = new Array(w).fill(0);
  for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) if (d[(yy * w + xx) * 4 + 3] > 120) { rows[yy]++; cols[xx]++; }
  // 가장자리에 흩어진 점은 무시한다: 줄(칸)의 3분의 1 넘게 칠해진 곳만 그림으로 본다
  const first = (a, n) => a.findIndex((v) => v > n), last = (a, n) => a.length - 1 - [...a].reverse().findIndex((v) => v > n);
  const x0 = first(cols, h / 3), x1 = last(cols, h / 3), y0 = first(rows, w / 3), y1 = last(rows, w / 3);
  const box = x0 >= 0 && x1 > x0 && y0 >= 0 && y1 > y0 ? [x0, y0, x1 - x0 + 1, y1 - y0 + 1] : [0, 0, w, h];
  inkBoxes.set(sp.img, box); return box;
}

function drawHud(ctx, g) {
  // 골드와 어창 판
  drawGold(ctx, g);
  const hp = sprite('ui_plaque_hold'), hw = 78, hh = hw * hp.h / hp.w;
  ctx.drawImage(hp.img, 100, 4 + (92 * sprite('ui_plaque_gold').h / sprite('ui_plaque_gold').w - hh) / 2, hw, hh);
  ctx.font = `600 10.5px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = g.cargo.length >= g.cargoMax ? '#ffb39a' : '#ffe9b8';
  ctx.font = `600 ${g.cargoMax >= 10 ? 9.5 : 10.5}px ${FONT}`;
  ctx.fillText(`${g.cargo.length}/${g.cargoMax}`, 100 + hw * 0.7, 4 + 92 * sprite('ui_plaque_gold').h / sprite('ui_plaque_gold').w / 2 + 0.5);
  // 길드 의뢰: 판 아래에 작게. 한 칸 채울 때마다 잠깐 밝아진다
  if (g.quest) {
    const ql = questLine(g), qy = 4 + 92 * sprite('ui_plaque_gold').h / sprite('ui_plaque_gold').w + 8, pop = clamp(1 - (g.questT ?? 9) / 0.8, 0, 1);
    ctx.font = `600 8.5px ${FONT}`; ctx.textAlign = 'left';
    ctx.lineWidth = 2.4; ctx.lineJoin = 'round'; ctx.strokeStyle = 'rgba(10,18,40,0.85)'; ctx.strokeText(ql, 10, qy);
    ctx.fillStyle = g.quest.done || pop > 0 ? '#ffe27a' : '#fff4dc'; ctx.fillText(ql, 10, qy);
  }

  // 던질 힘
  if (g.state === 'charge') lastPower = g.power;
  const pa = fade('power', g.state === 'charge');
  if (pa > 0.01) { ctx.globalAlpha = pa; gauge(ctx, 'ui_power', W / 2, H - 40, 190, lastPower, 0.105, 0.972); ctx.globalAlpha = 1; }
  const ta = fade('tension', g.state === 'fight');
  if (g.state === 'fight') { lastTension = clamp(g.fight.tension / g.fight.maxTension, 0, 1); lastDist = g.fight.dist; }
  if (ta > 0.01) {
    ctx.globalAlpha = ta;
    const reelT = gearTier(g, 'reel');                                                                 // 장비 외형(릴): 게이지 틀
    if (hasSprite('ui_tension_' + reelT)) gaugeSlot(ctx, 'ui_tension_' + reelT, 'ui_tension_fill', W / 2 - 6, H - 42, 262, lastTension);
    else gauge(ctx, 'ui_tension', W / 2, H - 42, 250, lastTension, 0.118, 0.972);                          // 줄 장력: 빨강까지 차면 끊어진다 (눈이 가는 아래쪽에)
    text(ctx, `${Math.max(0, lastDist).toFixed(0)} m`, W / 2 + 140, H - 42, 10, 'rgba(255,244,220,0.9)', 'left', 600);
    ctx.globalAlpha = 1;
  }
  if (g.state === 'fight') {
    const f = g.fight;
    if (f.surging) text(ctx, '날뛴다! 손을 떼세요', W / 2, H - 64, 12, '#ffd0c0');
    else if (f.tension > 0.8) text(ctx, '줄이 끊어지려 한다!', W / 2, H - 64, 12, '#ff8a7a');
  }
  drawDayClock(ctx, g);
  drawSeaButtons(ctx, g);

  const hint = {
    idle: '꾹 눌러 힘을 모으고 → 떼면 던지기 · 멀리 던질수록 대물',
    charge: '원하는 힘에서 손을 떼세요',
    wait: '찌를 지켜보세요 (서둘러 누르면 도망갑니다)',
    bite: '지금!',
    fight: '누르면 감기 · 떼면 줄 풀기',
  }[g.state];
  if (hint && !(g.msg && g.msg.y) && !g.talk && !g.map && !g.dex && !g.title && !g.panel) {            // 아래쪽에 알림이 떠 있는 동안은 안내를 겹쳐 쓰지 않는다
    // 기다리는 동안과 줄다리기 중에는 안내가 몇 초 뒤 사라져 바다만 남는다
    const fades = g.state === 'wait' || g.state === 'fight';
    const a = fades ? clamp(1 - (g.t - 3.2) / 0.9, 0, 1) : 1;
    if (a > 0.01) { ctx.globalAlpha = a; text(ctx, hint, W / 2, H - 16, 10.5, 'rgba(255,244,220,0.9)', 'center', 600); ctx.globalAlpha = 1; }
  }

  if (!g.panel) drawMsg(ctx, g);

  if (g.result) drawResultCard(ctx, g);
  drawCatchText(ctx, g);
  drawCoins(ctx, g);
}

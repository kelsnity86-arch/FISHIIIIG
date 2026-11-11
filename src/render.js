// 화면 그리기. 목표 화면(assets/concept)의 구도와 레이어를 그대로 쌓는다.
// 보이는 것은 전부 GPT 그림이고, 코드는 움직이고·늘리고·색을 입힐 뿐이다. 예외: 낚싯줄과 글자.
//
// 레이어 (뒤 → 앞)
//   하늘·섬 / 먼 바다 띠 / 물 단면            ← 배경: 카메라가 물러나도 그대로
//   물속 빛살 / 그림자 / 생물의 물속 부분 / 공기방울 / 물속 낚싯줄
//   뒤쪽 파도 / 빛줄기 / 생물의 물 위 부분 / 배·낚시꾼·낚싯대 / 낚싯줄·찌
//   앞쪽 파도 / 물 폭발·몸부림 파도 / 물보라 조각
import { W, H, HORIZON, WL, DEEP, PHASES, COLORS, GRADES } from './config.js';
import { sprite, hasSprite, creatureSprite, tinted } from './assets.js';
import { boatPose, rodPose, surfaceY, mouthPos, leapMouth, leapHeight } from './game.js';

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const easeOut = (k) => 1 - Math.pow(1 - k, 3);
const FONT = 'system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
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
  ctx.lineWidth = Math.max(2, size * 0.22); ctx.lineJoin = 'round';
  ctx.strokeStyle = 'rgba(20,30,60,0.75)'; ctx.strokeText(str, x, y);
  ctx.fillStyle = color; ctx.fillText(str, x, y);
}

// "낚았다!" — 문구는 고정, 등급이 높을수록 글자 연출이 화려해진다
function drawCatchText(ctx, g) {
  const fx = g.catchFx;
  if (!fx) return;
  const gi = fx.gi, grade = GRADES[gi], str = '낚았다!';
  const size = [24, 28, 32, 38, 44, 50][gi];
  const t = performance.now() / 1000;
  const pulse = gi >= 4 ? 1 + 0.04 * Math.sin(t * 6) : 1;
  ctx.save();
  ctx.font = `900 ${size}px ${FONT}`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  const widths = [...str].map((ch) => ctx.measureText(ch).width + size * 0.04);
  const total = widths.reduce((a, b) => a + b, 0);
  const cy = H - 72, mid = W * 0.6;          // 솟구친 생물을 가리지 않게 바다 위쪽에
  let x = mid - total / 2;
  const stagger = gi >= 2 ? 0.07 : 0;
  [...str].forEach((ch, i) => {
    const w = widths[i], age = fx.age - i * stagger;
    const cx = x + w / 2; x += w;
    if (age < 0) return;
    const pop = easeOutBack(Math.min(1, age / 0.3)) * pulse;
    let dy = 0, rot = 0;
    if (gi === 1) dy = -Math.abs(Math.sin(age * 9)) * 7 * Math.exp(-age * 3);            // 통통 튐
    if (gi === 3) { dy = Math.sin(t * 24 + i * 2) * 1.6 * Math.exp(-age * 1.5); rot = Math.sin(t * 20 + i) * 0.05 * Math.exp(-age * 1.5); }  // 떨림
    if (gi >= 4) { dy = Math.sin(t * 5 - i * 0.9) * (gi === 5 ? 5 : 3.5); rot = Math.sin(t * 5 - i * 0.9 + 1) * 0.06; }                      // 물결
    const color = gi === 5 ? `hsl(${(t * 140 + i * 45) % 360},95%,68%)` : grade.color;
    ctx.save();
    ctx.translate(cx, cy + dy); ctx.rotate(rot); ctx.scale(pop, pop);
    if (gi >= 3) { ctx.shadowColor = color; ctx.shadowBlur = (10 + gi * 4) * (0.75 + 0.25 * Math.sin(t * 7)); }
    ctx.lineWidth = size * 0.26; ctx.strokeStyle = COLORS.navy; ctx.strokeText(ch, 0, 0);
    ctx.shadowBlur = 0;
    if (gi >= 4) { ctx.lineWidth = size * 0.11; ctx.strokeStyle = COLORS.cream; ctx.strokeText(ch, 0, 0); }
    const grad = ctx.createLinearGradient(0, -size / 2, 0, size / 2);
    grad.addColorStop(0, gi === 0 ? COLORS.cream : '#ffffff'); grad.addColorStop(0.45, gi === 0 ? COLORS.cream : color); grad.addColorStop(1, gi === 0 ? '#d8cdb0' : color);
    ctx.fillStyle = grad; ctx.fillText(ch, 0, 0);
    ctx.restore();
  });
  // 높은 등급: 글자 주변을 도는 반짝이
  const n = [0, 0, 0, 6, 10, 16][gi];
  if (n) {
    const sp = gi === 5 ? sprite('fx_sparkle') : tinted('fx_sparkle', grade.color, 0.45);
    const show = Math.min(1, fx.age / 0.4);
    for (let i = 0; i < n; i++) {
      const a = t * (0.9 + (i % 3) * 0.25) + i * (Math.PI * 2 / n);
      const sx = mid + Math.cos(a) * (total * 0.62 + 8), sy = cy + Math.sin(a * 1.3) * size * 0.75;
      const sz = (6 + (i % 4) * 2.5) * (0.6 + 0.4 * Math.sin(t * 6 + i)) * show;
      ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 5 + i * 1.7);
      draw(ctx, sp, sx - sz / 2, sy - sz / 2, sz, sz * sp.h / sp.w);
    }
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}

// 판매한 동전이 골드 표시로 날아간다
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

function drawResultCard(ctx, g) {
  const f = g.fish, grade = f.gradeInfo;
  const k = clamp(g.t / 0.3, 0, 1), e = 1 - Math.pow(1 - k, 3);
  const cw = 230, ch = 150, cx = 12, cy = H - ch - 12 + (1 - e) * 26;   // 왼쪽 아래: 생물과 배를 가리지 않는다
  ctx.save();
  ctx.fillStyle = `rgba(14,26,46,${0.4 * e})`; ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = e;
  draw9(ctx, sprite('ui_panel'), cx, cy, cw, ch, 0.3);
  const rib = tinted('ui_ribbon', grade.color, 0.65);
  draw(ctx, rib, cx + 12, cy + 12, 54, 54 * rib.h / rib.w);
  text(ctx, grade.name, cx + 39, cy + 12 + 27 * rib.h / rib.w, 10, '#fff');
  ctx.font = `700 15px ${FONT}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.fillStyle = COLORS.navy; ctx.fillText(f.name, cx + 74, cy + 22);

  const spr = sprite(f.sprite);
  const fit = Math.min(170 / spr.w, 62 / spr.h);
  ctx.save();
  ctx.translate(cx + cw / 2, cy + 68);
  draw(ctx, spr, -spr.w * fit / 2, -spr.h * fit / 2, spr.w * fit, spr.h * fit);
  ctx.restore();

  ctx.font = `600 11px ${FONT}`; ctx.fillStyle = COLORS.navy; ctx.textAlign = 'left';
  // 숫자가 차르르 올라가며 측정된다
  const cu = clamp((g.t - 0.3) / 0.6, 0, 1), count = 1 - Math.pow(1 - cu, 3);
  ctx.fillText(`몸길이 ${(f.meters * count).toFixed(1)} m`, cx + 18, cy + 114);
  ctx.textAlign = 'right';
  if (f.isFantasy) { ctx.fillStyle = '#a06a00'; ctx.fillText(`${f.name}의 증표 획득`, cx + cw - 18, cy + 114); }
  else ctx.fillText(`판매가 ${Math.round(f.price * count).toLocaleString('ko-KR')} G`, cx + cw - 18, cy + 114);
  if (g.t > 1.1) {
    ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(29,43,74,0.6)'; ctx.font = `600 10px ${FONT}`;
    ctx.fillText(f.isFantasy ? '눌러서 놓아주기' : '눌러서 판매하고 계속', cx + cw / 2, cy + ch - 15);
  }

  // 첫 포획 / 신기록 도장: 크게 나타나 쾅 찍힌다
  const r = g.result;
  if (r.stamped) {
    const age = g.t - 1.0, k2 = Math.min(1, age / 0.16);
    const sc = lerp(2.8, 1, 1 - Math.pow(1 - k2, 3));
    const st = hasSprite('fx_stamp') ? tinted('fx_stamp', '#d8483a', 0.95) : tinted('ui_badge_star', '#d8483a', 0.7);
    ctx.save();
    ctx.globalAlpha = e * Math.min(1, k2 * 2);
    ctx.translate(cx + cw - 42, cy + 44); ctx.rotate(-0.22); ctx.scale(sc, sc);
    draw(ctx, st, -24, -24 * st.h / st.w, 48, 48 * st.h / st.w);
    ctx.font = `900 9px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.lineWidth = 2.5; ctx.strokeStyle = '#fff4dc'; ctx.strokeText(r.isNew ? '첫 포획' : '신기록', 0, 0);
    ctx.fillStyle = '#c0392b'; ctx.fillText(r.isNew ? '첫 포획' : '신기록', 0, 0);
    ctx.restore();
  }
  ctx.restore();
}


export function render(ctx, g) {
  const phase = PHASES[g.phase];
  ctx.save();
  if (g.shake > 0.05) ctx.translate(Math.sin(g.time * 61) * g.shake, Math.cos(g.time * 47) * g.shake);

  drawBackdrop(ctx, g);
  if (g.dim > 0.01) { ctx.fillStyle = `rgba(10,18,40,${g.dim})`; ctx.fillRect(-20, -20, W + 40, H + 40); }

  // 세계: 화면보다 큰 생물을 낚아 올릴 때 수면선을 기준으로 물러난다
  const z = g.cam.zoom;
  ctx.save();
  ctx.translate(CAM_X, WL); ctx.scale(z, z); ctx.translate(-CAM_X, -WL);
  const view = { l: CAM_X - CAM_X / z - 12, r: CAM_X + (W - CAM_X) / z + 12 };

  ctx.save();                                   // 수면 아래에만 그리는 것들
  ctx.beginPath(); ctx.rect(view.l, WL - 2, view.r - view.l, (H - WL) / z + 40); ctx.clip();
  drawShafts(ctx, g);
  drawShadow(ctx, g);
  drawLeap(ctx, g, true);
  drawBubbles(ctx, g);
  ctx.restore();

  drawWave(ctx, g, view, -2.5, 0.75, -g.time * 5, false);     // 뒤쪽 파도
  drawRays(ctx, g);
  drawLeap(ctx, g, false);
  drawBulge(ctx, g);
  drawBursts(ctx, g);
  drawBoat(ctx, g);
  drawWave(ctx, g, view, 0, 1, g.time * 9, true);             // 앞쪽 파도 (배 밑동을 가린다)
  drawLineAndFloat(ctx, g, phase);
  drawSprays(ctx, g);
  ctx.restore();

  if (phase.tint) {
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = phase.tint;
    ctx.fillRect(-20, -20, W + 40, H + 40);
    ctx.globalCompositeOperation = 'source-over';
  }
  if (g.flash > 0.01) { ctx.fillStyle = `rgba(255,255,255,${g.flash})`; ctx.fillRect(-20, -20, W + 40, H + 40); }
  ctx.restore();

  drawHud(ctx, g);
}

const wrapX = (v, span) => ((v % span) + span) % span;

// 배경: 하늘·구름·섬, 먼 바다 띠, 물의 단면
function drawBackdrop(ctx, g) {
  const sky = sprite('c_sky');
  draw(ctx, sky, -10, HORIZON - sky.h - 2, W + 20, sky.h + 3);
  const sea = sprite('c_sea');
  draw(ctx, sea, -10, WL - 8, W + 20, H - WL + 18);
  const far = sprite('c_farsea');
  const fx = wrapX(g.time * 2.5, W);
  draw(ctx, far, fx - W, HORIZON - 4, W + 0.5, far.h);
  draw(ctx, far, fx, HORIZON - 4, W + 0.5, far.h);
}

// 수면선 파도: 이어 붙는 띠를 세로 조각으로 그려 수면 높이를 따라 출렁이게 한다.
// 잔잔한 띠 위에, 바다가 거칠어질수록 거친 띠가 겹쳐 나타난다.
// (조각끼리 겹치면 반투명한 부분에 줄무늬가 생기므로 겹치지 않게, 흐름도 조각 경계에 맞춘다)
function drawWave(ctx, g, view, dy, alpha, scroll, front) {
  const STEP = 8, N = W / STEP;
  scroll = Math.round(scroll * 2) / 2;
  //         그림        수면선 위치  높이 배율  진하기
  const layers = [['c_wave', 0.15, 0.62, alpha * (front ? 1 - g.rough * 0.35 : 1 - g.rough * 0.6)]];
  if (!front && g.rough > 0.08) layers.unshift(['c_wave_rough', 0.5, 0.34 + g.rough * 0.1, clamp((g.rough - 0.08) * 1.7, 0, 1)]);
  ctx.imageSmoothingEnabled = true;
  for (const [name, surf, hs, a] of layers) {
    if (a < 0.02) continue;
    const spr = sprite(name), sw = spr.img.width / N, h = spr.h * hs;
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
  const w = s.len * d.span, h = w * spr.h / spr.w;
  const depth = clamp(s.y / DEEP, 0, 1);
  ctx.save();
  ctx.translate(s.x, WL + s.y);
  ctx.scale(s.face > 0 ? -1 : 1, 1);            // 그림은 왼쪽을 본다
  ctx.rotate(-s.pitch * d.tilt);
  ctx.imageSmoothingEnabled = true;
  ctx.globalCompositeOperation = 'multiply';     // 물을 어둡게
  ctx.globalAlpha = lerp(0.8, 0.45, depth) * s.vis * alpha;   // 목표 화면처럼 물빛이 비쳐 보이는 농도
  ctx.drawImage(spr.img, -w / 2, -h / 2, w, h);
  ctx.globalCompositeOperation = 'source-over';  // 형태가 또렷이 읽히도록 한 번 더 옅게
  ctx.globalAlpha = lerp(0.1, 0.03, depth) * s.vis * alpha;
  ctx.drawImage(spr.img, -w / 2, -h / 2, w, h);
  ctx.restore();
}

function drawShadow(ctx, g) {
  const s = g.sw;
  if (!s || s.vis < 0.01) return;
  const one = (pose, alpha) => {
    if (pose !== 'swim') return drawShadowPose(ctx, s, 'c_shadow_' + pose, pose, alpha);
    // 헤엄: 꼬리 박자에 맞춰 4동작을 이어 넘긴다
    const ph = wrapX(s.tail / (Math.PI * 2), 1) * 4, i = Math.floor(ph), f = ph - i;
    const k = f * f * (3 - 2 * f);
    drawShadowPose(ctx, s, 'c_shadow_swim_' + (i + 1), 'swim', alpha * (1 - k));
    drawShadowPose(ctx, s, 'c_shadow_swim_' + ((i + 1) % 4 + 1), 'swim', alpha * k);
  };
  if (s.prevPose && s.mix < 1) one(s.prevPose, 1 - s.mix);
  one(s.pose, s.prevPose ? s.mix : 1);
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
  const spr = tinted('c_rays', '#ffc860', 0.55), size = c.lw * 1.7 * c.scale, lh = leapHeight(c);
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
const FLOP = [[0, 0, 0], [-0.22, -0.05, 1], [0, 0, 0], [0.2, -0.03, 1]];   // 기울기, 튀는 높이(몸길이 대비), 표정
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
    const step = FLOP[Math.floor(c.popT * 5) % 4];
    const flop = c.phase === 'leap' || c.phase === 'hang';
    const f = g.fish, spr = sprite(flop && step[2] ? f.sprite2 : f.sprite);
    const pop = Math.min(1, c.popT / 0.12), over = 1 + 0.35 * Math.sin(Math.min(1, c.popT / 0.3) * Math.PI);   // 뿅: 톡 튀어나오며 잠깐 부푼다
    const w = c.lw * c.scale * pop * over, h = w * spr.h / spr.w;
    ctx.imageSmoothingEnabled = false;             // 도트는 네모 그대로
    ctx.globalAlpha = c.alpha;
    ctx.translate(c.x, c.y + (flop ? step[1] * c.lw : 0));
    ctx.rotate(c.rot + (flop ? step[0] : 0));
    ctx.drawImage(spr.img, -w / 2, -h / 2, w, h);
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
  const w = c.lw * 0.85 * (0.45 + 0.55 * k), h = w * spr.h / spr.w * (0.35 + 0.65 * k);
  ctx.save();
  ctx.globalAlpha = a * Math.min(1, k * 3);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(spr.img, c.hitX - w / 2, surfaceY(g, c.hitX) + h * 0.4 - h, w, h);
  ctx.restore();
}

function drawBoat(ctx, g) {
  const pose = rodPose(g), b = pose.boat;
  const boat = sprite('c_boat_' + b.pose), rod = sprite('c_rod');
  ctx.save();
  ctx.translate(b.x, b.y); ctx.rotate(b.rot);
  draw(ctx, boat, -boat.w / 2, -boat.h);
  if (g.boat.spray > 0.04) {                 // 끌려갈 때 뱃머리 물살
    const sp = sprite('c_bowspray_2'), k = 0.6 + g.boat.spray * 0.6;
    ctx.globalAlpha = clamp(g.boat.spray * 1.5, 0, 1);
    draw(ctx, sp, -boat.w / 2 - sp.w * k * 0.75, -sp.h * k - 0.5, sp.w * k, sp.h * k);
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
function drawLineAndFloat(ctx, g, phase) {
  const tip = rodPose(g).tip, bob = g.bob, c = g.catch;
  const tension = g.fight ? g.fight.tension : (c && c.phase !== 'stow' ? 0.5 : 0);
  const fl = sprite('c_float'), WATER = 0.27;          // 찌 그림에서 수면이 걸리는 높이
  const [r, gg, b] = lineColor(tension);
  const stroke = (pts, sag, alpha, width) => {
    const [p0, p1] = pts, d = Math.hypot(p1.x - p0.x, p1.y - p0.y);
    let cx = (p0.x + p1.x) / 2, cy = (p0.y + p1.y) / 2 + d * sag;
    if (tension > 0.8) { const j = Math.sin(g.time * 95) * 2 * (tension - 0.8) / 0.2; cy += j; cx += j * 0.4; }
    const path = (dy) => { ctx.beginPath(); ctx.moveTo(p0.x, p0.y + dy); ctx.quadraticCurveTo(cx, cy + dy, p1.x, p1.y + dy); };
    ctx.lineCap = 'round';
    ctx.strokeStyle = `rgba(${r},${gg},${b},${0.25 * alpha})`; ctx.lineWidth = width * 3; path(0); ctx.stroke();   // 빛 번짐
    ctx.strokeStyle = `rgba(${r},${gg},${b},${alpha})`; ctx.lineWidth = width; path(0); ctx.stroke();
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
    const m = c.phase === 'stow' ? { x: c.x, y: c.y } : leapMouth(c, leapHeight(c));
    const at = stroke([tip, m], -0.03, 1, 1.1);
    const p = at(0.24), q = at(0.28);
    drawFloat(p.x, p.y, Math.atan2(q.y - p.y, q.x - p.x) + Math.PI / 2, false);
    return;
  }
  const hooked = g.state === 'fight' || g.state === 'hook' || (c && c.phase === 'pull');
  if (hooked && g.sw) {
    // 걸린 뒤: 줄이 수면을 가르고 물속 주둥이까지 이어진다. 찌는 그 자리에 끌려 잠긴다.
    const sy = surfaceY(g, bob.x), entry = { x: bob.x, y: sy };
    stroke([entry, mouthPos(g)], 0, 0.45, 0.9);
    stroke([tip, entry], 0.05 * Math.pow(1 - clamp(tension, 0, 1), 2), 1, 1.1);
    drawFloat(bob.x, sy + bob.dip, Math.sin(g.time * 9) * 0.25, true);
    return;
  }
  const wet = bob.inWater;
  const fy = wet ? bob.y : bob.y;
  const top = { x: bob.x, y: wet ? fy - fl.h * WATER + bob.dip : fy - fl.h * 0.2 };
  stroke([tip, top], g.state === 'wait' || g.state === 'bite' ? 0.045 : g.state === 'cast' ? -0.04 : 0, 1, 1.1);
  drawFloat(bob.x, wet ? fy + bob.dip + Math.sin(g.time * 2.3) * 0.5 : fy, wet ? Math.sin(g.time * 1.7) * 0.07 : 0, wet);
}

// 수면에서 터지는 큰 물 덩어리 (몸부림 파도, 물 폭발): 솟았다가 가라앉으며 사라진다
function drawBursts(ctx, g) {
  // 낚아 올린 몸의 밑동: 물이 솟구쳐 올라 계속 끓는다 (목표 화면 3)
  const c = g.catch;
  if (c && (c.phase === 'leap' || c.phase === 'hang')) {
    const spr = sprite('c_erupt'), t = performance.now() / 1000;
    const grow = c.phase === 'leap' ? easeOut(Math.min(1, c.out * 2.2)) : 1;
    const settle = c.phase === 'hang' ? 0.62 + 0.04 * Math.sin(t * 3.1) : 1;
    const w = c.lw * 0.8 * (0.7 + 0.3 * grow) * (1 + 0.015 * Math.sin(t * 5.3)), h = w * spr.h / spr.w * (0.25 + 0.75 * grow) * settle;
    const x = c.ex - c.lw * 0.16;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(spr.img, x - w / 2, surfaceY(g, x) + 6 - h, w, h);
  }
  for (const b of g.bursts) {
    const spr = sprite(b.sprite), k = b.age / b.life;
    const grow = easeOut(Math.min(1, k * 3.2));
    const w = b.size * (0.55 + 0.45 * grow), h = w * spr.h / spr.w * (0.3 + 0.7 * grow);
    ctx.save();
    ctx.globalAlpha = k < 0.55 ? 1 : 1 - (k - 0.55) / 0.45;
    ctx.translate(b.x, surfaceY(g, b.x) + 4 + k * k * 10);
    if (b.flip) ctx.scale(-1, 1);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(spr.img, -w / 2, -h, w, h);
    ctx.restore();
  }
}

// 날아가는 물보라 조각
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

function drawHud(ctx, g) {
  draw(ctx, sprite('icon_gold'), 8, 8, 15, 15);
  text(ctx, Math.round(g.goldShown).toLocaleString('ko-KR'), 28, 16.5, 12, COLORS.cream, 'left');

  if (g.state === 'charge') text(ctx, `힘 ${Math.round(g.power * 100)}%`, W / 2, H - 34, 12, COLORS.cream);
  if (g.state === 'fight') {
    const f = g.fight;
    text(ctx, `남은 거리 ${Math.max(0, f.dist).toFixed(0)}m`, W / 2, 20, 11, COLORS.cream);
    if (f.surging) text(ctx, '날뛴다! 손을 떼세요', W / 2, 40, 13, '#ffd0c0');
    else if (f.tension > 0.8) text(ctx, '줄이 끊어지려 한다!', W / 2, 40, 13, '#ff8a7a');
  }

  const hint = {
    idle: '꾹 눌러 힘 조절 → 떼면 던지기',
    charge: '원하는 힘에서 손을 떼세요',
    wait: '찌를 지켜보세요 (성급하게 누르면 도망갑니다)',
    bite: '지금!',
    fight: '누르면 감기 · 떼면 줄 풀기',
  }[g.state];
  if (hint) text(ctx, hint, W / 2, H - 16, 11, 'rgba(255,244,220,0.92)', 'center', 600);

  if (g.msg) {
    const k = g.msg.age / 1.4;
    ctx.globalAlpha = clamp((1 - k) * 3, 0, 1);
    text(ctx, g.msg.text, W / 2, 100 - k * 14, 20, g.msg.color);
    ctx.globalAlpha = 1;
  }

  if (g.state === 'result') drawResultCard(ctx, g);
  drawCatchText(ctx, g);
  drawCoins(ctx, g);
}

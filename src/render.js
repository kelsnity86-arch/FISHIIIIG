// 화면 그리기. 보이는 것은 전부 GPT 그림(assets.js 스프라이트)이고, 코드는 움직이고·늘리고·색을 입힐 뿐이다.
// 예외: 낚싯줄(매 순간 모양이 바뀌는 선)과 글자.
import { W, H, HORIZON, BOAT_X, BOAT_Y, LANE_Y, PERSON_SCALE, PHASES, COLORS, FIGHT, Z_SQUASH } from './config.js';
import { sprite, creatureSprite, shadowSprite, tinted } from './assets.js';
import { boatPose, rodPose, toScreen } from './game.js';
import { visibleLen } from './swim.js';

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const FONT = 'system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';

function draw(ctx, spr, x, y, w = spr.w, h = spr.h) {
  ctx.imageSmoothingEnabled = spr.smooth;
  ctx.drawImage(spr.img, x, y, w, h);
}

// 그림 1장을 세로 조각으로 나눠 휘게 그린다. 원점 = 그림 중심, 머리는 왼쪽.
//   amp   : 꼬리 쪽일수록 커지는 헤엄 물결
//   curve : 몸 전체가 C자로 휘는 정도(돌아설 때)
//   shake : 머리 털기
function drawBendy(ctx, spr, len, phase, amp, curve = 0, shake = 0, time = 0) {
  const n = 32, hgt = len * spr.h / spr.w;
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

export function render(ctx, g) {
  const phase = PHASES[g.phase];
  ctx.save();
  ctx.translate(-g.cam.x, 0);
  if (g.shake > 0.05) ctx.translate(Math.sin(g.time * 61) * g.shake, Math.cos(g.time * 47) * g.shake);

  drawSkyAndSea(ctx, g);
  drawShadow(ctx, g);
  drawRipples(ctx, g);
  drawSlap(ctx, g);
  drawBreach(ctx, g);
  drawBoat(ctx, g);      // 배는 항상 위에: 거대한 몸 앞에 조그만 배가 보여야 크기가 실감난다
  drawBursts(ctx, g);
  drawParticles(ctx, g);

  if (phase.tint) {
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = phase.tint;
    ctx.fillRect(-40, -20, W + 80, H + 40);
    ctx.globalCompositeOperation = 'source-over';
  }

  // 낚싯줄·찌·감정 아이콘은 색 보정 뒤에 그려 항상 또렷하게
  drawLineAndFloat(ctx, g, phase);
  drawEmote(ctx, g);
  ctx.restore();

  drawHud(ctx, g);
}

const wrapX = (v, span) => ((v % span) + span) % span;

function drawSkyAndSea(ctx, g) {
  const scroll = g.boat.scroll;
  draw(ctx, sprite('bg_sky'), -40, -10, W + 80, HORIZON + 12);

  for (let i = 0; i < 6; i++) {
    const spr = sprite('cloud_' + (i + 1));
    const speed = 2 + (i % 3) * 1.2, scale = 0.8 + (i * 37 % 10) / 12;
    const span = W + 200;
    const x = wrapX(i * 131 - g.time * speed + scroll * 0.08, span) - 120;
    draw(ctx, spr, x, 10 + (i * 53 % 75), spr.w * scale, spr.h * scale);
  }

  // 수평선 풍경: 배가 끌려가면 천천히 밀린다 (좌우로 이어 그려 끊김 없게)
  const bg = sprite('bg_region1');
  const bx = wrapX(scroll * 0.12, W);
  draw(ctx, bg, bx - W, HORIZON - bg.h, W, bg.h);
  draw(ctx, bg, bx, HORIZON - bg.h, W, bg.h);

  draw(ctx, sprite('bg_sea'), -40, HORIZON - 1, W + 80, H - HORIZON + 22);

  // 파도 줄무늬: 멀수록 작고 느리게
  const rows = 14;
  for (let r = 0; r < rows; r++) {
    const p = Math.pow((r + 0.6) / rows, 1.5);
    const y = HORIZON + 3 + p * (H - HORIZON - 6);
    const spr = sprite('wave_' + (p < 0.25 ? 1 : p < 0.6 ? 2 : 3));
    const len = 14 + p * 70, hgt = len * spr.h / spr.w;
    const gap = 90 + p * 160;
    const shift = g.time * (2 + p * 9) + r * 97 + scroll * (0.3 + p);
    ctx.globalAlpha = 0.25 + p * 0.5;
    for (let x = -wrapX(shift, gap) - gap; x < W + gap; x += gap) {
      const xx = x + ((r * 7919) % 53) + Math.sin(g.time * 0.8 + r) * 3;
      draw(ctx, spr, xx, y + Math.sin(g.time * 1.4 + r * 1.7 + x * 0.01) * (0.4 + p), len, hgt);
    }
  }
  ctx.globalAlpha = 1;
}

// 그림자: 버퍼에 휘어 그린 뒤, 평면 위 방향으로 돌리고 비스듬히 눌러서 찍는다.
// 깊을수록 작고·흐리고·번진다.
const shadowBuf = document.createElement('canvas');
shadowBuf.width = 360; shadowBuf.height = 160;
const shadowCtx = shadowBuf.getContext('2d');

function drawShadow(ctx, g) {
  const s = g.sw;
  if (!s || s.vis < 0.01) return;
  const spr = shadowSprite();
  const inner = shadowBuf.width * 0.86;
  const turn = clamp(s.turnRate / s.maxTurn, -1, 1);
  shadowCtx.setTransform(1, 0, 0, 1, 0, 0);
  shadowCtx.clearRect(0, 0, shadowBuf.width, shadowBuf.height);
  shadowCtx.translate(shadowBuf.width / 2, shadowBuf.height / 2);
  drawBendy(shadowCtx, spr, inner, s.tail, inner * s.tailAmp, -turn * inner * 0.12, s.shake, g.time);

  const len = visibleLen(s), k = len / inner;
  const p = toScreen(s.x, s.z, s.depth);
  ctx.save();
  ctx.globalAlpha = lerp(0.5, 0.1, s.depth) * s.vis;
  if (s.depth > 0.15) ctx.filter = `blur(${(s.depth * 2.2).toFixed(1)}px)`;
  ctx.imageSmoothingEnabled = true;
  ctx.translate(p.x, p.y);
  ctx.scale(1, Z_SQUASH);
  ctx.rotate(s.heading - Math.PI);      // 그림은 왼쪽을 본다 → 헤엄치는 방향으로 회전 (뒤집지 않음)
  ctx.drawImage(shadowBuf, -shadowBuf.width * k / 2, -shadowBuf.height * k / 2, shadowBuf.width * k, shadowBuf.height * k);
  ctx.restore();
}

function drawRipples(ctx, g) {
  const spr = sprite('fx_ring');
  for (const r of g.ripples) {
    const k = r.age / r.life, rad = r.size * (0.3 + k * 1.6);
    ctx.globalAlpha = (1 - k) * 0.8;
    draw(ctx, spr, r.x - rad, r.y - rad * spr.h / spr.w, rad * 2, rad * 2 * spr.h / spr.w);
  }
  ctx.globalAlpha = 1;
}

// 수면 치기: 등·꼬리 일부만 수면 위로 드러난다
function drawSlap(ctx, g) {
  const sl = g.fight && g.fight.slap;
  if (!sl) return;
  const f = g.fish, spr = creatureSprite(f.sprite);
  const p = toScreen(sl.x, sl.z);
  const len = Math.min(f.len, 520), hgt = len * spr.h / spr.w;
  const rise = Math.sin(clamp(sl.age / 0.9, 0, 1) * Math.PI) * hgt * 0.45;
  ctx.save();
  ctx.beginPath(); ctx.rect(-40, -20, W + 80, p.y + 20); ctx.clip();
  ctx.translate(p.x, p.y + hgt / 2 - rise);
  ctx.scale(-sl.dir, 1);
  ctx.rotate(0.15 * Math.sin(sl.age * 7));
  drawBendy(ctx, spr, len, g.time * 9, len * 0.03);
  ctx.restore();
}

function drawBoat(ctx, g) {
  const pose = rodPose(g), b = pose.boat;
  const boat = sprite('boat_1'), person = sprite('char_sea'), rod = sprite('rod_1');
  const waterline = boat.h * 0.7;

  // 수면 반사
  ctx.save();
  ctx.translate(b.x, BOAT_Y + 1); ctx.scale(1, -0.55); ctx.rotate(-b.rot);
  ctx.globalAlpha = 0.22;
  draw(ctx, boat, -boat.w / 2 + Math.sin(g.time * 3) * 0.6, -waterline);
  ctx.restore();

  // 사람 (기울기로 동작 표현)
  ctx.save();
  ctx.translate(b.x, b.y); ctx.rotate(b.rot);
  ctx.save();
  ctx.translate(5, -waterline + 3); ctx.rotate(g.lean); ctx.scale(PERSON_SCALE, PERSON_SCALE);
  draw(ctx, person, -person.w / 2, -person.h);
  ctx.restore();
  draw(ctx, boat, -boat.w / 2, -waterline);
  ctx.restore();

  // 낚싯대: 곧은 그림을 곡선을 따라 조각내어 휘게 그린다
  const n = 12;
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
    ctx.drawImage(rod.img, i * sw, 0, sw, rod.img.height, 0, -rod.h / 2, seg + 0.4, rod.h);
    ctx.restore();
  }
}

function drawBreach(ctx, g) {
  if (g.state !== 'breach' || g.breach.y === undefined) return;
  const br = g.breach, f = g.fish;
  const spr = creatureSprite(f.sprite, true);   // 낚여 올라올 때는 놀란 표정
  ctx.save();
  ctx.beginPath(); ctx.rect(-40, -400, W + 80, br.waterY + 401); ctx.clip(); // 수면 아래는 가린다
  ctx.translate(br.x, br.y); ctx.scale(-1, 1); ctx.rotate(br.angle);         // 오른쪽(배 쪽)을 보도록
  drawBendy(ctx, spr, f.len, g.time * 9, f.len * 0.028);
  ctx.restore();
  // 수면과 만나는 자리의 거품
  if (br.y < br.waterY + br.sink && br.y > br.waterY - f.len * 0.5) {
    const foam = sprite('fx_foam');
    const w = f.len * 0.32, n = Math.round(clamp(f.len / 30, 9, 40)), big = clamp(f.len / 300, 1, 3);
    for (let i = 0; i < n; i++) {
      const x = br.x + (i / (n - 1) - 0.5) * w * 2 + Math.sin(g.time * 7 + i) * 3;
      const sz = (10 + (i % 3) * 5) * big;
      draw(ctx, foam, x - sz / 2, br.waterY - sz * 0.6, sz, sz);
    }
  }
}

function drawBursts(ctx, g) {
  for (const b of g.bursts) {
    const spr = sprite(b.sprite), k = b.age / b.life;
    const grow = 1 - Math.pow(1 - Math.min(1, k * 2.2), 3);
    const w = b.size * (0.5 + 0.5 * grow), h = w * spr.h / spr.w * (b.sprite === 'fx_column' ? 0.3 + 0.7 * grow : 1);
    ctx.globalAlpha = clamp((1 - k) * 2, 0, 1);
    draw(ctx, spr, b.x - w / 2, b.y - h * 0.9, w, h);
  }
  ctx.globalAlpha = 1;
}

function drawParticles(ctx, g) {
  const spr = sprite('fx_drop');
  for (const p of g.particles) {
    const k = 1 - p.age / p.life;
    const s = p.size * 3.2 * (0.6 + k * 0.4);
    ctx.globalAlpha = 0.4 + k * 0.6;
    draw(ctx, spr, p.x - s / 2, p.y - s * 0.65, s, s * spr.h / spr.w);
  }
  ctx.globalAlpha = 1;
}

function lineColor(t) {
  const mix = (a, b, k) => a.map((v, i) => Math.round(lerp(v, b[i], clamp(k, 0, 1))));
  let c = COLORS.lineSafe;
  if (t > 0.55) c = mix(COLORS.lineSafe, COLORS.lineWarn, (t - 0.55) / 0.2);
  if (t > 0.8) c = mix(COLORS.lineWarn, COLORS.lineDanger, (t - 0.8) / 0.15);
  return c;
}

function drawLineAndFloat(ctx, g, phase) {
  const pose = rodPose(g), tip = pose.tip, bob = g.bob;
  const tension = g.fight ? g.fight.tension : 0;
  const fl = sprite('float_1');
  const wet = bob.inWater || g.state === 'fight';
  const end = { x: bob.x, y: wet ? bob.y - 2 + Math.min(bob.dip, 3) : bob.y - fl.h / 2 };

  // 처짐: 느슨하면 아래로 처지고 팽팽하면 직선
  const dist = Math.hypot(end.x - tip.x, end.y - tip.y);
  let sag = 0;
  if (g.state === 'wait' || g.state === 'bite') sag = dist * 0.09;
  else if (g.state === 'fight') sag = dist * 0.09 * Math.pow(1 - clamp(tension, 0, 1), 2);
  else if (g.state === 'cast') sag = -dist * 0.05;
  let cx = (tip.x + end.x) / 2, cy = (tip.y + end.y) / 2 + sag;
  if (tension > 0.8) { // 끊어지기 직전 떨림
    const j = Math.sin(g.time * 95) * 2.2 * (tension - 0.8) / 0.2;
    cy += j; cx += j * 0.4;
  }
  const path = (dy) => {
    ctx.beginPath(); ctx.moveTo(tip.x, tip.y + dy); ctx.quadraticCurveTo(cx, cy + dy, end.x, end.y + dy);
  };
  const [r, gg, b] = lineColor(tension);
  ctx.lineCap = 'round';
  if (phase.glow) { ctx.strokeStyle = `rgba(${r},${gg},${b},0.22)`; ctx.lineWidth = 3.4; path(0); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(22,34,66,0.55)'; ctx.lineWidth = 1; path(0.9); ctx.stroke();   // 아래쪽 어두운 선
  ctx.strokeStyle = `rgb(${r},${gg},${b})`; ctx.lineWidth = 1.15; path(0); ctx.stroke(); // 밝은 선

  // 찌
  ctx.save();
  if (wet) {
    ctx.beginPath(); ctx.rect(bob.x - 10, bob.y - 30, 20, 30.5); ctx.clip(); // 잠긴 부분은 가린다
    ctx.translate(bob.x, bob.y + bob.dip + Math.sin(g.time * 2.3) * 0.7);
    ctx.rotate(Math.sin(g.time * 1.7) * 0.08);
    draw(ctx, fl, -fl.w / 2, -fl.h * 0.6);
  } else {
    ctx.translate(bob.x, bob.y);
    draw(ctx, fl, -fl.w / 2, -fl.h / 2);
  }
  ctx.restore();
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

// 가로 게이지: 틀 그림 + 색을 입힌 버튼 그림을 비율만큼 잘라 채운다
function gauge(ctx, x, y, w, h, value, color) {
  const pad = h * 0.22;
  ctx.save();
  ctx.beginPath(); ctx.rect(x + pad, y, (w - pad * 2) * clamp(value, 0, 1), h); ctx.clip();
  draw9(ctx, tinted('ui_button', color, 0.7), x + pad, y + pad, w - pad * 2, h - pad * 2);
  ctx.restore();
  draw9(ctx, sprite('ui_gauge'), x, y, w, h);
}

function drawHud(ctx, g) {
  draw(ctx, sprite('icon_gold'), 8, 8, 15, 15);
  text(ctx, g.gold.toLocaleString('ko-KR'), 28, 16.5, 12, COLORS.cream, 'left');

  if (g.state === 'charge') {
    gauge(ctx, BOAT_X - 30 - g.cam.x, BOAT_Y - 62, 60, 13, g.power, `rgb(255,${Math.round(230 - g.power * 110)},90)`);
  }

  if (g.state === 'fight') {
    const f = g.fight;
    const bw = 250, bx = (W - bw) / 2, by = 16;
    gauge(ctx, bx, by, bw, 18, f.dist / (f.dist0 * 1.2), '#6cd0e8');
    text(ctx, `남은 거리 ${Math.max(0, f.dist).toFixed(0)}m`, W / 2, by + 28, 10, COLORS.cream);

    // 장력: 세로로 세운 게이지. 안전 구간은 초록 띠.
    const tx = W - 22, ty = 80, th = 190;
    ctx.save();
    ctx.translate(tx, ty + th); ctx.rotate(-Math.PI / 2);
    const lo = FIGHT.safeLow / f.maxTension, hi = FIGHT.safeHigh / f.maxTension;
    ctx.save(); ctx.globalAlpha = 0.55;
    ctx.beginPath(); ctx.rect(th * lo, -9, th * (hi - lo), 18); ctx.clip();
    draw9(ctx, tinted('ui_button', '#78dc8c', 0.8), 0, -6, th, 12);
    ctx.restore();
    const [r, gg, b] = lineColor(f.tension);
    gauge(ctx, 0, -9, th, 18, f.tension / f.maxTension, `rgb(${r},${gg},${b})`);
    ctx.restore();
    text(ctx, '장력', tx, ty - 12, 10, COLORS.cream);
    if (f.surging) text(ctx, '날뛴다! 손을 떼세요', W / 2, 62, 12, '#ffd0c0');
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
    text(ctx, g.msg.text, W / 2, 120 - k * 14, 20, g.msg.color);
    ctx.globalAlpha = 1;
  }

  if (g.state === 'result') drawResultCard(ctx, g);
}

function drawResultCard(ctx, g) {
  const f = g.fish, grade = f.gradeInfo;
  const k = clamp(g.t / 0.3, 0, 1), e = 1 - Math.pow(1 - k, 3);
  const cw = 270, ch = 168, cx = (W - cw) / 2, cy = (H - ch) / 2 - 6 + (1 - e) * 26;
  ctx.save();
  ctx.fillStyle = `rgba(14,26,46,${0.4 * e})`; ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = e;
  draw9(ctx, sprite('ui_panel'), cx, cy, cw, ch, 0.3);
  const rib = tinted('ui_ribbon', grade.color, 0.65);
  draw(ctx, rib, cx + 12, cy + 12, 54, 54 * rib.h / rib.w);
  text(ctx, grade.name, cx + 39, cy + 12 + 27 * rib.h / rib.w, 10, '#fff');
  ctx.font = `700 15px ${FONT}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.fillStyle = COLORS.navy; ctx.fillText(f.name, cx + 74, cy + 22);

  const spr = creatureSprite(f.sprite);
  const fit = Math.min(200 / spr.w, 70 / spr.h);
  ctx.save();
  ctx.translate(W / 2, cy + 78);
  drawBendy(ctx, spr, spr.w * fit, g.time * 3, spr.w * fit * 0.015);
  ctx.restore();

  ctx.font = `600 11px ${FONT}`; ctx.fillStyle = COLORS.navy; ctx.textAlign = 'left';
  ctx.fillText(`몸길이 ${f.meters.toFixed(1)} m`, cx + 18, cy + 128);
  ctx.textAlign = 'right';
  if (f.isFantasy) { ctx.fillStyle = '#a06a00'; ctx.fillText(`${f.name}의 증표 획득`, cx + cw - 18, cy + 128); }
  else ctx.fillText(`판매가 ${f.price.toLocaleString('ko-KR')} G`, cx + cw - 18, cy + 128);
  ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(29,43,74,0.6)'; ctx.font = `600 10px ${FONT}`;
  ctx.fillText(f.isFantasy ? '눌러서 놓아주기' : '눌러서 판매하고 계속', W / 2, cy + ch - 18);
  ctx.restore();
}

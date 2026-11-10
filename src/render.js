// 화면 그리기. 그림은 전부 assets.js 의 스프라이트를 통해 그리므로,
// 실제 에셋 파일이 들어오면 이 코드 수정 없이 교체된다.
// (예외로 코드가 직접 그리는 것: 하늘·바다 바탕색, 파도 줄무늬(임시), 낚싯줄, 물방울, 게이지, 글자)
import { W, H, HORIZON, BOAT_X, BOAT_Y, LANE_Y, PERSON_SCALE, PHASES, COLORS, FIGHT } from './config.js';
import { sprite, creatureSprite, shadowSprite } from './assets.js';
import { boatPose, rodPose, shadowLen } from './game.js';

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const FONT = 'system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';

function draw(ctx, spr, x, y, w = spr.w, h = spr.h) {
  ctx.imageSmoothingEnabled = spr.smooth;
  ctx.drawImage(spr.img, x, y, w, h);
}

// 그림 1장을 세로 조각으로 나눠 물결치듯 휘게 그린다 (헤엄·퍼덕임).
// 원점 = 그림 중심, 머리는 왼쪽. 꼬리 쪽일수록 크게 흔들린다.
function drawBendy(ctx, spr, len, phase, amp) {
  const n = 28, hgt = len * spr.h / spr.w;
  const sw = spr.img.width / n, dw = len / n;
  ctx.imageSmoothingEnabled = spr.smooth;
  for (let i = 0; i < n; i++) {
    const k = i / (n - 1);
    const off = Math.sin(phase - k * 4.2) * amp * (0.15 + k * 0.85);
    ctx.drawImage(spr.img, i * sw, 0, sw, spr.img.height, -len / 2 + i * dw, -hgt / 2 + off, dw + 0.6, hgt);
  }
}

export function render(ctx, g) {
  const phase = PHASES[g.phase];
  ctx.save();
  if (g.shake > 0.05) ctx.translate(Math.sin(g.time * 61) * g.shake, Math.cos(g.time * 47) * g.shake);

  drawSkyAndSea(ctx, g);
  drawShadow(ctx, g);
  drawRipples(ctx, g);
  drawBreach(ctx, g);
  drawBoat(ctx, g);      // 배는 항상 위에: 거대한 몸 앞에 조그만 배가 보여야 크기가 실감난다
  drawParticles(ctx, g);

  if (phase.tint) {
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = phase.tint;
    ctx.fillRect(-10, -10, W + 20, H + 20);
    ctx.globalCompositeOperation = 'source-over';
  }

  // 낚싯줄·찌·감정 아이콘은 색 보정 뒤에 그려 항상 또렷하게
  drawLineAndFloat(ctx, g, phase);
  drawEmote(ctx, g);
  ctx.restore();

  drawHud(ctx, g);
}

function drawSkyAndSea(ctx, g) {
  let grad = ctx.createLinearGradient(0, 0, 0, HORIZON);
  grad.addColorStop(0, '#a9dde6'); grad.addColorStop(1, '#c6ebee');
  ctx.fillStyle = grad; ctx.fillRect(-10, -10, W + 20, HORIZON + 10);

  for (let i = 0; i < 5; i++) {
    const spr = sprite('cloud_' + (i % 3 + 1));
    const speed = 2 + (i % 3) * 1.2, scale = 0.7 + (i * 37 % 10) / 14;
    const x = ((i * 173 - g.time * speed) % (W + 120) + (W + 120)) % (W + 120) - 90;
    draw(ctx, spr, x, 14 + (i * 53 % 80), spr.w * scale, spr.h * scale);
  }

  const bg = sprite('bg_region1');
  draw(ctx, bg, 0, HORIZON - bg.h);

  grad = ctx.createLinearGradient(0, HORIZON, 0, H);
  grad.addColorStop(0, '#8fcbd9'); grad.addColorStop(1, '#74b9d2');
  ctx.fillStyle = grad; ctx.fillRect(-10, HORIZON, W + 20, H - HORIZON + 10);
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(-10, HORIZON, W + 20, 1);

  // 파도 줄무늬: 멀수록 작고 느리게 (임시, bg_wave 에셋으로 교체 예정)
  const rows = 15;
  for (let r = 0; r < rows; r++) {
    const p = Math.pow((r + 0.6) / rows, 1.5);
    const y = HORIZON + 3 + p * (H - HORIZON - 6);
    const len = 5 + p * 30, gap = 70 + p * 150;
    const shift = g.time * (2 + p * 9) + r * 97;
    for (let x = -((shift % gap) + gap); x < W + gap; x += gap) {
      const xx = x + ((r * 7919) % 53) + Math.sin(g.time * 0.8 + r) * 3;
      ctx.fillStyle = `rgba(240,252,255,${0.22 + p * 0.38})`;
      ctx.fillRect(xx, y + Math.sin(g.time * 1.4 + r * 1.7 + x * 0.01) * (0.4 + p), len, 0.8 + p * 1.1);
      ctx.fillStyle = `rgba(70,140,180,${0.15 + p * 0.2})`;
      ctx.fillRect(xx + len * 0.5 + gap * 0.45, y + 2 + p * 2, len * 0.8, 0.8 + p);
    }
  }
}

// 그림자는 반투명이라 조각 이음매가 보이지 않도록, 작은 버퍼에 먼저 그린 뒤 한 번에 찍는다.
const shadowBuf = document.createElement('canvas');
shadowBuf.width = 320; shadowBuf.height = 120;
const shadowCtx = shadowBuf.getContext('2d');

function drawShadow(ctx, g) {
  if (!g.fish || g.shadow.vis < 0.01) return;
  const d = g.shadow.depth;
  const spr = shadowSprite(g.fish.shape);
  const len = shadowLen(g);
  const bw = shadowBuf.width, bh = shadowBuf.height, inner = bw * 0.9;
  shadowCtx.setTransform(1, 0, 0, 1, 0, 0);
  shadowCtx.clearRect(0, 0, bw, bh);
  shadowCtx.translate(bw / 2, bh / 2);
  drawBendy(shadowCtx, spr, inner, g.time * 3.2, inner * 0.035);
  const k = len / inner;
  ctx.save();
  ctx.globalAlpha = lerp(0.42, 0.07, d) * g.shadow.vis;
  ctx.imageSmoothingEnabled = true;
  ctx.translate(g.shadow.x, LANE_Y + 8 + d * 20 + Math.min(40, len * 0.04));
  ctx.scale(-g.shadow.dir, 1);   // 그림은 왼쪽을 보므로 오른쪽을 볼 때 뒤집는다
  ctx.drawImage(shadowBuf, -bw * k / 2, -bh * k * 0.42 / 2, bw * k, bh * k * 0.42);
  ctx.restore();
}

function drawRipples(ctx, g) {
  ctx.lineWidth = 1;
  for (const r of g.ripples) {
    const k = r.age / r.life, rad = r.size * (0.3 + k * 1.6);
    ctx.strokeStyle = `rgba(255,255,255,${(1 - k) * 0.7})`;
    ctx.beginPath(); ctx.ellipse(r.x, r.y, rad, rad * 0.22, 0, 0, Math.PI * 2); ctx.stroke();
  }
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
  draw(ctx, person, 2, -waterline - person.h * PERSON_SCALE + 2, person.w * PERSON_SCALE, person.h * PERSON_SCALE);
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
  ctx.imageSmoothingEnabled = rod.smooth;
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
  const spr = creatureSprite(f.shape, f.hue, true);   // 낚여 올라올 때는 놀란 표정
  ctx.save();
  ctx.beginPath(); ctx.rect(-20, -400, W + 40, br.waterY + 401); ctx.clip(); // 수면 아래는 가린다
  ctx.translate(br.x, br.y); ctx.scale(-1, 1); ctx.rotate(br.angle);         // 오른쪽(배 쪽)을 보도록 뒤집는다
  drawBendy(ctx, spr, f.len, g.time * 9, f.len * 0.028);
  ctx.restore();
  // 수면과 만나는 자리의 거품
  if (br.y < br.waterY + br.sink && br.y > br.waterY - f.len * 0.5) {
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    const w = f.len * 0.32, n = Math.round(clamp(f.len / 30, 9, 40)), big = clamp(f.len / 300, 1, 3);
    for (let i = 0; i < n; i++) {
      const x = br.x + (i / (n - 1) - 0.5) * w * 2 + Math.sin(g.time * 7 + i) * 3;
      ctx.beginPath(); ctx.ellipse(x, br.waterY + 1, (5 + (i % 3) * 3) * big, 2.2 * big, 0, 0, Math.PI * 2); ctx.fill();
    }
  }
}

function drawParticles(ctx, g) {
  for (const p of g.particles) {
    const k = 1 - p.age / p.life;
    ctx.fillStyle = `rgba(235,250,255,${0.35 + k * 0.6})`;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (0.5 + k * 0.5), 0, Math.PI * 2); ctx.fill();
  }
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
  const floatY = bob.inWater || g.state === 'fight' ? LANE_Y + bob.dip : bob.y;
  const end = { x: bob.x, y: bob.inWater || g.state === 'fight' ? LANE_Y - 2 + Math.min(bob.dip, 3) : bob.y - fl.h / 2 };

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

  // 줄을 따라 흐르는 반짝임 (낚싯줄 장비 등급 색 자리)
  if (bob.inWater || g.state === 'fight') {
    const u = (g.time * 0.45) % 1, a = (1 - u) * (1 - u), bq = 2 * (1 - u) * u, c = u * u;
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.arc(a * tip.x + bq * cx + c * end.x, a * tip.y + bq * cy + c * end.y, 1.1, 0, Math.PI * 2); ctx.fill();
  }

  // 찌
  ctx.save();
  if (bob.inWater || g.state === 'fight') {
    ctx.beginPath(); ctx.rect(bob.x - 10, LANE_Y - 30, 20, 30.5); ctx.clip(); // 잠긴 부분은 가린다
    ctx.translate(bob.x, floatY + Math.sin(g.time * 2.3) * 0.7);
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
  ctx.save();
  ctx.globalAlpha = clamp((1.1 - e.age) / 0.25, 0, 1);
  ctx.translate(b.x + 5, b.y - 30 - pop * 3); ctx.scale(s, s);
  ctx.fillStyle = COLORS.cream; ctx.strokeStyle = COLORS.navy; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(-7, -8, 14, 14, 4); ctx.fill(); ctx.stroke();
  if (e.icon === 'bang') {
    ctx.fillStyle = '#e8503a'; ctx.fillRect(-1.2, -5.5, 2.4, 6); ctx.fillRect(-1.2, 1.5, 2.4, 2.2);
  } else {
    ctx.fillStyle = '#5aa9e6';
    ctx.beginPath(); ctx.moveTo(0, -5); ctx.quadraticCurveTo(4.5, 1.5, 0, 3.5); ctx.quadraticCurveTo(-4.5, 1.5, 0, -5); ctx.fill();
  }
  ctx.restore();
}

function text(ctx, str, x, y, size, color, align = 'center', weight = 700) {
  ctx.font = `${weight} ${size}px ${FONT}`;
  ctx.textAlign = align; ctx.textBaseline = 'middle';
  ctx.lineWidth = Math.max(2, size * 0.22); ctx.lineJoin = 'round';
  ctx.strokeStyle = 'rgba(20,30,60,0.75)'; ctx.strokeText(str, x, y);
  ctx.fillStyle = color; ctx.fillText(str, x, y);
}

function drawHud(ctx, g) {
  // 골드
  ctx.fillStyle = '#f2c14e'; ctx.strokeStyle = COLORS.navy; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(16, 16, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  text(ctx, g.gold.toLocaleString('ko-KR'), 28, 16.5, 12, COLORS.cream, 'left');

  // 던지기 파워 게이지
  if (g.state === 'charge') {
    const x = BOAT_X - 24, y = BOAT_Y - 58;
    ctx.fillStyle = 'rgba(20,30,60,0.6)'; ctx.beginPath(); ctx.roundRect(x - 1, y - 1, 50, 7, 3); ctx.fill();
    ctx.fillStyle = `rgb(255,${Math.round(230 - g.power * 110)},90)`;
    ctx.beginPath(); ctx.roundRect(x, y, 48 * g.power, 5, 2.5); ctx.fill();
  }

  // 파이팅 게이지
  if (g.state === 'fight') {
    const f = g.fight;
    const bw = 240, bx = (W - bw) / 2, by = 22;
    ctx.fillStyle = 'rgba(20,30,60,0.6)'; ctx.beginPath(); ctx.roundRect(bx - 2, by - 2, bw + 4, 12, 5); ctx.fill();
    ctx.fillStyle = '#6cd0e8';
    ctx.beginPath(); ctx.roundRect(bx, by, bw * clamp(f.dist / (f.dist0 * 1.2), 0, 1), 8, 4); ctx.fill();
    text(ctx, `남은 거리 ${Math.max(0, f.dist).toFixed(0)}m`, W / 2, by + 20, 10, COLORS.cream);

    const tx = W - 30, ty = 80, th = 190, tw = 10;
    const yOf = (v) => ty + th - th * clamp(v / f.maxTension, 0, 1);
    ctx.fillStyle = 'rgba(20,30,60,0.6)'; ctx.beginPath(); ctx.roundRect(tx - 2, ty - 2, tw + 4, th + 4, 5); ctx.fill();
    ctx.fillStyle = 'rgba(120,220,140,0.45)';
    ctx.fillRect(tx, yOf(FIGHT.safeHigh), tw, yOf(FIGHT.safeLow) - yOf(FIGHT.safeHigh));
    const [r, gg, b] = lineColor(f.tension);
    ctx.fillStyle = `rgb(${r},${gg},${b})`;
    ctx.beginPath(); ctx.roundRect(tx + 2, yOf(f.tension), tw - 4, ty + th - yOf(f.tension), 3); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillRect(tx - 3, yOf(f.tension) - 1, tw + 6, 2);
    text(ctx, '장력', tx + tw / 2, ty - 12, 10, COLORS.cream);
    if (f.surging) text(ctx, '날뛴다! 손을 떼세요', W / 2, 60, 12, '#ffd0c0');
  }

  // 조작 안내
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
  const cw = 250, ch = 150, cx = (W - cw) / 2, cy = (H - ch) / 2 - 6 + (1 - e) * 26;
  ctx.save();
  ctx.fillStyle = `rgba(14,26,46,${0.4 * e})`; ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = e;
  ctx.fillStyle = COLORS.cream; ctx.strokeStyle = COLORS.wood; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(cx, cy, cw, ch, 8); ctx.fill(); ctx.stroke();
  ctx.fillStyle = grade.color; ctx.beginPath(); ctx.roundRect(cx + 10, cy + 10, 44, 16, 4); ctx.fill();
  text(ctx, grade.name, cx + 32, cy + 18.5, 10, '#fff');
  ctx.font = `700 15px ${FONT}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.fillStyle = COLORS.navy; ctx.fillText(f.name, cx + 62, cy + 19);

  // 그림 (카드 안에 맞춰 축소)
  const spr = creatureSprite(f.shape, f.hue);
  const fit = Math.min(190 / spr.w, 62 / spr.h);
  ctx.save();
  ctx.translate(W / 2, cy + 68);
  drawBendy(ctx, spr, spr.w * fit, g.time * 3, spr.w * fit * 0.02);
  ctx.restore();

  ctx.font = `600 11px ${FONT}`; ctx.fillStyle = COLORS.navy; ctx.textAlign = 'left';
  ctx.fillText(`몸길이 ${f.meters.toFixed(1)} m`, cx + 14, cy + 114);
  ctx.textAlign = 'right';
  if (f.isFantasy) { ctx.fillStyle = '#a06a00'; ctx.fillText(`${f.name}의 증표 획득`, cx + cw - 14, cy + 114); }
  else ctx.fillText(`판매가 ${f.price.toLocaleString('ko-KR')} G`, cx + cw - 14, cy + 114);
  ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(29,43,74,0.6)'; ctx.font = `600 10px ${FONT}`;
  ctx.fillText(f.isFantasy ? '눌러서 놓아주기' : '눌러서 판매하고 계속', W / 2, cy + ch - 14);
  ctx.restore();
}

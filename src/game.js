// 낚시 진행(상태·수치). 그리기는 render.js 가 담당.
import {
  BOAT_X, BOAT_Y, LANE_Y, CAST_NEAR, CAST_FAR, ROD_LEN, TIMING, FIGHT,
  Z_SQUASH, FIGHT_MODES, SURGE_MODES, TELEGRAPH, GRADES, W, H,
} from './config.js';
import { rollCreature } from './creatures.js';
import { preloadCreature } from './assets.js';
import { createSwimmer, steer, mouth, visibleLen } from './swim.js';

const rand = (a, b) => a + Math.random() * (b - a);
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const approach = (cur, target, rate, dt) => cur + (target - cur) * (1 - Math.exp(-rate * dt));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function createGame() {
  return {
    state: 'idle', t: 0, time: 0,
    gold: 0, hold: false,
    forceGrade: null, phase: 0,
    power: 0, powerDir: 1, castX: CAST_NEAR,
    rodAngle: 0.6, rodBend: 0, lean: 0,
    rock: 0, rockV: 0, shake: 0,
    // 배: 줄에 끌린 기울기, 밑을 지나는 거대한 몸에 들썩임, 끌려감(배경이 밀림)
    boat: { tilt: 0, heave: 0, heaveV: 0, drift: 0, scroll: 0, sprayT: 0 },
    cam: { x: 0, zoom: 1 },
    bob: { x: BOAT_X - 30, y: BOAT_Y - 20, dip: 0, dipV: 0, inWater: false },
    fish: null, sw: null,
    wait: null, bite: null, fight: null, breach: null, result: null,
    emote: null, msg: null,
    particles: [], ripples: [], bursts: [],
    // 획득 연출: 슬로모션·히트스톱·번쩍임·어두워짐, "낚았다!" 글자, 기록, 동전
    timeScale: 1, slowTarget: 1, freeze: 0, flash: 0, dim: 0, realDt: 0,
    catchFx: null, records: {}, goldShown: 0, coins: [],
    sfx: [],          // 이번 프레임에 낼 소리 [이름, 값] (main.js 가 재생)
  };
}

// 그림자 평면(x, z, depth) → 화면 좌표
export function toScreen(x, z, depth = 0) {
  return { x, y: LANE_Y + z * Z_SQUASH + 4 + depth * 16 };
}

// ── 배·낚싯대 위치 계산 (게임 로직과 그리기가 함께 사용) ──
export function boatPose(g) {
  return {
    x: BOAT_X,
    y: BOAT_Y + Math.sin(g.time * 1.3) * 1.2 + Math.sin(g.time * 2.1 + 1) * 0.5 + g.boat.heave,
    rot: Math.sin(g.time * 1.1 + 0.5) * 0.035 + g.rock + g.boat.tilt,
  };
}

export function rodPose(g) {
  const b = boatPose(g);
  const c = Math.cos(b.rot), s = Math.sin(b.rot);
  const loc = (lx, ly) => ({ x: b.x + lx * c - ly * s, y: b.y + lx * s + ly * c });
  const base = loc(2, -7.5);
  const th = g.rodAngle + b.rot;
  const th2 = th - g.rodBend;
  const mid = { x: base.x - Math.cos(th) * ROD_LEN * 0.6, y: base.y - Math.sin(th) * ROD_LEN * 0.6 };
  const tip = { x: mid.x - Math.cos(th2) * ROD_LEN * 0.4, y: mid.y - Math.sin(th2) * ROD_LEN * 0.4 };
  return { boat: b, loc, base, mid, tip };
}

// 찌가 있는 평면 좌표 (z = 0 줄 위)
const floatPoint = (g) => ({ x: g.bob.x, z: 0 });

// ── 효과 ──
function splash(g, x, y, count, power) {
  for (let i = 0; i < count; i++) {
    const a = rand(-Math.PI * 0.95, -Math.PI * 0.05);
    const v = rand(0.3, 1) * power;
    g.particles.push({
      x: x + rand(-1, 1) * power * 0.04, y,
      vx: Math.cos(a) * v * 0.6, vy: Math.sin(a) * v,
      life: rand(0.5, 1.1) + power * 0.002, age: 0, size: rand(0.5, 1) + Math.min(2.5, power * 0.005), floor: y + 14,
      rot: rand(-0.4, 0.4),
    });
  }
}
function ripple(g, x, y, size) {
  // 큰 물결은 하나를 키우지 않고 여러 겹으로
  const n = Math.min(4, Math.ceil(size / 40));
  for (let i = 0; i < n; i++) g.ripples.push({ x: x + rand(-size, size) * 0.3, y: y + rand(-3, 3), age: -i * 0.18, life: 1.6, size: Math.min(40, size / n + 10) });
}
function burst(g, sprite, x, y, size, life = 0.8) { g.bursts.push({ sprite, x, y, size: Math.min(size, 190), life, age: 0 }); }
function say(g, text, color = '#fff4dc') { g.msg = { text, color, age: 0 }; }
function kick(g, v) { g.rockV += v; }
function heave(g, v) { g.boat.heaveV += v; }
function setState(g, s) { g.state = s; g.t = 0; }
function snd(g, name, arg) { g.sfx.push([name, arg]); }
function buzz(pattern) { try { if (navigator.vibrate) navigator.vibrate(pattern); } catch { /* 진동 미지원 */ } }

// ── 입력 ──
export function press(g) {
  g.hold = true;
  switch (g.state) {
    case 'idle':
      g.power = 0; g.powerDir = 1; setState(g, 'charge'); break;
    case 'wait': {
      if (g.wait.fakeT > 0) { say(g, '앗, 도망갔다!', '#ffd0c0'); g.emote = { icon: 'tear', age: 0 }; }
      else say(g, '거둬들였다');
      flee(g); reelIn(g);
      break;
    }
    case 'bite': {
      const b = g.bite;
      const tau = g.t - b.openAt;
      if (tau < 0) { say(g, '너무 빨랐다!', '#ffd0c0'); g.emote = { icon: 'tear', age: 0 }; flee(g); reelIn(g); break; }
      b.perfect = tau < b.perfectWin;
      say(g, b.perfect ? 'PERFECT!' : 'GOOD', b.perfect ? '#ffe27a' : '#fff4dc');
      kick(g, 0.5); snd(g, 'hook', b.perfect); buzz(25);
      // 바늘에 걸린 순간 화들짝 놀라 몸을 튼다
      g.sw.shake = 1; g.sw.tailAmp = 0.16;
      setState(g, 'hook');
      break;
    }
    case 'breach':
      if (g.t > 0.35) g.breach.skip = true;      // 연출 넘기기
      break;
    case 'result':
      if (g.t > 1.1) {
        if (!g.fish.isFantasy) {
          g.gold += g.fish.price;
          const n = Math.min(14, 4 + Math.floor(Math.log10(g.fish.price + 1) * 2.5));
          for (let i = 0; i < n; i++) g.coins.push({ age: -i * 0.035, life: 0.55, sx: W / 2 + rand(-50, 50), sy: H / 2 + rand(-10, 30) });
          snd(g, 'coin', n);
        }
        g.result = null; g.fish = null; g.sw = null; g.catchFx = null;
        setState(g, 'idle');
      }
      break;
  }
}

export function release(g) {
  g.hold = false;
  if (g.state === 'charge') {
    g.castX = lerp(CAST_NEAR, CAST_FAR, g.power);
    const tip = rodPose(g).tip;
    g.cast = { fromX: tip.x, fromY: tip.y };
    kick(g, -0.45); snd(g, 'cast');
    setState(g, 'cast');
  }
}

function reelIn(g) {
  g.bob.inWater = false; g.wait = null; g.bite = null; g.fight = null; g.fish = null;
  setState(g, 'idle');
}

// 그림자가 깊은 곳으로 달아난다 (상태와 무관하게 사라질 때까지 헤엄)
function flee(g) {
  if (!g.sw) return;
  const s = g.sw;
  s.fleeing = true;
  s.target = { x: s.x - 260 - s.len * 0.3, z: rand(40, 90), depth: 1, speed: 1.3 };
}

// ── 매 프레임 갱신 ──
export function update(g, dt) {
  // 연출용 시간 조절: 히트스톱(완전 정지)과 슬로모션. 화면 효과(번쩍임·글자·동전)는 실제 시간으로 흐른다.
  g.realDt = dt;
  g.flash = approach(g.flash, 0, 7, dt);
  if (g.catchFx) g.catchFx.age += dt;
  g.goldShown = Math.abs(g.gold - g.goldShown) < 0.6 ? g.gold : approach(g.goldShown, g.gold, 6, dt);
  for (const c of g.coins) c.age += dt;
  g.coins = g.coins.filter((c) => c.age < c.life);
  if (g.freeze > 0) { g.freeze -= dt; return; }
  g.timeScale = approach(g.timeScale, g.slowTarget, 9, dt);
  g.slowTarget = 1;
  dt *= g.timeScale;
  let zoomTarget = 1, dimTarget = 0;

  g.time += dt; g.t += dt;

  // 배 흔들림 (감쇠 스프링), 화면 흔들림
  g.rockV += (-g.rock * 40 - g.rockV * 4) * dt;
  g.rock += g.rockV * dt;
  g.shake = approach(g.shake, 0, 6, dt);

  // 찌 잠김 스프링
  const bob = g.bob;
  bob.dipV += ((bob.dipTarget || 0) - bob.dip) * 120 * dt - bob.dipV * 9 * dt;
  bob.dip += bob.dipV * dt;

  let rodTarget = 0.6, rodRate = 8, leanTarget = 0, bendTarget = 0;
  let tiltTarget = 0, driftTarget = 0, camTarget = 0;

  switch (g.state) {
    case 'idle': {
      bob.dipTarget = 0;
      const tip = rodPose(g).tip;
      bob.x = approach(bob.x, tip.x + Math.sin(g.time * 2) * 1.5, 10, dt);
      bob.y = approach(bob.y, tip.y + 12, 10, dt);
      break;
    }
    case 'charge': {
      g.power += g.powerDir * TIMING.chargeSpeed * dt;
      if (g.power >= 1) { g.power = 1; g.powerDir = -1; }
      if (g.power <= 0) { g.power = 0; g.powerDir = 1; }
      rodTarget = 1.5 + g.power * 0.6; leanTarget = 0.25 + g.power * 0.25; rodRate = 12;
      const tip = rodPose(g).tip;
      bob.x = approach(bob.x, tip.x, 14, dt); bob.y = approach(bob.y, tip.y + 10, 14, dt);
      break;
    }
    case 'cast': {
      rodTarget = 0.25; leanTarget = -0.3; rodRate = 20;
      const u = Math.min(1, g.t / TIMING.castFlight);
      const e = 1 - (1 - u) * (1 - u);
      bob.x = lerp(g.cast.fromX, g.castX, e);
      bob.y = lerp(g.cast.fromY, LANE_Y, u) - Math.sin(u * Math.PI) * (50 + g.power * 40);
      if (u >= 1) {
        bob.inWater = true; bob.dipV = 60; bob.y = LANE_Y;
        splash(g, bob.x, LANE_Y, 10, 70); ripple(g, bob.x, LANE_Y, 14); snd(g, 'plop');
        startWait(g);
      }
      break;
    }
    case 'wait': updateWait(g, dt); rodTarget = 0.5; break;
    case 'bite': {
      rodTarget = 0.5;
      const b = g.bite;
      // 그림자는 찌 밑에 붙어 입질한다
      holdAtFloat(g, 0.3, dt);
      if (b.pattern === 'tok') {
        while (b.next < 3 && g.t >= b.next * TIMING.tokInterval) {
          bob.dipV += b.next === 2 ? 110 : 70;
          g.sw.shake = Math.max(g.sw.shake, 0.5);
          ripple(g, bob.x, LANE_Y, 8 + b.next * 3);
          if (b.next === 2) { bob.dipTarget = 6; g.emote = { icon: 'bang', age: 0 }; snd(g, 'bite'); } else snd(g, 'nibble');
          b.next++;
        }
      } else if (!b.started) {
        b.started = true; bob.dipTarget = 9; bob.dipV += 90;
        g.sw.target.speed = 0.6;
        ripple(g, bob.x, LANE_Y, 12); g.emote = { icon: 'bang', age: 0 }; snd(g, 'bite');
      }
      if (g.t > b.openAt + b.window) {
        say(g, '놓쳤다…', '#ffd0c0'); g.emote = { icon: 'tear', age: 0 }; flee(g); reelIn(g);
      }
      break;
    }
    case 'hook': {
      rodTarget = 1.3; rodRate = 22; leanTarget = 0.45; bendTarget = 0.5;
      if (g.t === dt) splash(g, bob.x, LANE_Y, 14, 90);
      const s = g.sw;
      s.target = { x: s.x - Math.cos(s.heading) * 60, z: s.z + rand(-30, 30), depth: 0.5, speed: 1.2 };
      steer(s, dt, { arrive: false });
      followMouth(g, dt);
      if (g.t >= TIMING.hook) startFight(g);
      break;
    }
    case 'fight': {
      const r = updateFight(g, dt);
      if (!r) break;
      ({ rodTarget, leanTarget, bendTarget, tiltTarget, driftTarget, camTarget } = r);
      rodRate = 10;
      break;
    }
    case 'breach': {
      rodTarget = 1.45; leanTarget = 0.5; rodRate = 6;
      camTarget = (g.breach.x - BOAT_X) * 0.03;
      ({ zoomTarget, dimTarget } = updateBreach(g, dt));
      break;
    }
    case 'result': {
      rodTarget = 0.9;
      const r = g.result;
      if (g.t > 0.3 && g.t < 0.95) {                 // 숫자가 올라가는 동안 틱틱
        r.tickT -= g.realDt;
        if (r.tickT <= 0) { r.tickT = 0.06; snd(g, 'tick'); }
      }
      if (!r.stamped && (r.isNew || r.isRecord) && g.t > 1.0) {   // 도장 쾅
        r.stamped = true; snd(g, 'stamp'); g.shake = 2.5; buzz(40);
      }
      break;
    }
    case 'fail': {
      rodTarget = 0.9;
      const tip = rodPose(g).tip;
      bob.x = approach(bob.x, tip.x, 5, dt); bob.y = approach(bob.y, tip.y + 12, 5, dt);
      if (g.t >= TIMING.fail) { g.fish = null; setState(g, 'idle'); }
      break;
    }
  }

  // 달아나는 그림자: 깊어지고 흐려지다 사라진다
  if (g.sw && g.sw.fleeing) {
    steer(g.sw, dt, { arrive: false });
    g.sw.vis = approach(g.sw.vis, 0, 1.4, dt);
    if (g.sw.vis < 0.02) g.sw = null;
  }

  // 배 반응
  const B = g.boat;
  B.tilt = approach(B.tilt, tiltTarget, 3, dt);
  B.drift = approach(B.drift, driftTarget, 1.5, dt);
  B.scroll += B.drift * dt;
  let heaveTarget = 0;
  if (g.sw && !g.sw.fleeing && g.sw.vis > 0.3) {      // 거대한 몸이 배 밑을 지나가면 들썩
    const p = toScreen(g.sw.x, g.sw.z, g.sw.depth);
    const half = visibleLen(g.sw) * 0.5;
    const under = clamp(1 - Math.abs(p.x - BOAT_X) / (half + 20), 0, 1);
    heaveTarget = -under * (1 - g.sw.depth) * Math.min(5, g.sw.len / 120);
  }
  B.heaveV += ((heaveTarget - B.heave) * 30 - B.heaveV * 5) * dt;
  B.heave += B.heaveV * dt;
  if (Math.abs(B.drift) > 6) {                         // 끌려갈 때 뱃머리 물보라
    B.sprayT -= dt;
    if (B.sprayT <= 0) { B.sprayT = 0.05; splash(g, BOAT_X - 15, BOAT_Y + 2, 2, 30 + Math.abs(B.drift) * 2); }
  }
  g.cam.x = approach(g.cam.x, camTarget, 1.5, dt);
  g.cam.zoom = approach(g.cam.zoom, zoomTarget, 5, g.realDt);
  g.dim = approach(g.dim, dimTarget, 5, g.realDt);

  g.rodAngle = approach(g.rodAngle, rodTarget, rodRate, dt);
  g.rodBend = approach(g.rodBend, bendTarget, 10, dt);
  g.lean = approach(g.lean, leanTarget, 9, dt);

  // 입자·물결·말풍선
  for (const p of g.particles) { p.age += dt; p.vy += 260 * dt; p.x += p.vx * dt; p.y += p.vy * dt; }
  g.particles = g.particles.filter((p) => p.age < p.life && !(p.vy > 0 && p.y > p.floor));
  for (const r of g.ripples) r.age += dt;
  g.ripples = g.ripples.filter((r) => r.age < r.life);
  for (const b of g.bursts) b.age += dt;
  g.bursts = g.bursts.filter((b) => b.age < b.life);
  if (g.msg) { g.msg.age += dt; if (g.msg.age > 1.4) g.msg = null; }
  if (g.emote) { g.emote.age += dt; if (g.emote.age > 1.1) g.emote = null; }
}

// ── 입질 대기: 그림자가 깊은 곳에서 나타나 찌 주변을 돌다가 다가온다 ──
function startWait(g) {
  g.fish = rollCreature(g.forceGrade);
  preloadCreature(g.fish.sprite);
  const L = g.fish.len;
  const fx = g.castX;
  // 계획: 찌 주변을 맴도는 지점들 → (헛입질: 건드리고 물러나기) × n → 마지막에 물기
  const plan = [
    { x: fx - 90 - L * 0.2, z: 60, depth: 0.85, speed: 0.6 },
    { x: fx + 50 + L * 0.1, z: 25, depth: 0.7, speed: 0.55 },
    { x: fx - 30 - L * 0.15, z: -35, depth: 0.6, speed: 0.5 },
  ];
  const fakes = Math.floor(rand(0, 2.6));
  for (let i = 0; i < fakes; i++) {
    plan.push({ touch: true, fake: true });
    plan.push({ x: fx - 70 - L * 0.2, z: rand(-40, 50), depth: 0.55, speed: 0.6 });
  }
  plan.push({ touch: true, fake: false });
  const sw = createSwimmer(L, fx - 280 - L * 0.3, 80, -0.25);
  sw.depth = 1;
  g.sw = sw;
  g.wait = { plan, step: 0, fakeT: 0, delay: rand(0.4, 1.2), minTime: rand(2.5, 4) * (1 + g.power * 0.4) };
  setState(g, 'wait');
}

function updateWait(g, dt) {
  const w = g.wait, s = g.sw, bob = g.bob;
  bob.x = g.castX; bob.y = LANE_Y;
  w.fakeT = Math.max(0, w.fakeT - dt);
  if (g.t < w.delay) return;
  s.vis = approach(s.vis, 1, 0.8, dt);

  const step = w.plan[Math.min(w.step, w.plan.length - 1)];
  if (step.touch) {
    // 주둥이가 찌에 닿도록 다가간다
    const m = mouth(s), fp = floatPoint(g);
    const md = Math.hypot(fp.x - m.x, fp.z - m.z);
    const dx = fp.x - s.x, dz = fp.z - s.z, d = Math.hypot(dx, dz) || 1;
    const reach = visibleLen(s) * 0.46;
    s.target = { x: fp.x - dx / d * reach, z: fp.z - dz / d * reach, depth: 0.35, speed: step.fake ? 0.45 : 0.4 };
    steer(s, dt);
    const touching = md < 6 + s.len * 0.015;
    if (touching && step.fake) {
      w.fakeT = TIMING.fakeWindow;
      bob.dipV += 55; ripple(g, bob.x, LANE_Y, 7); snd(g, 'nibble');
      s.shake = 0.6;
      w.step++;
    } else if ((touching && g.t >= w.minTime) || g.t > w.minTime + 12) {
      startBite(g);
    }
  } else {
    s.target = { ...step };
    const d = steer(s, dt);
    if (d < 25 + s.len * 0.08) w.step++;
  }
}

// 찌 밑에서 입을 대고 머문다
function holdAtFloat(g, depth, dt) {
  const s = g.sw, fp = floatPoint(g);
  const dx = fp.x - s.x, dz = fp.z - s.z, d = Math.hypot(dx, dz) || 1;
  const reach = visibleLen(s) * 0.46;
  s.target = { x: fp.x - dx / d * reach, z: fp.z - dz / d * reach, depth, speed: s.target.speed ?? 0.4 };
  steer(s, dt);
}

function startBite(g) {
  const pattern = g.fish.bite;
  g.bite = pattern === 'tok'
    ? { pattern, next: 0, openAt: TIMING.tokInterval * 2, window: TIMING.tokWindow, perfectWin: TIMING.tokPerfect }
    : { pattern, started: false, openAt: 0, window: TIMING.pullWindow, perfectWin: TIMING.pullPerfect };
  setState(g, 'bite');
}

// ── 파이팅 ──
function startFight(g) {
  const dist0 = 30 + g.power * 50;
  g.fight = {
    dist0, dist: dist0, tension: 0.4, slack: 0, fx: 0,
    maxTension: g.bite.perfect ? 1.12 : 1.0,
    mode: 'hold', modeT: rand(1, 1.8), tele: 0, next: null,
    surging: false, orbit: Math.random() * Math.PI * 2, runTo: null, slap: null,
    stamina: 1,
  };
  setState(g, 'fight');
}

function chooseMode(g) {
  const f = g.fight, modes = FIGHT_MODES[g.fish.grade] || FIGHT_MODES.common;
  const wasSurge = SURGE_MODES.includes(f.mode);
  if (f.stamina < 0.35 && Math.random() < 0.6) return 'tired';
  if (wasSurge) return Math.random() < 0.7 ? 'hold' : pick(modes.filter((m) => !SURGE_MODES.includes(m)));
  return pick(modes.filter((m) => m !== f.mode));
}

function updateFight(g, dt) {
  const f = g.fight, s = g.sw, p = g.fish.power, bob = g.bob;

  // 동작 전환. 날뛰는 동작 앞에는 조짐(움찔·꼬리 젖히기)이 먼저 온다.
  f.modeT -= dt;
  if (f.tele > 0) {
    f.tele -= dt;
    s.shake = 1; s.tailAmp = Math.max(s.tailAmp, 0.12);
    if (f.tele <= 0) { f.mode = f.next; startMode(g); }
  } else if (f.modeT <= 0) {
    const next = chooseMode(g);
    if (SURGE_MODES.includes(next)) { f.tele = TELEGRAPH; f.next = next; f.modeT = 99; }
    else { f.mode = next; startMode(g); }
  }
  f.surging = SURGE_MODES.includes(f.mode) && f.tele <= 0;
  if (f.surging) f.stamina = Math.max(0, f.stamina - dt * 0.06);
  else f.stamina = Math.min(1, f.stamina + dt * 0.02);

  // 감기·풀기
  const tired = f.mode === 'tired';
  if (g.hold) {
    f.tension += (0.4 + 0.12 * p + (f.surging ? 0.9 * p : 0) - (tired ? 0.15 : 0)) * dt;
    f.dist -= (f.surging ? 0.25 : tired ? 1.6 : 1) * FIGHT.reelSpeed * dt;
  } else {
    f.tension -= (f.surging ? 0.4 : 0.75) * dt;
    f.dist = Math.min(f.dist0 * 1.2, f.dist + (f.surging ? 5 * p : 1.5) * dt);
  }
  f.tension = Math.max(0, f.tension);
  f.slack = f.tension < FIGHT.slackLimit ? f.slack + dt : Math.max(0, f.slack - dt * 0.5);

  // 동작별 헤엄 목표. 기준점 = 줄이 당기는 위치(거리에 따라 배 쪽으로 다가옴)
  const far = clamp(f.dist / f.dist0, 0, 1.2);
  const ax = lerp(BOAT_X - 70 - s.len * 0.15, g.castX, far), az = 0;
  const L = s.len;
  switch (f.mode) {
    case 'hold':
      s.target = { x: ax - 20, z: az + Math.sin(g.time * 0.7) * 20, depth: 0.45, speed: 0.4 };
      s.shake = Math.max(s.shake, 0.5 + 0.3 * Math.sin(g.time * 3));
      break;
    case 'run':
      s.target = { ...f.runTo, depth: 0.35, speed: 1.45 };
      break;
    case 'dive':
      s.target = { x: ax - 50, z: az - 40, depth: 1, speed: 0.8 };
      break;
    case 'slap':
      s.target = { x: ax, z: az + 10, depth: 0.03, speed: 0.6 };
      if (!f.slap && f.modeT < 0.9) f.slap = { age: 0, x: s.x, z: s.z, dir: Math.cos(s.heading) >= 0 ? 1 : -1 };
      break;
    case 'circle': {
      f.orbit += dt * (0.8 / Math.sqrt(Math.max(1, L / 300)));
      const r = 70 + L * 0.15;
      s.target = { x: ax + Math.cos(f.orbit) * r, z: az + Math.sin(f.orbit) * r * 0.7, depth: 0.3, speed: 0.9 };
      break;
    }
    case 'tired':
      s.target = { x: ax + 15, z: az, depth: 0.08, speed: 0.25 };
      break;
  }
  steer(s, dt, { arrive: f.mode !== 'run' });
  s.vis = 1;

  // 수면 치기: 등·꼬리 일부가 수면 위로 드러났다 내려친다
  if (f.slap) {
    f.slap.age += dt;
    const sp = toScreen(f.slap.x, f.slap.z);
    if (!f.slap.hit && f.slap.age > 0.45) {
      f.slap.hit = true;
      splash(g, sp.x, sp.y, Math.round(10 + L * 0.03), 110 + L * 0.2);
      burst(g, 'fx_crown', sp.x, sp.y, Math.min(260, 50 + L * 0.25), 0.7);
      ripple(g, sp.x, sp.y, 20 + L * 0.1);
      kick(g, 0.3 + p * 0.3); heave(g, -8 - L * 0.01); snd(g, 'splash');
      g.shake = Math.max(g.shake, 1.5 + p);
    }
    if (f.slap.age > 0.9) f.slap = null;
  }

  // 찌는 주둥이에 끌려다니고, 날뛰면 깊이 잠긴다
  followMouth(g, dt);
  bob.dipTarget = f.surging ? 9 + s.depth * 4 : 6;
  if (f.surging) {
    f.fx -= dt;
    if (f.fx <= 0) {
      f.fx = 0.09;
      splash(g, bob.x + rand(-8, 8), bob.y, 3, 60 + L * 0.2);
      if (Math.random() < 0.3) ripple(g, bob.x, bob.y, 10 + L * 0.05);
    }
    g.shake = Math.max(g.shake, 0.5 + p * 0.4);
  }

  if (f.tension >= f.maxTension) { fail(g, '줄이 끊어졌다!'); return null; }
  if (f.slack > FIGHT.slackTime) { fail(g, '바늘이 빠졌다…'); return null; }
  if (f.dist <= 0) { startBreach(g); return null; }

  // 배와 사람의 반응: 줄이 당기는 쪽으로 기울고, 질주에 끌려가며, 버틸 때 뒤로 눕는다
  const pull = clamp(f.tension, 0, 1.2) * Math.min(2, 0.6 + p * 0.6);
  const side = bob.x < BOAT_X ? -1 : 1;
  const away = f.surging && g.hold ? Math.max(0, -Math.cos(s.heading)) * s.speed : 0;
  return {
    rodTarget: 1.0 + (g.hold ? 0.15 : 0),
    leanTarget: f.surging && g.hold ? -0.3 : 0.25 + f.tension * 0.3,
    bendTarget: 0.25 + f.tension * 0.9,
    tiltTarget: side * pull * 0.09,
    driftTarget: away * 0.35,
    camTarget: (bob.x - BOAT_X) * 0.035,
  };
}

function startMode(g) {
  const f = g.fight, s = g.sw;
  f.modeT = { hold: rand(1.2, 2.4), run: rand(0.9, 1.6), dive: rand(1, 1.6), slap: 1.2, circle: rand(2, 3.2), tired: rand(1.4, 2.2) }[f.mode];
  if (f.mode === 'run') {
    const dir = Math.random() < 0.65 ? -1 : 1;     // 대부분 배에서 멀어지는 쪽으로
    f.runTo = { x: clamp(s.x + dir * (160 + s.len * 0.25), -60, BOAT_X - 60), z: rand(-60, 80) };
  }
  if (SURGE_MODES.includes(f.mode)) { kick(g, 0.25 + g.fish.power * 0.2); g.emote = { icon: 'sweat', age: 0 }; snd(g, 'surge'); buzz(20); }
  f.slap = null;
}

function followMouth(g, dt) {
  const m = mouth(g.sw), p = toScreen(m.x, m.z);
  g.bob.x = approach(g.bob.x, p.x, 10, dt);
  g.bob.y = approach(g.bob.y, p.y - 4, 10, dt);
}

// ── 솟구침 ──
function startBreach(g) {
  const L = g.fish.len, s = g.sw;
  const start = toScreen(s.x, s.z);
  const xe = BOAT_X - 60 - Math.min(L * 0.3, 140);
  g.breach = {
    xs: clamp(Math.min(start.x, xe - 40), xe - 220, xe - 40), xe,
    waterY: LANE_Y + clamp((L - 500) * 0.08, 0, 100),   // 초대형은 화면 앞쪽까지 덮는다
    hmax: clamp(L * 0.45, 100, 240), sink: L * 0.32,
    dur: Math.min(4.4, 2.3 + L / 380), fx: 0,
    x: start.x, y: undefined, angle: 0, splashed: 0,
    gi: GRADES.indexOf(g.fish.gradeInfo), skip: false,
  };
  g.fight = null;
  setState(g, 'breach');
}

// 등급별 연출 강도 (0 일반 ~ 5 환상): 슬로모션 속도, 카메라 확대, 주변 어두워짐
const SLOW = [1, 0.7, 0.5, 0.32, 0.25, 0.2];
const ZOOM = [0, 0.02, 0.04, 0.07, 0.1, 0.1];
const DIM = [0, 0.08, 0.16, 0.3, 0.4, 0.5];

function updateBreach(g, dt) {
  const br = g.breach, bob = g.bob, L = g.fish.len, gi = br.gi;
  if (br.skip) g.t = br.dur;
  const s = Math.min(1, g.t / br.dur);
  const u = s + 0.1 * Math.sin(2 * Math.PI * s);          // 꼭대기에서 잠깐 머무는 느낌
  const prevY = br.y;
  const yAt = (v) => br.waterY + br.sink - (br.hmax + br.sink) * 4 * v * (1 - v);
  br.x = lerp(br.xs, br.xe, u);
  br.y = yAt(u);
  const du = 1e-3;
  br.angle = Math.atan2(-(yAt(u + du) - br.y), (br.xe - br.xs) * du);

  // 수면을 통과하는 순간
  if (prevY !== undefined && (prevY > br.waterY) !== (br.y > br.waterY) && !br.skip) {
    const down = br.y > br.waterY, size = L / 600;
    for (let i = 0; i < 3; i++) splash(g, br.x + (i - 1) * Math.min(L, 500) * 0.15, br.waterY, Math.round(Math.min(26, 8 + L * 0.03)), Math.min(300, 120 + L * 0.15));
    burst(g, down ? 'fx_crown' : 'fx_column', br.x, br.waterY, Math.min(420, 80 + L * 0.35), 0.9);
    ripple(g, br.x, br.waterY, Math.min(260, 30 + L * 0.25));
    kick(g, (down ? -1 : 1) * Math.min(2.2, 0.5 + L / 300));
    heave(g, down ? -20 - Math.min(40, L * 0.03) : -8);   // 떨어질 때 큰 파도가 배를 들어 올린다
    g.shake = Math.min(7, 2 + L / 90);
    if (down) {
      g.flash = 0.25; snd(g, 'breachIn', size); buzz(50);
    } else {
      // 뚫고 나오는 순간: 히트스톱 + 번쩍임 + 쿵. 이어지는 슬로모션에 올라가는 음을 깐다.
      g.freeze = 0.07 + gi * 0.02; g.flash = 0.5 + gi * 0.1;
      snd(g, 'breachOut', size); buzz(40 + gi * 15);
      if (gi >= 1) snd(g, 'riser', Math.min(2.6, br.dur * 0.3 / SLOW[gi]));
    }
  }
  if (br.y < br.waterY + br.sink * 0.6) {
    br.fx -= dt;
    if (br.fx <= 0 && s < 0.9) { br.fx = 0.06; splash(g, br.x + rand(-1, 1) * Math.min(L, 500) * 0.35, br.waterY, 2, Math.min(220, 70 + L * 0.12)); }
  }

  // 솟구쳐 오르는 동안 슬로모션, 꼭대기 직전에 "낚았다!"
  const rising = s > 0.1 && s < 0.5 && !br.skip;
  if (rising) g.slowTarget = SLOW[gi];
  if (!g.catchFx && (s >= 0.36 || br.skip)) {
    g.catchFx = { age: 0, gi };
    snd(g, 'fanfare', gi); buzz([30, 40, 60 + gi * 20]);
  }

  if (g.sw) g.sw.vis = approach(g.sw.vis, 0, 8, dt);
  const tip = rodPose(g).tip;
  bob.x = approach(bob.x, tip.x, 6, dt); bob.y = approach(bob.y, tip.y + 12, 6, dt);
  bob.inWater = false; bob.dipTarget = 0;
  if (g.t === dt) g.emote = { icon: 'bang', age: 0 };
  if (s >= 1) {
    // 기록: 처음 잡은 종인지, 최고 기록을 넘었는지
    const f = g.fish, prev = g.records[f.name];
    g.result = { creature: f, isNew: prev === undefined, isRecord: prev !== undefined && f.meters > prev, prev, stamped: false, tickT: 0 };
    g.records[f.name] = Math.max(prev || 0, f.meters);
    g.sw = null; snd(g, 'card');
    setState(g, 'result');
  }
  return { zoomTarget: rising ? 1 + ZOOM[gi] : 1, dimTarget: s > 0.08 && s < 0.78 && !br.skip ? DIM[gi] : 0 };
}

function fail(g, text) {
  say(g, text, '#ffb0a0'); snd(g, text.includes('끊') ? 'snap' : 'lost'); buzz(text.includes('끊') ? [40, 30, 40] : 30);
  g.emote = { icon: 'tear', age: 0 };
  g.bob.inWater = false; g.fight = null; g.bob.dipTarget = 0;
  kick(g, -0.5);
  flee(g);
  setState(g, 'fail');
}

// 낚시 진행(상태·수치). 그리기는 render.js 가 담당.
import { W, BOAT_X, BOAT_Y, LANE_Y, CAST_NEAR, CAST_FAR, ROD_LEN, TIMING, FIGHT } from './config.js';
import { rollCreature } from './creatures.js';

const rand = (a, b) => a + Math.random() * (b - a);
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const approach = (cur, target, rate, dt) => cur + (target - cur) * (1 - Math.exp(-rate * dt));

export function createGame() {
  return {
    state: 'idle', t: 0, time: 0,
    gold: 0, hold: false,
    forceGrade: null, phase: 0,
    power: 0, powerDir: 1, castX: CAST_NEAR,
    rodAngle: 0.6, rodBend: 0, lean: 0,
    rock: 0, rockV: 0, shake: 0,
    bob: { x: BOAT_X - 30, y: BOAT_Y - 20, dip: 0, dipV: 0, inWater: false },
    fish: null,
    wait: null, bite: null, fight: null, breach: null, result: null,
    shadow: { x: 0, depth: 1, vis: 0, dir: 1 },   // dir: +1 오른쪽(배 쪽)을 봄, -1 왼쪽
    emote: null, msg: null,
    particles: [], ripples: [],
  };
}

// ── 배·낚싯대 위치 계산 (게임 로직과 그리기가 함께 사용) ──
export function boatPose(g) {
  return {
    x: BOAT_X,
    y: BOAT_Y + Math.sin(g.time * 1.3) * 1.2 + Math.sin(g.time * 2.1 + 1) * 0.5,
    rot: Math.sin(g.time * 1.1 + 0.5) * 0.035 + g.rock,
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

// 지금 보이는 그림자 길이 (깊을수록 작다)
export function shadowLen(g) { return g.fish.len * lerp(1, 0.38, g.shadow.depth); }

// ── 효과 ──
function splash(g, x, y, count, power) {
  for (let i = 0; i < count; i++) {
    const a = rand(-Math.PI * 0.95, -Math.PI * 0.05);
    const v = rand(0.3, 1) * power;
    g.particles.push({
      x: x + rand(-1, 1) * power * 0.04, y,
      vx: Math.cos(a) * v * 0.6, vy: Math.sin(a) * v,
      life: rand(0.5, 1.1) + power * 0.002, age: 0, size: rand(0.8, 1.6) + Math.min(3, power * 0.006), floor: y + 14,
    });
  }
}
function ripple(g, x, y, size) { g.ripples.push({ x, y, age: 0, life: 1.4, size }); }
function say(g, text, color = '#fff4dc') { g.msg = { text, color, age: 0 }; }
function kick(g, v) { g.rockV += v; }
function setState(g, s) { g.state = s; g.t = 0; }

// ── 입력 ──
export function press(g) {
  g.hold = true;
  switch (g.state) {
    case 'idle':
      g.power = 0; g.powerDir = 1; setState(g, 'charge'); break;
    case 'wait': {
      const w = g.wait;
      if (w.fakeT > 0) { say(g, '앗, 도망갔다!', '#ffd0c0'); g.emote = { icon: 'tear', age: 0 }; }
      else say(g, '거둬들였다');
      reelIn(g);
      break;
    }
    case 'bite': {
      const b = g.bite;
      const tau = g.t - b.openAt;
      if (tau < 0) { say(g, '너무 빨랐다!', '#ffd0c0'); g.emote = { icon: 'tear', age: 0 }; reelIn(g); break; }
      b.perfect = tau < b.perfectWin;
      say(g, b.perfect ? 'PERFECT!' : 'GOOD', b.perfect ? '#ffe27a' : '#fff4dc');
      kick(g, 0.5);
      setState(g, 'hook');
      break;
    }
    case 'result':
      if (g.t > 0.5) {
        if (!g.fish.isFantasy) g.gold += g.fish.price;
        g.result = null; g.fish = null; g.shadow.vis = 0;
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
    kick(g, -0.45);
    setState(g, 'cast');
  }
}

function reelIn(g) {
  g.bob.inWater = false; g.wait = null; g.bite = null; g.fight = null; g.fish = null;
  setState(g, 'idle');
}

// ── 매 프레임 갱신 ──
export function update(g, dt) {
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

  switch (g.state) {
    case 'idle': {
      bob.dipTarget = 0;
      const tip = rodPose(g).tip;
      bob.x = approach(bob.x, tip.x + Math.sin(g.time * 2) * 1.5, 10, dt);
      bob.y = approach(bob.y, tip.y + 12, 10, dt);
      g.shadow.vis = approach(g.shadow.vis, 0, 6, dt);
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
        bob.inWater = true; bob.dipV = 60;
        splash(g, bob.x, LANE_Y, 10, 70); ripple(g, bob.x, LANE_Y, 14);
        startWait(g);
      }
      break;
    }
    case 'wait': {
      rodTarget = 0.5;
      const w = g.wait;
      bob.x = g.castX; bob.y = LANE_Y;
      w.fakeT = Math.max(0, w.fakeT - dt);
      if (w.fakes.length && g.t >= w.fakes[0]) {
        w.fakes.shift(); w.fakeT = TIMING.fakeWindow;
        bob.dipV += 55; ripple(g, bob.x, LANE_Y, 7);
      }
      // 그림자가 깊은 곳에서 다가온다
      const lead = clamp((g.t - (w.total - TIMING.shadowLead)) / TIMING.shadowLead, 0, 1);
      const e = lead * lead * (3 - 2 * lead);
      g.shadow.vis = e;
      g.shadow.depth = lerp(1, 0.4, e);
      g.shadow.dir = 1;   // 왼쪽 깊은 곳에서 찌를 향해(오른쪽으로) 다가온다
      g.shadow.x = bob.x - shadowLen(g) * 0.42 - (1 - e) * (90 + g.fish.len * 0.3) + Math.sin(g.time * 0.9) * 6 * (1 - e);
      if (g.t >= w.total) startBite(g);
      break;
    }
    case 'bite': {
      rodTarget = 0.5;
      const b = g.bite;
      if (b.pattern === 'tok') {
        while (b.next < 3 && g.t >= b.next * TIMING.tokInterval) {
          bob.dipV += b.next === 2 ? 110 : 70;
          ripple(g, bob.x, LANE_Y, 8 + b.next * 3);
          if (b.next === 2) { bob.dipTarget = 6; g.emote = { icon: 'bang', age: 0 }; }
          b.next++;
        }
      } else if (!b.started) {
        b.started = true; bob.dipTarget = 9; bob.dipV += 90;
        ripple(g, bob.x, LANE_Y, 12); g.emote = { icon: 'bang', age: 0 };
      }
      g.shadow.depth = approach(g.shadow.depth, 0.3, 5, dt);
      if (g.t > b.openAt + b.window) {
        say(g, '놓쳤다…', '#ffd0c0'); g.emote = { icon: 'tear', age: 0 }; reelIn(g);
      }
      break;
    }
    case 'hook': {
      rodTarget = 1.3; rodRate = 22; leanTarget = 0.45; bendTarget = 0.5;
      if (g.t === dt) splash(g, bob.x, LANE_Y, 14, 90);
      if (g.t >= TIMING.hook) startFight(g);
      break;
    }
    case 'fight': {
      const f = g.fight, p = g.fish.power;
      f.surgeT -= dt;
      if (f.surgeT <= 0) {
        f.surging = !f.surging;
        f.surgeT = f.surging ? rand(0.7, 1.5) : rand(1.3, 2.6) / (0.8 + p * 0.3);
        if (f.surging) { kick(g, 0.25 + p * 0.2); g.emote = { icon: 'sweat', age: 0 }; }
      }
      if (g.hold) {
        f.tension += (0.4 + 0.12 * p + (f.surging ? 0.9 * p : 0)) * dt;
        f.dist -= (f.surging ? 0.25 : 1) * FIGHT.reelSpeed * dt;
      } else {
        f.tension -= (f.surging ? 0.4 : 0.75) * dt;
        f.dist = Math.min(f.dist0 * 1.2, f.dist + (f.surging ? 5 * p : 1.5) * dt);
      }
      f.tension = Math.max(0, f.tension);
      f.slack = f.tension < FIGHT.slackLimit ? f.slack + dt : Math.max(0, f.slack - dt * 0.5);

      const far = clamp(f.dist / f.dist0, 0, 1.2);
      const endX = lerp(BOAT_X - 60, g.castX, far) + (f.surging ? Math.sin(g.time * 13) * 5 : 0);
      bob.x = approach(bob.x, endX, 8, dt); bob.y = LANE_Y; bob.dipTarget = 7;
      g.shadow.vis = 1;
      // 끌려올 때는 입(바늘)이 배 쪽을 향하고, 날뛸 때는 몸을 돌려 달아난다
      g.shadow.dir = approach(g.shadow.dir, f.surging ? -1 : 1, 5, dt);
      g.shadow.x = approach(g.shadow.x, bob.x - g.shadow.dir * shadowLen(g) * 0.42, 6, dt);
      g.shadow.depth = approach(g.shadow.depth, f.surging ? 0.95 : (g.hold ? 0.12 : 0.5), 2.2, dt);

      if (f.surging) {
        f.fx -= dt;
        if (f.fx <= 0) {
          f.fx = 0.09;
          splash(g, bob.x + rand(-8, 8), LANE_Y, 3, 60 + g.fish.len * 0.25);
          if (Math.random() < 0.3) ripple(g, bob.x, LANE_Y, 10 + g.fish.len * 0.05);
        }
        g.shake = Math.max(g.shake, 0.6 + p * 0.5);
      }
      rodTarget = 1.0 + (g.hold ? 0.15 : 0); rodRate = 10;
      leanTarget = 0.25 + f.tension * 0.3;
      bendTarget = 0.25 + f.tension * 0.9;

      if (f.tension >= f.maxTension) { fail(g, '줄이 끊어졌다!'); break; }
      if (f.slack > FIGHT.slackTime) { fail(g, '바늘이 빠졌다…'); break; }
      if (f.dist <= 0) startBreach(g);
      break;
    }
    case 'breach': {
      rodTarget = 1.45; leanTarget = 0.5; rodRate = 6;
      const br = g.breach;
      const s = Math.min(1, g.t / br.dur);
      const u = s + 0.1 * Math.sin(2 * Math.PI * s);          // 꼭대기에서 잠깐 머무는 느낌
      const prevY = br.y;
      br.x = lerp(br.xs, br.xe, u);
      br.y = br.waterY + br.sink - (br.hmax + br.sink) * 4 * u * (1 - u);
      const du = 1e-3;
      const y2 = br.waterY + br.sink - (br.hmax + br.sink) * 4 * (u + du) * (1 - u - du);
      br.angle = Math.atan2(-(y2 - br.y), (br.xe - br.xs) * du);
      // 수면을 통과하는 순간: 큰 물보라 + 배 흔들림
      const L = g.fish.len;
      if ((prevY > br.waterY) !== (br.y > br.waterY) && prevY !== undefined) {
        for (let i = 0; i < 5; i++) splash(g, br.x + (i - 2) * L * 0.12, br.waterY, Math.round(Math.min(70, 8 + L * 0.07)), Math.min(420, 130 + L * 0.3));
        ripple(g, br.x, br.waterY, Math.min(260, 30 + L * 0.25));
        kick(g, (br.y > br.waterY ? -1 : 1) * Math.min(2.2, 0.5 + L / 300));
        g.shake = Math.min(7, 2 + L / 90);
      }
      if (br.y < br.waterY + br.sink * 0.6) {
        br.fx -= dt;
        if (br.fx <= 0 && s < 0.9) { br.fx = 0.04; splash(g, br.x + rand(-L, L) * 0.35, br.waterY, 3, Math.min(300, 70 + L * 0.2)); }
      }
      g.shadow.vis = approach(g.shadow.vis, 0, 8, dt);
      bob.x = approach(bob.x, rodPose(g).tip.x, 6, dt); bob.y = approach(bob.y, rodPose(g).tip.y + 12, 6, dt);
      bob.inWater = false; bob.dipTarget = 0;
      if (g.t === dt) g.emote = { icon: 'bang', age: 0 };
      if (s >= 1) { g.result = { creature: g.fish }; setState(g, 'result'); }
      break;
    }
    case 'result':
      rodTarget = 0.9; break;
    case 'fail': {
      rodTarget = 0.9;
      const tip = rodPose(g).tip;
      bob.x = approach(bob.x, tip.x, 5, dt); bob.y = approach(bob.y, tip.y + 12, 5, dt);
      g.shadow.vis = approach(g.shadow.vis, 0, 3, dt);
      g.shadow.depth = approach(g.shadow.depth, 1, 2, dt);
      if (g.t >= TIMING.fail) { g.fish = null; setState(g, 'idle'); }
      break;
    }
  }

  g.rodAngle = approach(g.rodAngle, rodTarget, rodRate, dt);
  g.rodBend = approach(g.rodBend, bendTarget, 10, dt);
  g.lean = approach(g.lean, leanTarget, 9, dt);

  // 입자·물결·말풍선
  for (const p of g.particles) { p.age += dt; p.vy += 260 * dt; p.x += p.vx * dt; p.y += p.vy * dt; }
  g.particles = g.particles.filter((p) => p.age < p.life && !(p.vy > 0 && p.y > p.floor));
  for (const r of g.ripples) r.age += dt;
  g.ripples = g.ripples.filter((r) => r.age < r.life);
  if (g.msg) { g.msg.age += dt; if (g.msg.age > 1.4) g.msg = null; }
  if (g.emote) { g.emote.age += dt; if (g.emote.age > 1.1) g.emote = null; }
}

function startWait(g) {
  g.fish = rollCreature(g.forceGrade);
  const total = rand(3.2, 6) * (1 + g.power * 0.5);
  const fakes = [];
  const n = Math.floor(rand(0, 2.6));
  for (let i = 0; i < n; i++) fakes.push(rand(1, Math.max(1.2, total - 1.4)));
  fakes.sort((a, b) => a - b);
  g.wait = { total, fakes, fakeT: 0 };
  g.shadow.vis = 0; g.shadow.depth = 1;
  setState(g, 'wait');
}

function startBite(g) {
  const pattern = g.fish.bite;
  g.bite = pattern === 'tok'
    ? { pattern, next: 0, openAt: TIMING.tokInterval * 2, window: TIMING.tokWindow, perfectWin: TIMING.tokPerfect }
    : { pattern, started: false, openAt: 0, window: TIMING.pullWindow, perfectWin: TIMING.pullPerfect };
  setState(g, 'bite');
}

function startFight(g) {
  const dist0 = 30 + g.power * 50;
  g.fight = {
    dist0, dist: dist0, tension: 0.4, slack: 0, fx: 0,
    maxTension: g.bite.perfect ? 1.12 : 1.0,
    surging: false, surgeT: rand(1, 1.8),
  };
  setState(g, 'fight');
}

function startBreach(g) {
  const L = g.fish.len;
  // 왼쪽 물속에서 배를 향해(오른쪽으로) 솟구친다. 클수록 높이, 천천히.
  const xe = BOAT_X - 60 - L * 0.3;
  g.breach = {
    xs: xe - Math.min(L * 0.5 + 40, 300), xe,
    waterY: LANE_Y + clamp((L - 500) * 0.08, 0, 100),   // 초대형은 화면 앞쪽까지 덮는다
    hmax: clamp(L * 0.45, 100, 240), sink: L * 0.32,
    dur: Math.min(4.4, 2.3 + L / 380), fx: 0,
    x: xe, y: undefined, angle: 0,
  };
  g.fight = null;
  setState(g, 'breach');
}

function fail(g, text) {
  say(g, text, '#ffb0a0');
  g.emote = { icon: 'tear', age: 0 };
  g.bob.inWater = false; g.fight = null; g.bob.dipTarget = 0;
  kick(g, -0.5);
  setState(g, 'fail');
}

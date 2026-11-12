// 낚시 진행(상태·수치). 그리기는 render.js 가 담당.
// 구도는 순수 옆모습: 수면선(WL) 위는 하늘, 아래는 물의 단면. (목표 화면: assets/concept)
import {
  DAY_SEC, phaseAt,
  W, H, WL, BOAT_X, CAST_NEAR, CAST_FAR, ROD_LEN, DEEP, LEAP_X, LEAP_SCALE, SHADOW_LEN,
  TIMING, FIGHT, FIGHT_MODES, SURGE_MODES, TELEGRAPH, TOUGH, GRADES,
} from './config.js';
import { rollCreature } from './creatures.js';
import { updateTravel, updateHarbor, enterHarbor } from './harbor.js';
import { ADVANCE, newEconomy, priceMult, sizeMult, reelMult, biteMult, pullOf, strainOf, luckOf, cargoMax, maxRegion, fmt } from './economy.js';
import { sprite, preloadCreature } from './assets.js';
import { createSwimmer, steer, mouth, updatePose } from './swim.js';
import { newStory, updateStory, tapTalk, tapTitle } from './story.js';
import { updateBook } from './book.js';
import { RELICS, has } from './relics.js';
import { openMap } from './book.js';
import { dexBonus, dexStage, dexName, DEX_PCT, genMult, questCatch, questPerfect, dexAll, skinGained, josaEul } from './goals.js';
import { buzz } from './haptic.js';

const rand = (a, b) => a + Math.random() * (b - a);
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const approach = (cur, target, rate, dt) => cur + (target - cur) * (1 - Math.exp(-rate * dt));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const easeOut = (k) => 1 - Math.pow(1 - k, 3);

export function createGame() {
  return {
    state: 'idle', t: 0, time: 0,
    gold: 0, hold: false,
    scene: 'sea', panel: null, travel: null, veil: 0,     // 바다 / 항구, 열려 있는 가게 판, 화면 넘기기
    eco: newEconomy(),                       // 장비·스킬 레벨
    cargo: [], cargoMax: 5,                  // 어창: 낚은 생물을 싣는다. 항구에서 판다
    region: 1,                               // 지금 있는 해역 (1~8)
    gen: 0, quest: null, dexNews: null, primal: false, primalShow: false,             // 몇 대째인가(0 = 첫 대), 길드 의뢰, 시장에게 전할 도감 소식
    relics: 0, memory: null, memoryNext: null, savedToday: false,   // 찾은 오래된 물건 수, 떠오르는 기억 장면, 오늘 줄을 한 번 살렸는가
    story: newStory(), talk: null, skip: null,   // 이야기 진행, 지금 떠 있는 대화, 시간 넘기는 중
    forceGrade: null, phase: 3, dayT: 0, dayWarned: false,   // 시간대(낮→노을→밤→새벽)와 그 시간대가 흐른 시간
    power: 0, powerDir: 1, castX: CAST_NEAR,
    rodAngle: 0.32, rodBend: 0, pose: 1,
    rock: 0, rockV: 0, shake: 0,
    boat: { dx: 0, tilt: 0, spray: 0 },      // dx: 줄에 끌려간 거리, spray: 뱃머리 물살 세기
    cam: { zoom: 1, ox: 0, oy: 0 },         // 화면 좌표 = 세계 좌표 × zoom + (ox, oy)
    rough: 0,                                 // 바다의 거칠기 0(잔잔) ~ 1(폭발 직후)
    swells: [],                               // 수면을 타고 퍼지는 큰 물결
    bob: { x: BOAT_X - 40, y: WL - 30, dip: 0, dipV: 0, inWater: false },
    fish: null, sw: null,
    wait: null, bite: null, fight: null, catch: null, result: null,
    emote: null, msg: null,
    sprays: [], bursts: [], bubbles: [],
    shafts: 0, rays: 0,
    // 획득 연출: 슬로모션·히트스톱·번쩍임, "낚았다!" 글자, 기록, 동전
    timeScale: 1, slowTarget: 1, freeze: 0, flash: 0, dim: 0, realDt: 0,
    catchFx: null, records: {}, goldShown: 0, coins: [],
    sfx: [],          // 이번 프레임에 낼 소리 [이름, 값] (main.js 가 재생)
  };
}

// ── 수면 높이: 잔물결 + 퍼져 나가는 큰 물결. 배·찌·파도 그림이 모두 이 높이를 따른다. ──
export function surfaceY(g, x) {
  const a = 1 + g.rough * 2.4, t = g.time;
  let y = WL + Math.sin(x * 0.021 + t * 0.9) * 1.1 * a + Math.sin(x * 0.047 - t * 1.4) * 0.6 * a;
  for (const s of g.swells) {
    const d = (x - (s.x + s.dir * s.speed * s.age)) / s.width;
    y -= s.amp * Math.exp(-d * d) * Math.max(0, 1 - s.age / s.life);
  }
  const sw = g.sw;                       // 거대한 몸이 수면 바로 밑에 있으면 물이 부풀어 오른다
  if (sw && !sw.fleeing) {
    // 얕을수록 서서히 커진다 (어느 깊이에서 갑자기 켜지지 않는다)
    const k = clamp((sw.floor + 40 - sw.y) / 40, 0, 1), d = (x - sw.x) / (sw.len * (sw.show || 1) * 0.38);
    y -= k * k * Math.min(4, 1.2 + sw.len * 0.005) * (sw.show ? Math.min(1, sw.show * 2) : 1) * Math.exp(-d * d) * sw.vis;
  }
  return y;
}

// ── 배·낚싯대 ──
// 낚시꾼 손 위치 (배 그림의 아래 가운데 기준, 자세 1 앉음 / 2 뒤로 버팀 / 3 일어서서 버팀)
const HANDS = { 1: [-2.7, -10.8], 2: [2.2, -14.9], 3: [0.4, -21.3] };

export function boatPose(g) {
  const x = BOAT_X + g.boat.dx;
  const slope = (surfaceY(g, x + 8) - surfaceY(g, x - 8)) / 16;
  return { x, y: surfaceY(g, x) + 1.6, rot: Math.atan(slope) * 0.8 + g.rock + g.boat.tilt, pose: g.pose };
}

export function rodPose(g) {
  const b = boatPose(g);
  const c = Math.cos(b.rot), s = Math.sin(b.rot);
  const loc = (lx, ly) => ({ x: b.x + lx * c - ly * s, y: b.y + lx * s + ly * c });
  const base = loc(...HANDS[b.pose]);
  const th = g.rodAngle + b.rot, th2 = th - g.rodBend;
  const mid = { x: base.x - Math.cos(th) * ROD_LEN * 0.55, y: base.y - Math.sin(th) * ROD_LEN * 0.55 };
  const tip = { x: mid.x - Math.cos(th2) * ROD_LEN * 0.45, y: mid.y - Math.sin(th2) * ROD_LEN * 0.45 };
  return { boat: b, base, mid, tip };
}

// 그림자의 화면 위치
export const swimPos = (s) => ({ x: s.x, y: WL + s.y });
export function mouthPos(g) { const m = mouth(g.sw); return { x: m.x, y: WL + m.y }; }

// ── 효과 ──
// 물보라 조각이 날아간다
function spray(g, x, y, n, power, size) {
  n = Math.ceil(n * 2.4);
  for (let i = 0; i < n; i++) {
    const a = rand(-Math.PI * 0.88, -Math.PI * 0.12), v = rand(0.5, 1.15) * power;
    g.sprays.push({
      sprite: 'c_drops_' + (2 + Math.floor(Math.random() * 7)), x: x + rand(-0.5, 0.5) * size, y,
      vx: Math.cos(a) * v * 0.8, vy: Math.sin(a) * v, rot: rand(-0.6, 0.6), vr: rand(-2.5, 2.5),
      size: clamp(size * rand(0.08, 0.2), 5, 22), age: 0, life: rand(0.6, 1.2), flip: Math.random() < 0.5,
    });
  }
}
// 수면에서 터지는 큰 물 덩어리 (몸부림 파도, 물 폭발)
function burst(g, sprite, x, size, life, flip = false) { g.bursts.push({ sprite, x, size, life, age: 0, flip }); }
function bubbles(g, x, y, n, spread) {
  for (let i = 0; i < n; i++) {
    g.bubbles.push({ sprite: 'c_bubbles_' + (1 + Math.floor(Math.random() * 4)), x: x + rand(-1, 1) * spread, y: y + rand(-0.3, 1) * spread * 0.5,
      size: rand(14, 34), age: 0, life: rand(1.2, 2.4), rot: rand(-0.5, 0.5), rise: rand(8, 20) });
  }
}
function swell(g, x, amp, dir, speed = 120, width = 60) { g.swells.push({ x, amp, dir, speed, width, age: 0, life: 3.2 }); }
function say(g, text, color = '#fff4dc') { g.msg = { text, color, age: 0 }; }
function kick(g, v) { g.rockV += v; }
function setState(g, s) { g.state = s; g.t = 0; }
function snd(g, name, arg) { g.sfx.push([name, arg]); }

// ── 입력 ──
export function press(g) {
  if (g.title) { tapTitle(g); return; }               // 제목 화면: 누르면 시작
  if (g.talk) { tapTalk(g); return; }                 // 대화 중에는 누르면 다음 줄
  if (g.skip || g.map || g.dex || g.memory) return;
  if (g.scene !== 'sea' || g.panel || g.travel) return;
  g.hold = true;
  switch (g.state) {
    case 'idle':
      if (g.cargo.length >= g.cargoMax) { say(g, '어창이 가득 찼다. 항구로!', '#ffd0c0'); break; }
      g.power = 0; g.powerDir = 1; setState(g, 'charge'); break;
    case 'wait':
      if (g.wait.fakeT > 0) { say(g, '앗, 도망갔다!', '#ffd0c0'); g.emote = { icon: 'tear', age: 0 }; }
      else say(g, '줄을 거뒀다');
      flee(g); reelIn(g);
      break;
    case 'bite': {
      const b = g.bite, tau = g.t - b.openAt;
      if (tau < 0) { say(g, '너무 빨랐다!', '#ffd0c0'); flee(g); reelIn(g); break; }
      b.perfect = tau < b.perfectWin;
      if (b.perfect) questPerfect(g);
      if (g.fish.power > OVERPOWER) say(g, '엄청난 힘이다…!', '#ffb39a');
      else say(g, b.perfect ? 'PERFECT!' : 'GOOD', b.perfect ? '#ffe27a' : '#fff4dc');
      kick(g, 0.25); snd(g, 'hook', b.perfect); buzz(25, 1);
      g.sw.shake = 1; g.sw.tailAmp = 0.14;
      setState(g, 'hook');
      break;
    }
    case 'catch':
      if (g.t > 0.4 && g.catch.seen) g.catch.skip = true;      // 연출 넘기기: 이미 낚아 본 생물만. 처음 낚는 생물은 끝까지 본다
      break;
    case 'result':
      if (g.t > (g.catch.quick ? 0.55 : 1.1)) {
        const f = g.fish;
        if (f.isFantasy) { g.catch.phase = 'release'; if (g.relics < RELICS.length) { g.memoryNext = g.relics; g.relics++; g.sinceFantasy = 0; g.lostFantasy = false; g.dirty = true; }
          else g.catch.thanks = Math.round(THANKS_GOLD * priceMult(g.eco, g.region)); }   // 물건을 다 찾은 뒤에는 바다가 답례를 한다 (놓아준 생물이 물에 닿는 순간)
        else {
          if (g.dexNote) { say(g, g.dexNote, '#ffe27a'); g.dexNote = null; } else say(g, `어창에 실었다 (${g.cargo.length}/${g.cargoMax}) · 선금 +${fmt(f.advance || 0)} G`);
          g.msg.y = H - 14;      // 낚은 생물과 현판을 가리지 않게 맨 아래에
          snd(g, 'stow');
          g.catch.phase = 'stow';
        }
        g.catch.pt = 0;
        if (g.result) g.result.out = 0;          // 카드와 현판은 뚝 사라지지 않고 스르르 물러난다
        if (g.catchFx) g.catchFx.out = 0;
        setState(g, 'leave');
      }
      break;
  }
}

export function release(g) {
  g.hold = false;
  if (g.panel) g.panel.rep = null;                    // 스킬 단추에서 손을 뗐다: 연달아 올리기를 멈춘다
  if (g.state === 'charge') {
    g.castX = lerp(CAST_NEAR, CAST_FAR, g.power);
    const tip = rodPose(g).tip;
    g.cast = { fromX: tip.x, fromY: tip.y };
    kick(g, -0.2); snd(g, 'cast');
    setState(g, 'cast');
  }
}

function reelIn(g) {
  g.bob.inWater = false; g.wait = null; g.bite = null; g.fight = null; g.fish = null;
  setState(g, 'idle');
}

// 그림자가 깊은 곳으로 달아난다 (상태와 무관하게 사라질 때까지 헤엄)
function flee(g) {
  // 환상종을 놓쳤다: 몇 번 안에 같은 그림자가 다시 찾아온다 (오래된 물건을 다 찾기 전까지)
  if (g.fish && g.fish.isFantasy && g.relics < RELICS.length && g.state !== 'leave') { g.sinceFantasy = PITY - RETRY; g.lostFantasy = true; g.dirty = true; }
  if (!g.sw) return;
  const s = g.sw;
  s.fleeing = true; s.act = 'dive';
  s.target = { x: s.x - 320 - s.len * 0.4, y: DEEP + 20, speed: 1.4 };
}

// ── 매 프레임 갱신 ──
// 물속 그림자의 길이: 어느 바다에서나 같다. 태초의 바다에서도 거대한 그림자가 올라오는데, 낚고 보면 평범한 물고기다
const shadowLen = () => SHADOW_LEN;
export function update(g, dt) {
  if (g.questT != null) g.questT += dt;
  // 도감을 다 채운 뒤 처음 한가해졌을 때: 화면이 환해지고 옛 노래가 흐르며 해도가 펼쳐진다. 빈 양피지 위에 태초의 바다가 떠오른다
  if (g.primalShow && g.state === 'idle' && g.scene === 'sea' && !g.talk && !g.memory && !g.map && !g.dex && !g.travel && !g.panel && g.t > 0.8) { g.primalShow = false; g.flash = 0.9; snd(g, 'oldsong'); openMap(g); g.map.reveal = 0; g.dirty = true; }
  // 연출용 시간 조절: 히트스톱(완전 정지)과 슬로모션. 화면 효과(번쩍임·글자·동전)는 실제 시간으로 흐른다.
  g.realDt = dt;
  g.flash = approach(g.flash, 0, 7, dt);
  if (g.catchFx) { g.catchFx.age += dt; if (g.catchFx.out != null && (g.catchFx.out += dt) > 0.25) g.catchFx = null; }
  if (g.result) { g.result.age = (g.result.age || 0) + dt; if (g.result.out != null && (g.result.out += dt) > 0.25) g.result = null; }
  g.goldShown = Math.abs(g.gold - g.goldShown) < 0.6 ? g.gold : approach(g.goldShown, g.gold, 6, dt);
  for (const c of g.coins) c.age += dt;
  g.coins = g.coins.filter((c) => c.age < c.life);
  updateTravel(g, dt); updateHarbor(g, dt); updateStory(g, dt); updateBook(g, dt);
  // 바다에서의 하루: 새벽에 나가서 밤이 끝나면 항구로 돌아온다 (항구에 있는 동안은 시간이 멈춘다)
  if (g.scene === 'sea' && !g.travel) {
    if (!g.talk && !g.skip && !g.map && !g.dex && !g.memory && !g.title) g.dayT += dt / (has(g, 'cup') ? 1.1 : 1);   // 컵: 하루가 길어진다                // 대화하는 동안은 시간이 흐르지 않는다
    g.phase = phaseAt(Math.min(0.999, g.dayT / DAY_SEC));
    if (!g.dayWarned && g.dayT > DAY_SEC * 0.9) { g.dayWarned = true; if (g.state === 'idle' || g.state === 'wait') say(g, '밤이 깊었다. 곧 돌아가야 한다', '#cfd8ff'); }
    if (g.dayT >= DAY_SEC && g.state === 'idle' && !g.panel && !g.talk && !g.map && !g.dex && !g.memory) {             // 낚시 중이면 그 한 마리는 끝까지 낚게 둔다
      if (enterHarbor(g)) g.msg = { text: '하루가 저물어 항구로 돌아간다', color: '#cfd8ff', age: 0 };
    }
  }
  if (g.msg && (g.scene !== 'sea' || g.panel)) { g.msg.age += dt; if (g.msg.age > 1.6) g.msg = null; }
  if (g.scene !== 'sea') { g.time += dt; return; }                    // 항구에 있는 동안 바다는 멈춰 있다
  if (g.freeze > 0) { g.freeze -= dt; return; }
  g.timeScale = approach(g.timeScale, g.slowTarget, 9, dt);
  g.slowTarget = 1;
  dt *= g.timeScale;

  g.time += dt; g.t += dt;

  g.rockV += (-g.rock * 40 - g.rockV * 4) * dt;
  g.rock += g.rockV * dt;
  g.shake = approach(g.shake, 0, 6, dt);

  const bob = g.bob;
  bob.dipV += ((bob.dipTarget || 0) - bob.dip) * 120 * dt - bob.dipV * 9 * dt;
  bob.dip += bob.dipV * dt;

  let rodTarget = 0.32, rodRate = 8, bendTarget = 0, pose = 1;
  let zoomRate = 2.6;
  let tiltTarget = 0, dxTarget = 0, roughTarget = 0, zoomTarget = 1, dimTarget = 0, shaftsTarget = 0, raysTarget = 0;

  switch (g.state) {
    case 'idle': {
      bob.dipTarget = 0;
      const tip = rodPose(g).tip;
      bob.x = approach(bob.x, tip.x + Math.sin(g.time * 2) * 1.2, 10, dt);
      bob.y = approach(bob.y, tip.y + 12, 10, dt);
      break;
    }
    case 'charge': {
      g.power += g.powerDir * TIMING.chargeSpeed * (has(g, 'shoe') ? 1.4 : 1) * dt;
      if (g.power >= 1) { g.power = 1; g.powerDir = -1; }
      if (g.power <= 0) { g.power = 0; g.powerDir = 1; }
      rodTarget = 1.5 + g.power * 0.7; rodRate = 12; pose = 2;
      const tip = rodPose(g).tip;
      bob.x = approach(bob.x, tip.x, 14, dt); bob.y = approach(bob.y, tip.y + 10, 14, dt);
      break;
    }
    case 'cast': {
      rodTarget = 0.15; rodRate = 20;
      const u = Math.min(1, g.t / TIMING.castFlight), e = 1 - (1 - u) * (1 - u);
      bob.x = lerp(g.cast.fromX, g.castX, e);
      bob.y = lerp(g.cast.fromY, WL, u) - Math.sin(u * Math.PI) * (60 + g.power * 50);
      if (u >= 1) {
        bob.inWater = true; bob.dipV = 60;
        burst(g, 'c_plop', bob.x, 34, 0.55); spray(g, bob.x, WL, 2, 50, 16); swell(g, bob.x, 1.6, 1, 60, 14); swell(g, bob.x, 1.6, -1, 60, 14); snd(g, 'plop');
        startWait(g);
      }
      break;
    }
    case 'wait': updateWait(g, dt); break;
    case 'bite': {
      const b = g.bite;
      holdAtFloat(g, dt);
      bob.x = g.castX; bob.y = surfaceY(g, bob.x);
      roughTarget = 0.12;
      if (b.pattern === 'tok') {
        while (b.next < 3 && g.t >= b.next * TIMING.tokInterval) {
          bob.dipV += b.next === 2 ? 110 : 70;
          g.sw.shake = Math.max(g.sw.shake, 0.5);
          swell(g, bob.x, 1.2 + b.next * 0.5, 1, 50, 12); swell(g, bob.x, 1.2 + b.next * 0.5, -1, 50, 12);
          if (b.next === 2) { bob.dipTarget = 6; g.emote = { icon: 'bang', age: 0 }; snd(g, 'bite'); } else snd(g, 'nibble');
          b.next++;
        }
      } else if (!b.started) {
        b.started = true; bob.dipTarget = 10; bob.dipV += 90;
        swell(g, bob.x, 2.4, 1, 60, 16); swell(g, bob.x, 2.4, -1, 60, 16);
        g.emote = { icon: 'bang', age: 0 }; snd(g, 'bite');
      }
      if (g.t > b.openAt + b.window) { say(g, '놓쳤다…', '#ffd0c0'); g.emote = { icon: 'tear', age: 0 }; flee(g); reelIn(g); }
      break;
    }
    case 'hook': {
      rodTarget = 1.15; rodRate = 22; bendTarget = 0.55; pose = 2; roughTarget = 0.3;
      const s = g.sw;
      if (g.t === dt) { const mx = mouthPos(g).x; burst(g, 'c_thrash', mx, Math.min(150, 40 + s.len * 0.12), 0.9); spray(g, mx, WL, 3, 90, 26); bubbles(g, s.x, WL + s.y, 3, s.len * 0.2); }
      s.target = { x: s.x - 70, y: 40, speed: 1.3 };
      steer(s, dt, { arrive: false });
      followLine(g, dt);
      if (g.t >= TIMING.hook) startFight(g);
      break;
    }
    case 'fight': {
      const r = updateFight(g, dt);
      if (!r) break;
      ({ rodTarget, bendTarget, tiltTarget, dxTarget, roughTarget } = r);
      rodRate = 10; pose = 2;
      break;
    }
    case 'catch': case 'result': case 'leave': {
      pose = 3; rodRate = 7;
      const r = updateCatch(g, dt);
      ({ rodTarget, bendTarget, roughTarget, zoomTarget, dimTarget, shaftsTarget, raysTarget, tiltTarget } = r);
      if (r.zoomRate) zoomRate = r.zoomRate;
      if (g.state === 'result') {
        const res = g.result;
        if (g.t > 0.3 && g.t < 0.95) { res.tickT -= g.realDt; if (res.tickT <= 0) { res.tickT = 0.06; snd(g, 'tick'); } }
        if (!res.stamped && (res.isNew || res.isRecord) && g.t > 1.0) { res.stamped = true; snd(g, 'stamp'); g.shake = 2.5; buzz(40); }
      }
      break;
    }
    case 'fail': {
      rodTarget = 0.6; pose = 1; roughTarget = 0.2;
      const tip = rodPose(g).tip;
      bob.x = approach(bob.x, tip.x, 5, dt); bob.y = approach(bob.y, tip.y + 12, 5, dt);
      if (g.t >= TIMING.fail) { g.fish = null; setState(g, 'idle'); }
      break;
    }
  }

  if (g.sw) updatePose(g.sw, dt);

  // 달아나는 그림자: 깊어지고 흐려지다 사라진다
  if (g.sw && g.sw.fleeing) {
    steer(g.sw, dt, { arrive: false });
    g.sw.vis = approach(g.sw.vis, 0, 1.4, dt);
    if (g.sw.vis < 0.02) g.sw = null;
  }

  // 배·바다·카메라는 목표값을 향해 서서히
  const B = g.boat, prevDx = B.dx;
  g.pose = pose;
  B.tilt = approach(B.tilt, tiltTarget, 3, dt);
  B.dx = approach(B.dx, dxTarget, 1.6, dt);
  B.spray = approach(B.spray, clamp(Math.abs(B.dx - prevDx) / Math.max(dt, 1e-4) / 14, 0, 1), 4, dt);
  g.rough = approach(g.rough, roughTarget, roughTarget > g.rough ? 3 : 0.7, dt);
  // 원래 크기로 돌아올 때는 정해진 시간 안에 끝낸다: 천천히 출발해 천천히 멎고, 끝나면 정확히 1배.
  // (끝없이 조금씩 다가가면 2초 가까이 화면 전체가 0.9몇 배로 확대된 채 일렁인다)
  if (zoomTarget === 1 && g.cam.zoom < 0.998) {
    const b = g.camBack || (g.camBack = { from: g.cam.zoom, t: 0 });
    b.t += g.realDt;
    const k = clamp(b.t / 1.0, 0, 1), e = k * k * (3 - 2 * k);
    g.cam.zoom = k >= 1 ? 1 : Math.pow(b.from, 1 - e);
  } else {
    g.camBack = null;
    g.cam.zoom = Math.abs(zoomTarget - g.cam.zoom) < 0.002 ? zoomTarget : approach(g.cam.zoom, zoomTarget, zoomRate, g.realDt);
  }
  g.cam.ox = BOAT_X * (1 - g.cam.zoom); g.cam.oy = WL * (1 - g.cam.zoom);          // 평소: 배를 기준으로 물러난다
  const cc = g.catch;
  if (cc && cc.reveal && (cc.phase === 'leap' || cc.phase === 'hang')) {
    // 막 건진 순간에는 생물에 바짝 붙어 있어 몸의 일부만 화면에 들어온다 → 카메라가 물러나며 전신이 드러나고 배는 점이 된다.
    // 생물도 배도 바다도 하늘도 같은 카메라로 함께 멀어진다 (생물만 따로 줄이지 않는다).
    const k = clamp((cc.popT - FACE_HOLD) / PULL_BACK, 0, 1), e = k * k * (3 - 2 * k);
    const z = cc.zs * Math.pow(cc.zoom / cc.zs, e);
    const endX = cc.fx * cc.zoom + BOAT_X * (1 - cc.zoom), endY = cc.ay * cc.zoom + WL * (1 - cc.zoom);
    const px = lerp(W * 0.56, endX, e), py = lerp(118, endY, e);                   // 얼굴이 화면에서 지나가는 길
    g.cam.zoom = z; g.cam.ox = px - cc.fx * z; g.cam.oy = py - cc.ay * z;
  }
  g.dim = approach(g.dim, dimTarget, 5, g.realDt);
  g.shafts = approach(g.shafts, shaftsTarget, 3, g.realDt);
  g.rays = approach(g.rays, raysTarget, 3.5, g.realDt);

  g.rodAngle = approach(g.rodAngle, rodTarget, rodRate, dt);
  g.rodBend = approach(g.rodBend, bendTarget, 10, dt);

  for (const s of g.swells) s.age += dt;
  g.swells = g.swells.filter((s) => s.age < s.life);
  for (const p of g.sprays) { p.age += dt; p.vy += 330 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt; }
  g.sprays = g.sprays.filter((p) => p.age < p.life && !(p.vy > 0 && p.y > WL + 3));   // 떨어져 수면에 닿으면 사라진다 (물속으로 가라앉지 않는다)
  for (const b of g.bursts) b.age += g.realDt;                      // 슬로모션 중에도 물은 제 속도로 솟고 무너진다
  g.bursts = g.bursts.filter((b) => b.age < b.life);
  for (const b of g.bubbles) { b.age += dt; b.y -= b.rise * dt; }
  g.bubbles = g.bubbles.filter((b) => b.age < b.life && b.y > WL + 4);
  if (g.msg) { g.msg.age += dt; if (g.msg.age > 1.4) g.msg = null; }
  if (g.emote) { g.emote.age += dt; if (g.emote.age > 1.1) g.emote = null; }
}

// ── 입질 대기: 그림자가 깊은 곳에서 올라와 찌 밑을 맴돌다가 문다 ──
function startWait(g) {
  // 환상종은 드물지만, 너무 오래 안 나오면 반드시 한 번 나온다 (오래된 물건이 운에만 달리지 않게)
  const pity = !g.forceGrade && g.relics < RELICS.length && (g.sinceFantasy || 0) >= PITY ? 'fantasy' : null;      // 물건을 다 찾은 뒤에는 보장하지 않는다 (그때부터는 운)
  g.fish = rollCreature(g.forceGrade || pity, g.region, luckOf(g.eco, GRADES), has(g, 'musicbox') ? 1.5 : 1, g.power);      // g.power = 던진 세기: 멀리 던질수록 큰 개체
  g.sinceFantasy = (g.sinceFantasy || 0) + 1;      // 세는 수는 오래된 물건을 얻었을 때 처음으로 돌아간다 (나타나기만 하고 놓치면 곧 다시 온다)
  if (pity && g.lostFantasy) say(g, '아까 그 그림자다…', '#ffe9b8');                // 복장(행운): 높은 등급이 잘 나온다
  g.fish.price = Math.round(g.fish.price * priceMult(g.eco, g.region) * dexBonus(g, g.fish.region) * genMult(g));                // 해역·흥정·크기에 따른 값
  if (!g.fish.fixedSize) g.fish.meters *= sizeMult(g.eco);                                                    // 큰 개체: 몸길이
  g.fish.power = clamp(g.fish.power * pullOf(g.eco, Math.min(8, g.region)), 0.2, 6);      // 태초의 바다(9)는 8번 해역만큼만 세다 (그보다 좋은 장비가 없다)                // 낚싯대에 비해 얼마나 세게 날뛰는가
  g.fish.strain = clamp(strainOf(g.eco, Math.min(8, g.region)), 0.45, 6);      // 하한을 낮춰, 같은 바다에서도 줄 강화가 +5쯤까지 계속 체감된다                           // 줄에 비해 장력이 얼마나 빨리 차는가
  preloadCreature(g.fish.sprite, g.fish.sprite2);     // 그림자가 다가오는 동안 그림을 받아 둔다

  const L = SHADOW_LEN, fx = g.castX;     // 그림자는 등급과 상관없이 모두 같은 크기
  // 다가오는 길: 깊은 곳에서 떠올라 찌 밑을 천천히 지나친다. (좁은 구간을 왔다 갔다 하며 계속 돌아서지 않는다)
  // 매번 길이 다르다: 떠오르는 자리·깊이·빠르기, 찌 밑에서 뜸 들이기, 물러나는 거리가 그때그때 정해진다.
  const q0 = biteMult(g.eco), linger = () => ({ x: fx - L * rand(0.5, 0.74), y: rand(62, 112), speed: rand(0.28, 0.4), hover: rand(0.4, 1.1) / q0 });
  const plan = [
    { x: fx - L * rand(0.1, 0.34), y: DEEP * rand(0.52, 0.86), speed: rand(0.42, 0.62) },
  ];
  if (Math.random() < 0.35) plan.push(linger());                                // 가끔은 찌를 올려다보며 한참 뜸을 들인다
  const fakes = Math.floor(rand(0, has(g, 'key') ? 1.5 : 2.6));
  for (let i = 0; i < fakes; i++) {
    plan.push({ touch: true, fake: true, speed: rand(0.4, 0.6) });
    plan.push({ x: fx - L * rand(0.52, 0.8), y: rand(82, 126), speed: rand(0.36, 0.56), face: 1, hover: Math.random() < 0.4 ? rand(0.3, 1) / q0 : 0 });   // 건드려 보고는 뒷걸음질로 물러났다가 다시 온다
  }
  plan.push({ touch: true, fake: false, speed: rand(0.36, 0.5) });
  // 화면 아래 깊은 곳에서 떠오른다 (멀리 옆에서 미끄러져 오면 한참 동안 아무것도 안 보인다)
  const sw = createSwimmer(L, fx - 60 - L * rand(0.2, 0.55), DEEP + rand(95, 130), 1);
  { const q = biteMult(g.eco); sw.maxSpeed *= q; sw.accel *= q; }   // 손놀림: 입질이 빨리 온다
  sw.maxX = BOAT_X - L * 0.5 - 14;               // 머리가 배 밑을 넘어가지 않는다
  g.sw = sw;
  g.wait = { plan, step: 0, fakeT: 0, hover: 0, delay: rand(0.4, 1.2) / biteMult(g.eco), minTime: rand(2.5, 4) * (1 + g.power * 0.4) / biteMult(g.eco) };
  setState(g, 'wait');
}

// 주둥이가 찌 바로 밑에 닿도록 하는 목표 (왼쪽에서 다가와 오른쪽을 본다)
function floatTarget(g, speed) {
  return { x: g.castX - g.sw.len * 0.46, y: 12, speed, face: 1 };
}

function updateWait(g, dt) {
  const w = g.wait, s = g.sw, bob = g.bob;
  bob.x = g.castX; bob.y = surfaceY(g, bob.x);
  w.fakeT = Math.max(0, w.fakeT - dt);
  if (g.t < w.delay) return;
  s.vis = approach(s.vis, 1, 0.8, dt);

  const step = w.plan[Math.min(w.step, w.plan.length - 1)];
  if (step.touch) {
    s.target = floatTarget(g, step.speed);
    s.roam = 0.12;                                   // 찌에 입을 댈 때는 거의 흔들리지 않는다
    steer(s, dt);
    const m = mouth(s);
    const touching = Math.abs(g.castX - m.x) < 9 + s.len * 0.02 && s.y < s.floor + 12 && s.face > 0.8;   // 찌 바로 밑, 올라올 수 있는 가장 얕은 곳
    if (touching && step.fake) {
      w.fakeT = TIMING.fakeWindow;
      bob.dipV += 55; swell(g, bob.x, 1.4, 1, 50, 12); swell(g, bob.x, 1.4, -1, 50, 12); snd(g, 'nibble');
      s.shake = 0.6;
      w.step++;
    } else if ((touching && g.t >= w.minTime) || g.t > w.minTime + 14) {
      startBite(g);
    }
  } else {
    s.target = { ...step };
    s.roam = 1;
    if (steer(s, dt) < 30 + s.len * 0.1) {
      w.hover += dt;                                 // 다 와서는 잠깐 머뭇거리기도 한다
      if (w.hover >= (step.hover || 0)) { w.step++; w.hover = 0; }
    }
  }
}

function holdAtFloat(g, dt) {
  g.sw.target = floatTarget(g, 0.4);
  g.sw.roam = 0.12;
  steer(g.sw, dt);
}

function startBite(g) {
  const pattern = g.fish.bite;
  g.bite = pattern === 'tok'
    ? { pattern, next: 0, openAt: TIMING.tokInterval * 2, window: TIMING.tokWindow, perfectWin: TIMING.tokPerfect * (has(g, 'watch') ? 1.5 : 1) }
    : { pattern, started: false, openAt: 0, window: TIMING.pullWindow, perfectWin: TIMING.pullPerfect * (has(g, 'watch') ? 1.5 : 1) };
  setState(g, 'bite');
}

// ── 파이팅 ──
function startFight(g) {
  const dist0 = 30 + g.power * 50;
  g.fight = {
    dist0, dist: dist0, tension: 0.4, slack: 0, fx: 0,
    maxTension: g.bite.perfect ? 1.12 : 1.0,
    mode: 'hold', modeT: rand(1, 1.8), tele: 0, next: null,
    surging: false, runTo: null, did: false, stamina: 1,
    ox: rand(-24, 24), oy: rand(-6, 10), back: rand(40, 90), turnAt: rand(1.2, 1.9), deep: rand(90, 108),
  };
  setState(g, 'fight');
}

const toughOf = (g) => TOUGH[GRADES.indexOf(g.fish.gradeInfo)] || TOUGH[0];
function chooseMode(g) {
  const f = g.fight, modes = FIGHT_MODES[g.fish.grade] || FIGHT_MODES.common;
  if (f.stamina < 0.35 && Math.random() < 0.6) return 'tired';
  const surges = modes.filter((m) => SURGE_MODES.includes(m) && m !== f.mode);
  if (f.chainNext) { const m = f.chainNext; f.chainNext = null; return m; }
  // 사나운 등급은 한 번 날뛴 뒤 곧 또 날뛴다. 그래도 사이에 짧게 숨 돌릴 틈(0.8초)은 준다
  if (SURGE_MODES.includes(f.mode) && surges.length && Math.random() < toughOf(g).chain) { f.chainNext = pick(surges); f.breather = true; return 'hold'; }
  if (SURGE_MODES.includes(f.mode)) return Math.random() < 0.7 ? 'hold' : pick(modes.filter((m) => !SURGE_MODES.includes(m)));
  return pick(modes.filter((m) => m !== f.mode));
}

function startMode(g) {
  const f = g.fight, s = g.sw;
  f.modeT = { hold: rand(1.2, 2.4), run: rand(1, 1.7), dive: rand(1.1, 1.7), thrash: 1.3, circle: rand(2.2, 3.4), tired: rand(1.4, 2.2) }[f.mode];
  if (f.mode === 'hold' || f.mode === 'circle') f.modeT *= toughOf(g).calm;
  if (f.mode === 'hold' && f.breather) { f.modeT = 0.8; f.breather = false; }
  f.did = false;
  // 같은 동작이라도 할 때마다 자리·깊이·물러나는 거리가 조금씩 다르다
  f.ox = rand(-28, 28); f.oy = rand(-8, 12); f.back = rand(40, 95); f.turnAt = rand(1.1, 2); f.deep = rand(88, 108);
  if (f.mode === 'run') {
    const dir = Math.random() < 0.7 ? -1 : 1;     // 대부분 배에서 멀어지는 쪽으로
    f.runTo = { dx: dir < 0 ? -rand(70, 120) : rand(20, 50), y: rand(30, 75) };     // 기준 자리(남은 거리)에서 얼마나 벗어나 달리는가
  }
  if (SURGE_MODES.includes(f.mode)) { kick(g, 0.12 + g.fish.power * 0.08); g.emote = { icon: 'sweat', age: 0 }; snd(g, 'surge'); buzz(20); }
}

function updateFight(g, dt) {
  const f = g.fight, s = g.sw, p = g.fish.power, K = g.fish.strain, L = s.len;

  // 동작 전환. 날뛰는 동작 앞에는 조짐(움찔·꼬리 젖히기)이 먼저 온다.
  f.modeT -= dt;
  if (f.tele > 0) {
    // 정확한 대응: 조짐이 보이는 동안 손을 떼면 장력이 15% 내려간다 (조짐 한 번에 한 번)
    if (f.wasHold && !g.hold && !f.dodged) { f.dodged = true; f.relief = 0.15; g.emote = { icon: 'bang', age: 0 }; snd(g, 'tick'); buzz(25); }      // 손끝에 '됐다'
    f.tele -= dt;
    s.shake = 1; s.tailAmp = Math.max(s.tailAmp, 0.1);
    if (f.tele <= 0) { f.mode = f.next; startMode(g); }
  } else if (f.modeT <= 0) {
    const next = chooseMode(g);
    if (SURGE_MODES.includes(next)) { f.tele = TELEGRAPH * toughOf(g).tele + (has(g, 'glasses') ? 0.15 : 0); f.next = next; f.modeT = 99; buzz(12); }      // 조짐: 화면을 안 봐도 손으로 안다
    else { f.mode = next; startMode(g); }
  }
  if (f.tele <= 0) f.dodged = false;
  f.wasHold = g.hold;
  if (f.relief > 0) { const d = Math.min(f.relief, 0.6 * dt); f.relief -= d; f.tension -= d; }      // 뚝 내려가지 않고 0.25초에 걸쳐 스르르
  f.surging = SURGE_MODES.includes(f.mode) && f.tele <= 0;
  // 줄다리기의 손맛: 감는 동안 줄이 떨리듯 짧게 울리고(장력이 높을수록 촘촘하게), 날뛸 때는 굵게 울린다
  f.buzzT = (f.buzzT || 0) - dt;
  if (f.buzzT <= 0) {
    if (f.surging) { buzz(g.hold ? 34 : 20, 3); f.buzzT = 0.13; }
    else if (g.hold) { buzz(8 + Math.round(clamp(f.tension, 0, 1) * 10), 3); f.buzzT = lerp(0.34, 0.14, clamp(f.tension, 0, 1)); }
    else f.buzzT = 0.1;
  }
  f.stamina = clamp(f.stamina + (f.surging ? -0.06 * (has(g, 'kettle') ? 1.5 : 1) : 0.02) * dt, 0, 1);

  // 감기·풀기
  const tired = f.mode === 'tired';
  if (g.hold) {
    f.tension += ((0.4 - (tired ? 0.15 : 0)) * K + 0.12 * p + (f.surging ? 0.9 * p * toughOf(g).surge : 0)) * dt;   // 줄이 약하면(K) 감기만 해도 금방 찬다
    f.dist -= (f.surging ? 0.25 : tired ? 1.6 : 1) * FIGHT.reelSpeed * reelMult(g.eco) * dt;
  } else {
    f.tension -= (f.surging ? 0.4 : 0.75) / Math.max(1, K) * dt;                       // 약한 줄은 풀어 줘도 더디게 풀린다
    // 장비로 감당 못 하는 힘(1.75배 넘게): 날뛸 때는 줄을 풀어 줘도 장력이 오른다 → 장비가 한 단계 모자라면 버티지 못한다
    if (f.surging) f.tension += toughOf(g).drag * (g.region === 1 ? 0.85 : 1) * Math.pow(p, 0.15) * dt;      /* 첫 바다는 조금 순하게 */              // 낚싯대가 좋아질수록(힘 p 가 줄수록) 조금 덜 끌려간다 (차이는 완만하게: 장비 단계 안에서 실패율이 널뛰지 않게)                              // 사나운 등급: 날뛸 때는 풀어 줘도 끌려간다
    if (f.surging && p > OVERPOWER) f.tension += (p - OVERPOWER) * 2.6 * dt;
    if (K > OVERPOWER) f.tension += (K - OVERPOWER) * 0.5 * dt;                        // 줄이 한 단계 모자라면 풀어 줘도 끝내 끊어진다
    f.dist = Math.min(f.dist0 * 1.2, f.dist + (f.surging ? 5 * p : 1.5) * dt);
  }
  f.tension = Math.max(0, f.tension);
  f.slack = f.tension < FIGHT.slackLimit ? f.slack + dt : Math.max(0, f.slack - dt * 0.5);

  // 동작별 헤엄 목표. 기준점 = 감은 만큼 배 쪽으로 다가온 위치
  const far = clamp(f.dist / f.dist0, 0, 1.2);
  // 남은 거리(m)가 줄수록 배 쪽으로 온다: 0m면 머리가 배 바로 앞, 처음 거리면 찌가 있던 자리 밑.
  const ax = lerp(s.maxX - 6, Math.max(g.castX - L * 0.47, 120), Math.min(1, far));
  switch (f.mode) {
    case 'hold':
      s.target = { x: ax + f.ox, y: 26 + f.oy, speed: 0.4, face: 1 };
      s.shake = Math.max(s.shake, 0.45 + 0.3 * Math.sin(g.time * 3));
      break;
    case 'run': s.target = { x: ax + f.runTo.dx, y: f.runTo.y, speed: 1.5 }; break;
    case 'dive': s.target = { x: ax - 40 + f.ox, y: f.deep, speed: 0.9 }; break;      // 너무 깊이 가면 어두운 물에 묻혀 머리가 안 보인다
    case 'thrash':     // 수면 바로 밑에서 몸부림: 수면이 부풀고 큰 파도가 터진다
      s.target = { x: ax, y: 10, speed: 0.7, face: 1 };
      s.shake = 1; s.tailAmp = Math.max(s.tailAmp, 0.09);
      if (!f.did && f.modeT < 0.85 && s.y < s.floor + 14) {
        f.did = true;
        const LV = L * (s.show || 1), size = clamp(LV * 0.5, s.show ? 36 : 120, 330);      // 작은 생물은 물보라도 작다
        burst(g, 'c_thrash', s.x, size, 1.3);
        spray(g, s.x, WL, 5, 150 + LV * 0.1, size * 0.28);
        bubbles(g, s.x, WL + 30, 5, LV * 0.25);
        swell(g, s.x, 5 + LV * 0.006, 1, 130, 70); swell(g, s.x, 5 + LV * 0.006, -1, 130, 70);
        g.shake = Math.max(g.shake, 1.5 + p); snd(g, 'splash'); buzz(30);
      }
      break;
    case 'circle':     // 배 쪽으로 들이닥쳤다가 물러난다 (배 밑을 넘어가지는 않는다)
      s.target = { x: f.modeT > f.turnAt ? ax + 55 : ax - f.back, y: 78 + f.oy, speed: 0.95 };
      break;
    case 'tired': s.target = { x: ax + 20 + f.ox * 0.5, y: 14 + Math.max(0, f.oy), speed: 0.25, face: 1 }; break;
  }
  if (f.mode !== 'circle') s.target.x = Math.max(s.target.x, 110);
  s.target.x = Math.min(s.target.x, s.maxX);
  // 걸린 내내 몸부림친다: 날뛸 때 가장 세고, 지치면 잦아든다
  s.shake = Math.max(s.shake, f.surging ? 1 : f.mode === 'tired' ? 0.35 : 0.8);
  s.roam = f.mode === 'thrash' ? 0.15 : f.mode === 'run' ? 0.4 : 0.8;
  steer(s, dt, { arrive: f.mode !== 'run' });
  // 줄에 끌려온다: 몸부림으로 뒤로 버텨도 남은 거리만큼의 자리로 서서히 당겨진다 (m가 줄면 반드시 배 쪽으로 온다)
  s.x = Math.min(s.maxX, approach(s.x, s.target.x, 1.6, dt));
  s.y = Math.min(s.y, 110);                        // 걸린 동안은 그림자가 또렷이 보이는 깊이까지만
  s.vis = 1;
  s.act = f.mode === 'thrash' && s.y < s.floor + 22 ? 'thrash' : f.mode === 'dive' && s.pitch > 0.18 ? 'dive' : null;

  followLine(g, dt);
  g.bob.dipTarget = f.surging ? 8 : 5;
  if (f.surging) {
    f.fx -= dt;
    if (f.fx <= 0) {
      f.fx = 0.22;
      spray(g, g.bob.x + rand(-6, 6), WL, 1, 60 + L * 0.05, 18);
      bubbles(g, s.x + rand(-1, 1) * L * 0.3, WL + s.y, 1, L * 0.1);
    }
    g.shake = Math.max(g.shake, 0.4 + p * 0.3);
  }

  if (f.tension >= f.maxTension && has(g, 'photo') && !g.savedToday) {      // 가족 사진: 하루에 한 번, 끊어지려는 줄이 버텨 준다
    g.savedToday = true; f.tension = f.maxTension * 0.45; g.flash = Math.max(g.flash, 0.2); say(g, '줄이 버텨 주었다', '#ffe9b8'); snd(g, 'card');
  }
  if (f.tension >= f.maxTension) { fail(g, p > OVERPOWER ? '낚싯대가 버티지 못했다! 더 좋은 낚싯대가 필요하다' : g.fish.strain > OVERPOWER ? '줄이 끊어졌다! 더 좋은 줄이 필요하다' : '줄이 끊어졌다!'); return null; }
  if (f.slack > FIGHT.slackTime * (has(g, 'bottle') ? 1.6 : 1)) { fail(g, '바늘이 빠졌다…'); return null; }
  if (f.dist <= 0) {
    // 다 감았다. 다만 배 밑이나 반대쪽에 가 있으면 솟구칠 자리까지 뒷걸음질치게 되므로,
    // 제자리(배 왼쪽)로 돌아올 때까지 지친 상태로 끌려오게 한 뒤 낚아 올린다.
    f.dist = 0;
    if (s.x < BOAT_X - 110 - L * 0.2 && s.face > 0.6) { startCatch(g); return null; }
    f.mode = 'tired'; f.modeT = 1; f.tele = 0;
  }

  // 배의 반응: 줄이 당기는 쪽(왼쪽)으로 기울고, 날뛸 때 버티면 끌려간다
  const pull = clamp(f.tension, 0, 1.2) * Math.min(2, 0.6 + p * 0.6);
  return {
    rodTarget: 0.85 + (g.hold ? 0.2 : 0),
    bendTarget: 0.3 + f.tension * 1.0,
    tiltTarget: -pull * 0.13,
    dxTarget: -(f.surging && g.hold ? 34 : pull * 9),
    roughTarget: 0.35 + (f.surging ? 0.3 : 0) + f.tension * 0.15,
  };
}

// 찌는 줄이 수면을 가르는 자리에 끌려다닌다
function followLine(g, dt) {
  const tip = rodPose(g).tip, m = mouthPos(g);
  const k = clamp((WL - tip.y) / Math.max(1, m.y - tip.y), 0, 1);
  const ex = tip.x + (m.x - tip.x) * k;
  g.bob.x = approach(g.bob.x, ex, 12, dt);
  g.bob.y = surfaceY(g, g.bob.x);
}

// ── 낚아 올리기 (목표 화면 3) ──
// 등급별 연출 강도 (0 일반 ~ 5 환상)
const SLOW = [0.55, 0.45, 0.38, 0.3, 0.25, 0.2];
const DIM = [0, 0.04, 0.08, 0.14, 0.2, 0.26];
const OVERPOWER = 1.75;    // 생물의 힘 ÷ 내 장비의 힘이 이보다 크면 감당할 수 없다
const T_PULL = 0.95;
const THANKS_GOLD = 9000;      // 바다의 답례: 그 해역 전설 등급 값의 1.5배
const RETRY = 4;             // 놓친 환상종이 다시 오기까지의 낚시 횟수
export const PITY = 48;      // 환상종이 이만큼 연달아 안 나오면 다음은 환상종
const QUICK = 2;            // 이미 본 일반 등급의 연출 빠르기
const FACE_HOLD = 0.55;    // 뿅 한 뒤 카메라가 물러나기 시작할 때까지(초)
const PULL_BACK = 1.7;     // 카메라가 물러나는 데 걸리는 시간(초)

function startCatch(g) {
  // 솟아오르는 것은 모두 같은 크기의 그림자. 꼭대기에서 뿅 하는 순간에만 등급에 맞는 크기의 생물로 바뀐다.
  const big = g.fish.len * LEAP_SCALE, gi = GRADES.indexOf(g.fish.gradeInfo);
  // 다 물러났을 때의 구도: 몸 전체가 수면 위 하늘에 떠서 다 보이고, 배는 등급이 높을수록 작은 점이 된다.
  const spr = sprite(g.fish.sprite), asp = spr.h / spr.w;
  const fit = Math.min(1, 0.56 / asp);                               // 키 큰 생물은 높이에 맞춰 줄인다
  const dw = big * fit, dh = dw * asp;                               // 생물의 실제 크기 (세계 좌표, 변하지 않는다)
  // 다 물러났을 때 화면에서의 폭. 전신이 화면 안에 들어와야 한다: 놀란 표정 그림은 더 높고(땀방울),
  // 펄떡일 때는 커지고(1.1배) 기울고(0.22) 위로 튄다 → 그만큼을 미리 빼고 맞춘다.
  const s2 = g.fish.sprite2 && g.fish.sprite2 !== g.fish.sprite ? sprite(g.fish.sprite2) : spr, taller = Math.max(0, (s2.sh || s2.h) / (spr.sh || spr.h) - 1);
  const dwS = Math.min(W * 0.58, (WL - 34) / (asp * (1.05 + 1.1 * taller) + 0.11 + 0.07 * shadowLen(g) / dw));
  const zoom = clamp(Math.min(0.85, dwS / dw), 0.1, 1) * (g.fish.fixedSize ? clamp(70 / dw, 1, 2.6) : 1);      // 태초의 바다의 작은 물고기: 카메라가 배 가까이 다가가 본다
  const ax = BOAT_X + (W * 0.74 - dwS / 2 - BOAT_X) / zoom, ay = WL - dh / 2 - (26 + (g.fish.fixedSize ? clamp(120 - dh * zoom, 0, 95) : 0)) / zoom;   // 생물이 걸려 있는 자리. 태초의 바다의 작은 것들도 하늘 높이 들어 올려 잘 보이게 한다
  // 막 건진 순간의 구도: 얼굴 쪽에 바짝 붙어, 몸이 화면보다 커서 일부만 보인다.
  const zs = Math.max(zoom * 1.9, Math.min(3, W * 1.35 / dw)), fx = ax + dw * 0.26;
  const lw = shadowLen(g);
  let ex = W * 0.42;
  if (g.sw) ex += clamp(g.sw.x + lw * 0.3 - ex, -50, 40);            // 그림자가 있는 자리에 가깝게
  g.catch = {
    phase: 'pull', pt: 0, lw, gi, zoom, zs, ex, big, fit, ax, ay, fx,
    seen: g.records[g.fish.name] != null,                 // 이미 낚아 본 생물인가 (그러면 눌러서 연출을 넘길 수 있다)
    quick: has(g, 'robot') && !g.fish.isFantasy && g.records[g.fish.name] != null,      // 빨리 감기는 태엽 로봇의 능력으로만 (평소에는 눌러서 넘기면 된다)
    rise: 1.25,
    x: ex, y: WL + 200, rot: -0.5, out: 0, mix: 0, alpha: 1, scale: 1,
    erupted: false, shed: 0, skip: false, from: null, trail: 0,
    bulgeK: 0, hitX: ex, reveal: false, popT: 0, churn: 0, swished: false, tadaT: 0, mx: ex, my: WL,
  };
  g.fight = null;
  snd(g, 'surge');
  setState(g, 'catch');
}

// 솟구치는 자세 그림 안에서 입의 위치 (그림 폭·높이 대비, 가운데 기준)
export const LEAP_MOUTH = [0.42, 0];
export function leapMouth(c, lh) {
  if (c.phase === 'leap') return { x: c.mx, y: c.my };
  const mx = LEAP_MOUTH[0] * c.lw * c.fit * c.scale, my = LEAP_MOUTH[1] * lh * c.scale;
  const cs = Math.cos(c.rot), sn = Math.sin(c.rot);
  return { x: c.x + mx * cs - my * sn, y: c.y + mx * sn + my * cs };
}
export const leapHeight = (c) => c.lw * 0.705;

function updateCatch(g, dt) {
  const c = g.catch, s = g.sw, lw = c.lw, lh = leapHeight(c), gi = c.gi;
  const start = { x: c.ex - lw * 0.1, y: WL + lh * 0.62 }, apex = { x: c.ex + lw * 0.03, y: WL - lh * 0.42 };
  // 드러난 생물은 얼굴(오른쪽 끝)이 하늘 한가운데에 오도록 건다. 화면을 넘는 몸은 왼쪽·위아래로 잘려도 얼굴은 반드시 보인다.
  if (c.reveal) {
    apex.x = c.ax; apex.y = c.ay;
  }
  const out = { rodTarget: 1.2, bendTarget: -0.25, roughTarget: 0.5, zoomTarget: c.reveal ? c.zoom : 1, zoomRate: 12, dimTarget: 0, shaftsTarget: 0, raysTarget: 0, tiltTarget: -0.1 };
  // 이미 도감에 있는 일반 등급은 같은 연출을 빠르게 넘긴다 (수백 번 되풀이되는 장면이라 짧게)
  if (c.quick) dt *= QUICK;
  c.pt += dt;

  if (c.phase === 'pull') {
    // 낚싯대를 채는 순간. 그림자가 솟구칠 자리 밑으로 물러나 몸을 웅크렸다가(전반),
    // 머리를 치켜들고 수면으로 돌진한다(후반). 솟구치는 몸은 그림자가 수면에 닿은 바로 그 자리에서 나온다.
    out.rodTarget = 1.5; out.bendTarget = 0.9; out.roughTarget = 0.7;
    if (s) {
      if (!c.from) c.from = { x: s.x, y: s.y, pitch: s.pitch, face: s.face };
      const u = clamp(c.pt / T_PULL, 0, 1), f = c.from;
      const coil = { x: c.ex - lw * 0.3, y: Math.min(DEEP * 0.6, 40 + lh * 0.15) }, hit = { x: c.ex - lw * 0.12, y: s.floor * 0.6 };
      if (u < 0.55) {
        const k = u / 0.55, e = k * k * (3 - 2 * k);
        s.x = lerp(f.x, coil.x, e); s.y = lerp(f.y, coil.y, e); s.pitch = lerp(f.pitch, 0.2, e);
        s.act = k > 0.35 ? 'dive' : null;
      } else {
        const k = (u - 0.55) / 0.45, e = k * k;                       // 점점 빨라지며 돌진
        s.x = lerp(coil.x, hit.x, e); s.y = lerp(coil.y, hit.y, e); s.pitch = lerp(0.2, -0.5, Math.min(1, k * 1.6));
        s.act = 'surge';
        c.trail -= dt;
        if (c.trail <= 0) { c.trail = 0.05; bubbles(g, s.x - lw * 0.2, WL + s.y + 10, 1, lw * 0.08); }
      }
      s.face = approach(s.face, 1, 10, dt); s.vis = 1; s.shake = 1;
      s.tail += dt * s.beat * 2.4;
      followLine(g, dt);
      // 머리가 수면을 밀어 올린다: 둥글게 부풀다가(1) 터지며 갈라진다(2)
      c.hitX = hit.x + lw * 0.08;
      c.bulgeK = clamp((u - 0.4) / 0.48, 0, 1) + (u > 0.9 ? 1 : 0);
      if (u > 0.7 && !c.bulge) { c.bulge = true; swell(g, hit.x, 4 + lw * 0.01, 1, 110, 50); swell(g, hit.x, 4 + lw * 0.01, -1, 110, 50); }
    }
    if (c.pt >= T_PULL || c.skip) {
      // 수면이 터진다: 히트스톱 + 번쩍임 + 물 폭발 + 사방으로 물보라 + 큰 물결
      c.phase = 'leap'; c.pt = 0;
      if (s) s.vis = 0;                                              // 그림자는 이 순간 솟구치는 몸으로 바뀐다
      g.freeze = 0.08 + gi * 0.02; g.flash = 0.55 + gi * 0.08;
      spray(g, c.ex - lw * 0.1, WL, 9, 190 + lw * 0.35, lw * 0.3);
      c.eruptX = c.ex - lw * 0.04; c.eruptW = lw * 0.4;             // 물기둥은 몸이 수면을 뚫는 바로 그 자리에 하나만 선다
      bubbles(g, c.ex - lw * 0.1, WL + 20, 9, lw * 0.45);
      swell(g, c.ex, 9 + lw * 0.02, 1, 150, 80); swell(g, c.ex, 9 + lw * 0.02, -1, 150, 80);
      g.shake = Math.min(8, 3 + lw / 120); kick(g, 0.35);
      snd(g, 'breachOut', lw / 400); snd(g, 'riser', Math.min(2.6, c.rise * 0.8 / SLOW[gi])); buzz(60 + gi * 15);
      g.bob.inWater = false; g.bob.dipTarget = 0;
    }
  }

  if (c.phase === 'leap') {
    // 줄에 끌려 물 밖으로 뽑혀 나온다: 빠르게 솟았다가 꼭대기에서 느려진다
    if (c.skip) c.pt = Math.max(c.pt, c.rise);
    const u = clamp(c.pt / c.rise, 0, 1), e = easeOut(u);
    // 구구구구…: 정체 모를 거대한 그림자가 물보라에 싸인 채 솟아오른다. 꼭대기에 닿는 순간 뿅 — 정체가 드러난다.
    c.x = lerp(start.x, apex.x, e); c.y = lerp(start.y, apex.y, e);
    c.rot = lerp(-0.75, -0.1, e);
    if (c.reveal) { c.x = apex.x; c.y = apex.y; }
    if (!c.reveal && u >= 0.86) {
      c.reveal = true; c.popT = 0;
      c.lw = c.big; c.ex = c.ax;
                                   // 여기서부터 등급에 맞는 크기
      g.flash = 0.5; g.freeze = 0.06; g.shake = 3;
      g.sprays.length = 0;                                            // 확대된 얼굴 앞에 물방울이 크게 떠다니지 않게
      snd(g, 'pop');
    }
    if (c.reveal) { c.popT += g.realDt * (c.quick ? QUICK : 1); c.rot = 0; }
    const reach = c.lw * 0.42 * (c.reveal ? c.fit : 1);
    c.mx = c.x + reach * Math.cos(c.rot); c.my = c.y + reach * Math.sin(c.rot);
    c.out = e;
    if (u > 0.12 && !c.reveal && !c.skip && !c.quick) g.slowTarget = SLOW[gi];
    out.roughTarget = 1; out.shaftsTarget = 0.8; out.raysTarget = u > 0.35 ? 0.65 + gi * 0.07 : 0; out.dimTarget = DIM[gi];
    c.shed -= dt;                                   // 몸에서 물이 흩어진다
    if (c.shed <= 0 && !c.reveal) { c.shed = 0.05; spray(g, c.eruptX + rand(-0.2, 0.2) * lw, WL - rand(4, lh * 0.5), 1, 110 + lw * 0.12, lw * 0.3); }   // 물보라가 그림자를 감싼다
    // 뿅(얼굴이 화면 가득) → 스윽(카메라가 물러나 전신이 드러남) → 짜잔(팡파르 + "낚았다!" + 카드)
    const far = true;
    if (c.reveal && far && !c.swished && c.popT >= FACE_HOLD) { c.swished = true; snd(g, 'swish'); }
    const tadaAt = FACE_HOLD + PULL_BACK - 0.15;
    if (!g.catchFx && c.reveal && (c.popT >= tadaAt || c.skip)) { g.catchFx = { age: 0, gi: g.fish.fixedSize ? 2 : gi }; c.tadaT = c.popT;      /* 태초의 생물은 '낚았다!' 글자가 하나(물결)로 같다 */ g.flash = Math.max(g.flash, 0.25); snd(g, 'fanfare', gi); buzz([30, 40, 60 + gi * 20], 1); }
    if (g.catchFx && c.reveal && (c.popT >= c.tadaT + 0.3 || c.skip)) {
      const f = g.fish, prev = g.records[f.name];
      if (prev === undefined && has(g, 'spoon')) f.price *= 2;                         // 숟가락: 처음 낚은 생물
      if (prev !== undefined && f.meters > prev && has(g, 'coin')) f.price = Math.round(f.price * 1.5);   // 동전: 신기록
      g.result = { creature: f, isNew: prev === undefined, isRecord: prev !== undefined && f.meters > prev, prev, stamped: false, tickT: 0 };
      const stage0 = f.isFantasy ? 0 : dexStage(g, f.region);
      g.records[f.name] = Math.max(prev || 0, f.meters);
      if (!f.isFantasy) {                             // 도감 절반·완성: 그 해역 생물의 파는 값이 오른다. 의뢰도 센다
        const stage = dexStage(g, f.region);
        if (stage > stage0) { g.dexNote = `${dexName(f.region)} 도감 ${stage === 2 ? '완성' : '절반'}! 파는 값 +${DEX_PCT[stage]}%`; g.dexNews = { r: f.region, stage }; }
        questCatch(g, f, prev === undefined);
        if (f.fixedSize && prev === undefined) { const got = skinGained(g); if (got) g.dexNote = `${got}을(를) 얻었다 · 옷가게에서 겉모습을 바꿀 수 있다`.replace('을(를)', josaEul(got)); }      // 태초의 바다 도감 보상: 장비 겉모습
        if (!g.primal && prev === undefined && dexAll(g)) { g.primal = true; g.primalShow = true; g.dexNote = '도감을 모두 채웠다. 해도에 새 항로가 떠오른다…'; }      // 태초의 바다가 열린다
      }
      // 낚는 순간 값의 절반을 선금으로 받고(바다에서 스킬을 올릴 돈), 나머지는 항구에서 팔 때 포상금으로 받는다
      if (!f.isFantasy) { f.advance = Math.floor(f.price * ADVANCE); g.gold += f.advance; g.cargo.push({ name: f.name, price: f.price - f.advance, grade: f.grade }); }   // 낚은 순간에 어창에 실린다 (카드를 보다가 꺼도 잃지 않는다. 판매는 항구에서)
      g.dirty = true;
      c.phase = 'hang'; c.pt = 0; g.sw = null; snd(g, 'card');
      setState(g, 'result');
    }
  } else if (c.phase === 'hang') {
    // 꼭대기에 걸린 채 천천히 떠 있다 (결과 카드가 뜨는 동안)
    c.x = apex.x; c.y = apex.y; c.rot = 0; c.popT += dt;   // 펄떡임은 그리는 쪽에서 (옛 휴대용 게임기처럼 뚝뚝 끊기게)
    out.roughTarget = 0.6; out.shaftsTarget = 0.6; out.raysTarget = 0.65 + gi * 0.07; out.dimTarget = DIM[gi];
    c.shed -= dt;
    if (c.shed <= 0) { c.shed = 0.35; spray(g, c.x + rand(-0.3, 0.3) * lw, c.y + rand(0, 0.3) * lh, 1, 30, lw * 0.1); }
  } else if (c.phase === 'stow') {
    out.zoomTarget = c.zoom;                        // 생물이 배에 실릴 때까지 카메라는 그대로 (먼저 당기면 생물이 불쑥 커 보인다)
    // 판매: 줄에 끌려 배 쪽으로 빨려 들어가며 작아진다
    const b = boatPose(g), u = clamp(c.pt / 0.45, 0, 1), e = u * u;
    c.x = lerp(apex.x, b.x, e); c.y = lerp(apex.y, b.y - 10, e); c.scale = lerp(1, 0.02, e); c.rot = e * 0.6;
    out.roughTarget = 0.3;
    if (u >= 1) endCatch(g);
  } else if (c.phase === 'release') {
    out.zoomRate = 3.2;
    // 놓아주기(환상종): 몸을 뒤집으며 바다로 떨어져 큰 물벽을 일으킨다
    const u = clamp(c.pt / 0.9, 0, 1), e = u * u;
    c.x = lerp(apex.x, apex.x + lw * 0.2, u); c.y = lerp(apex.y, WL + lh * 0.55, e); c.rot = e * 0.9; c.mix = clamp(u * 3, 0, 1);
    out.roughTarget = 1; out.shaftsTarget = 0.6;
    if (!c.fell && c.y > WL - lh * 0.1) {
      c.fell = true;
      burst(g, 'c_erupt', c.x, lw * 1.3, 2.4, true);
      spray(g, c.x, WL, 10, 210 + lw * 0.35, lw * 0.32);
      bubbles(g, c.x, WL + 20, 9, lw * 0.5);
      swell(g, c.x, 12 + lw * 0.025, 1, 150, 90); swell(g, c.x, 12 + lw * 0.025, -1, 150, 90);
      g.shake = Math.min(8, 3 + lw / 120); g.flash = 0.3; snd(g, 'breachIn', lw / 400); buzz(70);
      if (c.thanks) { g.gold += c.thanks; g.dirty = true; g.msg = { text: `바다의 답례  +${fmt(c.thanks)} G`, color: '#ffe27a', age: -0.2 }; snd(g, 'coin', 8); }
    }
    if (c.fell) c.alpha = approach(c.alpha, 0, 3, dt);
    if (u >= 1 && c.pt > 1.5) endCatch(g);
  }
  return out;
}

function endCatch(g) {
  g.catch = null; g.fish = null; g.sw = null;
  setState(g, 'idle');
}

function fail(g, text) {
  say(g, text, '#ffb0a0'); snd(g, text.includes('끊') ? 'snap' : 'lost'); buzz(text.includes('끊') ? [40, 30, 40] : 30);
  g.emote = { icon: 'tear', age: 0 };
  g.bob.inWater = false; g.fight = null; g.bob.dipTarget = 0;
  kick(g, -0.25);
  flee(g);
  setState(g, 'fail');
}

import { W, H, GRADES, PHASES } from './config.js';
import { loadAssets } from './assets.js';
import { createGame, update, press, release, sellAll, setRegion } from './game.js';
import { REGIONS } from './creatures.js';
import { GEAR, SKILLS, buy, gearCost, skillCost, gearLocked, gearLabel, maxRegion, cargoMax, fmt } from './economy.js';
import { render } from './render.js';
import { initAudio, playSfx, reel, setSound, soundOn } from './audio.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let scale = 1;

// 창 크기에 맞춤. 가능하면 정수배(도트가 고르게 보임), 너무 작아지면 꽉 채운다.
function resize() {
  const dpr = window.devicePixelRatio || 1;
  const stage = canvas.parentElement, bar = document.getElementById('debug');
  const shopEl = document.getElementById('shop');
  const availW = stage.clientWidth, availH = stage.clientHeight - (bar ? bar.offsetHeight : 0) - (shopEl ? shopEl.offsetHeight : 0);
  const fit = Math.min(availW / W, availH / H) * dpr;
  const whole = Math.floor(fit);
  scale = whole >= 2 && whole / fit >= 0.8 ? whole : fit;
  canvas.width = Math.round(W * scale);
  canvas.height = Math.round(H * scale);
  canvas.style.width = canvas.width / dpr + 'px';
  canvas.style.height = canvas.height / dpr + 'px';
}
window.addEventListener('resize', resize);

await loadAssets();
const game = createGame();
window.game = game; // 시험·디버깅용 (주의: canvas id 'game' 과 이름이 같아 로딩 전엔 canvas 를 가리킴)
resize();

// 입력: 클릭 / 터치 / 스페이스바 (원터치)
canvas.addEventListener('pointerdown', (e) => { e.preventDefault(); canvas.setPointerCapture(e.pointerId); initAudio(); press(game); });
canvas.addEventListener('pointerup', () => release(game));
canvas.addEventListener('pointercancel', () => release(game));
canvas.addEventListener('contextmenu', (e) => e.preventDefault());
window.addEventListener('keydown', (e) => { if (e.code === 'Space' && !e.repeat) { e.preventDefault(); initAudio(); press(game); } });
window.addEventListener('keyup', (e) => { if (e.code === 'Space') release(game); });

// 시험용 버튼
const btnGrade = document.getElementById('btnGrade');
const gradeCycle = [null, ...GRADES.map((g) => g.id)];
btnGrade.addEventListener('click', () => {
  const i = (gradeCycle.indexOf(game.forceGrade) + 1) % gradeCycle.length;
  game.forceGrade = gradeCycle[i];
  btnGrade.textContent = '등급: ' + (i ? GRADES[i - 1].name : '무작위');
});
const btnTime = document.getElementById('btnTime');
btnTime.addEventListener('click', () => {
  game.phase = (game.phase + 1) % PHASES.length;
  btnTime.textContent = '시간: ' + PHASES[game.phase].name;
});

const btnSound = document.getElementById('btnSound');
if (btnSound) btnSound.addEventListener('click', () => {
  initAudio(); setSound(!soundOn());
  btnSound.textContent = '소리: ' + (soundOn() ? '켬' : '끔');
});

// 항구로 (지금은 바로 판매), 해역 바꾸기 — 낚시 중이 아닐 때만
const btnHarbor = document.getElementById('btnHarbor');
if (btnHarbor) btnHarbor.addEventListener('click', () => { initAudio(); sellAll(game); });
const btnRegion = document.getElementById('btnRegion');
if (btnRegion) btnRegion.addEventListener('click', () => {
  const n = game.region % maxRegion(game.eco) + 1;          // 배로 갈 수 있는 해역까지만
  if (setRegion(game, n)) btnRegion.textContent = `해역: ${n} ${REGIONS[n]}`;
});

// ── 저장 (이 기기의 브라우저에만 남는다) ──
const SAVE = 'horizon-angler-save-1';
function save() {
  try { localStorage.setItem(SAVE, JSON.stringify({ gold: game.gold, eco: game.eco, region: game.region, cargo: game.cargo, records: game.records })); } catch { /* 저장이 막힌 환경에서는 그냥 넘어간다 */ }
}
try {
  const d = JSON.parse(localStorage.getItem(SAVE) || 'null');
  if (d) {
    game.gold = game.goldShown = d.gold || 0;
    Object.assign(game.eco.gear, d.eco && d.eco.gear); Object.assign(game.eco.skill, d.eco && d.eco.skill);
    game.region = Math.min(d.region || 1, maxRegion(game.eco)); game.cargo = d.cargo || []; game.records = d.records || {};
    game.cargoMax = cargoMax(game.eco);
    if (btnRegion) btnRegion.textContent = `해역: ${game.region} ${REGIONS[game.region]}`;
  }
} catch { /* 저장된 것이 없거나 읽을 수 없으면 새로 시작 */ }

// ── 장비·스킬 구매 (임시 화면: 항구·업그레이드 화면 그림이 오기 전까지 글자 단추로) ──
const shop = document.createElement('div');
shop.id = 'shop';
shop.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;justify-content:center;padding:4px 6px 8px;font:12px system-ui,sans-serif;';
canvas.parentElement.appendChild(shop);
const items = [...GEAR.map((x) => ['gear', x]), ...SKILLS.map((x) => ['skill', x])];
const btns = items.map(([kind, x]) => {
  const b = document.createElement('button');
  b.style.cssText = 'font:inherit;color:#fff4dc;background:#24385c;border:1px solid #3d5788;border-radius:6px;padding:4px 8px;cursor:pointer;text-align:left;line-height:1.35;min-width:104px;';
  b.addEventListener('click', () => { initAudio(); if (buy(game, kind, x.id)) { playSfx('coin', 3); save(); refreshShop(true); } });
  shop.appendChild(b);
  return b;
});
let shopKey = '';
function refreshShop(force) {
  const e = game.eco, key = Math.floor(game.gold) + '|' + JSON.stringify(e) + game.cargo.length;
  if (!force && key === shopKey) return;
  shopKey = key;
  items.forEach(([kind, x], i) => {
    const b = btns[i], locked = kind === 'gear' && gearLocked(e, x.id);
    const cost = kind === 'gear' ? gearCost(e, x.id) : skillCost(e, x.id);
    const level = kind === 'gear' ? gearLabel(e.gear[x.id]) : 'Lv.' + e.skill[x.id];
    b.innerHTML = `<b>${x.name}</b> ${level}<br><span style="opacity:.75">${x.desc}</span><br>${locked ? '배를 먼저' : fmt(cost) + ' G'}`;
    const can = !locked && game.gold >= cost;
    b.disabled = !can; b.style.opacity = can ? 1 : 0.5; b.style.borderColor = can ? '#f2c14e' : '#3d5788';
  });
}
refreshShop(true);
setInterval(() => { refreshShop(false); save(); }, 500);
resize();

// 검사용: window.__manual = true 로 두면 자동 진행을 멈추고, __tick(dt) 로 한 프레임씩 넘길 수 있다
window.__tick = (dt) => update(game, dt);
window.__press = () => press(game);
window.__release = () => release(game);

let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); // 탭이 멈췄다 돌아와도 튀지 않게
  last = now;
  if (!window.__manual) {
    update(game, dt);
    for (const [name, arg] of game.sfx) playSfx(name, arg);
  }
  game.sfx.length = 0;
  reel(game.state === 'fight' && game.hold && game.freeze <= 0, game.fight ? game.fight.tension : 0);
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  render(ctx, game);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

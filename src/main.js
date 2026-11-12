import { W, H, GRADES, PHASES, DAY_SEC, DAY_PLAN } from './config.js';
import { loadAssets } from './assets.js';
import { createGame, update, press, release } from './game.js';
import { pointer } from './harbor.js';
import { startTitle, skipBasics } from './story.js';
import { maxRegion, cargoMax } from './economy.js';
import { topRegion } from './goals.js';
import { render } from './render.js';
import { initAudio, playSfx, reel, setSound, soundOn, setScene } from './audio.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let scale = 1;
const MAX_SCALE = 2.25;

// 창 크기에 맞춤. 가능하면 정수배(도트가 고르게 보임), 너무 작아지면 꽉 채운다.
function resize() {
  const dpr = window.devicePixelRatio || 1;
  const stage = canvas.parentElement, bar = document.getElementById('debug');
  const availW = stage.clientWidth, availH = stage.clientHeight - (bar ? bar.offsetHeight : 0);
  const fit = Math.min(availW / W, availH / H) * dpr;
  const whole = Math.floor(fit);
  scale = whole >= 2 && whole / fit >= 0.97 ? whole : fit;      // 거의 딱 맞을 때만 정수배. 아니면 화면을 꽉 채운다 (폰에서 글자와 단추가 조금이라도 크게)
  // 발열·배터리: 그리는 해상도에 상한을 둔다 (640×360 게임이라 2.25배 = 1440×810 이면 충분하다. 화소가 촘촘한 폰은 그 뒤를 화면이 늘려 보여 준다)
  const capped = scale > MAX_SCALE; if (capped) scale = MAX_SCALE;
  canvas.width = Math.round(W * scale);
  canvas.height = Math.round(H * scale);
  const css = capped ? fit / dpr : scale / dpr;
  canvas.style.width = W * css + 'px';
  canvas.style.height = H * css + 'px';
  canvas.style.imageRendering = capped ? 'auto' : '';
}
window.addEventListener('resize', resize);
// 폰은 가로 화면 고정: 될 때는 기기의 화면 방향을 가로로 잠그고, 안 되는 기기에서는 CSS 가 화면을 돌려 준다
const turned = () => getComputedStyle(canvas.parentElement).transform !== 'none';
function lockLandscape() {
  try {
    if (screen.orientation && screen.orientation.lock) {
      const go = document.fullscreenElement ? Promise.resolve() : document.documentElement.requestFullscreen();
      go.then(() => screen.orientation.lock('landscape')).catch(() => {});
    }
  } catch { /* 지원하지 않는 기기 */ }
}

// 앱(안드로이드)으로 돌 때는 시험용 버튼 줄을 숨긴다
{ const bar = document.getElementById('debug'); if (bar) bar.style.display = !window.Capacitor && /[?&]debug/.test(location.search) ? 'flex' : 'none'; }

await loadAssets();
const game = createGame();
window.game = game; // 시험·디버깅용 (주의: canvas id 'game' 과 이름이 같아 로딩 전엔 canvas 를 가리킴)
resize();

// 입력: 클릭 / 터치 / 스페이스바 (원터치)
canvas.addEventListener('pointerdown', (e) => {
  e.preventDefault(); canvas.setPointerCapture(e.pointerId); initAudio();
  if (e.pointerType === 'touch' && turned()) lockLandscape();
  const r = canvas.getBoundingClientRect();
  // 화면을 돌려 놓은 상태면 좌표도 돌려서 읽는다 (게임의 가로 = 기기의 세로 아래→위)
  const gx = turned() ? (r.bottom - e.clientY) / r.height * W : (e.clientX - r.left) / r.width * W;
  const gy = turned() ? (e.clientX - r.left) / r.width * H : (e.clientY - r.top) / r.height * H;
  if (pointer(game, gx, gy)) { save(); return; }   // 단추·가게 판
  press(game);
});
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
btnTime.addEventListener('click', () => {      // 시험용: 다음 시간대로 건너뛴다 (밤 다음에는 하루가 끝난다)
  const k = game.dayT / DAY_SEC, next = DAY_PLAN.map((x) => x[0]).find((at) => at > k + 0.001);
  game.dayT = (next ?? 0.995) * DAY_SEC + 0.1;
});

const btnSound = document.getElementById('btnSound');
if (btnSound) btnSound.addEventListener('click', () => {
  initAudio(); setSound(!soundOn());
  btnSound.textContent = '소리: ' + (soundOn() ? '켬' : '끔');
});

// ── 저장 (이 기기의 브라우저에만 남는다) ──
const SAVE = 'horizon-angler-save-1';
let wiped = false;
function save() {
  if (wiped) return;                     // 저장을 지운 뒤에는 다시 쓰지 않는다
  try { localStorage.setItem(SAVE, JSON.stringify({ gold: game.gold, eco: game.eco, region: game.region, dayT: game.dayT, cargo: game.cargo, records: game.records, story: game.story.seen, memV: 1, skV: 2, relics: game.relics, sinceFantasy: game.sinceFantasy || 0, gen: game.gen || 0, quest: game.quest, dexNews: game.dexNews, primal: !!game.primal, primalShow: !!game.primalShow })); } catch { /* 저장이 막힌 환경에서는 그냥 넘어간다 */ }
}
try {
  const d = JSON.parse(localStorage.getItem(SAVE) || 'null');
  if (d) {
    game.gold = game.goldShown = d.gold || 0;
    // 스킬을 세 배로 잘게 쪼개기 전의 저장: 레벨을 세 배로 옮긴다 (효과는 그대로)
    if (d.skV !== 2 && d.eco && d.eco.skill) for (const k of Object.keys(d.eco.skill)) d.eco.skill[k] *= 3;
    Object.assign(game.eco.gear, d.eco && d.eco.gear); Object.assign(game.eco.skill, d.eco && d.eco.skill);
    Object.assign(game.eco.shop, d.eco && d.eco.shop); game.eco.town = (d.eco && d.eco.town) || 1;
    game.region = Math.min(d.region || 1, maxRegion(game.eco)); game.cargo = d.cargo || []; game.records = d.records || {};
    game.cargoMax = cargoMax(game.eco); game.dayT = d.dayT || 0;
    game.hasSave = true;
    // 기억을 봤는지 따로 적기 전의 저장: 이미 가진 물건의 기억은 본 것으로 친다 (마지막 회상을 못 본 저장은 다시 볼 수 있다)
    if (d.story && d.memV !== 1) for (let i = 0; i < (d.relics || 0); i++) d.story['mem_' + i] = 1;
    game.relics = d.relics || 0; game.sinceFantasy = d.sinceFantasy || 0;
    game.gen = d.gen || 0; game.quest = d.quest || null; game.dexNews = d.dexNews || null; game.primal = !!d.primal; game.primalShow = !!d.primalShow;
    game.region = Math.min(d.region || 1, topRegion(game));
    if (d.story) game.story.seen = d.story; else skipBasics(game);     // 이야기가 생기기 전의 저장: 처음 안내는 건너뛴다
  }
} catch { /* 저장된 것이 없거나 읽을 수 없으면 새로 시작 */ }

startTitle(game);                        // 제목 화면부터. 누르면 시작하고, 처음이면 시장의 이야기로 이어진다
setInterval(save, 2000);
addEventListener('pagehide', save); document.addEventListener('visibilitychange', () => { if (document.hidden) save(); });   // 끄거나 다른 앱으로 넘어갈 때 저장
// 글꼴을 받은 뒤 시작한다 (못 받아도 2초 뒤에는 기기 글꼴로 시작)
await Promise.race([Promise.all([document.fonts.load('600 12px Hahmlet', '낚'), document.fonts.load('400 12px Jua', '낚')]), new Promise((r) => setTimeout(r, 2000))]).catch(() => {});
window.__pointer = (x, y) => pointer(game, x, y);

// 검사용: window.__manual = true 로 두면 자동 진행을 멈추고, __tick(dt) 로 한 프레임씩 넘길 수 있다
window.__tick = (dt) => update(game, dt);
window.__press = () => press(game);
window.__release = () => release(game);

let last = performance.now();
function frame(now) {
  // 발열·배터리: 화면이 120Hz 여도 60fps 로만 계산하고 그린다
  if (now - last < 15.5) { requestAnimationFrame(frame); return; }
  const dt = Math.min(0.05, (now - last) / 1000); // 탭이 멈췄다 돌아와도 튀지 않게
  last = now;
  if (!window.__manual) {
    update(game, dt);
    for (const [name, arg] of game.sfx) playSfx(name, arg);
    if (game.dirty) { game.dirty = false; save(); }
    if (game.wipe) { wiped = true; try { localStorage.removeItem(SAVE); } catch { /* 무시 */ } location.reload(); }     // 제목 화면의 '처음부터 다시'
  }
  game.sfx.length = 0;
  reel(game.state === 'fight' && game.hold && game.freeze <= 0, game.fight ? game.fight.tension : 0);
  {
    // 음악과 환경음을 지금 장면에 맞춘다: 시간대, 해역, 줄다리기의 긴박함, 낚는 순간의 정적
    const f = game.state === 'fight' ? game.fight : null, c = game.catch;
    const tension = f ? Math.min(1, f.tension / f.maxTension) : 0;
    const catching = !c || game.state === 'leave' ? 0 : (c.phase === 'leap' && !c.reveal && c.pt / c.rise > 0.7) ? 2 : 1;
    setScene({ scene: game.scene, phase: PHASES[game.phase].id, region: game.region, town: game.eco.town,
      fight: f ? Math.min(1, 0.35 + 0.5 * tension + (f.surging ? 0.25 : 0)) : 0, tension, catching, rough: game.rough });
    if (btnTime.dataset.p !== String(game.phase)) { btnTime.dataset.p = game.phase; btnTime.textContent = '시간: ' + PHASES[game.phase].name; }
  }
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  render(ctx, game);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

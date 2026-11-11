import { W, H, GRADES, PHASES } from './config.js';
import { loadAssets } from './assets.js';
import { createGame, update, press, release } from './game.js';
import { render } from './render.js';
import { initAudio, playSfx, reel, setSound, soundOn } from './audio.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let scale = 1;

// 창 크기에 맞춤. 가능하면 정수배(도트가 고르게 보임), 너무 작아지면 꽉 채운다.
function resize() {
  const dpr = window.devicePixelRatio || 1;
  const stage = canvas.parentElement, bar = document.getElementById('debug');
  const availW = stage.clientWidth, availH = stage.clientHeight - (bar ? bar.offsetHeight : 0);
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

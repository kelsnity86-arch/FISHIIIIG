import { W, H, GRADES, PHASES } from './config.js';
import { loadAssets } from './assets.js';
import { createGame, update, press, release } from './game.js';
import { render } from './render.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let scale = 1;

// 창 크기에 맞춤. 가능하면 정수배(도트가 고르게 보임), 너무 작아지면 꽉 채운다.
function resize() {
  const dpr = window.devicePixelRatio || 1;
  const availW = window.innerWidth, availH = window.innerHeight - 44;
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
window.game = game; // 시험·디버깅용
resize();

// 입력: 클릭 / 터치 / 스페이스바 (원터치)
canvas.addEventListener('pointerdown', (e) => { e.preventDefault(); canvas.setPointerCapture(e.pointerId); press(game); });
canvas.addEventListener('pointerup', () => release(game));
canvas.addEventListener('pointercancel', () => release(game));
canvas.addEventListener('contextmenu', (e) => e.preventDefault());
window.addEventListener('keydown', (e) => { if (e.code === 'Space' && !e.repeat) { e.preventDefault(); press(game); } });
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

let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); // 탭이 멈췄다 돌아와도 튀지 않게
  last = now;
  update(game, dt);
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  render(ctx, game);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

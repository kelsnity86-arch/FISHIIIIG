// 설정 판: 두 쪽으로 나뉜다 — '소리'(배경음·효과음·환경음 막대)와 '그 밖'(창 크기(PC) / 화질·진동(폰), 언어). 가게 판과 같은 그림을 쓴다.
// 오른쪽 위의 톱니 버튼으로 연다 (제목 화면, 항구, 바다에서 쉴 때).
import { W, COLORS } from './config.js';
import { sprite, knownSprite } from './assets.js';
import { plainRow } from './plate.js';
import { initAudio, getVol, setVol, playSfx } from './audio.js';
import { IS_PC, vibeLv, nextVibe } from './haptic.js';
import { L, langName, nextLang } from './lang.js';

const FONT = '"Hahmlet", system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), easeOut = (t) => 1 - Math.pow(1 - t, 3);
const get = (k, d) => { try { const v = localStorage.getItem(k); return v == null ? d : v; } catch { return d; } };
const put = (k, v) => { try { localStorage.setItem(k, String(v)); } catch { /* 저장이 막힌 환경 */ } };

// ── 해상도 (PC판): 창 크기를 고른다. 비율은 16:9 로 고정. 마지막은 전체 화면 ──
export const RES = [[960, 540], [1280, 720], [1600, 900], [1920, 1080], [2560, 1440], null];
let res = clamp(+get('hori-res', 1) || 0, 0, RES.length - 1);
const resName = () => (RES[res] ? `${RES[res][0]}×${RES[res][1]}` : '화면 가득');
export function applyRes() {
  const pc = window.horiPC; if (!pc) return;
  if (RES[res]) pc.setSize(RES[res][0], RES[res][1]); else pc.setFullscreen(true);
}
// ── 화질 (폰·웹): 그리는 해상도의 상한. 낮을수록 폰이 덜 뜨거워진다 ──
const QUAL = [['낮음', 1.5], ['보통', 2.25], ['높음', 3]];
let qual = clamp(+get('hori-quality', 1) || 0, 0, QUAL.length - 1);
export const maxScale = () => (IS_PC ? 6 : QUAL[qual][1]);      // PC판은 큰 모니터에서도 또렷하게 (발열 걱정이 없다)

const VIBE_DESC = ['울리지 않는다', '챌 때와 낚았을 때만', '날뛰기·놓침·구매 등까지', '줄다리기 내내 떨림까지'];
// 일시정지 메뉴 (PC: 아무것도 열려 있지 않을 때 Esc · 폰: 뒤로 가기)
const PAUSE_ROWS = [
  { id: 'resume', name: '이어 하기', value: '이어서', desc: '하던 데로 돌아갑니다' },
  { id: 'set', name: '설정', value: '열기', desc: IS_PC ? '소리 크기와 창 크기를 맞춥니다' : '소리 크기 · 화질 · 진동을 맞춥니다' },
  { id: 'quit', name: '그만하기', value: '끄기', desc: '여태 한 것은 저절로 적어 둡니다' },
];
export function quitGame() {
  const cap = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
  if (window.horiPC && window.horiPC.quit) window.horiPC.quit(); else if (cap && cap.exitApp) cap.exitApp(); else window.close();
}
// 설정의 쪽: 0 = 소리, 1 = 그 밖
const TABS = ['소리', '그 밖'];
const SLIDERS = [['mus', '배경음'], ['sfx', '효과음'], ['amb', '환경음']];
function rows(mode, tab = 0) {
  if (mode === 'pause') return PAUSE_ROWS;
  if (tab === 0) return SLIDERS.map(([id, name]) => ({ id, name, slider: true }));
  const out = [];
  if (IS_PC) out.push({ id: 'res', name: '창 크기', value: resName(), desc: '창 크기 · 가로세로 생김새는 그대로 (F11 = 화면 가득)' });
  else {
    out.push({ id: 'qual', name: '화질', value: QUAL[qual][0], desc: '낮을수록 폰이 덜 뜨거워집니다' });
    out.push({ id: 'vibe', name: '진동', value: vibeLv() ? L(vibeLv() + '단계', 'Level ' + vibeLv()) : '끔', desc: VIBE_DESC[vibeLv()] });
  }
  out.push({ id: 'lang', name: L('언어', 'Language'), value: langName(), desc: L('Switch to English', '한국어로 바꿉니다') });
  return out;
}
// 줄 왼쪽 칸의 그림: 항목마다 제 그림(st_<이름>)이 있으면 그것을, 없으면 톱니를 쓴다
const rowIcon = (id) => sprite(knownSprite('st_' + id) ? 'st_' + id : 'ui_ic_gear');
function act(id) {
  if (id === 'res') { res = (res + 1) % RES.length; put('hori-res', res); applyRes(); }
  else if (id === 'qual') { qual = (qual + 1) % QUAL.length; put('hori-quality', qual); window.dispatchEvent(new Event('resize')); }
  else if (id === 'vibe') nextVibe();
  else if (id === 'lang') nextLang();
}

// 가게 판과 같은 자리·크기
const PANEL = { x: 182, y: 28, w: 364 }, PS = PANEL.w / 336;
const panelH = () => PANEL.w * sprite('h_panel').h / sprite('h_panel').w;
const rowRect = (i) => ({ x: PANEL.x + 30, y: PANEL.y + 93 + i * 47.5, w: 304, h: 45.5 });      // 가게 판의 줄과 같은 자리
// 쪽을 고르는 버튼 두 개 (리본 아래 가운데)
const tabRect = (i) => ({ x: PANEL.x + PANEL.w / 2 + 10 * PS - 73 + i * 76, y: PANEL.y + 71.5, w: 70, h: 14 });
// 소리 크기 막대 (소리 쪽의 줄마다 하나): 누르거나 끌어서 0~100 사이에서 정한다. 값은 줄 오른쪽 놋쇠 판에 적힌다
const BAR = { dx: 120, w: 94, x0: 0.05, x1: 0.968 };      // 줄 안에서의 자리와 폭, 그 안에서 홈이 차지하는 자리
const barX = () => rowRect(0).x + BAR.dx;
const sliderAt = (x, y) => { for (let i = 0; i < SLIDERS.length; i++) { const r = rowRect(i); if (y >= r.y && y <= r.y + r.h && x >= barX() - 12 && x <= barX() + BAR.w + 8) return i; } return -1; };
const sliderValue = (x) => clamp((x - barX() - BAR.w * BAR.x0) / (BAR.w * (BAR.x1 - BAR.x0)), 0, 1);
export function dragSettings(g, x) { const s = g.settings; if (s && s.drag != null && s.closing == null) setVol(SLIDERS[s.drag][0], sliderValue(x)); }
export function dropSettings(g) { const s = g.settings; if (s && s.drag != null) { if (SLIDERS[s.drag][0] === 'sfx') playSfx('tick'); s.drag = null; } }      // 효과음은 놓을 때 한 번 들려준다
const closeRect = () => ({ x: PANEL.x + PANEL.w - 30 * PS, y: PANEL.y + 4 * PS, w: 28 * PS, h: 28 * PS });

export function openSettings(g) { if (!g.settings) { g.settings = { mode: 'set', tab: 0, t: 0, closing: null, hit: -1, hitT: 9 }; g.sfx.push(['paper']); } }
// 일시정지: 게임이 멈추고 메뉴가 뜬다
export function openPause(g) { if (!g.settings) { g.paused = true; g.hold = false; g.settings = { mode: 'pause', tab: 0, t: 0, closing: null, hit: -1, hitT: 9 }; g.sfx.push(['paper']); } }
// 닫기: 일시정지 메뉴에서 연 설정은 메뉴로 돌아가고, 메뉴를 닫으면 게임이 이어진다
export function closeSettings(g) {
  const s = g.settings; if (!s || s.closing != null) return;
  g.sfx.push(['paper']);
  if (s.mode === 'set' && g.paused) { s.mode = 'pause'; s.t = 0.1; s.hit = -1; return; }
  s.closing = 0;
}
export function updateSettings(g, dt) {
  const s = g.settings; if (!s) return;
  s.t += dt; s.hitT += dt;
  if (s.closing != null && (s.closing += dt) > 0.18) { g.settings = null; g.paused = false; }
}
export function tapSettings(g, x, y) {
  const s = g.settings; if (!s || s.closing != null) return;
  const c = closeRect();
  if (x >= c.x - 4 && x <= c.x + c.w + 4 && y >= c.y - 4 && y <= c.y + c.h + 4) { closeSettings(g); return; }
  if (s.mode === 'set') {
    for (let i = 0; i < TABS.length; i++) { const t = tabRect(i); if (x >= t.x - 2 && x <= t.x + t.w + 2 && y >= t.y - 5 && y <= t.y + t.h + 5) { if (s.tab !== i) { s.tab = i; s.hit = -1; g.sfx.push(['tap']); } return; } }
    if (s.tab === 0) { const k = sliderAt(x, y); if (k >= 0) { initAudio(); s.drag = k; setVol(SLIDERS[k][0], sliderValue(x)); } else if (x < PANEL.x || x > PANEL.x + PANEL.w || y < PANEL.y || y > PANEL.y + panelH()) closeSettings(g); return; }
  }
  const list = rows(s.mode, s.tab);
  for (let i = 0; i < list.length; i++) { const r = rowRect(i); if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
    const id = list[i].id; g.sfx.push(['tap']);
    if (id === 'resume') closeSettings(g);
    else if (id === 'set') { s.mode = 'set'; s.t = 0.1; s.hit = -1; }
    else if (id === 'quit') { g.dirty = true; setTimeout(quitGame, 150); }      // 저장이 적힌 뒤에 닫는다
    else { act(id); s.hit = i; s.hitT = 0; }
    return; } }
  if (x < PANEL.x || x > PANEL.x + PANEL.w || y < PANEL.y || y > PANEL.y + panelH()) closeSettings(g);      // 판 밖을 누르면 닫힌다
}
function label(ctx, str, x, y, size, color, align = 'center', weight = 600) {
  ctx.font = `${weight} ${size}px ${FONT}`; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillStyle = color; ctx.fillText(str, x, y);
}
export function drawSettings(ctx, g) {
  const s = g.settings; if (!s) return;
  const k = easeOut(clamp(s.t / 0.22, 0, 1)) * (s.closing != null ? 1 - clamp(s.closing / 0.18, 0, 1) : 1), ph = panelH();
  ctx.save(); ctx.imageSmoothingEnabled = true;
  ctx.fillStyle = `rgba(10,18,40,${0.5 * k})`; ctx.fillRect(0, 0, W, 360);
  ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 14);
  const pn = sprite('h_panel'); ctx.drawImage(pn.img, PANEL.x, PANEL.y, PANEL.w, ph);
  const rb = sprite('h_ribbon'), rw = 170 * PS, rh = rw * rb.h / rb.w;
  ctx.drawImage(rb.img, PANEL.x + PANEL.w / 2 - rw / 2 + 10 * PS, PANEL.y + 10 * PS, rw, rh);
  label(ctx, s.mode === 'pause' ? '잠시 멈춤' : '설정', PANEL.x + PANEL.w / 2 + 10 * PS, PANEL.y + 10 * PS + rh * 0.42, 12.5, COLORS.navy);
  const cl = sprite('h_close'), c = closeRect(); ctx.drawImage(cl.img, c.x, c.y, c.w, c.h);
  // 공통 동화책 판의 작은 상징. 큰 금장 원틀 대신 종이 여백을 살린다.
  { const e = sprite(knownSprite('st_set') ? 'st_set' : 'ui_ic_gear'), f = Math.min(43 / e.w, 43 / e.h);
    ctx.drawImage(e.img, PANEL.x + 52 - e.w * f / 2, PANEL.y + 48 - e.h * f / 2, e.w * f, e.h * f);
  }
  if (s.mode === 'pause') label(ctx, '바다도 잠깐 쉬어 갑니다', PANEL.x + PANEL.w / 2 + 10 * PS, PANEL.y + 79, 9, '#6b4a2b');
  else TABS.forEach((name, i) => {      // 쪽 고르기: 고른 쪽은 나무 버튼, 다른 쪽은 흐린 버튼
    const t = tabRect(i), on = s.tab === i, b = sprite(on ? 'h_buy' : 'h_buy_off');
    ctx.drawImage(b.img, t.x, t.y, t.w, t.h);
    label(ctx, name, t.x + t.w / 2, t.y + t.h / 2 + 0.3, 9, on ? '#fff4dc' : 'rgba(255,244,220,0.78)');
  });
  const row = sprite('h_row'), fr = sprite('h_bar'), fl = sprite('h_bar_fill');
  rows(s.mode, s.tab).forEach((it, i) => {
    const r = rowRect(i), bump = s.hit === i ? Math.sin(clamp(s.hitT / 0.18, 0, 1) * Math.PI) * 2.5 : 0, cy = r.y + r.h * 0.492;
    ctx.save(); ctx.translate(0, -bump);
    plainRow(ctx, 'h_row', r);
    { const ic = rowIcon(it.id), f = Math.min(40 / ic.w, 31 / ic.h), iw = ic.w * f, ih = ic.h * f; ctx.drawImage(ic.img, r.x + r.w * 0.112 - iw / 2, r.y + r.h * 0.5 - ih / 2, iw, ih); }      // 줄 왼쪽의 그림 (가게 줄과 같은 크기·자리)
    let value = it.value;
    if (it.slider) {      // 소리 줄: 이름 · 막대 · (놋쇠 판에) 크기
      const v = getVol(it.id), bx = r.x + BAR.dx, bh = BAR.w * fr.h / fr.w;
      label(ctx, it.name, r.x + 63, cy, 11, COLORS.navy, 'left');
      ctx.drawImage(fr.img, bx, cy - bh / 2, BAR.w, bh);
      const tw = BAR.w * (BAR.x1 - BAR.x0), th = bh * 0.6, fx = bx + BAR.w * BAR.x0;      // 채움은 홈 안에만: 홈 모양(둥근 끝)대로 잘라서 넣는다
      if (v > 0.004) { ctx.save(); ctx.beginPath(); ctx.roundRect(fx, cy - th / 2, tw, th, th / 2); ctx.clip(); ctx.drawImage(fl.img, 0, 0, fl.img.width * v, fl.img.height, fx, cy - th / 2, tw * v, th); ctx.restore(); }
      value = String(Math.round(v * 100));
    } else {
      label(ctx, it.name, r.x + 63, r.y + r.h / 2 - 6, 11, COLORS.navy, 'left');
      label(ctx, it.desc, r.x + 63, r.y + r.h / 2 + 8.5, 8.5, '#6b5a48', 'left');
    }
    ctx.font = `600 9.5px ${FONT}`; const vw = ctx.measureText(value).width, room = r.w * 0.165;      // 값은 놋쇠 판 한가운데에. 길면 글자를 줄인다
    label(ctx, value, r.x + r.w * 0.848, cy, vw > room ? 9.5 * room / vw : 9.5, '#4a2a08');
    ctx.restore();
  });
  ctx.restore();
}

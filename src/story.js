// 이야기(대화)와 튜토리얼, 시간 넘기기.
// 주인공은 말이 없다. 말하는 사람은 마을 사람들(가게 주인 5명과 시장)뿐이고, 한 번에 2~4줄.
// 화면에 보이는 것은 GPT 그림(인물, 양피지 판)과 글자뿐이다.
import { W, H, DAY_SEC, DAY_PLAN } from './config.js';
import { sprite, hasSprite } from './assets.js';

const FONT = '"Hahmlet", system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = (k) => k * k * (3 - 2 * k);

const WHO = { hall: '시장', yard: '조선소 주인', guild: '길드장', market: '수산시장 주인', tackle: '낚시도구점 주인', tailor: '옷가게 주인' };

// ── 이야기 ──
// 큰 줄기: 쇠락한 어촌을 다시 일으키며, 바다에 나타난 말도 안 되게 큰 그림자들의 정체를 따라간다.
// 답: 바다는 사람들이 잃어버린 물건을 버리지 않고, 물고기에게 입혀 돌려보내고 있었다.
const SCRIPT = {
  intro: [
    ['hall', '돌아왔구나. 네 할아버지의 배는 그대로 두었다. 낡았지만 아직 뜬단다.'],
    ['hall', '보다시피 마을은 조용해졌지. 젊은이들은 떠나고, 가게들은 간신히 문만 열고 있어.'],
    ['hall', '그런데 요즘 바다에 이상한 그림자가 보인다더구나. 배보다 큰 것이, 그것도 한둘이 아니래.'],
    ['hall', '뭐가 올라오든 낚아서 가져오너라. 그 값으로 이 마을을 다시 일으켜 보자.'],
  ],
  town_2: [
    ['hall', '부두에 새 널빤지를 깔았다. 삐걱거리지 않는 부두가 얼마 만인지.'],
    ['market', '네가 가져온 것들, 처음엔 다들 웃었는데 이젠 줄을 서서 사 가. 대체 그게 다 뭐니?'],
  ],
  town_3: [
    ['hall', '떠났던 집 두 곳이 돌아왔다. 이제 포구 마을이라 불러도 부끄럽지 않겠어.'],
    ['tackle', '소문 들었어. 그 바다 것들, 몸 어딘가가 꼭 사람 물건처럼 생겼다며?'],
  ],
  town_4: [
    ['hall', '등대에 다시 불을 켰다. 이 불빛을 보고 배들이 들어오기 시작했어.'],
    ['hall', '이제부터는 돈만으로는 안 된다. 네가 무엇을 낚았는지 도감에 남겨야 사람들이 믿고 찾아와.'],
  ],
  town_5: [
    ['hall', '장이 서는 날이면 길이 막힌다. 번화한 항구라니, 내 생전에 다시 볼 줄 몰랐다.'],
    ['tailor', '손님들이 그러더라. 주전자 달린 고래를 봤는데, 어릴 적 잃어버린 주전자랑 똑같았대.'],
  ],
  town_6: [
    ['hall', '먼 나라 배가 처음으로 닻을 내렸다. 다들 네가 낚은 것을 보러 온 거야.'],
    ['guild', '늙은 어부들 말로는, 바다는 받은 걸 잊지 않는대. 그냥 옛말인 줄 알았지.'],
  ],
  town_7: [
    ['hall', '무역항이 되었다. 지도에 우리 마을 이름이 다시 적혔어.'],
    ['hall', '이제 남은 건 하나뿐이다. 그 그림자들이 어디서 오는지, 끝까지 가서 보고 오너라.'],
  ],
  town_8: [
    ['hall', '보아라. 네 할아버지가 꿈꾸던 항구가 바로 이것이다.'],
    ['hall', '사람들은 이제 여기를 환상의 항구라 부른단다. 다 네 낚싯대 끝에서 시작된 일이야.'],
  ],
  region_2: [
    ['yard', '배를 손봐 뒀어. 이제 산호초가 있는 따뜻한 바다까지 나갈 수 있어.'],
    ['yard', '거긴 물빛이 고운 대신 그림자가 더 크다더라. 줄이랑 낚싯대부터 챙겨.'],
  ],
  region_3: [
    ['guild', '안개 군도다. 한 치 앞이 안 보이는데 물 밑 그림자만은 또렷하다고들 하지.'],
    ['guild', '안개 속에서 종소리를 들었다는 어부가 있어. 바다 밑에서 났다는군.'],
  ],
  region_4: [
    ['yard', '여기부터는 뭍이 안 보이는 큰 바다야. 이 배로 여기까지 올 줄은 나도 몰랐어.'],
    ['yard', '멀리 갈수록 큰 게 올라온다는 건 이제 알지? 이유는 아직 아무도 몰라.'],
  ],
  region_5: [
    ['guild', '얼음 바다다. 여기서 낚인 것들은 오래된 물건을 달고 있어. 백 년은 된 것들이야.'],
    ['guild', '바다가 오래 품고 있었다는 뜻이겠지. 깊고 추운 곳일수록 더 오래.'],
  ],
  region_6: [
    ['yard', '물이 끓는 바다야. 선체에 쇠를 덧댔으니 버틸 거야. 아마도.'],
    ['yard', '여기 그림자들은 화가 나 있는 것처럼 날뛴대. 뭔가를 지키는 것처럼.'],
  ],
  region_7: [
    ['guild', '심연 해구다. 닻줄을 다 풀어도 바닥에 닿지 않아.'],
    ['guild', '저 밑에서 올라오는 것들이 전부 여기서 시작됐다고들 해. 거의 다 왔어.'],
  ],
  region_8: [
    ['hall', '여기가 지도 끝, 환상의 바다구나. 나도 따라 나와 봤다.'],
    ['hall', '저걸 보렴. 가라앉은 것들이 물고기에게 하나씩 입혀져서 올라오고 있어.'],
    ['hall', '바다는 우리가 잃어버린 것을 버리지 않았던 거야. 물고기에게 맡겨 돌려보내고 있었지.'],
  ],
  ending: [
    ['hall', '마을도 다시 일어섰고, 그림자가 어디서 오는지도 알았다.'],
    ['hall', '네 할아버지가 잃어버렸다던 낚싯대도 언젠가 어느 물고기 등에 얹혀 올라오겠지.'],
    ['hall', '그러니 계속 낚아라. 바다는 아직 돌려줄 것이 많단다.'],
  ],
};

export function newStory() { return { seen: {} }; }
// 이미 한참 한 저장(이야기가 생기기 전)이면 처음 안내는 건너뛴다
export function skipBasics(g) { for (const k of ['intro', 'cast', 'bite', 'fight', 'card', 'harbor', 'shop']) g.story.seen[k] = 1; }

export function startTalk(g, key) {
  if (!SCRIPT[key] || g.story.seen[key]) return false;
  g.story.seen[key] = 1; g.dirty = true;
  if (g.talk) { g.talk.queue.push(key); return true; }
  g.talk = { key, lines: SCRIPT[key], i: 0, t: 0, a: 0, swap: 1, closing: null, queue: [] };
  g.sfx.push(['paper']);
  return true;
}
// 마을을 키웠을 때·새 해역에 들어섰을 때 부른다
export function storyTown(g) { startTalk(g, 'town_' + g.eco.town); maybeEnding(g); }
export function storyRegion(g) { startTalk(g, 'region_' + g.region); maybeEnding(g); }
function maybeEnding(g) { if (g.eco.town >= 8 && g.story.seen.region_8) startTalk(g, 'ending'); }

const CPS = 34;       // 글자가 나오는 빠르기(초당)
const BOX = { x: 150, y: H - 92, w: 420, h: 74 };
const SKIP = { x: BOX.x + BOX.w - 30, y: BOX.y - 9 };

// 누르면: 글자가 나오는 중이면 한꺼번에 보여 주고, 다 나왔으면 다음 줄로
export function tapTalk(g, x, y) {
  const t = g.talk; if (!t || t.closing != null) return;
  if (x != null && Math.abs(x - SKIP.x) < 34 && Math.abs(y - SKIP.y) < 9) { t.queue.length = 0; t.closing = 0; g.sfx.push(['tap']); return; }
  const len = t.lines[t.i][1].length;
  if (t.t * CPS < len) { t.t = len / CPS; return; }
  g.sfx.push(['tap']);
  if (t.i + 1 < t.lines.length) { t.i++; t.t = 0; t.swap = 0; }
  else t.closing = 0;
}

export function updateStory(g, dt) {
  const t = g.talk;
  if (t) {
    t.t += dt; t.swap = Math.min(1, t.swap + dt / 0.2);
    if (t.closing != null) {
      t.closing += dt; t.a = Math.max(0, t.a - dt / 0.22);
      if (t.closing > 0.22) { const next = t.queue.shift(); g.talk = null; if (next) { g.story.seen[next] = 0; startTalk(g, next); } }
    } else t.a = Math.min(1, t.a + dt / 0.25);
  }
  updateHint(g, dt);
  updateSkip(g, dt);
}

// ── 튜토리얼: 설명 화면 없이, 처음 해 보는 그때그때 한 줄 ──
function hintFor(g) {
  const s = g.story.seen, f = g.fight;
  if (g.talk || g.travel) return null;
  if (g.scene === 'harbor') {
    if (!s.harbor) s.harbor = 1;
    if (!s.shop) { if (g.panel) { s.shop = 1; g.dirty = true; return null; } return '건물을 누르면 가게가 열린다 · 시청에서는 마을을 키운다'; }
    return null;
  }
  if (!s.cast) { if (g.state !== 'idle' && g.state !== 'charge') { s.cast = 1; g.dirty = true; } else return g.state === 'charge' ? '손을 떼면 던진다' : '화면을 꾹 눌렀다 떼면 찌를 던진다'; }
  if (!s.bite) { if (g.state === 'fight') { s.bite = 1; g.dirty = true; } else if (g.state === 'wait' || g.state === 'bite') return '찌가 쑥 들어가는 순간 눌러라'; }
  if (!s.fight) { if (g.state === 'catch') { s.fight = 1; g.dirty = true; } else if (f) return f.surging ? '날뛴다! 손을 떼고 버텨라' : '누르고 있으면 감는다 · 아래 게이지가 차면 잠깐 떼라'; }
  if (!s.card) { if (g.state === 'idle' && s.fight) { s.card = 1; g.dirty = true; } else if (g.state === 'result' && g.result.age > 1.2) return '낚은 생물은 어창에 실린다'; }
  if (s.card && !s.harbor && g.state === 'idle' && g.cargo.length >= 3) return '오른쪽 아래 항구 단추 · 생물을 팔고 장비를 산다';
  if (!s.day && g.state === 'idle' && g.dayT > DAY_SEC * 0.3) { g.hintT = (g.hintT || 0); if (g.hintT > 6) { s.day = 1; g.dirty = true; } else return '밤이 끝나면 항구로 돌아간다 · 위쪽 ≫ 단추로 시간을 넘길 수 있다'; }
  return null;
}
function updateHint(g, dt) {
  const want = hintFor(g), h = g.hint || (g.hint = { text: '', a: 0 });
  if (want && want.startsWith('밤이')) g.hintT = (g.hintT || 0) + dt;
  if (want && (h.text === want || h.a < 0.02)) { h.text = want; h.a = Math.min(1, h.a + dt / 0.3); }
  else h.a = Math.max(0, h.a - dt / 0.25);                  // 글이 바뀔 때는 사라졌다가 새 글이 나타난다
}

// ── 시간 넘기기: 다음 시간대로 빠르게 흘려보낸다 (앞으로만, 되돌릴 수 없다) ──
export const SKIP_BTN = { x: W / 2 + 85 + 16, y: 15, r: 11 };
export function nextPhaseAt(g) { const k = g.dayT / DAY_SEC; const at = DAY_PLAN.map((p) => p[0]).find((v) => v > k + 0.002); return at == null ? null : at; }
export const canSkip = (g) => g.scene === 'sea' && g.state === 'idle' && !g.panel && !g.travel && !g.talk && !g.skip && nextPhaseAt(g) != null;
export function tapSkip(g, x, y) {
  if (Math.hypot(x - SKIP_BTN.x, y - SKIP_BTN.y) > SKIP_BTN.r + 4) return false;
  if (g.skip) return true;
  if (!canSkip(g)) return false;
  g.skip = { from: g.dayT, to: nextPhaseAt(g) * DAY_SEC + 0.5, t: 0 };
  g.sfx.push(['travel']);
  return true;
}
const SKIP_TIME = 1.6;
function updateSkip(g, dt) {
  const s = g.skip; if (!s) return;
  s.t += dt;
  g.dayT = Math.max(g.dayT, s.from + (s.to - s.from) * ease(clamp(s.t / SKIP_TIME, 0, 1)));   // 천천히 빨라졌다가 천천히 멎는다
  if (s.t >= SKIP_TIME) g.skip = null;
}

// ── 그리기 ──
function label(ctx, str, x, y, size, color, align = 'center', weight = 600, stroke = 'rgba(16,28,56,0.6)') {
  ctx.font = `${weight} ${size}px ${FONT}`; ctx.textAlign = align; ctx.textBaseline = 'middle';
  if (stroke) { ctx.lineWidth = Math.max(1.8, size * 0.22); ctx.lineJoin = 'round'; ctx.strokeStyle = stroke; ctx.strokeText(str, x, y); }
  ctx.fillStyle = color; ctx.fillText(str, x, y);
}
function wrap(ctx, str, max) {
  const out = []; let line = '';
  for (const word of str.split(' ')) {
    const tryLine = line ? line + ' ' + word : word;
    if (ctx.measureText(tryLine).width > max && line) { out.push(line); line = word; } else line = tryLine;
  }
  if (line) out.push(line);
  return out;
}

export function drawHint(ctx, g) {
  const h = g.hint; if (!h || h.a < 0.01) return;
  ctx.save(); ctx.globalAlpha = h.a;
  label(ctx, h.text, W / 2, 52 - (1 - h.a) * 4, 11, '#fff4dc', 'center', 600);
  ctx.restore();
}

export function drawSkip(ctx, g) {
  const on = canSkip(g) || g.skip, b = SKIP_BTN;
  g.skipA = (g.skipA || 0) + ((on ? 1 : 0) - (g.skipA || 0)) * 0.12;
  if (g.skipA < 0.01) return;
  ctx.save(); ctx.globalAlpha = g.skipA;
  const spin = g.skip ? 1 + 0.12 * Math.sin(g.skip.t * 14) : 1 + 0.04 * Math.sin(g.time * 2.4);
  label(ctx, '≫', b.x, b.y - 2, 15 * spin, '#fff4dc', 'center', 700);
  label(ctx, '시간', b.x, b.y + 11, 6.5, '#fff4dc', 'center', 600);
  ctx.restore();
}

export function drawTalk(ctx, g) {
  const t = g.talk; if (!t) return;
  const a = ease(t.a), [who, str] = t.lines[t.i], b = BOX, y = b.y + (1 - a) * 14;
  ctx.save(); ctx.globalAlpha = a; ctx.imageSmoothingEnabled = true;
  // 말하는 사람: 대화창 왼쪽에 서 있다
  const np = 'h_npc_' + who;
  // 가게 판이 열려 있으면 그 판 옆의 주인이 말하는 것으로 본다 (같은 사람이 둘 서 있지 않게)
  if (hasSprite(np) && !g.panel) { const n = sprite(np), nh = 132, nw = nh * n.w / n.h; ctx.drawImage(n.img, b.x - nw + 26, H - nh + 6 + (1 - a) * 10, nw, nh); }
  // 대화창: 양피지 판 그림의 양 끝과 가운데를 이어 붙인다 (전용 그림이 오면 'ui_talk' 로 바뀐다)
  if (hasSprite('ui_talk')) { const s = sprite('ui_talk'); ctx.drawImage(s.img, b.x, y, b.w, b.h); }
  else {
    const im = sprite('h_row').img, sw = im.width, sh = im.height, k = b.h / sh, cap = sw * 0.03;
    ctx.drawImage(im, 0, 0, cap, sh, b.x, y, cap * k, b.h);
    ctx.drawImage(im, sw * 0.22, 0, sw * 0.44, sh, b.x + cap * k - 0.5, y, b.w - 2 * cap * k + 1, b.h);
    ctx.drawImage(im, sw - cap, 0, cap, sh, b.x + b.w - cap * k, y, cap * k, b.h);
  }
  label(ctx, WHO[who], b.x + 22, y + 15, 10, '#8a4a22', 'left', 700, null);
  ctx.font = `600 10.5px ${FONT}`;
  const lines = wrap(ctx, str, b.w - 44), shown = Math.floor(t.t * CPS);
  let used = 0;
  ctx.globalAlpha = a * (0.35 + 0.65 * t.swap);
  lines.forEach((ln, i) => {
    const part = ln.slice(0, clamp(shown - used, 0, ln.length)); used += ln.length + 1;
    if (part) label(ctx, part, b.x + 22, y + 31 + i * 14, 10.5, '#3b2c1e', 'left', 600, null);
  });
  ctx.globalAlpha = a;
  if (shown >= str.length) { ctx.globalAlpha = a * (0.55 + 0.45 * Math.sin(g.time * 5)); label(ctx, '▾', b.x + b.w - 20, y + b.h - 15, 11, '#8a4a22', 'center', 700, null); ctx.globalAlpha = a; }
  label(ctx, '건너뛰기', SKIP.x, SKIP.y + (1 - a) * 14, 8.5, 'rgba(255,244,220,0.9)', 'center', 600);
  ctx.restore();
}

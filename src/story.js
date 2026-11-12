// 이야기(대화)와 튜토리얼, 시간 넘기기.
// 주인공은 말이 없다. 말하는 사람은 마을 사람들(가게 주인 5명과 시장)뿐이고, 한 번에 2~4줄.
// 화면에 보이는 것은 GPT 그림(인물, 양피지 판)과 글자뿐이다.
import { W, H, DAY_SEC, DAY_PLAN } from './config.js';
import { sprite, hasSprite } from './assets.js';
import { RELICS } from './relics.js';
import { skillCost } from './economy.js';
import { travel } from './harbor.js';
import { openSettings, updateSettings } from './settings.js';

const FONT = '"Hahmlet", system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = (k) => k * k * (3 - 2 * k);

// 이름판에 들어가는 짧은 이름
const WHO = { hall: '시장', yard: '목수', guild: '길드장', market: '생선 장수', tackle: '도구 장수', tailor: '재단사' };

// ── 이야기 ──
// 겉 줄기: 쇠락한 어촌을 다시 일으키며, 바다에 나타난 말도 안 되게 큰 그림자들을 따라 먼바다로 나아간다.
// 숨은 진실(절대 직접 말하지 않는다): 오래전 인류는 한 번 멸망했고, 물고기들은 그때 가라앉은 물건·부품과 섞여 태어난다.
// 마을 사람들은 이를 모른다. 물건의 이름도 쓰임새도 모르고, 옛이야기로만 어렴풋이 전해 들었을 뿐이다.
// 그래서 대사는 늘 조금 어긋난다: 플레이어는 "저건 주전자잖아" 하고 알아보는데, 사람들은 "등에 솥 같은 것"이라고 한다.
// 8번 해역에서만 조금 더 드러나지만, 그때도 아무도 답을 말하지 않는다.
export const SCRIPT = {
  intro: [
    ['hall', '다시 바다로 나가려는구나. 영감님의 배는 그대로 두었다. 낡았지만 아직 뜬단다.'],
    ['hall', '영감님이 바닷가에서 너를 건져 온 게 엊그제 같은데. 말도 없고 기억도 없던 아이가 이만큼 컸구나.'],
    ['hall', '이름도 몰라서, 수평선에서 왔다고 영감님이 호라이라 불렀지. 이제는 온 마을이 아는 이름이야.'],
    ['hall', '보다시피 마을은 조용해졌지. 젊은이들은 떠나고, 가게들은 간신히 문만 열고 있어.'],
    ['hall', '그런데 요즘 바다에 이상한 그림자가 보인다더구나. 배보다 큰 것이, 그것도 한둘이 아니래.'],
    ['hall', '뭐가 올라오든 낚아서 가져오너라. 그 값으로 이 마을을 다시 일으켜 보자.'],
  ],
  town_2: [
    ['hall', '부두에 새 널빤지를 깔았다. 삐걱거리지 않는 부두가 얼마 만인지.'],
    ['market', '네가 가져온 것들, 다들 신기해해. 몸에 붙은 그 딱딱한 건 대체 뭐니? 조개껍데기는 아닌데.'],
  ],
  town_3: [
    ['hall', '떠났던 집 두 곳이 돌아왔다. 이제 포구 마을이라 불러도 부끄럽지 않겠어.'],
    ['tackle', '저번에 낚아 온 놈 등에 달린 것 말이야. 녹이 슬던데, 물고기 몸에서 왜 쇠가 나올까.'],
  ],
  town_4: [
    ['hall', '등대에 다시 불을 켰다. 이 탑은 우리 마을보다 오래됐단다. 누가 세웠는지는 아무도 몰라.'],
    ['hall', '이제부터는 돈만으로는 안 된다. 네가 무엇을 낚았는지 도감에 남겨야 사람들이 믿고 찾아와.'],
  ],
  town_5: [
    ['hall', '장이 서는 날이면 길이 막힌다. 번화한 항구라니, 내 생전에 다시 볼 줄 몰랐다.'],
    ['tailor', '손님이 물고기에서 떼어 낸 조각을 가져왔어. 천도 가죽도 아니고, 가볍고 안 썩는대. 그런 건 처음 봐.'],
  ],
  town_6: [
    ['hall', '먼 나라 배가 처음으로 닻을 내렸다. 다들 네가 낚은 것을 보러 온 거야.'],
    ['guild', '옛 노래에 이런 구절이 있지. "큰 사람들이 살던 때, 밤에도 땅이 별처럼 빛났다." 그냥 노래겠지만.'],
  ],
  town_7: [
    ['hall', '무역항이 되었다. 지도에 우리 마을 이름이 다시 적혔어.'],
    ['hall', '부두를 넓히다가 땅 밑에서 반듯한 돌길이 나왔단다. 우리 조상이 깐 건 아닌 것 같은데, 그럼 누가?'],
  ],
  town_8: [
    ['hall', '보아라. 영감님이 꿈꾸던 항구가 바로 이것이다.'],
    ['hall', '사람들은 이제 여기를 환상의 항구라 부른단다. 다 네 낚싯대 끝에서 시작된 일이야.'],
  ],
  region_2: [
    ['yard', '배를 손봐 뒀어. 이제 산호초가 있는 따뜻한 바다까지 나갈 수 있어.'],
    ['yard', '거기 산호는 이상하게 줄을 맞춰 자란대. 밑에 뭐가 깔려 있기라도 한 것처럼.'],
  ],
  region_3: [
    ['guild', '안개 군도다. 한 치 앞이 안 보이는데 물 밑 그림자만은 또렷하다고들 하지.'],
    ['guild', '안개 너머로 섬이 보이면 잘 봐 둬. 어떤 섬은 모서리가 너무 반듯하다는 사람이 있어.'],
  ],
  region_4: [
    ['yard', '여기부터는 뭍이 안 보이는 큰 바다야. 이 배로 여기까지 올 줄은 나도 몰랐어.'],
    ['yard', '멀리 갈수록 큰 게 올라오고, 몸에 붙은 것도 커져. 까닭은 아직 아무도 몰라.'],
  ],
  region_5: [
    ['guild', '얼음 바다다. 여기서 낚인 것들이 달고 있는 건 유난히 멀쩡해. 얼음이 지켜 준 모양이야.'],
    ['guild', '빙산 속에 뭔가 갇혀 있는 걸 봤다는 사람이 있어. 배라고 하기엔 너무 컸다더군.'],
  ],
  region_6: [
    ['yard', '물이 끓는 바다야. 배 몸통에 쇠를 덧댔으니 버틸 거야. 아마도.'],
    ['yard', '여기 그림자들은 뭔가를 지키는 것처럼 날뛴대. 바다 밑에 지킬 게 뭐가 있다고.'],
  ],
  region_7: [
    ['guild', '심연 해구다. 닻줄을 다 풀어도 바닥에 닿지 않아.'],
    ['guild', '맑은 날 내려다보면 저 밑에 불빛 같은 게 줄지어 있다는데. 물고기 눈이겠지. 그렇겠지?'],
  ],
  region_8: [
    ['hall', '여기가 지도 끝, 환상의 바다구나. 나도 따라 나와 봤다.'],
    ['hall', '물 밑을 보렴. 저 뾰족한 것들이 다 바위일까? 창문처럼 생긴 구멍이 줄지어 나 있는데.'],
    ['hall', '옛 노래의 "큰 사람들"이 정말 있었다면… 아니다, 늙은이의 헛소리지. 낚싯대나 드리우자꾸나.'],
  ],
  // 도감을 다 채워 태초의 바다가 열렸을 때 / 그 바다에 처음 들어섰을 때
  primal: [
    ['guild', '옛 노래의 마지막 구절이 이제야 읽히는군. "바다가 다 돌려준 날, 처음의 물길이 열린다."'],
    ['guild', '어느 해도에도 없던 바다일세. 가 보게. 배가 버텨 준다면.'],
  ],
  region_9: [
    ['guild', '…조용하군. 여기 것들은 아무것도 달고 있지 않아.'],
    ['guild', '쇠도, 유리도, 줄도 없네. 그저 물고기야. 이게 본래 모습이었던 걸까.'],
    ['guild', '낚아 보게. 처음 낚싯대를 잡았던 날처럼.'],
  ],
  // 대를 이었을 때: 호라이가 바닷가에서 건진 아이가 낚싯대를 잡는다 (영감님이 호라이를 건졌던 것처럼)
  gen: [
    ['hall', '큰 물이 들어 부두도 가게도 다 쓸려 갔구나. 그래도 사람은 하나도 다치지 않았다.'],
    ['hall', '호라이는 이제 뭍에서 그물을 깁는단다. 낡은 모자와 목도리는 네게 물려주었지.'],
    ['hall', '호라이가 바닷가에서 너를 건져 온 게 엊그제 같은데. 영감님이 호라이를 건져 왔던 것처럼 말이야.'],
    ['hall', '도감과 옛 물건들은 그대로 남았다. 네가 낚은 것은 전보다 값을 더 쳐주마. 자, 다시 일으켜 보자.'],
  ],
  ending: [
    ['hall', '마을도 다시 일어섰고, 지도 끝까지도 가 봤구나.'],
    ['hall', '그 그림자들이 어디서 오는지는 끝내 모르겠다. 어쩌면 모르는 채로 두는 게 맞는지도 모르지.'],
    ['hall', '그래도 계속 낚아라. 바다가 무슨 말을 하려는 건지, 언젠가는 알게 되겠지.'],
  ],
};

export function newStory() { return { seen: {} }; }
// 이미 한참 한 저장(이야기가 생기기 전)이면 처음 안내는 건너뛴다
export function skipBasics(g) { for (const k of ['intro', 'sail', 'cast', 'bite', 'fight', 'card', 'harbor', 'shop']) g.story.seen[k] = 1; }

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
const BOX = { x: 150, y: H - 84, w: 420, h: 420 * 166 / 1100 };      // 대화창 그림(ui_talk)의 비율
const SKIP = { x: BOX.x + BOX.w - 30, y: BOX.y - 8 };

// 누르면: 글자가 나오는 중이면 한꺼번에 보여 주고, 다 나왔으면 다음 줄로
export function tapTalk(g, x, y) {
  const t = g.talk; if (!t || t.closing != null) return;
  if (x != null && Math.abs(x - SKIP.x) < 36 && Math.abs(y - SKIP.y) < 13) { t.queue.length = 0; t.closing = 0; g.sfx.push(['tap']); return; }
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
  updateTitle(g, dt); updateSettings(g, dt);
  if (g.pendingIntro && !g.travel) { g.pendingIntro = false; startTalk(g, 'intro'); }
  if (g.pendingGen && !g.travel) { g.pendingGen = false; startTalk(g, 'gen'); }
  updateMemory(g, dt);
  updateHint(g, dt);
  updateSkip(g, dt);
}

// ── 제목 화면: 켜면 바다 위에 로고가 떠 있다. 누르면 로고가 걷히고 게임이 시작된다 ──
export function startTitle(g) { g.title = { t: 0, a: 0, closing: null }; }
// 제목 화면 아래 구석의 설정 두 가지: 소리 켜고 끄기(왼쪽), 처음부터 다시(오른쪽, 저장이 있을 때만. 두 번 눌러야 지워진다)
const T_SOUND = { x: 34, y: H - 20 }, T_RESET = { x: W - 62, y: H - 20 };
export function tapTitle(g, x, y) {
  const t = g.title; if (!t || t.closing != null || t.t < 0.8) return;
  if (x != null && Math.abs(x - T_SOUND.x) < 34 && Math.abs(y - T_SOUND.y) < 16) { openSettings(g); return; }      // 설정 판 (소리·해상도·진동)
  if (x != null && g.hasSave && Math.abs(x - T_RESET.x) < 62 && Math.abs(y - T_RESET.y) < 16) {
    if (t.askT != null && t.t - t.askT < 4) g.wipe = true; else t.askT = t.t;
    return;
  }
  t.closing = 0; g.sfx.push(['paper']);
}
function updateTitle(g, dt) {
  const t = g.title; if (!t) return;
  t.t += dt;
  if (t.closing != null) { t.closing += dt; t.a = Math.max(0, t.a - dt / 0.7); if (t.closing > 0.7) {
    g.title = null;
    // 처음 시작: 항구에서 시작한다. 화면이 넘어간 뒤 시장이 이야기하고, 출항 단추를 누르게 이끈다
    if (!g.story.seen.intro) travel(g, () => { g.scene = 'harbor'; g.panel = null; g.pendingIntro = true; });
  } }
  else t.a = Math.min(1, t.a + dt / 1.0);
}
export function drawTitle(ctx, g) {
  const t = g.title; if (!t) return;
  const a = ease(t.a);
  ctx.save();
  ctx.globalAlpha = a * 0.38; ctx.fillStyle = '#0c1630'; ctx.fillRect(0, 0, W, H);       // 바다는 그대로 보이고, 로고가 잘 읽히게 살짝만 가라앉힌다
  const s = sprite('ui_logo'), w = 330, h = w * s.h / s.w, bob = Math.sin(t.t * 1.1) * 2;
  ctx.globalAlpha = a; ctx.imageSmoothingEnabled = true;
  if (hasSprite('ui_logo')) ctx.drawImage(s.img, W / 2 - w / 2, 96 - h / 2 + bob + (1 - a) * 10, w, h);
  else { label(ctx, "Hori's Horizon", W / 2, 80, 30, '#ffd98a', 'center', 700); label(ctx, '호라이의 수평선', W / 2, 114, 16, '#fff4dc', 'center', 600); }
  if (t.closing == null && t.t > 0.9) { ctx.globalAlpha = a * (0.55 + 0.45 * Math.sin(t.t * 3)); label(ctx, '화면을 눌러 시작', W / 2, H - 46, 12, '#fff4dc', 'center', 600); }
  ctx.globalAlpha = a * 0.8;
  label(ctx, '설정', T_SOUND.x, T_SOUND.y, 9.5, '#fff4dc', 'center', 600);
  if (g.hasSave) { const ask = t.askT != null && t.t - t.askT < 4; label(ctx, ask ? '한 번 더 누르면 모든 기록이 지워진다' : '처음부터 다시', ask ? W - 96 : T_RESET.x, T_RESET.y, 9.5, ask ? '#ffb39a' : '#fff4dc', 'center', 600); }
  ctx.restore();
}

// ── 소리 켬/끔: 게임 중에도 화면 오른쪽 위 구석에서 바꿀 수 있다 (낚는 중에는 잘못 누르지 않게 쉴 때만) ──
const SND = { x: W - 22, y: 13 };
const sndOk = (g) => !g.settings && !g.title && !g.talk && !g.memory && !g.map && !g.dex && !g.panel && !g.travel && (g.scene === 'harbor' || g.state === 'idle');
export function tapSound(g, x, y) {
  if (!sndOk(g) || Math.abs(x - SND.x) > 22 || Math.abs(y - SND.y) > 11) return false;
  openSettings(g); return true;
}
export function drawSound(ctx, g) {
  g.sndA = (g.sndA || 0) + ((sndOk(g) ? 1 : 0) - (g.sndA || 0)) * 0.12;
  if (g.sndA < 0.02) return;
  ctx.save(); ctx.globalAlpha = g.sndA * 0.75;
  label(ctx, '설정', SND.x, SND.y, 9, '#fff4dc', 'center', 600);
  ctx.restore();
}

// ── 기억: 환상종이 남기고 간 오래된 물건을 주우면, 말없이 기억 한 조각이 떠오른다 ──
const MEM_CPS = 16;
// 12점을 다 모으면: 물건들이 한 줄로 떠오르고, 흩어져 있던 기억이 하나로 이어진다. 옛 노래가 끝까지 흐른다.
// 여기서도 무슨 일이 있었는지는 말하지 않는다. 주인공이 무엇을 떠올렸는지만 보여 준다.
const FINALE = [
  '그날 아침에도 식탁에는 숟가락이 셋 놓여 있었다.',
  '주전자는 울지 않았고, 엄마는 자꾸 시계를 봤다.',
  '아빠가 내 신발 끈을 묶어 주었다. 한 짝은 끝내 찾지 못했다.',
  '배에 오르는 사람이 아주 많았다. 바다는 아주 높았다.',
  '엄마가 오르골을 감아 주었다. 노래가 끝나기 전에 나는 잠들었다.',
  '눈을 떴을 때, 낯선 노인이 나를 내려다보고 있었다.',
  '이제 안다. 바다는 내가 잃어버린 것들을 하나씩 돌려주고 있었다.',
  '숟가락은 이제 내 식탁에 놓여 있다. 내일도 바다에 나갈 것이다.',
];
function updateMemory(g, dt) {
  // 볼 기억은 저장된 기록에서 찾는다: 가진 물건 가운데 아직 끝까지 못 본 첫 기억. (물건을 받은 직후에 꺼도 다음에 이어서 본다)
  if (!g.memory && g.state === 'idle' && g.scene === 'sea' && !g.travel && !g.talk && !g.result && !g.title && !g.panel && !g.map && !g.dex && !g.settings) {      // 판·해도·도감을 보는 중에는 끼어들지 않는다
    const seen = g.story.seen; let i = 0; while (i < g.relics && i < RELICS.length && seen['mem_' + i]) i++;
    if (i < Math.min(g.relics, RELICS.length)) {
      g.memory = { i, t: 0, a: 0, closing: null };
      g.sfx.push([RELICS[i].id === 'musicbox' ? 'oldsong' : 'memory']);
    } else if (g.relics >= RELICS.length && !seen.finale) {      // 열두 기억을 다 본 뒤: 모든 기억이 하나로 이어지는 장면
      g.memory = { fin: true, i: 0, t: 0, a: 0, swap: 0, closing: null }; g.sfx.push(['oldsong']);
    }
  }
  const m = g.memory; if (!m) return;
  m.t += dt;
  if (m.fin) m.swap = Math.min(1, m.swap + dt / 0.6);
  if (m.closing != null) {
    m.closing += dt; m.a = Math.max(0, m.a - dt / (m.fin ? 1.2 : 0.5));
    if (m.closing > (m.fin ? 1.2 : 0.5)) {
      g.memory = null;
      g.story.seen[m.fin ? 'finale' : 'mem_' + m.i] = 1; g.dirty = true;      // 끝까지 본 뒤에야 '봤다'고 적는다
    }
  } else m.a = Math.min(1, m.a + dt / 0.8);
}
const memLen = (r) => r.mem[0].length + r.mem[1].length;
export function tapMemory(g) {
  const m = g.memory; if (!m || m.closing != null) return;
  if (m.fin) {
    if (m.swap < 1) return;                                   // 한 줄이 다 떠오른 뒤에만 넘어간다 (연달아 눌러 놓치지 않게)
    if (m.i + 1 < FINALE.length) { m.i++; m.swap = 0; g.sfx.push(['tap']); } else m.closing = 0;
    return;
  }
  const r = RELICS[m.i], full = 1.2 + memLen(r) / MEM_CPS + 1.2;
  if (m.t < full) { m.t = full; return; }            // 글이 나오는 중이면 한꺼번에 보여 준다
  m.closing = 0; g.sfx.push(['tap']);
}
export function drawMemory(ctx, g) {
  const m = g.memory; if (!m) return;
  if (m.fin) return drawFinale(ctx, g, m);
  const r = RELICS[m.i], a = ease(m.a);
  ctx.save();
  ctx.globalAlpha = a * 0.82; ctx.fillStyle = '#060b1c'; ctx.fillRect(0, 0, W, H);            // 주위가 어두워지고 물건만 떠오른다
  const s = sprite('relic_' + r.art), w = 84, h = w * s.h / s.w, bob = Math.sin(m.t * 1.3) * 2.5;
  ctx.globalAlpha = a; ctx.imageSmoothingEnabled = true;
  ctx.drawImage(s.img, W / 2 - w / 2, 96 - h / 2 + bob + (1 - a) * 8, w, h);
  let shown = Math.max(0, Math.floor((m.t - 1.2) * MEM_CPS));
  r.mem.forEach((ln, i) => {
    const part = ln.slice(0, clamp(shown, 0, ln.length)); shown -= ln.length;
    if (part) label(ctx, part, W / 2, 178 + i * 20, 13, '#fff4dc', 'center', 600, 'rgba(6,11,28,0.7)');
  });
  const done = clamp((m.t - 1.2 - memLen(r) / MEM_CPS - 0.5) / 0.7, 0, 1);
  if (done > 0) {
    ctx.globalAlpha = a * done;
    label(ctx, r.name, W / 2, 246, 11, '#ffd98a', 'center', 700, 'rgba(6,11,28,0.7)');
    label(ctx, r.perk, W / 2, 263, 10, '#ffe9b8', 'center', 600, 'rgba(6,11,28,0.7)');
    ctx.globalAlpha = a * done * (0.5 + 0.4 * Math.sin(g.time * 4)); label(ctx, '▾', W / 2, 290, 11, '#fff4dc', 'center', 700, null);
  }
  ctx.restore();
}

function drawFinale(ctx, g, m) {
  const a = ease(m.a);
  ctx.save();
  ctx.globalAlpha = a * 0.9; ctx.fillStyle = '#060b1c'; ctx.fillRect(0, 0, W, H);
  ctx.imageSmoothingEnabled = true;
  // 물건 12점이 한 줄로, 하나씩 천천히 떠오른다
  RELICS.forEach((r, i) => {
    const k = clamp((m.t - 0.6 - i * 0.35) / 1.0, 0, 1), e = ease(k); if (e <= 0) return;
    const s = sprite('relic_' + r.art), w = 30, h = w * s.h / s.w, x = W / 2 + (i - 5.5) * 46, bob = Math.sin(m.t * 1.1 + i * 0.7) * 2;
    ctx.globalAlpha = a * e; ctx.drawImage(s.img, x - w / 2, 96 - h / 2 + bob + (1 - e) * 10, w, h);
  });
  if (m.t > 0.6 + 12 * 0.35) {
    const e = ease(m.swap);
    ctx.globalAlpha = a * e;
    label(ctx, FINALE[m.i], W / 2, 196 + (1 - e) * 5, 13, '#fff4dc', 'center', 600, 'rgba(6,11,28,0.7)');
    if (m.swap >= 1) { ctx.globalAlpha = a * (0.5 + 0.4 * Math.sin(g.time * 4)); label(ctx, '▾', W / 2, 232, 11, '#fff4dc', 'center', 700, null); }
  } else m.swap = 0;
  ctx.restore();
}

// ── 튜토리얼: 설명 화면 없이, 처음 해 보는 그때그때 한 줄 ──
function hintFor(g) {
  const s = g.story.seen, f = g.fight;
  if (g.talk || g.travel || g.title) return null;
  if (g.scene === 'harbor') {
    if (!s.sail) return '출항 버튼을 누르면 바다로 나갑니다';          // 처음: 다른 안내보다 먼저, 바다로 내보낸다
    if (!s.harbor) s.harbor = 1;
    if (!s.shop) { if (g.panel) { s.shop = 1; g.dirty = true; return null; } return '건물을 누르면 가게가 열립니다 · 시청에서는 마을을 키웁니다'; }
    return null;
  }
  if (!s.sail) { s.sail = 1; g.dirty = true; }
  if (!s.cast) { if (g.state !== 'idle' && g.state !== 'charge') { s.cast = 1; g.dirty = true; } else return g.state === 'charge' ? '손을 떼면 던집니다' : '화면을 꾹 눌렀다 떼면 찌를 던집니다'; }
  if (!s.bite) { if (g.state === 'fight') { s.bite = 1; g.dirty = true; } else if (g.state === 'wait' || g.state === 'bite') return '찌가 쑥 들어가는 순간 눌러 주세요'; }
  if (!s.fight) { if (g.state === 'catch') { s.fight = 1; g.dirty = true; } else if (f) return f.surging ? '날뜁니다! 손을 떼고 버텨 주세요' : '누르면 감고 떼면 풉니다 · 게이지가 가득 차도, 텅 비어도 놓칩니다'; }
  if (!s.card) { if (g.state === 'idle' && s.fight) { s.card = 1; g.dirty = true; } else if (g.state === 'result' && g.result.age > 1.2) return '카드에 적힌 값의 절반은 지금 선금으로, 나머지는 항구에서 포상금으로 받습니다'; }
  if (s.card && !s.skill && g.state === 'idle' && !g.panel && g.gold >= skillCost(g.eco, 'profit')) return '톱니 버튼 · 기술은 바다에서도 올릴 수 있습니다';
  if (g.panel && g.panel.id === 'skills' && !s.skill) { s.skill = 1; g.dirty = true; }
  if (s.card && !s.harbor && g.state === 'idle' && g.cargo.length >= 3) return '오른쪽 아래 항구 버튼 · 생물을 팔고 장비를 삽니다';
  if (!s.day && g.state === 'idle' && g.dayT > DAY_SEC * 0.3) { g.hintT = (g.hintT || 0); if (g.hintT > 6) { s.day = 1; g.dirty = true; } else return '밤이 끝나면 항구로 돌아갑니다 · 위쪽 버튼으로 시간을 넘길 수 있습니다'; }
  return null;
}
function updateHint(g, dt) {
  const want = g.dex || g.map || g.memory || g.settings ? null : hintFor(g), h = g.hint || (g.hint = { text: '', a: 0 });      // 도감·해도·회상 위에는 안내를 띄우지 않는다
  if (want && want.startsWith('밤이')) g.hintT = (g.hintT || 0) + dt;
  if (want && (h.text === want || h.a < 0.02)) { h.text = want; h.a = Math.min(1, h.a + dt / 0.3); }
  else h.a = Math.max(0, h.a - dt / 0.25);                  // 글이 바뀔 때는 사라졌다가 새 글이 나타난다
}

// ── 시간 넘기기: 다음 시간대로 빠르게 흘려보낸다 (앞으로만, 되돌릴 수 없다) ──
export const SKIP_BTN = { x: W / 2 + 85 + 16, y: 15, r: 12 };
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
  // 글자 뒤에 짙은 띠를 깔아, 밝은 하늘이나 큰 생물 위에서도 읽힌다
  ctx.font = `600 11px ${FONT}`; const tw = ctx.measureText(h.text).width + 22, ty = 52 - (1 - h.a) * 4;
  ctx.globalAlpha = h.a * 0.6; ctx.fillStyle = '#101c38'; ctx.beginPath(); ctx.roundRect(W / 2 - tw / 2, ty - 9, tw, 18, 9); ctx.fill();
  ctx.globalAlpha = h.a;
  label(ctx, h.text, W / 2, ty, 11, '#fff4dc', 'center', 600, null);
  // 가리키는 손: 눌러야 할 단추 위에서 까딱인다
  const at = h.text.startsWith('오른쪽 아래 항구') ? [W - 26, H - 48] : h.text.startsWith('출항 버튼') ? [W - 62, H - 42] : null;
  if (at && hasSprite('ui_hand')) { const s = sprite('ui_hand'), w = 16, bob = Math.sin(g.time * 5) * 2.5; ctx.imageSmoothingEnabled = true; ctx.drawImage(s.img, at[0] - w / 2, at[1] - w * s.h / s.w + bob, w, w * s.h / s.w); }
  ctx.restore();
}

export function drawSkip(ctx, g) {
  const on = canSkip(g) || g.skip, b = SKIP_BTN;
  g.skipA = (g.skipA || 0) + ((on ? 1 : 0) - (g.skipA || 0)) * 0.12;
  if (g.skipA < 0.01) return;
  ctx.save(); ctx.globalAlpha = g.skipA;
  const spin = g.skip ? 1 + 0.12 * Math.sin(g.skip.t * 14) : 1 + 0.04 * Math.sin(g.time * 2.4);
  if (hasSprite('ui_ff')) { const s = sprite(g.skip ? 'ui_ff_down' : 'ui_ff'), w = 22 * spin; ctx.imageSmoothingEnabled = true; ctx.drawImage(s.img, b.x - w / 2, b.y - w * s.h / s.w / 2, w, w * s.h / s.w); }
  else { label(ctx, '≫', b.x, b.y - 2, 15 * spin, '#fff4dc', 'center', 700); label(ctx, '시간', b.x, b.y + 11, 6.5, '#fff4dc', 'center', 600); }
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
  const art = hasSprite('ui_talk');
  if (art) {                                                      // 놋쇠 이름판의 한가운데에 (그림에서 잰 자리: 가로 12.2%, 세로 16%)
    ctx.font = `700 8.5px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    const nw = ctx.measureText(WHO[who]).width, room = b.w * 0.098;      // 양쪽 못 사이의 폭. 넘치면 글자를 줄인다
    if (nw > room) ctx.font = `700 ${8.5 * room / nw}px ${FONT}`;
    const mt = ctx.measureText('가힣'), up = mt.actualBoundingBoxAscent, dn = mt.actualBoundingBoxDescent;
    ctx.fillStyle = '#4a3214'; ctx.fillText(WHO[who], b.x + b.w * 0.122, y + b.h * 0.16 + (up - dn) / 2);
  }
  else label(ctx, WHO[who], b.x + 22, y + 15, 10, '#8a4a22', 'left', 700, null);
  ctx.font = `600 10.5px ${FONT}`;
  const lines = wrap(ctx, str, b.w - 44), shown = Math.floor(t.t * CPS);
  let used = 0;
  ctx.globalAlpha = a * (0.35 + 0.65 * t.swap);
  lines.forEach((ln, i) => {
    const part = ln.slice(0, clamp(shown - used, 0, ln.length)); used += ln.length + 1;
    if (part) label(ctx, part, b.x + 24, y + (art ? 29 + i * 12.5 : 31 + i * 14), 10.5, '#3b2c1e', 'left', 600, null);
  });
  ctx.globalAlpha = a;
  if (shown >= str.length) { ctx.globalAlpha = a * (0.55 + 0.45 * Math.sin(g.time * 5)); label(ctx, '▾', b.x + b.w - 22, y + b.h - 14, 11, '#8a4a22', 'center', 700, null); ctx.globalAlpha = a; }
  label(ctx, '건너뛰기', SKIP.x, SKIP.y + (1 - a) * 14, 8.5, 'rgba(255,244,220,0.9)', 'center', 600);
  ctx.restore();
}

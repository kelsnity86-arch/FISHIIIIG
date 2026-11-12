// 소리: 배경음악·환경음·효과음을 전부 코드로 합성한다 (음원 파일 없음).
//
// 방향: 낚기 전에는 따뜻하고 고요하게(전자 피아노·패드·오르골), 낚은 순간에는 옛 게임기 소리(칩튠)로 반전.
// 음악은 시간대(낮·노을·밤·새벽)마다 곡이 다르고, 줄다리기 중에는 같은 곡 위에 북과 낮은 음이 깔리며 긴박해진다.
//
// createEngine(ctx) 는 어떤 AudioContext 로도 돈다 → 게임(실시간)과 견본 파일 만들기(OfflineAudioContext)가 같은 코드를 쓴다.

const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

const CH = { maj7: [0, 4, 7, 11], m7: [0, 3, 7, 10], six: [0, 4, 7, 9], sus2: [0, 2, 7, 12], sus4: [0, 5, 7, 12], sus7: [0, 5, 7, 10], m9: [0, 3, 7, 14], maj: [0, 4, 7, 12], min: [0, 3, 7, 12], add9: [0, 4, 7, 14] };
// 곡: 빠르기, 박자, 화음 진행(으뜸음, 종류), 가락에 쓰는 음계(으뜸음에서의 반음), 가락 악기, 음의 촘촘함, 패드의 밝기
const SONGS = {
  day:    { bpm: 76, beats: 4, key: 60, prog: [[0, 'maj7'], [9, 'm7'], [5, 'maj7'], [7, 'six']],  scale: [0, 2, 4, 7, 9], lead: 'ep',  dens: 0.62, mel: 0.5,  pad: 1100 },
  dusk:   { bpm: 66, beats: 4, key: 65, prog: [[0, 'maj7'], [9, 'm7'], [5, 'maj7'], [7, 'sus7']], scale: [0, 2, 4, 7, 9], lead: 'ep',  dens: 0.45, mel: 0.38, pad: 800, low: true },
  night:  { bpm: 54, beats: 4, key: 57, prog: [[0, 'm9'], [8, 'maj7'], [5, 'm7'], [7, 'm7']],     scale: [0, 3, 5, 7, 10], lead: 'box', dens: 0.3,  mel: 0.34, pad: 560 },
  dawn:   { bpm: 60, beats: 4, key: 55, prog: [[0, 'sus2'], [9, 'm7'], [5, 'maj7'], [7, 'sus4']], scale: [0, 2, 4, 7, 9], lead: 'box', dens: 0.36, mel: 0.42, pad: 900 },
  harbor: { bpm: 112, beats: 3, key: 55, prog: [[0, 'maj'], [9, 'min'], [5, 'add9'], [7, 'maj']], scale: [0, 2, 4, 5, 7, 9, 11], lead: 'ep', dens: 0.8, mel: 0.62, pad: 1000, waltz: true },
};
// 주제 가락: 곡마다 직접 쓴 8마디. 마디마다 [시작 박, 으뜸음에서의 반음, 길이(박)].
// 8마디는 주제 가락, 다음 8마디는 그 화음 위에서 자유롭게 흘러가는 가락 — 을 번갈아 연주한다.
const T = (...bars) => bars.map((b) => { let x = 0; return b.map(([n, len]) => { const r = [x, n, len]; x += len; return r; }); });
SONGS.day.theme = T([[4, 1], [7, 1], [9, 1], [7, 1]], [[4, 2], [0, 1], [2, 1]], [[0, 1], [-3, 1], [0, 1], [5, 1]], [[2, 3]],
  [[4, 1], [7, 1], [12, 1.5], [11, 0.5]], [[9, 2], [7, 1], [4, 1]], [[5, 1], [4, 1], [2, 1], [0, 1]], [[-1, 1], [2, 3]]);
SONGS.day.oct = 12;
SONGS.dusk.theme = T([[4, 2], [7, 2]], [[4, 1], [0, 1], [-3, 2]], [[0, 1], [2, 1], [4, 1], [5, 1]], [[2, 4]],
  [[4, 1], [7, 1], [12, 2]], [[11, 1], [9, 1], [7, 2]], [[5, 2], [4, 1], [2, 1]], [[2, 2], [0, 2]]);
SONGS.dusk.oct = 12;
SONGS.night.theme = T([[7, 2], [12, 2]], [[15, 3]], [[12, 1], [8, 1], [5, 2]], [[7, 2], [14, 2]],
  [[15, 2], [19, 2]], [[12, 3]], [[8, 1], [12, 1], [17, 2]], [[14, 2], [10, 2]]);
SONGS.dawn.theme = T([[7, 2], [12, 2]], [[16, 2], [12, 1], [9, 1]], [[9, 1], [12, 1], [17, 2]], [[14, 4]],
  [[7, 1], [12, 1], [14, 1], [16, 1]], [[19, 2], [16, 2]], [[17, 1], [16, 1], [12, 2]], [[14, 2], [7, 2]]);
SONGS.harbor.theme = T([[16, 1], [19, 1], [24, 1]], [[21, 2], [16, 1]], [[17, 1], [21, 1], [24, 1]], [[14, 2], [18, 1]],
  [[16, 1], [19, 1], [16, 1]], [[21, 1], [24, 1], [21, 1]], [[17, 1], [19, 1], [21, 1]], [[19, 3]]);

// 같은 시간대에도 곡이 여럿이다: 16마디마다 다른 곡으로 넘어간다 (같은 조 안에서 화음 진행·빠르기·악기가 다르다 → 조가 튀지 않는다).
SONGS.day.alts = [
  { bpm: 70, prog: [[5, 'maj7'], [0, 'maj7'], [2, 'm7'], [7, 'sus4']], lead: 'box', dens: 0.5, mel: 0.4 },
  { bpm: 72, prog: [[9, 'm7'], [5, 'maj7'], [0, 'add9'], [4, 'm7']], dens: 0.5, mel: 0.44 },
  { bpm: 66, prog: [[0, 'add9'], [4, 'm7'], [5, 'maj7'], [5, 'maj7']], lead: 'box', dens: 0.4, mel: 0.36 },
];
SONGS.dusk.alts = [
  { bpm: 62, prog: [[5, 'maj7'], [4, 'm7'], [2, 'm7'], [0, 'maj7']], dens: 0.4, mel: 0.34 },
  { bpm: 64, prog: [[0, 'add9'], [5, 'maj7'], [9, 'm7'], [7, 'sus7']], lead: 'box', dens: 0.36, mel: 0.32 },
  { bpm: 58, prog: [[2, 'm7'], [7, 'sus7'], [0, 'maj7'], [9, 'm7']], dens: 0.34, mel: 0.3 },
];
SONGS.night.alts = [
  { bpm: 50, prog: [[0, 'm7'], [5, 'm7'], [8, 'maj7'], [7, 'm7']], lead: 'ep', dens: 0.24, mel: 0.28 },
  { bpm: 56, prog: [[8, 'maj7'], [10, 'six'], [0, 'm9'], [0, 'm9']], dens: 0.26, mel: 0.3 },
  { bpm: 48, prog: [[5, 'm7'], [0, 'm9'], [8, 'maj7'], [3, 'maj7']], dens: 0.2, mel: 0.26 },
];
SONGS.dawn.alts = [
  { bpm: 58, prog: [[5, 'maj7'], [7, 'sus4'], [0, 'add9'], [9, 'm7']], dens: 0.32, mel: 0.38 },
  { bpm: 62, prog: [[0, 'add9'], [4, 'm7'], [5, 'maj7'], [7, 'sus4']], lead: 'ep', dens: 0.34, mel: 0.36 },
  { bpm: 56, prog: [[9, 'm7'], [5, 'maj7'], [0, 'sus2'], [7, 'sus4']], dens: 0.28, mel: 0.34 },
];

// ── 태초의 바다: 이 바다만의 네 곡 (새벽·낮·노을·밤) ──
// 희망이 가득하고 잔잔하게. 네 곡 모두 장조이고(밤도 어둡지 않은 자장가), 조는 다·바·사 사이에서만 옮겨 다녀 넘어갈 때 튀지 않는다.
// 화음은 부드러운 것만(장7·덧9·서스), 가락은 다섯 음 음계 안에서 차례로 오르내린다. 북·종·낮게 깔리는 음은 없다.
// 밤의 주제 가락은 '옛 노래'다: 다른 바다에서는 한 음씩 끊겨 들리던 자장가가 여기서 처음으로 온전한 곡이 된다.
const PRIMAL = {
  dawn:  { bpm: 58, beats: 4, key: 60, prog: [[0, 'add9'], [5, 'maj7'], [0, 'add9'], [7, 'sus4']], scale: [0, 2, 4, 7, 9], lead: 'box', dens: 0.34, mel: 0.36, pad: 1000 },
  day:   { bpm: 68, beats: 4, key: 55, prog: [[0, 'maj7'], [5, 'add9'], [9, 'm7'], [7, 'sus4']],  scale: [0, 2, 4, 7, 9], lead: 'ep',  dens: 0.5,  mel: 0.42, pad: 1150, oct: 12 },
  dusk:  { bpm: 60, beats: 4, key: 65, prog: [[0, 'maj7'], [4, 'm7'], [5, 'maj7'], [7, 'sus7']],  scale: [0, 2, 4, 7, 9], lead: 'ep',  dens: 0.4,  mel: 0.34, pad: 850, low: true, oct: 12 },
  night: { bpm: 52, beats: 4, key: 60, prog: [[0, 'maj7'], [5, 'maj7'], [0, 'add9'], [7, 'sus4']], scale: [0, 2, 4, 7, 9], lead: 'box', dens: 0.26, mel: 0.28, pad: 640 },
};
PRIMAL.dawn.theme = T([[0, 2], [4, 2]], [[7, 3], [4, 1]], [[9, 2], [7, 2]], [[2, 4]],
  [[2, 1], [4, 1], [7, 2]], [[9, 2], [12, 2]], [[12, 1], [9, 1], [7, 2]], [[7, 2], [2, 2]]);
PRIMAL.day.theme = T([[7, 1], [9, 1], [12, 2]], [[9, 1], [12, 1], [14, 2]], [[12, 2], [9, 1], [7, 1]], [[7, 4]],
  [[4, 1], [7, 1], [9, 1], [12, 1]], [[14, 2], [12, 2]], [[9, 1], [12, 1], [9, 1], [7, 1]], [[7, 2], [2, 2]]);
PRIMAL.dusk.theme = T([[4, 2], [7, 2]], [[11, 2], [7, 2]], [[9, 3], [7, 1]], [[7, 2], [2, 2]],
  [[4, 1], [7, 1], [12, 2]], [[11, 2], [14, 2]], [[12, 1], [9, 1], [5, 2]], [[7, 4]]);
PRIMAL.night.theme = T([[7, 1], [12, 1], [16, 2]], [[14, 1], [12, 1], [9, 2]], [[7, 2], [12, 2]], [[14, 4]],
  [[7, 1], [12, 1], [16, 2]], [[17, 2], [16, 1], [14, 1]], [[12, 2], [9, 1], [7, 1]], [[12, 4]]);
PRIMAL.dawn.alts = [
  { bpm: 56, prog: [[5, 'maj7'], [0, 'add9'], [5, 'maj7'], [7, 'sus4']], dens: 0.3, mel: 0.34 },
  { bpm: 60, prog: [[0, 'sus2'], [9, 'm7'], [5, 'maj7'], [0, 'add9']], lead: 'ep', dens: 0.32, mel: 0.34 },
];
PRIMAL.day.alts = [
  { bpm: 66, prog: [[5, 'maj7'], [0, 'maj7'], [5, 'add9'], [7, 'sus4']], lead: 'box', dens: 0.44, mel: 0.38 },
  { bpm: 70, prog: [[0, 'add9'], [4, 'm7'], [5, 'maj7'], [7, 'six']], dens: 0.48, mel: 0.4 },
];
PRIMAL.dusk.alts = [
  { bpm: 58, prog: [[5, 'maj7'], [0, 'maj7'], [2, 'm7'], [7, 'sus7']], dens: 0.36, mel: 0.3 },
  { bpm: 62, prog: [[0, 'add9'], [5, 'maj7'], [0, 'maj7'], [7, 'sus4']], lead: 'box', dens: 0.34, mel: 0.3 },
];
PRIMAL.night.alts = [
  { bpm: 50, prog: [[5, 'maj7'], [0, 'maj7'], [5, 'maj7'], [0, 'add9']], dens: 0.22, mel: 0.26 },
  { bpm: 54, prog: [[0, 'add9'], [9, 'm7'], [5, 'maj7'], [7, 'sus4']], lead: 'ep', dens: 0.24, mel: 0.26 },
];

// 해역마다 조를 옮겨 같은 곡도 다르게 들린다 (열대는 높고 밝게, 심연은 낮게)
const REGION_SHIFT = [0, 0, 2, -3, -1, 4, -4, -6, 3, 0];
// 해역마다 음악의 성격이 다르다. 시간대의 곡 위에 그 바다의 빛깔을 입힌다 (전부 잔잔하게, 튀는 소리 없이).
//   tempo 빠르기 배수 · dens 반주의 촘촘함 배수 · mel 가락의 잦기 배수 · lead 가락 악기 · scale 가락 음계
//   minor 단조 화음 진행 · low 한 옥타브 낮게 · pulse 여린 북(몇 마디마다) · bell 먼 종소리(잦기) · arp 반짝이는 오름 가락 · drone 깔리는 낮은 음
//   old "옛 노래" 가락을 몇 음까지 들려주는가 (이야기: 멀리 갈수록 잊힌 노래가 조금씩 이어진다. 8번 해역에서 끝까지)
const REGION_MUS = [null,
  { tempo: 1,    dens: 1,    mel: 1,    old: 2 },                                                              // 1 햇살 연안: 따뜻하고 편안하게 (기본)
  { tempo: 1.08, dens: 1.15, mel: 1.1,  lead: 'box', sway: true, old: 3 },                                      // 2 산호초 열대: 밝고 살랑이는 엇박
  { tempo: 0.88, dens: 0.6,  mel: 0.7,  lead: 'box', scale: [0, 2, 3, 7, 9], bell: 0.16, drone: 0.02, old: 3 }, // 3 안개 군도: 듬성듬성, 안개 너머 종소리
  { tempo: 0.92, dens: 0.85, mel: 0.85, low: true, drone: 0.035, old: 4 },                                      // 4 원양 대해: 넓고 느긋하게, 깊은 울림
  { tempo: 0.84, dens: 0.55, mel: 0.8,  lead: 'box', high: true, scale: [0, 2, 4, 7, 11], old: 5 },             // 5 극지 빙해: 높고 맑은 오르골, 여백
  { tempo: 0.9,  dens: 0.8,  mel: 0.75, minor: true, pulse: 2, drone: 0.03, old: 6 },                           // 6 화산 해역: 단조, 낮고 묵직한 맥박
  { tempo: 0.78, dens: 0.4,  mel: 0.5,  minor: true, low: true, lead: 'box', drone: 0.045, bell: 0.06, old: 7 },// 7 심연 해구: 느리고 어둡게, 거의 정적
  { tempo: 0.94, dens: 0.9,  mel: 0.9,  lead: 'box', arp: true, old: 8 },                                       // 8 환상의 바다: 꿈결, 옛 노래가 끝까지
  { tempo: 1,    dens: 1,    mel: 1,    own: PRIMAL, gentle: true, old: 0 },                                                  // 9 태초의 바다: 이 바다만의 네 곡. 희망차고 잔잔하게
];
const MINOR_PROGS = [[[0, 'm9'], [8, 'maj7'], [5, 'm7'], [7, 'm7']], [[0, 'm7'], [5, 'm7'], [8, 'maj7'], [7, 'm7']], [[5, 'm7'], [0, 'm9'], [8, 'maj7'], [3, 'maj7']]];
const MINOR_SCALE = [0, 3, 5, 7, 10];
// 옛 노래: 잊힌 자장가 한 소절 (으뜸음에서의 반음, 길이(박)). 장조/단조 해역에 맞춰 3음과 6음이 바뀐다.
const OLD_SONG = [[7, 1], [12, 1], [16, 1.5], [14, 0.5], [12, 1], [9, 1], [7, 1], [12, 3]];
const OLD_MINOR = { 16: 15, 9: 8, 14: 14 };

export function createEngine(ctx) {
  // ── 흐름: 음악 / 효과음 / 환경음 → (울림) → 누르개 → 출력 ──
  const out = ctx.createDynamicsCompressor();
  out.threshold.value = -12; out.knee.value = 10; out.ratio.value = 6; out.attack.value = 0.004; out.release.value = 0.2;
  const master = ctx.createGain(); master.gain.value = 0.9;
  out.connect(master); master.connect(ctx.destination);
  const bus = (v) => { const g = ctx.createGain(); g.gain.value = v; g.connect(out); return g; };
  const music = bus(0.55), sfx = bus(0.8), amb = bus(0.5);
  const duck = ctx.createGain(); duck.connect(music);                    // 낚는 순간 음악이 물러난다
  // 울림(잔향): 소리가 넓은 바다에 퍼지는 느낌. 잦아드는 잡음으로 만든다.
  const rev = ctx.createConvolver();
  { const len = Math.floor(ctx.sampleRate * 2.4), buf = ctx.createBuffer(2, len, ctx.sampleRate), r = rng(7);
    for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (r() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    rev.buffer = buf; }
  const revOut = ctx.createGain(); revOut.gain.value = 0.32; rev.connect(revOut); revOut.connect(out);
  const send = (v, into) => { const g = ctx.createGain(); g.gain.value = v; g.connect(rev); into.connect(g); };
  send(0.7, duck); send(0.25, sfx);
  const noiseBuf = (() => { const len = ctx.sampleRate * 2, b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0), r = rng(3); for (let i = 0; i < len; i++) d[i] = r() * 2 - 1; return b; })();

  // 파도용 잡음: 9초짜리, 낮은 소리가 센 부드러운 잡음 (짧은 흰 잡음을 되풀이하면 라디오 잡음처럼 지직거린다)
  const softBuf = (() => { const len = Math.floor(ctx.sampleRate * 9), b = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = b.getChannelData(c), r = rng(11 + c); let v = 0; for (let i = 0; i < len; i++) { v = (v + 0.02 * (r() * 2 - 1)) / 1.02; d[i] = v * 3.5; }
      for (let i = 0; i < 4000; i++) { const k = i / 4000; d[i] = d[i] * k + d[len - 4000 + i] * (1 - k); } }     // 이음매가 튀지 않게
    return b; })();

  // 물결용 잡음: 9초짜리 흰 잡음 (부서지는 '쏴아' 소리. 폰 스피커는 낮은 소리를 못 내므로 이 층이 있어야 파도가 들린다)
  const washBuf = (() => { const len = Math.floor(ctx.sampleRate * 9), b = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = b.getChannelData(c), r = rng(31 + c); for (let i = 0; i < len; i++) d[i] = r() * 2 - 1; }
    return b; })();

  // ── 소리 조각 ──
  function env(t, dur, vol, attack = 0.005, to = out) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(attack + 0.01, dur));
    g.connect(to);
    return g;
  }
  function osc(t, dur, freq, type, g, slideTo) {
    const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t + dur);
    o.connect(g); o.start(t); o.stop(t + dur + 0.05);
    return o;
  }
  function noise(t, dur, { vol = 0.3, from = 4000, to = 400, q = 0.8, type = 'lowpass', attack = 0.005, dest = sfx } = {}) {
    const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true;
    const f = ctx.createBiquadFilter(); f.type = type; f.Q.value = q;
    f.frequency.setValueAtTime(from, t); f.frequency.exponentialRampToValueAtTime(Math.max(30, to), t + dur);
    s.connect(f); f.connect(env(t, dur, vol, attack, dest));
    s.start(t, (t * 0.37) % 1.5); s.stop(t + dur + 0.05);
  }
  // 전자 피아노: 부드러운 기본음 + 옅은 배음, 길게 잦아든다
  function ep(t, m, dur, vel, dest = duck) {
    const f = mtof(m), d = Math.max(0.5, dur) * 1.5;
    osc(t, d, f, 'sine', env(t, d, vel * 0.5, 0.018, dest));
    osc(t, d * 0.6, f * 2, 'sine', env(t, d * 0.6, vel * 0.1, 0.014, dest));
  }
  // 오르골: 맑고 높은 음, 금방 사라진다
  function box(t, m, vel, dest = duck) {
    const f = mtof(m);
    osc(t, 1.8, f, 'sine', env(t, 1.8, vel * 0.36, 0.008, dest));
    osc(t, 0.5, f * 3.01, 'sine', env(t, 0.5, vel * 0.06, 0.006, dest));
  }
  // 패드: 천천히 부풀었다 가라앉는 화음
  function pad(t, notes, dur, vel, cut) {
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = cut; lp.Q.value = 0.3;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel, t + dur * 0.4); g.gain.linearRampToValueAtTime(vel * 0.7, t + dur * 0.8); g.gain.linearRampToValueAtTime(0.0001, t + dur + 1.6);
    lp.connect(g); g.connect(duck);
    for (const m of notes) for (const det of [-5, 6]) { const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = mtof(m); o.detune.value = det; o.connect(lp); o.start(t); o.stop(t + dur + 1.7); }
  }
  function bass(t, m, dur, vel) {
    const f = mtof(m), lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 320;
    lp.connect(env(t, dur, vel, 0.02, duck));
    osc(t, dur, f, 'triangle', lp); osc(t, dur, f, 'sine', lp);
  }
  const kick = (t, vel, dest = duck) => { osc(t, 0.2, 120, 'sine', env(t, 0.2, vel, 0.002, dest), 42); };
  const taiko = (t, vel, dest = duck) => { osc(t, 0.34, 92, 'sine', env(t, 0.34, vel, 0.003, dest), 52); noise(t, 0.09, { vol: vel * 0.3, from: 900, to: 200, dest }); };
  const hat = (t, vel) => noise(t, 0.04, { vol: vel, from: 9000, to: 6000, type: 'highpass', dest: duck });
  // 줄다리기: 짧게 끊어 치는 현악기풍 화음, 작은북, 심벌
  function stab(t, notes, dur, vel) {
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(2400, t); lp.frequency.exponentialRampToValueAtTime(600, t + dur); lp.Q.value = 1.2;
    lp.connect(env(t, dur, vel, 0.008, duck));
    for (const m of notes) for (const det of [-7, 7]) { const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = mtof(m); o.detune.value = det; o.connect(lp); o.start(t); o.stop(t + dur + 0.05); }
  }
  const snare = (t, vel) => { noise(t, 0.13, { vol: vel, from: 5200, to: 1800, type: 'bandpass', q: 0.7, dest: duck }); osc(t, 0.08, 190, 'triangle', env(t, 0.08, vel * 0.6, 0.002, duck), 130); };
  const crash = (t, vel) => noise(t, 1.3, { vol: vel, from: 9000, to: 4000, type: 'highpass', dest: duck });
  // 옛 게임기 소리
  const chip = (t, m, dur, vel, type = 'square') => { osc(t, dur, mtof(m), type, env(t, dur, vel, 0.004, sfx)); };

  // ── 환경음: 늘 깔리는 파도, 항구의 웅성거림, 줄이 우는 소리 ──
  function loopNoise(freq, type, q, buf = softBuf) {
    const sN = ctx.createBufferSource(); sN.buffer = buf; sN.loop = true;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain(); g.gain.value = 0;
    sN.connect(f); f.connect(g); g.connect(amb); sN.start(0);
    return { g, f };
  }
  const lfo = (rate, depth, param) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = rate; g.gain.value = depth; o.connect(g); g.connect(param); o.start(0); };
  // 바다: 늘 깔리는 낮은 웅웅거림(sea) + 밀려왔다 부서지는 물결(wash). 물결은 하나씩 따로 밀려온다.
  const sea = loopNoise(260, 'lowpass', 0.4), wash = loopNoise(900, 'lowpass', 0.3, washBuf), crowd = loopNoise(380, 'bandpass', 1.2);
  const washLevel = ctx.createGain(); washLevel.gain.value = 0.5;        // 물결 하나하나의 오르내림에 곱해지는 전체 크기
  wash.g.disconnect(); wash.g.connect(washLevel); washLevel.connect(amb);
  lfo(0.05, 0.05, sea.g.gain); lfo(0.31, 0.05, crowd.g.gain);
  let waveT = 0;
  const wr = rng(99);
  function scheduleWaves(until) {
    while (waveT < until) {
      const rise = 2.2 + wr() * 1.6, fall = 3 + wr() * 2.4, peak = 0.55 + wr() * 0.45, t = Math.max(waveT, 0.01);
      wash.g.gain.setValueAtTime(0.012, t);                                   // 스으으… 밀려와서
      wash.g.gain.linearRampToValueAtTime(peak * 0.16, t + rise);
      wash.g.gain.linearRampToValueAtTime(0.012, t + rise + fall);            // 쏴아아 빠진다
      wash.f.frequency.setValueAtTime(600, t);
      wash.f.frequency.linearRampToValueAtTime(1400 + peak * 1400, t + rise);
      wash.f.frequency.linearRampToValueAtTime(600, t + rise + fall);
      waveT = t + rise + fall + wr() * 1.2;
    }
  }
  const whine = (() => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.value = 2100; g.gain.value = 0; o.connect(g); g.connect(sfx); o.start(0); lfo(7, 40, o.frequency); return { o, g }; })();

  // ── 효과음 (t = 시작 시각) ──
  const FAN = [   // 등급별 팡파르: [반음, 길이(박)] — 등급이 높을수록 길고 화려하다
    [[0, 1], [4, 1], [7, 2]],
    [[0, 1], [4, 1], [7, 1], [12, 3]],
    [[0, 1], [4, 1], [7, 1], [12, 1], [16, 3]],
    [[0, 1], [0, 1], [4, 1], [7, 1], [12, 2], [9, 1], [12, 4]],
    [[0, 1], [4, 1], [7, 1], [12, 2], [7, 1], [12, 1], [16, 2], [14, 1], [16, 1], [19, 5]],
    [[0, 1], [4, 1], [7, 1], [12, 1], [16, 2], [12, 1], [16, 1], [19, 2], [17, 1], [19, 1], [21, 1], [23, 1], [24, 6]],
  ];
  const S = {
    cast(t) { noise(t, 0.38, { vol: 0.22, from: 500, to: 4200, type: 'bandpass', q: 1.6 }); for (let i = 0; i < 7; i++) noise(t + 0.05 + i * 0.035, 0.015, { vol: 0.05, from: 3000 + i * 250, to: 2500, type: 'bandpass', q: 4 }); },
    plop(t) { osc(t, 0.13, 620, 'sine', env(t, 0.13, 0.32, 0.003, sfx), 190); noise(t, 0.2, { vol: 0.14, from: 2600, to: 400 }); osc(t + 0.07, 0.07, 900, 'sine', env(t + 0.07, 0.07, 0.12, 0.003, sfx), 1500); },
    nibble(t) { osc(t, 0.05, 1050, 'sine', env(t, 0.05, 0.16, 0.002, sfx)); noise(t, 0.02, { vol: 0.08, from: 5000, to: 3000, type: 'highpass' }); },
    bite(t) { osc(t, 0.16, 520, 'sine', env(t, 0.16, 0.34, 0.003, sfx), 170); box(t + 0.02, 91, 0.5, sfx); box(t + 0.11, 96, 0.5, sfx); },
    hook(t, perfect) { noise(t, 0.1, { vol: 0.3, from: 7000, to: 1800, type: 'highpass' }); ep(t, 76, 0.3, 0.5, sfx); ep(t + 0.06, 83, 0.4, 0.5, sfx); if (perfect) [88, 91, 95].forEach((m, i) => box(t + 0.12 + i * 0.06, m, 0.5, sfx)); },
    reel(t, tension) { noise(t, 0.022, { vol: 0.09, from: 2600 + tension * 1800, to: 2000, type: 'bandpass', q: 5 }); osc(t, 0.02, 180 + tension * 90, 'square', env(t, 0.02, 0.03, 0.001, sfx)); },
    surge(t) { const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420; lp.connect(env(t, 0.5, 0.3, 0.03, sfx)); osc(t, 0.5, 120, 'sawtooth', lp, 62); noise(t, 0.45, { vol: 0.22, from: 1400, to: 250 }); },
    splash(t) { noise(t, 0.55, { vol: 0.36, from: 3600, to: 300 }); osc(t, 0.3, 95, 'sine', env(t, 0.3, 0.3, 0.004, sfx), 48); },
    snap(t) { noise(t, 0.06, { vol: 0.5, from: 8000, to: 2500, type: 'highpass' }); osc(t, 0.35, 880, 'sawtooth', env(t, 0.35, 0.2, 0.002, sfx), 160); S.lost(t + 0.3); },
    lost(t) { ep(t, 67, 0.3, 0.42, sfx); ep(t + 0.2, 63, 0.4, 0.42, sfx); ep(t + 0.42, 58, 0.8, 0.42, sfx); },
    // 구구구구…: 낮은 울림이 점점 빨라지고 커진다
    riser(t, dur = 1.2) {
      let x = 0, gap = 0.2;
      while (x < dur) { const k = x / dur; osc(t + x, 0.11, 52 + k * 26, 'sine', env(t + x, 0.11, 0.2 + k * 0.5, 0.004, sfx), 40); x += gap; gap = Math.max(0.045, gap * 0.9); }
      noise(t, dur, { vol: 0.34, from: 90, to: 900, attack: dur * 0.9 });
      osc(t, dur, 38, 'sine', env(t, dur, 0.4, dur * 0.85, sfx), 78);
    },
    breachOut(t, size = 1) { noise(t, 1.0 + size * 0.4, { vol: 0.55, from: 6500, to: 180 }); osc(t, 0.7, 72, 'sine', env(t, 0.7, 0.6, 0.004, sfx), 30); noise(t + 0.25, 1.4, { vol: 0.16, from: 5000, to: 1500, type: 'highpass', attack: 0.2 }); },
    breachIn(t, size = 1) { noise(t, 0.9 + size * 0.3, { vol: 0.5, from: 4200, to: 160 }); osc(t, 0.5, 80, 'sine', env(t, 0.5, 0.5, 0.004, sfx), 34); },
    swish(t) { noise(t, 0.6, { vol: 0.2, from: 3400, to: 480, type: 'bandpass', q: 1.2, attack: 0.12 }); },
    // 뿅!
    pop(t) { osc(t, 0.1, 380, 'square', env(t, 0.1, 0.26, 0.002, sfx), 1500); chip(t + 0.09, 93, 0.12, 0.2, 'triangle'); },
    fanfare(t, gi = 0) {
      const seq = FAN[clamp(gi, 0, 5)], beat = [0.1, 0.1, 0.095, 0.095, 0.1, 0.105][gi], base = 72 + (gi >= 4 ? 2 : 0);
      let x = t;
      seq.forEach(([n, len], i) => {
        const d = len * beat, last = i === seq.length - 1, hold = last ? d * (1.6 + gi * 0.3) : d * 0.92;
        chip(x, base + n, hold, 0.2);
        if (gi >= 2) chip(x, base + n - (last ? 5 : 8), hold, 0.1);                 // 화음
        if (gi >= 3) chip(x, base + n - 24, hold, 0.13, 'triangle');               // 낮은 음
        if (gi >= 4 && (i % 2 === 0 || last)) noise(x, 0.06, { vol: 0.16, from: 7000, to: 3000, type: 'highpass' });   // 북
        if (last && gi >= 1) [0, 4, 7, 12, 16, 19].slice(0, 2 + gi).forEach((a, k) => box(x + 0.05 + k * 0.05, base + n + a, 0.34, sfx));   // 반짝임
        x += d;
      });
      if (gi >= 5) for (let k = 0; k < 14; k++) box(x + 0.1 + k * 0.07, base + 24 + [0, 4, 7, 12][k % 4] + (k > 7 ? 12 : 0), 0.24, sfx);
    },
    card(t) { noise(t, 0.16, { vol: 0.1, from: 2600, to: 5200, type: 'bandpass', q: 1.2, attack: 0.05 }); box(t + 0.05, 84, 0.3, sfx); box(t + 0.12, 91, 0.3, sfx); },
    tick(t) { osc(t, 0.02, 1500, 'square', env(t, 0.02, 0.04, 0.001, sfx)); },
    stamp(t) { osc(t, 0.22, 130, 'sine', env(t, 0.22, 0.5, 0.002, sfx), 55); noise(t, 0.1, { vol: 0.3, from: 2400, to: 300 }); box(t + 0.05, 96, 0.4, sfx); },
    coin(t, n = 5) { for (let i = 0; i < Math.min(n, 12); i++) { const x = t + i * 0.05, m = [96, 100, 103][i % 3]; box(x, m, 0.3, sfx); osc(x, 0.05, mtof(m) * 2.76, 'sine', env(x, 0.05, 0.05, 0.001, sfx)); } },
    // 어창에 싣는 소리: 나무 상자에 툭
    stow(t) { osc(t, 0.14, 150, 'sine', env(t, 0.14, 0.4, 0.003, sfx), 80); noise(t, 0.05, { vol: 0.2, from: 1800, to: 500 }); box(t + 0.08, 79, 0.25, sfx); },
    // 항구·가게
    door(t) { box(t, 91, 0.5, sfx); box(t + 0.09, 96, 0.45, sfx); box(t + 0.2, 91, 0.25, sfx); },
    paper(t) { noise(t, 0.2, { vol: 0.12, from: 2000, to: 5500, type: 'bandpass', q: 1, attack: 0.08 }); },
    buy(t) { noise(t, 0.03, { vol: 0.16, from: 6000, to: 3000, type: 'highpass' }); box(t + 0.01, 88, 0.42, sfx); box(t + 0.08, 95, 0.46, sfx); osc(t + 0.08, 0.06, mtof(95) * 2.76, 'sine', env(t + 0.08, 0.06, 0.06, 0.001, sfx)); },
    deny(t) { osc(t, 0.09, 170, 'triangle', env(t, 0.09, 0.26, 0.003, sfx), 140); osc(t + 0.11, 0.12, 140, 'triangle', env(t + 0.11, 0.12, 0.26, 0.003, sfx), 110); },
    townup(t) { [67, 71, 74, 79, 83, 86, 91].forEach((m, i) => { ep(t + i * 0.08, m, 0.5, 0.42, sfx); box(t + i * 0.08 + 0.02, m + 12, 0.3, sfx); }); [67, 74, 79, 83].forEach((m) => ep(t + 0.62, m, 1.6, 0.3, sfx)); noise(t + 0.6, 1.2, { vol: 0.07, from: 6000, to: 9000, type: 'highpass', attack: 0.3 }); },
    tap(t) { osc(t, 0.03, 720, 'sine', env(t, 0.03, 0.14, 0.002, sfx)); },
    travel(t) { noise(t, 0.7, { vol: 0.14, from: 500, to: 2600, type: 'bandpass', q: 0.8, attack: 0.3 }); ep(t + 0.3, 55, 0.9, 0.3, sfx); },
    gull(t, r) { const f = 1900 + r * 500; for (let i = 0; i < 2 + Math.floor(r * 2); i++) { const x = t + i * 0.24; osc(x, 0.24, f, 'sine', env(x, 0.24, 0.022, 0.06, amb), f * 0.74); } },
    memory(t) { [67, 72, 76].forEach((m, i) => box(t + 0.5 + i * 0.5, m + 12, 0.34, amb)); },                    // 기억이 떠오른다: 오르골 세 음
    oldsong(t) { let x = 0; for (const [n, len] of OLD_SONG) { box(t + 0.6 + x * 0.55, 60 + n + 12, 0.4, amb); x += len; } },   // 오르골: 옛 노래가 처음으로 끝까지
    bell(t) { [72, 79].forEach((m) => { osc(t, 2.6, mtof(m), 'sine', env(t, 2.6, 0.09, 0.004, amb)); osc(t, 1.2, mtof(m) * 2.4, 'sine', env(t, 1.2, 0.03, 0.004, amb)); }); },
  };

  // ── 음악: 한 박씩 미리 적어 둔다 ──
  const st = { scene: 'sea', phase: 'day', fight: 0, region: 1, town: 1, quiet: false };
  let beatN = 0, barN = 0, nextT = 0, song = SONGS.day, songId = 'day', shift = 0;
  const rand = rng(20261111);
  let melDeg = 2, lastBeat = 0, variant = 0, wasFight = false, R = REGION_MUS[1];
  function scheduleBeat(t) {
    const b = beatN % song.beats;
    if (b === 0) {                                          // 마디가 바뀔 때 곡을 고른다
      const want = st.scene === 'harbor' ? 'harbor' : st.phase;
      const own = st.scene === 'harbor' ? null : (REGION_MUS[st.region] || {}).own;      // 그 해역만의 곡이 있으면 그것을 (태초의 바다)
      const base = (own && own[want]) || SONGS[want] || SONGS.day, id = (own ? 'own_' : '') + want;
      if (id !== songId) { songId = id; song = base; variant = 0; barN = 0; }
      else if (base.alts && barN > 0 && barN % 16 === 0) {            // 다른 곡으로 (방금 것은 빼고 고른다)
        let v = Math.floor(rand() * (base.alts.length + 1)); if (v === variant) v = (v + 1) % (base.alts.length + 1);
        variant = v; song = v === 0 ? base : { ...base, ...base.alts[v - 1], theme: null };
      }
      shift = st.scene === 'harbor' ? 0 : REGION_SHIFT[st.region] || 0;
      // 그 해역의 성격을 곡에 입힌다 (항구는 그대로)
      R = st.scene === 'harbor' ? REGION_MUS[1] : REGION_MUS[st.region] || REGION_MUS[1];
      const src = variant === 0 ? base : { ...base, ...base.alts[variant - 1], theme: null };
      song = { ...src, bpm: src.bpm * R.tempo, dens: src.dens * R.dens, mel: src.mel * R.mel, lead: R.lead || src.lead, scale: R.minor ? MINOR_SCALE : R.scale || src.scale,
        low: src.low || R.low, prog: R.minor ? MINOR_PROGS[variant % MINOR_PROGS.length] : src.prog, theme: R.minor || R.scale ? null : src.theme, oct: (src.oct || 0) + (R.high ? 12 : 0) };
    }
    const soft = R.gentle && !song.waltz ? st.fight : 0;     // 태초의 바다: 줄다리기 중에도 곡이 바뀌지 않는다. 조금 빨라지고 여린 맥박만 얹힌다
    const fi = song.waltz || R.gentle ? 0 : st.fight;        // 줄다리기의 긴박함 0~1
    const hot = fi > 0.12;                                   // 줄다리기 중
    const beatDur = hot ? 60 / (118 + 46 * fi) : 60 / (song.bpm * (1 + 0.22 * soft));   // 줄다리기는 곡의 빠르기와 상관없이 빠르게 몰아친다
    // 줄다리기 중에는 어두운 화음 진행으로 바뀐다 (라단조풍: vi – IV – V – V)
    const [rootOff, kind] = hot ? [[9, 'min'], [5, 'maj'], [7, 'maj'], [7, 'sus4']][barN % 4] : song.prog[barN % song.prog.length];
    const root = song.key + shift + rootOff, tones = CH[kind];
    if (hot && !wasFight) crash(t, 0.22);                    // 걸리는 순간 심벌
    wasFight = hot;
    const low = song.low ? -12 : 0;
    if (b === 0) {
      const rich = song.waltz ? clamp((st.town - 1) / 7, 0, 1) : 1;
      if (!song.waltz || rich > 0.25) pad(t, [root - 12, ...tones.slice(0, 3).map((x) => root + x)], beatDur * song.beats, 0.05 * (song.waltz ? rich : 1), song.pad);
      bass(t, root - 24 + (root - 24 < 31 ? 12 : 0), beatDur * (song.waltz ? 1 : 2), song.waltz ? 0.3 : 0.2);
    }
    if (hot) { /* 잔잔한 반주는 쉰다 */ } else if (song.waltz) {                                         // 항구: 쿵 짝 짝
      if (b > 0) tones.slice(0, 3).forEach((x) => ep(t, root + x, beatDur * 0.5, 0.17));
    } else {
      for (let h = 0; h < 2; h++) {                           // 화음을 풀어 치는 반주
        if (rand() > song.dens) continue;
        const i = (beatN * 2 + h) % 6, idx = [0, 1, 2, 3, 2, 1][i];
        ep(t + h * beatDur / 2 + (rand() - 0.5) * 0.012, root + tones[idx] + low, beatDur, 0.2 + rand() * 0.1);
      }
    }
    // 가락: 8마디는 주제 가락, 다음 8마디는 음계 안에서 한두 칸씩 움직이는 자유로운 가락. (줄다리기 중에는 주제를 쉰다)
    const themed = song.theme && Math.floor(barN / 8) % 2 === 0 && !hot;
    if (themed && b === 0) {
      for (const [x, n, len] of song.theme[barN % 8]) {
        const m = song.key + shift + n + (song.oct || 0) + low, at = t + x * beatDur;
        if (song.lead === 'box') box(at, m + 12, 0.62); else ep(at, m, len * beatDur, 0.46);
      }
    }
    const restBar = barN % 4 === 3 && b > 0;
    if (!hot && !themed && !restBar && rand() < song.mel * (b === 0 ? 1.4 : 1)) {
      melDeg = clamp(melDeg + Math.round((rand() - 0.5) * 3.4), 0, song.scale.length * 2 - 1);
      const oct = Math.floor(melDeg / song.scale.length), m = song.key + shift + 12 + oct * 12 + song.scale[melDeg % song.scale.length] + low;
      const at = t + (rand() < 0.3 ? beatDur / 2 : 0);
      if (song.lead === 'box') box(at, m + 12, 0.5 + rand() * 0.15); else ep(at, m, beatDur * 1.5, 0.34 + rand() * 0.1);
    }
    // 줄다리기: 달리는 낮은 음, 북, 끊어 치는 화음. 장력이 오를수록 층이 늘고 세진다.
    if (hot) {
      const lowRoot = root - 24 + (root - 24 < 31 ? 12 : 0), v = 0.55 + 0.45 * fi;
      for (let h = 0; h < 4; h++) bass(t + h * beatDur / 4, lowRoot + (h === 2 ? 12 : h === 3 ? 7 : 0), beatDur * 0.22, 0.3 * v);   // 16분음표로 달린다
      kick(t, 0.6 * v);
      if (b % 2 === 1) snare(t, 0.2 * v);
      for (let h = 0; h < 2; h++) hat(t + h * beatDur / 2, 0.045 * v);
      // 끊어 치는 화음: 쿵 . 짝짝 . 짝 . 짝 (엇박)
      const pat = [[0, 1], [0.5, 0], [0.75, 1], [0.25, 0]][b % 4];
      stab(t + pat[0] * beatDur, [root - 12, root - 12 + tones[1], root - 12 + tones[2]], beatDur * 0.3, (0.1 + pat[1] * 0.05) * v);
      if (fi > 0.5) { taiko(t + beatDur / 2, 0.36 * fi); for (let h = 0; h < 4; h++) hat(t + h * beatDur / 4, 0.03 * fi); }
      if (fi > 0.5 && b === song.beats - 1) { taiko(t + beatDur * 0.5, 0.4 * fi); taiko(t + beatDur * 0.75, 0.46 * fi); }           // 마디 끝 북 몰아치기
      // 장력이 높으면 높은 음이 다급하게 오르내린다
      if (fi > 0.7) for (let h = 0; h < 4; h++) chip(t + h * beatDur / 4, root + 12 + tones[(beatN * 4 + h) % 3], beatDur * 0.2, 0.035 * fi, 'triangle');
    }
    if (soft > 0.12) {                                       // 여린 맥박: 박마다 낮은 음, 엇박에 화음 한 번 (북·심벌 없이)
      bass(t, root - 24 + (root - 24 < 31 ? 12 : 0), beatDur * 0.8, 0.1 + 0.08 * soft);
      if (b % 2 === 1) ep(t + beatDur / 2, root + tones[1], beatDur * 0.5, 0.1 + 0.06 * soft);
    }
    // ── 해역의 빛깔 (줄다리기 중에는 쉰다) ──
    if (!hot && !song.waltz) {
      if (R.drone && b === 0) pad(t, [root - 24 + (root - 24 < 31 ? 12 : 0), root - 17 + (root - 24 < 31 ? 12 : 0)], beatDur * song.beats, R.drone, 320);   // 깔리는 낮은 음
      if (R.sway && b % 2 === 1) ep(t + beatDur / 2, root + tones[2] + 12, beatDur * 0.4, 0.12);                           // 살랑이는 엇박
      if (R.pulse && b === 0 && barN % R.pulse === 0) taiko(t, 0.1);                                                      // 먼 곳의 여린 북
      if (R.bell && b === 0 && rand() < R.bell) box(t + beatDur * (1 + rand()), root + 19, 0.22);                         // 안개 너머 종소리
      if (R.arp && barN % 4 === 2) box(t + beatDur / 2, root + tones[b % 3] + 24, 0.2);                                   // 반짝이며 오르는 가락
      // 옛 노래: 16마디에 한 번, 주제 가락이 쉬는 사이에 오르골이 아주 여리게. 멀리 갈수록 한 음씩 더 이어진다.
      if (b === 0 && barN % 16 === 12) {
        let x = 0;
        for (const [n, len] of OLD_SONG.slice(0, R.old)) {
          const nn = R.minor ? OLD_MINOR[n] ?? n : n;
          box(t + x * beatDur, song.key + shift + nn + 12, 0.26);
          x += len;
        }
      }
    }
    // 환경음: 갈매기(밤에는 없다), 항구의 종
    if (b === 0 && !hot && st.phase !== 'night' && rand() < (st.scene === 'harbor' ? 0.14 : 0.07)) S.gull(t + rand() * 2, rand());
    if (b === 0 && st.scene === 'harbor' && barN % 8 === 5) S.bell(t + beatDur);
    lastBeat = beatDur;
    beatN++; if (beatN % song.beats === 0) barN++;
    return beatDur;
  }

  const ramp = (p, v, tc = 0.25) => p.setTargetAtTime(v, ctx.currentTime, tc);
  let heartAt = 0;
  return {
    ctx, S,
    // 게임의 지금 상태에 맞춘다: 장면, 시간대, 해역, 마을 등급, 줄다리기 세기(0~1), 줄 장력, 낚는 순간인가
    set({ scene = 'sea', phase = 'day', region = 1, town = 1, fight = 0, tension = 0, catching = 0, rough = 0 } = {}) {
      st.scene = scene; st.phase = phase; st.region = region; st.town = town;
      st.fight += (fight - st.fight) * 0.08;
      const harbor = scene === 'harbor';
      ramp(sea.g.gain, (harbor ? 0.25 : 0.45) + rough * 0.3, 0.8);
      ramp(washLevel.gain, (harbor ? 0.22 : 0.5) * (phase === 'night' ? 0.75 : 1) + rough * 0.35, 0.8);
      ramp(crowd.g.gain, harbor && phase !== 'night' ? 0.3 : 0, 0.8);
      ramp(duck.gain, catching === 2 ? 0.0001 : catching === 1 ? 0.22 : 1, catching ? 0.12 : 0.6);   // 솟아오를 때 줄고, 뿅 직전에 정적
      const danger = clamp((tension - 0.72) / 0.28, 0, 1);
      ramp(whine.g.gain, danger * 0.05, 0.1); ramp(whine.o.frequency, 1900 + danger * 900, 0.1);
      // 장력이 위험하면 심장이 뛴다 (쿵-쿵, 점점 빨리)
      if (danger > 0.05 && ctx.currentTime >= heartAt) {
        const t = ctx.currentTime + 0.02;
        kick(t, 0.5 * danger, sfx); kick(t + 0.16, 0.36 * danger, sfx);
        heartAt = t + 0.9 - danger * 0.45;
      }
    },
    // 지금부터 until 초까지의 음악을 적어 둔다 (실시간: 조금씩 앞서서, 파일로 만들 때: 처음부터 끝까지)
    schedule(until) { scheduleWaves(until + 2); if (st.mute) return; if (nextT < ctx.currentTime) nextT = ctx.currentTime + 0.05; while (nextT < until) nextT += scheduleBeat(nextT); },
    muteMusic(on) { st.mute = on; },
    play(name, arg, at = ctx.currentTime + 0.01) { if (S[name]) S[name](at, arg); },
    volume(v) { ramp(master.gain, v, 0.05); },
    setFight(v) { st.fight = v; },
  };
}

// ── 게임에서 쓰는 쪽 ──
const SOUND_KEY = 'hori-sound';
let eng = null, enabled = (() => { try { return localStorage.getItem(SOUND_KEY) !== 'off'; } catch { return true; } })(), timer = null, reelAt = 0;      // 소리 켬/끔은 기기에 저장된다
export function initAudio() {
  if (eng) { if (eng.ctx.state === 'suspended') eng.ctx.resume(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  eng = createEngine(new AC());
  eng.volume(enabled ? 0.9 * vol : 0);
  eng.schedule(eng.ctx.currentTime + 0.4);
  timer = setInterval(() => { if (eng.ctx.state === 'running') eng.schedule(eng.ctx.currentTime + 0.4); }, 80);
  document.addEventListener('visibilitychange', () => { if (!eng) return; if (document.hidden) eng.ctx.suspend(); else if (enabled) eng.ctx.resume(); });
}
// 소리 크기를 단계로 고른다 (100% → 70% → 40% → 끔). 설정 판에서 바꾼다.
const VOL_KEY = 'hori-volume', VOLS = [1, 0.7, 0.4];
let vol = (() => { try { const v = +localStorage.getItem(VOL_KEY); return VOLS.includes(v) ? v : 1; } catch { return 1; } })();
export function nextVolume() {
  if (!enabled) { vol = VOLS[0]; setSound(true); } else { const i = VOLS.indexOf(vol); if (i === VOLS.length - 1) setSound(false); else { vol = VOLS[i + 1]; setSound(true); } }
  try { localStorage.setItem(VOL_KEY, String(vol)); } catch { /* 저장이 막힌 환경 */ }
}
export const soundName = () => (!enabled ? '소리 끔' : `소리 ${Math.round(vol * 100)}%`);
export function setSound(on) { enabled = on; if (eng) eng.volume(on ? 0.9 * vol : 0); try { localStorage.setItem(SOUND_KEY, on ? 'on' : 'off'); } catch { /* 저장이 막힌 환경 */ } }
export const soundOn = () => enabled;
export function playSfx(name, arg) { if (eng && enabled) eng.play(name, arg); }
export function setScene(state) { if (eng) eng.set(state); }
// 릴 감는 소리: 감는 동안 딸깍딸깍, 장력이 높을수록 높고 빠르게
export function reel(active, tension = 0) {
  if (!eng || !enabled || !active) return;
  const now = eng.ctx.currentTime;
  if (now < reelAt) return;
  reelAt = now + 0.075 - tension * 0.03;
  eng.play('reel', tension);
}

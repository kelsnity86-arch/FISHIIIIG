// 소리 (전부 웹 오디오로 합성 — 음원 파일 없음).
// 게임 로직은 g.sfx 에 이벤트 이름만 쌓고, main.js 가 매 프레임 여기로 넘긴다.

let ctx = null, master = null, musicGain = null, sfxGain = null;
let enabled = true, reelNode = null, musicTimer = null;

// 첫 터치 때 호출 (브라우저는 사용자 동작 뒤에만 소리를 허용한다)
export function initAudio() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  master = ctx.createGain(); master.gain.value = enabled ? 0.9 : 0; master.connect(ctx.destination);
  sfxGain = ctx.createGain(); sfxGain.gain.value = 0.8; sfxGain.connect(master);
  musicGain = ctx.createGain(); musicGain.gain.value = 0.22; musicGain.connect(master);
  startMusic();
}

export function setSound(on) {
  enabled = on;
  if (master) master.gain.setTargetAtTime(on ? 0.9 : 0, ctx.currentTime, 0.05);
}
export const soundOn = () => enabled;

// ── 기본 악기 ──
function tone(freq, dur, { type = 'sine', vol = 0.3, at = 0, slide = 0, attack = 0.005, out = sfxGain } = {}) {
  const t = ctx.currentTime + at;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq * slide), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(out); o.start(t); o.stop(t + dur + 0.02);
}

let noiseBuf = null;
function noise(dur, { vol = 0.3, at = 0, from = 4000, to = 400, q = 0.8, type = 'lowpass' } = {}) {
  if (!noiseBuf) {
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const t = ctx.currentTime + at;
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = noiseBuf; s.loop = true;
  f.type = type; f.Q.value = q;
  f.frequency.setValueAtTime(from, t); f.frequency.exponentialRampToValueAtTime(Math.max(40, to), t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f); f.connect(g); g.connect(sfxGain); s.start(t); s.stop(t + dur + 0.02);
}

const N = (semi) => 261.63 * Math.pow(2, semi / 12);   // C4 기준 반음

// ── 효과음 ──
const SFX = {
  cast() { noise(0.35, { vol: 0.25, from: 600, to: 5000, type: 'bandpass', q: 1.5 }); },
  plop() { tone(520, 0.16, { slide: 0.35, vol: 0.35 }); noise(0.18, { vol: 0.15, from: 2500, to: 500 }); },
  nibble() { tone(880, 0.06, { type: 'triangle', vol: 0.18 }); },
  bite() { tone(660, 0.09, { type: 'square', vol: 0.16 }); tone(990, 0.14, { type: 'square', vol: 0.16, at: 0.08 }); },
  hook(perfect) {
    noise(0.12, { vol: 0.3, from: 6000, to: 1500 });
    tone(N(7), 0.12, { type: 'square', vol: 0.18 }); tone(N(12), 0.2, { type: 'square', vol: 0.18, at: 0.07 });
    if (perfect) { tone(N(16), 0.25, { type: 'triangle', vol: 0.25, at: 0.14 }); tone(N(19), 0.35, { type: 'triangle', vol: 0.25, at: 0.21 }); }
  },
  surge() { tone(180, 0.3, { type: 'sawtooth', vol: 0.2, slide: 0.6 }); noise(0.3, { vol: 0.2, from: 1200, to: 300 }); },
  splash() { noise(0.5, { vol: 0.4, from: 3500, to: 300 }); tone(90, 0.3, { vol: 0.35, slide: 0.5 }); },
  snap() { noise(0.08, { vol: 0.5, from: 8000, to: 2000 }); tone(700, 0.4, { type: 'sawtooth', vol: 0.25, slide: 0.15 }); },
  lost() { tone(N(4), 0.18, { type: 'triangle', vol: 0.22 }); tone(N(0), 0.3, { type: 'triangle', vol: 0.22, at: 0.16 }); },
  // 수면을 뚫는 순간: 크기에 비례하는 쿵 + 물소리
  swish() { noise(0.55, { vol: 0.22, from: 3200, to: 500, type: 'bandpass', q: 1.2 }); },
  pop() { tone(420, 0.16, { type: 'square', vol: 0.3, slide: 3.2 }); tone(1680, 0.1, { type: 'triangle', vol: 0.22, at: 0.1 }); },
  breachOut(size = 1) {
    tone(70, 0.6 + size * 0.2, { vol: 0.6, slide: 0.4 });
    noise(0.9 + size * 0.4, { vol: 0.5, from: 5000, to: 200 });
  },
  breachIn(size = 1) {
    tone(55, 0.8 + size * 0.3, { vol: 0.65, slide: 0.5 });
    noise(1.2 + size * 0.5, { vol: 0.55, from: 3000, to: 150 });
  },
  // 슬로모션 동안 올라가는 음 (기대감)
  riser(dur = 1.2) {
    tone(N(-12), dur, { type: 'sawtooth', vol: 0.12, slide: 4, attack: dur * 0.6 });
    tone(N(-5), dur, { type: 'triangle', vol: 0.14, slide: 4, attack: dur * 0.6 });
    noise(dur, { vol: 0.12, from: 300, to: 7000, type: 'bandpass', q: 2 });
  },
  // "낚았다!" 팡파르: 등급이 높을수록 음이 많고 화음이 두껍다 (0 일반 ~ 5 환상)
  fanfare(gi = 0) {
    const lines = [
      [0, 4, 7],
      [0, 4, 7, 12],
      [0, 4, 7, 12, 16],
      [0, 4, 7, 12, 16, 19],
      [0, 4, 7, 12, 16, 19, 24],
      [0, 4, 7, 11, 14, 19, 23, 26, 31],
    ][gi];
    const step = gi >= 4 ? 0.085 : 0.075;
    lines.forEach((n, i) => {
      tone(N(n), 0.22, { type: 'square', vol: 0.14, at: i * step });
      if (gi >= 2) tone(N(n + 12), 0.2, { type: 'triangle', vol: 0.1, at: i * step });
    });
    const end = lines.length * step, top = lines[lines.length - 1];
    const chord = gi >= 5 ? [top - 12, top - 8, top - 5, top] : [top - 12, top - 8, top - 5];
    const hold = 0.5 + gi * 0.22;
    chord.forEach((n) => {
      tone(N(n), hold, { type: 'square', vol: 0.1, at: end });
      tone(N(n), hold, { type: 'triangle', vol: 0.14, at: end });
    });
    if (gi >= 3) tone(N(top - 24), hold, { type: 'sawtooth', vol: 0.1, at: end });
    if (gi >= 4) for (let i = 0; i < 6 + gi * 2; i++) tone(N(top + [0, 4, 7, 12][i % 4]), 0.12, { type: 'triangle', vol: 0.08, at: end + 0.1 + i * 0.07 });
  },
  card() { tone(N(12), 0.08, { type: 'triangle', vol: 0.15 }); tone(N(19), 0.12, { type: 'triangle', vol: 0.15, at: 0.06 }); },
  tick() { tone(1400, 0.025, { type: 'square', vol: 0.05 }); },
  stamp() { tone(110, 0.25, { vol: 0.5, slide: 0.5 }); noise(0.12, { vol: 0.35, from: 2000, to: 300 }); tone(N(24), 0.3, { type: 'triangle', vol: 0.18, at: 0.05 }); },
  coin(n = 5) { for (let i = 0; i < Math.min(n, 10); i++) { tone(N(24 + (i % 2) * 5), 0.09, { type: 'square', vol: 0.09, at: i * 0.055 }); } },
};

export function playSfx(name, arg) {
  if (!ctx || !SFX[name]) return;
  SFX[name](arg);
}

// 릴 감는 소리: 누르고 있는 동안 딸깍딸깍. 장력이 높을수록 빠르고 높게.
let reelNext = 0;
export function reel(active, tension = 0) {
  if (!ctx || !active) return;
  if (ctx.currentTime < reelNext) return;
  reelNext = ctx.currentTime + 0.085 - Math.min(0.05, tension * 0.05);
  tone(900 + tension * 900, 0.03, { type: 'square', vol: 0.06 });
}

// ── BGM: 햇살 연안 테마 (잔잔한 칩튠 반복). 해역별 테마는 해역 작업 때 추가. ──
function startMusic() {
  const chords = [[0, 4, 7], [-3, 0, 4], [-7, -3, 0], [-5, -1, 2]];        // C  Am  F  G
  const melody = [12, null, 16, 14, 12, null, 9, null, 12, 14, 16, null, 19, 16, 14, null,
                  17, null, 16, 14, 12, null, 9, null, 7, 9, 12, null, 14, null, null, null];
  const beat = 0.34;
  let step = 0, next = ctx.currentTime + 0.3;
  const schedule = () => {
    while (next < ctx.currentTime + 0.6) {
      const at = next - ctx.currentTime;
      const chord = chords[Math.floor(step / 8) % chords.length];
      if (step % 8 === 0) tone(N(chord[0] - 12), beat * 7, { type: 'triangle', vol: 0.5, at, attack: 0.05, out: musicGain });
      tone(N(chord[step % 3]), beat * 1.6, { type: 'sine', vol: 0.3, at, attack: 0.02, out: musicGain });
      const m = melody[step % melody.length];
      if (m !== null) tone(N(m), beat * 1.4, { type: 'triangle', vol: 0.34, at, attack: 0.01, out: musicGain });
      next += beat; step++;
    }
  };
  schedule();
  musicTimer = setInterval(schedule, 200);
}

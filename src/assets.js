// 에셋 로더.
// assets/game/manifest.json 에 등록된 파일이 있으면 그 그림을 쓰고,
// 없으면 아래 임시 그림(코드로 그린 도형)을 쓴다. 게임 코드는 둘을 구분하지 않는다.
//
// 스프라이트 = { img, w, h, smooth }  (w, h 는 게임 좌표 크기)

const sprites = {};
const NAVY = '#1d2b4a';

function placeholder(w, h, draw, scale = 4) {
  const c = document.createElement('canvas');
  c.width = w * scale; c.height = h * scale;
  const g = c.getContext('2d');
  g.scale(scale, scale);
  g.lineJoin = 'round'; g.lineCap = 'round';
  draw(g, w, h);
  return { img: c, w, h, smooth: true };
}

function outline(g, fill, lw = 1) {
  g.fillStyle = fill; g.fill();
  g.strokeStyle = NAVY; g.lineWidth = lw; g.stroke();
}

function buildPlaceholders() {
  // 배: 수면선은 그림 높이의 70% 지점
  sprites.boat_1 = placeholder(32, 12, (g) => {
    g.beginPath();
    g.moveTo(1, 3); g.lineTo(31, 3); g.lineTo(28, 10); g.quadraticCurveTo(16, 12, 5, 10); g.closePath();
    outline(g, '#b9794a', 0.8);
    g.fillStyle = '#e0a56c'; g.fillRect(2.5, 3.4, 27, 1.6);
  });

  // 바다용 캐릭터 실루엣 (왼쪽을 봄)
  sprites.char_sea = placeholder(8, 9, (g) => {
    g.fillStyle = NAVY;
    g.beginPath(); g.arc(3.6, 2.4, 2.1, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.moveTo(2, 4.2); g.lineTo(6, 4.2); g.lineTo(7, 9); g.lineTo(1.5, 9); g.closePath(); g.fill();
    g.fillRect(0.6, 5, 2.4, 1.2); // 팔
  });

  // 낚싯대: 곧게, 끝이 왼쪽·손잡이가 오른쪽
  sprites.rod_1 = placeholder(36, 4, (g) => {
    g.beginPath();
    g.moveTo(0, 1.8); g.lineTo(36, 1.0); g.lineTo(36, 3.0); g.lineTo(0, 2.2); g.closePath();
    g.fillStyle = '#6b4226'; g.fill();
    g.fillStyle = NAVY; g.fillRect(29, 0.6, 7, 2.8);
    g.fillStyle = '#c9a15a'; g.fillRect(27, 2.6, 2.4, 1.4); // 릴
  });

  // 찌
  sprites.float_1 = placeholder(6, 12, (g) => {
    g.fillStyle = NAVY; g.fillRect(2.6, 0, 0.8, 3);
    g.beginPath(); g.ellipse(3, 6.5, 2.6, 4, 0, 0, Math.PI * 2);
    outline(g, '#fff8ee', 0.7);
    g.save(); g.beginPath(); g.rect(0, 0, 6, 6.2); g.clip();
    g.beginPath(); g.ellipse(3, 6.5, 2.6, 4, 0, 0, Math.PI * 2);
    outline(g, '#f08a8a', 0.7);
    g.restore();
  });

  // 수평선 풍경 (바닥이 수평선)
  sprites.bg_region1 = placeholder(640, 60, (g, w, h) => {
    const hill = (x, r, hgt, col) => {
      g.beginPath(); g.ellipse(x, h, r, hgt, 0, Math.PI, 0); g.fillStyle = col; g.fill();
    };
    hill(70, 80, 16, '#a9cf9a'); hill(170, 60, 12, '#8fc08c'); hill(250, 70, 14, '#a9cf9a');
    hill(560, 60, 10, '#8fc08c'); hill(620, 50, 12, '#a9cf9a');
    // 등대
    g.fillStyle = '#fbfbf5'; g.fillRect(166, h - 34, 9, 24);
    g.strokeStyle = NAVY; g.lineWidth = 0.8; g.strokeRect(166, h - 34, 9, 24);
    g.beginPath(); g.moveTo(164, h - 34); g.lineTo(170.5, h - 43); g.lineTo(177, h - 34); g.closePath();
    outline(g, '#e88a6a', 0.8);
    g.fillStyle = NAVY; g.fillRect(169, h - 28, 3, 4);
  }, 3);

  // 구름
  for (let i = 0; i < 3; i++) {
    sprites['cloud_' + (i + 1)] = placeholder(64, 24, (g) => {
      const blobs = [[14, 16, 9], [26, 11, 11], [40, 13, 10], [51, 17, 7], [32, 18, 12]];
      for (const pass of [['#f8c9c4', 1.5], ['#fff6e6', 0]]) {
        g.fillStyle = pass[0];
        for (const [x, y, r] of blobs) {
          g.beginPath(); g.ellipse(x + i * 1.5, y + pass[1], r * (1 - i * 0.12), r * 0.62, 0, 0, Math.PI * 2); g.fill();
        }
      }
    });
  }

  // 물고기 임시 체형 (왼쪽을 봄, 몸을 곧게 편 자세, 파란 계열 + 흰 배)
  const BODY = '#4f8fd0', BELLY = '#f2f7ff', FIN = '#3a70b0';
  sprites.fish_fish = placeholder(256, 128, (g) => {
    g.beginPath(); g.moveTo(196, 64); g.lineTo(250, 22); g.lineTo(238, 64); g.lineTo(250, 106); g.closePath();
    outline(g, FIN, 3);
    g.beginPath(); g.moveTo(90, 28); g.lineTo(150, 6); g.lineTo(160, 32); g.closePath(); outline(g, FIN, 3);
    g.beginPath(); g.ellipse(112, 64, 100, 42, 0, 0, Math.PI * 2); outline(g, BODY, 3);
    g.save(); g.beginPath(); g.rect(0, 72, 256, 60); g.clip();
    g.beginPath(); g.ellipse(112, 64, 97, 39, 0, 0, Math.PI * 2); g.fillStyle = BELLY; g.fill();
    g.restore();
    g.beginPath(); g.ellipse(120, 76, 20, 9, 0.5, 0, Math.PI * 2); outline(g, FIN, 2.5);
    g.fillStyle = '#fff'; g.beginPath(); g.arc(46, 54, 9, 0, Math.PI * 2); g.fill();
    g.fillStyle = NAVY; g.beginPath(); g.arc(44, 54, 5, 0, Math.PI * 2); g.fill();
  }, 2);

  sprites.fish_long = placeholder(384, 96, (g) => {
    g.beginPath();
    g.moveTo(8, 50); g.quadraticCurveTo(20, 18, 70, 22); g.lineTo(330, 34); g.lineTo(380, 20);
    g.lineTo(366, 48); g.lineTo(380, 78); g.lineTo(330, 62); g.lineTo(70, 78); g.quadraticCurveTo(20, 80, 8, 50);
    g.closePath(); outline(g, BODY, 3);
    g.save(); g.beginPath(); g.rect(0, 56, 340, 40); g.clip();
    g.beginPath(); g.moveTo(12, 52); g.lineTo(330, 52); g.lineTo(330, 60); g.lineTo(70, 75); g.quadraticCurveTo(24, 77, 12, 52);
    g.fillStyle = BELLY; g.fill(); g.restore();
    g.beginPath(); g.moveTo(70, 22);
    for (let x = 80; x <= 320; x += 20) { g.lineTo(x, 8 + (x / 20 % 2) * 6); }
    g.lineTo(330, 34); g.closePath(); outline(g, FIN, 2.5);
    g.fillStyle = '#fff'; g.beginPath(); g.arc(36, 42, 8, 0, Math.PI * 2); g.fill();
    g.fillStyle = NAVY; g.beginPath(); g.arc(34, 42, 4.5, 0, Math.PI * 2); g.fill();
  }, 2);

  sprites.fish_whale = placeholder(256, 128, (g) => {
    g.beginPath(); g.moveTo(206, 60); g.lineTo(252, 18); g.lineTo(240, 58); g.lineTo(254, 92); g.closePath();
    outline(g, FIN, 3);
    g.beginPath();
    g.moveTo(6, 70); g.quadraticCurveTo(6, 14, 96, 16); g.quadraticCurveTo(170, 20, 214, 56);
    g.quadraticCurveTo(170, 108, 90, 112); g.quadraticCurveTo(10, 114, 6, 70); g.closePath();
    outline(g, BODY, 3);
    g.save(); g.beginPath(); g.rect(0, 80, 256, 50); g.clip();
    g.beginPath(); g.moveTo(9, 72); g.lineTo(200, 72); g.quadraticCurveTo(170, 105, 90, 109);
    g.quadraticCurveTo(14, 111, 9, 72); g.fillStyle = BELLY; g.fill();
    g.strokeStyle = '#c9d6ea'; g.lineWidth = 2;
    for (let y = 88; y < 108; y += 7) { g.beginPath(); g.moveTo(20, y); g.lineTo(120, y); g.stroke(); }
    g.restore();
    g.beginPath(); g.ellipse(108, 96, 26, 9, 0.6, 0, Math.PI * 2); outline(g, FIN, 2.5);
    g.fillStyle = NAVY; g.beginPath(); g.arc(40, 66, 4.5, 0, Math.PI * 2); g.fill();
  }, 2);
}

// 생물 그림(fish_*, fantasy_*)은 수가 많아서 처음에 다 받지 않고, 낚일 생물이 정해질 때 받는다.
let manifest = {};
const pending = new Map();
const isCreature = (name) => name.startsWith('fish_') || name.startsWith('fantasy_');

function loadOne(name) {
  if (sprites[name] && !sprites[name].placeholder) return Promise.resolve();
  if (pending.has(name)) return pending.get(name);
  const info = manifest[name];
  if (!info) return Promise.resolve();
  const p = new Promise((done) => {
    const img = new Image();
    img.onload = () => { sprites[name] = { img, w: info.w, h: info.h, smooth: !!info.smooth }; done(); };
    img.onerror = () => done(); // 파일이 없으면 임시 그림 유지
    img.src = 'assets/game/' + info.file;
  });
  pending.set(name, p);
  return p;
}

export async function loadAssets() {
  buildPlaceholders();
  for (const k of Object.keys(sprites)) sprites[k].placeholder = true;
  try {
    const res = await fetch('assets/game/manifest.json', { cache: 'no-cache' });
    if (!res.ok) return;
    manifest = (await res.json()).sprites || {};
    await Promise.all(Object.keys(manifest).filter((n) => !isCreature(n)).map(loadOne));
  } catch { /* manifest 가 없으면 전부 임시 그림 */ }
}

// 생물 그림 미리 받기 (평소·놀람 둘 다). 그림자가 다가오는 동안 받아 둔다.
export function preloadCreature(name) {
  return Promise.all([loadOne(name), loadOne(name + '_s')]);
}

const EMPTY = (() => { const c = document.createElement('canvas'); c.width = c.height = 1; return { img: c, w: 16, h: 16, smooth: true }; })();
export function sprite(name) { return sprites[name] || EMPTY; }
export function hasSprite(name) { return !!sprites[name]; }

// 생물 그림. surprised=true 면 놀란 표정(<이름>_s). 그림이 없으면 임시 체형.
export function creatureSprite(name, surprised = false) {
  return (surprised && sprites[name + '_s']) || sprites[name] || sprites.fish_fish;
}

// 물속 그림자 (모든 생물 공통 그림 1장). 없으면 임시 체형에서 실루엣을 만든다.
let shadowFallback = null;
export function shadowSprite() {
  if (sprites.shadow) return sprites.shadow;
  if (!shadowFallback) {
    const base = sprites.fish_fish;
    const c = document.createElement('canvas');
    c.width = base.img.width; c.height = base.img.height;
    const g = c.getContext('2d');
    g.drawImage(base.img, 0, 0);
    g.globalCompositeOperation = 'source-in';
    g.fillStyle = '#12284a'; g.fillRect(0, 0, c.width, c.height);
    shadowFallback = { img: c, w: base.w, h: base.h, smooth: true };
  }
  return shadowFallback;
}

// 그림에 색을 입힌 사본 (게이지 채움, 등급 리본 등). 모양·명암은 원본 그림 그대로.
const tintCache = new Map();
export function tinted(name, color, strength = 0.75) {
  const key = name + color + strength;
  let v = tintCache.get(key);
  if (v) return v;
  const base = sprite(name);
  const c = document.createElement('canvas');
  c.width = base.img.width; c.height = base.img.height;
  const g = c.getContext('2d');
  g.drawImage(base.img, 0, 0);
  g.globalCompositeOperation = 'source-atop';
  g.globalAlpha = strength; g.fillStyle = color; g.fillRect(0, 0, c.width, c.height);
  v = { img: c, w: base.w, h: base.h, smooth: base.smooth };
  tintCache.set(key, v);
  return v;
}

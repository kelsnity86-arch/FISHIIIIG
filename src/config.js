// 화면·배치·타이밍 상수. 수치 조정은 여기서만 한다.

export const W = 640;
export const H = 360;

export const HORIZON = 150;          // 수평선 y
export const BOAT_X = W * 0.62;      // 배 위치 (고정)
export const BOAT_Y = 236;           // 배가 떠 있는 수면 y
export const LANE_Y = 250;           // 찌·물고기가 있는 수면 y (배보다 살짝 앞쪽)
export const CAST_NEAR = W * 0.35;   // 약하게 던졌을 때 찌 위치
export const CAST_FAR = W * 0.20;    // 세게 던졌을 때 찌 위치
export const ROD_LEN = 36;
export const Z_SQUASH = 0.35;         // 수면을 비스듬히 보는 각도 (그림자 평면의 세로 압축)

// 파이팅 중 물고기 동작: 등급별로 쓸 수 있는 동작 (기획서 §3)
export const FIGHT_MODES = {
  common:    ['hold', 'run'],
  uncommon:  ['hold', 'run', 'dive'],
  rare:      ['hold', 'run', 'dive', 'circle'],
  epic:      ['hold', 'run', 'dive', 'circle', 'slap'],
  legendary: ['hold', 'run', 'dive', 'circle', 'slap'],
  fantasy:   ['hold', 'run', 'dive', 'circle', 'slap'],
};
export const SURGE_MODES = ['run', 'dive', 'slap'];   // 날뛰는 동작: 계속 감으면 장력이 급격히 오름
export const TELEGRAPH = 0.35;                        // 날뛰기 직전 조짐 시간(초)

export const PERSON_SCALE = 0.72;     // 바다용 실루엣 크기 배율 (8×9 그림 기준 → 약 6px)

export const TIMING = {
  chargeSpeed: 1.1,      // 파워 게이지 왕복 속도 (초당)
  castFlight: 0.75,      // 찌가 날아가는 시간
  shadowLead: 2.4,       // 입질 몇 초 전부터 그림자가 다가오는지
  fakeWindow: 0.45,      // 헛입질에 반응하면 도망가는 시간
  pullWindow: 0.9,       // '쭉 끌림' 챔질 가능 시간
  pullPerfect: 0.3,
  tokInterval: 0.4,      // '톡톡' 간격
  tokWindow: 0.65,
  tokPerfect: 0.22,
  hook: 0.45,
  fail: 1.3,
};

export const FIGHT = {
  safeLow: 0.3, safeHigh: 0.8,
  slackLimit: 0.12, slackTime: 2.0,
  reelSpeed: 13,         // 감을 때 초당 줄어드는 거리(m)
};

// 등급: 색, 화면상 몸길이(px), 힘, 출현 가중치, 기본 가격
export const GRADES = [
  { id: 'common',    name: '일반', color: '#9aa3ad', len: [220, 320], power: 0.5, weight: 50,  price: 40 },
  { id: 'uncommon',  name: '고급', color: '#5fbf6a', len: [300, 420], power: 0.7, weight: 25,  price: 120 },
  { id: 'rare',      name: '희귀', color: '#4f9cf0', len: [400, 560], power: 0.9, weight: 13,  price: 400 },
  { id: 'epic',      name: '영웅', color: '#a77be0', len: [540, 760], power: 1.15, weight: 7,  price: 1500 },
  { id: 'legendary', name: '전설', color: '#f2933a', len: [760, 1100], power: 1.4, weight: 3.5, price: 6000 },
  { id: 'fantasy',   name: '환상', color: '#f2c14e', len: [1200, 1900], power: 1.7, weight: 1.5, price: 0 },
];

// 시간대: 화면 전체에 곱해지는 색
export const PHASES = [
  { id: 'day',   name: '낮',   tint: null,      glow: false },
  { id: 'dusk',  name: '노을', tint: '#ffb98a', glow: true },
  { id: 'night', name: '밤',   tint: '#4f63a8', glow: true },
  { id: 'dawn',  name: '새벽', tint: '#c9b8ec', glow: false },
];

export const COLORS = {
  cream: '#fff4dc',
  navy: '#1d2b4a',
  wood: '#7a4b2a',
  lineSafe: [255, 244, 220],
  lineWarn: [255, 214, 70],
  lineDanger: [255, 70, 60],
};

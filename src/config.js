// 화면·배치·타이밍 상수. 수치 조정은 여기서만 한다.

export const W = 640;
export const H = 360;

// 구도: 순수 옆모습 (assets/concept 의 목표 화면 기준)
export const HORIZON = 208;          // 수평선 y (하늘 그림의 아래 끝)
export const WL = 216;               // 수면선 y. 이 아래는 물의 단면.
export const BOAT_X = W * 0.82;      // 배 위치 (목표 화면: 오른쪽 끝 가까이)
export const CAST_NEAR = W * 0.62;   // 약하게 던졌을 때 찌 위치
export const CAST_FAR = W * 0.46;     // 세게 던졌을 때 찌 위치
export const ROD_LEN = 46;
export const DEEP = 135;             // 그림자가 내려갈 수 있는 가장 깊은 곳 (수면선 아래 px)
export const LEAP_X = W * 0.44;      // 낚아 올릴 때 생물이 솟구치는 자리
export const SHADOW_LEN = 400;       // 물속 그림자의 길이. 등급과 상관없이 모두 같다 (정체와 크기는 뿅 하는 순간에만 드러난다)
export const LEAP_SCALE = 1;         // 솟구치는 자세 그림의 폭 = 몸길이 × 이 값

// 파이팅 중 물고기 동작: 등급별로 쓸 수 있는 동작 (기획서 §3)
export const FIGHT_MODES = {
  common:    ['hold', 'run', 'thrash'],
  uncommon:  ['hold', 'run', 'dive'],
  rare:      ['hold', 'run', 'dive', 'circle'],
  epic:      ['hold', 'run', 'dive', 'circle', 'thrash'],
  legendary: ['hold', 'run', 'dive', 'circle', 'thrash'],
  fantasy:   ['hold', 'run', 'dive', 'circle', 'thrash'],
};
export const SURGE_MODES = ['run', 'dive', 'thrash'];   // 날뛰는 동작: 계속 감으면 장력이 급격히 오름
export const TELEGRAPH = 0.35;                        // 날뛰기 직전 조짐 시간(초)

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
// 기준: 일반 등급 = 목표 화면(assets/concept/concept_3)의 고래 크기(화면 폭의 55~70%). 그 위로는 화면을 넘는다.
export const GRADES = [
  { id: 'common',    name: '일반', color: '#9aa3ad', len: [350, 450], power: 0.5, weight: 50,  price: 40 },
  { id: 'uncommon',  name: '고급', color: '#5fbf6a', len: [450, 580], power: 0.7, weight: 25,  price: 120 },
  { id: 'rare',      name: '희귀', color: '#4f9cf0', len: [580, 770], power: 0.9, weight: 13,  price: 400 },
  { id: 'epic',      name: '영웅', color: '#a77be0', len: [770, 1020], power: 1.15, weight: 7,  price: 1500 },
  { id: 'legendary', name: '전설', color: '#f2933a', len: [1020, 1400], power: 1.4, weight: 3.5, price: 6000 },
  { id: 'fantasy',   name: '환상', color: '#f2c14e', len: [1600, 2560], power: 1.7, weight: 1.5, price: 0 },
];

// 시간대: 화면 전체에 곱해지는 색
// 바다에서의 하루: 새벽에 나가 낮·노을을 지나 밤이 끝나면 항구로 돌아온다 (10분)
export const DAY_SEC = 600;
export const DAY_PLAN = [[0, 3], [0.1, 0], [0.55, 1], [0.75, 2]];      // [하루 중 시작 지점(0~1), PHASES 번호]
export const phaseAt = (k) => { let p = 3; for (const [at, id] of DAY_PLAN) if (k >= at) p = id; return p; };

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

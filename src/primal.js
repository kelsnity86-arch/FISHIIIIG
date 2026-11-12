// 태초의 바다(9번): 도감을 다 채우면 열리는 마지막 바다. 아무것도 섞이지 않은, 본래 모습 그대로의 생물이 본래 크기로 산다.
// [이름, 그림 열쇠, 등급, 9, 놀란 표정 그림이 있는가, 몸길이(m) 가장 작은 것, 가장 큰 것]  ← 앞 다섯 칸은 dots.js 와 같은 모양
// 그림: 새 그림 p_<열쇠>(항구 그림체의 세밀한 그림)가 있으면 그것을, 없으면 예전 그림 fish_<열쇠>를 임시로 쓴다.
import { knownSprite } from './assets.js';
export const PRIMAL = [
  ['참멸치',     'anchovy',   'common',    9, true, 0.10, 0.16],
  ['참고등어',   'mackerel',  'common',    9, true, 0.30, 0.50],
  ['참망둥어',   'goby',      'common',    9, true, 0.10, 0.22],
  ['참새우',     'shrimp',    'common',    9, true, 0.10, 0.22],
  ['참쥐치',     'filefish',  'common',    9, true, 0.18, 0.30],
  ['참넙치',     'flounder',  'common',    9, true, 0.40, 0.80],
  ['참게',       'crab',      'common',    9, true, 0.12, 0.25],
  ['참돔',       'bream',     'uncommon',  9, true, 0.40, 0.95],
  ['참복',       'puffer',    'uncommon',  9, true, 0.30, 0.60],
  ['참날치',     'flying',    'uncommon',  9, true, 0.25, 0.40],
  ['참오징어',   'squid',     'uncommon',  9, true, 0.30, 0.60],
  ['참나비고기', 'butterfly', 'uncommon',  9, true, 0.12, 0.20],
  ['참해마',     'seahorse',  'uncommon',  9, true, 0.10, 0.25],
  ['참문어',     'octopus',   'rare',      9, true, 0.60, 1.50],
  ['참장어',     'eel',       'rare',      9, true, 0.60, 1.30],
  ['참가오리',   'manta',     'rare',      9, true, 2.00, 5.00],
  ['참철갑상어', 'sturgeon',  'rare',      9, true, 1.50, 3.00],
  ['참돌고래',   'dolphin',   'rare',      9, true, 2.00, 2.60],
  ['참바다거북', 'turtle',    'rare',      9, true, 0.80, 1.40],
  ['참다랑어',   'tuna',      'epic',      9, true, 1.50, 3.00],
  ['참청새치',   'marlin',    'epic',      9, true, 2.50, 4.50],
  ['참개복치',   'sunfish',   'epic',      9, true, 1.80, 3.30],
  ['참상어',     'shark',     'epic',      9, true, 3.00, 6.00],
  ['참고래',     'whale',     'legendary', 9, true, 14.0, 26.0],
];
// 그림 이름 (놀란 표정은 이 이름 뒤에 _s)
export const primalSprite = (key) => (knownSprite('p_' + key) ? 'p_' : 'fish_') + key;
// 도감·게임에서 생물 한 줄(d)의 그림 이름
export const spriteOf = (d) => (d[3] === 9 ? primalSprite(d[1]) : 'd_' + d[1]);
// 화면에 그릴 몸길이(px). 배(32px)를 3m로 본 본래 크기 그대로. 다만 너무 작아 안 보이는 것은 찌만 한 크기까지는 키워 보여 준다.
export const primalLen = (m) => Math.max(20, m / 3 * 32);
// 도감 글: 돌려 말하지 않는다. 본 그대로 적는다.
export const PRIMAL_TEXT = {
  anchovy: '멸치. 작고 은빛이다. 떼를 지어 다닌다.',
  mackerel: '고등어. 등이 푸르고 배가 희다.',
  goby: '망둥어. 갯바위 틈에 산다.',
  shrimp: '새우. 등이 굽었다.',
  filefish: '쥐치. 입이 작고 껍질이 거칠다.',
  flounder: '넙치. 납작하고 두 눈이 한쪽에 있다.',
  crab: '게. 옆으로 걷는다.',
  bream: '돔. 붉고 단단하다.',
  puffer: '복어. 놀라면 부푼다.',
  flying: '날치. 물 위를 난다.',
  squid: '오징어. 다리가 열 개다.',
  butterfly: '나비고기. 산호 사이를 팔랑거린다.',
  seahorse: '해마. 서서 헤엄친다.',
  octopus: '문어. 다리가 여덟 개다.',
  eel: '장어. 길고 미끄럽다.',
  manta: '가오리. 날개를 펴고 물속을 난다.',
  sturgeon: '철갑상어. 등에 단단한 비늘이 줄지어 있다.',
  dolphin: '돌고래. 배를 따라온다.',
  turtle: '바다거북. 오래 산다.',
  tuna: '다랑어. 쉬지 않고 헤엄친다.',
  marlin: '청새치. 주둥이가 길고 뾰족하다.',
  sunfish: '개복치. 둥글고 느긋하다.',
  shark: '상어. 이가 많다.',
  whale: '고래. 크다. 숨을 쉬러 올라온다. 아무것도 달고 있지 않다.',
};

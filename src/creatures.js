// 생물 목록 (임시 데이터). 정식 500종+ 데이터 생성은 1단계 후반 작업.
// 그림: 일반 생물 = fish_<체형>[_c2~_c4][_s], 환상종 = fantasy_NN[_s]  (_s = 놀란 표정)
import { DOTS } from './dots.js';
import { GRADES } from './config.js';

// [영문 체형, 이름, 기본 등급 0~4, 입질 패턴]
const BODIES = [
  ['mackerel', '고등어', 0, 'tok'], ['anchovy', '멸치', 0, 'tok'], ['bream', '돔', 0, 'tok'],
  ['flounder', '넙치', 0, 'pull'], ['puffer', '복어', 0, 'tok'], ['filefish', '쥐치', 0, 'tok'],
  ['butterfly', '나비고기', 0, 'tok'], ['goby', '망둥어', 0, 'tok'], ['flying', '날치', 1, 'pull'],
  ['seahorse', '해마', 1, 'tok'], ['shrimp', '새우', 0, 'tok'], ['crab', '게', 0, 'tok'],
  ['squid', '오징어', 1, 'pull'], ['octopus', '문어', 1, 'pull'], ['jellyfish', '해파리', 1, 'tok'],
  ['starfish', '불가사리', 0, 'tok'],
  ['tuna', '참치', 1, 'pull'], ['shark', '상어', 2, 'pull'], ['manta', '가오리', 2, 'pull'],
  ['eel', '장어', 1, 'pull'], ['marlin', '청새치', 2, 'pull'], ['sawshark', '톱상어', 2, 'pull'],
  ['sunfish', '개복치', 2, 'pull'], ['sturgeon', '철갑상어', 2, 'pull'], ['whale', '고래', 3, 'pull'],
  ['dolphin', '돌고래', 2, 'pull'], ['angler', '아귀', 2, 'pull'], ['coelacanth', '실러캔스', 3, 'pull'],
  ['giant_squid', '대왕오징어', 3, 'pull'], ['giant_octopus', '대왕문어', 3, 'pull'],
  ['turtle', '바다거북', 2, 'pull'], ['oarfish', '산갈치', 3, 'pull'], ['seal', '물개', 2, 'pull'],
  ['walrus', '바다코끼리', 3, 'pull'], ['manatee', '매너티', 2, 'pull'], ['narwhal', '일각고래', 3, 'pull'],
  ['sea_snake', '바다뱀', 2, 'pull'], ['crocodile', '바다악어', 3, 'pull'], ['plesiosaur', '수장룡', 3, 'pull'],
  ['ammonite', '암모나이트', 2, 'pull'],
];
// 색 1(자연색) → 기본 등급, 색 2~3 → +1, 색 4 → +2 (전설까지)
const COLORS = [['', 0], ['황금 ', 1], ['에메랄드 ', 1], ['장밋빛 ', 2]];

const FANTASY = [
  '히포캄푸스', '카프리콘', '문장 바다사자', '신(蜃)', '해님 붕어', '마카라', '용궁 거북', '타니와',
  '무지개 뱀', '진주 대왕조개', '네시', '켈피', '이쿠치', '아방크', '안개 해파리', '전설의 흰 고래',
  '시 서펀트', '곤(鯤)', '별고래', '폭풍 청새치', '아스피도켈론', '하프구파', '아클루트', '얼음 해룡',
  '수정 일각고래', '리바이어던', '나마즈', '모오', '흑요석 상어', '불사조 날치', '크라켄', '카리브디스',
  '바케쿠지라', '루스카', '심연 초롱아귀', '요르문간드', '용왕 해룡', '용 잉어', '이무기', '바하무트',
];

const LIST = [];
for (const [shape, name, base, bite] of BODIES) {
  COLORS.forEach(([prefix, up], i) => {
    LIST.push({
      name: prefix + name,
      grade: GRADES[Math.min(4, base + up)].id,
      sprite: 'fish_' + shape + (i === 0 ? '' : '_c' + (i + 1)),
      bite,
    });
  });
}
FANTASY.forEach((name, i) => {
  LIST.push({ name, grade: 'fantasy', sprite: 'fantasy_' + String(i + 1).padStart(2, '0'), bite: 'pull' });
});

const rand = (a, b) => a + Math.random() * (b - a);

import { PRIMAL, spriteOf, primalLen } from './primal.js';
export const REGIONS = ['', '햇살 연안', '산호초 열대', '안개 군도', '원양 대해', '극지 빙해', '화산 해역', '심연 해구', '환상의 바다', '태초의 바다'];

// 도감 끌어당김: 그 바다의 도감이 찰수록, 아직 못 낚은 생물이 조금씩 더 잘 걸린다 (마지막 한두 종을 몇 시간씩 기다리지 않게).
//  · 찬 정도(0~1)의 세제곱에 비례 → 절반쯤 찰 때까지는 거의 느껴지지 않고, 거의 다 찼을 때 뚜렷해진다
//  · grade = 못 낚은 생물이 남은 등급이 나올 가능성에 더하는 배수, kind = 그 등급 안에서 못 낚은 생물이 뽑힐 가능성에 더하는 배수
export const DEX_PULL = { grade: 9, kind: 14 };
export function rollCreature(forcedGrade, region = 1, luck = 1, fantasyBoost = 1, far = 0, records = null) {
  let grade;
  const primal0 = region === 9, here0 = (primal0 ? PRIMAL : DOTS.filter((d) => d[3] === region || d[3] === 0)).filter((d) => d[2] !== 'fantasy');
  const unseen = records ? here0.filter((d) => records[d[0]] == null) : [], fill3 = records && here0.length ? (1 - unseen.length / here0.length) ** 3 : 0;
  const lacks = (id) => unseen.some((d) => d[2] === id);
  if (forcedGrade) {
    grade = GRADES.find((g) => g.id === forcedGrade);
  } else {
    // 행운(복장): 등급이 하나 높을수록 나올 가능성이 luck배씩 커진다 (환상종은 덜 늘어난다: 오래된 물건이 끝 무렵까지 조금씩 모이게)
    const wt = GRADES.map((g, i) => g.weight * luck ** (g.id === 'fantasy' ? 2 : i) * (g.id === 'fantasy' ? fantasyBoost : 1) * (fill3 && lacks(g.id) ? 1 + DEX_PULL.grade * fill3 : 1)), total = wt.reduce((s, v) => s + v, 0);
    let r = Math.random() * total;
    grade = GRADES.find((g, i) => (r -= wt[i]) < 0) || GRADES[0];
  }
  // 그 해역의 생물과 모든 해역 공용(평범한 물고기) 가운데, 그 등급에서 하나.
  // 그 등급이 이 해역에 없으면 한 등급씩 낮춰 찾는다.
  const primal = region === 9;                    // 태초의 바다: 섞이지 않은 본래 생물만, 본래 크기로. 환상종은 없다
  if (primal && grade.id === 'fantasy') grade = GRADES[GRADES.length - 2];
  const here = primal ? PRIMAL : DOTS.filter((d) => d[3] === region || d[3] === 0);
  let pool = [];
  for (let i = GRADES.indexOf(grade); i >= 0 && !pool.length; i--) { grade = GRADES[i]; pool = here.filter((d) => d[2] === grade.id); }
  let pick = pool[Math.floor(Math.random() * pool.length)] || DOTS[0];
  if (fill3 && pool.length) {      // 그 등급 안에서: 못 낚은 생물에 무게를 더 준다
    const w = pool.map((d) => (records[d[0]] == null ? 1 + DEX_PULL.kind * fill3 : 1)); let r = Math.random() * w.reduce((a, v) => a + v, 0);
    pick = pool[w.findIndex((v) => (r -= v) < 0)] || pick;
  }
  const base = { name: pick[0], grade: grade.id, sprite: spriteOf(pick), sprite2: spriteOf(pick) + (pick[4] && !spriteOf(pick).startsWith('p_') ? '_s' : ''), region: pick[3], bite: 'pull' };
  // 큰 개체일수록 드물다. 멀리 던질수록(far 0~1) 큰 개체가 잘 나온다: 가장 멀리 던지면 평균 크기 지수가 약 1.4배, 값은 약 18% 높다
  const sizeT = Math.random() ** (1.6 - 0.8 * Math.max(0, Math.min(1, far)));
  const len = grade.len[0] + (grade.len[1] - grade.len[0]) * sizeT;
  if (primal) {
    const meters = pick[5] + (pick[6] - pick[5]) * sizeT;
    return { ...base, gradeInfo: grade, len: primalLen(meters), meters, fixedSize: true, power: grade.power * rand(0.9, 1.1), price: Math.round(grade.price * (0.7 + sizeT * 1.3)), isFantasy: false };
  }
  return {
    ...base,
    gradeInfo: grade,
    len,                                              // 화면상 몸길이(px)
    meters: len / 32 * 3,                             // 배(32px)를 3m로 본 몸길이
    power: grade.power * rand(0.9, 1.1),
    price: Math.round(grade.price * (0.7 + sizeT * 1.3)),
    isFantasy: grade.id === 'fantasy',
  };
}

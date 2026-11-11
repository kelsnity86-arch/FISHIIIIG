// 생물 목록 (임시 데이터). 정식 500종+ 데이터 생성은 1단계 후반 작업.
// 그림: 일반 생물 = fish_<체형>[_c2~_c4][_s], 환상종 = fantasy_NN[_s]  (_s = 놀란 표정)
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

export function rollCreature(forcedGrade) {
  let grade;
  if (forcedGrade) {
    grade = GRADES.find((g) => g.id === forcedGrade);
  } else {
    const total = GRADES.reduce((s, g) => s + g.weight, 0);
    let r = Math.random() * total;
    grade = GRADES.find((g) => (r -= g.weight) < 0) || GRADES[0];
  }
  // 목표 화면 재현 단계: 솟구치는 자세 그림이 고래 한 종뿐이라 지금은 고래만 낚인다.
  // (다른 생물은 자세 그림을 받은 뒤 아래 줄을 원래 목록으로 되돌린다)
  const base = { name: '고래', grade: grade.id, sprite: 'c_whale_leap', bite: 'pull' };
  const sizeT = Math.random() ** 1.6;                 // 큰 개체일수록 드물게
  const len = grade.len[0] + (grade.len[1] - grade.len[0]) * sizeT;
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

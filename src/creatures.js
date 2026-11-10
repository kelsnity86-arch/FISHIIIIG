// 시험판용 임시 생물 목록. (정식 500종+ 데이터는 1단계 본작업에서 생성)
import { GRADES } from './config.js';

const LIST = [
  // 실제 에셋이 있는 체형 (fish_s1)
  { name: '왕고등어',     grade: 'common',    shape: 'mackerel', hue: 0,    bite: 'tok' },
  { name: '대왕멸치',     grade: 'common',    shape: 'anchovy',  hue: 0,    bite: 'tok' },
  { name: '통통돔',       grade: 'common',    shape: 'bream',    hue: 150,  bite: 'tok' },
  { name: '졸린 넙치',    grade: 'common',    shape: 'flounder', hue: -30,  bite: 'pull' },
  { name: '황금 고등어',  grade: 'uncommon',  shape: 'mackerel', hue: -150, bite: 'pull' },
  { name: '무지개 넙치',  grade: 'uncommon',  shape: 'flounder', hue: 70,   bite: 'pull' },
  { name: '보랏빛 돔',    grade: 'rare',      shape: 'bream',    hue: 80,   bite: 'pull' },
  { name: '초록 멸치왕',  grade: 'rare',      shape: 'anchovy',  hue: -70,  bite: 'tok' },
  // 아직 에셋이 없어 임시 체형을 쓰는 것
  { name: '붉은 산갈치',  grade: 'epic',      shape: 'long',  hue: 150, bite: 'pull' },
  { name: '외뿔 고래',    grade: 'epic',      shape: 'whale', hue: -30, bite: 'pull' },
  { name: '혹등고래',     grade: 'legendary', shape: 'whale', hue: 0,   bite: 'pull' },
  { name: '수장룡',       grade: 'legendary', shape: 'long',  hue: 40,  bite: 'pull' },
  { name: '별고래',       grade: 'fantasy',   shape: 'whale', hue: 60,  bite: 'pull' },
  { name: '요르문간드',   grade: 'fantasy',   shape: 'long',  hue: 200, bite: 'pull' },
];

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
  const pool = LIST.filter((c) => c.grade === grade.id);
  const base = pool[Math.floor(Math.random() * pool.length)];
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

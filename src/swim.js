// 물속 그림자의 헤엄 (모든 생물 공통, 옆모습).
//
// 좌표: x = 화면 가로, y = 수면선 아래 깊이(px).
// 방향 전환은 그림을 휙 뒤집지 않는다. 속도를 줄이고 몸을 틀어(옆모습에서는 몸이 짧아 보였다가
// 반대쪽으로 길어진다) 돌아선 뒤 다시 속도를 낸다. 오르내릴 때는 머리를 살짝 들거나 숙인다.
// 모든 값은 가속·감속하며 서서히 변한다.

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const approach = (cur, target, rate, dt) => cur + (target - cur) * (1 - Math.exp(-rate * dt));

export function createSwimmer(len, x, y, face = 1) {
  // 큰 생물일수록 느리고 묵직하게
  const big = clamp(len / 400, 0.6, 5);
  return {
    len, x, y,
    face,                 // -1 왼쪽을 봄 ~ +1 오른쪽을 봄 (사이 값 = 몸을 트는 중)
    faceV: 0,
    pitch: 0,             // 머리를 숙인 정도(+) / 든 정도(-)
    speed: 0, vis: 0,
    tail: 0, tailAmp: 0.03, shake: 0,
    floor: Math.min(len * 0.19 + 8, 96),   // 이보다 얕게는 올라오지 않는다 (수면선에 몸이 잘려 보이지 않게)
    act: null,            // 특별한 자세: 'thrash' 몸부림 / 'dive' 잠수 / 'surge' 솟구침 (없으면 헤엄)
    pose: 'swim', prevPose: null, mix: 1,   // 지금 자세, 직전 자세, 넘어가는 정도
    maxSpeed: 60 / Math.sqrt(big) + len * 0.1,
    turnTime: 1.5 * Math.sqrt(big),      // 완전히 돌아서는 데 걸리는 시간(초)
    accel: 1.8 / Math.sqrt(big),
    beat: 6 / Math.sqrt(big),
    target: { x, y, speed: 1 },
  };
}

// 주둥이 위치 (찌·줄이 걸리는 곳)
export function mouth(s) {
  const L = s.len * 0.46;
  return { x: s.x + s.face * L * Math.cos(s.pitch), y: s.y + Math.abs(s.face) * L * Math.sin(s.pitch) };
}

// target: { x, y, speed(최고 속도 대비 0~1.6), face(도착했을 때 볼 방향, 선택) }
export function steer(s, dt, { arrive = true } = {}) {
  const t = s.target;
  const dx = t.x - s.x, dy = Math.max(t.y, s.floor) - s.y;   // 올라갈 수 없는 깊이를 향해 계속 고개를 들고 있지 않게
  const near = Math.abs(dx) < s.len * 0.12;

  // 볼 방향: 목표가 있는 쪽. 다 왔으면 지정된 방향(없으면 그대로).
  // 목표가 살짝 뒤에 있을 뿐이면 돌아서지 않는다: 큰 몸을 돌리는 대신 그대로 천천히 뒷걸음질한다.
  const cur = Math.sign(s.face) || 1;
  const behind = dx * cur < 0, slight = behind && Math.abs(dx) < s.len * 0.75 && (!t.face || t.face === cur);
  let want = cur;
  if (!near && !slight) want = Math.sign(dx);
  else if (near && t.face) want = t.face;
  const maxF = 2 / s.turnTime;
  s.faceV = approach(s.faceV, clamp((want - s.face) * 4, -maxF, maxF), 5, dt);
  s.face = clamp(s.face + s.faceV * dt, -1, 1);

  // 속도: 가속 → 순항 → 감속. 몸을 트는 동안은 거의 멈춘다.
  const facing = Math.max(0, s.face * want);
  let wantSpeed = s.maxSpeed * (t.speed ?? 1) * facing * facing;
  if (arrive) wantSpeed = Math.min(wantSpeed, Math.abs(dx) * 1.3 + Math.abs(dy) * 0.6);
  if (slight) wantSpeed = -Math.min(s.maxSpeed * 0.22, Math.abs(dx) * 0.9);      // 뒷걸음질
  const prev = s.speed;
  s.speed = approach(s.speed, wantSpeed, s.accel * (wantSpeed > s.speed ? 1 : 1.8), dt);

  // 오르내림: 머리를 들거나 숙이고 그 방향으로 나아간다. 제자리에서도 천천히 깊이를 맞춘다.
  const wantPitch = clamp(Math.atan2(dy, Math.max(Math.abs(dx), s.len * 0.35)), -0.5, 0.5);
  s.pitch = approach(s.pitch, wantPitch, 2.2, dt);
  s.x += s.face * Math.cos(s.pitch) * s.speed * dt;
  s.y += (Math.sin(s.pitch) * s.speed + clamp(dy, -1, 1) * Math.min(Math.abs(dy), s.maxSpeed * 0.35)) * dt;
  s.y = Math.max(s.floor, s.y);

  // 꼬리: 빠를수록 빠르게, 가속할 때 크게
  const pace = Math.abs(s.speed) / s.maxSpeed;
  s.tail += dt * s.beat * (0.4 + pace * 1.3);
  const kick = Math.max(0, (s.speed - prev) / dt) / s.maxSpeed;
  s.tailAmp = approach(s.tailAmp, 0.035 + pace * 0.06 + kick * 0.08, 4, dt);
  s.shake = approach(s.shake, 0, 3, dt);
  return Math.hypot(dx, dy);
}

// 지금 보여줄 자세 그림. 돌아설 때는 몸을 트는 3동작을 거쳐 반대쪽을 본다.
export function updatePose(s, dt) {
  const af = Math.abs(s.face);
  const p = af < 0.22 ? 'turn_3' : af < 0.52 ? 'turn_2' : af < 0.8 ? 'turn_1' : 'swim';
  if (p !== s.pose) { s.prevPose = s.pose; s.pose = p; s.mix = 0; }
  s.mix = Math.min(1, s.mix + dt / 0.3);
}

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
    maxSpeed: 60 / Math.sqrt(big) + len * 0.1,
    turnTime: 0.9 * Math.sqrt(big),      // 완전히 돌아서는 데 걸리는 시간(초)
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
  const dx = t.x - s.x, dy = t.y - s.y;
  const near = Math.abs(dx) < s.len * 0.12;

  // 볼 방향: 목표가 있는 쪽. 다 왔으면 지정된 방향(없으면 그대로).
  let want = Math.sign(s.face) || 1;
  if (!near) want = Math.sign(dx);
  else if (t.face) want = t.face;
  const maxF = 2 / s.turnTime;
  s.faceV = approach(s.faceV, clamp((want - s.face) * 4, -maxF, maxF), 5, dt);
  s.face = clamp(s.face + s.faceV * dt, -1, 1);

  // 속도: 가속 → 순항 → 감속. 몸을 트는 동안은 거의 멈춘다.
  const facing = Math.max(0, s.face * want);
  let wantSpeed = s.maxSpeed * (t.speed ?? 1) * facing * facing;
  if (arrive) wantSpeed = Math.min(wantSpeed, Math.abs(dx) * 1.3 + Math.abs(dy) * 0.6);
  const prev = s.speed;
  s.speed = approach(s.speed, wantSpeed, s.accel * (wantSpeed > s.speed ? 1 : 1.8), dt);

  // 오르내림: 머리를 들거나 숙이고 그 방향으로 나아간다. 제자리에서도 천천히 깊이를 맞춘다.
  const wantPitch = clamp(Math.atan2(dy, Math.max(Math.abs(dx), s.len * 0.35)), -0.5, 0.5);
  s.pitch = approach(s.pitch, wantPitch, 2.2, dt);
  s.x += s.face * Math.cos(s.pitch) * s.speed * dt;
  s.y += (Math.sin(s.pitch) * s.speed + clamp(dy, -1, 1) * Math.min(Math.abs(dy), s.maxSpeed * 0.35)) * dt;
  s.y = Math.max(4, s.y);

  // 꼬리: 빠를수록 빠르게, 가속할 때 크게
  const pace = s.speed / s.maxSpeed;
  s.tail += dt * s.beat * (0.4 + pace * 1.3);
  const kick = Math.max(0, (s.speed - prev) / dt) / s.maxSpeed;
  s.tailAmp = approach(s.tailAmp, 0.035 + pace * 0.06 + kick * 0.08, 4, dt);
  s.shake = approach(s.shake, 0, 3, dt);
  return Math.hypot(dx, dy);
}

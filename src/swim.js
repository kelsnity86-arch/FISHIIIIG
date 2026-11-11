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
    maxX: Infinity,       // 이보다 오른쪽으로는 못 간다 (배 밑을 넘어가지 않는다)
    jt: 0, jv: 0, jvy: 0, jvT: 0, jvyT: 0, jp: 0, wob: 0,   // 몸부림: 다음 움찔까지 남은 시간, 움찔 속도, 몸 비틀기 목표·현재
    floor: Math.min(len * 0.19 + 8, 96),   // 이보다 얕게는 올라오지 않는다 (수면선에 몸이 잘려 보이지 않게)
    act: null,            // 특별한 자세: 'thrash' 몸부림 / 'dive' 잠수 / 'surge' 솟구침 (없으면 헤엄)
    pose: 'swim', prevPose: null, mix: 1,   // 지금 자세, 직전 자세, 넘어가는 정도
    maxSpeed: 60 / Math.sqrt(big) + len * 0.1,
    turnTime: 1.5 * Math.sqrt(big),      // 완전히 돌아서는 데 걸리는 시간(초)
    accel: 1.8 / Math.sqrt(big),
    beat: 6 / Math.sqrt(big),
    target: { x, y, speed: 1 },
    // 떠돌기: 마리마다 다른 박자로 목표 둘레를 느릿하게 맴돈다 → 같은 길을 되풀이하는 것처럼 보이지 않는다.
    // roam(0~1)은 얼마나 크게 떠돌지. 규칙(배 쪽을 본다·배를 못 넘는다·수면으로 안 올라온다)은 그대로 지킨다.
    roam: 0, roamK: 0, life: Math.random() * 100,
    nx: wave(), ny: wave(), ns: wave(),
  };
}

// 겹친 느린 물결 3개 = 되풀이가 눈에 띄지 않는 부드러운 흔들림 (-1~1)
function wave() { return [0, 1, 2].map((i) => ({ f: (0.07 + Math.random() * 0.16) * (1 + i * 0.9), p: Math.random() * 6.283, a: 1 / (1 + i * 0.7) })); }
const drift = (n, t) => (n[0].a * Math.sin(t * 6.283 * n[0].f + n[0].p) + n[1].a * Math.sin(t * 6.283 * n[1].f + n[1].p) + n[2].a * Math.sin(t * 6.283 * n[2].f + n[2].p)) / 2.17;

// 주둥이 위치 (찌·줄이 걸리는 곳)
export function mouth(s) {
  // 그림자 그림에서 머리 끝이 있는 자리(몸 가운데에서 몸길이의 0.47 앞, 살짝 위)를 그대로 따라간다.
  // 몸을 숙이거나 비틀면(pitch, wob) 그만큼 같이 돈다 → 줄 끝이 늘 입에 닿는다.
  const a = s.len * 0.47, b = -s.len * 0.008, f = s.pitch + (s.wob || 0);
  return { x: s.x + s.face * (a * Math.cos(f) + b * Math.sin(f)), y: s.y + a * Math.sin(f) + b * Math.cos(f) };
}

// target: { x, y, speed(최고 속도 대비 0~1.6), face(도착했을 때 볼 방향, 선택) }
export function steer(s, dt, { arrive = true } = {}) {
  const t = s.target;
  s.life += dt;
  s.roamK = approach(s.roamK, s.roam, 1.2, dt);          // 떠도는 크기도 서서히 바뀐다
  const rx = drift(s.nx, s.life) * s.len * 0.085 * s.roamK, ry = drift(s.ny, s.life) * 16 * s.roamK;
  const pace0 = 1 + drift(s.ns, s.life) * 0.22 * s.roamK; // 빨라졌다 느려졌다
  const dx = t.x + rx - s.x, dy = Math.max(t.y + ry, s.floor) - s.y;   // 올라갈 수 없는 깊이를 향해 계속 고개를 들고 있지 않게
  const near = Math.abs(dx) < s.len * 0.12;

  // 그림자는 돌아서지 않는다. 늘 같은 쪽(배 쪽)을 본 채 앞으로 나아가거나 뒷걸음질한다.
  // (큰 몸이 좌우로 몸을 틀 때마다 모양이 크게 바뀌어 부자연스러웠다)
  const cur = Math.sign(s.face) || 1, want = cur;
  s.faceV = approach(s.faceV, clamp((want - s.face) * 4, -2, 2), 5, dt);
  s.face = clamp(s.face + s.faceV * dt, -1, 1);

  // 속도: 가속 → 순항 → 감속. 목표가 뒤에 있으면 뒷걸음질(앞으로 갈 때보다 느리다).
  const behind = dx * cur < 0, top = s.maxSpeed * (t.speed ?? 1) * pace0;
  let wantSpeed = behind ? -top * 0.6 : top;
  if (arrive || behind) {
    const lim = Math.abs(dx) * 1.3 + (behind ? 0 : Math.abs(dy) * 0.6);
    wantSpeed = behind ? -Math.min(-wantSpeed, lim) : Math.min(wantSpeed, lim);
  }
  const prev = s.speed;
  s.speed = approach(s.speed, wantSpeed, s.accel * (Math.abs(wantSpeed) > Math.abs(s.speed) ? 1 : 1.8), dt);

  // 오르내림: 머리를 들거나 숙이고 그 방향으로 나아간다. 제자리에서도 천천히 깊이를 맞춘다.
  const wantPitch = clamp(Math.atan2(dy, Math.max(Math.abs(dx), s.len * 0.35)), -0.5, 0.5);
  s.pitch = approach(s.pitch, wantPitch, 2.2, dt);
  s.x += s.face * Math.cos(s.pitch) * s.speed * dt;
  s.y += (Math.sin(s.pitch) * Math.abs(s.speed) + clamp(dy, -1, 1) * Math.min(Math.abs(dy), s.maxSpeed * 0.35)) * dt;
  s.y = Math.max(s.floor, s.y);

  // 꼬리: 빠를수록 빠르게, 가속할 때 크게
  const pace = Math.abs(s.speed) / s.maxSpeed;
  s.tail += dt * s.beat * (0.4 + pace * 1.3);
  const kick = Math.max(0, (s.speed - prev) / dt) / s.maxSpeed;
  s.tailAmp = approach(s.tailAmp, 0.035 + pace * 0.06 + kick * 0.08, 4, dt);
  // 몸부림: 방향은 그대로 둔 채, 불규칙하게 움찔움찔 뒤로 당기고 몸을 비튼다. 세기는 s.shake(0~1).
  const k = s.shake;
  s.jt -= dt;
  if (s.jt <= 0 && k > 0.05) {
    s.jt = (0.1 + Math.random() * 0.24) / (0.6 + k);
    s.jvT = (Math.random() * 2 - 1.3) * k * s.maxSpeed * 2.8;         // 뒤로 당기는 쪽이 더 잦다
    s.jvyT = (Math.random() * 2 - 0.7) * k * s.maxSpeed * 1.1;        // 아래로 처박는 쪽이 더 잦다
    s.jp = (Math.random() * 2 - 1) * 0.44 * k;
  }
  // 움찔하는 속도는 한순간에 생기지 않고 0.1초쯤에 걸쳐 붙는다 (순간이동처럼 보이지 않게)
  s.jv = approach(s.jv, s.jvT, 14, dt); s.jvT = approach(s.jvT, 0, 5, dt); s.x += s.jv * dt;
  s.jvy = approach(s.jvy, s.jvyT, 14, dt); s.jvyT = approach(s.jvyT, 0, 5, dt); s.y = Math.max(s.floor, s.y + s.jvy * dt);
  s.wob = approach(s.wob, s.jp, 13, dt); s.jp = approach(s.jp, 0, 4, dt);
  s.tail += dt * s.beat * k * 3.4;                                    // 꼬리도 다급하게
  s.x = Math.min(s.x, s.maxX);
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

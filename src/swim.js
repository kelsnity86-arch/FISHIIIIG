// 물속 그림자의 헤엄 (모든 생물 공통).
//
// 그림자는 수면을 위에서 비스듬히 내려다본 평면(x, z) 위를 헤엄친다.
//   x: 화면 가로,  z: 앞(+)·뒤(-) 방향,  depth: 0 = 수면 바로 아래, 1 = 깊은 곳
// 방향(heading)은 평면 위의 각도라서, 돌아설 때 그림을 뒤집지 않고 몸을 틀며 회전한다.
// (비스듬히 보이므로 정면·뒤를 향하는 순간에는 자연스럽게 짧아 보인다)
//
// 모든 값은 목표를 향해 서서히 변한다: 방향은 최대 회전 속도 안에서, 속도는 가속·감속하며.

const TAU = Math.PI * 2;
const wrap = (a) => ((a + Math.PI) % TAU + TAU) % TAU - Math.PI;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const approach = (cur, target, rate, dt) => cur + (target - cur) * (1 - Math.exp(-rate * dt));

export function createSwimmer(len, x, z, heading) {
  // 큰 생물일수록 느리고 묵직하게 (속도·회전·꼬리 박자 모두 크기에 따라)
  const big = clamp(len / 300, 0.6, 5);
  return {
    len, x, z, heading,
    speed: 0, depth: 1, vis: 0,
    turnRate: 0,                      // 지금 회전 속도 (몸의 C자 휘어짐에 사용)
    tail: 0, tailAmp: 0.04,           // 꼬리 박자 위상, 휘는 크기
    shake: 0,                         // 머리 털기 (버티기 동작)
    maxSpeed: 70 / Math.sqrt(big) + len * 0.12,
    maxTurn: 2.4 / Math.sqrt(big),    // 초당 최대 회전(rad)
    accel: 1.6 / Math.sqrt(big),
    beat: 7 / Math.sqrt(big),         // 꼬리 박자 기본 속도
    target: { x, z, depth: 1, speed: 1 },
  };
}

// 몸 길이: 깊을수록 작고 흐리게
export const visibleLen = (s) => s.len * (1 - 0.6 * s.depth);

// 주둥이 위치 (찌·줄이 걸리는 곳)
export function mouth(s) {
  const L = visibleLen(s) * 0.46;
  return { x: s.x + Math.cos(s.heading) * L, z: s.z + Math.sin(s.heading) * L };
}

// 목표 지점으로 헤엄친다. target.speed = 최고 속도 대비 비율(0~1.6), target.depth = 목표 깊이
// arrive: 가까워질수록 감속해서 목표에서 멈춘다 / false 면 지나쳐 계속 간다
export function steer(s, dt, { arrive = true } = {}) {
  const t = s.target;
  const dx = t.x - s.x, dz = t.z - s.z;
  const dist = Math.hypot(dx, dz);

  // 방향: 원하는 각도로 서서히. 최대 회전 속도로 제한하고, 회전 자체도 부드럽게 붙는다.
  if (dist > 1) {
    const diff = wrap(Math.atan2(dz, dx) - s.heading);
    const wantTurn = clamp(diff * 2.2, -s.maxTurn, s.maxTurn);
    s.turnRate = approach(s.turnRate, wantTurn, 6, dt);
  } else {
    s.turnRate = approach(s.turnRate, 0, 6, dt);
  }
  s.heading = wrap(s.heading + s.turnRate * dt);

  // 속도: 가속 → 순항 → 감속. 크게 돌 때는 속도를 줄인다.
  const facing = Math.cos(wrap(Math.atan2(dz, dx) - s.heading));
  let want = s.maxSpeed * (t.speed ?? 1) * (0.35 + 0.65 * Math.max(0, facing));
  if (arrive) want = Math.min(want, dist * 1.4);
  const prev = s.speed;
  s.speed = approach(s.speed, want, s.accel * (want > s.speed ? 1 : 1.6), dt);

  s.x += Math.cos(s.heading) * s.speed * dt;
  s.z += Math.sin(s.heading) * s.speed * dt;
  s.depth = approach(s.depth, t.depth ?? s.depth, 1.2, dt);

  // 꼬리: 빠를수록 빠르게, 가속할 때 크게 휘두른다
  const pace = s.speed / s.maxSpeed;
  s.tail += dt * s.beat * (0.35 + pace * 1.2);
  const kick = Math.max(0, (s.speed - prev) / dt) / s.maxSpeed;
  s.tailAmp = approach(s.tailAmp, 0.03 + pace * 0.05 + kick * 0.08, 4, dt);
  s.shake = approach(s.shake, 0, 3, dt);
  return dist;
}

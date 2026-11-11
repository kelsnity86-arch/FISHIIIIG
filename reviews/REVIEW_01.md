# REVIEW_01 — 수평선 낚시꾼 게임 검토

검토일: 2026-11-11 UTC / 2026-11-12 한국시간  
대상: `kelsnity86-arch/FISHIIIIG`, `claude/amazing-mendel-8fufxr`  
검토 커밋: [`00344b31a3ff64025d5826f20008f3439c7a7b54`](https://github.com/kelsnity86-arch/FISHIIIIG/commit/00344b31a3ff64025d5826f20008f3439c7a7b54)

**우선 고칠 것은 결과 카드에서의 어획 손실, 실저장과 연결된 등급 강제 선택, 효과 없는 강화 구매다.** 기본적인 시청→가게→배→해역 제한과 항구 자동 판매는 작동한다. 반면 환상종 보상·도감 화면이 빠져 있고, 큰 생물을 잡을 때 하늘에 빈 띠가 나타난다. 경제 계산기는 현재 게임과 달라서 **“해역마다 20~30분, 평균 16초마다 구매”를 현재 구현의 검증 결과로 볼 수 없다.**

## 검토 방법과 판정 기준

- `CLAUDE.md`, `GAME_DESIGN.md`를 먼저 읽고, 요청한 `src/main.js`, `game.js`, `render.js`, `harbor.js`, `economy.js`, `swim.js`, `creatures.js`, `assets.js`와 `tools/sim_economy.py`를 확인했다. 연결된 `config.js`, `dots.js`, `audio.js`, `index.html`, 에셋 manifest도 확인했다.
- 별도 작업 디렉터리에서 이 커밋을 HTTP로 제공해 Chromium으로 실행했다. 기본 화면, 항구·가게, 해역 2~8, 획득·결과 카드, 카메라, 새로고침 후 복원을 확인했다. 정상 로딩 검사에서 JavaScript 예외와 실패한 게임 리소스 요청은 없었다.
- 경제·진행 조건은 실제 모듈 함수로 검사했다. 낚시는 실제 `update()`를 1/60초씩 진행하는 자동 입력으로 6조건×40회 검사했다. 등급·장비·해역을 지정한 경우는 **시험용 상태 주입**이며, 그 상태까지 정상 플레이로 도달했다는 뜻이 아니다.
- 요청한 이미지 전체를 열어 보고, 배경은 실제 합성 화면도 확인했다. 시각적 취향 판단은 기능 오류와 구분했다.
- **게임 파일은 변경하지 않았다.** 검사 코드와 스크린샷은 저장소 밖에 두었다. 이 보고서만 `main`에 추가한다.

심각도는 **P1: 보상·경제 신뢰를 훼손해 우선 수정**, **P2: 진행·연출·핵심 기능에 영향**, **P3: 사용성·미술 정리**로 표시한다. 아래 소스 위치는 모두 검토 커밋 기준이다.

기획서에는 이전 규칙과 최신 규칙이 함께 남아 있다. 그림자 방향은 최신 §3의 **돌아서지 않음**, 생물 표현은 §4의 **고급 배경과 단순한 도트 생물의 대비**를 우선했다. 자동 낚시·프레스티지·6갈래 스킬 웹 확장은 명시적으로 다음 단계이므로 현재 버그로 세지 않았다. 배의 오른쪽 82% 배치 역시 최신 컨셉과 사용자 방향을 반영한 것으로 보았다.

## 주요 발견 — 심각한 순서

### 1. [P1 · A] 잡은 물고기가 결과 카드에서 새로고침하면 사라진다

**위치:** [src/game.js:688–693](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L688-L693), [src/game.js:145–156](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L145-L156), [src/main.js:66–82](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/main.js#L66-L82).

**문제:** 결과 카드가 뜰 때 도감 기록은 바로 확정하지만 어창에는 다음 클릭 때 넣는다. 저장에는 `fish`, `result`, 미수령 보상이 없다. 결과 화면에서 아무리 오래 자동 저장을 기다려도 어획이 복원되지 않는다.

**재현:** 희귀 `드릴일각고래`, 281 G를 낚아 결과 화면에서 2.2초 기다린 뒤 새로고침했다. 저장에는 최고 기록 54.41 m가 남았지만, 재시작 상태는 `idle`, 골드 0, 어창 0이었다. 잡은 생물을 받을 방법이 없어졌다. 전체 저장이 지워진 사례가 아니라 **확정 어획 한 건이 유실되는 사례**다.

**수정 제안:** 포획 성공 시 고유 획득 ID와 미수령 보상을 저장하고, 어창 적재/환상종 증표 지급을 그 ID에 대해 한 번만 처리한다. 재시작하면 미수령 결과를 복구한다. 적재·방생 보상·판매 완료 직후 저장하고 `pagehide`/`visibilitychange`에서도 저장해 2초 주기 사이의 종료 손실을 줄인다. 저장 실패도 조용히 무시하지 말고 표시한다.

### 2. [P1 · A/C] 화면의 시험 버튼으로 전설 어획을 계속 강제할 수 있다

**위치:** [index.html:23–27](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/index.html#L23-L27), [src/main.js:46–53](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/main.js#L46-L53), [src/game.js:354–357](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L354-L357), [src/creatures.js:54–61](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/creatures.js#L54-L61).

**문제:** 공개 화면 하단의 `등급: 무작위` 버튼이 실제 어종 추첨을 바꾸고, 그 어획은 정상 가격으로 판매·저장된다. 개발자 도구나 저장 파일 수정이 필요 없다. “시험용” 표시는 있지만 테스트 경제와 일반 경제가 분리되지 않았다.

**재현/수치:** 버튼을 다섯 번 누르면 `등급: 전설`, `forceGrade='legendary'`가 된다. 초기 장비·1번 해역에서 전설 강제 시험 40회 모두 자동 입력으로 포획 가능했다. 보너스 전 기대 판매액은 무작위 500.4 G/시도, 전설 강제 7,200 G/시도다. 실제 조작 시간은 다르지만 추첨만으로 약 14.4배의 가격 우위가 생긴다.

**수정 제안:** 배포 빌드에서는 버튼과 강제 추첨 경로를 제거한다. 개발 모드는 별도 저장 키를 사용하고, 테스트 어획을 일반 저장에 합치지 않는다. 현재 시험판용 기능이라는 의도는 이해되지만, 플레이어용 빌드로 그대로 내보내면 경제를 우회한다.

### 3. [P1 · A/C] 효과가 0인 손놀림·릴 강화를 계속 판매한다

**위치:** [src/economy.js:24](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/economy.js#L24), [src/economy.js:58–69](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/economy.js#L58-L69), [src/economy.js:78–99](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/economy.js#L78-L99), [src/harbor.js:98–102](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/harbor.js#L98-L102).

**문제와 재현:**

| 구매 | 실제 지출 | 효과 전 → 후 | 결과 |
|---|---:|---:|---|
| 손놀림 Lv.33→34, 길드 Lv.2 | 11,920 G | 속도 2.0→2.0 | 구매 성공, 효과 없음 |
| 손놀림 Lv.33 상태에서 릴 강화 23→24, 배 강화 20 | 388,911 G | 총속도 3.3→3.3 | 구매 성공, 효과 없음 |

손놀림은 `(1+0.02×33)×1.1×1.1 = 2.0086`이어서 Lv.33에서 이미 2배 상한에 닿는다. 길드는 이후 레벨을 계속 열어 준다. 릴은 손놀림이 상한이면 강화 23에서 총속도 3.3 상한에 닿으며, 그 이후에도 강화 70까지 구매 경로가 남는다. 손놀림이 0이어도 릴 강화 54부터 총속도가 상한이다. UI는 계속 속도가 빨라진다고 설명한다.

**수정 제안:** 구매 전후 실제 효과가 같으면 구매를 막고 `최대 효과`를 표시한다. 또는 후속 강화의 효과를 다른 유효한 수치로 옮기되 기획과 경제를 함께 수정한다. 총속도 상한·손놀림 상한·릴 설명을 하나의 효과 계산에서 생성한다. 길드 Lv.8에서 스킬 상한에 도달했을 때도 불가능한 `길드 Lv.9` 대신 `최대 레벨`을 표시한다.

### 4. [P2 · B/E] 환상종은 증표를 준다고 표시하지만 실제로는 지급하지 않는다

**위치:** [src/render.js:135–137](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/render.js#L135-L137), [src/game.js:147–148](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L147-L148), [src/game.js:707–721](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L707-L721), [src/game.js:20–46](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L20-L46), [src/main.js:69](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/main.js#L69). 기준: [GAME_DESIGN.md:185–190](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L185-L190).

**문제:** 결과 카드에는 `○○의 증표`가 나오지만 방생은 연출 후 종료된다. 증표 수량·강화 단계·영구 보너스 상태와 저장 필드가 없다. 길드 진열장도 없다. 환상종은 판매액이 0이므로 재포획의 지속적인 보상이 사라진다.

**재현:** `해님가오리`를 포획해 놓아준 뒤 골드 0, 어창 0, 도감 기록만 남았다. 경제 상태에는 변화가 없었다.

**수정 제안:** 종별 증표 ID, 1~5단계, 영구 효과를 추가하고 방생 완료 트랜잭션에서 한 번만 지급·저장한다. 결과 카드에 실제 얻는 효과와 현재 단계를 표시하고 길드에서 확인하게 한다. 출시 전에 미구현 상태가 유지된다면 지급된 것처럼 쓰는 문구부터 바로잡는다.

### 5. [P2 · B/C] 장비 부족의 힘 차이를 6으로 잘라, 후반 장비의 벽이 무너진다

**위치:** [src/economy.js:71](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/economy.js#L71), [src/game.js:357](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L357), [src/game.js:471–481](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L471-L481). 기준: [GAME_DESIGN.md:37–39](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L37-L39).

**문제:** 해역마다 힘은 4배지만 실제 파이팅에 들어가기 직전 `0.2~6`으로 제한한다. 예를 들어 줄·낚싯대 강화 0으로 8번 해역에 가면 해역 배율은 `4^7=16,384`인데 일반종부터 모두 최종 힘 6이 된다. 일정 이상 장비가 부족하면 추가적인 부족분과 등급 차이가 사라진다. 장비 한 단계 부족 시 다음 해역의 어획을 버티기 어렵게 한다는 기획과 차이가 크다.

**시험:** 배 강화 70, 릴 23, 손놀림 33, 줄·낚싯대 0으로 만든 8번 해역 시험 상태에서 40/40회 포획했다. 평균 결과 카드 도달 시간은 36.01초였다. 장력을 보고 감기/풀기를 정하는 자동 입력의 결과이므로 사람의 성공률로 읽으면 안 된다. 그래도 장비가 일곱 단계 부족한 상태에서 수익을 얻는 것이 구현상 가능함은 확인된다.

**수정 제안:** 입력 안정성을 위한 수치 상한과 해역·장비 부족 페널티를 분리한다. 장비 차이에 따른 유효 감기량·도주 거리·실패 위험을 실제 파이팅으로 다시 맞춘다. 모든 부족분을 같은 힘으로 만드는 상한을 그대로 둔 채 장비 가격만 올리지 않는다.

**범위 구분:** 이는 시청·배를 공짜로 얻거나 잠긴 해역을 직접 여는 버그가 아니다. 필수 배·시청·조선소 비용을 내고, 줄·낚싯대 비용을 크게 줄이는 경로가 지나치게 강해지는 **밸런스 문제**다.

### 6. [P2 · B/E] 도감 수로 진행을 막지만, 도감을 열어 부족한 종을 확인할 수 없다

**위치:** [src/economy.js:41](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/economy.js#L41), [src/economy.js:94](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/economy.js#L94), [src/harbor.js:81–110](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/harbor.js#L81-L110), [src/harbor.js:145–149](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/harbor.js#L145-L149). 기준: [GAME_DESIGN.md:291–297](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L291-L297).

**문제:** 마을 4~8등급의 40·80·130·180·230종 조건은 실제 적용된다. 그러나 길드에는 세 스킬과 길드 레벨만 있고, 바다의 책 버튼도 스킬 목록이다. 플레이어는 `도감 37/40` 같은 제한을 보아도 이미 잡은 종, 남은 종, 찾아갈 해역을 확인할 수 없다.

**수정 제안:** `records`와 `DOTS`를 이용한 도감 목록을 길드에 연결한다. 현재 수/필요 수, 해역별 획득 수, 미발견 실루엣, 기록을 표시하고 시청의 잠금 설명에서 도감으로 이동하게 한다. 350종 데이터는 있으므로 새 생물 그림을 먼저 만들 필요는 없다.

### 7. [P2 · B/D] 환상종 카메라가 멀어지면 하늘 왼쪽에 큰 빈 띠가 생긴다

**위치:** [src/render.js:259–285](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/render.js#L259-L285), 특히 [src/render.js:282](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/render.js#L282). 기준: [GAME_DESIGN.md:202](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L202).

**문제:** 확대·축소 중 하늘을 가운데 1장과 좌우 1장씩, 총 3장으로만 덮는다. 작은 줌과 큰 가로 이동에서는 그 범위가 화면 전체를 덮지 못한다. `skyTop()`으로 위쪽을 메워도 가로 부족은 해결되지 않는다.

**재현:** 1번 해역에서 환상종 `해님가오리`의 결과 카드를 띄웠다. 카메라 줌 약 0.1808, 가로 이동 약 429.92에서 1280px 화면 왼쪽 약 194px의 하늘이 그림 없이 짙은 남색 띠로 남았다. 로딩 실패가 없는 상태에서도 발생했다.

**수정 제안:** 카메라 변환의 역변환으로 화면이 차지하는 하늘 좌표 범위를 구해 필요한 타일 수를 동적으로 그린다. 줌 최솟값과 좌우 최대 이동을 함께 검사한다. 별도로 현재 하늘은 `z^0.6`, 세로는 별도의 `vz`, 바다는 고정 화면 폭으로 그려져 §4의 “같은 카메라로 함께 멀어짐”과 다르다. 배경 패럴랙스를 유지하더라도 여백·수평선·구름 비율이 깨지지 않도록 정책을 명시해야 한다.

### 8. [P2 · B/D] 생물은 펄떡이는데 낚싯줄 끝은 같은 변환을 따르지 않는다

**위치:** [src/render.js:425–456](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/render.js#L425-L456), [src/render.js:555–560](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/render.js#L555-L560), [src/game.js:598–603](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L598-L603), [src/game.js:675–677](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L675-L677). 기준: [GAME_DESIGN.md:52](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L52).

**문제:** 생물 렌더링은 `flopStep()`의 회전·상하 이동·확대와 등장 순간의 팽창을 적용한다. 줄 끝은 이것을 적용하지 않은 `c.mx/c.my` 또는 기본 `c.rot`로 계산한다. 결과 화면에서 줄이 실제 입을 따라 움직이지 않는다. 모든 종에 동일한 폭 42% 지점을 입으로 쓰는 것도 둥근 종·긴 코가 있는 종에서 어긋날 수 있다.

**수정 제안:** 생물의 최종 위치·회전·크기 변환을 공용 함수로 만들고 입 앵커에도 똑같이 적용한다. 스프라이트별 정규화된 입 위치를 데이터에 둔다. 그림자를 올리는 단계와 도트로 바뀐 단계 모두 같은 앵커 경로로 연결한다.

### 9. [P2 · A/E] 에셋을 한 번 못 받으면 연결이 회복돼도 같은 세션에서 다시 받지 않는다

**위치:** [src/assets.js:143–169](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/assets.js#L143-L169), [src/assets.js:188–194](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/assets.js#L188-L194), [src/render.js:124–126](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/render.js#L124-L126), [src/render.js:446–456](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/render.js#L446-L456).

**문제:** 실패한 이미지 Promise와 `pending`을 캐시에 계속 보관한다. 생물 렌더링은 대체 체형을 돌려주는 `creatureSprite()`가 아니라 `sprite()`를 직접 호출하므로, 실패하면 투명한 `EMPTY`가 나온다.

**재현:** 첫 `d_atlas.png` 요청만 차단하고 `d_hammer_shark`를 미리 읽었다. 차단을 해제하고 다시 미리 읽어도 `hasSprite('d_hammer_shark')`는 계속 `false`였다. 같은 아틀라스의 다른 생물에도 영향을 줄 수 있다. 이는 검사를 위해 네트워크 실패를 주입한 결과이며 정상 로딩에서 파일이 없었던 것은 아니다.

**수정 제안:** 실패 시 두 캐시 항목을 제거하고 제한된 재시도를 허용한다. 성공 여부를 호출자에 전달하고, 아직 못 받은 생물은 준비된 대체 그림으로 표시한다. 핵심 UI 아틀라스 실패는 재시도 안내를 띄운다.

### 10. [P2 · B/C] 멀리 던지는 보상은 없고 시간 비용만 늘어난다. 입질도 전부 같다

**위치:** [src/creatures.js:54–79](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/creatures.js#L54-L79), [src/game.js:355](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L355), [src/game.js:375](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L375), [src/game.js:425–426](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L425-L426). 기준: [GAME_DESIGN.md:85](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L85), [GAME_DESIGN.md:159–169](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L159-L169).

**문제:** 추첨 함수에는 등급 강제값과 해역만 전달한다. 캐스팅 거리는 희귀 확률에 영향을 주지 않지만 대기 시간과 파이팅 초기 거리 `30+50×power`를 늘린다. `bite: 'pull'`도 모든 생물에 고정되어 있어 기존 `tok` 처리 코드조차 실제 데이터 경로에서는 사용되지 않는다.

**시험:** 초기 장비에서 약하게 던지기 40회는 결과 카드까지 평균 18.10초, 최대로 던지기 40회는 28.27초였다. 확률을 같게 유지하면서 약 10초를 더 쓰는 구조다. 표본의 판매액 차이는 확률 효과가 아니라 난수 편차다.

**수정 제안:** 거리별 가중치 변화를 추첨에 연결하거나, 거리 보상을 다른 명시적 효과로 정한다. 종 데이터에 입질 패턴을 저장하고 최소 `tok`/`pull`부터 연결한다. 거리별 실제 시간당 수익을 비교해 가장 약한 던지기만 정답이 되지 않게 한다.

### 11. [P2 · B/D] 배·낚싯대·복장을 사도 실제 플레이 외형은 바뀌지 않는다

**위치:** [src/render.js:480–490](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/render.js#L480-L490), [src/harbor.js:192](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/harbor.js#L192), [src/harbor.js:98](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/harbor.js#L98). 기준: [GAME_DESIGN.md:268–284](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L268-L284).

**문제:** 상점 아이콘은 장비 단계에 따라 바뀌지만 바다에서는 자세 번호로만 `c_boat_1..3`을 고르고 낚싯대는 항상 `c_rod`다. 항구의 내 배도 `c_boat_1` 고정이다. 최고 단계 시험 상태에서도 플레이어의 배는 같은 나룻배였다. 항구의 큰 인물은 상점 주인이며, 내 복장을 확인하는 장비 캐릭터 화면은 없다.

**수정 제안:** 장비 단계와 자세를 별도 키로 분리해 `tier × pose`를 선택한다. 먼저 배 단계 변화와 정박한 배를 연결하고, 옷은 장비 미리보기에서 확인하게 한다. 필요한 그림이 없다면 사용 가능한 단계만 명확히 표시한다.

### 12. [P2 · D] 결과 카드의 이름이 이름 칸 중앙에 맞지 않는다

**위치:** [src/render.js:117–136](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/render.js#L117-L136), `assets/game/ui_big.webp`의 `ui_card_3`, `ui_card_6`.

**문제:** 등급별 카드 모양이 다른데 공통 비율 `ch×0.672`에 이름을 놓는다. 실제 희귀 `개복치` 카드와 환상 `해님가오리` 카드에서 이름이 이름 칸의 위쪽 테두리에 걸쳐 보였다. 글자 자체의 오타와는 별개의 배치 문제다.

**수정 제안:** 카드별 이미지 창·이름 칸·가격 칸의 내부 사각형을 manifest에 정의하고 그 중앙에 글자를 놓는다. 가장 긴 생물 이름과 모든 6등급 카드로 실제 크기에서 확인한다.

### 13. [P2 · E] 첫 화면 전에 약 25.3 MB, 308개 이미지 파일을 기다린다

**위치:** [src/assets.js:141](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/assets.js#L141), [src/assets.js:172–180](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/assets.js#L172-L180), [src/main.js:28–31](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/main.js#L28-L31), `assets/game/manifest.json`.

**문제:** 생물 이름을 제외한 manifest 전체를 한 번에 읽고 `Promise.all`이 끝나야 게임을 만든다. 중복 파일을 제거해도 현재 비생물 이미지가 **308개, 25,280,294바이트**다. 아직 쓰지 않는 장비·웹·기존 UI 계열도 포함된다. 느린 연결에서 플레이어는 진행률이나 재시도 안내 없이 빈 화면을 기다릴 수 있다. 이 숫자는 파일 합계이며 실제 네트워크 전송 시간 측정값은 아니다.

**수정 제안:** 첫 해역·기본 UI만 시작 묶음으로 읽고, 항구·다음 해역·나머지 장비는 필요 시 로드한다. 시작 묶음에 진행률과 실패 처리를 붙인다. 별도로 쓰이지 않는 manifest 항목을 구분한다.

### 14. [P3 · B/E] 지도·현재 상태 안내가 빠져 다음 목표를 찾기 어렵다

**위치:** [src/harbor.js:72–75](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/harbor.js#L72-L75), [src/harbor.js:145–149](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/harbor.js#L145-L149), [src/render.js:638–680](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/render.js#L638-L680), [src/main.js:54–58](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/main.js#L54-L58). 기준: [GAME_DESIGN.md:69–76](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L69-L76), [GAME_DESIGN.md:250](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L250).

**문제:** 지도 버튼은 지도를 열지 않고 열린 해역을 순환한다. 현재 해역 이름은 이동 직후 잠깐만 보이고, 잠긴 해역의 필요 배·마을·도감 조건을 한곳에서 볼 수 없다. 시간대도 자연스럽게 흐르는 시스템이 아니라 시험 버튼으로 바꾼다. 날씨·미끼 출현 조건은 추첨 함수에 없다.

**수정 제안:** 우선 8개 해역의 선택 목록과 잠금 조건, 현재 해역명을 표시한다. 이동 후 어떤 목표를 달성해야 하는지 시청·조선소로 연결한다. 시간대·날씨·미끼는 실제 기능으로 연결한 뒤 HUD에 표시한다. 미구현 조건을 가능한 전략처럼 안내하지 않는다.

### 15. [P3 · D] 일부 해역의 수중 그림과 수면 띠가 컨셉의 깊이·광원 규칙에서 벗어난다

**위치:** `assets/game/c_sea_2.webp`, `assets/game/c_sea_6.webp`, [src/render.js:252–256](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/render.js#L252-L256), [src/render.js:285](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/render.js#L285), [src/render.js:289–299](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/render.js#L289-L299). 비교: `assets/concept/concept_1.png`, `concept_2.png`, `concept_3.png`; 기준 [GAME_DESIGN.md:28](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L28), [GAME_DESIGN.md:51](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L51).

**관찰:** 2번 해역 바닥의 밝은 분홍 산호, 6번 해역 바닥의 주황 용암·지형이 실제 화면에 드러난다. 컨셉의 수중은 바닥을 식별하기 어려운 어두운 단면이다. 또 6번 해역은 붉은 하늘·녹색 수중 사이에 공통 파도를 갈색으로 덮은 얇고 회색빛인 띠가 끼어, 같은 광원으로 이어지는 물보다 세 레이어처럼 보인다. 후자는 시각적 판단이다.

**수정 제안:** 수중 하단의 식별 가능한 장식을 지우거나 대비를 낮춘 실루엣으로 정리한다. 해역별 수면 반사 색을 하늘과 수중 양쪽에서 맞추고, 공통 파도를 단색으로 강하게 덮기보다 밝은 포말과 어두운 물의 색을 분리해 보정한다. 7·8번의 마법빛은 해역 주제로 유지하되 그림자보다 먼저 눈에 띄지 않게 한다.

### 16. [P3 · E] 작은 세로 화면에서는 읽기와 누르기가 매우 어렵다

**위치:** [src/main.js:14–24](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/main.js#L14-L24), [src/harbor.js:21–24](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/harbor.js#L21-L24), [src/harbor.js:114–117](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/harbor.js#L114-L117), [src/render.js:135–137](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/render.js#L135-L137).

**재현:** Chromium 뷰포트를 390×844로 바꾸면 게임 캔버스는 390×219가 된다. 9px 논리 글자는 약 5.5 CSS px, 바다 버튼의 그림 지름 34는 약 20.7 CSS px가 된다. 위아래 여백은 크지만 안내와 조작 대상은 작다. 실제 휴대폰의 터치감은 검사하지 않았다.

**수정 제안:** 가로 화면 사용을 명확히 안내하거나, 작은 화면에서는 HUD·텍스트·입력 영역을 게임 월드와 분리해 최소 크기를 보장한다. 특히 항구·지도·닫기 버튼의 입력 영역을 충분히 키운다.

## C. 경제 수치와 구매 간격

### 기존 계산기를 그대로 재현한 결과

`tools/sim_economy.py`를 모듈로 읽고 `START_CUT=0.3`, `plan(4, 6, 22.5, 131520)`을 호출했다. 결과는 **3.0000시간, 656회 구매, 평균 16.46초/구매**였다. 이것은 계산기의 결과이며 현재 게임 전체를 3시간 플레이한 결과가 아니다.

| 전환 | 계산기 소요 시간 | 구매 수 | 평균 초/구매 |
|---|---:|---:|---:|
| 1→2 | 23.03분 | 83 | 16.65 |
| 2→3 | 31.68분 | 109 | 17.44 |
| 3→4 | 24.27분 | 109 | 13.36 |
| 4→5 | 26.47분 | 86 | 18.47 |
| 5→6 | 21.86분 | 108 | 12.14 |
| 6→7 | 22.33분 | 87 | 15.40 |
| 7→8 | 30.36분 | 74 | 24.61 |

계산기 안에서도 2→3, 7→8은 30분을 넘고, 마지막 구간의 구매 간격은 약 25초다. 더 큰 문제는 아래 차이들이다.

| 위치 | 계산기와 현재 게임의 차이 | 구체적 수정 |
|---|---|---|
| [tools/sim_economy.py:16–18](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/tools/sim_economy.py#L16-L18), [tools/sim_economy.py:138–154](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/tools/sim_economy.py#L138-L154) | 힘 비율로 만든 가상 성공률을 쓴다. 실제 게임은 장력·입력·파이팅 모드로 성공 여부를 정하고 힘에 6 상한도 있다. | 실제 상태 머신으로 실력별 입력 정책을 돌려 성공률·시간 분포를 수집한다. |
| [tools/sim_economy.py:146](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/tools/sim_economy.py#L146) | 릴과 손놀림으로 시간 전체를 최대 약 6.67배 빠르게 만든다. 게임 총속도는 3.3배 상한이고 연출·헤엄 이동 전체가 그만큼 단축되지 않는다. | 실제 `speedMult()`와 단계별 소요 시간을 공유한다. |
| [tools/sim_economy.py:145](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/tools/sim_economy.py#L145), [tools/sim_economy.py:156–180](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/tools/sim_economy.py#L156-L180) | 장비에 예산 100%를 쓰고 시청·가게·길드 상한·도감 문턱이 없다. 시장/마을의 판매 보너스도 없다. | 현재의 10%/20%/70% 예산 및 해금 조건을 사용한다. |
| [tools/sim_economy.py:176](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/tools/sim_economy.py#L176) | 초당 수익을 연속적으로 받고 바로 구매한다. 실제 골드는 항구 판매 때만 들어온다. | 어창·귀항·일괄 구매를 사건 단위로 시뮬레이션한다. |
| [tools/sim_economy.py:180](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/tools/sim_economy.py#L180) | 줄·낚싯대·배를 모두 강화해야 다음 해역으로 간다고 가정한다. 실제 해역 선택은 배 기준이다. | 필수 구매와 선택 구매를 분리하고 저비용 진행 경로도 비교한다. |
| [tools/sim_economy.py:160](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/tools/sim_economy.py#L160) | 8번 해역에 들어가면 끝난다. 8번 해역 자체의 20~30분 플레이·완료 목표는 계산하지 않는다. | “한 바퀴 완료”의 기준을 정해 마지막 해역도 별도 측정한다. |

**판정:** 현재 구현이 해역마다 20~30분이라고 확인할 근거는 부족하며, 상한 이후의 무효 강화와 장비 벽 약화는 이미 그 목표와 충돌한다. 예전 계산기의 평균을 현재 밸런스 합격 근거로 사용하면 안 된다.

### 실제 상태 머신에서 관찰한 낚시 시간

각 조건 40회. 60Hz 자동 입력으로 입질 가능 즉시 챔질하고, 장력이 높거나 날뛰면 풀고 낮아지면 감았다. 수동 클릭의 반응 지연, 힘 게이지 충전 시간, 결과 확인·적재·귀항 시간은 아래 시간에 포함하지 않았다. 난수 표본이 작으므로 정밀한 전체 경제 예측이 아니다.

| 조건 | 대기 평균 | 파이팅 평균 | 던짐 시작→결과 카드 평균 |
|---|---:|---:|---:|
| 초기 장비, 중간 거리 | 5.83초 | 10.71초 | 23.45초 |
| 장비 강화 23, 손놀림 33, 1번 해역, 중간 거리 | 5.20초 | 2.01초 | 13.99초 |
| 초기 장비, 가장 가까운 거리 | 5.85초 | 5.41초 | 18.10초 |
| 초기 장비, 가장 먼 거리 | 6.02초 | 15.49초 | 28.27초 |

속도를 올려도 대기 움직임과 획득 연출이 남는다. 계산기의 “30초를 통째로 속도 배율로 나누기”와 다른 점이다. 정상 구매 템포를 판단하려면 최종 결과 카드 클릭까지 포함하고, **평균 구매 간격뿐 아니라 첫 구매 시간·중앙값·최장 무구매 시간**도 기록해야 한다.

### 비싸거나 약하거나 설명이 부족한 구매

**근거:** [src/economy.js:6–8](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/economy.js#L6-L8), [src/economy.js:19](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/economy.js#L19), [src/economy.js:41–86](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/economy.js#L41-L86), [src/harbor.js:80](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/harbor.js#L80).

| 항목 | 수치/문제 | 권장 조정 |
|---|---|---|
| 손놀림 34 이상·상한 이후 릴 | 지출해도 효과 0. 발견 3 참조. | 즉시 판매 중단 또는 실제 후속 효과 설계. |
| 첫 수산시장 승급 | 1,579 G에 판매가 +3%. 같은 수입 조건에서 약 52,633 G의 기존 매출이 있어야 비용 회수. 첫 복장 강화는 102 G에 약 +2.257%, 첫 흥정은 119 G에 +2%여서 초반 효율 차이가 크다. | 초반 시장 가격·효과를 재검토하거나 시장만의 명확한 가치를 보여준다. 장기 고해역 수입까지 포함하면 회수되므로 영구히 쓸모없다는 뜻은 아니다. |
| 배 +1~+9 | 해역·어창은 `floor(boat/10)` 기준이어서 중간 강화에는 즉시 효과가 없다. 설명은 매번 `어창 +2 · 다음 해역`이다. | `다음 단계까지 3/10, 10/10에서 어창+2·해역 해금`처럼 누적 진행과 보상 시점을 표시한다. |
| 첫 전환 이후 가격 | 1→2 예산 39,456 G, 2→3 예산 2,959,200 G로 **75배**다. 그 뒤는 22.5배. 첫 구간 30% 할인 해제가 원인이다. | 의도된 할인이라도 2번 해역의 수입·스킬·길드 문턱을 따로 검증한다. “매번 22.5배”라는 설명만으로 넘어가지 않는다. |
| 필수 진행 비용과 한 벌 비용 | 첫 단계 전체 비용은 올림 포함 39,491 G. 시청+조선소+배 10회만의 해금 비용은 13,817 G다. 도구·시장·복장·길드를 모두 사야 하는 구조가 아니다. | 전체 세트 구매를 전제로 시간을 맞추지 말고 필수 경로와 선택 경로를 함께 계산한다. |
| 매출이 전설에 집중 | 초기 기대액 500.4 G 중 전설 기여는 252 G, **50.36%**다. 전설 확률은 3.5%. 일반 50%는 28~80 G 수준이라 첫 최저 장비 102 G도 한 마리로 못 산다. | 드문 큰 보상은 유지하되, 일반 어획에서도 작은 구매가 이어지는지 별도 검증한다. 평균 16초만 맞추면 긴 정체 구간이 숨겨진다. |

예산 분할(시청 10%+가게 20%+장비 70%) 자체는 코드에 반영되어 있다. 각 비용을 올림해서 생긴 첫 전환의 35 G 차이는 중대한 오류가 아니다. 후반의 매우 큰 가격도 수입 배율을 함께 봐야 하므로 숫자가 크다는 이유만으로 과도하다고 판정하지 않았다.

## D. 아트 전체 확인 결과

컨셉 1~3은 따뜻한 구름·작은 배·옆에서 본 수면·어두운 수중·거대한 어획의 대비가 기준이다. **최신 기획은 생물만 단순한 도트로 바꾸었다.** 따라서 `d_atlas.png`를 컨셉의 사실적인 고래처럼 세밀하게 다시 그리거나 도트 수를 늘리는 것은 이번 검토의 수정 제안이 아니다. 귀여움과 완성도는 기존 해상도 안에서 종별 윤곽·눈 위치·표정의 읽힘으로 다듬는 것이 맞다.

| 확인한 이미지 | 컨셉과의 일관성 및 조치 |
|---|---|
| `assets/game/h_atlas.webp` | 금속·목재·NPC가 항구의 동화풍과 대체로 이어진다. 작은 골드/어창 HUD의 금테·반짝임은 차분한 대기 화면보다 강하다. 이는 취향/강조의 문제이며 P1 버그가 아니다. 대기 HUD의 크기·명도만 한 단계 낮추고 보상 순간의 강조를 유지하는 방향을 권한다. |
| `assets/game/h_panel.webp` | 양피지·로프·목재 재질은 항구와 잘 맞는다. 그림 자체의 교체보다 버튼 상태·가격·효과 설명의 연결을 우선한다. |
| `assets/game/h_shops.webp` | 5단계의 가게·시청이 마을 발전을 읽히게 한다. 상위 단계의 진한 금색 장식이 컨셉보다 강하지만 발전 보상이라는 맥락이 있다. 배경과 함께 보여주는 현재 방향은 유지할 수 있다. |
| `assets/game/ui_big.webp` | 등급별 카드·현판은 잡은 뒤의 과장된 보상에 적합하다. 이름 배치 오류는 발견 12대로 수정한다. 대기 화면까지 이 장식 밀도를 확대할 필요는 없다. |
| `assets/game/d_atlas.png` | 350종의 평소/놀람 도트 표현은 최신 §4와 맞는다. 거친 도트 자체를 미술 불일치로 판정하지 않는다. 확대 시 눈·입과 낚싯줄 앵커의 관계는 발견 8대로 고친다. |
| `assets/game/h_town_1.webp`, `h_town_2.webp`, `h_town_3.webp`, `h_town_4.webp`, `h_town_5.webp` | 구름·부두 구도와 조명이 이어지고 성장 단계가 명확하다. 초기의 작은 어촌에서 마지막 축제 항구로의 변화가 읽힌다. 1~2/3~4/5~6/7/8 마을 등급 매핑도 기획과 같다. |
| `assets/game/c_sky_2.webp`, `c_sea_2.webp` | 열대의 청록·분홍은 기존 팔레트에서 자연스럽다. 수중 산호 노출은 발견 15 참조. |
| `assets/game/c_sky_3.webp`, `c_sea_3.webp` | 낮은 채도와 안개가 해역 차이를 만든다. 안개 지역이라는 이유만으로 동화풍 불일치로 보지 않는다. |
| `assets/game/c_sky_4.webp`, `c_sea_4.webp` | 열린 수평선·깊은 파랑이 원양을 전달하며 컨셉과 잘 이어진다. |
| `assets/game/c_sky_5.webp`, `c_sea_5.webp` | 오로라·빙산·차가운 수중 색이 같은 구름 표현과 공존한다. 배경을 다시 제작해야 할 명확한 오류는 발견하지 못했다. |
| `assets/game/c_sky_6.webp`, `c_sea_6.webp` | 화산의 붉은 하늘 자체는 주제에 맞는다. 합성 수면의 색 연결과 하단 지형은 발견 15 참조. |
| `assets/game/c_sky_7.webp`, `c_sea_7.webp` | 심연의 밤·보라색 수중 표현은 의도에 맞지만 작은 밝은 별점은 수중 그림자와 경쟁할 수 있다. 실제 플레이에서 그림자 대비를 우선해 광점 명도를 조정할 수 있다. |
| `assets/game/c_sky_8.webp`, `c_sea_8.webp` | 떠 있는 섬·큰 달·금빛 반짝임이 마지막 환상 해역을 분명히 구분한다. 큰 생물 카메라의 빈 띠는 원본 그림 문제가 아니라 발견 7의 합성 문제다. |
| `assets/concept/concept_1.png`, `concept_2.png`, `concept_3.png` | 대기→파이팅→획득의 화면 대비와 공간 규모를 비교하는 기준으로 사용했다. 생물 표현은 최신 기획 변경을 반영해서 비교했다. |

**이미지 속 한글:** 실제 쓰는 등급별 `낚았다!` 현판 6종과 `첫 포획`·`신기록` 도장을 육안 확인했으며, 확정할 수 있는 철자 오류는 발견하지 못했다. 이미지 문구의 오타를 추정해서 적지는 않았다. 상점명·가격·생물 이름은 상당 부분 코드로 얹는 텍스트다. 결과 카드 이름 위치 오류와 글자 가독성 문제는 철자 오류와 구분해야 한다.

추가로 [src/render.js:545–546](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/render.js#L545-L546)의 낚싯줄은 밝은 선과 같은 색 번짐만 그리며, [GAME_DESIGN.md:121](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L121)의 **짙은 남색 테두리**는 없다. 밝은 구름·포말과 겹치는 구간에서 선이 약해진다. 얇은 남색 바깥 선을 먼저 그리고 크림색 중심선을 얹어 컨셉의 연결감을 유지하는 것을 권한다.

## B. 요청한 핵심 규칙 중 정상인 부분

| 규칙 | 확인 결과와 근거 |
|---|---|
| 시청→가게→장비→다음 해역 | [src/economy.js:54](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/economy.js#L54), [src/economy.js:65](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/economy.js#L65), [src/economy.js:78–99](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/economy.js#L78-L99), [src/harbor.js:72–75](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/harbor.js#L72-L75). 배 강화 9에서 조선소 Lv.1이면 다음 단계 구매 실패. 시청 Lv.2→조선소 Lv.2→배 강화 10 순서로 구매한 뒤에만 해역 2가 열린다. 돈 부족 구매도 실패했다. 일반 UI로 필수 비용 없이 잠긴 해역을 여는 경로는 찾지 못했다. |
| 마을 4등급부터 도감 필요 | 마을 3→4에서 기록 수가 부족하면 실패, 40종을 채우면 성공. 조건 구현은 맞고, 도감 UI가 빠진 것이 문제다. |
| 그림자가 모두 같은 크기 | [src/config.js:15](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/config.js#L15), [src/game.js:360–372](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L360-L372). 종·등급과 관계없이 `SHADOW_LEN=400`을 사용한다. |
| 그림자가 돌아서지 않음 | [src/swim.js:48–52](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/swim.js#L48-L52). 현재 방향을 유지하며 전진/후진한다. 이전 기획 문구의 “돌아서기”를 복구할 필요는 없다. |
| 잡은 뒤 가까이서 시작해 물러나는 카메라 | [src/game.js:567–581](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L567-L581), [src/game.js:325–333](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L325-L333). 실제 희귀 어획에서 줌 약 2.48→0.45로 물러나는 것을 확인했다. 기능 부재가 아니라 발견 7의 배경 커버리지와 발견 8의 앵커 문제다. |
| 판매는 항구에서만 | [src/game.js:150](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/game.js#L150), [src/harbor.js:56–67](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/harbor.js#L56-L67). 결과 클릭은 어창 적재만 하고, 항구 진입에서 골드 증가 후 어창을 비운다. 123 G 시험 어획을 팔고 재입항해도 골드는 123 G 그대로였다. 반복 판매 복제는 재현되지 않았다. |
| 스킬은 바다에서도 구매 | [src/harbor.js:90](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/harbor.js#L90), [src/harbor.js:148](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/harbor.js#L148). 최신 기획에 허용된 동작이므로 항구 제한 우회 버그가 아니다. |

**문서 정리 필요:** [CLAUDE.md:11](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/CLAUDE.md#L11)과 [GAME_DESIGN.md:153](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L153)의 돌아서기 설명은 [GAME_DESIGN.md:147](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L147)과 충돌한다. 배 위치 60~65%라는 옛 문구도 최신 컨셉과 다르다. 또한 [GAME_DESIGN.md:220](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L220), [GAME_DESIGN.md:244](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L244)의 보스 해금 조건은 코드에 없고 최신 마을 사슬 설명에는 반복되지 않는다. 보스 조건을 현재 필수로 볼 것인지 먼저 기획서에서 단일화해야 한다. 이번 보고서는 이 충돌을 곧바로 “공짜 해역 우회”라고 판정하지 않았다.

## E. 플레이어가 먼저 느낄 빈자리

1. **첫 진입:** 로딩 상태와 재시도 안내가 없다 — 발견 13. 첫 바다에서 현재 해역과 다음 목표를 확인할 곳도 약하다 — 발견 14.
2. **첫 구매:** 구체적으로 얼마 좋아지는지, 배 강화 보상이 언제 생기는지 읽기 어렵다 — 발견 3 및 경제 표. 장비가 바뀐 모습을 볼 수 없다 — 발견 11.
3. **희귀 어획:** 결과 화면에서 종료하면 보상이 사라진다 — 발견 1. 큰 어획일수록 빈 하늘과 줄 연결 오류가 눈에 띈다 — 발견 7·8.
4. **첫 환상종:** 증표를 받았다고 생각하지만 확인하거나 효과를 누릴 수 없다 — 발견 4.
5. **마을 4등급 진입:** 도감 조건을 채우는 계획을 세울 화면이 없다 — 발견 6. 지도에서 특정 해역을 직접 고를 수도 없다 — 발견 14.

오디오도 [src/audio.js:132–151](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/src/audio.js#L132-L151)에서는 한 개의 햇살 연안 반복 테마만 선택한다. [GAME_DESIGN.md:442](https://github.com/kelsnity86-arch/FISHIIIIG/blob/00344b31a3ff64025d5826f20008f3439c7a7b54/GAME_DESIGN.md#L442)의 해역별·시간대별 음악 변주는 아직 연결되지 않았다. 수정한다면 해역/시간 변경 이벤트에 테마를 연결하고 전환 시 크로스페이드를 적용한다. 다만 이번 검토에서 실제 소리를 청취하지 않았으므로 음질·피로도·믹싱 평가는 하지 않았다.

## 검사 범위와 한계

- **할 수 있었던 것:** 로컬 Chromium 실행, 실제 모듈로 낚시 진행·구매·판매·저장 복원 검사, 결과·카메라 캡처, 8개 해역과 마을 단계 화면 확인, 요청 이미지 전체 육안 확인, 경제 계산기 재현, 단일 이미지 요청 실패 후 복구 검사.
- **하지 못한 것:** 사람 손으로 처음부터 마지막 해역까지 수 시간 연속 플레이, 다양한 실력·구매 성향의 장기 통계, 실제 휴대폰·Safari·Firefox 검증, 실제 배포 서버의 지연/캐시/압축 측정, 실제 오디오 청취. 60fps 성능을 모든 장치에서 보장한다고 판단하지 않았다.
- 새로고침 손실과 무효 강화, 하늘 빈 띠, 재시도 실패는 재현했다. 정상 입력에서의 즉시 크래시·판매 골드 복제·필수 해금 비용 무시 버그는 이번 범위에서 발견하지 못했다. **발견하지 못함은 모든 경로에 문제가 없다는 보증이 아니다.**
- 경제 시간 표 중 3시간/656회는 기존 Python 모델, 낚시 시간 표는 실제 상태 머신의 자동 입력 표본이다. 둘을 실제 유저의 완주 시간으로 혼동하지 않아야 한다.

수정 우선순서는 **보상 저장과 테스트 경제 분리 → 무효 구매 차단 → 환상종 보상·도감 연결 → 실제 루프 기반 경제 재계산 → 카메라·줄·카드 배치 → 첫 로딩과 작은 화면 사용성**을 권한다.

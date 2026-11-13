# 동화책 항구와 UI

사용자가 승인한 동화책 시안을 기존 게임 화면 전체에 맞춘 원화다. 기준 게임 커밋은 `87a8358c0202c3b511c5e3601502b164085b3946`이다. 기존 게임 그림을 참조하여 이미지 생성 도구로 제작했다. 인간 화가가 그린 원화라는 뜻은 아니다.

크림빛 종이, 따뜻한 나무, 푸른 바다와 분홍 구름을 유지한다. 큰 금장과 반복 장식을 줄이고, NPC의 표정과 직업 소품, 건물의 역할, 글자를 읽는 여백을 우선했다. 생물의 도트 수, 바다 배경, 낚기 연출, 성장 수치와 저장 형식은 이 작업에서 바꾸지 않았다.

## 구성

29개 PNG에서 182개 그림을 등록한다. 원본 PNG에는 글자를 넣지 않고 게임이 한국어·영어를 그린다.

| 원화 | 내용 |
| --- | --- |
| `npc.png`, `shop_marks.png` | 주인 6명과 가게 상징 6개 |
| `shops_1.png` ~ `shops_5.png` | 5단계 × 6가게, 총 30개 |
| `town_1.png` ~ `town_5.png` | 항구 배경 5단계 |
| `boats.png`, `boats_mid.png`, `boats_high.png` | 항구에 매어 둔 배 9단계. 중·후반 배는 크게 그린 원화 사용 |
| `panel.png`, `components.png`, `signs.png` | 공통 판, 줄, 버튼, 간판 |
| `hud.png`, `settings.png`, `skills.png` | HUD, 설정, 기술 아이콘 |
| `gear_a.png`, `gear_b.png` | 장비 5종 × 8단계 |
| `cards.png`, `dex_parts.png` | 결과 카드 7등급, 도감 칸·테두리·화살표·대화판 |
| `book.png`, `book_locked.png` | 태초 해금 후/전 도감 책 |
| `map.png`, `map_pins.png` | 해도와 해역 표식 |

## 다시 묶기

저장소 루트에서 Python 3, Pillow, NumPy로 실행한다.

```sh
python3 tools/slice_storybook.py
```

`layout.json`은 각 원화의 행·열, 읽는 순서와 기존 논리 크기를 담는다. 도구는 투명 여백을 자르고 묶음 그림에 배치한다. 큰 조각은 최대 1600px로 축소하고 WebP 품질 92로 저장한다. 원화 PNG는 그대로 보관한다. 결과는 `assets/game/storybook_*.webp`와 `assets/game/manifest.json`이다.

기존 `slice_ui.py`, `slice_port.py`, `slice_set.py`, `slice_gear.py` 등을 다시 실행했으면 **이 도구를 마지막에 실행**한다. 게임용 파일도 함께 커밋되어 있으므로 평소 실행·배포에는 Python이 필요 없다.

크기·원점·물에 닿는 위치 등 기존 메타데이터는 보존한다. 책 꼬리표와 지도 항로 점은 새 원화에서 재측정하여 `src/book.js`에, 결과 카드의 투명 창은 `src/render.js`에 등록했다. 책의 가로·세로 확대율은 따로 계산한다.

## 확인

```sh
python3 -m http.server 8770
# 다른 터미널에서 Playwright가 설치된 환경으로 실행
URL=http://localhost:8770 OUT=/tmp/hori-storybook-audit node tools/audit_storybook.cjs
npm run www
```

필요하면 `PLAYWRIGHT_MODULE`과 `CHROMIUM` 환경 변수로 설치 경로를 지정한다. 검사 스크립트는 새 브라우저의 임시 저장만 사용한다. 구매/차감, 구매 거절, 6개 가게, 설정, 지도 9개 해역, 미해금 지역, 도감 해금 전후, 모바일 비율을 확인하고 화면 사진과 `report.json`을 남긴다. 수동 화면 검수도 함께 해야 한다. Android 실기기와 장시간 성능은 별도 확인 대상이다.

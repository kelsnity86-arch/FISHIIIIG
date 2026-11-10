# GPT 복사용 프롬프트 모음

> [`ASSET_SPEC.md`](ASSET_SPEC.md)의 89장을 **그대로 복사해 붙여 넣을 수 있게** 풀어 쓴 문서.
> 규격·배치의 근거는 `ASSET_SPEC.md`에 있다.

## 쓰는 법

1. **한 번에 한 장씩** 요청한다.
2. 매 요청마다 `style_palette.png`와 `style_key.png`를 **첨부**한다. (①, ②는 예외)
3. **[공통 문구] + 해당 항목의 프롬프트**를 이어 붙여 보낸다.
4. 결과를 **굵은 파일명**으로 저장해 `assets/raw/`에 넣는다. 크기는 맞추지 않아도 된다.
5. 잘못 나오면 짧게 고쳐 달라고 한다: "4개만", "글자 없이", "서로 더 띄워서", "몸을 곧게".
6. 투명 배경이 안 되면 공통 문구의 `fully transparent background`를 `solid magenta (#FF00FF) background`로 바꾼다.

### [공통 문구]
```
16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the attached palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the attached reference image.
```

### [배경용 공통 문구] (화면 전체를 채우는 배경 그림에만)
```
16-bit pixel art game background, cute warm storybook style, chunky clean pixels, soft pastel
palette matching the attached palette image, no anti-aliasing, no text or letters, 16:9 wide.
Match the style of the attached reference image.
```

---

## ① 스타일 기준 (2장, 공통 문구 없이)

**`style_palette`** (첨부 없음)
```
Create a pixel art color palette image: a clean 8x4 grid of 32 flat color swatches on a
white background, no text, no labels. Soft warm pastel storybook colors for a cozy fishing
game: 6 sea blues (light to deep), 4 sky colors, 4 wood browns, 3 greens, 3 pinks/reds,
3 yellows/oranges, 3 purples, 5 neutrals from white to very dark navy, and 1 cream (#FFF4DC).
```

**`style_key`** (팔레트 첨부)
```
Using only the colors of the attached palette, create a 16-bit pixel art scene, cute warm
storybook style, chunky clean pixels, 1px dark outline, no anti-aliasing, no text.
Wide side view of a vast calm sunny sea. The sea and sky fill almost the entire image.
At the right side, a very small wooden rowboat, only about 5% of the image width. On it,
a tiny dark navy silhouette of a fisherman, just a few pixels tall, no face, no details.
A long thin fishing rod points left, with a very thin light cream fishing line reaching a
small float on the water at the left side. On the horizon: low green hills and a small white
lighthouse. A few fluffy pink-tinted clouds.
```

---

## ② 시험 제작 (3장) — 여기까지 만들고 게임에 넣어 확인한 뒤 나머지 진행

**`boat_a`**
```
A sprite sheet of 4 boats in a 2x2 grid, evenly spaced, not touching. Flat side view, bow
pointing left, hull drawn fully including the part below the waterline, no people, no water.
In order: 1) small wooden rowboat, 2) small motor fishing boat, 3) small fishing trawler,
4) small sailboat with one sail. Each one slightly larger than the previous.
```

**`fish_s1`** → §④ 소형 체형 표의 첫 줄

**`char_body`**
```
A sprite sheet of 8 chibi fisherman bodies from the neck down (torso, arms, legs, no head),
front view, standing straight, identical body shape, pose and neck position, in a 4x2 grid,
evenly spaced, not touching. Each wears a different outfit, in order: 1) worn-out shirt,
2) fisherman vest, 3) yellow raincoat, 4) sailor uniform, 5) winter parka, 6) heat-proof
work suit, 7) deep-sea diving suit, 8) starry cape.
```

---

## ③ 캐릭터 · 배 · 낚싯대 · 찌 (4장)

**`char_head`**
```
A sprite sheet of 10 items in a 5x2 grid, evenly spaced, not touching, in order:
1) a chibi fisherman head, front view, smiling, no hat, no body.
2-9) eight hats alone with no head, sized to fit that head: straw hat, brimmed fishing hat,
yellow rain hood, sailor cap, fur winter hat, goggle helmet, round brass diving helmet,
golden star crown.
10) a tiny solid dark navy silhouette of a seated fisherman seen from the side, facing left,
no fishing rod, no face, no details.
```

**`boat_b`**
```
A sprite sheet of 4 boats in a 2x2 grid, evenly spaced, not touching. Flat side view, bow
pointing left, hull drawn fully including the part below the waterline, no people, no water.
In order: 1) sturdy icebreaker ship, 2) ironclad steamship with a smokestack, 3) deep-sea
research vessel with a crane, 4) magical fantasy ship with a glowing starry sail.
Each one slightly larger than the previous.
```

**`rod`**
```
A sprite sheet of 8 fishing rods stacked in 8 horizontal rows, evenly spaced, not touching.
Each rod is perfectly straight and perfectly horizontal, tip on the left, handle on the right,
with a small reel near the handle, no fishing line. Drawn thick and clear.
From top to bottom: 1) bamboo, 2) wood, 3) white-blue fiberglass, 4) black carbon,
5) ice crystal, 6) black iron, 7) glowing teal deep-sea, 8) golden starlight.
```

**`float`**
```
A sprite sheet of 8 fishing floats (bobbers) in one row, evenly spaced, not touching, each
standing upright. Same materials in order: 1) bamboo, 2) wood with red top, 3) white-blue
fiberglass, 4) black carbon, 5) ice crystal, 6) black iron, 7) glowing teal deep-sea,
8) golden starlight.
```

---

## ④ 기본 체형 (16장)

체형은 **파란 계열 + 흰 배, 무늬 없이, 몸을 곧게 편 옆모습, 왼쪽을 봄.** (색·무늬는 코드가 바꾼다)

### 소형 체형 (4장) — 한 장에 4마리

```
A sprite sheet of 4 sea creature body sprites in a 2x2 grid, evenly spaced, not touching.
Each fills a 2:1 wide area, flat side view facing left, body straight (not curved or bent).
Colored only in one blue hue family with a white belly, no patterns, no markings.
Drawn with rich detail because it will be shown very large. In order: [아래 표의 내용]
```

| 파일명 | [ ] 에 넣을 내용 |
|---|---|
| **`fish_s1`** | 1) mackerel shape (streamlined), 2) anchovy shape (thin and long), 3) sea bream shape (tall and round), 4) flounder shape (flat) |
| **`fish_s2`** | 1) pufferfish shape (ball), 2) filefish shape (diamond), 3) butterflyfish shape (disc), 4) goby shape (big head) |
| **`fish_s3`** | 1) flying fish shape (wing-like fins), 2) seahorse shape, 3) shrimp shape, 4) crab shape |
| **`fish_s4`** | 1) squid shape, 2) octopus shape, 3) jellyfish shape, 4) starfish shape |

### 대형 체형 (12장) — 한 장에 2마리

```
Two large sea creature body sprites stacked vertically, not touching. Each fills a 2:1 wide
area, flat side view facing left, body straight (not curved or bent). Colored only in one
blue hue family with a white belly, no patterns, no markings. Drawn with rich detail because
it will be shown very large. Top: [위]. Bottom: [아래].
```

| 파일명 | 위 | 아래 |
|---|---|---|
| **`fish_l1`** | tuna shape | shark shape |
| **`fish_l2`** | manta ray shape | eel shape |
| **`fish_l3`** | marlin shape (spear nose) | sawshark shape (saw nose) |
| **`fish_l4`** | ocean sunfish shape | sturgeon shape |
| **`fish_l5`** | whale shape | dolphin shape |
| **`fish_l6`** | anglerfish shape (lantern lure) | coelacanth shape (ancient fish) |
| **`fish_l7`** | giant squid shape | giant octopus shape |
| **`fish_l8`** | sea turtle shape | oarfish shape (long ribbon body) |
| **`fish_l9`** | seal shape | walrus shape (tusks) |
| **`fish_l10`** | manatee shape | narwhal shape (long horn) |
| **`fish_l11`** | sea snake shape | saltwater crocodile shape |
| **`fish_l12`** | plesiosaur shape (long-necked ancient reptile) | ammonite shape |

---

## ⑤ 환상종 (40장) — 한 장에 1마리

환상종은 **고유 색과 무늬를 자유롭게.** 옆모습, 왼쪽을 봄, 몸을 곧게. 사람 모습은 넣지 않는다.

```
One large legendary sea creature sprite filling a 2:1 wide area (3:1 allowed for very long
bodies), flat side view facing left, body straight (not coiled). Majestic and magical but
still cute, not scary, no human features. Drawn with rich detail because it will be shown
filling the whole screen. Creature: [아래 표의 내용]
```

| 파일명 | 이름 | [ ] 에 넣을 내용 |
|---|---|---|
| **`fantasy_01`** | 히포캄푸스 | Hippocampus: front half of a horse with a flowing seaweed mane, back half a fish tail, sunny sea-green and gold |
| **`fantasy_02`** | 카프리콘 | Capricorn sea-goat: front half of a goat with curled horns, back half a fish tail, warm cream and teal |
| **`fantasy_03`** | 문장 바다사자 | Heraldic sea-lion: front half of a lion with a mane, back half a fish tail, golden with blue fins |
| **`fantasy_04`** | 신(蜃) | Shen: a giant clam with its shell slightly open, breathing out a soft mirage cloud with tiny towers inside, pearl and pink |
| **`fantasy_05`** | 해님 붕어 | Sun carp: a round disc-shaped goldfish glowing like the sun, with ray-like fins, orange and yellow |
| **`fantasy_06`** | 마카라 | Makara: a water dragon with an elephant-like trunk, crocodile jaws and a fish tail, emerald and coral pink |
| **`fantasy_07`** | 용궁 거북 | Dragon-palace turtle: a huge sea turtle carrying a tiny ornate palace and coral garden on its shell, jade and red |
| **`fantasy_08`** | 타니와 | Taniwha: a guardian water dragon with spiral carved patterns on its body and a long finned tail, deep green and white |
| **`fantasy_09`** | 무지개 뱀 | Rainbow serpent: a long thick serpent with scales in soft rainbow bands, gentle face |
| **`fantasy_10`** | 진주 대왕조개 | Giant pearl clam: an enormous scalloped clam, open to show a huge glowing pearl, with coral growing on the shell |
| **`fantasy_11`** | 네시 | Nessie: a long-necked lake monster with a round body, four flippers and humps on its back, misty grey-green |
| **`fantasy_12`** | 켈피 | Kelpie: a water horse with a dripping seaweed mane and a fish tail instead of hind legs, dark teal and grey |
| **`fantasy_13`** | 이쿠치 | Ikuchi: an endlessly long smooth eel dripping oil-like droplets, pale grey-blue |
| **`fantasy_14`** | 아방크 | Afanc: a creature with a crocodile body and a broad beaver tail, mossy brown and grey |
| **`fantasy_15`** | 안개 해파리 | Mist jellyfish: a huge translucent jellyfish made of fog with long wispy tentacles, pale grey-blue with soft white glow |
| **`fantasy_16`** | 전설의 흰 고래 | Legendary white whale: a massive pure white sperm whale with old scars and a few broken harpoons, wise eye |
| **`fantasy_17`** | 시 서펀트 | Sea serpent: a long ocean serpent with a crested head and a row of back fins, deep blue and silver |
| **`fantasy_18`** | 곤(鯤) | Kun: a fish as vast as a mountain with huge wing-like fins, tiny clouds and birds around it, deep blue and gold |
| **`fantasy_19`** | 별고래 | Star whale: a whale whose body looks like the night sky, filled with stars and a faint constellation pattern, navy and gold |
| **`fantasy_20`** | 폭풍 청새치 | Storm marlin: a marlin with a lightning-bolt spear nose and a storm-cloud sail fin, dark blue and yellow |
| **`fantasy_21`** | 아스피도켈론 | Aspidochelone: a gigantic turtle with a snowy island, pine trees and a tiny hut on its shell, ice blue and white |
| **`fantasy_22`** | 하프구파 | Hafgufa: a colossal sea beast with an enormous cave-like open mouth and rocky skin that looks like an island, grey-blue |
| **`fantasy_23`** | 아클루트 | Akhlut: a creature that is half wolf, half orca: wolf head and front legs, orca body and tail, black and white |
| **`fantasy_24`** | 얼음 해룡 | Ice sea dragon: a long dragon made of clear ice with crystal spikes and a snowflake frill, pale blue and white |
| **`fantasy_25`** | 수정 일각고래 | Crystal narwhal: a narwhal with a long glowing crystal horn and gem-like spots, lavender and ice blue |
| **`fantasy_26`** | 리바이어던 | Leviathan: a massive armored sea beast with glowing lava cracks between dark scales and smoke from its nostrils, black and orange |
| **`fantasy_27`** | 나마즈 | Namazu: a giant catfish with long whiskers and a big stone resting on its head, earthy brown with cracked-ground patterns |
| **`fantasy_28`** | 모오 | Mo'o: a giant water lizard dragon with glossy black scales, a long tail and tropical flowers along its back |
| **`fantasy_29`** | 흑요석 상어 | Obsidian shark: a shark made of shiny black volcanic glass with sharp facets and glowing orange edges |
| **`fantasy_30`** | 불사조 날치 | Phoenix flying fish: a flying fish with flame feather wings and a long fiery tail, red, orange and gold |
| **`fantasy_31`** | 크라켄 | Kraken: a colossal squid-octopus with a huge mantle, many thick tentacles stretched straight back, deep purple and teal |
| **`fantasy_32`** | 카리브디스 | Charybdis: a giant round sea creature whose mouth is a spiraling whirlpool ringed with teeth, dark teal and violet |
| **`fantasy_33`** | 바케쿠지라 | Bake-kujira: a ghostly whale skeleton, glowing softly, with a few strange fish swimming around it, bone white and pale blue |
| **`fantasy_34`** | 루스카 | Lusca: a creature with the front half of a shark and octopus tentacles as its back half, dark blue and magenta |
| **`fantasy_35`** | 심연 초롱아귀 | Abyssal lantern angler: a huge deep-sea anglerfish with a big glowing lantern lure and glowing dots along its body, dark navy and cyan |
| **`fantasy_36`** | 요르문간드 | Jormungandr: the world serpent, an immense thick serpent with rune-like markings and mountain-ridge scales, dark green and gold |
| **`fantasy_37`** | 용왕 해룡 | Dragon king of the sea: an eastern sea dragon with antlers, long whiskers, a flowing mane and a pearl under its chin, azure and gold |
| **`fantasy_38`** | 용 잉어 | Dragon koi: a golden koi halfway through turning into a dragon, with small horns, whiskers and a dragon tail |
| **`fantasy_39`** | 이무기 | Imugi: a giant hornless proto-dragon serpent with smooth dark blue scales and a pale belly, calm eyes |
| **`fantasy_40`** | 바하무트 | Bahamut: a cosmic fish so vast that a tiny landscape with mountains rests on its back, purple, gold and starlight |

---

## ⑥ 무늬 · 파츠 (2장)

**`fish_pattern`**
```
A sheet of 6 square pattern tiles in a 3x2 grid, evenly spaced. Each tile is a black pattern
on a pure white background that completely fills its square, pixel art. In order:
1) horizontal stripes, 2) vertical stripes, 3) large spots, 4) small dots, 5) net pattern,
6) fish scale pattern.
```
(이 장은 공통 문구에서 `fully transparent background`를 빼고 보낸다)

**`fish_parts`**
```
A sprite sheet of 16 small decorative parts to attach onto fish, in a 4x4 grid, evenly spaced,
not touching. In order: 1) coral horn, 2) coral fin, 3) misty whisker, 4) faded ghostly tail,
5) whale water spout, 6) large sail fin, 7) ice crystal spike, 8) ice tail, 9) glowing lava
crack, 10) flame fin, 11) glowing lantern lure, 12) row of glowing dots, 13) star shard,
14) golden fin, 15) small royal crown, 16) large scar.
```

---

## ⑦ 배경 (10장)

### 해역 풍경 (8장)

```
A very wide horizontal scenery strip for a sea horizon, daytime colors. The bottom edge is a
perfectly flat straight horizon line. Only the scenery is drawn; the sky area above and
around it is fully transparent. No water, no boats. Scenery: [아래 표의 내용]
```

| 파일명 | 해역 | [ ] 에 넣을 내용 |
|---|---|---|
| **`bg_region1`** | 햇살 연안 | low green hills and a small white lighthouse with an orange roof |
| **`bg_region2`** | 산호초 열대 | tropical islands with palm trees and pink coral rocks |
| **`bg_region3`** | 안개 군도 | several layers of hazy grey-blue island silhouettes fading into mist |
| **`bg_region4`** | 원양 대해 | an almost empty open horizon with one tiny distant whale spout and a few low clouds |
| **`bg_region5`** | 극지 빙해 | icebergs and snowy mountains in white and pale blue |
| **`bg_region6`** | 화산 해역 | a smoking volcanic island with orange lava streams, dark rocks |
| **`bg_region7`** | 심연 해구 | sharp black sea stacks with glowing teal moss |
| **`bg_region8`** | 환상의 바다 | floating islands with waterfalls of starlight, purple and gold |

**`bg_cloud`**
```
A sprite sheet of 6 fluffy clouds in a 3x2 grid, evenly spaced, not touching, in different
sizes and shapes, white with a soft pink underside.
```

**`bg_wave`**
```
A sprite sheet of 3 horizontal wave stripe strips stacked in 3 rows, evenly spaced, white.
Each strip can repeat seamlessly left to right. From top to bottom: 1) thin tiny ripples for
the far sea, 2) medium ripples, 3) thick bold ripples for the near sea.
```

---

## ⑧ 이펙트 · 보물상자 (3장)

**`fx_small`**
```
A sprite sheet of 16 small effect sprites in a 4x4 grid, evenly spaced, not touching, mostly
white and light blue. In order: 1) water droplet, 2) small splash, 3) ripple ring, 4) foam
bubbles, 5) rain streak, 6) snowflake, 7) fog puff, 8) lightning bolt, 9) sparkle star,
10) glowing dot, 11) speech bubble containing only an exclamation mark shape, 12) sweat drop,
13) teardrop, 14) music note, 15) heart, 16) volcanic ash flake.
```

**`fx_big`**
```
Two large water effect sprites side by side, not touching, white and light blue:
left) a tall water column bursting upward, right) a wide crown-shaped splash.
```

**`chest`**
```
Two treasure chest sprites side by side, not touching: left) a closed wooden chest with
metal bands and some seaweed on it, right) the same chest open with golden light shining out.
```

---

## ⑨ 해역 지도 (2장)

**`map_bg`** ([배경용 공통 문구] 사용)
```
An old parchment sea chart seen from above: soft blue sea texture with faint wave marks,
a decorative compass rose in one corner, rope border. No islands, no labels, no text.
```

**`map_node`**
```
A sprite sheet of 8 map marker icons in a 4x2 grid, evenly spaced, not touching. In order:
1) lighthouse, 2) palm tree, 3) misty island, 4) whale tail, 5) iceberg, 6) volcano,
7) whirlpool, 8) floating star island.
```

---

## ⑩ UI (3장)

**`ui_frame`**
```
A sprite sheet of 8 UI pieces in a 4x2 grid, evenly spaced, not touching. Harbor style:
wooden planks with rope borders, cream (#FFF4DC) and wood brown (#7A4B2A). The inside of each
frame is a flat single color with decoration only on the border. In order:
1) square panel with rope border and flat cream inside, 2) wide wooden button, 3) wide gauge
frame with an empty inside, 4) plain white ribbon banner, 5) star-shaped badge, 6) diamond-
shaped badge, 7) round medal frame with an empty inside, 8) square picture frame with an
empty inside.
```

**`ui_icon`**
```
A sprite sheet of 32 small game icons in an 8x4 grid, evenly spaced, not touching, each simple
and readable at a tiny size. In order:
Row 1: gold coin, wooden crate, bait worm, book, backpack, gear, anchor, folded map.
Row 2: constellation, X mark, arrow, padlock, speaker with sound waves, muted speaker,
diamond gem, star.
Row 3: dawn sun on the horizon, full sun, sunset sun, crescent moon, clear sky sun, rain cloud,
storm cloud with lightning, fog.
Row 4: snow cloud, fishing rod with circular arrow, coin with circular arrow, hook with
circular arrow, reel with circular arrow, check mark, question mark shape, crown.
```

**`item_icon`**
```
A sprite sheet of 24 item icons in an 8x3 grid, evenly spaced, not touching. In order:
Row 1: 8 fishing reels made of bamboo, wood, white-blue fiberglass, black carbon, ice crystal,
black iron, glowing teal deep-sea, golden starlight.
Row 2: white spool of fishing line, fish scale, pearl, star shard, worm, shrimp, krill,
squid piece.
Row 3: small bait fish, small crab, dough bait ball, feather lure, metal spoon lure,
glowing lure, golden bait, rainbow fantasy bait.
```

---

## ⑪ 2차 — 항구 마을 · 업그레이드 웹 (5장)

**`harbor_bg`** ([배경용 공통 문구] 사용)
```
A cozy harbor town scene, front view: sky, hills with small houses in the back, a wide wooden
pier across the lower part, and calm sea at the bottom with reflections. Leave the pier area
empty: no shop buildings in the foreground, no people, no boats.
```

**`shop_a`**
```
A sprite sheet of 3 small shop buildings in one row, evenly spaced, not touching, front view.
Each has a signboard with a picture instead of text. In order: 1) shipyard (sign: a boat),
2) fishing tackle shop (sign: a fishing rod), 3) float and bait shop (sign: a float).
```

**`shop_b`**
```
A sprite sheet of 3 small shop buildings in one row, evenly spaced, not touching, front view.
Each has a signboard with a picture instead of text. In order: 1) clothing shop (sign: a
shirt), 2) fish market (sign: a fish), 3) fishermen's guild hall (sign: a book).
```

**`npc`**
```
A sprite sheet of 6 chibi shopkeepers in one row, evenly spaced, not touching, front view,
2-head-tall proportions. In order: 1) burly shipwright with a hammer, 2) old fisherman with
a beard, 3) cheerful kid holding a float, 4) stylish tailor with a measuring tape,
5) fishmonger with an apron, 6) wise guild master with a big book.
```

**`web_icon`**
```
A sprite sheet of 18 icons in a 6x3 grid, evenly spaced, not touching, all drawn in a single
flat cream color (#FFF4DC) with no outline. In order:
Row 1: heart-shaped anchor, coin, fishing float, reel, star, compass.
Row 2: gear, large shining star, fast-forward arrows, stack of coins, crate with plus sign,
bait with plus sign.
Row 3: fishing rod with circular arrow, coin with circular arrow, bell, hook with circular
arrow, reel with circular arrow, crescent moon with a fishing rod.
```

---

## 진행 체크

| 묶음 | 장수 | 파일 |
|---|---|---|
| ① 스타일 | 2 | style_palette, style_key |
| ② 시험 | 3 | boat_a, fish_s1, char_body |
| ③ 캐릭터·배·도구 | 4 | char_head, boat_b, rod, float |
| ④ 체형 | 15 | fish_s2~s4, fish_l1~l12 |
| ⑤ 환상종 | 40 | fantasy_01~40 |
| ⑥ 무늬·파츠 | 2 | fish_pattern, fish_parts |
| ⑦ 배경 | 10 | bg_region1~8, bg_cloud, bg_wave |
| ⑧ 이펙트·상자 | 3 | fx_small, fx_big, chest |
| ⑨ 지도 | 2 | map_bg, map_node |
| ⑩ UI | 3 | ui_frame, ui_icon, item_icon |
| ⑪ 2차 | 5 | harbor_bg, shop_a, shop_b, npc, web_icon |
| **합계** | **89** | |

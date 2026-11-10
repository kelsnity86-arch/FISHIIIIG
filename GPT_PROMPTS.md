# GPT 복사용 프롬프트 (한 장에 한 블록)

> 아래 회색 블록 **하나가 그림 한 장**이다. 블록을 통째로 복사해 GPT에 붙여 넣으면 된다. 다른 문구를 덧붙일 필요 없다.
> 규격의 근거는 [`ASSET_SPEC.md`](ASSET_SPEC.md).

## 쓰는 법

1. 번호 순서대로, **한 번에 한 블록**만 보낸다.
2. 첨부할 것은 없다. 팔레트와 기준 장면은 GPT가 GitHub에서 직접 읽는다.
3. 각 블록 끝에 GitHub 업로드 지시가 들어 있어서, GPT가 그림을 `main` 브랜치 `assets/raw/`에 바로 올린다. 올라가면 Claude에게 "올렸어"라고만 하면 된다.
4. 잘못 나오면 짧게 고쳐 달라고 한다: "4개만", "글자 없이", "서로 더 띄워서", "몸을 곧게".
5. 투명 배경이 안 나오면 "배경을 단색 마젠타(#FF00FF)로 바꿔줘"라고 한다.
6. **시험 제작까지 만든 뒤 멈추고** 게임에 넣어 확인한다. 그다음 6번부터 진행.


---

## ① 스타일 기준

### 1. `style_palette` — 색 견본

```
Create a pixel art color palette image: a clean 8x4 grid of 32 flat color swatches on a
white background, no text, no labels. Soft warm pastel storybook colors for a cozy fishing
game: 6 sea blues (light to deep), 4 sky colors, 4 wood browns, 3 greens, 3 pinks/reds,
3 yellows/oranges, 3 purples, 5 neutrals from white to very dark navy, and 1 cream (#FFF4DC).

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name style_palette.png
```

### 2. `style_key` — 기준 장면

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

Using only the colors of the palette image, create a 16-bit pixel art scene, cute warm
storybook style, chunky clean pixels, 1px dark outline, no anti-aliasing, no text.
Wide side view of a vast calm sunny sea. The sea and sky fill almost the entire image.
At the right side, a very small wooden rowboat, only about 5% of the image width. On it,
a tiny dark navy silhouette of a fisherman, just a few pixels tall, no face, no details.
A long thin fishing rod points left, with a very thin light cream fishing line reaching a
small float on the water at the left side. On the horizon: low green hills and a small white
lighthouse. A few fluffy pink-tinted clouds.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name style_key.png
```


---

## ② 시험 제작

**여기까지 만들고 멈춘다.** 게임에 넣어 크기와 움직임을 확인한 뒤 계속한다.

### 3. `boat_a` — 배 1~4단계

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 4 boats in a 2x2 grid, evenly spaced, not touching. Flat side view, bow
pointing left, hull drawn fully including the part below the waterline, no people, no water.
In order: 1) small wooden rowboat, 2) small motor fishing boat, 3) small fishing trawler,
4) small sailboat with one sail. Each one slightly larger than the previous.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name boat_a.png
```

### 4. `fish_mackerel` — 소형: 고등어 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a mackerel (streamlined), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_mackerel.png
```

### 5. `fish_anchovy` — 소형: 멸치 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a anchovy (thin and long), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_anchovy.png
```

### 6. `fish_bream` — 소형: 돔 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a sea bream (tall and round), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_bream.png
```

### 7. `fish_flounder` — 소형: 넙치 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a flounder (flat, both eyes on the upper side), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_flounder.png
```

### 8. `char_body` — 옷 입은 몸 8벌

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 8 chibi fisherman bodies from the neck down (torso, arms, legs, no head),
front view, standing straight, identical body shape, pose and neck position, in a 4x2 grid,
evenly spaced, not touching. Each wears a different outfit, in order: 1) worn-out shirt,
2) fisherman vest, 3) yellow raincoat, 4) sailor uniform, 5) winter parka, 6) heat-proof
work suit, 7) deep-sea diving suit, 8) starry cape.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name char_body.png
```


---

## ③ 캐릭터 · 배 · 낚싯대 · 찌

### 9. `char_head` — 머리 + 모자 8개 + 바다용 실루엣

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 10 items in a 5x2 grid, evenly spaced, not touching, in order:
1) a chibi fisherman head, front view, smiling, no hat, no body.
2-9) eight hats alone with no head, sized to fit that head: straw hat, brimmed fishing hat,
yellow rain hood, sailor cap, fur winter hat, goggle helmet, round brass diving helmet,
golden star crown.
10) a tiny solid dark navy silhouette of a seated fisherman seen from the side, facing left,
no fishing rod, no face, no details.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name char_head.png
```

### 10. `boat_b` — 배 5~8단계

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 4 boats in a 2x2 grid, evenly spaced, not touching. Flat side view, bow
pointing left, hull drawn fully including the part below the waterline, no people, no water.
In order: 1) sturdy icebreaker ship, 2) ironclad steamship with a smokestack, 3) deep-sea
research vessel with a crane, 4) magical fantasy ship with a glowing starry sail.
Each one slightly larger than the previous.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name boat_b.png
```

### 11. `rod` — 낚싯대 8개

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 8 fishing rods stacked in 8 horizontal rows, evenly spaced, not touching.
Each rod is perfectly straight and perfectly horizontal, tip on the left, handle on the right,
with a small reel near the handle, no fishing line. Drawn thick and clear.
From top to bottom: 1) bamboo, 2) wood, 3) white-blue fiberglass, 4) black carbon,
5) ice crystal, 6) black iron, 7) glowing teal deep-sea, 8) golden starlight.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name rod.png
```

### 12. `float` — 찌 8개

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 8 fishing floats (bobbers) in one row, evenly spaced, not touching, each
standing upright. In order: 1) bamboo, 2) wood with red top, 3) white-blue fiberglass,
4) black carbon, 5) ice crystal, 6) black iron, 7) glowing teal deep-sea, 8) golden starlight.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name float.png
```


---

## ④ 기본 체형

생물 하나당 한 장: 색 4가지(자연색·금빛 주황·에메랄드·장밋빛 보라) × 표정 2가지. 몸을 곧게 편 옆모습.

### 13. `fish_puffer` — 소형: 복어 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a pufferfish (round ball), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_puffer.png
```

### 14. `fish_filefish` — 소형: 쥐치 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a filefish (diamond shape), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_filefish.png
```

### 15. `fish_butterfly` — 소형: 나비고기 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a butterflyfish (disc shape), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_butterfly.png
```

### 16. `fish_goby` — 소형: 망둥어 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a goby (big head), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_goby.png
```

### 17. `fish_flying` — 소형: 날치 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a flying fish (wing-like fins), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_flying.png
```

### 18. `fish_seahorse` — 소형: 해마 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a seahorse, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_seahorse.png
```

### 19. `fish_shrimp` — 소형: 새우 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a shrimp, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_shrimp.png
```

### 20. `fish_crab` — 소형: 게 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a crab, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_crab.png
```

### 21. `fish_squid` — 소형: 오징어 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a squid, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_squid.png
```

### 22. `fish_octopus` — 소형: 문어 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a octopus, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_octopus.png
```

### 23. `fish_jellyfish` — 소형: 해파리 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a jellyfish, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_jellyfish.png
```

### 24. `fish_starfish` — 소형: 불가사리 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a starfish, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_starfish.png
```

### 25. `fish_tuna` — 대형: 참치 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a tuna, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_tuna.png
```

### 26. `fish_shark` — 대형: 상어 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a shark, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_shark.png
```

### 27. `fish_manta` — 대형: 가오리 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a manta ray, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_manta.png
```

### 28. `fish_eel` — 대형: 장어 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a eel, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_eel.png
```

### 29. `fish_marlin` — 대형: 청새치 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a marlin (spear nose), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_marlin.png
```

### 30. `fish_sawshark` — 대형: 톱상어 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a sawshark (saw nose), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_sawshark.png
```

### 31. `fish_sunfish` — 대형: 개복치 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a ocean sunfish, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_sunfish.png
```

### 32. `fish_sturgeon` — 대형: 철갑상어 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a sturgeon, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_sturgeon.png
```

### 33. `fish_whale` — 대형: 고래 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a whale, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_whale.png
```

### 34. `fish_dolphin` — 대형: 돌고래 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a dolphin, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_dolphin.png
```

### 35. `fish_angler` — 대형: 아귀 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a anglerfish (lantern lure), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_angler.png
```

### 36. `fish_coelacanth` — 대형: 실러캔스 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a coelacanth (ancient fish), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_coelacanth.png
```

### 37. `fish_giant_squid` — 대형: 대왕오징어 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a giant squid, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_giant_squid.png
```

### 38. `fish_giant_octopus` — 대형: 대왕문어 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a giant octopus, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_giant_octopus.png
```

### 39. `fish_turtle` — 대형: 바다거북 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a sea turtle, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_turtle.png
```

### 40. `fish_oarfish` — 대형: 산갈치 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a oarfish (long ribbon body), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_oarfish.png
```

### 41. `fish_seal` — 대형: 물개 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a seal, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_seal.png
```

### 42. `fish_walrus` — 대형: 바다코끼리 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a walrus (tusks), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_walrus.png
```

### 43. `fish_manatee` — 대형: 매너티 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a manatee, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_manatee.png
```

### 44. `fish_narwhal` — 대형: 일각고래 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a narwhal (long horn), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_narwhal.png
```

### 45. `fish_sea_snake` — 대형: 바다뱀 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a sea snake, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_sea_snake.png
```

### 46. `fish_crocodile` — 대형: 바다악어 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a saltwater crocodile, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_crocodile.png
```

### 47. `fish_plesiosaur` — 대형: 수장룡 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a plesiosaur (long-necked ancient reptile), drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_plesiosaur.png
```

### 48. `fish_ammonite` — 대형: 암모나이트 (색 4가지 × 표정 2가지)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of ONE sea creature, a ammonite, drawn 8 times in a grid of 4 rows and
2 columns, evenly spaced, not touching. All 8 sprites have exactly the same body shape, pose
and size. Each row is a different color version of the same creature:
Row 1: the natural, realistic colors of the real species.
Row 2: warm gold and orange.
Row 3: emerald green and teal.
Row 4: rose pink and violet.
Every color version keeps layered shading from the darker back to the paler belly and a soft
wet sheen, so each one looks hand-painted, not recolored.
Left column: calm natural expression. Right column: the same sprite but clearly startled so the
difference is obvious even at a small size: eyes noticeably wider with small pupils, mouth
open, every fin spread wide open. Still elegant and dignified, not cartoonish. The body shape
stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area, flat side view facing left, body straight (not curved or
bent). No patterns or markings.
Premium, elegant, finely crafted look, NOT comical and NOT chibi: graceful natural proportions
close to the real species, only softly stylized. Visible scale or skin texture, fin rays with
slightly translucent membranes where the species has fins. Small, clear, lively eyes.
High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_ammonite.png
```


---

## ⑤ 환상종

한 장에 한 마리. 색과 무늬는 프롬프트에 적힌 대로이며, 마음에 안 들면 마지막 줄만 고쳐 쓴다.

### 49. `fantasy_01` — 히포캄푸스 (햇살 연안)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Hippocampus: front half of a horse with a flowing seaweed mane, back half a fish tail, sunny sea-green and gold.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_01.png
```

### 50. `fantasy_02` — 카프리콘 (햇살 연안)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Capricorn sea-goat: front half of a goat with curled horns, back half a fish tail, warm cream and teal.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_02.png
```

### 51. `fantasy_03` — 문장 바다사자 (햇살 연안)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Heraldic sea-lion: front half of a lion with a mane, back half a fish tail, golden with blue fins.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_03.png
```

### 52. `fantasy_04` — 신(蜃, 신기루 대합) (햇살 연안)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Shen: a giant clam with its shell slightly open, breathing out a soft mirage cloud with tiny towers inside, pearl and pink.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_04.png
```

### 53. `fantasy_05` — 해님 붕어 (햇살 연안)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Sun carp: a round disc-shaped goldfish glowing like the sun, with ray-like fins, orange and yellow.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_05.png
```

### 54. `fantasy_06` — 마카라 (산호초 열대)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Makara: a water dragon with an elephant-like trunk, crocodile jaws and a fish tail, emerald and coral pink.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_06.png
```

### 55. `fantasy_07` — 용궁 거북 (산호초 열대)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Dragon-palace turtle: a huge sea turtle carrying a tiny ornate palace and coral garden on its shell, jade and red.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_07.png
```

### 56. `fantasy_08` — 타니와 (산호초 열대)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Taniwha: a guardian water dragon with spiral carved patterns on its body and a long finned tail, deep green and white.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_08.png
```

### 57. `fantasy_09` — 무지개 뱀 (산호초 열대)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Rainbow serpent: a long thick serpent with scales in soft rainbow bands, gentle face.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_09.png
```

### 58. `fantasy_10` — 진주 대왕조개 (산호초 열대)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Giant pearl clam: an enormous scalloped clam, open to show a huge glowing pearl, with coral growing on the shell.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_10.png
```

### 59. `fantasy_11` — 네시 (안개 군도)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Nessie: a long-necked lake monster with a round body, four flippers and humps on its back, misty grey-green.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_11.png
```

### 60. `fantasy_12` — 켈피 (안개 군도)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Kelpie: a water horse with a dripping seaweed mane and a fish tail instead of hind legs, dark teal and grey.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_12.png
```

### 61. `fantasy_13` — 이쿠치 (안개 군도)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Ikuchi: an endlessly long smooth eel dripping oil-like droplets, pale grey-blue.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_13.png
```

### 62. `fantasy_14` — 아방크 (안개 군도)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Afanc: a creature with a crocodile body and a broad beaver tail, mossy brown and grey.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_14.png
```

### 63. `fantasy_15` — 안개 해파리 (안개 군도)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Mist jellyfish: a huge translucent jellyfish made of fog with long wispy tentacles, pale grey-blue with soft white glow.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_15.png
```

### 64. `fantasy_16` — 전설의 흰 고래 (원양 대해)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Legendary white whale: a massive pure white sperm whale with old scars and a few broken harpoons, wise eye.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_16.png
```

### 65. `fantasy_17` — 시 서펀트 (원양 대해)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Sea serpent: a long ocean serpent with a crested head and a row of back fins, deep blue and silver.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_17.png
```

### 66. `fantasy_18` — 곤(鯤) (원양 대해)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Kun: a fish as vast as a mountain with huge wing-like fins, tiny clouds and birds around it, deep blue and gold.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_18.png
```

### 67. `fantasy_19` — 별고래 (원양 대해)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Star whale: a whale whose body looks like the night sky, filled with stars and a faint constellation pattern, navy and gold.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_19.png
```

### 68. `fantasy_20` — 폭풍 청새치 (원양 대해)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Storm marlin: a marlin with a lightning-bolt spear nose and a storm-cloud sail fin, dark blue and yellow.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_20.png
```

### 69. `fantasy_21` — 아스피도켈론 (극지 빙해)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Aspidochelone: a gigantic turtle with a snowy island, pine trees and a tiny hut on its shell, ice blue and white.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_21.png
```

### 70. `fantasy_22` — 하프구파 (극지 빙해)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Hafgufa: a colossal sea beast with an enormous cave-like open mouth and rocky skin that looks like an island, grey-blue.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_22.png
```

### 71. `fantasy_23` — 아클루트 (극지 빙해)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Akhlut: half wolf, half orca: wolf head and front legs, orca body and tail, black and white.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_23.png
```

### 72. `fantasy_24` — 얼음 해룡 (극지 빙해)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Ice sea dragon: a long dragon made of clear ice with crystal spikes and a snowflake frill, pale blue and white.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_24.png
```

### 73. `fantasy_25` — 수정 일각고래 (극지 빙해)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Crystal narwhal: a narwhal with a long glowing crystal horn and gem-like spots, lavender and ice blue.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_25.png
```

### 74. `fantasy_26` — 리바이어던 (화산 해역)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Leviathan: a massive armored sea beast with glowing lava cracks between dark scales and smoke from its nostrils, black and orange.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_26.png
```

### 75. `fantasy_27` — 나마즈 (화산 해역)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Namazu: a giant catfish with long whiskers and a big stone resting on its head, earthy brown with cracked-ground patterns.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_27.png
```

### 76. `fantasy_28` — 모오 (화산 해역)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Mo'o: a giant water lizard dragon with glossy black scales, a long tail and tropical flowers along its back.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_28.png
```

### 77. `fantasy_29` — 흑요석 상어 (화산 해역)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Obsidian shark: a shark made of shiny black volcanic glass with sharp facets and glowing orange edges.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_29.png
```

### 78. `fantasy_30` — 불사조 날치 (화산 해역)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Phoenix flying fish: a flying fish with flame feather wings and a long fiery tail, red, orange and gold.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_30.png
```

### 79. `fantasy_31` — 크라켄 (심연 해구)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Kraken: a colossal squid-octopus with a huge mantle and many thick tentacles stretched straight back, deep purple and teal.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_31.png
```

### 80. `fantasy_32` — 카리브디스 (심연 해구)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Charybdis: a giant round sea creature whose mouth is a spiraling whirlpool ringed with teeth, dark teal and violet.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_32.png
```

### 81. `fantasy_33` — 바케쿠지라 (심연 해구)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Bake-kujira: a ghostly whale skeleton, glowing softly, with a few strange fish swimming around it, bone white and pale blue.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_33.png
```

### 82. `fantasy_34` — 루스카 (심연 해구)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Lusca: the front half of a shark with octopus tentacles as its back half, dark blue and magenta.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_34.png
```

### 83. `fantasy_35` — 심연 초롱아귀 (심연 해구)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Abyssal lantern angler: a huge deep-sea anglerfish with a big glowing lantern lure and glowing dots along its body, dark navy and cyan.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_35.png
```

### 84. `fantasy_36` — 요르문간드 (환상의 바다)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Jormungandr: the world serpent, an immense thick serpent with rune-like markings and mountain-ridge scales, dark green and gold.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_36.png
```

### 85. `fantasy_37` — 용왕 해룡 (환상의 바다)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Dragon king of the sea: an eastern sea dragon with antlers, long whiskers, a flowing mane and a pearl under its chin, azure and gold.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_37.png
```

### 86. `fantasy_38` — 용 잉어 (환상의 바다)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Dragon koi: a golden koi halfway through turning into a dragon, with small horns, whiskers and a dragon tail.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_38.png
```

### 87. `fantasy_39` — 이무기 (환상의 바다)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Imugi: a giant hornless proto-dragon serpent with smooth dark blue scales and a pale belly, calm eyes.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_39.png
```

### 88. `fantasy_40` — 바하무트 (환상의 바다)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, premium refined storybook style, small fine clean pixels, thin dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

One legendary sea creature drawn twice, stacked vertically, not touching. Top: calm natural expression. Bottom: the exact same creature with the same body, pose, size and colors,
but clearly startled so the difference is obvious even at a small size: eyes noticeably
wider with small pupils, mouth open, every fin spread wide open. Still elegant and dignified,
not cartoonish. The body shape stays exactly the same; only the face and fins change.
Each sprite fills a 2:1 wide area (3:1 allowed for very long bodies), flat side view facing left, body straight (not coiled). Premium, majestic and mystical look, NOT comical and NOT chibi, beautiful rather than scary.
Graceful proportions with rich ornate detail: scale texture, fin rays with translucent
membranes, flowing manes or frills where fitting, soft glowing accents. Layered shading with a
soft wet sheen. Small, clear, wise eyes. High-resolution pixel art made of many small fine pixels, NOT big chunky blocks: each creature
should be about 200 pixels long in pixel-art resolution, with smooth-looking curves. No human features.
Creature: Bahamut: a cosmic fish so vast that a tiny landscape with mountains rests on its back, purple, gold and starlight.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fantasy_40.png
```


---

## ⑥ 무늬 · 파츠

### 89. `fish_pattern` — 무늬 6종

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow.
Match the style of the reference image.

A sheet of 6 square pattern tiles in a 3x2 grid, evenly spaced. Each tile is a black pattern
on a pure white background that completely fills its square. In order:
1) horizontal stripes, 2) vertical stripes, 3) large spots, 4) small dots, 5) net pattern,
6) fish scale pattern.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_pattern.png
```

### 90. `fish_parts` — 물고기에 붙이는 장식 16개

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 16 small decorative parts to attach onto fish, in a 4x4 grid, evenly spaced,
not touching. In order: 1) coral horn, 2) coral fin, 3) misty whisker, 4) faded ghostly tail,
5) whale water spout, 6) large sail fin, 7) ice crystal spike, 8) ice tail, 9) glowing lava
crack, 10) flame fin, 11) glowing lantern lure, 12) row of glowing dots, 13) star shard,
14) golden fin, 15) small royal crown, 16) large scar.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fish_parts.png
```


---

## ⑦ 배경

### 91. `bg_region1` — 수평선 풍경: 햇살 연안

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A very wide horizontal scenery strip for a sea horizon, daytime colors. The bottom edge is a
perfectly flat straight horizon line. Only the scenery is drawn; the sky area above and
around it is fully transparent. No water, no boats.
Scenery: low green hills and a small white lighthouse with an orange roof.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name bg_region1.png
```

### 92. `bg_region2` — 수평선 풍경: 산호초 열대

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A very wide horizontal scenery strip for a sea horizon, daytime colors. The bottom edge is a
perfectly flat straight horizon line. Only the scenery is drawn; the sky area above and
around it is fully transparent. No water, no boats.
Scenery: tropical islands with palm trees and pink coral rocks.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name bg_region2.png
```

### 93. `bg_region3` — 수평선 풍경: 안개 군도

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A very wide horizontal scenery strip for a sea horizon, daytime colors. The bottom edge is a
perfectly flat straight horizon line. Only the scenery is drawn; the sky area above and
around it is fully transparent. No water, no boats.
Scenery: several layers of hazy grey-blue island silhouettes fading into mist.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name bg_region3.png
```

### 94. `bg_region4` — 수평선 풍경: 원양 대해

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A very wide horizontal scenery strip for a sea horizon, daytime colors. The bottom edge is a
perfectly flat straight horizon line. Only the scenery is drawn; the sky area above and
around it is fully transparent. No water, no boats.
Scenery: an almost empty open horizon with one tiny distant whale spout and a few low clouds.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name bg_region4.png
```

### 95. `bg_region5` — 수평선 풍경: 극지 빙해

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A very wide horizontal scenery strip for a sea horizon, daytime colors. The bottom edge is a
perfectly flat straight horizon line. Only the scenery is drawn; the sky area above and
around it is fully transparent. No water, no boats.
Scenery: icebergs and snowy mountains in white and pale blue.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name bg_region5.png
```

### 96. `bg_region6` — 수평선 풍경: 화산 해역

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A very wide horizontal scenery strip for a sea horizon, daytime colors. The bottom edge is a
perfectly flat straight horizon line. Only the scenery is drawn; the sky area above and
around it is fully transparent. No water, no boats.
Scenery: a smoking volcanic island with orange lava streams and dark rocks.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name bg_region6.png
```

### 97. `bg_region7` — 수평선 풍경: 심연 해구

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A very wide horizontal scenery strip for a sea horizon, daytime colors. The bottom edge is a
perfectly flat straight horizon line. Only the scenery is drawn; the sky area above and
around it is fully transparent. No water, no boats.
Scenery: sharp black sea stacks with glowing teal moss.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name bg_region7.png
```

### 98. `bg_region8` — 수평선 풍경: 환상의 바다

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A very wide horizontal scenery strip for a sea horizon, daytime colors. The bottom edge is a
perfectly flat straight horizon line. Only the scenery is drawn; the sky area above and
around it is fully transparent. No water, no boats.
Scenery: floating islands with waterfalls of starlight, purple and gold.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name bg_region8.png
```

### 99. `bg_cloud` — 구름 6개

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 6 fluffy clouds in a 3x2 grid, evenly spaced, not touching, in different
sizes and shapes, white with a soft pink underside.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name bg_cloud.png
```

### 100. `bg_wave` — 파도 줄무늬 3종

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 3 horizontal wave stripe strips stacked in 3 rows, evenly spaced, white.
Each strip can repeat seamlessly left to right. From top to bottom: 1) thin tiny ripples for
the far sea, 2) medium ripples, 3) thick bold ripples for the near sea.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name bg_wave.png
```


---

## ⑧ 이펙트 · 보물상자

### 101. `fx_small` — 작은 이펙트 16개

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 16 small effect sprites in a 4x4 grid, evenly spaced, not touching, mostly
white and light blue. In order: 1) water droplet, 2) small splash, 3) ripple ring, 4) foam
bubbles, 5) rain streak, 6) snowflake, 7) fog puff, 8) lightning bolt, 9) sparkle star,
10) glowing dot, 11) speech bubble containing only an exclamation mark shape, 12) sweat drop,
13) teardrop, 14) music note, 15) heart, 16) volcanic ash flake.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fx_small.png
```

### 102. `fx_big` — 큰 물기둥 · 큰 물보라

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

Two large water effect sprites side by side, not touching, white and light blue:
left) a tall water column bursting upward, right) a wide crown-shaped splash.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fx_big.png
```

### 103. `chest` — 보물상자 (닫힘 · 열림)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

Two treasure chest sprites side by side, not touching: left) a closed wooden chest with
metal bands and some seaweed on it, right) the same chest open with golden light shining out.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name chest.png
```


---

## ⑨ 해역 지도

### 104. `map_bg` — 해도 배경

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game background, cute warm storybook style, chunky clean pixels, soft pastel
palette matching the palette image, no anti-aliasing, no text or letters, 16:9 wide.
Match the style of the reference image.

An old parchment sea chart seen from above: soft blue sea texture with faint wave marks,
a decorative compass rose in one corner, rope border. No islands, no labels, no text.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name map_bg.png
```

### 105. `map_node` — 해역 아이콘 8개

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 8 map marker icons in a 4x2 grid, evenly spaced, not touching. In order:
1) lighthouse, 2) palm tree, 3) misty island, 4) whale tail, 5) iceberg, 6) volcano,
7) whirlpool, 8) floating star island.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name map_node.png
```


---

## ⑩ UI

### 106. `ui_frame` — 틀 8종

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 8 UI pieces in a 4x2 grid, evenly spaced, not touching. Harbor style:
wooden planks with rope borders, cream (#FFF4DC) and wood brown (#7A4B2A). The inside of each
frame is a flat single color with decoration only on the border. In order:
1) square panel with rope border and flat cream inside, 2) wide wooden button, 3) wide gauge
frame with an empty inside, 4) plain white ribbon banner, 5) star-shaped badge,
6) diamond-shaped badge, 7) round medal frame with an empty inside, 8) square picture frame
with an empty inside.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui_frame.png
```

### 107. `ui_icon` — 화면 아이콘 32개

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 32 small game icons in an 8x4 grid, evenly spaced, not touching, each simple
and readable at a tiny size. In order:
Row 1: gold coin, wooden crate, bait worm, book, backpack, gear, anchor, folded map.
Row 2: constellation, X mark, arrow, padlock, speaker with sound waves, muted speaker,
diamond gem, star.
Row 3: dawn sun on the horizon, full sun, sunset sun, crescent moon, clear sky sun, rain cloud,
storm cloud with lightning, fog.
Row 4: snow cloud, fishing rod with circular arrow, coin with circular arrow, hook with
circular arrow, reel with circular arrow, check mark, question mark shape, crown.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui_icon.png
```

### 108. `item_icon` — 아이템 아이콘 24개

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 24 item icons in an 8x3 grid, evenly spaced, not touching. In order:
Row 1: 8 fishing reels made of bamboo, wood, white-blue fiberglass, black carbon, ice crystal,
black iron, glowing teal deep-sea, golden starlight.
Row 2: white spool of fishing line, fish scale, pearl, star shard, worm, shrimp, krill,
squid piece.
Row 3: small bait fish, small crab, dough bait ball, feather lure, metal spoon lure,
glowing lure, golden bait, rainbow fantasy bait.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name item_icon.png
```


---

## ⑪ 2차 — 항구 마을 · 업그레이드 웹

낚시 본편이 끝난 뒤에 만들어도 된다.

### 109. `harbor_bg` — 항구 배경

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game background, cute warm storybook style, chunky clean pixels, soft pastel
palette matching the palette image, no anti-aliasing, no text or letters, 16:9 wide.
Match the style of the reference image.

A cozy harbor town scene, front view: sky, hills with small houses in the back, a wide wooden
pier across the lower part, and calm sea at the bottom with reflections. Leave the pier area
empty: no shop buildings in the foreground, no people, no boats.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name harbor_bg.png
```

### 110. `shop_a` — 조선소 · 낚시도구점 · 찌·미끼 가게

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 3 small shop buildings in one row, evenly spaced, not touching, front view.
Each has a signboard with a picture instead of text. In order: 1) shipyard (sign: a boat),
2) fishing tackle shop (sign: a fishing rod), 3) float and bait shop (sign: a float).

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name shop_a.png
```

### 111. `shop_b` — 옷가게 · 수산시장 · 어부 길드

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 3 small shop buildings in one row, evenly spaced, not touching, front view.
Each has a signboard with a picture instead of text. In order: 1) clothing shop (sign: a shirt),
2) fish market (sign: a fish), 3) fishermen's guild hall (sign: a book).

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name shop_b.png
```

### 112. `npc` — 가게 주인 6명

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 6 chibi shopkeepers in one row, evenly spaced, not touching, front view,
2-head-tall proportions. In order: 1) burly shipwright with a hammer, 2) old fisherman with
a beard, 3) cheerful kid holding a float, 4) stylish tailor with a measuring tape,
5) fishmonger with an apron, 6) wise guild master with a big book.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name npc.png
```

### 113. `web_icon` — 업그레이드 웹 아이콘 18개

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, chunky clean pixels, 1px dark navy
outline, soft pastel palette matching the palette image, no anti-aliasing,
no gradients, no text or letters, no drop shadow, fully transparent background.
Match the style of the reference image.

A sprite sheet of 18 icons in a 6x3 grid, evenly spaced, not touching, all drawn in a single
flat cream color (#FFF4DC) with no outline. In order:
Row 1: heart-shaped anchor, coin, fishing float, reel, star, compass.
Row 2: gear, large shining star, fast-forward arrows, stack of coins, crate with plus sign,
bait with plus sign.
Row 3: fishing rod with circular arrow, coin with circular arrow, bell, hook with circular
arrow, reel with circular arrow, crescent moon with a fishing rod.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name web_icon.png
```

---

## ⑫ 추가 — 코드로 그리던 것을 GPT 그림으로

### 114. `shadow` — 물속 그림자 (모든 생물 공통)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, small fine clean pixels, soft pastel
palette matching the palette image, no anti-aliasing, no gradients, no text or
letters, no drop shadow, fully transparent background. Match the style of the 
reference image.

One sprite: the shadow of a big fish seen under the water surface. A simple generic fish
silhouette with a tail fin, flat side view facing left, body straight, filling a 2:1 wide area.
Filled with one flat dark navy blue color, no outline, no eye, no details inside. The edge is
softened with a thin ring of pixel dithering so it looks like it is under water.
This shadow will be animated smoothly in the game by bending its body like a swimming wave,
rotating and scaling it, so draw it as one clean, simple, continuous shape with an even
body thickness and a smooth outline, perfectly straight, with no gaps or separate pieces.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name shadow.png
```

### 115. `bg_sky` — 하늘 바탕 (낮 기준)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game background, cute warm storybook style, small fine clean pixels, soft
pastel palette matching the palette image, no text. Match the style of the 
reference image.

A daytime sky only: soft bands of light blue getting paler toward the bottom, made with pixel
dithering between the bands. No clouds, no sun, no land, no sea. 16:9 wide, fills the image.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name bg_sky.png
```

### 116. `bg_sea` — 바다 바탕 (낮 기준)

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game background, cute warm storybook style, small fine clean pixels, soft
pastel palette matching the palette image, no text. Match the style of the 
reference image.

A calm sea surface only, seen from the side: soft bands of blue, paler near the top (far away)
and deeper near the bottom (close), with pixel dithering between the bands. No waves, no
boats, no land, no sky. Wide, fills the image, and repeats seamlessly left to right.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name bg_sea.png
```

### 117. `web_node` — 업그레이드 웹 노드·선·빛

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, small fine clean pixels, soft pastel
palette matching the palette image, no anti-aliasing, no gradients, no text or
letters, no drop shadow, fully transparent background. Match the style of the 
reference image.

A sprite sheet of 12 pieces for a constellation-style skill map, in a 4x3 grid, evenly spaced,
not touching, cream (#FFF4DC) and soft white on transparent. In order:
Row 1: small locked dot, empty round ring, filled round node, large star-shaped node.
Row 2: empty rounded-square ring, filled rounded-square node, big central round node with a
decorative rim, soft round glow.
Row 3: short straight line segment, short dotted line segment, tiny orbiting star, expanding
ring ripple.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name web_node.png
```

---

## ⑬ 추가 — 획득 연출

### 118. `fx_rays` — 획득 연출 빛줄기

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, small fine clean pixels, soft pastel
palette matching the palette image, no anti-aliasing, no text or letters, no drop shadow,
fully transparent background. Match the style of the reference image.

One sprite: a radial burst of light rays, like a sunburst seen from the front. About 16 soft
rays of alternating long and short length spreading evenly from the center in all directions,
pure white fading to transparent toward the tips, with an empty transparent center. Perfectly
symmetrical and centered, square image. It will be tinted and rotated slowly behind a caught fish.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fx_rays.png
```

### 119. `fx_stamp` — 신기록 도장 틀

```
Style references: open assets/raw/style_palette.png (color palette) and
assets/raw/style_key.webp (reference scene) from the GitHub repository
kelsnity86-arch/FISHIIIIG, branch claude/amazing-mendel-8fufxr. Use them for every
mention of the palette image and the reference image below.

16-bit pixel art game asset, cute warm storybook style, small fine clean pixels, soft pastel
palette matching the palette image, no anti-aliasing, no text or letters, no drop shadow,
fully transparent background. Match the style of the reference image.

One sprite: a round rubber-stamp seal, slightly rough inked edge, with a double ring border and
a small star at the top and bottom of the ring. The middle is a flat empty area for text
(no letters). Single flat white color so it can be tinted. Centered, square image.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fx_stamp.png
```


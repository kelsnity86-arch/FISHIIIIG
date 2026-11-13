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

---

## ⑭ 다시 받는 것 — 옆모습 바다와 큰 물 효과

구도를 옆모습(수면선 + 물 단면)으로 바꾸면서 다시 받는 그림. 물 효과는 거대한 생물 크기에 맞게 크게.

### 120. `sea_wave_back` — 옆모습 바다: 뒤쪽 파도 띠

```
Style references: open assets/raw/fish_whale.png, assets/raw/fantasy_19.png and
assets/raw/style_palette.png from the GitHub repository kelsnity86-arch/FISHIIIIG, branch
claude/amazing-mendel-8fufxr. Match the refined, finely detailed pixel-art style of the two
creature images (small fine pixels, soft layered shading, thin dark navy outline) and the
colors of the palette.

Premium refined storybook pixel art, small fine clean pixels, NOT big chunky blocks,
no text or letters, fully transparent background unless stated otherwise.

One very wide horizontal strip of sea seen from the SIDE, for a side-view game. The top edge is
a wavy water surface line with small gentle rolling waves and thin pale foam; above the surface is fully transparent. Below the
surface the strip is filled with soft light blue water, slightly hazy, as it is far away. The strip must repeat seamlessly left to right.
Wide 4:1 image, the water surface about one third down from the top.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name sea_wave_back.png
```

### 121. `sea_wave_mid` — 옆모습 바다: 가운데 파도 띠

```
Style references: open assets/raw/fish_whale.png, assets/raw/fantasy_19.png and
assets/raw/style_palette.png from the GitHub repository kelsnity86-arch/FISHIIIIG, branch
claude/amazing-mendel-8fufxr. Match the refined, finely detailed pixel-art style of the two
creature images (small fine pixels, soft layered shading, thin dark navy outline) and the
colors of the palette.

Premium refined storybook pixel art, small fine clean pixels, NOT big chunky blocks,
no text or letters, fully transparent background unless stated otherwise.

One very wide horizontal strip of sea seen from the SIDE, for a side-view game. The top edge is
a wavy water surface line with medium rolling waves with white foam on the crests; above the surface is fully transparent. Below the
surface the strip is filled with clear mid blue water that gets a little darker toward the bottom. The strip must repeat seamlessly left to right.
Wide 4:1 image, the water surface about one third down from the top.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name sea_wave_mid.png
```

### 122. `sea_wave_front` — 옆모습 바다: 앞쪽 파도 띠

```
Style references: open assets/raw/fish_whale.png, assets/raw/fantasy_19.png and
assets/raw/style_palette.png from the GitHub repository kelsnity86-arch/FISHIIIIG, branch
claude/amazing-mendel-8fufxr. Match the refined, finely detailed pixel-art style of the two
creature images (small fine pixels, soft layered shading, thin dark navy outline) and the
colors of the palette.

Premium refined storybook pixel art, small fine clean pixels, NOT big chunky blocks,
no text or letters, fully transparent background unless stated otherwise.

One very wide horizontal strip of sea seen from the SIDE, for a side-view game. The top edge is
a wavy water surface line with larger rolling waves with thick white foam and a few sparkles of sunlight; above the surface is fully transparent. Below the
surface the strip is filled with deep blue water that gets much darker toward the bottom, with faint soft light shafts. The strip must repeat seamlessly left to right.
Wide 4:1 image, the water surface about one third down from the top.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name sea_wave_front.png
```

### 123. `bg_sky2` — 하늘 (고운 그림)

```
Style references: open assets/raw/fish_whale.png, assets/raw/fantasy_19.png and
assets/raw/style_palette.png from the GitHub repository kelsnity86-arch/FISHIIIIG, branch
claude/amazing-mendel-8fufxr. Match the refined, finely detailed pixel-art style of the two
creature images (small fine pixels, soft layered shading, thin dark navy outline) and the
colors of the palette.

Premium refined storybook pixel art, small fine clean pixels, NOT big chunky blocks,
no text or letters, fully transparent background unless stated otherwise.

A daytime sky background, fully opaque: soft smooth transition from clear blue at the top to a
pale warm glow near the bottom, with a gentle sun glow on the upper left. No clouds, no land,
no sea, no banding stripes. 16:9 wide, fills the whole image.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name bg_sky2.png
```

### 124. `bg_cloud2` — 구름 6개 (고운 그림)

```
Style references: open assets/raw/fish_whale.png, assets/raw/fantasy_19.png and
assets/raw/style_palette.png from the GitHub repository kelsnity86-arch/FISHIIIIG, branch
claude/amazing-mendel-8fufxr. Match the refined, finely detailed pixel-art style of the two
creature images (small fine pixels, soft layered shading, thin dark navy outline) and the
colors of the palette.

Premium refined storybook pixel art, small fine clean pixels, NOT big chunky blocks,
no text or letters, fully transparent background unless stated otherwise.

A sprite sheet of 6 clouds in a 3x2 grid, evenly spaced, not touching: fluffy layered cumulus
clouds in different sizes and shapes, white with soft blue-grey shading underneath and a warm
pink-cream light on top.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name bg_cloud2.png
```

### 125. `fx_burst` — 큰 물기둥 (거대 생물이 솟구칠 때)

```
Style references: open assets/raw/fish_whale.png, assets/raw/fantasy_19.png and
assets/raw/style_palette.png from the GitHub repository kelsnity86-arch/FISHIIIIG, branch
claude/amazing-mendel-8fufxr. Match the refined, finely detailed pixel-art style of the two
creature images (small fine pixels, soft layered shading, thin dark navy outline) and the
colors of the palette.

Premium refined storybook pixel art, small fine clean pixels, NOT big chunky blocks,
no text or letters, fully transparent background unless stated otherwise.

One large sprite: a huge explosive column of sea water bursting straight up, as when a whale
breaches. Thick white foam at the core, blue-green translucent water sheets peeling outward,
many droplets flying off at the top and sides. Tall image (about 2:3), base at the bottom.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fx_burst.png
```

### 126. `fx_wall` — 넓은 물벽 (거대 생물이 떨어질 때)

```
Style references: open assets/raw/fish_whale.png, assets/raw/fantasy_19.png and
assets/raw/style_palette.png from the GitHub repository kelsnity86-arch/FISHIIIIG, branch
claude/amazing-mendel-8fufxr. Match the refined, finely detailed pixel-art style of the two
creature images (small fine pixels, soft layered shading, thin dark navy outline) and the
colors of the palette.

Premium refined storybook pixel art, small fine clean pixels, NOT big chunky blocks,
no text or letters, fully transparent background unless stated otherwise.

One large sprite: a very wide wall of splashing water thrown up to both sides, as when a whale
falls back into the sea. A wide crown shape with tall curling sheets of water at the left and
right, foam at the base, droplets flying outward. Wide image (about 5:2), base at the bottom.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fx_wall.png
```

### 127. `fx_spray` — 물안개 덩어리 4개

```
Style references: open assets/raw/fish_whale.png, assets/raw/fantasy_19.png and
assets/raw/style_palette.png from the GitHub repository kelsnity86-arch/FISHIIIIG, branch
claude/amazing-mendel-8fufxr. Match the refined, finely detailed pixel-art style of the two
creature images (small fine pixels, soft layered shading, thin dark navy outline) and the
colors of the palette.

Premium refined storybook pixel art, small fine clean pixels, NOT big chunky blocks,
no text or letters, fully transparent background unless stated otherwise.

A sprite sheet of 4 soft puffs of sea spray and mist in a 2x2 grid, evenly spaced, not touching.
Each is a different irregular cloud of fine white water spray with soft translucent edges.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fx_spray.png
```

### 128. `fx_drips` — 몸에서 흘러내리는 물줄기 3개

```
Style references: open assets/raw/fish_whale.png, assets/raw/fantasy_19.png and
assets/raw/style_palette.png from the GitHub repository kelsnity86-arch/FISHIIIIG, branch
claude/amazing-mendel-8fufxr. Match the refined, finely detailed pixel-art style of the two
creature images (small fine pixels, soft layered shading, thin dark navy outline) and the
colors of the palette.

Premium refined storybook pixel art, small fine clean pixels, NOT big chunky blocks,
no text or letters, fully transparent background unless stated otherwise.

A sprite sheet of 3 curtains of water pouring downward, side by side, not touching: thin sheets
and streams of water running off a large body, wider at the top and breaking into droplets at
the bottom, translucent blue-white. Each is tall and narrow.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fx_drips.png
```

### 129. `fx_drops` — 큰 물방울 8개

```
Style references: open assets/raw/fish_whale.png, assets/raw/fantasy_19.png and
assets/raw/style_palette.png from the GitHub repository kelsnity86-arch/FISHIIIIG, branch
claude/amazing-mendel-8fufxr. Match the refined, finely detailed pixel-art style of the two
creature images (small fine pixels, soft layered shading, thin dark navy outline) and the
colors of the palette.

Premium refined storybook pixel art, small fine clean pixels, NOT big chunky blocks,
no text or letters, fully transparent background unless stated otherwise.

A sprite sheet of 8 water droplets and splash fragments in a 4x2 grid, evenly spaced, not
touching, all different: round drops, stretched flying drops, small blobs, and tiny clusters,
translucent blue-white with a bright highlight.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fx_drops.png
```

---

## ⑮ 목표 화면(assets/concept) 재현용 레이어

목표 화면 3장을 그대로 재현하기 위한 부품. 화풍은 목표 화면과 똑같아야 한다.

### 130. `c_sky` — 하늘·구름·섬 (수평선 위 전체)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Opaque image.

Recreate ONLY the part of concept_1 above the horizon: the sky, all the clouds, the distant
mountains and the islands, exactly as in concept_1, but WITHOUT the boat, the fisherman, the
fishing rod and the fishing line. Very wide 3:1 image whose bottom edge is the flat horizon line.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky.png
```

### 131. `c_sea` — 물 단면 (수면 아래 전체)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Opaque image.

Recreate ONLY the underwater part of concept_1: the cross-section of the sea, clear teal near
the top getting gradually darker to deep navy at the bottom, with very soft diffuse light near
the top. No creatures, no shadows, no float, no bubbles, no surface line. Wide 16:7 image.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sea.png
```

### 132. `c_farsea` — 먼 바다 수면 띠

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

A very wide thin strip of the distant sea surface as seen in concept_1 between the horizon and
the wave line: blue water with small ripples and bright sun glints. It must repeat seamlessly
left to right. Very wide 8:1 image, opaque inside the strip.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_farsea.png
```

### 133. `c_wave` — 수면선 파도 (잔잔할 때)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

A very wide strip of the water surface line exactly as in concept_1: gentle rolling waves seen
from the side with a bright white-cream foam edge on top and translucent turquoise water just
below, fading to fully transparent toward the bottom; fully transparent above the waves.
It must repeat seamlessly left to right. Very wide 8:1 image.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_wave.png
```

### 134. `c_wave_rough` — 수면선 파도 (거칠 때)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

A very wide strip of the water surface line as in concept_2 away from the fish: bigger choppy
waves seen from the side with thicker white foam and small flying spray, translucent turquoise
water just below fading to fully transparent toward the bottom; fully transparent above.
It must repeat seamlessly left to right. Very wide 8:1 image.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_wave_rough.png
```

### 135. `c_boat` — 배와 낚시꾼 3자세

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

A sprite sheet of 3 versions of the tiny wooden rowboat with the fisherman in a blue coat and
hat, exactly as in the concepts, side view facing left, in one row, evenly spaced, not
touching. Draw NO fishing rod and no water. In order: 1) sitting calmly, hands forward as if
holding a rod (concept_1), 2) leaning far back, pulling hard (concept_2), 3) standing braced,
leaning back with arms raised (concept_3). Same boat and same size in all three.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_boat.png
```

### 136. `c_rod` — 낚싯대

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

One sprite: the fisherman's fishing rod from the concepts, drawn perfectly straight and
perfectly horizontal, thin dark rod, tip on the left, handle on the right, no line.
Very wide image.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_rod.png
```

### 137. `c_float` — 찌

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

One sprite: the fishing float from concept_1, standing upright: red top half, white bottom
half, a thin antenna on top and a thin stem below. Painted like in the concept.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_float.png
```

### 138. `c_shadow` — 물속 그림자

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

One sprite: the huge dark shadow of a sea creature seen through water, exactly like the shadow
in concept_1: a soft blurry whale-like silhouette in dark blue-teal with very soft feathered
edges, no details, no eye. Side view facing left, body straight and horizontal, filling a
3:1 wide image.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_shadow.png
```

### 139. `c_bubbles` — 물속 공기방울 4묶음

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

A sprite sheet of 4 clusters of underwater air bubbles as in concept_2, in a 2x2 grid, evenly
spaced, not touching: each a loose swarm of many small translucent bubbles of different sizes
with bright rims.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_bubbles.png
```

### 140. `c_thrash` — 수면 몸부림 파도

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

One large sprite: the big curling wave with white foam and flying spray that bursts up from the
water surface where the fish thrashes in concept_2. Only the wave and spray above and at the
water line, base at the bottom, wide 2:1 image.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_thrash.png
```

### 141. `c_bowspray` — 뱃머리 물살 2개

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

A sprite sheet of 2 sprays of water at the bow of a small boat being dragged through the water,
as around the boat in concept_2 and concept_3, side by side, not touching: 1) a small spray,
2) a larger curling wave with foam. The water is thrown to the left.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_bowspray.png
```

### 142. `c_erupt` — 물 폭발 (낚아 올릴 때)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

One very large sprite: the huge explosion of water at the base of the leaping whale in
concept_3: tall sheets and curtains of white-cream foaming water thrown upward and outward to
both sides with curling turquoise waves at the bottom and glittering spray. No whale.
Base at the bottom, wide 2:1 image.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_erupt.png
```

### 143. `c_spray` — 물보라 덩어리 4개

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

A sprite sheet of 4 pieces of flying sea spray as in concept_3, in a 2x2 grid, evenly spaced,
not touching: arcs and clouds of many fine glittering white-gold water droplets, each a
different shape.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_spray.png
```

### 144. `c_rays` — 금빛 빛줄기

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

One sprite: the radial burst of soft golden light rays seen behind the whale in concept_3, by
itself. Warm gold rays spreading evenly in all directions from a bright center and fading to
transparent at the tips. Centered, square image.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_rays.png
```

### 145. `c_shafts` — 물속 빛살

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

One sprite: the soft shafts of sunlight shining down into the water under the surface in
concept_3, by themselves: pale turquoise-white diagonal beams, brightest at the top and fading
to transparent toward the bottom. Wide 2:1 image.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_shafts.png
```

### 146. `c_whale_leap` — 고래: 솟구치는 자세

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

One large sprite: the whale from concept_3 by itself, in exactly the same arched leaping pose,
facing right, mouth slightly open, with the same wet shine and rim light on its back.
No water splash, no fishing line, no background. The whole body including the tail must be
visible. Wide image.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_whale_leap.png
```

### 147. `c_whale_fall` — 고래: 떨어지는 자세

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). These three concept screenshots are
the target look of the game. Every image you make must look like it was cut out of them:
the same painterly storybook rendering, the same colors, the same lighting, the same level
of detail. Do not use a pixel-art look that differs from the concepts.

No text. Fully transparent background.

One large sprite: the same whale as in concept_3, same style, now falling back toward the sea:
body rolled onto its side and back showing the pale grooved belly, head lower than the tail,
fins spread, facing right. No water, no fishing line, no background. The whole body must be
visible. Wide image.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_whale_fall.png
```

---

## ⑯ 움직임용 자세 그림 — 그림자의 헤엄·돌아서기, 수면을 뚫고 나오는 과정

그림 한 장을 늘리고 뒤집는 대신, 자세 그림을 이어 붙여 움직임을 만든다.

### 148. `c_shadow_swim` — 그림자: 헤엄 4동작

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_shadow.png and
assets/raw/c_whale_leap.png. Every image you make must look like it belongs to those: the same
painterly storybook rendering, colors and lighting.

No text. Fully transparent background.

A sprite sheet of 4 frames in one row showing one swimming cycle, side view facing left.
Each one is the huge soft dark shadow of a whale seen through water, exactly like
assets/raw/c_shadow.png: dark blue-teal, blurry feathered edges, no details, no eye. All
the same size and the same whale. Evenly spaced, not touching.
The whale swims by moving its tail up and down, so the body bends gently in a wave:
1) tail fluke raised high, back slightly arched down,
2) tail passing the middle on its way down, body nearly straight,
3) tail fluke pushed low, back slightly arched up,
4) tail passing the middle on its way up, body nearly straight.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_shadow_swim.png
```

### 149. `c_shadow_turn` — 그림자: 돌아서기 3동작

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_shadow.png and
assets/raw/c_whale_leap.png. Every image you make must look like it belongs to those: the same
painterly storybook rendering, colors and lighting.

No text. Fully transparent background.

A sprite sheet of 3 frames in one row showing the whale turning around toward the viewer.
Each one is the huge soft dark shadow of a whale seen through water, exactly like
assets/raw/c_shadow.png: dark blue-teal, blurry feathered edges, no details, no eye. All
the same size and the same whale. Evenly spaced, not touching.
1) side view facing left but starting to turn: the head swings toward the viewer and the body
   curves into a C shape, so it looks a little shorter,
2) three-quarter view coming toward the viewer: clearly foreshortened, the head large and near,
   the body curving away behind it, one flipper visible,
3) seen head-on from the front: a rounded oval body with both flippers spread to the sides and
   the tail fluke visible behind and above.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_shadow_turn.png
```

### 150. `c_shadow_act` — 그림자: 몸부림·잠수·솟구침 3동작

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_shadow.png and
assets/raw/c_whale_leap.png. Every image you make must look like it belongs to those: the same
painterly storybook rendering, colors and lighting.

No text. Fully transparent background.

A sprite sheet of 3 frames in one row, side view facing left.
Each one is the huge soft dark shadow of a whale seen through water, exactly like
assets/raw/c_shadow.png: dark blue-teal, blurry feathered edges, no details, no eye. All
the same size and the same whale. Evenly spaced, not touching.
1) thrashing: the body twisted in a strong S curve, tail whipping, flippers flung out,
2) diving: the body curved downward like a bow, head pointing down-left, tail up,
3) surging upward: the body curved upward like a bow, head pointing up-left toward the
   surface, tail down, about to burst out of the water.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_shadow_act.png
```

### 151. `c_bulge` — 수면이 부풀어 터지기 2동작

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_shadow.png and
assets/raw/c_whale_leap.png. Every image you make must look like it belongs to those: the same
painterly storybook rendering, colors and lighting.

No text. Fully transparent background.

A sprite sheet of 2 frames side by side, not touching, showing the sea surface seen from the
side just before a giant whale bursts out, in the style of the water in concept_3:
1) a smooth, wide dome of water swelling upward, glassy turquoise with a dark shape under it
   and thin lines of foam sliding off the top,
2) the dome splitting open: taller, the top breaking into white foam and spray, sheets of
   water peeling off both sides.
Each frame is wide (about 2:1), base at the bottom.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_bulge.png
```

### 152. `c_whale_rise` — 고래: 수면을 뚫고 나오는 2동작

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_shadow.png and
assets/raw/c_whale_leap.png. Every image you make must look like it belongs to those: the same
painterly storybook rendering, colors and lighting.

No text. Fully transparent background.

A sprite sheet of 2 frames side by side, not touching, of the same whale as
assets/raw/c_whale_leap.png, same style and colors, facing right, bursting out of the sea.
Draw only the whale with water streaming off it; no sea, no splash base, no fishing line.
1) only the head and throat out of the water, pointing steeply up and to the right, mouth
   slightly open, water pouring off the head; the picture ends where the body would enter
   the water,
2) the front half of the body out, rising steeply up and to the right, flippers starting to
   spread, water streaming down the sides; the picture ends where the body would enter the
   water.
Both must match the leaping pose in c_whale_leap.png so the three can be shown in sequence.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_whale_rise.png
```



## ⑰ 웃긴 도트 생물 — 생물마다 한 장, 전부 상상 속 생물 (현실 + 상상 + 만화)

> 바다·하늘은 고급스럽게, 생물은 일부러 단순하고 허접한 도트로. 특징 하나만은 확실하게.

### 153. `d_toast_shark` — 일반: 식빵상어 ★ 그림체 기준 (이 한 장으로 나머지 119종의 그림체를 정한다)

```
No text. Fully transparent background.

This single sprite sets the art style for 120 creatures of a fishing game, so take extra care.

MOST IMPORTANT RULE - IT IS A FISH FIRST:
The silhouette must clearly be a SHARK: a long torpedo-shaped body about 2.5 times longer
than it is tall, a pointed snout, one tall triangular dorsal fin on the back, a pectoral
fin on the side, and a crescent-shaped tail with two lobes. If the sprite were filled
solid black, anyone must say "shark". Do NOT draw a slice of bread with a face. Do NOT
draw a round blob.

THE GAG - the shark is MADE OF TOAST (applied to the shark body, without changing its
shape):
- The back, fins and tail are golden-brown toasted crust.
- The side and belly are the pale cream color of the inside of white bread, with 3 or 4
  darker "air hole" pixels like bread crumb.
- One small square pat of yellow butter melting on its back just behind the head.
- That is all. No other objects.

FACE (at the RIGHT end): one big round white eye with a black pupil, a wide mouth with a
zig-zag row of small white triangle teeth. Dumb, deadpan, slightly stupid expression.
In the game the camera zooms in on this face until it fills the screen, so the eye and
teeth must be big and clear.

ART STYLE - modern color Tamagotchi screen quality (like Tamagotchi Uni / Paradise):
- Clean pixel art on a grid about 48 pixels wide and 24 pixels tall. Every pixel is a
  perfectly square block of one flat color, all on one grid. Scale the sprite up large
  with hard edges: no blur, no smoothing, no anti-aliasing, no half-pixels.
- About 8 flat colors: each main color plus one darker tone for simple shading.
  No gradients, no glow, no texture noise.
- A clean 1-pixel dark navy outline around the whole silhouette.
- Pure side view, facing RIGHT, body straight.

A sprite sheet of 2 frames side by side, with a clear gap between them, same creature,
same size, same pixel grid:
1) normal: calm deadpan stare, mouth closed with the teeth showing,
2) shocked: the eye twice as big, mouth wide open, fins and tail sticking straight out,
   three sweat-drop pixels flying off the head.
The two frames must differ only in the face, fins and sweat drops, so that flipping
between them looks like a 2-frame Tamagotchi animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_toast_shark.png
```

---

### 154. `d_sock_mackerel` — 일반: 양말고등어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a mackerel shaped like a striped sock: blue and white stripes, the heel and toe are red patches, the toe end is the tail.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sock_mackerel.png
```

---
### 155. `d_fan_puffer` — 일반: 선풍기복어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a round spiky pufferfish with an electric fan on its face: three fan blades spin around its mouth, a round wire guard, a tiny power cord for a tail.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_fan_puffer.png
```

---
### 156. `d_bungeo_bream` — 일반: 붕어빵돔

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a sea bream that is a fish-shaped waffle pastry: golden brown with a waffle grid pattern, dark red bean filling leaking from a bite mark.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_bungeo_bream.png
```

---
### 157. `d_tie_flounder` — 일반: 넥타이넙치

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a flat flounder wearing a red office necktie: both eyes squeezed on one side of the face, tired office-worker look.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_tie_flounder.png
```

---
### 158. `d_banana_eel` — 일반: 바나나장어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: an eel that is a banana: long curved yellow body, half peeled with the peel flaps as fins, brown tip as the tail.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_banana_eel.png
```

---
### 159. `d_can_anchovy` — 일반: 깡통멸치

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a small silver anchovy wearing an opened tin can as armor: its head pokes out of the rolled-back lid, the ring pull sticks up like a fin.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_can_anchovy.png
```

---
### 160. `d_slipper_sole` — 일반: 슬리퍼가자미

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a sole fish shaped like a rubber flip-flop sandal: the strap is on its back, a footprint mark on the body, eyes at the toe end.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_slipper_sole.png
```

---
### 161. `d_umbrella_jelly` — 고급: 우산해파리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a jellyfish that is an open umbrella: red and white panels, a curved wooden handle hanging down as its one tentacle, water drops.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_umbrella_jelly.png
```

---
### 162. `d_scissor_crab` — 고급: 가위게

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a red crab whose two claws are a pair of steel scissors with orange handles, eyes on stalks.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_scissor_crab.png
```

---
### 163. `d_bulb_angler` — 고급: 전구아귀

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a dark anglerfish whose lure is a glowing household light bulb on a wire with a little pull-cord, big underbite with square teeth.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_bulb_angler.png
```

---
### 164. `d_pizza_ray` — 고급: 피자가오리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a manta ray that is a triangular pizza slice: crust along the back edge, melted cheese, round pepperoni spots, a string of cheese as the tail.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_pizza_ray.png
```

---
### 165. `d_straw_seahorse` — 고급: 빨대해마

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a seahorse whose snout is a striped bendy drinking straw, body like a tall soda cup with a lid, curled tail.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_straw_seahorse.png
```

---
### 166. `d_ball_turtle` — 고급: 축구공거북

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a sea turtle whose shell is a black and white soccer ball, flippers wearing little boots.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_ball_turtle.png
```

---
### 167. `d_guitar_shark` — 희귀: 기타상어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a shark whose body is a red electric guitar: strings along its side, tuning pegs on the tail, a lightning-bolt dorsal fin, sunglasses.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_guitar_shark.png
```

---
### 168. `d_train_eel` — 희귀: 기차장어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a very long eel made of linked train carriages with lit windows, a steam locomotive head with a smokestack puffing bubbles and wheels along the belly.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_train_eel.png
```

---
### 169. `d_plug_octopus` — 희귀: 콘센트문어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: an octopus whose head is a white power strip with sockets and a red switch; each of its arms is an electric cable ending in a plug.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_plug_octopus.png
```

---
### 170. `d_crown_tuna` — 희귀: 왕관참치

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a fat muscular tuna wearing a golden crown and a short red royal cape, proud chin raised.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_crown_tuna.png
```

---
### 171. `d_sub_whale` — 영웅: 잠수함고래

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a whale that is a submarine: riveted metal plates, round portholes along the side, a periscope where the blowhole is, a propeller in front of the tail flukes.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sub_whale.png
```

---
### 172. `d_dino_shark` — 영웅: 공룡상어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a shark with a green T-rex head and two tiny useless arms, shark fins and tail, huge toothy jaw.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_dino_shark.png
```

---
### 173. `d_volcano_turtle` — 영웅: 화산거북

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a giant sea turtle carrying a small island on its shell with one palm tree and a little volcano puffing smoke.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_volcano_turtle.png
```

---
### 174. `d_rocket_marlin` — 전설: 로켓청새치

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a marlin that is a rocket: long spear nose cone, red tail fins, two boosters with pixel flames, a round window with a tiny eye inside.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_rocket_marlin.png
```

---
### 175. `d_castle_kraken` — 전설: 성문어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a giant octopus wearing a stone castle as its shell: towers with flags, a drawbridge mouth, tentacles coming out of the gates.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_castle_kraken.png
```

---
### 176. `d_moon_whale` — 환상: 달고래

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag: a whale shaped like a glowing crescent moon wearing a sleeping cap, small stars and sparkles stuck to its pale yellow body, sleepy smile.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_moon_whale.png
```

---

### 177. `d_sausage_seal` — 일반: 소시지물개

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a seal that is a fat pink sausage: tied sausage ends as nose and tail, grill marks on
the back, two tiny flippers.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sausage_seal.png
```

---
### 178. `d_egg_jelly` — 일반: 계란프라이해파리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a jellyfish that is a fried egg: wobbly white with a big yellow yolk on top, four short
wavy tentacles.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_egg_jelly.png
```

---
### 179. `d_pencil_gar` — 일반: 연필꽁치

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a long thin fish that is a yellow pencil: sharpened graphite tip as the nose, pink
eraser and metal band as the tail.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_pencil_gar.png
```

---
### 180. `d_toothbrush_shrimp` — 일반: 칫솔새우

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a shrimp whose body is a toothbrush: blue handle body, white bristles as legs, a blob of
striped toothpaste on its head.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_toothbrush_shrimp.png
```

---
### 181. `d_sushi_tuna` — 일반: 초밥참치

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a tuna that is a piece of nigiri sushi: red fish slab on top of a white rice block
belly, a seaweed belt around the middle.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sushi_tuna.png
```

---
### 182. `d_mitten_crab` — 일반: 장갑게

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a crab whose claws are two big red knitted mittens, small body, eyes on stalks.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_mitten_crab.png
```

---
### 183. `d_balloon_puffer` — 일반: 풍선복어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a pufferfish that is a red party balloon: shiny round body, the knot is its mouth, a
string hanging as the tail.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_balloon_puffer.png
```

---
### 184. `d_carrot_squid` — 일반: 당근오징어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a squid shaped like an orange carrot: pointed carrot body, green leafy top as the
tentacles.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_carrot_squid.png
```

---
### 185. `d_button_ray` — 일반: 단추가오리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a small round stingray that is a coat button: four thread holes in the middle, a loose
thread as the tail.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_button_ray.png
```

---
### 186. `d_spoon_fish` — 일반: 숟가락치

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a silver fish shaped like a spoon: round bowl head with one eye, long thin handle body,
tiny tail fin.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_spoon_fish.png
```

---
### 187. `d_donut_eel` — 일반: 도넛장어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
an eel curled into a ring that is a pink frosted donut with colored sprinkles, head and
tail meeting.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_donut_eel.png
```

---
### 188. `d_tofu_fish` — 일반: 두부돔

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a perfectly square white tofu block with tiny fins and tail, a slice of green onion on
top, nervous face.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_tofu_fish.png
```

---
### 189. `d_lemon_puffer` — 일반: 레몬복어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a lemon-shaped yellow pufferfish with a pointy lemon tip nose, one green leaf as the
dorsal fin, sour scrunched face.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_lemon_puffer.png
```

---
### 190. `d_clothespin_fish` — 일반: 빨래집게치

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a fish that is a wooden clothespin: long split mouth with a metal spring in the middle,
tiny fins.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_clothespin_fish.png
```

---
### 191. `d_corn_fish` — 일반: 옥수수고기

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a fish that is a corn cob: rows of yellow kernels as scales, green husk leaves as fins
and tail.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_corn_fish.png
```

---
### 192. `d_sock_octopus` — 일반: 양말문어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a small octopus made of mismatched socks: head is a sock ball, each arm a different
striped sock.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sock_octopus.png
```

---
### 193. `d_ramen_squid` — 일반: 라면오징어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a squid whose tentacles are curly yellow instant noodles, wearing a red ramen cup as a
hat.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_ramen_squid.png
```

---
### 194. `d_key_fish` — 일반: 열쇠고기

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a gold fish shaped like a door key: round head with a hole for an eye, a toothed key
blade as the body and tail.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_key_fish.png
```

---
### 195. `d_broom_ray` — 일반: 빗자루가오리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a ray shaped like a broom head: straw bristles as the back fringe, a long wooden handle
as the tail.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_broom_ray.png
```

---
### 196. `d_ice_cream_cone` — 일반: 아이스크림소라

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a sea snail whose shell is a waffle ice cream cone with a pink scoop on top and a
cherry.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_ice_cream_cone.png
```

---
### 197. `d_tape_snail` — 일반: 테이프달팽이

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a sea snail whose shell is a roll of clear sticky tape in a red dispenser, a strip of
tape trailing behind.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_tape_snail.png
```

---
### 198. `d_glove_starfish` — 일반: 고무장갑불가사리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a starfish that is a pink rubber kitchen glove with five fingers spread out, a face on
the palm.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_glove_starfish.png
```

---
### 199. `d_burger_clam` — 일반: 햄버거조개

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a clam that is a hamburger: bun shells, with lettuce, cheese and a patty inside, a
tongue sticking out.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_burger_clam.png
```

---
### 200. `d_comb_fish` — 일반: 빗고기

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a flat fish that is a pocket comb: long row of teeth along the belly, a few hairs stuck
in it.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_comb_fish.png
```

---
### 201. `d_cup_jelly` — 일반: 컵라면해파리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a jellyfish that is an upside-down paper cup with steam lines above and noodle tentacles
below.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_cup_jelly.png
```

---
### 202. `d_pea_fish` — 일반: 완두콩떼

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
three round green peas in an open pod swimming together as one fish, each pea with its
own face.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_pea_fish.png
```

---
### 203. `d_mushroom_jelly` — 일반: 버섯해파리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a jellyfish that is a red mushroom with white spots, a thick white stem instead of
tentacles.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_mushroom_jelly.png
```

---
### 204. `d_soap_fish` — 일반: 비누고기

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a pink bar of soap with a fish tail, covered in foam bubbles, slipping.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_soap_fish.png
```

---
### 205. `d_teapot_whale` — 고급: 주전자고래

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a small round whale that is a teapot: a spout as the blowhole puffing steam, a handle on
the back, a lid with a knob.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_teapot_whale.png
```

---
### 206. `d_boot_fish` — 고급: 장화고기

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a fish living in an old yellow rain boot: head poking out of the top, the boot toe is
the tail, a patch on the side.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_boot_fish.png
```

---
### 207. `d_cactus_puffer` — 고급: 선인장복어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a green cactus-shaped pufferfish with long spines and one pink flower on its head.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_cactus_puffer.png
```

---
### 208. `d_bowtie_butterfly` — 고급: 나비넥타이나비고기

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a butterflyfish whose whole body is a red polka-dot bow tie with a knot in the middle.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_bowtie_butterfly.png
```

---
### 209. `d_piano_fish` — 고급: 피아노고기

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a black fish whose mouth is a long row of white and black piano keys, music notes
floating out.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_piano_fish.png
```

---
### 210. `d_trumpet_fish` — 고급: 트럼펫대치

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a long golden fish that is a trumpet: flared bell mouth, three valves on the back.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_trumpet_fish.png
```

---
### 211. `d_dice_box` — 고급: 주사위복어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a cube boxfish that is a white dice with black pips, tiny fins on the corners.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_dice_box.png
```

---
### 212. `d_camera_crab` — 고급: 카메라게

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a crab whose shell is an old camera with a big lens eye and a flash going off.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_camera_crab.png
```

---
### 213. `d_popcorn_coral` — 고급: 팝콘새우

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a shrimp sitting in a striped popcorn bucket, body made of puffed popcorn.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_popcorn_coral.png
```

---
### 214. `d_wig_seal` — 고급: 가발물개

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a grey seal wearing a tall curly blonde wig and red lipstick.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_wig_seal.png
```

---
### 215. `d_hammer_shark` — 고급: 망치상어 ★ 그림체 기준 (이 한 장으로 나머지의 그림체를 정한다)

```
No text. Fully transparent background. ONE creature only, one art style only.

This single sprite sets the art style for 120 creatures of a fishing game, so take extra care.

THE CREATURE - "Hammer Shark": a hammerhead shark whose head is literally a carpenter's
claw hammer.
- BODY (keep it a real shark): grey-blue torpedo body, white belly, one tall triangular
  dorsal fin, a pectoral fin, a crescent tail with two lobes. Filled solid black, the
  back two thirds must still read "shark".
- HEAD (the gag, must be unmistakable): where a hammerhead's wide head would be, there is
  a real steel hammer head, mounted sideways like a hammerhead shark's head: a flat round
  striking face on one end and a curved split nail-pulling claw on the other, shiny grey
  steel. The shark's neck continues into a short piece of wooden hammer handle (brown,
  with wood grain lines) before it becomes shark skin.
- FACE: two round white eyes with black pupils sit on the two ends of the hammer head,
  far apart, looking in slightly different directions (dumb and deadpan). Under the
  hammer, a wide mouth with a zig-zag row of white teeth.
- BIG HEAD: the hammer head and face take up about 40% of the whole sprite, like a
  chibi / super-deformed character. In the game the camera zooms in on this face until
  it fills the screen, so eyes, teeth and hammer must be large and clear.
- One bent nail stuck in its lip like a toothpick. Nothing else.

ART STYLE - modern color Tamagotchi screen quality (like Tamagotchi Uni / Paradise):
- Clean pixel art on a grid about 48 pixels wide. Every pixel is a perfectly square block
  of one flat color, all on one grid. Scale it up large with hard edges: no blur, no
  smoothing, no anti-aliasing, no half-pixels.
- About 8 flat colors: each main color plus one darker tone. No gradients, no glow.
- A clean 1-pixel dark navy outline around the whole silhouette.
- Pure side view, facing RIGHT, body straight.

A sprite sheet of 2 frames side by side, with a clear gap between them, same creature,
same size, same pixel grid:
1) normal: calm deadpan stare, mouth closed with the teeth showing,
2) shocked: both eyes twice as big, mouth wide open, fins and tail sticking straight out,
   the nail flying out of its mouth, three sweat-drop pixels.
The two frames must differ only in the face, fins, nail and sweat drops, so that flipping
between them looks like a 2-frame Tamagotchi animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_hammer_shark.png
```

---

### 216. `d_saw_shark` — 고급: 톱상어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a shark whose nose is a hand saw with an orange plastic handle.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_saw_shark.png
```

---
### 217. `d_magnet_ray` — 고급: 자석가오리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a ray shaped like a red and silver horseshoe magnet with nails and paperclips stuck to
it.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_magnet_ray.png
```

---
### 218. `d_lamp_jelly` — 고급: 스탠드해파리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a jellyfish that is a table lamp: fringed lampshade head, a glowing bulb, an electric
cord tentacle with a plug.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_lamp_jelly.png
```

---
### 219. `d_pineapple_turtle` — 고급: 파인애플거북

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a turtle whose shell is a pineapple with the spiky green crown on top, wearing
sunglasses.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_pineapple_turtle.png
```

---
### 220. `d_candle_eel` — 고급: 양초장어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
an eel that is a long white candle with a small flame on its head and wax dripping down.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_candle_eel.png
```

---
### 221. `d_helmet_crab` — 고급: 헬멧게

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a hermit crab living in a yellow construction helmet with a headlamp.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_helmet_crab.png
```

---
### 222. `d_sandwich_flounder` — 고급: 샌드위치넙치

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a flounder that is a triangle sandwich: bread on both sides, lettuce and ham sticking
out, a toothpick with an olive.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sandwich_flounder.png
```

---
### 223. `d_vacuum_ray` — 고급: 청소기가오리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a ray that is a robot vacuum cleaner: round disc body, a blinking light, sucking up
bubbles.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_vacuum_ray.png
```

---
### 224. `d_watermelon_puffer` — 고급: 수박복어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a round pufferfish that is a watermelon: green stripes outside, with one slice cut out
showing red flesh and black seeds.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_watermelon_puffer.png
```

---
### 225. `d_scarf_snake` — 고급: 목도리바다뱀

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a sea snake that is a long striped knitted scarf with tassels at the tail.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_scarf_snake.png
```

---
### 226. `d_bell_fish` — 고급: 종고기

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a fish that is a golden bell with a clapper tongue, ringing lines around it.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_bell_fish.png
```

---
### 227. `d_bus_whale` — 희귀: 버스고래

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a whale that is a yellow school bus: rows of windows, wheels along the belly, a stop
sign fin.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_bus_whale.png
```

---
### 228. `d_fridge_boxfish` — 희귀: 냉장고복어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a tall white refrigerator with fins, the door slightly open with light and a fish bone
inside, magnets on the door.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_fridge_boxfish.png
```

---
### 229. `d_drill_narwhal` — 희귀: 드릴일각고래

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a narwhal whose horn is a spinning power drill bit, wearing safety goggles.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_drill_narwhal.png
```

---
### 230. `d_clock_turtle` — 희귀: 시계거북

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a turtle whose shell is a big round alarm clock with two bells on top and clock hands.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_clock_turtle.png
```

---
### 231. `d_tank_crab` — 희귀: 탱크게

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a crab that is a green army tank: caterpillar tracks instead of legs, one claw is the
cannon.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_tank_crab.png
```

---
### 232. `d_accordion_eel` — 희귀: 아코디언장어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
an eel whose middle is a stretched accordion bellows, with keys on the head and tail
ends.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_accordion_eel.png
```

---
### 233. `d_ufo_ray` — 희귀: 유에프오가오리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a manta ray that is a flying saucer: a glass dome with a tiny alien on top, lights
around the rim, a beam underneath.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_ufo_ray.png
```

---
### 234. `d_chandelier_jelly` — 희귀: 샹들리에해파리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a jellyfish that is a crystal chandelier with lit candles and hanging jewels.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_chandelier_jelly.png
```

---
### 235. `d_bulldozer_shark` — 희귀: 불도저상어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a yellow shark with a bulldozer blade for a jaw and a smokestack on its back.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_bulldozer_shark.png
```

---
### 236. `d_wizard_octopus` — 희귀: 마법사문어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a purple octopus wearing a pointed wizard hat with stars, holding a magic wand in one
arm.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_wizard_octopus.png
```

---
### 237. `d_knight_swordfish` — 희귀: 기사황새치

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a swordfish wearing a steel knight helmet with a red plume, its bill is a sword with a
hilt.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_knight_swordfish.png
```

---
### 238. `d_disco_sunfish` — 희귀: 미러볼개복치

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
an ocean sunfish that is a disco mirror ball with square mirror tiles and light spots
around it.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_disco_sunfish.png
```

---
### 239. `d_cake_turtle` — 희귀: 케이크거북

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a turtle whose shell is a three-layer birthday cake with lit candles and strawberries.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_cake_turtle.png
```

---
### 240. `d_helicopter_fish` — 희귀: 헬리콥터날치

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a flying fish with a helicopter rotor on its back and landing skids under its belly.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_helicopter_fish.png
```

---
### 241. `d_umbrella_squid` — 희귀: 파라솔오징어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a squid wearing a beach parasol as its mantle, holding a tropical drink.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_umbrella_squid.png
```

---
### 242. `d_robot_lobster` — 희귀: 로봇바닷가재

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a boxy tin toy robot lobster with a wind-up key on its back and pincer hands.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_robot_lobster.png
```

---
### 243. `d_sofa_manatee` — 희귀: 소파매너티

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a manatee that is a fat brown leather sofa with cushions and a TV remote on it.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sofa_manatee.png
```

---
### 244. `d_ghost_squid` — 희귀: 유령오징어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a white bedsheet ghost with squid tentacles poking out underneath, two black hole eyes.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_ghost_squid.png
```

---
### 245. `d_ship_whale` — 영웅: 해적선고래

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a whale wearing a wooden pirate ship on its back: a mast with a skull flag, cannons
along the side, an eye patch.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_ship_whale.png
```

---
### 246. `d_pyramid_turtle` — 영웅: 피라미드거북

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a giant turtle carrying a sandstone pyramid with a small sphinx on its shell.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_pyramid_turtle.png
```

---
### 247. `d_dragon_eel` — 영웅: 용장어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a long eel with an eastern dragon head: antlers, whiskers, a tiny flame from its mouth.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_dragon_eel.png
```

---
### 248. `d_train_whale` — 영웅: 기관차고래

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a whale that is a black steam locomotive: a cowcatcher jaw, a funnel puffing smoke, big
red wheels.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_train_whale.png
```

---
### 249. `d_excavator_crab` — 영웅: 굴착기게

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a giant yellow crab whose one claw is an excavator arm with a toothed bucket.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_excavator_crab.png
```

---
### 250. `d_lighthouse_squid` — 영웅: 등대오징어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a giant squid whose mantle is a red and white striped lighthouse with a shining lamp at
the top.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_lighthouse_squid.png
```

---
### 251. `d_volcano_puffer` — 영웅: 용암복어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a black rock pufferfish with glowing orange lava cracks and smoke coming from its mouth.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_volcano_puffer.png
```

---
### 252. `d_circus_seal` — 영웅: 서커스물개

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a huge seal in a red and white circus tent costume balancing a ball on its nose.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_circus_seal.png
```

---
### 253. `d_mammoth_walrus` — 영웅: 매머드바다코끼리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a walrus with shaggy brown mammoth fur, a trunk and enormous curved tusks.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_mammoth_walrus.png
```

---
### 254. `d_samurai_crab` — 영웅: 사무라이게

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a giant crab wearing samurai armor with a horned helmet, its claws are two swords.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_samurai_crab.png
```

---
### 255. `d_windmill_ray` — 영웅: 풍차가오리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a giant ray carrying a wooden windmill with four sails turning on its back.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_windmill_ray.png
```

---
### 256. `d_ferris_jelly` — 영웅: 관람차해파리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a giant jellyfish that is a ferris wheel with colored cabins and lights.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_ferris_jelly.png
```

---
### 257. `d_island_whale` — 전설: 섬고래

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a colossal whale that is an island: grass, three palm trees and a tiny hut on its back,
a waterfall spout.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_island_whale.png
```

---
### 258. `d_city_turtle` — 전설: 도시거북

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a colossal turtle carrying a tiny city of skyscrapers with lit windows on its shell.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_city_turtle.png
```

---
### 259. `d_kraken_ship` — 전설: 문어발유조선

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a colossal octopus tangled around a rusty cargo ship which it wears like a belt.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_kraken_ship.png
```

---
### 260. `d_dragon_turtle` — 전설: 용거북

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a colossal turtle with a dragon head and a spiked shell, breathing a small pixel flame.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_dragon_turtle.png
```

---
### 261. `d_space_shark` — 전설: 우주왕복선상어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a shark that is a white space shuttle with black nose, wings, a flag mark and three
engine flames.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_space_shark.png
```

---
### 262. `d_golden_carp` — 전설: 황금잉어왕

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a colossal golden koi carp with a long white moustache, wearing an emperor crown.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_golden_carp.png
```

---
### 263. `d_clocktower_eel` — 전설: 시계탑장어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a colossal eel whose head is a stone clock tower with a big clock face.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_clocktower_eel.png
```

---
### 264. `d_thunder_ray` — 전설: 번개가오리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a colossal dark ray shaped like a storm cloud with yellow lightning bolts for a tail and
rain falling below.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_thunder_ray.png
```

---
### 265. `d_castle_crab` — 전설: 성게성

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a colossal spiky sea urchin that is a round fortress with towers and tiny flags among
the spines.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_castle_crab.png
```

---
### 266. `d_sun_fish_god` — 환상: 해님개복치

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
an ocean sunfish that is the sun itself: round yellow face with triangle rays all
around, a calm smile.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sun_fish_god.png
```

---
### 267. `d_star_whale` — 환상: 별자리고래

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a dark blue whale made of night sky with white star dots joined by lines like a
constellation.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_star_whale.png
```

---
### 268. `d_rainbow_serpent` — 환상: 무지개바다뱀

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a huge sea serpent shaped like a rainbow arc with seven color bands, clouds at both
ends.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_rainbow_serpent.png
```

---
### 269. `d_planet_turtle` — 환상: 행성거북

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a turtle whose shell is a ringed planet like Saturn with a small moon orbiting it.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_planet_turtle.png
```

---
### 270. `d_cloud_whale` — 환상: 구름고래

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a fluffy white cloud shaped like a whale, raining from its belly, a small rainbow from
its spout.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_cloud_whale.png
```

---
### 271. `d_galaxy_jelly` — 환상: 은하해파리

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a jellyfish whose bell is a purple spiral galaxy with star dots, tentacles of shooting
stars.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_galaxy_jelly.png
```

---
### 272. `d_king_leviathan` — 환상: 임금님용

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a huge sea dragon wearing a golden crown and royal robe, holding a tiny scepter, long
whiskers.

Rules (important):
- VERY low resolution: the creature is drawn on a grid only about 40 pixels wide. Every
  pixel is a big, clearly visible, perfectly square block. Blow the sprite up large with
  hard edges - no blur, no smoothing, no anti-aliasing.
- At most 8 flat colors. No gradients, no soft shading, no glow, no highlights except one
  or two single pixels.
- A thick 1-pixel dark navy outline around the whole creature.
- Side view, facing RIGHT, body straight and stiff.
- ANIMAL FIRST: the silhouette must clearly be the sea animal itself (its real body shape,
  fins, tail, limbs). The object or gag is applied to that body as its material, pattern
  or one accessory - never replace the animal's shape with the object.
- The one or two defining features described above must be huge, exaggerated and instantly
  readable. Leave out all other detail.
- Big simple dumb eyes: a white square with a black pixel.

A sprite sheet of 2 frames side by side, not touching, same creature and same pixel grid:
1) normal: blank, calm, slightly stupid stare,
2) shocked: eyes twice as big, mouth wide open, fins or limbs sticking straight out,
   two or three sweat-drop pixels flying off.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_king_leviathan.png
```

---

## ⑱ 그림체 찾기 — 같은 생물을 6가지 그림체로

### 273. `d_style_test` — 식빵상어를 6가지 그림체로 (고르기용)

```
No text, no labels, no numbers. Fully transparent background.

A style test sheet: the SAME creature drawn 6 times in 6 clearly different retro styles,
arranged in a grid of 3 columns x 2 rows, each in its own cell with wide empty gaps,
never touching.

THE CREATURE - "Toast Shark". Build it literally, like a child would:
- The body is ONE SQUARE SLICE OF TOAST seen flat from the front: a square with slightly
  rounded top corners, pale inside, a darker crust border all around. It must read as
  "a slice of bread" from the silhouette alone. Do NOT round it into a fish shape.
- Shark parts are simply stuck onto the square: one sharp triangular shark fin on the top
  edge, a crescent shark tail on the left edge, and on the right edge a pointed shark
  snout with one dot eye and a zig-zag row of teeth.
- A small pat of butter sits on the toast face. Facing RIGHT. Stiff, no pose.

It must be simple and funny, with a dumb deadpan face.

THE 6 STYLES. Top row = pixel art, bottom row = hand-drawn:
1) Modern color Tamagotchi screen (like Tamagotchi Uni / Paradise): about 32 pixels wide,
   bright flat colors with one darker tone, clean dark outline, simple friendly face.
2) The same modern color Tamagotchi look, but with a deliberately derpy, ugly-funny face:
   eyes pointing different ways, crooked teeth.
3) Game Boy Color era: about 24 pixels wide, 4 flat colors plus black outline, chunky.
4) Bad MS Paint doodle: drawn with a shaky mouse - wobbly uneven black line that does not
   quite close, flat bucket-fill colors that slightly miss the lines.
5) A small child's crayon drawing: thick waxy crayon strokes, scribbled coloring that goes
   outside the lines, lopsided shape, huge uneven eyes.
6) A bored student's ballpoint-pen doodle colored with two highlighter markers: thin
   confident-but-bad pen line, quick hatching, deadpan stupid face.

For the pixel styles (1 to 3): every pixel is a big, perfectly square block of one flat
color on one grid; hard edges, no blur, no anti-aliasing, no gradients.
For the hand-drawn styles (4 to 6): no paper, no background - only the drawing itself on
transparent; it must look genuinely badly drawn by hand, not like a clean vector cartoon.
Draw all 6 at the same displayed size so they can be compared.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_style_test.png
```

---

### 274. `d_style_test2` — 식빵상어를 도트 그림체 8가지로 (고르기용)

```
No text, no labels, no numbers. Fully transparent background.

A style test sheet: the SAME creature drawn 8 times in 8 clearly different pixel-art
styles, arranged in a grid of 4 columns x 2 rows, each in its own cell with wide empty
gaps, never touching. Draw all 8 at the same displayed size so they can be compared.

THE CREATURE - "Toast Shark". IT IS A FISH FIRST:
The silhouette must clearly be a SHARK in every cell: a long torpedo-shaped body about
2.5 times longer than tall, a pointed snout, one tall triangular dorsal fin, a pectoral
fin, and a crescent tail with two lobes. Filled solid black it must still read "shark".
Do NOT draw a slice of bread with a face. Do NOT draw a round blob.
The gag: the shark is MADE OF TOAST - back, fins and tail are golden-brown crust; side
and belly are pale cream bread with a few darker crumb-hole pixels; one small square pat
of yellow butter melting on its back. Nothing else.
Face at the RIGHT end: one big eye, a wide mouth with a zig-zag row of white teeth, dumb
deadpan expression. Side view, facing RIGHT, body straight.

THE 8 STYLES (top row left to right, then bottom row):
1) Modern color Tamagotchi screen (Tamagotchi Uni / Paradise): about 32 pixels wide,
   bright flat colors with one darker tone, clean dark outline.
2) The same modern Tamagotchi look at about 48 pixels wide with a little more detail.
3) Classic 1990s Tamagotchi LCD: about 20 pixels wide, ONLY black pixels on transparent.
4) Game Boy Color era: about 24 pixels wide, 4 flat colors plus black outline, chunky.
5) NES 8-bit: about 24 pixels wide, exactly 3 flat colors plus black, no shading at all.
6) PICO-8 fantasy console: about 32 pixels wide, its bold 16-color palette, no outline,
   shapes separated by color only.
7) 16-bit SNES RPG monster sprite: about 64 pixels wide, 12 colors, 3-tone shading and
   highlights, the most detailed one.
8) Clumsy beginner pixel art: about 28 pixels wide, uneven wobbly outline, mismatched
   colors, lopsided eye - honestly badly made, and funny because of it.

For all 8: every pixel is a big, perfectly square block of one flat color on one grid;
hard edges, no blur, no smoothing, no anti-aliasing, no gradients.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_style_test2.png
```

---


## ⑲ gotzoo 방식 — 한 장에 25마리, 진짜 저해상도 도트

> `kelsnity86-arch/gotzoo`에서 검증된 주문 방식 그대로: 격자·도트 크기·팔레트를 숫자로 못 박고, 변환 도구가 원래 해상도 도트로 되돌린다.

### 275. `d_sheet_01` — 도트 생물 25마리 (gotzoo 방식 시험 장)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

SHEET d_sheet_01.png. EXACT ROW-MAJOR ORDER (never print names/numbers):
1. hammer shark - a hammerhead shark whose wide head is a steel claw hammer
2. saw shark - a shark whose long nose is a hand saw blade with teeth
3. bulb anglerfish - an anglerfish whose lure is a glowing light bulb
4. straw seahorse - a seahorse whose snout is a striped bendy drinking straw
5. scissor crab - a red crab whose two claws are steel scissors
6. umbrella jellyfish - a jellyfish whose bell is an open red-and-white umbrella with a hook handle
7. drill narwhal - a narwhal whose horn is a spiral drill bit
8. pizza ray - a stingray that is a triangular pizza slice with pepperoni
9. soccer turtle - a sea turtle whose shell is a black-and-white soccer ball
10. cactus puffer - a round green pufferfish covered in cactus spines with one pink flower
11. fan puffer - a round pufferfish with three fan blades on its nose
12. candle eel - a long white eel with a small flame on its head like a candle
13. trumpet fish - a long golden fish whose mouth is a flared trumpet bell
14. knight swordfish - a swordfish wearing a steel knight helmet, its bill is a sword
15. crown tuna - a fat tuna wearing a golden crown
16. plug octopus - an octopus whose arms end in electric plugs
17. train eel - an eel whose body is three linked train carriages with windows
18. teapot whale - a small round whale with a teapot spout and handle
19. submarine whale - a whale with a periscope, round portholes and a propeller
20. dino shark - a shark with a green T-rex head and tiny arms
21. volcano turtle - a sea turtle carrying a small smoking volcano on its shell
22. rocket marlin - a marlin with red rocket fins and a flame at the tail
23. castle octopus - an octopus wearing a stone castle tower as its shell
24. pirate whale - a whale with a mast, a skull flag and an eye patch
25. moon whale - a pale yellow whale shaped like a crescent moon wearing a sleeping cap

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_01.png
```

---

## ⑳ 도트 생물 300마리 — 해역별 12장 (1번 장은 완성)

### 276. `d_sheet_02` — 도트 생물 25마리 · 햇살 연안

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

SHEET THEME: sunny coast: things from a house and a kitchen.

SHEET d_sheet_02.png. EXACT ROW-MAJOR ORDER (never print names/numbers):
1. sock mackerel - a mackerel wearing a striped sock over its tail
2. spoon flounder - a flat flounder whose tail is a silver spoon handle
3. fork squid - a squid whose arms are the prongs of a silver fork
4. button crab - a small crab whose shell is a big round coat button with four holes
5. toothbrush shrimp - a shrimp whose legs are white toothbrush bristles
6. key goby - a goby whose tail is the toothed blade of a brass key
7. clip seahorse - a seahorse whose tail is a wooden clothespin
8. cup snail - a sea snail whose shell is a white coffee mug with a handle
9. pencil gar - a long thin needlefish whose beak is a sharpened yellow pencil tip
10. broom ray - a stingray whose tail is a broom with straw bristles
11. lamp angler - an anglerfish whose lure is a small desk lamp shade
12. iron turtle - a sea turtle whose shell is a steam iron with a handle
13. bell puffer - a round pufferfish wearing a golden bell on a red ribbon collar
14. ladle seal - a seal balancing a soup ladle on its nose
15. whisk jelly - a jellyfish whose tentacles are the wire loops of a whisk
16. clock starfish - a starfish with a round clock face and two hands in its center
17. vacuum eel - an eel whose mouth is a vacuum cleaner nozzle with a ribbed hose neck
18. ladder lobster - a lobster whose long tail is a short wooden ladder
19. mailbox whale - a small red whale with a mail slot mouth and a letter sticking out
20. faucet dolphin - a dolphin whose blowhole is a chrome faucet dripping water
21. sofa manatee - a fat manatee with sofa cushions on its back and little wooden legs
22. fridge orca - an orca with a white refrigerator door on its side, slightly open
23. bathtub whale - a whale carrying a white bathtub with bubbles on its back
24. house turtle - a giant sea turtle whose shell is a small house with a red roof and chimney
25. sun ray - a golden manta ray with a smiling sun face and triangle sun rays along its wings

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_02.png
```

---

### 277. `d_sheet_03` — 도트 생물 25마리 · 산호초 열대

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

SHEET THEME: tropical coral reef: fruit and food.

SHEET d_sheet_03.png. EXACT ROW-MAJOR ORDER (never print names/numbers):
1. banana eel - a yellow eel with a half peeled banana skin around its head
2. lemon puffer - a pufferfish shaped like itself but wearing a lemon slice as a collar fin
3. cherry crab - a crab holding two red cherries as its claws
4. carrot squid - an orange squid whose arms are green carrot leaves
5. corn gar - a long fish with rows of yellow corn kernels as scales and green husk fins
6. melon turtle - a sea turtle whose shell is half a watermelon with black seeds
7. donut seal - a seal wearing a pink frosted donut around its neck
8. egg jelly - a jellyfish whose bell is a fried egg with a yellow yolk
9. pepper shrimp - a red shrimp whose body is curved like a chili pepper with a green stem hat
10. candy seahorse - a seahorse whose curled tail is a spiral lollipop
11. cake turtle - a sea turtle whose shell is a strawberry cake with one candle
12. icecream narwhal - a narwhal whose horn is an upside-down ice cream cone
13. burger clam - a clam whose two shells are burger buns with lettuce and a patty inside
14. sushi ray - a ray with a strip of seaweed around its middle and rice under its belly
15. pineapple puffer - a spiky pufferfish with a green pineapple crown on its head
16. noodle octopus - an octopus whose arms are curly yellow noodles, wearing a ramen bowl hat
17. kettle dolphin - a dolphin with a kettle spout nose puffing steam
18. grill shark - a shark with grill marks on its side carrying a sausage on its dorsal fin
19. coconut crab - a big crab whose shell is a coconut with a straw and a tiny umbrella
20. wok ray - a manta ray shaped like itself with a wok handle tail and vegetables on its back
21. pot whale - a whale whose back is a cooking pot with a lid and steam
22. feast whale - a huge whale carrying a table full of dishes on its back
23. palm turtle - a giant turtle whose shell is a sandy island with two palm trees
24. cake kraken - a giant octopus wearing a three-tier wedding cake as its head
25. rainbow parrotfish - a parrotfish with seven rainbow color bands and a small cloud tail

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_03.png
```

---

### 278. `d_sheet_04` — 도트 생물 25마리 · 산호초 열대

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

SHEET THEME: tropical coral reef: beach, party and toys.

SHEET d_sheet_04.png. EXACT ROW-MAJOR ORDER (never print names/numbers):
1. balloon puffer - a pufferfish with a red balloon knot tail and a string
2. ring seal - a seal wearing a yellow swim ring with a duck head
3. flipper frogfish - a small frogfish wearing two blue swim flippers
4. sunglass ray - a ray wearing black sunglasses
5. bucket crab - a hermit crab living in a red sand bucket with a tiny shovel
6. kite flyingfish - a flying fish whose wings are a diamond kite with a ribbon tail
7. ball dolphin - a dolphin balancing a striped beach ball on its nose
8. snorkel goby - a goby wearing a diving mask and snorkel
9. dice boxfish - a cube-shaped boxfish that is a white dice with black dots
10. yoyo snail - a sea snail whose shell is a red yo-yo with a string
11. drum puffer - a round pufferfish with a drum skin belly and two drumsticks as fins
12. guitar ray - a guitarfish ray with six strings and tuning pegs on its tail
13. camera crab - a crab whose shell is a camera with a big lens eye
14. parasol jelly - a jellyfish whose bell is a striped beach parasol
15. surf shark - a shark riding on a surfboard, wearing swim shorts
16. robot lobster - a tin toy lobster with a wind-up key on its back
17. magic octopus - an octopus wearing a black top hat with a rabbit peeking out
18. disco sunfish - an ocean sunfish with a mirror ball pattern on its round body
19. clown shark - a shark with a red clown nose and a ruffled collar
20. kart turtle - a sea turtle with four wheels and a racing number on its shell
21. carousel seahorse - a seahorse with a golden carousel pole through its back and a saddle
22. ferris jelly - a giant jellyfish whose bell is a ferris wheel with colored cabins
23. circus whale - a whale wearing a red and white striped circus tent on its back
24. coaster eel - a very long eel whose looping body is a roller coaster track with a tiny cart
25. firework squid - a squid shooting colorful firework sparks from its arms

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_04.png
```

---

### 279. `d_sheet_05` — 도트 생물 25마리 · 안개 군도

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

SHEET THEME: foggy islands: old, antique and spooky things.

SHEET d_sheet_05.png. EXACT ROW-MAJOR ORDER (never print names/numbers):
1. lantern angler - an anglerfish whose lure is an old oil lantern
2. candle squid - a squid holding a lit candle on its head
3. ghost jelly - a jellyfish that is a white bedsheet ghost with two black hole eyes
4. broomstick eel - an eel wearing a pointed black witch hat
5. cobweb crab - a grey crab with a cobweb stretched between its claws
6. quill shrimp - a shrimp whose tail is a white feather quill pen with ink
7. bottle goby - a goby living inside a glass bottle with a cork, a message beside it
8. skull puffer - a white pufferfish with a skull face pattern
9. teacup snail - a sea snail whose shell is a cracked porcelain teacup on a saucer
10. pocketwatch turtle - a sea turtle whose shell is a golden pocket watch with a chain
11. violin ray - a ray shaped like itself with violin f-holes and four strings, a bow as its tail
12. gramophone snail - a snail whose shell is a gramophone horn
13. umbrella seal - a seal holding a black umbrella, wearing a bowler hat
14. top hat walrus - a walrus with a monocle, a top hat and a big moustache
15. book flounder - a flat flounder that opens like a book with pages for fins
16. chest crab - a hermit crab living in a small treasure chest with gold coins
17. piano shark - a black shark whose teeth are white and black piano keys
18. knight lobster - a lobster in steel knight armor with a red plume
19. mummy eel - a long eel wrapped in white bandages with one eye showing
20. coffin whale - a pale whale with a wooden coffin lid on its back and a bat sitting on it
21. bell tower turtle - a giant turtle carrying an old stone bell tower on its shell
22. ghost ship whale - a pale whale with a torn-sailed ghost ship growing from its back
23. organ octopus - a giant octopus whose head is a row of golden organ pipes
24. lighthouse squid - a giant squid whose mantle is a red and white lighthouse with a shining lamp
25. mist dragon eel - a long pale eel with an eastern dragon head, antlers and whiskers, trailing mist

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_05.png
```

---

### 280. `d_sheet_06` — 도트 생물 25마리 · 안개 군도

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

SHEET THEME: foggy islands: tools and workshop.

SHEET d_sheet_06.png. EXACT ROW-MAJOR ORDER (never print names/numbers):
1. nail gar - a thin needlefish whose beak is an iron nail
2. wrench crab - a crab whose two claws are steel wrenches
3. screw shrimp - a shrimp whose tail is a spiral metal screw
4. pliers lobster - a lobster whose claws are red-handled pliers
5. tape snail - a sea snail whose shell is a yellow tape measure with the tape sticking out
6. brush squid - a squid whose arms are a paintbrush tip dripping paint
7. magnet ray - a ray with a red horseshoe magnet for a tail, paperclips stuck to it
8. bucket jelly - a jellyfish whose bell is a paint bucket dripping colored paint tentacles
9. ruler eel - a straight yellow eel with ruler marks along its body
10. helmet turtle - a sea turtle whose shell is a yellow hard hat with a headlamp
11. axe shark - a shark whose dorsal fin is a steel axe blade with a wooden handle
12. shovel ray - a ray whose snout is a steel shovel blade
13. anvil puffer - a heavy grey pufferfish with an iron anvil on its head
14. chainsaw swordfish - a swordfish whose bill is a chainsaw bar with teeth
15. ladder seahorse - a red seahorse wearing a firefighter helmet with a hose tail
16. crane crab - a big yellow crab whose one claw is a crane hook on a cable
17. forklift lobster - a yellow lobster whose claws are forklift forks carrying a crate
18. bulldozer shark - a yellow shark with a bulldozer blade jaw and a smokestack fin
19. mixer whale - a whale whose back is a striped cement mixer drum
20. tractor walrus - a walrus with big tractor wheels and a green cab
21. excavator crab - a giant yellow crab whose claw is an excavator arm with a toothed bucket
22. tank turtle - a green sea turtle with a tank turret and cannon on its shell
23. factory whale - a giant whale with brick factory chimneys puffing smoke on its back
24. robot kraken - a giant metal octopus with riveted steel arms and a glowing red eye
25. clockwork whale - a brass whale covered in turning gears with a big wind-up key on its back

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_06.png
```

---

### 281. `d_sheet_07` — 도트 생물 25마리 · 원양 대해

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

SHEET THEME: open ocean: vehicles and travel.

SHEET d_sheet_07.png. EXACT ROW-MAJOR ORDER (never print names/numbers):
1. skate ray - a ray with four small wheels under its belly like a skateboard
2. scooter seahorse - a seahorse riding a kick scooter
3. bike crab - a crab with two bicycle wheels instead of side legs
4. paper plane flyingfish - a flying fish whose wings are folded paper plane wings
5. sail tuna - a tuna whose dorsal fin is a white triangular boat sail
6. anchor eel - an eel whose tail is an iron anchor
7. buoy puffer - a red and white pufferfish with a blinking light on top like a buoy
8. oar squid - a squid holding two wooden oars
9. compass starfish - a starfish with a compass face and a red needle in its center
10. taxi turtle - a yellow sea turtle with a taxi sign on its shell
11. bus whale - a yellow whale with a row of bus windows and a stop sign fin
12. jet swordfish - a swordfish with jet fighter wings and a tail flame
13. heli ray - a ray with a helicopter rotor on its back
14. balloon jelly - a jellyfish whose bell is a striped hot air balloon with a basket below
15. police shark - a shark wearing a police cap with a flashing light on its fin
16. truck walrus - a walrus with a truck cargo box on its back and headlight eyes
17. ambulance seal - a white seal with a red cross and a siren light on its head
18. race marlin - a marlin painted like a race car with a spoiler fin and the number 1
19. airship whale - a silver whale shaped like itself with airship fins and a gondola cabin below
20. ferry whale - a white whale with rows of ship windows, a funnel and tiny lifeboats
21. carrier turtle - a giant grey turtle whose shell is a flat aircraft carrier deck with tiny planes
22. freight eel - a very long eel made of linked cargo containers in different colors
23. airport ray - a giant manta ray with a runway down its back and a control tower
24. space shark - a white shark with space shuttle wings, a black nose and three engine flames
25. ufo ray - a silver manta ray with a glass dome, ring lights and a beam underneath

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_07.png
```

---

### 282. `d_sheet_08` — 도트 생물 25마리 · 원양 대해

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

SHEET THEME: open ocean: sports and jobs.

SHEET d_sheet_08.png. EXACT ROW-MAJOR ORDER (never print names/numbers):
1. soccer seal - a seal wearing a striped soccer jersey kicking a ball
2. glove crab - a crab whose claws are two red boxing gloves
3. bat swordfish - a swordfish whose bill is a wooden baseball bat, wearing a cap
4. racket ray - a round ray with tennis racket strings on its body and a handle tail
5. whistle puffer - a pufferfish blowing a silver whistle
6. medal starfish - a gold starfish hanging from a red ribbon like a medal
7. cap goby - a goby wearing a baseball cap backwards
8. dumbbell shrimp - a muscular shrimp lifting a dumbbell
9. skate penguin fish - a sea bream wearing ice skates and a scarf
10. golf snail - a sea snail whose shell is a white golf ball on a tee
11. chef octopus - an octopus wearing a tall chef hat, holding a pan
12. doctor dolphin - a dolphin wearing a doctor head mirror and a stethoscope
13. painter squid - a squid wearing a beret, holding a palette
14. farmer walrus - a walrus wearing a straw hat with a pitchfork
15. judge seal - a seal wearing a white curly judge wig holding a gavel
16. sumo puffer - a huge round pufferfish with a sumo belt and topknot
17. ninja eel - a black eel with a ninja headband holding a throwing star
18. pirate shark - a shark with an eye patch, a pirate hat and a hook fin
19. astronaut turtle - a sea turtle wearing a round space helmet with a flag on its shell
20. wizard octopus - a purple octopus with a pointed star hat and a magic wand
21. samurai crab - a giant crab in samurai armor with a horned helmet and two swords
22. king walrus - a giant walrus wearing a crown and a red royal cape, holding a scepter
23. stadium turtle - a giant turtle whose shell is an oval sports stadium with lights
24. champion whale - a giant whale wearing a golden champion belt and a laurel wreath
25. trophy narwhal - a golden narwhal whose horn rises from a shining trophy cup on its head

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_08.png
```

---

### 283. `d_sheet_09` — 도트 생물 25마리 · 극지 빙해

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

SHEET THEME: polar ice sea: ice, snow and winter things.

SHEET d_sheet_09.png. EXACT ROW-MAJOR ORDER (never print names/numbers):
1. scarf seal - a white seal pup wearing a red knitted scarf
2. mitten crab - a crab whose claws are two red knitted mittens
3. icecube boxfish - a cube boxfish that is a clear blue ice cube
4. beanie puffer - a pufferfish wearing a knitted beanie with a pompom
5. snowman jelly - a jellyfish whose bell is a snowman head with a carrot nose and coal eyes
6. sled ray - a ray with wooden sled runners under its belly
7. icicle gar - a thin needlefish whose beak is an icicle
8. earmuff goby - a goby wearing fluffy pink earmuffs
9. popsicle squid - a blue squid frozen on a wooden popsicle stick
10. ski seal - a seal wearing ski goggles and two skis
11. igloo turtle - a sea turtle whose shell is an igloo made of ice blocks
12. snowglobe puffer - a round pufferfish inside a glass snow globe on a base
13. heater walrus - a walrus hugging a small red stove, with a kettle on top
14. penguin shark - a shark with a black and white penguin tuxedo pattern and a bow tie
15. skate narwhal - a narwhal wearing ice skates and a sparkly skirt
16. snowplow whale - a whale with an orange snowplow blade on its face
17. yeti seal - a huge shaggy white seal with a yeti face
18. icebreaker orca - an orca with a red icebreaker ship bow as its face
19. frost dragon eel - a pale blue eel with an ice dragon head and icicle spikes
20. mammoth walrus - a walrus with shaggy brown fur, a trunk and huge curved tusks
21. iceberg whale - a giant whale carrying a white iceberg on its back
22. castle narwhal - a giant narwhal carrying an ice castle with blue towers on its back
23. glacier turtle - a giant turtle whose shell is a blue glacier with a tiny research hut
24. polar king bear seal - a giant white seal wearing an ice crown and a fur cape
25. aurora whale - a dark whale with green and pink aurora ribbons flowing from its back

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_09.png
```

---

### 284. `d_sheet_10` — 도트 생물 25마리 · 화산 해역

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

SHEET THEME: volcano sea: fire, heat, metal and dinosaurs.

SHEET d_sheet_10.png. EXACT ROW-MAJOR ORDER (never print names/numbers):
1. match gar - a thin needlefish whose beak is a lit matchstick
2. coal puffer - a black pufferfish glowing orange in its cracks
3. pepper eel - a red eel breathing a small flame with tears in its eyes
4. kettle crab - a crab whose shell is a whistling kettle with steam
5. candle seahorse - a seahorse with a lit candle flame on its head and wax drips
6. toaster boxfish - a boxfish that is a toaster with two slices of toast popping out
7. lava snail - a sea snail whose shell is a tiny volcano with a drop of lava
8. sauna seal - a red-faced seal with a towel on its head shaped like sheep horns
9. grill ray - a ray with a grill grate pattern and one sausage on its back
10. torch squid - a squid holding a flaming torch
11. furnace turtle - a sea turtle whose shell is an iron stove with a glowing door
12. dragon seahorse - a red seahorse with small dragon wings breathing a puff of fire
13. bomb puffer - a round black pufferfish with a lit fuse on its head
14. rocket squid - a squid whose mantle is a red rocket with flames from its arms
15. forge crab - a crab holding a hammer and tongs, with a glowing horseshoe
16. stego turtle - a sea turtle with stegosaurus plates along its shell and a spiked tail
17. ptero ray - a manta ray with a pterodactyl head crest and beak
18. tricera shark - a shark with a triceratops frill and three horns
19. lava whale - a black rock whale with glowing orange lava cracks, spouting lava
20. magma crab - a giant crab made of black rock with molten orange claws
21. bronto eel - a long-necked giant eel with a brontosaurus head and four small flippers
22. volcano whale - a giant whale with an erupting volcano on its back
23. steel kraken - a giant octopus whose head is a steel smelting pot pouring molten metal
24. trex whale - a giant whale with a T-rex head, tiny arms and a striped tail
25. phoenix ray - a manta ray with flaming phoenix wings and a long fire tail

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_10.png
```

---

### 285. `d_sheet_11` — 도트 생물 25마리 · 심연 해구

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

SHEET THEME: abyss trench: lights, electronics and neon.

SHEET d_sheet_11.png. EXACT ROW-MAJOR ORDER (never print names/numbers):
1. led goby - a dark goby with a row of small colored LED lights along its side
2. battery shrimp - a shrimp whose body is a battery with plus and minus ends
3. remote flounder - a flat flounder with remote control buttons on its back
4. mouse ray - a small ray shaped like itself with two mouse buttons and a cable tail
5. bulb jelly - a jellyfish whose bell is a glowing light bulb with a screw base
6. plug eel - an electric eel whose tail is a power plug
7. flashlight squid - a squid whose mantle is a flashlight shining a beam
8. headphone puffer - a pufferfish wearing big headphones
9. usb gar - a thin fish whose snout is a USB connector
10. tv boxfish - a boxfish that is an old TV with two antennas and static on screen
11. radio crab - a crab whose shell is a radio with an antenna and speaker
12. neon seahorse - a seahorse made of a glowing pink neon tube
13. gamepad ray - a ray shaped like itself with a d-pad and four colored buttons
14. camera angler - an anglerfish whose lure is a security camera with a red light
15. phone flounder - a flat flounder with a phone screen on its back showing a cracked display
16. laser swordfish - a swordfish whose bill is a glowing red laser beam
17. robot shark - a steel robot shark with rivets, a red visor eye and a jet tail
18. satellite ray - a manta ray whose wings are blue solar panels with an antenna dish
19. server whale - a dark whale with rows of blinking server lights along its side
20. tesla eel - a giant eel crackling with yellow lightning bolts between two coils on its back
21. arcade whale - a giant whale with an arcade cabinet screen and joystick on its side
22. neon city turtle - a giant turtle carrying a tiny city of glowing neon signs on its shell
23. reactor kraken - a giant octopus wearing a glowing green reactor dome as its head
24. hologram whale - a transparent blue whale made of glowing grid lines
25. blackhole angler - a huge dark anglerfish whose lure is a tiny swirling black hole with a light ring

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_11.png
```

---

### 286. `d_sheet_12` — 도트 생물 25마리 · 환상의 바다

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

SHEET THEME: fantasy sea: sky, stars, royalty and myth.

SHEET d_sheet_12.png. EXACT ROW-MAJOR ORDER (never print names/numbers):
1. star starfish - a glowing yellow starfish with a sleepy face and a small sparkle
2. cloud puffer - a white fluffy pufferfish shaped like itself but made of cloud puffs, raining a little
3. feather flyingfish - a flying fish with white angel feather wings and a halo
4. rainbow eel - an eel with seven rainbow color bands along its body
5. comet gar - a thin fish with a glowing comet tail of sparkles
6. crown seahorse - a golden seahorse wearing a tiny crown and a cape
7. harp ray - a ray whose wing is strung like a golden harp
8. unicorn dolphin - a white dolphin with a spiral horn and a rainbow mane
9. planet puffer - a round pufferfish with a ring around it like Saturn
10. moon jelly - a jellyfish whose bell is a glowing crescent moon
11. pegasus seahorse - a white seahorse with large feathered wings
12. crystal turtle - a sea turtle whose shell is a cluster of purple crystals
13. throne walrus - a walrus sitting on a golden throne with a jeweled crown
14. galaxy ray - a dark manta ray with a spiral galaxy and stars on its back
15. sun whale - a golden whale with flame rays around its body like the sun
16. dragon king eel - a giant eel with a dragon head wearing an emperor crown, holding a glowing pearl
17. floating island whale - a giant whale carrying a floating island with a waterfall on its back
18. temple turtle - a giant turtle carrying a white marble temple with columns on its shell
19. world whale - a colossal whale carrying a tiny globe with continents on its back
20. constellation shark - a dark blue shark made of white star dots joined by lines
21. star whale - a night-sky whale covered in stars, spouting a fountain of stars
22. rainbow serpent - a huge sea serpent arched like a rainbow with clouds at both ends
23. cosmos kraken - a giant octopus whose head is a purple nebula, each arm ending in a planet
24. angel whale - a white whale with huge feathered wings and a golden halo
25. sea god leviathan - a huge sea dragon with a golden crown, a long white beard and a trident

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_12.png
```

---

### 287. `d_sheet_01_s` — 놀람 표정 시험: 1번 장의 25마리를 놀란 얼굴로

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

THIS IS A SECOND FRAME FOR AN EXISTING SHEET. Open assets/raw/d_sheet_01.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Redraw the SAME 25 creatures, in the SAME 25 cells, same order, same size, same colors, same pixel grid and same body outline. Change ONLY the expression to SHOCKED: the eye becomes twice as big with a tiny pupil, the mouth opens wide, fins or limbs stick straight out a little, and 2 or 3 single sweat-drop pixels fly off the head. Everything else must stay pixel-for-pixel identical so that flipping between the two sheets looks like a 2-frame animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_01_s.png
```

---

## ㉑ 평범한 물고기 50마리 — 모든 해역 공용 (2장)

### 288. `d_sheet_13` — 평범한 물고기 25마리 (공용 1/2)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: these are ORDINARY real sea creatures, the plain everyday catch. Draw each one as itself with its real body shape and natural colors, instantly recognizable from the silhouette. No objects, no costumes, no gags. Simple friendly deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

SHEET d_sheet_13.png. EXACT ROW-MAJOR ORDER (never print names/numbers):
1. mackerel with blue wavy back stripes
2. tiny silver anchovy
3. small sardine with a row of dark dots
4. silver herring
5. red sea bream
6. flat brown flounder with both eyes on top
7. round yellow-brown pufferfish with small spikes
8. small sandy goby with big eyes
9. slim grey-brown pollock
10. yellow croaker
11. grey mullet
12. dark chunky rockfish with spiny fin
13. diamond-shaped filefish with a small horn spine
14. long thin silver-blue saury
15. very long ribbon-like silver hairtail
16. pale pink squid
17. red-brown octopus
18. pink shrimp
19. blue-grey swimming crab
20. closed clam with ridged shell
21. spiral sea snail shell with a snail peeking out
22. orange starfish
23. pale blue jellyfish
24. black spiky sea urchin
25. yellow seahorse

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_13.png
```

---

### 289. `d_sheet_14` — 평범한 물고기 25마리 (공용 2/2)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: these are ORDINARY real sea creatures, the plain everyday catch. Draw each one as itself with its real body shape and natural colors, instantly recognizable from the silhouette. No objects, no costumes, no gags. Simple friendly deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

SHEET d_sheet_14.png. EXACT ROW-MAJOR ORDER (never print names/numbers):
1. orange clownfish with white bands
2. blue tang with a yellow tail
3. yellow butterflyfish with a black eye stripe
4. flying fish with wide wing fins
5. dark brown eel
6. big-headed cod with a chin whisker
7. silver salmon with pink side
8. yellowtail amberjack with a yellow side stripe
9. striped bonito
10. bluefin tuna
11. red lobster
12. hermit crab in a spiral shell
13. striped cuttlefish
14. brown stingray with a long tail
15. green sea turtle
16. grey spotted seal
17. grey dolphin
18. grey shark with white belly
19. swordfish with a long bill
20. round ocean sunfish
21. black and white manta ray
22. dark anglerfish with a small glowing lure
23. black and white orca
24. blue-grey whale with a small spout
25. spotted whale shark

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_14.png
```

---

## ㉒ 놀람 표정 — 나머지 13장

### 290. `d_sheet_02_s` — 놀람 표정: 2번 장 25마리 (햇살 연안)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

THIS IS A SECOND FRAME FOR AN EXISTING SHEET. Open assets/raw/d_sheet_02.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Redraw the SAME 25 creatures, in the SAME 25 cells, same order, same size, same colors, same pixel grid and same body outline. Change ONLY the expression to SHOCKED: the eye becomes twice as big with a tiny pupil, the mouth opens wide, fins or limbs stick straight out a little, and 2 or 3 single sweat-drop pixels fly off the head. Everything else must stay pixel-for-pixel identical so that flipping between the two sheets looks like a 2-frame animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_02_s.png
```


---

### 291. `d_sheet_03_s` — 놀람 표정: 3번 장 25마리 (산호초 열대)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

THIS IS A SECOND FRAME FOR AN EXISTING SHEET. Open assets/raw/d_sheet_03.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Redraw the SAME 25 creatures, in the SAME 25 cells, same order, same size, same colors, same pixel grid and same body outline. Change ONLY the expression to SHOCKED: the eye becomes twice as big with a tiny pupil, the mouth opens wide, fins or limbs stick straight out a little, and 2 or 3 single sweat-drop pixels fly off the head. Everything else must stay pixel-for-pixel identical so that flipping between the two sheets looks like a 2-frame animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_03_s.png
```


---

### 292. `d_sheet_04_s` — 놀람 표정: 4번 장 25마리 (산호초 열대)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

THIS IS A SECOND FRAME FOR AN EXISTING SHEET. Open assets/raw/d_sheet_04.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Redraw the SAME 25 creatures, in the SAME 25 cells, same order, same size, same colors, same pixel grid and same body outline. Change ONLY the expression to SHOCKED: the eye becomes twice as big with a tiny pupil, the mouth opens wide, fins or limbs stick straight out a little, and 2 or 3 single sweat-drop pixels fly off the head. Everything else must stay pixel-for-pixel identical so that flipping between the two sheets looks like a 2-frame animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_04_s.png
```


---

### 293. `d_sheet_05_s` — 놀람 표정: 5번 장 25마리 (안개 군도)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

THIS IS A SECOND FRAME FOR AN EXISTING SHEET. Open assets/raw/d_sheet_05.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Redraw the SAME 25 creatures, in the SAME 25 cells, same order, same size, same colors, same pixel grid and same body outline. Change ONLY the expression to SHOCKED: the eye becomes twice as big with a tiny pupil, the mouth opens wide, fins or limbs stick straight out a little, and 2 or 3 single sweat-drop pixels fly off the head. Everything else must stay pixel-for-pixel identical so that flipping between the two sheets looks like a 2-frame animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_05_s.png
```


---

### 294. `d_sheet_06_s` — 놀람 표정: 6번 장 25마리 (안개 군도)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

THIS IS A SECOND FRAME FOR AN EXISTING SHEET. Open assets/raw/d_sheet_06.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Redraw the SAME 25 creatures, in the SAME 25 cells, same order, same size, same colors, same pixel grid and same body outline. Change ONLY the expression to SHOCKED: the eye becomes twice as big with a tiny pupil, the mouth opens wide, fins or limbs stick straight out a little, and 2 or 3 single sweat-drop pixels fly off the head. Everything else must stay pixel-for-pixel identical so that flipping between the two sheets looks like a 2-frame animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_06_s.png
```


---

### 295. `d_sheet_07_s` — 놀람 표정: 7번 장 25마리 (원양 대해)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

THIS IS A SECOND FRAME FOR AN EXISTING SHEET. Open assets/raw/d_sheet_07.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Redraw the SAME 25 creatures, in the SAME 25 cells, same order, same size, same colors, same pixel grid and same body outline. Change ONLY the expression to SHOCKED: the eye becomes twice as big with a tiny pupil, the mouth opens wide, fins or limbs stick straight out a little, and 2 or 3 single sweat-drop pixels fly off the head. Everything else must stay pixel-for-pixel identical so that flipping between the two sheets looks like a 2-frame animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_07_s.png
```


---

### 296. `d_sheet_08_s` — 놀람 표정: 8번 장 25마리 (원양 대해)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

THIS IS A SECOND FRAME FOR AN EXISTING SHEET. Open assets/raw/d_sheet_08.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Redraw the SAME 25 creatures, in the SAME 25 cells, same order, same size, same colors, same pixel grid and same body outline. Change ONLY the expression to SHOCKED: the eye becomes twice as big with a tiny pupil, the mouth opens wide, fins or limbs stick straight out a little, and 2 or 3 single sweat-drop pixels fly off the head. Everything else must stay pixel-for-pixel identical so that flipping between the two sheets looks like a 2-frame animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_08_s.png
```


---

### 297. `d_sheet_09_s` — 놀람 표정: 9번 장 25마리 (극지 빙해)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

THIS IS A SECOND FRAME FOR AN EXISTING SHEET. Open assets/raw/d_sheet_09.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Redraw the SAME 25 creatures, in the SAME 25 cells, same order, same size, same colors, same pixel grid and same body outline. Change ONLY the expression to SHOCKED: the eye becomes twice as big with a tiny pupil, the mouth opens wide, fins or limbs stick straight out a little, and 2 or 3 single sweat-drop pixels fly off the head. Everything else must stay pixel-for-pixel identical so that flipping between the two sheets looks like a 2-frame animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_09_s.png
```


---

### 298. `d_sheet_10_s` — 놀람 표정: 10번 장 25마리 (화산 해역)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

THIS IS A SECOND FRAME FOR AN EXISTING SHEET. Open assets/raw/d_sheet_10.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Redraw the SAME 25 creatures, in the SAME 25 cells, same order, same size, same colors, same pixel grid and same body outline. Change ONLY the expression to SHOCKED: the eye becomes twice as big with a tiny pupil, the mouth opens wide, fins or limbs stick straight out a little, and 2 or 3 single sweat-drop pixels fly off the head. Everything else must stay pixel-for-pixel identical so that flipping between the two sheets looks like a 2-frame animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_10_s.png
```


---

### 299. `d_sheet_11_s` — 놀람 표정: 11번 장 25마리 (심연 해구)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

THIS IS A SECOND FRAME FOR AN EXISTING SHEET. Open assets/raw/d_sheet_11.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Redraw the SAME 25 creatures, in the SAME 25 cells, same order, same size, same colors, same pixel grid and same body outline. Change ONLY the expression to SHOCKED: the eye becomes twice as big with a tiny pupil, the mouth opens wide, fins or limbs stick straight out a little, and 2 or 3 single sweat-drop pixels fly off the head. Everything else must stay pixel-for-pixel identical so that flipping between the two sheets looks like a 2-frame animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_11_s.png
```


---

### 300. `d_sheet_12_s` — 놀람 표정: 12번 장 25마리 (환상의 바다)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: every creature is a funny imaginary sea animal. It is an ANIMAL FIRST - the real animal's body shape, fins and tail must be instantly readable from the silhouette. The gag is ONE everyday object that replaces ONE body part or sits on the body as one accessory. Never turn the whole animal into the object. Dumb deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

THIS IS A SECOND FRAME FOR AN EXISTING SHEET. Open assets/raw/d_sheet_12.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Redraw the SAME 25 creatures, in the SAME 25 cells, same order, same size, same colors, same pixel grid and same body outline. Change ONLY the expression to SHOCKED: the eye becomes twice as big with a tiny pupil, the mouth opens wide, fins or limbs stick straight out a little, and 2 or 3 single sweat-drop pixels fly off the head. Everything else must stay pixel-for-pixel identical so that flipping between the two sheets looks like a 2-frame animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_12_s.png
```


---

### 301. `d_sheet_13_s` — 놀람 표정: 13번 장 25마리 (모든 해역 공용)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: these are ORDINARY real sea creatures, the plain everyday catch. Draw each one as itself with its real body shape and natural colors, instantly recognizable from the silhouette. No objects, no costumes, no gags. Simple friendly deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

THIS IS A SECOND FRAME FOR AN EXISTING SHEET. Open assets/raw/d_sheet_13.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Redraw the SAME 25 creatures, in the SAME 25 cells, same order, same size, same colors, same pixel grid and same body outline. Change ONLY the expression to SHOCKED: the eye becomes twice as big with a tiny pupil, the mouth opens wide, fins or limbs stick straight out a little, and 2 or 3 single sweat-drop pixels fly off the head. Everything else must stay pixel-for-pixel identical so that flipping between the two sheets looks like a 2-frame animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_13_s.png
```


---

### 302. `d_sheet_14_s` — 놀람 표정: 14번 장 25마리 (모든 해역 공용)

```
Create a production game sprite sheet for a fishing game. OUTPUT EXACTLY 1024x1024 square. Exactly 25 distinct whole-body sea creature sprites on a strictly invisible 5 columns x 5 rows grid. Evenly spaced cell centers at about x=102,307,512,717,922 and y=102,307,512,717,922. All 25 sprites visible and separate. No missing rows, no extra creatures, no captions.
TRUE LOW-RES PIXEL ART: each creature must fit a 22 wide by 16 tall logical-pixel bitmap, enlarged NEAREST NEIGHBOR 8x to approximately 176x128 image pixels; one logical pixel is an 8x8 SOLID SQUARE block. Never draw sub-pixel details. Dark one-logical-pixel outline #1a1c2c. Use chunky stepped contours, one-pixel square eye, big head, expressive species silhouette, appealing polished handheld-console sprite design, like the pets on a modern color Tamagotchi screen. Pure SIDE view facing RIGHT. Whole body with no amputated fins or tail. No smooth vector curves. Only 1-2 tone flat shading, absolutely no gradients, antialiasing, blur, soft shadows, checkerboard, water, bubbles, ground or cast shadows, frames, borders, grid lines, typography, numerals, labels, watermarks.
Background MUST be perfectly uniform solid MAGENTA #FF00FF over all empty space. Do not use magenta/pink-magenta in creatures. Ample margins and gaps; artwork within each 180x150 central cell area.
Only permitted colors: #1a1c2c #333c57 #566c86 #94b0c2 #f4f4f4 #2b1d14 #5d3a24 #8a5a3b #c28a5c #e8c39e #f6e6c8 #8b1e2d #d83a3a #ef7d32 #f7c948 #fff3a3 #e0a526 #1f5d3a #38a35b #a7d65b #2a9d8f #29366f #3b5dc9 #41a6f6 #73eff7 #5d275d #8e44ad #f08cbe #ffc8dd #c7cfdd #ffb7d0 #b8452e #d9822b #6b8f2e #e9f3ff #7fb5d6 #3e2f5b #f2e3a0.
DESIGN RULE: these are ORDINARY real sea creatures, the plain everyday catch. Draw each one as itself with its real body shape and natural colors, instantly recognizable from the silhouette. No objects, no costumes, no gags. Simple friendly deadpan face.
IMPORTANT: readability through deliberate bold pixel clusters, not through adding high-resolution details. All creatures share the same pixel size and art direction.

THIS IS A SECOND FRAME FOR AN EXISTING SHEET. Open assets/raw/d_sheet_14.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Redraw the SAME 25 creatures, in the SAME 25 cells, same order, same size, same colors, same pixel grid and same body outline. Change ONLY the expression to SHOCKED: the eye becomes twice as big with a tiny pupil, the mouth opens wide, fins or limbs stick straight out a little, and 2 or 3 single sweat-drop pixels fly off the head. Everything else must stay pixel-for-pixel identical so that flipping between the two sheets looks like a 2-frame animation.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name d_sheet_14_s.png
```


---

## ㉓ 낚시 이펙트 — 연속 동작 그림

### 303. `c_erupt_seq` — 물 폭발 6동작 (솟음 → 퍼짐 → 무너짐 → 잔거품)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_erupt.png and
assets/raw/c_wave.png. Every image you make must look like it belongs to those: the same
painterly storybook sea, the same white foam with soft turquoise shadows, same lighting.

No text. Fully transparent background. Draw only the water effect: no sea surface below it,
no sky, no boat, no creature.

A sprite sheet of 6 frames in a grid of 3 columns x 2 rows, never touching, showing ONE huge
water eruption from the sea surface over time (as if something enormous burst out). Every
frame is drawn at the same scale with its bottom edge on the same flat waterline, centered
in its cell, so the frames can be shown in sequence as an animation:
1) the surface domes up and cracks, first jets of white water shooting up from the middle,
2) a tall thick column of white water and foam rising fast, narrow at the base,
3) the column at full height, crown opening outward at the top, heavy sheets of water,
4) the top spreading wide and starting to fall, curtains of water and many falling drops,
5) the column collapsing, most water falling back, a wide low ring of foam at the base,
6) only a low mound of churning white foam and a few last drops.
White and pale turquoise water only - NOT cream, NOT orange, no flame-like streaks.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_erupt_seq.png
```

---

### 304. `c_drops` — 물방울·물줄기 조각 8개

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_erupt.png and
assets/raw/c_wave.png. Every image you make must look like it belongs to those: the same
painterly storybook sea, the same white foam with soft turquoise shadows, same lighting.

No text. Fully transparent background. Draw only the water effect: no sea surface below it,
no sky, no boat, no creature.

A sprite sheet of 8 separate small water pieces in a grid of 4 columns x 2 rows, never
touching: flying water thrown up by a big splash. Real water shapes, not decorative swirls:
1) a single round drop with a highlight, 2) a teardrop with a short tail, 3) a cluster of
three small drops, 4) a short thick splash arc, 5) a longer thin streak of water breaking
into beads at the end, 6) a small crown splash, 7) a flat blob of foam, 8) a fan of fine
spray mist. White with pale turquoise shading and a thin soft outline.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_drops.png
```

---

### 305. `c_plop` — 작은 튐 4동작 (찌가 떨어질 때·입질 때)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_erupt.png and
assets/raw/c_wave.png. Every image you make must look like it belongs to those: the same
painterly storybook sea, the same white foam with soft turquoise shadows, same lighting.

No text. Fully transparent background. Draw only the water effect: no sea surface below it,
no sky, no boat, no creature.

A sprite sheet of 4 frames in one row, never touching, showing ONE small splash where a
fishing float lands on calm water, over time. Same scale, bottom edge on the same flat
waterline in every frame:
1) a tiny crown of water just rising, 2) the crown at full height with a few drops flying,
3) the crown falling, a ring starting to spread, 4) only a thin wide ripple ring and one drop.
Small, light and delicate.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_plop.png
```

---

### 306. `c_foam` — 수면 거품 띠 4동작 (물속에서 몸부림칠 때)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_erupt.png and
assets/raw/c_wave.png. Every image you make must look like it belongs to those: the same
painterly storybook sea, the same white foam with soft turquoise shadows, same lighting.

No text. Fully transparent background. Draw only the water effect: no sea surface below it,
no sky, no boat, no creature.

A sprite sheet of 4 frames stacked in 4 rows, never touching. Each frame is one long
horizontal strip of churning white foam and small waves lying ON the water surface, seen
from the side - what the surface looks like when something huge thrashes just below it.
Each strip is about 6 times wider than tall, fades out softly at its left and right ends,
and sits on the same flat waterline. From top to bottom the foam gets stronger:
1) light ripples and a little foam, 2) lumpy small waves with foam caps, 3) tall choppy
peaks with spray, 4) violent boiling water with spray flying up.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_foam.png
```

---

### 307. `c_rays2` — 금빛 빛줄기

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_erupt.png and
assets/raw/c_wave.png. Every image you make must look like it belongs to those: the same
painterly storybook sea, the same white foam with soft turquoise shadows, same lighting.

No text. Fully transparent background. Draw only the water effect: no sea surface below it,
no sky, no boat, no creature.

One image: a radial burst of warm GOLDEN sunlight rays, seen from the front, like the glow
behind a holy treasure. A bright soft golden-white center fading into long alternating wide
and narrow rays of rich gold and amber that reach the edges and fade to fully transparent.
No hard outline. Perfectly centered and symmetric so it can be rotated slowly.
Strong saturated gold - not white, not grey.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_rays2.png
```

---

## ㉔ 해역 2~8번 배경 — 하늘과 물속

### 308. `c_sky_2` — 2번 해역 산호초 열대: 하늘·구름·먼 풍경

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The sky of a different sea region: the tropical coral reef sea. Same composition and same size as
assets/raw/c_sky.png (everything above the horizon; the bottom edge is the flat horizon line),
but a different place:
a bright turquoise-blue tropical sky with tall white cumulus clouds, low green islands with palm trees and white beaches, pink coral rocks showing at the waterline.
No boat, no people, no fishing line, no sea surface. Very wide 3:1 image. Keep the upper
middle of the sky fairly calm and open - a giant creature will be shown there.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_2.png
```

---

### 309. `c_sea_2` — 2번 해역 산호초 열대: 물속 단면

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The underwater cross-section of a different sea region: the tropical coral reef sea. Same composition and same
size as assets/raw/c_sea.png (everything below the waterline, seen from the side; the top
edge is the water surface), but different water:
clear emerald-turquoise water, very bright near the surface, with faint pink and orange coral shapes far below at the bottom edge.
Keep it calm and mostly empty: no fish, no creatures, no plants in the middle - a large dark
shadow must stay clearly visible against it, so the upper two thirds must be light enough.
Very wide image, same aspect ratio as c_sea.png.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sea_2.png
```

---

### 310. `c_sky_3` — 3번 해역 안개 군도: 하늘·구름·먼 풍경

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The sky of a different sea region: the foggy archipelago. Same composition and same size as
assets/raw/c_sky.png (everything above the horizon; the bottom edge is the flat horizon line),
but a different place:
a pale grey-blue overcast sky, layers of soft mist, dim silhouettes of rocky pine-covered islands fading into the fog, a faint cold sun disc.
No boat, no people, no fishing line, no sea surface. Very wide 3:1 image. Keep the upper
middle of the sky fairly calm and open - a giant creature will be shown there.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_3.png
```

---

### 311. `c_sea_3` — 3번 해역 안개 군도: 물속 단면

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The underwater cross-section of a different sea region: the foggy archipelago. Same composition and same
size as assets/raw/c_sea.png (everything below the waterline, seen from the side; the top
edge is the water surface), but different water:
grey-blue-green murky water, misty and soft, darker and greyer toward the bottom.
Keep it calm and mostly empty: no fish, no creatures, no plants in the middle - a large dark
shadow must stay clearly visible against it, so the upper two thirds must be light enough.
Very wide image, same aspect ratio as c_sea.png.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sea_3.png
```

---

### 312. `c_sky_4` — 4번 해역 원양 대해: 하늘·구름·먼 풍경

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The sky of a different sea region: the open ocean. Same composition and same size as
assets/raw/c_sky.png (everything above the horizon; the bottom edge is the flat horizon line),
but a different place:
a vast deep blue sky with long thin clouds and a completely open horizon, no land at all, one tiny distant whale spout.
No boat, no people, no fishing line, no sea surface. Very wide 3:1 image. Keep the upper
middle of the sky fairly calm and open - a giant creature will be shown there.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_4.png
```

---

### 313. `c_sea_4` — 4번 해역 원양 대해: 물속 단면

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The underwater cross-section of a different sea region: the open ocean. Same composition and same
size as assets/raw/c_sea.png (everything below the waterline, seen from the side; the top
edge is the water surface), but different water:
deep rich ultramarine blue water, clean and endless, getting very dark navy toward the bottom.
Keep it calm and mostly empty: no fish, no creatures, no plants in the middle - a large dark
shadow must stay clearly visible against it, so the upper two thirds must be light enough.
Very wide image, same aspect ratio as c_sea.png.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sea_4.png
```

---

### 314. `c_sky_5` — 5번 해역 극지 빙해: 하늘·구름·먼 풍경

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The sky of a different sea region: the polar ice sea. Same composition and same size as
assets/raw/c_sky.png (everything above the horizon; the bottom edge is the flat horizon line),
but a different place:
a cold pale sky with green and violet aurora ribbons, white icebergs and blue glacier cliffs on the horizon, snow haze.
No boat, no people, no fishing line, no sea surface. Very wide 3:1 image. Keep the upper
middle of the sky fairly calm and open - a giant creature will be shown there.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_5.png
```

---

### 315. `c_sea_5` — 5번 해역 극지 빙해: 물속 단면

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The underwater cross-section of a different sea region: the polar ice sea. Same composition and same
size as assets/raw/c_sea.png (everything below the waterline, seen from the side; the top
edge is the water surface), but different water:
icy pale cyan water near the surface with soft light, turning to deep cold blue, a few pale ice chunks under the surface at the top edge.
Keep it calm and mostly empty: no fish, no creatures, no plants in the middle - a large dark
shadow must stay clearly visible against it, so the upper two thirds must be light enough.
Very wide image, same aspect ratio as c_sea.png.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sea_5.png
```

---

### 316. `c_sky_6` — 6번 해역 화산 해역: 하늘·구름·먼 풍경

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The sky of a different sea region: the volcanic sea. Same composition and same size as
assets/raw/c_sky.png (everything above the horizon; the bottom edge is the flat horizon line),
but a different place:
a dark red and charcoal sky filled with ash clouds, black volcanic islands with glowing orange lava flows and one erupting volcano, embers in the air.
No boat, no people, no fishing line, no sea surface. Very wide 3:1 image. Keep the upper
middle of the sky fairly calm and open - a giant creature will be shown there.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_6.png
```

---

### 317. `c_sea_6` — 6번 해역 화산 해역: 물속 단면

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The underwater cross-section of a different sea region: the volcanic sea. Same composition and same
size as assets/raw/c_sea.png (everything below the waterline, seen from the side; the top
edge is the water surface), but different water:
dark teal-black water with an orange-red glow near the surface, and faint glowing lava cracks at the very bottom.
Keep it calm and mostly empty: no fish, no creatures, no plants in the middle - a large dark
shadow must stay clearly visible against it, so the upper two thirds must be light enough.
Very wide image, same aspect ratio as c_sea.png.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sea_6.png
```

---

### 318. `c_sky_7` — 7번 해역 심연 해구: 하늘·구름·먼 풍경

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The sky of a different sea region: the abyss trench. Same composition and same size as
assets/raw/c_sky.png (everything above the horizon; the bottom edge is the flat horizon line),
but a different place:
a deep indigo night sky with a thin moon and a few stars, low black rock spires on the horizon, glowing cyan bioluminescent streaks on the distant water.
No boat, no people, no fishing line, no sea surface. Very wide 3:1 image. Keep the upper
middle of the sky fairly calm and open - a giant creature will be shown there.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_7.png
```

---

### 319. `c_sea_7` — 7번 해역 심연 해구: 물속 단면

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The underwater cross-section of a different sea region: the abyss trench. Same composition and same
size as assets/raw/c_sea.png (everything below the waterline, seen from the side; the top
edge is the water surface), but different water:
very dark indigo-violet water with scattered tiny cyan and magenta glowing specks, almost black at the bottom.
Keep it calm and mostly empty: no fish, no creatures, no plants in the middle - a large dark
shadow must stay clearly visible against it, so the upper two thirds must be light enough.
Very wide image, same aspect ratio as c_sea.png.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sea_7.png
```

---

### 320. `c_sky_8` — 8번 해역 환상의 바다: 하늘·구름·먼 풍경

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The sky of a different sea region: the fantasy sea. Same composition and same size as
assets/raw/c_sky.png (everything above the horizon; the bottom edge is the flat horizon line),
but a different place:
a dreamy purple and gold twilight sky full of stars and a huge pale moon, small floating islands with waterfalls hanging in the air, golden clouds.
No boat, no people, no fishing line, no sea surface. Very wide 3:1 image. Keep the upper
middle of the sky fairly calm and open - a giant creature will be shown there.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_8.png
```

---

### 321. `c_sea_8` — 8번 해역 환상의 바다: 물속 단면

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The underwater cross-section of a different sea region: the fantasy sea. Same composition and same
size as assets/raw/c_sea.png (everything below the waterline, seen from the side; the top
edge is the water surface), but different water:
luminous violet-blue water with golden star-like sparkles drifting in it, deep purple at the bottom.
Keep it calm and mostly empty: no fish, no creatures, no plants in the middle - a large dark
shadow must stay clearly visible against it, so the upper two thirds must be light enough.
Very wide image, same aspect ratio as c_sea.png.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sea_8.png
```

---

## ㉕ 화면 UI — 게이지·카드·글자·버튼

### 322. `ui2_gauge` — 게이지: 장력·힘

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Game UI pieces for that game:
warm storybook style, hand-painted, cream parchment, polished wood, brass and rope, soft
shading, dark navy outline. Elegant and calm - a premium fishing game, not a cartoon.

Fully transparent background. Pieces never touch each other.

No text, no numbers.

4 pieces stacked in 4 rows, each a long horizontal bar about 8 times wider than tall:
1) an EMPTY line-tension gauge frame: brass and wood, a hollow dark track inside, a tiny
   fish-hook ornament at the left end,
2) the FILL for it: a plain glowing bar with rounded ends that fits inside the track,
   colored in three zones from left to right - calm green, warm yellow, danger red,
3) an EMPTY casting-power gauge frame: rope-wrapped wood, a hollow dark track inside,
   a tiny float ornament at the left end,
4) the FILL for it: a plain glowing golden bar with rounded ends.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui2_gauge.png
```

---

### 323. `ui2_card` — 결과 카드 틀 6종 (등급별)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Game UI pieces for that game:
warm storybook style, hand-painted, cream parchment, polished wood, brass and rope, soft
shading, dark navy outline. Elegant and calm - a premium fishing game, not a cartoon.

Fully transparent background. Pieces never touch each other.

No text, no numbers.

6 empty result-card frames in a grid of 3 columns x 2 rows. Each is a horizontal parchment
card (about 3:2) with a decorative border, a large empty picture window on the upper part
and two empty lines of space below for text. Same shape for all six, the border material
shows the rank:
1) plain grey driftwood, 2) green-painted wood with a leaf, 3) blue enamel with a wave,
4) purple velvet with silver corners, 5) orange-gold with small gems,
6) radiant gold with a rainbow shimmer and star corners.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui2_card.png
```

---

### 324. `ui2_caught` — "낚았다!" 글자 6종 (등급별)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Game UI pieces for that game:
warm storybook style, hand-painted, cream parchment, polished wood, brass and rope, soft
shading, dark navy outline. Elegant and calm - a premium fishing game, not a cartoon.

Fully transparent background. Pieces never touch each other.

6 pieces in a grid of 2 columns x 3 rows. Each piece is the same Korean word, written
EXACTLY as these four characters: 낚았다!   (낚, 았, 다, and an exclamation mark).
Thick rounded hand-lettered display type with a dark navy outline. Check the spelling of
every piece carefully - no other text anywhere.
The six differ only in color and decoration, growing more spectacular:
1) cream white, plain, 2) fresh green with a small leaf sparkle, 3) ocean blue with a
splash, 4) royal purple with stars, 5) blazing orange-gold with flames and sparks,
6) shining gold with a rainbow edge and bursting stars.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui2_caught.png
```

---

### 325. `ui2_stamp` — 도장 2종과 리본

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Game UI pieces for that game:
warm storybook style, hand-painted, cream parchment, polished wood, brass and rope, soft
shading, dark navy outline. Elegant and calm - a premium fishing game, not a cartoon.

Fully transparent background. Pieces never touch each other.

4 pieces in one row:
1) a round red ink stamp, slightly worn, with the Korean text written EXACTLY as: 첫 포획
2) a round gold ink stamp with a small crown, with the Korean text written EXACTLY as: 신기록
3) an empty curled ribbon banner (no text) in cream,
4) an empty small round badge (no text) with a laurel border.
Check the Korean spelling carefully. No other text.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui2_stamp.png
```

---

### 326. `ui2_hud` — 화면 버튼·판

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Game UI pieces for that game:
warm storybook style, hand-painted, cream parchment, polished wood, brass and rope, soft
shading, dark navy outline. Elegant and calm - a premium fishing game, not a cartoon.

Fully transparent background. Pieces never touch each other.

No text, no numbers.

8 pieces in a grid of 4 columns x 2 rows:
1) a small empty wooden plaque with a gold coin on its left end (for the money counter),
2) a small empty wooden plaque with a fish-crate icon on its left end (for the catch hold),
3) an empty wide rounded button, cream parchment on wood, normal state,
4) the same button pressed down (darker, shifted 1 step down),
5) a round icon button with a harbor lighthouse,
6) a round icon button with a rolled sea map,
7) a round icon button with an open book (fish encyclopedia),
8) a round icon button with a gear.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui2_hud.png
```

---

## ㉖ 항구 마을 — 배경 5단계, 건물 5단계, 주인, 가게 판, 아이콘

### 327. `h_town_1` — 항구 배경 1단계: 작은 어촌

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text. Opaque image.

The harbor town screen background, stage 1 of 5 of the same town growing over time:
a tiny poor fishing hamlet: a short rickety wooden pier, a few thatched huts, nets drying on poles, one small rowboat.
Side view, same eye level and same horizon height as the sea screens (horizon at about 58% of
the image height). The lower part is calm harbor water with the pier or quay running along
the waterline; the town sits on a low green shore behind it; sky above like in c_sky.png.
Leave the row of shop buildings OUT - keep an empty strip of ground along the quay where 6
buildings will be placed later. No people, no text on signs. 16:9 image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_town_1.png
```

---

### 328. `h_town_2` — 항구 배경 2단계: 포구 마을

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text. Opaque image.

The harbor town screen background, stage 2 of 5 of the same town growing over time:
a small fishing village: a proper wooden pier, tiled-roof houses, a few lanterns, barrels and crates.
Side view, same eye level and same horizon height as the sea screens (horizon at about 58% of
the image height). The lower part is calm harbor water with the pier or quay running along
the waterline; the town sits on a low green shore behind it; sky above like in c_sky.png.
Leave the row of shop buildings OUT - keep an empty strip of ground along the quay where 6
buildings will be placed later. No people, no text on signs. 16:9 image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_town_2.png
```

---

### 329. `h_town_3` — 항구 배경 3단계: 항구 마을

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text. Opaque image.

The harbor town screen background, stage 3 of 5 of the same town growing over time:
a lively harbor town: a stone quay, two-storey houses, a small white lighthouse, flags, market stalls.
Side view, same eye level and same horizon height as the sea screens (horizon at about 58% of
the image height). The lower part is calm harbor water with the pier or quay running along
the waterline; the town sits on a low green shore behind it; sky above like in c_sky.png.
Leave the row of shop buildings OUT - keep an empty strip of ground along the quay where 6
buildings will be placed later. No people, no text on signs. 16:9 image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_town_3.png
```

---

### 330. `h_town_4` — 항구 배경 4단계: 큰 항구

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text. Opaque image.

The harbor town screen background, stage 4 of 5 of the same town growing over time:
a big prosperous port: long stone docks, tall houses, a clock tower, a tall lighthouse, cranes, many masts in the distance.
Side view, same eye level and same horizon height as the sea screens (horizon at about 58% of
the image height). The lower part is calm harbor water with the pier or quay running along
the waterline; the town sits on a low green shore behind it; sky above like in c_sky.png.
Leave the row of shop buildings OUT - keep an empty strip of ground along the quay where 6
buildings will be placed later. No people, no text on signs. 16:9 image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_town_4.png
```

---

### 331. `h_town_5` — 항구 배경 5단계: 환상의 항구

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text. Opaque image.

The harbor town screen background, stage 5 of 5 of the same town growing over time:
a legendary dream port: gleaming white and gold buildings, a grand lighthouse with a glowing lamp, floating lanterns, pennants, a golden domed hall.
Side view, same eye level and same horizon height as the sea screens (horizon at about 58% of
the image height). The lower part is calm harbor water with the pier or quay running along
the waterline; the town sits on a low green shore behind it; sky above like in c_sky.png.
Leave the row of shop buildings OUT - keep an empty strip of ground along the quay where 6
buildings will be placed later. No people, no text on signs. 16:9 image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_town_5.png
```

---

### 332. `h_shops_1` — 건물 6채 1단계: 작은 어촌

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text, no letters on signs (icons only). Fully transparent background.

A sprite sheet of 6 separate harbor buildings in a grid of 3 columns x 2 rows, never
touching, each seen from the front, standing on a flat bottom edge. They are stage 1 of 5
of the same town, so they are small, humble and worn: weathered planks, thatch or patched roofs, hand-painted signs.
Same six buildings in every stage, in this order, each recognizable by its sign icon and props:
1) fish market - fish sign, crates of ice, a scale,
2) tackle shop - fishing rod sign, rods and reels in the window,
3) shipyard - boat sign, a hull on a slipway, timber,
4) tailor - coat and hat sign, clothes on a rack,
5) fisher's guild - open book and anchor sign, a notice board,
6) town hall - a small bell tower and a flag.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_shops_1.png
```

---

### 333. `h_shops_2` — 건물 6채 2단계: 포구 마을

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text, no letters on signs (icons only). Fully transparent background.

A sprite sheet of 6 separate harbor buildings in a grid of 3 columns x 2 rows, never
touching, each seen from the front, standing on a flat bottom edge. They are stage 2 of 5
of the same town, so they are modest but tidy: fresh paint, tiled roofs, wooden signs with carved icons.
Same six buildings in every stage, in this order, each recognizable by its sign icon and props:
1) fish market - fish sign, crates of ice, a scale,
2) tackle shop - fishing rod sign, rods and reels in the window,
3) shipyard - boat sign, a hull on a slipway, timber,
4) tailor - coat and hat sign, clothes on a rack,
5) fisher's guild - open book and anchor sign, a notice board,
6) town hall - a small bell tower and a flag.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_shops_2.png
```

---

### 334. `h_shops_3` — 건물 6채 3단계: 항구 마을

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text, no letters on signs (icons only). Fully transparent background.

A sprite sheet of 6 separate harbor buildings in a grid of 3 columns x 2 rows, never
touching, each seen from the front, standing on a flat bottom edge. They are stage 3 of 5
of the same town, so they are two-storey, solid timber and stone, awnings, lanterns, flower boxes.
Same six buildings in every stage, in this order, each recognizable by its sign icon and props:
1) fish market - fish sign, crates of ice, a scale,
2) tackle shop - fishing rod sign, rods and reels in the window,
3) shipyard - boat sign, a hull on a slipway, timber,
4) tailor - coat and hat sign, clothes on a rack,
5) fisher's guild - open book and anchor sign, a notice board,
6) town hall - a small bell tower and a flag.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_shops_3.png
```

---

### 335. `h_shops_4` — 건물 6채 4단계: 큰 항구

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text, no letters on signs (icons only). Fully transparent background.

A sprite sheet of 6 separate harbor buildings in a grid of 3 columns x 2 rows, never
touching, each seen from the front, standing on a flat bottom edge. They are stage 4 of 5
of the same town, so they are large and rich: stone ground floors, balconies, brass fittings, banners, glass windows.
Same six buildings in every stage, in this order, each recognizable by its sign icon and props:
1) fish market - fish sign, crates of ice, a scale,
2) tackle shop - fishing rod sign, rods and reels in the window,
3) shipyard - boat sign, a hull on a slipway, timber,
4) tailor - coat and hat sign, clothes on a rack,
5) fisher's guild - open book and anchor sign, a notice board,
6) town hall - a small bell tower and a flag.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_shops_4.png
```

---

### 336. `h_shops_5` — 건물 6채 5단계: 환상의 항구

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text, no letters on signs (icons only). Fully transparent background.

A sprite sheet of 6 separate harbor buildings in a grid of 3 columns x 2 rows, never
touching, each seen from the front, standing on a flat bottom edge. They are stage 5 of 5
of the same town, so they are grand and magical: white stone and gold trim, glowing lamps, stained glass, small star ornaments.
Same six buildings in every stage, in this order, each recognizable by its sign icon and props:
1) fish market - fish sign, crates of ice, a scale,
2) tackle shop - fishing rod sign, rods and reels in the window,
3) shipyard - boat sign, a hull on a slipway, timber,
4) tailor - coat and hat sign, clothes on a rack,
5) fisher's guild - open book and anchor sign, a notice board,
6) town hall - a small bell tower and a flag.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_shops_5.png
```

---

### 337. `h_npc` — 가게 주인 6명

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text. Fully transparent background.

A sprite sheet of 6 separate characters in one row, never touching: half-body portraits
(waist up, facing the viewer, friendly), each about the same size. Warm storybook
characters, not chibi, not cartoonish:
1) fish market owner - a cheerful stout woman in an apron holding a fish,
2) tackle shop owner - a weathered old fisherman with a straw hat and a pipe,
3) shipwright - a big bearded man with a hammer and rolled-up sleeves,
4) tailor - an elegant woman with a measuring tape around her neck,
5) guild master - a wise old man with round glasses holding a thick book,
6) mayor - a small proud man with a sash and a top hat.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_npc.png
```

---

### 338. `h_panel` — 가게 판 (틀·물건 칸·단추)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text, no numbers. Fully transparent background.

UI pieces for a shop window, never touching, warm storybook style (cream parchment,
polished wood, brass, rope), elegant and calm:
1) a large empty shop panel (about 4:3): parchment sheet on a wooden board with brass
   corners, with an empty round portrait frame at the top left,
2) an empty item row (very wide, about 6:1): a square icon slot on the left, empty space
   for text, a small price plaque on the right,
3) the same item row in a locked / unavailable state (greyed, with a small padlock),
4) a wide BUY button, normal, 5) the same button pressed, 6) the same button disabled (grey),
7) a round close button with an X made of crossed oars,
8) a long empty title ribbon,
9) a small level badge (round brass medal, empty),
10) a progress bar frame and its golden fill (two pieces).
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_panel.png
```

---

### 339. `h_gear_a` — 장비 아이콘: 낚싯대·줄·릴 × 8단계

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text. Fully transparent background.

A sprite sheet of 24 item icons in a grid of 8 columns x 3 rows, never touching, each
centered in its cell, same size. Each ROW is one item drawn in 8 tiers from left (poor)
to right (legendary) - the same object getting finer:
tier 1 driftwood and twine, 2 bamboo, 3 polished oak, 4 steel, 5 silver, 6 gold,
7 glowing crystal, 8 radiant starlight with tiny stars.
Row 1: fishing ROD (diagonal). Row 2: a coil of fishing LINE on a spool.
Row 3: fishing REEL.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_gear_a.png
```

---

### 340. `h_gear_b` — 장비 아이콘: 배·복장 × 8단계

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text. Fully transparent background.

A sprite sheet of 16 item icons in a grid of 8 columns x 2 rows, never touching, each
centered in its cell, same size. Each ROW is one item drawn in 8 tiers from left (poor)
to right (legendary):
Row 1: a small BOAT seen from the side, facing left - 1 tiny rowboat, 2 rowboat with a
small sail, 3 fishing sailboat, 4 sturdy fishing boat with a cabin, 5 large trawler,
6 handsome schooner, 7 great galleon, 8 a shining golden dream ship with star sails.
Row 2: a fisherman's OUTFIT (hat and coat on a stand) - 1 patched rags and straw hat,
2 plain work clothes, 3 oilskin raincoat, 4 sturdy captain's jacket, 5 fine navy coat,
6 embroidered admiral coat, 7 shimmering sea-silk robe, 8 radiant golden starlight cloak.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_gear_b.png
```

---

### 341. `h_skill` — 스킬 아이콘 12개

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text. Fully transparent background.

A sprite sheet of 12 round skill icons in a grid of 4 columns x 3 rows, never touching.
Each is a symbol inside a round brass ring, like a star on a night-sea chart:
1) a gold coin (haggling), 2) a quick hand turning a reel (speed), 3) a huge fish next to
a tiny one (big catch), 4) a four-leaf clover (luck), 5) a float (bite speed),
6) a taut fishing line (line strength), 7) a crate (hold size), 8) a compass (travel),
9) a gear (automation), 10) an open book (encyclopedia), 11) a star (rare catch),
12) a treasure chest.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_skill.png
```

---

---

## ㉗ 이야기·튜토리얼 UI

### 342. `ui_story` — 대화창 틀, 시간 넘기기 단추, 튜토리얼 손가락

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/h_panel.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text, no numbers. Fully transparent background.

UI pieces, never touching, warm storybook style (cream parchment, polished wood, brass,
rope), elegant and calm, arranged top to bottom:
1) an empty dialogue box (very wide, about 6:1): a clean cream parchment sheet in a thin
   polished wooden frame with small brass corners, a small empty brass name plate sitting
   on the top-left edge, nothing else inside (no icon slot, no button),
2) a round brass button with two arrowheads pointing right (fast-forward), with a tiny
   sun and moon engraved on the rim,
3) the same fast-forward button pressed (slightly darker, pushed in),
4) a pointing hand in a fisherman's glove, index finger pointing down (tutorial pointer),
5) a small brass arrow pointing down.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui_story.png
```

---

## ㉘ 도감·해역 지도

### 343. `ui_dex` — 도감 화면 (펼친 책, 생물 칸, 해역 탭, 넘김 단추)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/h_panel.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text, no numbers, no creatures. Fully transparent background.

UI pieces for a creature encyclopedia screen, never touching, warm storybook style
(cream parchment, polished wood, brass, rope), elegant and calm, arranged top to bottom:
1) a large open book seen straight from the front (16:9, fills the width): two blank cream
   pages, leather cover edges, a ribbon bookmark, brass corners. The pages must be empty.
2) a row of 3 small square creature slots (about 1:1 each): a) an empty parchment slot with
   a thin brass frame, b) the same slot in an "undiscovered" state (darker, faded paper),
   c) the same slot highlighted (glowing golden frame),
3) a row of 6 thin square frames of the same size, one per rarity colour, left to right:
   grey, green, blue, purple, orange, shining gold,
4) a row of 2 book tabs (small rounded parchment tabs): a) normal, b) selected (brighter,
   slightly larger),
5) a row of 2 round brass arrow buttons: a) pointing left, b) pointing right.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui_dex.png
```

---

### 344. `ui_map` — 해역 지도 배경 (양피지 해도, 8개 해역과 항로)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/h_panel.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text, no numbers, no labels, no compass letters.

One full image, exactly 16:9, no transparency: an old nautical chart painted on parchment,
seen straight from above, filling the whole image. A small harbor town sits at the far
left edge. From it a dotted sailing route winds to the right through 8 clearly separate
sea areas, in this order, each about the same size and each leaving a clear empty spot in
its middle for a marker:
1) a sunny calm coast, 2) a tropical coral reef sea, 3) a group of misty islands,
4) a wide open ocean with big swells, 5) a polar sea with icebergs, 6) a volcanic sea with
glowing lava islands, 7) a very dark deep-sea trench, 8) a dreamlike shining fantasy sea
at the far right. Decorative chart border, a compass rose without letters in one corner,
soft warm light. Keep the bottom-right corner fairly empty (buttons go there).
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui_map.png
```

---

### 345. `ui_map_pins` — 해역 표식 8개, 잠김 표식, 배 표식, 환상종 증표

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/h_panel.png.
Every image you make must look like it belongs to the same game: the same painterly
storybook rendering, warm light, soft shading, the same level of detail.

No text, no numbers. Fully transparent background.

A sprite sheet in a grid of 4 columns x 3 rows, never touching, every piece the same size.
Rows 1 and 2: eight round brass map markers, each with a tiny painted scene inside:
1) sunny coast, 2) coral reef, 3) misty islands, 4) open ocean swell, 5) iceberg,
6) volcano island, 7) dark deep trench, 8) shining fantasy sea with stars.
Row 3: 9) the same round marker but locked (dark, with a small padlock),
10) a tiny wooden fishing boat seen from the side (marks where the player is),
11) a glowing golden ring (selection highlight, empty inside),
12) a shining golden medal with a star-shaped fish scale on it (a proof token for
releasing a fantasy creature).
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui_map_pins.png
```

---

## ㉙ 숨은 흔적 (세계의 비밀 — 티 나지 않게)

이 세계는 오래전 한 번 멸망한 문명 위에 있다. 게임은 그것을 말하지 않는다.
아래 그림들은 "자세히 보면 뭔가 이상한" 정도여야 한다. 한눈에 폐허로 보이면 실패.

### 346. `c_sky_8b` — 8번 해역 하늘: 먼 산 한 곳만 고치기 (그림체 유지 시험)

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/c_sky_8.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). Use it as the image to edit. The result must be the same painting: same size and
proportions (wide, exactly 3:1), same composition, same clouds, same moon, same floating
islands, same stars, same colours, same brushwork, same horizon position at the very bottom.
Do not repaint, restyle, sharpen, recolour or move anything.

Change ONLY ONE small thing: at the bottom, just right of the centre, there is a range of
very distant pale purple mountains on the horizon (between the small green island in the
middle and the green island at the far right). Reshape the silhouette of that distant range
in one place so that, among the soft mountain shapes, there stands a small cluster of five
or six tall, narrow, slightly leaning block-like towers of different heights, some with
broken, stepped tops. Paint them in exactly the same flat, hazy pale purple as the distant
mountains around them: a soft silhouette only, no windows, no lines, no details, no lights,
softened by the same warm horizon glow. They must be about as tall as the highest distant
mountain peak, not taller. At first glance they should read as part of the mountain range.

No text. No other changes anywhere in the image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_8b.png
```

---

### 347. `c_deep` — 물속 깊은 곳의 가라앉은 윤곽 8개

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sky_8.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, warm light, soft shading, the same level of detail.
Matching the existing art style exactly is the most important requirement.

No text. Fully transparent background.

A sprite sheet of 8 underwater silhouettes in a grid of 4 columns x 2 rows, never touching.
Each is a very large shape lying deep under the sea, seen from the side through deep water:
a single dark navy tone with very soft, blurred edges, no details, no outlines, slightly
lighter toward the top as if faintly lit from above, overgrown and rounded so that it almost
looks like a reef or a rock. Wider than tall (about 3:1). The viewer should only half
recognise them:
1) a long low arch (a sunken bridge span), 2) a tilted long tube shape with a fin at one end
(a wing or fuselage), 3) part of a huge spoked wheel half buried, 4) a row of three leaning
poles joined by sagging lines, 5) a box-like shape with rounded corners resting on its side
(a carriage), 6) a broken dome, 7) a tall figure-like column, toppled over (a statue),
8) a cluster of leaning rectangular blocks of different heights.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_deep.png
```

---

### 348. `ui_relics` — 환상종 증표로 열리는 오래된 물건 12개 (다시 그리기)

```
Style references: open assets/raw/h_gear_a.png, assets/raw/h_skill.png and
assets/raw/ui_map_pins.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). The new image must be painted in EXACTLY that style: hand-painted storybook
illustration, visible soft brushwork, warm light, simple rounded shapes, clean dark-brown
outlines, flat-ish colours with gentle shading. This is the most important requirement.
Do NOT make it look like a 3D render or a photograph: no realistic materials, no glossy
reflections, no photographic textures, no depth-of-field.

No text, no letters, no numbers, no logos, no screens with symbols. Fully transparent
background.

A sprite sheet of 12 small objects in a grid of 4 columns x 3 rows, never touching, all
about the same size, each drawn like a treasured find in a picture book: old, worn, a
little faded, with one or two small barnacles or a bit of seaweed. They are ordinary
household things from a few generations ago (warm, analog, slightly old-fashioned, nothing
futuristic and nothing high-tech), drawn simply enough to be recognised at a glance:
1) a faded photograph with curled corners showing only soft blurry silhouettes of a family,
2) an old-fashioned metal key, 3) a round wristwatch with a cracked glass and no hands,
4) a small wind-up tin toy robot, 5) a bent spoon, 6) round glasses with one lens missing,
7) a coin worn completely smooth, 8) a small empty glass bottle with a cork,
9) a single child's shoe, 10) a kettle with a dented spout, 11) a cracked ceramic cup,
12) a small music box with a broken lid and a tiny crank.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui_relics.png
```

---

## ㉚ 장비 외형 (장비를 바꾸면 바다 화면의 모습이 달라진다)

배 = 배 모양 · 낚싯대 = 낚싯대 · 줄 = 찌 · 릴 = 줄다리기 게이지 틀 · 복장 = 바람에 날리는 목도리.
그림체 유지가 가장 중요하다. 기존 그림을 열어 보고 "같은 그림에서 그 부분만 바꾼다"는 식으로 그릴 것.

### 349. `c_boat_t2` — 2단계 배: 작은 어선

```
This is a VARIATION of an existing image. Open assets/raw/c_boat.png from the GitHub
repository kelsnity86-arch/FISHIIIIG (main branch) and use it as the base.
It shows the same fisherman in a small rowboat in three poses, left to right:
1) sitting and holding the rod, 2) leaning back while pulling, 3) standing and heaving.
Make a new image with exactly the same layout, the same size and the same fully transparent
background: the same fisherman (same dark blue coat and wide hat, same size, same three
poses, same hand positions, in the same places in the image), drawn in exactly the same
painterly storybook style, seen from the side, facing left.
Change ONLY the boat. In all three poses replace the rowboat with: a small wooden fishing boat with a tiny cabin at the back and a little lantern on a pole.
The new boat is the same boat in all three poses and sits on the same waterline (flat bottom
edge at the same height). IMPORTANT: keep the boat the SAME overall length and about the same
height as the rowboat in c_boat.png. It must not get bigger. Only its design, materials and
small details change (at sea the boat stays a tiny dot next to huge creatures). Any mast,
sail, cabin or funnel must stay small and low, no taller than the standing fisherman.
The fisherman keeps his size and position. Nothing may cover the fisherman's hands or
the space in front of him (the fishing rod is added later by the game, do not draw a rod).
No text, no water, no shadow.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_boat_t2.png
```

### 350. `c_boat_t3` — 3단계 배: 돛단배

```
This is a VARIATION of an existing image. Open assets/raw/c_boat.png from the GitHub
repository kelsnity86-arch/FISHIIIIG (main branch) and use it as the base.
It shows the same fisherman in a small rowboat in three poses, left to right:
1) sitting and holding the rod, 2) leaning back while pulling, 3) standing and heaving.
Make a new image with exactly the same layout, the same size and the same fully transparent
background: the same fisherman (same dark blue coat and wide hat, same size, same three
poses, same hand positions, in the same places in the image), drawn in exactly the same
painterly storybook style, seen from the side, facing left.
Change ONLY the boat. In all three poses replace the rowboat with: a wooden sailing dinghy with one small patched canvas sail on a short mast behind the fisherman.
The new boat is the same boat in all three poses and sits on the same waterline (flat bottom
edge at the same height). IMPORTANT: keep the boat the SAME overall length and about the same
height as the rowboat in c_boat.png. It must not get bigger. Only its design, materials and
small details change (at sea the boat stays a tiny dot next to huge creatures). Any mast,
sail, cabin or funnel must stay small and low, no taller than the standing fisherman.
The fisherman keeps his size and position. Nothing may cover the fisherman's hands or
the space in front of him (the fishing rod is added later by the game, do not draw a rod).
No text, no water, no shadow.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_boat_t3.png
```

### 351. `c_boat_t4` — 4단계 배: 먼바다 어선

```
This is a VARIATION of an existing image. Open assets/raw/c_boat.png from the GitHub
repository kelsnity86-arch/FISHIIIIG (main branch) and use it as the base.
It shows the same fisherman in a small rowboat in three poses, left to right:
1) sitting and holding the rod, 2) leaning back while pulling, 3) standing and heaving.
Make a new image with exactly the same layout, the same size and the same fully transparent
background: the same fisherman (same dark blue coat and wide hat, same size, same three
poses, same hand positions, in the same places in the image), drawn in exactly the same
painterly storybook style, seen from the side, facing left.
Change ONLY the boat. In all three poses replace the rowboat with: a sturdy deep-sea fishing boat with a wheelhouse, a net winch and rubber tire fenders.
The new boat is the same boat in all three poses and sits on the same waterline (flat bottom
edge at the same height). IMPORTANT: keep the boat the SAME overall length and about the same
height as the rowboat in c_boat.png. It must not get bigger. Only its design, materials and
small details change (at sea the boat stays a tiny dot next to huge creatures). Any mast,
sail, cabin or funnel must stay small and low, no taller than the standing fisherman.
The fisherman keeps his size and position. Nothing may cover the fisherman's hands or
the space in front of him (the fishing rod is added later by the game, do not draw a rod).
No text, no water, no shadow.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_boat_t4.png
```

### 352. `c_boat_t5` — 5단계 배: 얼음 바다 배

```
This is a VARIATION of an existing image. Open assets/raw/c_boat.png from the GitHub
repository kelsnity86-arch/FISHIIIIG (main branch) and use it as the base.
It shows the same fisherman in a small rowboat in three poses, left to right:
1) sitting and holding the rod, 2) leaning back while pulling, 3) standing and heaving.
Make a new image with exactly the same layout, the same size and the same fully transparent
background: the same fisherman (same dark blue coat and wide hat, same size, same three
poses, same hand positions, in the same places in the image), drawn in exactly the same
painterly storybook style, seen from the side, facing left.
Change ONLY the boat. In all three poses replace the rowboat with: an ice-going boat with a reinforced metal-plated bow, a small stove chimney with a wisp of smoke and frost on the rails.
The new boat is the same boat in all three poses and sits on the same waterline (flat bottom
edge at the same height). IMPORTANT: keep the boat the SAME overall length and about the same
height as the rowboat in c_boat.png. It must not get bigger. Only its design, materials and
small details change (at sea the boat stays a tiny dot next to huge creatures). Any mast,
sail, cabin or funnel must stay small and low, no taller than the standing fisherman.
The fisherman keeps his size and position. Nothing may cover the fisherman's hands or
the space in front of him (the fishing rod is added later by the game, do not draw a rod).
No text, no water, no shadow.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_boat_t5.png
```

### 353. `c_boat_t6` — 6단계 배: 쇠를 덧댄 증기선

```
This is a VARIATION of an existing image. Open assets/raw/c_boat.png from the GitHub
repository kelsnity86-arch/FISHIIIIG (main branch) and use it as the base.
It shows the same fisherman in a small rowboat in three poses, left to right:
1) sitting and holding the rod, 2) leaning back while pulling, 3) standing and heaving.
Make a new image with exactly the same layout, the same size and the same fully transparent
background: the same fisherman (same dark blue coat and wide hat, same size, same three
poses, same hand positions, in the same places in the image), drawn in exactly the same
painterly storybook style, seen from the side, facing left.
Change ONLY the boat. In all three poses replace the rowboat with: an iron-plated steam launch with rivets, a short funnel and a brass boiler, dark heat-scorched hull.
The new boat is the same boat in all three poses and sits on the same waterline (flat bottom
edge at the same height). IMPORTANT: keep the boat the SAME overall length and about the same
height as the rowboat in c_boat.png. It must not get bigger. Only its design, materials and
small details change (at sea the boat stays a tiny dot next to huge creatures). Any mast,
sail, cabin or funnel must stay small and low, no taller than the standing fisherman.
The fisherman keeps his size and position. Nothing may cover the fisherman's hands or
the space in front of him (the fishing rod is added later by the game, do not draw a rod).
No text, no water, no shadow.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_boat_t6.png
```

### 354. `c_boat_t7` — 7단계 배: 심해 탐사선

```
This is a VARIATION of an existing image. Open assets/raw/c_boat.png from the GitHub
repository kelsnity86-arch/FISHIIIIG (main branch) and use it as the base.
It shows the same fisherman in a small rowboat in three poses, left to right:
1) sitting and holding the rod, 2) leaning back while pulling, 3) standing and heaving.
Make a new image with exactly the same layout, the same size and the same fully transparent
background: the same fisherman (same dark blue coat and wide hat, same size, same three
poses, same hand positions, in the same places in the image), drawn in exactly the same
painterly storybook style, seen from the side, facing left.
Change ONLY the boat. In all three poses replace the rowboat with: a deep-sea vessel with brass fittings, round portholes and two glowing lamps on arms.
The new boat is the same boat in all three poses and sits on the same waterline (flat bottom
edge at the same height). IMPORTANT: keep the boat the SAME overall length and about the same
height as the rowboat in c_boat.png. It must not get bigger. Only its design, materials and
small details change (at sea the boat stays a tiny dot next to huge creatures). Any mast,
sail, cabin or funnel must stay small and low, no taller than the standing fisherman.
The fisherman keeps his size and position. Nothing may cover the fisherman's hands or
the space in front of him (the fishing rod is added later by the game, do not draw a rod).
No text, no water, no shadow.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_boat_t7.png
```

### 355. `c_boat_t8` — 8단계 배: 환상의 배

```
This is a VARIATION of an existing image. Open assets/raw/c_boat.png from the GitHub
repository kelsnity86-arch/FISHIIIIG (main branch) and use it as the base.
It shows the same fisherman in a small rowboat in three poses, left to right:
1) sitting and holding the rod, 2) leaning back while pulling, 3) standing and heaving.
Make a new image with exactly the same layout, the same size and the same fully transparent
background: the same fisherman (same dark blue coat and wide hat, same size, same three
poses, same hand positions, in the same places in the image), drawn in exactly the same
painterly storybook style, seen from the side, facing left.
Change ONLY the boat. In all three poses replace the rowboat with: a dreamlike boat made of pale shining wood and crystal, with a softly glowing translucent sail and tiny stars around it.
The new boat is the same boat in all three poses and sits on the same waterline (flat bottom
edge at the same height). IMPORTANT: keep the boat the SAME overall length and about the same
height as the rowboat in c_boat.png. It must not get bigger. Only its design, materials and
small details change (at sea the boat stays a tiny dot next to huge creatures). Any mast,
sail, cabin or funnel must stay small and low, no taller than the standing fisherman.
The fisherman keeps his size and position. Nothing may cover the fisherman's hands or
the space in front of him (the fishing rod is added later by the game, do not draw a rod).
No text, no water, no shadow.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_boat_t8.png
```

### 356. `c_rod_set` — 장비 외형: 낚싯대 8단계

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Every image you make must look
like it belongs to the same game: the same painterly storybook rendering, warm light, soft
shading, clean shapes. Matching the existing art style is the most important requirement.
Also open assets/raw/c_rod.png (the current fishing rod: a perfectly straight rod seen from
the side, handle on the right, thin tip on the left).

No text. Fully transparent background.

A sprite sheet of 8 fishing rods stacked top to bottom, never touching, each one perfectly
straight and perfectly horizontal, handle on the right and thin tip on the left, all exactly
the same length (almost the full image width) and drawn like the rod in c_rod.png.
They get finer from top to bottom:
1) a plain bamboo pole, 2) a varnished wooden rod with a cork grip, 3) a split-cane rod with
red thread wraps, 4) a dark sturdy sea rod with brass rings, 5) a pale blue-white rod with
frosty silver rings, 6) a black iron rod with glowing ember-red wraps, 7) a deep-sea rod of
dark metal with small teal lights along it, 8) a shining golden-white rod that glows softly.
Do not bend them, do not add line, reel or hooks.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_rod_set.png
```

### 357. `c_float_set` — 장비 외형: 찌 8단계 (줄 장비)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Every image you make must look
like it belongs to the same game: the same painterly storybook rendering, warm light, soft
shading, clean shapes. Matching the existing art style is the most important requirement.
Also open assets/raw/c_float.png (the current fishing float, seen from the side, standing
upright; the lower half sits under water in the game).

No text. Fully transparent background.

A sprite sheet of 8 fishing floats in one row, never touching, all the same height, each
standing upright and seen from the side like the one in c_float.png, with a clear top half
(above water) and a slimmer lower half (below water). Left to right they get finer:
1) a simple red-and-white cork float, 2) a painted wooden float with a green band,
3) a quill float with a small feather on top, 4) a tall striped sea float with a brass cap,
5) an ice-blue glass float with a snowflake pattern, 6) a dark iron float with a small glowing
ember window, 7) a deep-sea float with a tiny teal lamp on top, 8) a shining star-shaped
golden float that glows softly.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_float_set.png
```

### 358. `ui_tension_set` — 장비 외형: 줄다리기 게이지 틀 8단계 (릴 장비)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Every image you make must look
like it belongs to the same game: the same painterly storybook rendering, warm light, soft
shading, clean shapes. Matching the existing art style is the most important requirement.
Also open assets/raw/ui2_gauge.png. Its top piece is the current tension gauge frame: a very
wide horizontal bar frame with a small fishing-reel emblem at the left end and an empty dark
slot (groove) running along it.

No text, no numbers. Fully transparent background.

A sprite sheet of 8 tension gauge frames stacked top to bottom, never touching. Every frame
must have exactly the same outer length and height as each other and the same empty dark
slot in exactly the same place and size (the game fills the slot itself, so leave it empty
and identical). Only the frame material and the reel emblem at the left end change, getting
finer from top to bottom:
1) plain worn wood with a simple wooden spool, 2) polished wood with a small brass reel,
3) brass-trimmed wood with a red-handled reel, 4) dark sea-worn metal with a sturdy winch
reel, 5) frosted silver with an ice-blue reel, 6) black iron with rivets and a glowing
ember-red reel, 7) dark deep-sea metal with teal lights and a precise mechanical reel,
8) shining gold and pearl with a softly glowing star reel.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui_tension_set.png
```

### 359. `c_scarf_set` — 장비 외형: 바람에 날리는 목도리 8단계 (복장 장비)

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch). Every image you make must look
like it belongs to the same game: the same painterly storybook rendering, warm light, soft
shading, clean shapes. Matching the existing art style is the most important requirement.
Also open assets/raw/c_boat.png to see the fisherman who will wear these.

No text. Fully transparent background.

A sprite sheet of 8 scarves stacked top to bottom, never touching. Each scarf is drawn as a
single long cloth streamer blowing straight out in the wind: perfectly horizontal, the end
that is tied round the neck on the LEFT (a small knot), the free end on the RIGHT, slightly
tapering, with soft folds painted in. Keep each one straight (the game makes it flutter).
From top to bottom they get longer and finer (the first about half the image width, the
last almost the full width):
1) a short plain undyed cotton scarf, 2) a blue-and-white striped scarf, 3) a red knitted
scarf with tassels, 4) a long navy sailor's scarf with a gold edge, 5) a thick white woollen
scarf with pale blue snowflakes, 6) a crimson silk scarf with a flame pattern, 7) a dark teal
scarf with fine silver thread, 8) a long shimmering scarf that looks like a strip of starry
night sky, softly glowing.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_scarf_set.png
```

### 360. `h_boats` — 항구에 매어 둔 배 8단계 (항구에서는 크기 차이가 확실하게)

```
Style references: open assets/raw/h_town_1.png, assets/raw/h_town_5.png and
assets/raw/h_shops_3.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). The new image must be painted in exactly that style (painterly storybook harbor,
warm light, soft shading). Matching the existing art style is the most important requirement.

No text. No people. No water, no dock. Fully transparent background.

A sprite sheet of 8 boats in a grid of 4 columns x 2 rows, never touching. Each boat is seen
from the side, facing left, moored and empty, with a flat bottom edge at its waterline.
Here the boats must clearly grow in size and grandeur from the first to the last (the
first is small and fills about a third of its cell, the last is large and fills its cell):
1) a small plain wooden rowboat,
2) a small wooden fishing boat with a tiny cabin at the back and a little lantern on a pole,
3) a wooden sailing boat with one patched canvas sail,
4) a sturdy deep-sea fishing boat with a wheelhouse, a net winch and tire fenders,
5) an ice-going ship with a metal-plated bow, a stove chimney and frost on the rails,
6) an iron-plated steam ship with rivets, a funnel and a brass boiler,
7) a large deep-sea research vessel with brass fittings, portholes and glowing lamps,
8) a magnificent dreamlike ship of pale shining wood and crystal with softly glowing
   translucent sails and tiny stars around it.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_boats.png
```

### 361. `c_chest` — 바다의 답례: 물에 뜬 보물상자 (닫힘·열림)

```
Style references: open assets/raw/c_boat.png and assets/raw/c_float.png from the GitHub
repository kelsnity86-arch/FISHIIIIG (main branch). The new image must be painted in exactly
that style (painterly storybook, warm light, soft shading, seen from the side) and at a
similar level of detail. Matching the existing art style is the most important requirement.

No text. No water. Fully transparent background.

Two versions of the same old sea chest, side by side, never touching, same size, seen from
the front-side, with a flat bottom edge (the game puts the lower part under water):
1) closed: a barnacled wooden treasure chest with brass bands and a round brass lock,
   a strand of seaweed over the lid, wet and glistening,
2) open: the same chest with the lid thrown back, full of shining gold coins, a soft warm
   golden glow rising from inside.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_chest.png
```

---

## ㉛ 항구의 내 배 (배경의 나룻배를 지우고, 항구 그림체에 맞는 배를 새로)

### 362. `h_town_1b` — 항구 배경 1단계: 부두의 나룻배만 지우기

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/h_town_1.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). Use it as the image to edit. The result must be the same painting: same size and
proportions (exactly 16:9), same composition, same sky, same town, same pier, same water,
same colours, same brushwork. Do not repaint, restyle, sharpen, recolour or move anything.

Change ONLY ONE thing: remove the small empty wooden rowboat that is moored in the water
near the wooden pier in the lower left part of the image, together with its mooring rope
and its reflection. Fill that spot with the same calm harbor water and reflections as the
water around it, so that nobody could tell a boat was ever there. If there are any other
small boats floating in the water of the foreground, remove them the same way.
Keep the whole lower half of the image as open water (the game places the player's own boat
there).

No text. No other changes anywhere in the image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_town_1b.png
```

### 363. `h_town_2b` — 항구 배경 2단계: 부두의 나룻배만 지우기

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/h_town_2.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). Use it as the image to edit. The result must be the same painting: same size and
proportions (exactly 16:9), same composition, same sky, same town, same pier, same water,
same colours, same brushwork. Do not repaint, restyle, sharpen, recolour or move anything.

Change ONLY ONE thing: remove the small empty wooden rowboat that is moored in the water
near the wooden pier in the lower left part of the image, together with its mooring rope
and its reflection. Fill that spot with the same calm harbor water and reflections as the
water around it, so that nobody could tell a boat was ever there. If there are any other
small boats floating in the water of the foreground, remove them the same way.
Keep the whole lower half of the image as open water (the game places the player's own boat
there).

No text. No other changes anywhere in the image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_town_2b.png
```

### 364. `h_town_3b` — 항구 배경 3단계: 부두의 나룻배만 지우기

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/h_town_3.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). Use it as the image to edit. The result must be the same painting: same size and
proportions (exactly 16:9), same composition, same sky, same town, same pier, same water,
same colours, same brushwork. Do not repaint, restyle, sharpen, recolour or move anything.

Change ONLY ONE thing: remove the small empty wooden rowboat that is moored in the water
near the wooden pier in the lower left part of the image, together with its mooring rope
and its reflection. Fill that spot with the same calm harbor water and reflections as the
water around it, so that nobody could tell a boat was ever there. If there are any other
small boats floating in the water of the foreground, remove them the same way.
Keep the whole lower half of the image as open water (the game places the player's own boat
there).

No text. No other changes anywhere in the image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_town_3b.png
```

### 365. `h_town_4b` — 항구 배경 4단계: 부두의 나룻배만 지우기

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/h_town_4.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). Use it as the image to edit. The result must be the same painting: same size and
proportions (exactly 16:9), same composition, same sky, same town, same pier, same water,
same colours, same brushwork. Do not repaint, restyle, sharpen, recolour or move anything.

Change ONLY ONE thing: remove the small empty wooden rowboat that is moored in the water
near the wooden pier in the lower left part of the image, together with its mooring rope
and its reflection. Fill that spot with the same calm harbor water and reflections as the
water around it, so that nobody could tell a boat was ever there. If there are any other
small boats floating in the water of the foreground, remove them the same way.
Keep the whole lower half of the image as open water (the game places the player's own boat
there).

No text. No other changes anywhere in the image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_town_4b.png
```

### 366. `h_town_5b` — 항구 배경 5단계: 부두의 나룻배만 지우기

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/h_town_5.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). Use it as the image to edit. The result must be the same painting: same size and
proportions (exactly 16:9), same composition, same sky, same town, same pier, same water,
same colours, same brushwork. Do not repaint, restyle, sharpen, recolour or move anything.

Change ONLY ONE thing: remove the small empty wooden rowboat that is moored in the water
near the wooden pier in the lower left part of the image, together with its mooring rope
and its reflection. Fill that spot with the same calm harbor water and reflections as the
water around it, so that nobody could tell a boat was ever there. If there are any other
small boats floating in the water of the foreground, remove them the same way.
Keep the whole lower half of the image as open water (the game places the player's own boat
there).

No text. No other changes anywhere in the image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_town_5b.png
```

### 367. `h_boats2` — 항구에 매어 둔 내 배 8단계 (항구 그림체, 크기 키움)

```
Style references: open assets/raw/h_town_1.png, assets/raw/h_town_3.png,
assets/raw/h_town_5.png and assets/raw/h_shops_3.png from the GitHub repository
kelsnity86-arch/FISHIIIIG (main branch). Look closely at the small wooden rowboat moored at
the pier in h_town_1.png: the new boats must be painted EXACTLY like that boat and like the
buildings in these images, with the same painterly storybook rendering, the same viewing
angle (seen from the side and very slightly from above, so a little of the deck is visible),
the same warm evening light coming from the same side, the same level of detail, the same
soft dark outlines. They must look as if they were part of those harbor paintings.
Matching that style is the most important requirement. Do not draw them as icons or toys.

No text. No people. No water, no dock, no reflection. Fully transparent background.

A sprite sheet of 8 boats in a grid of 2 columns x 4 rows, never touching. Each boat is
empty and moored, facing left, with a flat bottom edge at its waterline. Every boat must be
wide and low: clearly wider than tall, with masts, sails, funnels and cabins kept short, so
that even the biggest one is no taller than about two thirds of its length.
They grow clearly in size and grandeur from the first to the last. Draw them at these
relative lengths (the last one fills the width of its cell):
1) 35 percent: a small plain wooden rowboat (the same boat as in h_town_1.png),
2) 45 percent: a small wooden fishing boat with a tiny cabin at the back and a lantern,
3) 53 percent: a wooden sailing boat with one short patched canvas sail,
4) 62 percent: a sturdy deep-sea fishing boat with a wheelhouse, a net winch and fenders,
5) 70 percent: an ice-going ship with a metal-plated bow, a stove chimney and frosted rails,
6) 78 percent: an iron-plated steam ship with rivets, one funnel and a brass boiler,
7) 88 percent: a deep-sea research vessel with brass fittings, portholes and glowing lamps,
8) 100 percent: a magnificent dreamlike ship of pale shining wood and crystal with softly
   glowing translucent sails (kept low) and tiny stars around it.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_boats2.png
```

---

## ㉜ 숨은 흔적: 나머지 해역 (1~7번 하늘에서 한 곳씩만 고치기)

8번 해역(346번)에서 통했던 방식 그대로. 8번보다 더 눈에 안 띄어야 한다: 얼핏 보면 원래 풍경, 다시 보면 뭔가 너무 반듯하다.

### 368. `c_sky_1b` — 1번 해역 햇살 연안: 먼 산 능선에 가는 기둥 하나

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/c_sky.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). Use it as the image to edit. The result must be the same painting: same size and
proportions (wide, exactly 3:1), same composition, same clouds, same islands and mountains,
same colours, same brushwork, same horizon position at the very bottom.
Do not repaint, restyle, sharpen, recolour or move anything.

Change ONLY ONE small thing:
On the right half, look at the most distant pale purple mountain range on the horizon (behind the green island at the far right). On the top of one of those distant ridges add ONE very thin, perfectly straight, slightly leaning pole, with a faint sagging hair-thin line running from its top down to the ridge (like a far-off abandoned mast). Paint it in exactly the same hazy pale purple as that distant range, no darker. It must be tiny, no taller than the ridge it stands on, and almost invisible at first glance.

It is a hidden detail: someone who is not looking for it should not notice it.
No text. No other changes anywhere in the image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_1b.png
```

### 369. `c_sky_2b` — 2번 해역 산호초 열대: 작은 섬의 야자수 사이에 기운 표지판 윤곽

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/c_sky_2.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). Use it as the image to edit. The result must be the same painting: same size and
proportions (wide, exactly 3:1), same composition, same clouds, same islands and mountains,
same colours, same brushwork, same horizon position at the very bottom.
Do not repaint, restyle, sharpen, recolour or move anything.

Change ONLY ONE small thing:
Look at the small palm island on the horizon in the middle-left of the image (the small one, not the big island at the far left). Among its palm trees add ONE straight leaning pole with a small plain rectangular plate at its top (like an old signpost), partly hidden behind palm leaves. Paint it as a soft silhouette in the same muted green-brown tones as the palm trunks around it, with no markings on the plate. It must be no taller than the palms next to it and should read as just another trunk at first glance.

It is a hidden detail: someone who is not looking for it should not notice it.
No text. No other changes anywhere in the image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_2b.png
```

### 370. `c_sky_3b` — 3번 해역 안개 군도: 안개 속 먼 언덕 뒤로 큰 바퀴의 윗부분

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/c_sky_3.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). Use it as the image to edit. The result must be the same painting: same size and
proportions (wide, exactly 3:1), same composition, same clouds, same islands and mountains,
same colours, same brushwork, same horizon position at the very bottom.
Do not repaint, restyle, sharpen, recolour or move anything.

Change ONLY ONE small thing:
Look at the faintest, most distant misty hills in the middle of the image (the palest grey shapes near the horizon, between the darker tree-covered islands). Behind one of those faint hills add the upper part of ONE very large circle: a thin perfectly round arc with three or four thin straight spokes, like the top of a huge wheel rising behind the hill. Paint it in the palest mist grey, even fainter than the hill in front of it, so that it almost disappears in the fog. No details, no cabins.

It is a hidden detail: someone who is not looking for it should not notice it.
No text. No other changes anywhere in the image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_3b.png
```

### 371. `c_sky_4b` — 4번 해역 원양 대해: 수평선에 일정한 간격의 짧은 기둥 셋

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/c_sky_4.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). Use it as the image to edit. The result must be the same painting: same size and
proportions (wide, exactly 3:1), same composition, same clouds, same islands and mountains,
same colours, same brushwork, same horizon position at the very bottom.
Do not repaint, restyle, sharpen, recolour or move anything.

Change ONLY ONE small thing:
On the horizon line in the left third of the image, where the sky meets the sea and nothing else is there, add a row of THREE tiny short vertical stumps standing at perfectly even distances from each other, with a very faint thin level line joining the first two at their tops (like the last piers of a far-off broken bridge). Paint them in the same soft hazy pink-violet as the horizon haze, only slightly darker. Each stump must be tiny, barely rising above the horizon, and the whole group must be easy to miss.

It is a hidden detail: someone who is not looking for it should not notice it.
No text. No other changes anywhere in the image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_4b.png
```

### 372. `c_sky_5b` — 5번 해역 극지 빙해: 얼음 절벽 속에 갇힌 반듯한 그림자

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/c_sky_5.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). Use it as the image to edit. The result must be the same painting: same size and
proportions (wide, exactly 3:1), same composition, same clouds, same islands and mountains,
same colours, same brushwork, same horizon position at the very bottom.
Do not repaint, restyle, sharpen, recolour or move anything.

Change ONLY ONE small thing:
Look at the long ice cliff on the right side of the image. Inside the ice of that cliff, as if frozen deep within it, add ONE faint dark blue-grey shape with perfectly straight edges: a long low rectangular block with one end sloping (like the hull of something far too large to be a boat), seen dimly through the ice. It must stay inside the outline of the cliff, be only slightly darker than the ice around it, with soft blurred edges, and look like a shadow in the ice at first glance.

It is a hidden detail: someone who is not looking for it should not notice it.
No text. No other changes anywhere in the image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_5b.png
```

### 373. `c_sky_6b` — 6번 해역 화산 해역: 작은 화산 능선에 곧은 굴뚝 하나

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/c_sky_6.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). Use it as the image to edit. The result must be the same painting: same size and
proportions (wide, exactly 3:1), same composition, same clouds, same islands and mountains,
same colours, same brushwork, same horizon position at the very bottom.
Do not repaint, restyle, sharpen, recolour or move anything.

Change ONLY ONE small thing:
Look at the low volcanic ridge on the left side of the image, where thin plumes of smoke rise from small vents. On that ridge add ONE tall, thin, perfectly straight chimney-like column with a flat top, slightly leaning, with a thin plume of smoke drifting from it like from the other vents. Paint it as a dark silhouette in exactly the same tones as the ridge. It must be no taller than the small volcano cone next to it and should read as just another rock spire at first glance.

It is a hidden detail: someone who is not looking for it should not notice it.
No text. No other changes anywhere in the image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_6b.png
```

### 374. `c_sky_7b` — 7번 해역 심연 해구: 바위 첨탑 하나에 줄지어 켜진 작은 불빛

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/c_sky_7.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). Use it as the image to edit. The result must be the same painting: same size and
proportions (wide, exactly 3:1), same composition, same clouds, same islands and mountains,
same colours, same brushwork, same horizon position at the very bottom.
Do not repaint, restyle, sharpen, recolour or move anything.

Change ONLY ONE small thing:
Look at the group of dark spiky rock silhouettes on the horizon at the left side of the image, which already have a faint cyan glow at their base. On ONE of the taller spires add a single vertical row of four or five tiny, evenly spaced dots of the same faint cyan light, running up its side in a perfectly straight line (like a column of lit windows). The dots must be very small and dim, no brighter than the existing glow at the base, and easy to miss.

It is a hidden detail: someone who is not looking for it should not notice it.
No text. No other changes anywhere in the image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_7b.png
```

---

## ㉝ 제목: Hori's Horizon — 호라이의 수평선

### 375. `ui_emblem` — 제목 엠블럼 (H 두 개와 낚싯대, 글자 없음)

```
Style references: open assets/raw/ui2_caught.png, assets/raw/h_panel.png and
assets/raw/ui_map_pins.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). The new image must be painted in exactly that style: warm painterly storybook
rendering, polished brass and gold, weathered wood, rope, soft shading, clean dark-brown
outlines. Matching the existing art style is the most important requirement.

No words. Fully transparent background. Square image (1:1), the emblem centred with a
small margin.

An emblem made of two capital letters H and a fishing rod, designed as one single crest:
the two H's stand side by side and share their middle upright, so that together they read
as "HH" (for "Hori's Horizon"). They are made of polished brass with a little weathered
wood, like a ship's badge. A slender fishing rod runs diagonally across the two letters
from lower left to upper right, bending gently at the tip, and its line drops down in a
soft curve to a small red-and-white float that hangs just below the crossbar. The crossbar
of the H's is drawn as a calm horizon line: a thin band of sea with a tiny rising sun on it.
A ring of rope frames the whole emblem. Clear, bold and readable even when very small
(it is also used as the app icon). Only the two letters H, no other text.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui_emblem.png
```

---

### 376. `ui_logo` — 제목 로고 (엠블럼 + Hori's Horizon + 호라이의 수평선)

```
Style references: open assets/raw/ui2_caught.png, assets/raw/h_panel.png and
assets/raw/ui_map_pins.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). The new image must be painted in exactly that style: warm painterly storybook
rendering, polished brass and gold, weathered wood, rope, soft shading, clean dark-brown
outlines. Matching the existing art style is the most important requirement.
Also open assets/raw/ui_emblem.png (made in the previous step) and use that exact emblem.

Fully transparent background. Wide image (about 2:1).

The game's title logo, arranged as one composition:
- on the left, the emblem from ui_emblem.png (the two H's with the fishing rod),
- to its right, on the first line, the English title in large warm golden storybook
  lettering with a dark-brown outline, spelled EXACTLY, letter for letter:
  Hori's Horizon
  (capital H, o, r, i, apostrophe, s, space, capital H, o, r, i, z, o, n),
- under it, on the second line, the Korean title in smaller cream-white rounded lettering
  with a dark-brown outline, spelled EXACTLY, character for character:
  호라이의 수평선
  (seven Korean characters with one space after the fourth: 호 라 이 의 [space] 수 평 선).
A thin wavy line of sea runs under the two lines of text. No other text, no extra letters,
no decoration that could be mistaken for a letter. Check the spelling of both lines before
finishing; if any letter is wrong, redo the image.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui_logo.png
```


---

## ㉞ 가게 판의 둥근 창: 건물 대신 상징 + 마을 등급별 테두리 장식

가게 판 왼쪽 위 둥근 창에 건물 그림 대신 그 가게의 상징을 넣는다. 마을이 커질수록 창 테두리만 화려해진다.

### 377. `h_shop_marks` — 가게 상징 6개 (둥근 창 안에 들어갈 그림)

```
Style references: open assets/raw/h_panel.png, assets/raw/h_gear_a.png and
assets/raw/h_skill.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch).
The new pictures must be painted EXACTLY like the item icons in h_gear_a.png: the same
painterly storybook rendering, the same warm light, the same soft dark outlines, the same
level of detail. Matching that style is the most important requirement.

No text, no letters, no numbers. No frame, no ring, no circle, no background plate.
Fully transparent background.

A sprite sheet of 6 emblems in a grid of 3 columns x 2 rows, never touching, each centred in
its cell. Each emblem is one compact object group that fits nicely inside a circle (it will
be shown inside the round brass porthole at the top left of h_panel.png, on its cream
paper). Bold, simple, readable when very small. All six the same visual size.
1) Fish market: a brass balance scale with a fresh silver fish lying on one pan,
2) Tackle shop: two fishing rods crossed like an X with a red-and-white float hanging in
   the middle,
3) Shipyard: a ship's anchor crossed with a wooden shipwright's mallet,
4) Clothing shop: a wooden spool of blue thread with a needle through it and a small
   folded blue scarf,
5) Fishermen's guild: a round guild crest of a gold coin with a fishing hook hooked through
   it, a short piece of rope around it,
6) Town hall: a brass bell hanging from a small wooden beam with a little blue pennant.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_shop_marks.png
```

### 378. `h_port_rims` — 둥근 창 테두리 5단계 (마을 등급별 장식)

```
Style references: open assets/raw/h_panel.png from the GitHub repository
kelsnity86-arch/FISHIIIIG (main branch). Look closely at the round brass porthole frame at
its top left corner. The new frames must be painted EXACTLY like that porthole frame: the
same brass colour, the same painterly storybook rendering, the same light, the same soft
dark outlines. Matching that style is the most important requirement.

No text. Fully transparent background.

A sprite sheet of 5 round porthole frames in one row, never touching, all with the same
ring size. Each one is ONLY the ring: the round hole in the middle is completely empty and
transparent (the hole is 70 percent of the ring's outer diameter, perfectly circular and
centred), and everything outside the ring is transparent. Seen straight from the front.
Decorations sit on the ring and may stick out a little around it, but never into the hole.
They grow clearly richer from the first to the last:
1) small fishing village: the plain brass ring with four rivets, a little worn,
2) harbour village: the brass ring with a thin rope wound around it and a small knot at
   the bottom,
3) busy port: polished brass with eight rivets, a small scallop shell at the top and a
   tiny anchor charm at the bottom,
4) trading port: golden ring with engraved wave patterns, a ship's wheel ornament at the
   top and small blue pennants at both sides,
5) dream harbour: a pale shining gold ring with small crystals and pearls set into it, a
   crescent moon at the top and tiny stars around it, softly glowing.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_port_rims.png
```


---

## ㉟ 태초의 바다 (9번 해역): 도감을 다 채우면 열리는 마지막 바다

사람이 아무것도 가라앉히기 전의 바다. 다른 해역과 반대로 반듯한 것·만든 것이 하나도 없다. 여기 생물은 아무것도 섞이지 않은 진짜 물고기이고, 항구·사람 그림과 같은 붓 그림으로 진짜처럼 그린다 (도트 그림이 아니다).

### 379. `c_sky_9` — 태초의 바다: 하늘·구름·먼 풍경

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The sky of a different sea region: the primordial sea, the sea as it was before any people.
Same composition and same size as assets/raw/c_sky.png (everything above the horizon; the
bottom edge is the flat horizon line), but a different place:
a vast, clean, quiet dawn sky, pale gold near the horizon fading up into clear soft blue,
a few thin natural clouds, a low gentle sun just above the horizon far to the left. Far away
on the horizon only two or three low natural rocky islets with rounded, irregular shapes.
Absolutely nothing man-made and nothing geometric anywhere: no buildings, no towers, no
poles, no boats, no straight lines, no lights, no stars, no magic. It must feel untouched,
peaceful and real.
No boat, no people, no fishing line, no sea surface. Very wide 3:1 image. Keep the upper
middle of the sky fairly calm and open - a creature will be shown there.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sky_9.png
```

### 380. `c_sea_9` — 태초의 바다: 물속 단면

```
Style references: open assets/concept/concept_1.png, concept_2.png and concept_3.png from the
GitHub repository kelsnity86-arch/FISHIIIIG (main branch), and also assets/raw/c_sky.png and
assets/raw/c_sea.png. Every image you make must look like it belongs to the same game: the
same painterly storybook rendering, the same level of detail, the same soft lighting.

No text. Opaque image.

The underwater cross-section of a different sea region: the primordial sea. Same composition
and same size as assets/raw/c_sea.png (the top edge is the water surface, getting deeper
toward the bottom), but a different place:
very clear, clean water, bright turquoise-blue near the surface with soft natural sun rays,
deepening smoothly to a calm rich blue at the bottom. Completely empty: no sea floor, no
rocks, no plants, no fish, no bubbles, no ruins, no objects of any kind. Only clean water.
Same very wide proportions as c_sea.png.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_sea_9.png
```

### 381. `map_pin_9` — 해도 표식: 태초의 바다

```
Style references: open assets/raw/ui_map_pins.png from the GitHub repository
kelsnity86-arch/FISHIIIIG (main branch). Look at the eight round brass map markers in its
first two rows. Make ONE more marker painted EXACTLY like them: the same round brass frame
with the same pointed tip at the bottom, the same size, the same painterly rendering.

No text, no numbers. Fully transparent background. One marker only, centred.

Inside the round frame, a tiny painted scene: a calm, clean dawn sea with a pale golden sky
and a low sun on the horizon. Nothing else: no islands, no boats, no stars.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name map_pin_9.png
```

### 382. `p_fish_a` — 태초의 바다의 생물 6종 (anchovy, mackerel, goby, shrimp, filefish, flounder)

```
Style references: open assets/raw/h_npc.png, assets/raw/h_gear_a.png and
assets/raw/h_town_3.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch).
In h_npc.png, look closely at the fish that the first person (the fishmonger woman) is
holding in her arms. Every animal you paint must look like it was painted by the same hand
as THAT fish and those people: the same soft, warm storybook illustration, simplified
rounded shapes, big clear colour areas with gentle soft shading, only a few suggested
scales and markings, soft warm dark-brown outlines. Matching that style is the most
important requirement.

Eyes: this matters. Give every animal a gentle storybook eye: a simple round dark eye,
a little larger than in real life, with one or two soft white highlights, calm and kind.
NEVER a realistic fish eye: no glassy staring eye, no metallic gold or yellow ring, no
tiny hard pupil, nothing creepy or dead-looking.

Do NOT paint a realistic or scientific illustration. No photo-realism, no fine scale-by-scale
detail, no naturalist field-guide plate, no hard sharp rendering. Also NOT pixel art.
It should feel like a picture from a children's storybook, as charming as the people in
h_npc.png.

They are ordinary sea animals: each one must be clearly recognisable as its real species
(right overall shape, right colours, its typical markings), but drawn simply and warmly.
Nothing is attached to them and nothing is mixed into them: no objects, no metal, no
machinery, no decorations, no clothing. Calm natural look, no exaggerated cartoon
expressions.

No text, no labels, no numbers. No water, no bubbles, no shadow. Fully transparent background.

A sprite sheet of 6 animals in a grid of 2 columns x 3 rows, never touching, each centred in
its cell. Each animal is seen exactly from the side, facing RIGHT (head on the right, tail on the left), body level, the whole
animal inside its cell with a little empty margin. Draw each one as large as its cell allows
(do not show their real relative sizes). In this order, left to right, top to bottom:
1) anchovy: a Japanese anchovy, slender silver body,
2) mackerel: a chub mackerel, blue-green back with dark wavy bars, silver belly,
3) goby: a small brown mottled goby with a big head,
4) shrimp: a translucent pinkish shrimp with long feelers,
5) filefish: a threadsail filefish, diamond-shaped greyish body, small mouth,
6) flounder: an olive flounder seen from above its flat brown speckled side, both eyes on one side,
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name p_fish_a.png
```

### 383. `p_fish_b` — 태초의 바다의 생물 6종 (crab, bream, puffer, flying, squid, butterfly)

```
Style references: open assets/raw/h_npc.png, assets/raw/h_gear_a.png and
assets/raw/h_town_3.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch).
In h_npc.png, look closely at the fish that the first person (the fishmonger woman) is
holding in her arms. Every animal you paint must look like it was painted by the same hand
as THAT fish and those people: the same soft, warm storybook illustration, simplified
rounded shapes, big clear colour areas with gentle soft shading, only a few suggested
scales and markings, soft warm dark-brown outlines. Matching that style is the most
important requirement.

Eyes: this matters. Give every animal a gentle storybook eye: a simple round dark eye,
a little larger than in real life, with one or two soft white highlights, calm and kind.
NEVER a realistic fish eye: no glassy staring eye, no metallic gold or yellow ring, no
tiny hard pupil, nothing creepy or dead-looking.

Do NOT paint a realistic or scientific illustration. No photo-realism, no fine scale-by-scale
detail, no naturalist field-guide plate, no hard sharp rendering. Also NOT pixel art.
It should feel like a picture from a children's storybook, as charming as the people in
h_npc.png.

They are ordinary sea animals: each one must be clearly recognisable as its real species
(right overall shape, right colours, its typical markings), but drawn simply and warmly.
Nothing is attached to them and nothing is mixed into them: no objects, no metal, no
machinery, no decorations, no clothing. Calm natural look, no exaggerated cartoon
expressions.

No text, no labels, no numbers. No water, no bubbles, no shadow. Fully transparent background.

A sprite sheet of 6 animals in a grid of 2 columns x 3 rows, never touching, each centred in
its cell. Each animal is seen exactly from the side, facing RIGHT (head on the right, tail on the left), body level, the whole
animal inside its cell with a little empty margin. Draw each one as large as its cell allows
(do not show their real relative sizes). In this order, left to right, top to bottom:
1) crab: a blue swimming crab seen from above, claws spread,
2) bream: a red sea bream, pink-red with small blue spots,
3) puffer: a tiger puffer, not inflated, dark back with a round black spot and white belly,
4) flying: a flying fish with its long wing-like fins spread,
5) squid: a Japanese flying squid, reddish brown, arms trailing,
6) butterfly: a butterflyfish, yellow and white with a dark eye band,
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name p_fish_b.png
```

### 384. `p_fish_c` — 태초의 바다의 생물 6종 (seahorse, octopus, eel, manta, sturgeon, turtle)

```
Style references: open assets/raw/h_npc.png, assets/raw/h_gear_a.png and
assets/raw/h_town_3.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch).
In h_npc.png, look closely at the fish that the first person (the fishmonger woman) is
holding in her arms. Every animal you paint must look like it was painted by the same hand
as THAT fish and those people: the same soft, warm storybook illustration, simplified
rounded shapes, big clear colour areas with gentle soft shading, only a few suggested
scales and markings, soft warm dark-brown outlines. Matching that style is the most
important requirement.

Eyes: this matters. Give every animal a gentle storybook eye: a simple round dark eye,
a little larger than in real life, with one or two soft white highlights, calm and kind.
NEVER a realistic fish eye: no glassy staring eye, no metallic gold or yellow ring, no
tiny hard pupil, nothing creepy or dead-looking.

Do NOT paint a realistic or scientific illustration. No photo-realism, no fine scale-by-scale
detail, no naturalist field-guide plate, no hard sharp rendering. Also NOT pixel art.
It should feel like a picture from a children's storybook, as charming as the people in
h_npc.png.

They are ordinary sea animals: each one must be clearly recognisable as its real species
(right overall shape, right colours, its typical markings), but drawn simply and warmly.
Nothing is attached to them and nothing is mixed into them: no objects, no metal, no
machinery, no decorations, no clothing. Calm natural look, no exaggerated cartoon
expressions.

No text, no labels, no numbers. No water, no bubbles, no shadow. Fully transparent background.

A sprite sheet of 6 animals in a grid of 2 columns x 3 rows, never touching, each centred in
its cell. Each animal is seen exactly from the side, facing RIGHT (head on the right, tail on the left), body level, the whole
animal inside its cell with a little empty margin. Draw each one as large as its cell allows
(do not show their real relative sizes). In this order, left to right, top to bottom:
1) seahorse: a yellowish-brown seahorse, upright,
2) octopus: a common octopus, reddish brown, arms curling,
3) eel: a conger eel, long grey-brown body in a gentle S curve,
4) manta: a stingray-like ray seen slightly from above, wide wings, long tail,
5) sturgeon: a sturgeon with rows of bony plates and a long snout,
6) turtle: a green sea turtle swimming,
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name p_fish_c.png
```

### 385. `p_fish_d` — 태초의 바다의 생물 6종 (dolphin, tuna, marlin, sunfish, shark, whale)

```
Style references: open assets/raw/h_npc.png, assets/raw/h_gear_a.png and
assets/raw/h_town_3.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main branch).
In h_npc.png, look closely at the fish that the first person (the fishmonger woman) is
holding in her arms. Every animal you paint must look like it was painted by the same hand
as THAT fish and those people: the same soft, warm storybook illustration, simplified
rounded shapes, big clear colour areas with gentle soft shading, only a few suggested
scales and markings, soft warm dark-brown outlines. Matching that style is the most
important requirement.

Eyes: this matters. Give every animal a gentle storybook eye: a simple round dark eye,
a little larger than in real life, with one or two soft white highlights, calm and kind.
NEVER a realistic fish eye: no glassy staring eye, no metallic gold or yellow ring, no
tiny hard pupil, nothing creepy or dead-looking.

Do NOT paint a realistic or scientific illustration. No photo-realism, no fine scale-by-scale
detail, no naturalist field-guide plate, no hard sharp rendering. Also NOT pixel art.
It should feel like a picture from a children's storybook, as charming as the people in
h_npc.png.

They are ordinary sea animals: each one must be clearly recognisable as its real species
(right overall shape, right colours, its typical markings), but drawn simply and warmly.
Nothing is attached to them and nothing is mixed into them: no objects, no metal, no
machinery, no decorations, no clothing. Calm natural look, no exaggerated cartoon
expressions.

No text, no labels, no numbers. No water, no bubbles, no shadow. Fully transparent background.

A sprite sheet of 6 animals in a grid of 2 columns x 3 rows, never touching, each centred in
its cell. Each animal is seen exactly from the side, facing RIGHT (head on the right, tail on the left), body level, the whole
animal inside its cell with a little empty margin. Draw each one as large as its cell allows
(do not show their real relative sizes). In this order, left to right, top to bottom:
1) dolphin: a common dolphin, dark back, pale yellowish side patch,
2) tuna: a bluefin tuna, deep blue back, silver belly, small yellow finlets,
3) marlin: a striped marlin with a long bill and tall dorsal fin,
4) sunfish: an ocean sunfish, tall round grey body,
5) shark: a great white shark, grey above, white below,
6) whale: a fin whale, long sleek dark grey body, pale grooved throat,
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name p_fish_d.png
```


---

## ㊱ 태초 등급과 태초의 차림 (태초의 바다 도감 보상)

태초의 바다의 생물은 등급이 하나뿐이다: 태초. 그 바다의 도감을 채우면 장비 겉모습(태초의 차림)을 하나씩 얻는다.
태초의 차림은 사람이 만든 것 같지 않은, 바다가 내어 준 재료로만 된 물건이다: 물에 씻긴 나무, 조개, 자개, 진주, 산호, 갈대. 쇠·유리·톱니·보석 세공·마법 빛은 없다.

### 386. `ui_card_7` — 낚았을 때 카드 틀: 태초 등급

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/ui2_card.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). It contains several card frames, one per rarity. Take the FIRST (plainest) frame
and make ONE new frame from it. Keep exactly the same outer size and shape, the same inner
picture window in the same place, the same name plate and the same lower text plate in the
same places, the same painterly rendering. Change only the material and decoration of the
frame: make it of pale, sea-washed driftwood bound with woven reed, with a few small natural
seashells and one small pearl at the top centre. Calm and natural, no gold, no gems, no
flames, no glow.

No text. Fully transparent background. Only this one frame, centred.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui_card_7.png
```

### 387. `p_skins` — 태초의 차림: 찌·목도리·낚싯대·줄다리기 게이지 틀

```
Style references: open assets/raw/c_float_set.png, assets/raw/c_scarf_set.png,
assets/raw/c_rod_set.png and assets/raw/ui_tension_set.png from the GitHub repository
kelsnity86-arch/FISHIIIIG (main branch). Each new piece must be painted EXACTLY like the
pieces in those sheets: the same viewing angle, the same proportions, the same painterly
rendering and soft dark outlines, so that it can replace them in the game.

Theme for all four: things the sea itself gave, not made in a workshop. Materials only:
sea-washed driftwood, seashells, mother-of-pearl, pearls, a little pale coral, woven reed.
No metal, no glass, no gears, no cut gems, no glow, no magic.

No text. Fully transparent background.

One image with 4 pieces stacked in 4 rows, never touching, each centred in its row:
Row 1) a fishing float like the ones in c_float_set.png (same upright pose, a round body
       with a thin stem above and below): the body is a small smooth spiral seashell, the
       stem a thin reed.
Row 2) a scarf like the last one in c_scarf_set.png (a long straight horizontal strip,
       same length and same proportions): woven of pale sea-green and cream reed fibre
       with a row of tiny shells along the end.
Row 3) a fishing rod like the ones in c_rod_set.png (a straight side view, the same length
       and proportions, handle on the same side): a slender rod of pale driftwood, the
       handle wrapped in woven reed, a small shell as the reel.
Row 4) a tension gauge frame like the ones in ui_tension_set.png (a long horizontal frame
       with the same proportions and the same dark navy empty slot in the middle, the slot
       in the same position and the same size): the frame is pale driftwood with
       mother-of-pearl inlay and a small scallop shell at the left end.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name p_skins.png
```

### 388. `c_boat_t9` — 태초의 차림: 배 (바다에서) · 낚시꾼 자세 3장

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/c_boat_t8.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). It is a sheet of 3 poses of the same angler sitting in the same boat. Use it as
the image to edit. Keep the image size, the 3 poses, the angler (same person, same hat,
same clothes, same hands, same position in each pose) exactly as they are.

Change ONLY the boat under the angler, the same way in all 3 poses: replace it with a
simple, beautiful dugout canoe carved from one pale sea-washed log, with a smooth rounded
hull, a little mother-of-pearl inlay along the rim and a string of small shells at the bow.
No sail, no engine, no metal, no lantern, no glow. About the same length as the first
plain rowboat in assets/raw/c_boat.png, with its bottom at the same height as the boat it
replaces.

No text. Fully transparent background.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name c_boat_t9.png
```

### 389. `h_boat_9` — 태초의 차림: 배 (항구에 매어 둔 모습)

```
Style references: open assets/raw/h_boats2.png and assets/raw/h_town_3.png from the GitHub
repository kelsnity86-arch/FISHIIIIG (main branch). Paint ONE more moored boat EXACTLY like
the boats in h_boats2.png: the same viewing angle (from the side and very slightly from
above), the same light, the same painterly rendering, facing left, empty, with a flat
bottom edge at its waterline.

The boat: a simple, beautiful dugout canoe carved from one pale sea-washed log, smooth
rounded hull, a little mother-of-pearl inlay along the rim, a string of small shells at
the bow, one paddle lying inside. About as long as the 4th boat in h_boats2.png, wide and low.
No sail, no engine, no metal, no lantern, no glow.

No text. No people. No water, no dock, no reflection. Fully transparent background.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_boat_9.png
```


---

## ㊲ 생선 장수: 손에 든 것 바꾸기

이 세계에서 보통 크기의 평범한 물고기는 태초의 바다에 가서야 처음 발견된다. 그래서 생선 장수가 팔뚝만 한 물고기를 안고 있으면 안 된다. 대신 손저울과 얇은 장부를 들고 있다.

### 390. `h_npc_market` — 생선 장수 한 사람 (물고기 대신 손저울과 장부)

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/h_npc.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). It shows six people. Take ONLY the first person on the left (the cheerful
fishmonger woman with the white headscarf and blue apron) and make an image of her alone.
Keep her exactly as she is: same face, same smile, same hair and headscarf, same clothes,
same pose, same size, same painterly storybook rendering and outlines.

Change ONLY ONE thing: she must no longer hold a fish. Remove the fish completely. Instead
she holds up a small brass hand-held balance scale in one hand (a short beam hanging from
a ring she holds, with two small shallow brass pans on thin chains, both pans empty), at
about chest height, as if ready to weigh something. Under her other arm she holds a
thin, well-worn account ledger pressed against her side: a slim floppy notebook with a
plain brown paper cover, a few loose page corners sticking out and a short pencil tucked
into it. It must look clearly different from the thick, ornate leather book that the old
guild master holds in h_npc.png: thin, cheap and practical. Keep her body, shoulders and
smile as close to the original as possible.
There must be no fish and no part of a fish anywhere in the picture.

No text. Fully transparent background. Only this one person, centred, shown from the same
height as in the original (cut off at the same place at the bottom).
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name h_npc_market.png
```

## ㊳ 영어판: 글자가 든 그림

영어로 바꿔 볼 때 한글이 그대로 남는 그림은 이 두 장뿐이다. 글자만 영어로 바꾸고 나머지는 한 점도 바꾸지 않는다.

### 391. `ui2_caught_en` — '낚았다!' 글자판 6개의 영어판

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/ui2_caught.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). It shows six decorated wooden name plaques in a grid of 3 columns and 2 rows.
Each plaque carries the same Korean word in big, chunky, rounded cartoon lettering, and
each has its own colour and decoration (plain, leaves, water splashes, flames, golden
laurel and so on).

Make the same image again with ONLY the lettering changed: on every plaque replace the
Korean word with the English word   Caught!   (capital C, lowercase "aught", one
exclamation mark). Spell it exactly: C-a-u-g-h-t-!

Keep everything else exactly as it is: the same six plaques in the same positions and
sizes, the same frames, hooks, ropes, splashes, flames and sparkles, the same colours.
The new lettering must use the same style as the old lettering on that plaque: the same
fat rounded playful letters, the same fill colour and gradient, the same thick dark
outline, the same slight tilt and bounce, and it must fill the plaque about as much as
the old word did (do not let it touch or cross the frame).

No other text anywhere. Same canvas size, same fully transparent background.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui2_caught_en.png
```

### 392. `ui2_stamp_en` — 도장 2개의 영어판 (첫 포획 · 신기록)

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/ui2_stamp.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). It shows four items in one row. The first two are round rubber-stamp marks with
Korean lettering inside (a red one and a second one). The third and fourth items (a ribbon
and a badge) have no lettering.

Make the same image again with ONLY the lettering of the first two stamps changed:
- first stamp: replace the Korean lettering with   FIRST CATCH   (two lines: FIRST / CATCH)
- second stamp: replace the Korean lettering with   NEW RECORD   (two lines: NEW / RECORD)
Spell them exactly, all capitals.

Keep everything else exactly as it is: the same four items in the same positions and
sizes, the same round stamp rings, the same ink colour, the same worn, slightly uneven
rubber-stamp texture, the same tilt. The new letters must look stamped in the same ink
as the ring: bold, simple, slightly rough, and they must stay inside the ring. Leave the
ribbon and the badge untouched.

No other text anywhere. Same canvas size, same fully transparent background.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui2_stamp_en.png
```

## ㊴ 해도: 항로의 점 옮기기

지금 해도는 항로의 점이 해역과 해역 사이 경계에 찍혀 있다. 표식은 해역 그림 한가운데에 서야 하므로, 점을 한가운데로 옮긴다. 태초의 바다의 점과 항로는 그림에 넣지 않는다 (열린 뒤에만 보여야 하므로 게임이 그린다).

### 393. `ui_map_b` — 해도에서 점만 옮기기

```
This is an EDIT of an existing image, not a new painting.

Open assets/raw/ui_map.png from the GitHub repository kelsnity86-arch/FISHIIIIG (main
branch). It is a parchment sea chart: eight painted sea regions in a row from left to
right (harbour coast, coral tropics, misty islands, open ocean waves, polar ice, volcano
sea, deep trench, pastel fantasy sea), joined by one wavy white dashed route line. On
that line there are eight small round white dots with a thin dark rim. At the moment
each dot sits at the LEFT EDGE of its region, on the border with the region before it.

Make the same image again with ONLY the dots changed:

1. Remove the eight existing white dots. Where a dot was, continue the white dashed
   route line through it so the line has no gap and no leftover mark.

2. Paint eight new dots of exactly the same look and size (small round white dot, thin
   dark rim), each one ON the dashed route line, in the horizontal MIDDLE of its region
   (in the calm open water at the centre of each region's picture). Measured from the
   left edge of the image as a share of the full image width, the eight dots are at:
   13%, 25%, 35%, 47%, 58%, 69%, 80%, 92%.
   Each dot sits where the dashed line is at that position (about 53% to 54% of the way
   down the image). Do not move or reshape the dashed line.

Paint no other dots anywhere: exactly eight dots in the whole image, all on the route line.

Keep everything else exactly as it is, pixel for pixel as far as you can: the parchment,
the rope and brass corners, the compass, the clouds, all eight region paintings, the
dashed line and the colours. Do not add any pins, icons, labels or text. Same canvas
size and proportions as the original.

After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui_map_b.png
```

## ㊵ 설정 버튼과 설정 판의 아이콘

톱니 버튼은 이제 설정을 뜻한다 (화면 오른쪽 위). 그래서 바다 화면의 기술 버튼에 새 그림이 필요하고, 설정 판의 줄마다 제 그림이 필요하다.

### 394. `ui_ic_skill` — 기술 버튼 (낚싯바늘과 별)

```
Style reference: open assets/raw/ui2_hud.png from the GitHub repository
kelsnity86-arch/FISHIIIIG (main branch). Its bottom row shows four round buttons: a brass
ring wrapped with rope at four places and with four small brass rivets, and inside the
ring a small painted picture on a soft pastel sky with pink clouds (a lighthouse, a rolled
sea chart, an open book, a brass gear).

Paint ONE more button that belongs to exactly this set: the same brass ring with the same
rope wraps and rivets, the same thickness, the same soft painterly storybook rendering,
the same pastel sky with pink clouds inside.

Inside the ring: one sturdy brass fishing hook, large and centred, drawn with a clear
simple J shape and a small barb and eye, and beside its upper right a single small
five-pointed golden star with a soft glow. Nothing else inside. The hook must read
clearly even when the button is shown very small.

No text. Fully transparent background outside the ring. Only this one button, centred,
with a little empty margin around it. Square canvas.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name ui_ic_skill.png
```

### 395. `st_icons` — 설정·잠시 멈춤 판의 줄 아이콘 10개

```
Style reference: open assets/raw/h_skill.png from the GitHub repository
kelsnity86-arch/FISHIIIIG (main branch). It shows twelve round icons: each is a round
medallion with a thin golden rim that has four small compass points (up, down, left,
right), a deep blue starry evening sky inside with a few pink clouds and a strip of sea
waves at the bottom, and one clear object painted in the middle in a soft painterly
storybook style.

Paint TEN new icons that belong to exactly this set: the same medallion, the same golden
rim with four compass points, the same starry blue sky, pink clouds and waves, the same
rendering and the same size. Arrange them in a grid of 5 columns and 2 rows with clear
empty space between them. In reading order (left to right, top row first) the objects are:

Top row:
1. a single golden musical note (an eighth note) with a soft glow
2. a small brass ship's bell, slightly tilted as if ringing, with two short ring marks
3. one curling sea wave with white foam and a small white seagull flying above it
4. a small wooden window frame with four panes showing bright sky through it
5. a brass spyglass (telescope), extended, pointing up to the right

Bottom row:
6. a red and white fishing float standing in the water with small ripple rings and short
   shake marks on both sides, as if trembling
7. a small parchment scroll with a speech-bubble shape, showing three short plain ink
   strokes (not real letters)
8. a small boat's white sail filled with wind on a short mast
9. a brass gear (the same gear as the gear icon in h_skill.png)
10. a brass ship's anchor with a short loop of rope

Each object is large and centred in its medallion and must read clearly when the icon is
shown very small. No text and no real letters anywhere. Fully transparent background
outside the medallions.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name st_icons.png
```

## ㊶ 줄다리기 때 줄의 이펙트

줄 자체는 코드가 긋는 선이다. 그 위에 얹는 작은 그림 세 가지: 끊어지기 직전에 튀는 불티, 감는 동안 줄을 타고 흐르는 빛 알갱이, 줄이 물을 가르는 자리의 물살.

### 396. `fx_line` — 불티 3개 · 빛 알갱이 2개 · 물살 2개

```
Style references: open assets/raw/h_skill.png and assets/raw/ui2_hud.png from the GitHub
repository kelsnity86-arch/FISHIIIIG (main branch) for the look of this game: soft
painterly storybook rendering, warm and gentle, no hard black outlines.

Paint one sheet of small effect pieces in that same soft painterly style, on a fully
transparent background, arranged in THREE clearly separated rows with plenty of empty
space between all pieces. Every piece is small and simple, because it is shown tiny.

Row 1 (top): THREE ember sparks, side by side. Each is a tiny hot spark as from a
strained rope about to snap: a bright yellow-white core, an orange to red edge, a soft
warm glow around it, with one or two short tapering streaks. Make the three different:
  - a small round ember with a short tail,
  - a thin elongated streak spark,
  - a little four-armed star-shaped spark.
No black outline at all.

Row 2 (middle): TWO soft light motes, side by side. Each is a small round drop of pale
golden-white light with a soft glow that fades out smoothly at the edge, like a bead of
light sliding along a thread. One is plain and round; the other has a tiny four-point
twinkle in its centre. No outline, no hard edge.

Row 3 (bottom): TWO small water wakes seen from the side, side by side, each standing on
a flat water line at the bottom edge of its piece. This is the little wake made where a
taut fishing line cuts through the surface while it is dragged to the LEFT: on the left
a small curl of water pushed up with white foam at its tip, and behind it to the right a
low thin tail of foam and a few droplets lying on the surface. Wide and low (about three
times as wide as tall). Painted like the sea foam in this game: white foam, pale
turquoise water, soft edges fading to transparent at the bottom and the right.
  - first: a small gentle wake,
  - second: a stronger one with a taller curl and more droplets.

No text anywhere. Fully transparent background. Seven pieces in total.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fx_line.png
```

## ㊷ 줄 단계마다 다른 빛 알갱이

감는 동안 줄을 타고 흐르는 빛 알갱이가 줄 단계마다 다르다. 2단계는 #396의 흰 빛 알갱이를 쓰고, 3단계부터 태초까지 일곱 가지가 더 필요하다.

### 397. `fx_motes` — 빛 알갱이 7개

```
Style reference: open assets/raw/fx_line.png from the GitHub repository
kelsnity86-arch/FISHIIIIG (main branch). Its middle row shows two soft light motes: a
small round drop of pale golden-white light with a soft glow that fades out smoothly at
the edge, with no outline and no hard edge.

Paint SEVEN more light motes that belong to exactly this set: the same size, the same
soft painterly glow fading smoothly to transparent, no outline, no hard edge. Each one is
a small bead of light that slides along a fishing line, so each must be simple and read
clearly when shown tiny. Arrange them in ONE row, left to right, with plenty of empty
space between them, on a fully transparent background. In order:

1. Water drop: a small clear teardrop of pale blue-white water with a tiny highlight and
   a faint cool glow.
2. Leaf light: a small glowing fresh-green mote with the soft shape of one tiny leaf in
   its centre, pale green glow.
3. Wave light: a glowing sky-blue mote with a tiny white curl of foam in its centre like
   a miniature wave crest, blue glow.
4. Violet star: a soft glowing purple mote with a small bright four-point star in its
   centre, violet glow.
5. Golden flame: a warm golden mote shaped like a tiny candle flame, bright yellow core,
   orange-gold glow.
6. Rainbow: a white-cored mote whose soft glow shifts gently through pastel rainbow
   colours around it.
7. Pearl: a small round pearl of warm ivory light with a soft pink and pale blue sheen,
   gentle white glow.

No text anywhere. Fully transparent background. Seven pieces in total, all about the same
size as the motes in the reference.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name fx_motes.png
```

## ㊸ 도감의 인덱스 스티커

도감(책)의 오른쪽 종이 가장자리에, 공책에 붙이는 색 인덱스 스티커처럼 옆으로 삐져나온 표시가 세로로 한 줄 붙는다. 누르면 그 해역의 쪽으로 넘어간다. 글자(1~8, 공, 태, 옛)는 게임이 쓴다.

### 398. `dex_index` — 인덱스 스티커 11개 (글자 없음)

```
Style reference: open assets/raw/ui_dex.png from the GitHub repository
kelsnity86-arch/FISHIIIIG (main branch) for the look of this game's logbook: warm
parchment, soft painterly storybook rendering, gentle colours, no hard black outlines.

Paint ELEVEN blank index stickers (the small coloured adhesive index tabs that are stuck
on the edge of a notebook page so that they poke out sideways), in that same soft
painterly style, on a fully transparent background.

Every sticker has exactly the same shape and size and lies HORIZONTALLY, about twice as
wide as tall, with softly rounded corners:
- The LEFT third is the part glued onto the page: plain, slightly translucent, the same
  pale colour, with no border, fading a little toward the left edge.
- The RIGHT two thirds is the part that pokes out past the page edge: a pale tinted
  paper label with a clearly darker border line of the same colour running around it a
  little inside the edge (a rounded rectangle frame), and an EMPTY pale centre where a
  letter will be written later. A faint paper texture and a soft highlight; a very light
  shadow under the right part.
No letters, numbers or symbols on any sticker.

Arrange them in a grid: 4 in the first row, 4 in the second row, 3 in the third row,
with plenty of empty space between them. In reading order the colours are:
 1. sky blue
 2. turquoise / aqua green
 3. soft misty grey with a hint of green
 4. deep ocean blue
 5. icy white-blue (very pale, with a light blue border)
 6. warm orange (lava)
 7. dark indigo navy
 8. pastel violet
 9. fresh leaf green
10. pearl ivory with a soft pink and pale blue sheen
11. weathered brown, like old leather

Keep each centre pale enough that dark brown handwriting on it stays easy to read (for
the dark indigo one, keep the border dark but the centre a pale indigo-tinted paper).

Fully transparent background. Eleven pieces in total.
After creating the image, upload it to the GitHub repository kelsnity86-arch/FISHIIIIG
on the main branch, in the folder assets/raw/, with the file name dex_index.png
```

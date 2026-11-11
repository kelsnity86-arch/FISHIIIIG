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
### 215. `d_hammer_shark` — 고급: 망치상어

```
No text. Fully transparent background.

Deliberately crude, low-quality, funny retro pixel art, like a sprite a beginner drew in
MS Paint for a cheap 8-bit game. One imaginary sea creature that mixes a real animal, an
everyday object and a cartoon gag:
a hammerhead shark whose head is a real steel claw hammer with a wooden handle body.

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

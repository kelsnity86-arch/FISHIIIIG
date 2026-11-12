"""앱 아이콘을 엠블럼 그림(assets/raw/ui_emblem.png)으로 만든다: 안드로이드 아이콘 크기별 + 웹용 아이콘.

python3 tools/make_icon.py
"""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
RES = ROOT / 'android' / 'app' / 'src' / 'main' / 'res'
BG = (14, 26, 46, 255)                                   # 게임의 밤바다 남색 (ic_launcher_background 와 같다)

em = Image.open(ROOT / 'assets' / 'raw' / 'ui_emblem.png').convert('RGBA')
em = em.crop(em.getbbox())
def fit(size, ratio):
    """size 크기의 투명 판 한가운데에, 엠블럼을 판의 ratio 만큼 크게"""
    w = round(size * ratio); im = em.resize((w, round(w * em.height / em.width)), Image.LANCZOS)
    c = Image.new('RGBA', (size, size), (0, 0, 0, 0)); c.alpha_composite(im, ((size - im.width) // 2, (size - im.height) // 2)); return c
for d, px in (('mdpi', 48), ('hdpi', 72), ('xhdpi', 96), ('xxhdpi', 144), ('xxxhdpi', 192)):
    big = px * 4
    sq = Image.new('RGBA', (big, big), BG); sq.alpha_composite(fit(big, 0.86))
    mask = Image.new('L', (big, big), 0); ImageDraw.Draw(mask).rounded_rectangle((0, 0, big - 1, big - 1), radius=big * 0.2, fill=255)
    out = Image.new('RGBA', (big, big), (0, 0, 0, 0)); out.paste(sq, (0, 0), mask); out.resize((px, px), Image.LANCZOS).save(RES / f'mipmap-{d}' / 'ic_launcher.png')
    mask = Image.new('L', (big, big), 0); ImageDraw.Draw(mask).ellipse((0, 0, big - 1, big - 1), fill=255)
    out = Image.new('RGBA', (big, big), (0, 0, 0, 0)); out.paste(sq, (0, 0), mask); out.resize((px, px), Image.LANCZOS).save(RES / f'mipmap-{d}' / 'ic_launcher_round.png')
    fg = round(px * 108 / 48); fit(fg * 2, 0.6).resize((fg, fg), Image.LANCZOS).save(RES / f'mipmap-{d}' / 'ic_launcher_foreground.png')   # 가장자리가 잘려도 엠블럼이 다 보이게
web = Image.new('RGBA', (512, 512), BG); web.alpha_composite(fit(512, 0.86)); web.save(ROOT / 'assets' / 'icon-512.png'); web.resize((192, 192), Image.LANCZOS).save(ROOT / 'assets' / 'icon-192.png')
print('아이콘 완료')

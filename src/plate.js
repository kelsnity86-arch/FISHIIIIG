// 글 뒤에 까는 판 (그림): 양 끝은 그대로 두고 가운데만 글 길이에 맞춰 늘린다. 그림이 없으면 아무것도 그리지 않고 false 를 돌려준다
//   ui_note  안내글용 양피지 띠 · ui_tag  의뢰 쪽지 · ui_chip  작은 누름 판 ('건너뛰기', '처음부터 다시')
import { sprite, hasSprite } from './assets.js';
import { tr } from './i18n.js';

const FONT = '"Hahmlet", system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
export const hasPlate = (key) => hasSprite(key);
// x 는 align 에 따라 가운데('center')·왼쪽 끝('left')·오른쪽 끝('right'). 글과 판을 함께 그린다
export function plateText(ctx, key, str, x, y, size, color, { align = 'center', weight = 600, h = size * 1.9, pad = 9, capK = 0.2 } = {}) {
  if (!hasSprite(key)) return false;
  const sp = sprite(key), s = tr(str);
  ctx.font = `${weight} ${size}px ${FONT}`;
  const k = h / sp.h, cap = sp.w * k * capK, w = Math.max(ctx.measureText(s).width + pad * 2, cap * 2 + 4);
  const x0 = align === 'center' ? x - w / 2 : align === 'left' ? x : x - w, iw = sp.img.width, ih = sp.img.height, ic = iw * capK;
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(sp.img, 0, 0, ic, ih, x0, y - h / 2, cap, h);
  ctx.drawImage(sp.img, iw - ic, 0, ic, ih, x0 + w - cap, y - h / 2, cap, h);
  ctx.drawImage(sp.img, ic, 0, iw - 2 * ic, ih, x0 + cap - 0.3, y - h / 2, w - 2 * cap + 0.6, h);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = color; ctx.fillText(str, x0 + w / 2, y + 0.4);
  return true;
}

// 가게·설정 판의 줄: 왼쪽에 네모 칸이 없는 줄. 아이콘은 종이 위에 바로 놓인다 (둥근 아이콘을 네모 칸에 넣으면 겹으로 보이고, 가게마다 느낌이 달라졌다).
// 칸 없는 줄 그림(<이름>_plain)이 있으면 그것을 쓴다. 없으면 칸 있는 줄 그림의 조각을 옮겨 붙여 칸을 덮는다: 왼쪽 끝은 오른쪽 끝을 뒤집어 쓰고, 칸 자리는 가운데의 민무늬 종이를 늘려 덮는다.
export function plainRow(ctx, key, r) {
  ctx.imageSmoothingEnabled = true;
  if (hasSprite(key + '_plain')) { ctx.drawImage(sprite(key + '_plain').img, r.x, r.y, r.w, r.h); return; }
  const im = sprite(key).img, iw = im.width, ih = im.height, cap = 0.03, cover = 0.215;      // 줄 폭에 대한 비율: 둥근 끝의 폭, 네모 칸이 끝나는 자리
  ctx.drawImage(im, r.x, r.y, r.w, r.h);
  ctx.save(); ctx.translate(r.x + r.w * cap, r.y); ctx.scale(-1, 1); ctx.drawImage(im, iw * (1 - cap), 0, iw * cap, ih, 0, 0, r.w * cap, r.h); ctx.restore();
  ctx.drawImage(im, iw * 0.3, 0, iw * 0.12, ih, r.x + r.w * cap - 0.3, r.y, r.w * (cover - cap) + 0.6, r.h);
}


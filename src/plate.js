// 글 뒤에 까는 판 (그림): 양 끝은 그대로 두고 가운데만 글 길이에 맞춰 늘린다. 그림이 없으면 아무것도 그리지 않고 false 를 돌려준다
//   ui_note  안내글용 양피지 띠 · ui_tag  의뢰 쪽지 · ui_chip  작은 누름 판 ('건너뛰기', '처음부터 다시')
import { sprite, hasSprite } from './assets.js';
import { tr } from './i18n.js';

const FONT = '"Hahmlet", system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
export const hasPlate = (key) => hasSprite(key);
// x 는 align 에 따라 가운데('center')·왼쪽 끝('left')·오른쪽 끝('right'). 글과 판을 함께 그린다
// 세 조각 이어 붙이기: 왼쪽 끝(L)·오른쪽 끝(R)은 제 비율로, 가운데만 늘린다 (L·R = 그림 폭에 대한 비율).
// 조각을 화면에 따로 그리면 맞닿는 자리가 조금 겹쳐, 반투명할 때 그 자리만 진해져 세로줄이 보인다.
// → 먼저 안 보이는 판에 다 붙여 놓고(한 번만), 화면에는 그 한 장을 그린다.
const joined = new Map();
export function slice3(ctx, key, x, y, w, h, L, R = L) {
  const im = sprite(key).img, K = 4, cw = Math.max(2, Math.round(w * K)), ch = Math.max(2, Math.round(h * K)), id = key + '|' + cw + '|' + ch + '|' + L + '|' + R;
  let c = joined.get(id);
  if (!c) {
    if (joined.size > 80) joined.clear();
    c = document.createElement('canvas'); c.width = cw; c.height = ch;
    const q = c.getContext('2d'), iw = im.width, ih = im.height, k = ch / ih, lw = Math.round(iw * L * k), rw = Math.round(iw * R * k);
    q.imageSmoothingEnabled = true;
    q.drawImage(im, iw * L, 0, iw * (1 - L - R), ih, lw - 1, 0, cw - lw - rw + 2, ch);      // 가운데를 먼저, 조금 넓게 깔고
    q.clearRect(0, 0, lw, ch); q.clearRect(cw - rw, 0, rw, ch);                              // 양 끝 자리를 비운 뒤
    q.drawImage(im, 0, 0, iw * L, ih, 0, 0, lw, ch); q.drawImage(im, iw * (1 - R), 0, iw * R, ih, cw - rw, 0, rw, ch);      // 끝 조각을 놓는다 (겹치는 곳이 없다)
    joined.set(id, c);
  }
  ctx.imageSmoothingEnabled = true; ctx.drawImage(c, x, y, w, h);
}

// x 는 align 에 따라 가운데('center')·왼쪽 끝('left')·오른쪽 끝('right'). 글과 판을 함께 그린다
export function plateText(ctx, key, str, x, y, size, color, { align = 'center', weight = 600, h = size * 1.9, pad = 9, capK = 0.2 } = {}) {
  if (!hasSprite(key)) return false;
  const sp = sprite(key), s = tr(str);
  ctx.font = `${weight} ${size}px ${FONT}`;
  const k = h / sp.h, cap = sp.w * k * capK, w = Math.max(ctx.measureText(s).width + pad * 2, cap * 2 + 4);
  const x0 = align === 'center' ? x - w / 2 : align === 'left' ? x : x - w;
  slice3(ctx, key, x0, y - h / 2, Math.round(w * 2) / 2, h, capK);      // 폭을 반 칸 단위로 맞춰, 글 길이가 조금 달라질 때마다 새로 붙이지 않게
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = color; ctx.fillText(str, x0 + w / 2, y + 0.4);
  return true;
}

// 가게·설정 판의 줄: 왼쪽에 네모 칸이 없는 줄. 아이콘은 종이 위에 바로 놓인다 (둥근 아이콘을 네모 칸에 넣으면 겹으로 보이고, 가게마다 느낌이 달라졌다).
// 칸 없는 줄 그림(<이름>_plain)이 있으면 그것을 쓴다. 없으면 칸 있는 줄 그림의 조각을 옮겨 붙여 칸을 덮는다: 왼쪽 끝은 오른쪽 끝을 뒤집어 쓰고, 칸 자리는 가운데의 민무늬 종이를 늘려 덮는다.
const patches = new Map();
export function plainRow(ctx, key, r) {
  ctx.imageSmoothingEnabled = true;
  if (hasSprite(key + '_plain')) { ctx.drawImage(sprite(key + '_plain').img, r.x, r.y, r.w, r.h); return; }
  const im = sprite(key).img, iw = im.width, ih = im.height, cap = 0.03, cover = 0.26;      // 줄 폭에 대한 비율: 둥근 끝의 폭, 덮는 조각이 끝나는 자리 (네모 칸은 0.2쯤에서 끝난다)
  ctx.drawImage(im, r.x, r.y, r.w, r.h);
  let pc = patches.get(im);
  if (!pc) {      // 덮는 조각은 한 번만 만든다. 오른쪽 끝은 서서히 풀어서 이음매가 보이지 않게 한다
    pc = document.createElement('canvas'); pc.width = Math.ceil(iw * cover); pc.height = ih;
    const q = pc.getContext('2d');
    q.save(); q.translate(iw * cap, 0); q.scale(-1, 1); q.drawImage(im, iw * (1 - cap), 0, iw * cap, ih, 0, 0, iw * cap, ih); q.restore();
    q.drawImage(im, iw * 0.3, 0, iw * (cover - cap), ih, iw * cap - 0.5, 0, iw * (cover - cap) + 1, ih);      // 늘리지 않고 같은 폭의 종이를 그대로 옮긴다 (결이 뭉개지지 않는다)
    const g0 = q.createLinearGradient(iw * (cover - 0.05), 0, iw * cover, 0); g0.addColorStop(0, 'rgba(0,0,0,0)'); g0.addColorStop(1, 'rgba(0,0,0,1)');
    q.globalCompositeOperation = 'destination-out'; q.fillStyle = g0; q.fillRect(iw * (cover - 0.05), 0, iw * 0.05 + 1, ih);
    patches.set(im, pc);
  }
  ctx.drawImage(pc, r.x, r.y, r.w * cover, r.h);
}

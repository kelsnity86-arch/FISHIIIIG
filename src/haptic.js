// 진동 (안드로이드 앱·안드로이드 브라우저에서만 울린다). 세기 단계는 기기에 저장된다.
// 0 = 끔 · 1 = 챌 때와 낚았을 때만 · 2 = 그 밖의 손맛(조짐·날뛰기·놓침·구매 등)까지 · 3 = 줄다리기 내내 당기는 떨림까지
const KEY = 'hori-vibe';
let lv = (() => { try { const v = localStorage.getItem(KEY); return v === 'off' ? 0 : v === '1' ? 1 : v === '3' ? 3 : 2; } catch { return 2; } })();
export const vibeLv = () => lv;
export const vibeName = () => (lv ? `진동 ${lv}단계` : '진동 끔');
export function setVibe(v) { lv = v; try { localStorage.setItem(KEY, v ? String(v) : 'off'); } catch { /* 저장이 막힌 환경 */ } if (v) buzz(v === 1 ? 20 : v === 2 ? 35 : [35, 40, 35], 1); }
export const nextVibe = () => setVibe((lv + 1) % 4);       // 끔 → 1 → 2 → 3 → 끔
// need: 이 진동이 울리려면 필요한 단계 (기본 2)
export function buzz(pattern, need = 2) { if (lv < need) return; try { if (navigator.vibrate) navigator.vibrate(pattern); } catch { /* 진동 미지원 */ } }

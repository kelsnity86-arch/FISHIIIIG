// 진동 (안드로이드 앱·안드로이드 브라우저에서만 울린다). 켬/끔은 기기에 저장된다.
const KEY = 'hori-vibe';
let on = (() => { try { return localStorage.getItem(KEY) !== 'off'; } catch { return true; } })();
export const vibeOn = () => on;
export function setVibe(v) { on = v; try { localStorage.setItem(KEY, v ? 'on' : 'off'); } catch { /* 저장이 막힌 환경 */ } if (v) buzz(30); }
export function buzz(pattern) { if (!on) return; try { if (navigator.vibrate) navigator.vibrate(pattern); } catch { /* 진동 미지원 */ } }

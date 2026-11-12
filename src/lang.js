// 지금 언어 (한국어 / English). 다른 것을 불러오지 않는 작은 파일이라, 계산만 하는 도구(tools/sim_game.mjs)도 그대로 쓸 수 있다.
const KEY = 'hori-lang';
let lang = (() => { try { const v = localStorage.getItem(KEY); if (v === 'ko' || v === 'en') return v; } catch { /* 저장이 없는 환경 */ }
  return typeof navigator !== 'undefined' && navigator.language && !/^ko/i.test(navigator.language) ? 'en' : 'ko'; })();      // 처음에는 기기의 언어를 따른다 (한국어가 아니면 영어)
const subs = [];
export const onLang = (fn) => subs.push(fn);
export const EN = () => lang === 'en';
export const langName = () => (lang === 'en' ? 'English' : '한국어');
export function nextLang() { lang = lang === 'en' ? 'ko' : 'en'; try { localStorage.setItem(KEY, lang); } catch { /* 무시 */ } subs.forEach((f) => f()); }
export const L = (ko, en) => (lang === 'en' ? en : ko);

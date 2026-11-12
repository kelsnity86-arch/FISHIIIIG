// 배포용 잠금의 셈법. 게임(그림을 풀 때)과 묶는 도구(tools/build_www.mjs, 그림을 잠글 때)가 함께 쓴다.
const hash32 = (str, seed = 0x811c9dc5) => { let h = seed >>> 0; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h >>> 0; };
// 잠근 파일의 이름: 원래 이름을 알아볼 수 없게
export const lockedName = (file, key) => hash32(key + '/' + file).toString(36) + hash32(file + '#' + key, 0x9e3779b9).toString(36) + '.dat';
export function unlock(bytes, file, key) {       // 같은 셈을 한 번 더 하면 원래대로 돌아온다 (잠그기 = 풀기)
  let a = hash32(key + ':' + file) || 1, b = hash32(file + ':' + key, 0x85ebca6b) || 1;
  for (let i = 0; i < bytes.length; i++) {
    a ^= a << 13; a >>>= 0; a ^= a >>> 17; a ^= a << 5; a >>>= 0;
    if ((i & 1023) === 0) { b = (Math.imul(b, 1664525) + 1013904223) >>> 0; a = (a ^ b) >>> 0 || 1; }
    bytes[i] ^= a & 255;
  }
  return bytes;
}

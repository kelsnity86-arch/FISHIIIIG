// 게임(설정 판)에서 창 크기와 전체 화면을 바꿀 수 있게 해 주는 통로. 그 밖의 것은 열어 주지 않는다.
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('horiPC', {
  setSize: (w, h) => ipcRenderer.send('hori-size', w | 0, h | 0),
  setFullscreen: (on) => ipcRenderer.send('hori-fullscreen', !!on),
});

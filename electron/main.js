// PC판(윈도우): 게임(www/)을 창 하나에 띄운다. 게임 코드는 폰·웹과 똑같은 것을 쓴다.
// 주소를 app://game/ 로 고정해 두어, 저장(localStorage)이 프로그램을 옮기거나 새 판으로 바꿔도 이어진다.
const { app, BrowserWindow, protocol, net, Menu, ipcMain, screen } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.join(__dirname, '..', 'www');
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true } }]);

// 같은 프로그램을 두 번 켜면 저장이 꼬일 수 있다: 이미 켜져 있으면 그 창을 앞으로 가져온다
if (!app.requestSingleInstanceLock()) app.quit();

let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 1280, height: 720, minWidth: 640, minHeight: 360, useContentSize: true, backgroundColor: '#0e1a2e', show: false,
    title: "Hori's Horizon — 호라이의 수평선", autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, backgroundThrottling: false, preload: path.join(__dirname, 'preload.js') },
  });
  win.setAspectRatio(16 / 9);
  win.once('ready-to-show', () => win.show());
  // F11 · Alt+Enter: 전체 화면 켜고 끄기
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type !== 'keyDown') return;
    if (input.key === 'F11' || (input.key === 'Enter' && input.alt)) { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
  });
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));      // 새 창은 열지 않는다
  win.loadURL('app://game/index.html');
}

// 설정 판의 해상도: 창 크기를 바꾼다 (비율 16:9). 화면보다 크면 화면에 들어가는 가장 큰 16:9 로 줄인다
ipcMain.on('hori-size', (e, w, h) => {
  if (!win || !(w >= 640 && h >= 360)) return;
  const area = screen.getDisplayMatching(win.getBounds()).workAreaSize, k = Math.min(1, (area.width - 16) / w, (area.height - 40) / h);
  if (win.isFullScreen()) win.setFullScreen(false);
  if (win.isMaximized()) win.unmaximize();
  win.setContentSize(Math.round(w * k), Math.round(h * k)); win.center();
});
ipcMain.on('hori-fullscreen', (e, on) => { if (win) win.setFullScreen(!!on); });
ipcMain.on('hori-quit', () => app.quit());      // 일시정지 메뉴의 '게임 종료'

app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  protocol.handle('app', (req) => {
    const rel = decodeURIComponent(new URL(req.url).pathname).replace(/^\/+/, '') || 'index.html';
    const file = path.normalize(path.join(ROOT, rel));
    if (!file.startsWith(ROOT)) return new Response('not found', { status: 404 });      // 게임 폴더 밖은 읽지 않는다
    return net.fetch(pathToFileURL(file).toString());
  });
  createWindow();
});
app.on('window-all-closed', () => app.quit());

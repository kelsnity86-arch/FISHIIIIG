// PC판(윈도우): 게임(www/)을 창 하나에 띄운다. 게임 코드는 폰·웹과 똑같은 것을 쓴다.
// 주소를 app://game/ 로 고정해 두어, 저장(localStorage)이 프로그램을 옮기거나 새 판으로 바꿔도 이어진다.
const { app, BrowserWindow, protocol, net, Menu } = require('electron');
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
    webPreferences: { contextIsolation: true, nodeIntegration: false, backgroundThrottling: false },
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

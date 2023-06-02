import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'node:path';
import setupIPC from './ipc/setup';

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │

const dist_path = path.join(__dirname, '../dist');
const public_path = app.isPackaged ? dist_path : path.join(dist_path, '../public');

const { VITE_DEV_SERVER_URL } = process.env;

function createWindow() {
  const window = new BrowserWindow({
    icon: path.join(public_path, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (VITE_DEV_SERVER_URL) {
    window.loadURL(VITE_DEV_SERVER_URL);
  } else {
    window.loadFile(path.join(dist_path, 'index.html'));
  }

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = false;
  autoUpdater.on('update-downloaded', () => autoUpdater.quitAndInstall());
  autoUpdater.checkForUpdates();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(() => {
  setupIPC();
  createWindow();
});

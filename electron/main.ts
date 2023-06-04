import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'node:path';
import minimist from 'minimist';
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

const { VITE_DEV_SERVER_URL } = process.env;

const argv = minimist(process.argv.slice(process.argv.indexOf('--') + 1), {
  default: { width: 1920, height: 1080, kiosk: true },
  alias: { width: 'w', height: 'h' },
});

function createWindow() {
  const window = new BrowserWindow({
    kiosk: argv.kiosk as boolean,
    fullscreen: argv.kiosk as boolean,
    width: argv.width as number,
    height: argv.height as number,
    autoHideMenuBar: true,
    webPreferences: {
      devTools: import.meta.env.DEV,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  window.removeMenu();

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

import { ipcMain } from 'electron';
import testIPC from './testIPC';
import sendMail from './sendMail';
import getVersion from './getVersion';

const setupIPC = () => {
  ipcMain.handle('test-ipc', testIPC);
  ipcMain.handle('send-mail', (_, subject, body) => sendMail(subject, body));
  ipcMain.handle('get-version', getVersion);
};

export default setupIPC;

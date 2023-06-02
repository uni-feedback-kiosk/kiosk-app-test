import { ipcMain } from 'electron';
import testIPC from './testIPC';
import sendMail from './sendMail';

const setupIPC = () => {
  ipcMain.handle('test-ipc', testIPC);
  ipcMain.handle('send-mail', (_, subject, body) => sendMail(subject, body));
};

export default setupIPC;

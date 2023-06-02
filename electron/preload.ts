import { contextBridge, ipcRenderer } from 'electron';

export const apiName = 'electronAPI';

export type API = {
  testIPC: () => Promise<string>;
  sendMail: () => Promise<void>;
};

const api: API = {
  testIPC: () => ipcRenderer.invoke('test-ipc'),
  sendMail: () => ipcRenderer.invoke('send-mail', 'Test subject', 'Test body'),
};

contextBridge.exposeInMainWorld(apiName, api);

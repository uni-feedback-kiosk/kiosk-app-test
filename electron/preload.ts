import { contextBridge, ipcRenderer } from 'electron';
import { IPCVoidResult } from './ipc/IPCResult';

export const apiName = 'electronAPI';

export type API = {
  testIPC: () => Promise<IPCVoidResult>;
  sendMail: () => Promise<IPCVoidResult>;
};

const api: API = {
  testIPC: () => ipcRenderer.invoke('test-ipc'),
  sendMail: () => ipcRenderer.invoke('send-mail', 'Test subject', 'Test body'),
};

contextBridge.exposeInMainWorld(apiName, api);

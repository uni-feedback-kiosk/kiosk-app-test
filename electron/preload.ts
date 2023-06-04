import { contextBridge, ipcRenderer } from 'electron';
import { IPCResult, IPCVoidResult } from './ipc/IPCResult';

export const apiName = 'electronAPI';

export type API = {
  testIPC: () => Promise<IPCVoidResult>;
  sendMail: () => Promise<IPCVoidResult>;
  getVersion: () => Promise<IPCResult<string>>;
};

const api: API = {
  testIPC: () => ipcRenderer.invoke('test-ipc'),
  sendMail: () => ipcRenderer.invoke('send-mail', 'Test subject', 'Test body'),
  getVersion: () => ipcRenderer.invoke('get-version'),
};

contextBridge.exposeInMainWorld(apiName, api);

import { contextBridge, ipcRenderer } from 'electron';

export const apiName = 'electronAPI';

export type API = {
  testIPC: () => Promise<string>;
};

const api: API = {
  testIPC: () => ipcRenderer.invoke('test-ipc'),
};

contextBridge.exposeInMainWorld(apiName, api);

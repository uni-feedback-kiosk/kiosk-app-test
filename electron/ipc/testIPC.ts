import { IPCVoidResult } from './IPCResult';

const testIPC = async (): Promise<IPCVoidResult> => {
  // eslint-disable-next-line no-console
  console.log('Received test IPC message');
  return { ok: true };
};

export default testIPC;

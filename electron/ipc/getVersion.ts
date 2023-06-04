import { app } from 'electron';
import { IPCResult } from './IPCResult';

const getVersion = async (): Promise<IPCResult<string>> => ({ ok: true, data: app.getVersion() });

export default getVersion;

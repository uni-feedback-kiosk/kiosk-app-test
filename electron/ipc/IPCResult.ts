type IPCFailure = { ok: false; error: string };
type IPCSuccess = { ok: true };
export type IPCResult<TData> = (IPCSuccess & { data: TData }) | (IPCFailure & { data: undefined });
export type IPCVoidResult = IPCSuccess | IPCFailure;

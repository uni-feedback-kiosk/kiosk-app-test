type IPCFailure = { ok: false; error: string };
type IPCSuccess = { ok: true };
export type IPCResult<TData> = (IPCSuccess & { data: TData }) | IPCFailure;
export type IPCVoidResult = IPCSuccess | IPCFailure;

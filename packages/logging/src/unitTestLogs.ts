import type { LogRecord, Sink } from '@logtape/logtape';

/**
 * Runtime half of unit-test log intercept. `createLogger` calls this so tests
 * never mock `Logger`, stub console, or remember to disable file/HTTP sinks.
 *
 * How we know this process is a unit-test worker (any of these):
 * - Jest sets `JEST_WORKER_ID` (mobile, web, server, and shared packages)
 * - Vitest sets `VITEST` / `VITEST_WORKER_ID` (not used here)
 * - `NODE_ENV=test` (Jest sets this too)
 *
 * Then `createLogger` registers only this in-memory interceptor — not the
 * real console, and not extra sinks. Tests assert with `toHaveLogged`.
 * `enableLogging()` is the opt-in to also print, when debugging a failure.
 *
 * If those worker flags are set in a production-like process, we throw.
 * Swallowing production logs would hide outages.
 */
export const isRunningUnderTest = (): boolean =>
  process.env.JEST_WORKER_ID != null ||
  process.env.VITEST != null ||
  process.env.VITEST_WORKER_ID != null ||
  process.env.BUN_TEST != null ||
  process.env.NODE_ENV === 'test';

const isProductionLike = (): boolean => {
  const rnDev = (globalThis as { __DEV__?: boolean }).__DEV__;
  return process.env.NODE_ENV === 'production' || rnDev === false;
};

export const assertTestLogInterceptorAllowed = (): void => {
  if (!isRunningUnderTest()) return;
  if (!isProductionLike()) return;
  throw new Error(
    '@thymeapp/logging: refusing to intercept logs: this process looks like a test worker (JEST_WORKER_ID, VITEST, BUN_TEST, or NODE_ENV=test) but also production-like (NODE_ENV=production or React Native __DEV__ === false).',
  );
};

const records: LogRecord[] = [];
let printToRealConsole = false;

export const interceptedLogRecords = (): readonly LogRecord[] => records;

export const logRecordText = (record: LogRecord): string =>
  record.message.map(part => (typeof part === 'string' ? part : JSON.stringify(part))).join('');

/**
 * In-memory sink for unit tests. Records every line for `toHaveLogged`.
 * Forwards to the real console only after `enableLogging()`.
 */
export const unitTestLogSink =
  (realConsole?: Sink): Sink =>
  record => {
    records.push(record);
    if (printToRealConsole) realConsole?.(record);
  };

export const setUnitTestLogPrinting = (enabled: boolean): void => {
  printToRealConsole = enabled;
};

export const clearInterceptedLogs = (): void => {
  records.length = 0;
};

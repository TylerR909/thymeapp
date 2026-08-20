import { isLogLevel, type LogLevel } from '@logtape/logtape';

/** `warn` is accepted as LogTape's `warning`. Invalid strings are ignored. */
export const tryParseLogLevel = (value: string | undefined): LogLevel | undefined => {
  if (value == null || value.trim() === '') return undefined;
  const lower = value.trim().toLowerCase();
  const mapped = lower === 'warn' ? 'warning' : lower;
  return isLogLevel(mapped) ? mapped : undefined;
};

export const defaultLowestLevel = (isDev?: boolean): LogLevel => (isDev === true ? 'debug' : 'info');

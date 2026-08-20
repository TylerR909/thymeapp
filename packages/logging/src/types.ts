import type { LogLevelName } from './levels';

export type LoggerType = 'pretty' | 'json' | 'hidden';

export type CreateLoggerOptions = {
  name: string;
  minLevel?: LogLevelName;
  type?: LoggerType;
  isDev?: boolean;
  maskKeys?: readonly string[];
};

export type AppLogger = {
  silly(message?: unknown, ...args: unknown[]): void;
  trace(message?: unknown, ...args: unknown[]): void;
  debug(message?: unknown, ...args: unknown[]): void;
  info(message?: unknown, ...args: unknown[]): void;
  warn(message?: unknown, ...args: unknown[]): void;
  error(message?: unknown, ...args: unknown[]): void;
  fatal(message?: unknown, ...args: unknown[]): void;
};

export const LOG_LEVELS = ['SILLY', 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'] as const;

export type LogLevelName = (typeof LOG_LEVELS)[number];

const LEVEL_SET = new Set<string>(LOG_LEVELS);

export const isLogLevelName = (value: string): value is LogLevelName => LEVEL_SET.has(value);

/** Runtime check for env strings. Invalid values are ignored. */
export const parseLogLevel = (value: string | undefined): LogLevelName | undefined => {
  if (value == null || value.trim() === '') return undefined;
  const upper = value.trim().toUpperCase();
  return isLogLevelName(upper) ? upper : undefined;
};

export const defaultMinLevel = (isDev?: boolean): LogLevelName => (isDev === true ? 'DEBUG' : 'INFO');

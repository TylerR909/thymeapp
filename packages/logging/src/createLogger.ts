import { Logger } from 'tslog';
import { defaultMinLevel } from './levels';
import { DEFAULT_MASK_KEYS } from './mask';
import type { AppLogger, CreateLoggerOptions } from './types';

export type { AppLogger, CreateLoggerOptions, LoggerType } from './types';

export const createLogger = (options: CreateLoggerOptions): AppLogger => {
  const minLevel = options.minLevel ?? defaultMinLevel(options.isDev);
  return new Logger({
    name: options.name,
    minLevel,
    type: options.type,
    mask: {
      keys: [...DEFAULT_MASK_KEYS, ...(options.maskKeys ?? [])],
      caseInsensitive: true,
    },
  });
};

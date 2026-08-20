import { defaultMinLevel, type LogLevelName } from './levels';
import type { AppLogger, CreateLoggerOptions } from './types';

export type { AppLogger, CreateLoggerOptions, LoggerType } from './types';

const ORDER: LogLevelName[] = ['SILLY', 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];

/**
 * tslog's `react-native` export statically imports `node:module`. Metro cannot
 * bundle that. Native uses console until tslog ships a real RN entry.
 */
export const createLogger = (options: CreateLoggerOptions): AppLogger => {
  const min = options.minLevel ?? defaultMinLevel(options.isDev);
  const minIdx = ORDER.indexOf(min);
  const emit = (level: LogLevelName, fn: 'debug' | 'info' | 'warn' | 'error', args: unknown[]) => {
    if (ORDER.indexOf(level) < minIdx) return;
    console[fn](`[${options.name}]`, ...args);
  };
  return {
    silly: (...args) => {
      emit('SILLY', 'debug', args);
    },
    trace: (...args) => {
      emit('TRACE', 'debug', args);
    },
    debug: (...args) => {
      emit('DEBUG', 'debug', args);
    },
    info: (...args) => {
      emit('INFO', 'info', args);
    },
    warn: (...args) => {
      emit('WARN', 'warn', args);
    },
    error: (...args) => {
      emit('ERROR', 'error', args);
    },
    fatal: (...args) => {
      emit('FATAL', 'error', args);
    },
  };
};

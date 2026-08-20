import {
  configureSync,
  getAnsiColorFormatter,
  getConsoleSink,
  getJsonLinesFormatter,
  resetSync,
  type LogLevel,
  type Sink,
} from '@logtape/logtape';

export const APP_CATEGORY = 'thymeapp';

/** `devtools` is `%c` (Chrome). `ansi` is for Metro / terminals. */
export type ConsoleStyle = 'devtools' | 'ansi' | 'json';

export type ConfigureAppLoggingOptions = {
  lowestLevel?: LogLevel;
  consoleStyle?: ConsoleStyle;
  sinks?: Record<string, Sink>;
};

const consoleSinkOptions = (style: ConsoleStyle) => {
  if (style === 'json') return { formatter: getJsonLinesFormatter() };
  if (style === 'devtools') return undefined;
  return {
    formatter: getAnsiColorFormatter({ timestamp: 'time' }),
    // RN prefixes console.debug with "DEBUG"; send pretty lines through log().
    levelMap: {
      trace: 'log',
      debug: 'log',
      info: 'log',
      warning: 'warn',
      error: 'error',
      fatal: 'error',
    },
  } as const;
};

/**
 * Console sink plus optional extra sinks (file, HTTP). Apps own those extras.
 * `resetSync` so Metro/Vite HMR can re-run module init.
 */
export const configureAppLogging = (options: ConfigureAppLoggingOptions = {}): void => {
  const style = options.consoleStyle ?? 'ansi';
  const sinks = {
    console: getConsoleSink(consoleSinkOptions(style)),
    ...options.sinks,
  };
  resetSync();
  configureSync({
    sinks,
    loggers: [
      {
        category: APP_CATEGORY,
        sinks: Object.keys(sinks),
        lowestLevel: options.lowestLevel ?? 'info',
      },
      { category: 'logtape', sinks: ['console'], lowestLevel: 'error' },
    ],
  });
};

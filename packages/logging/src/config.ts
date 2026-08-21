import {
  configureSync,
  getAnsiColorFormatter,
  getConsoleSink,
  getJsonLinesFormatter,
  getLogger,
  resetSync,
  type LogLevel,
  type Logger,
  type Sink,
} from '@logtape/logtape';
import { DEFAULT_REDACT_FIELDS, redactByField } from '@logtape/redaction';
import {
  assertTestLogInterceptorAllowed,
  clearInterceptedLogs,
  isRunningUnderTest,
  setUnitTestLogPrinting,
  unitTestLogSink,
} from './unitTestLogs';

export const APP_CATEGORY = 'thymeapp';

/** `devtools` is `%c` (Chrome). `ansi` is for Metro / terminals. */
export type ConsoleStyle = 'devtools' | 'ansi' | 'json';

export type CreateLoggerOptions = {
  name: string;
  lowestLevel?: LogLevel;
  consoleStyle?: ConsoleStyle;
  sinks?: Record<string, Sink>;
};

const FIELD_PATTERNS = [
  ...DEFAULT_REDACT_FIELDS,
  /access[_-]?token/i,
  /refresh[_-]?token/i,
  /authorization/i,
  /api[_-]?key/i,
  /cookie/i,
];

const redact = (sink: Sink): Sink => redactByField(sink, { fieldPatterns: FIELD_PATTERNS });

const consoleSinkOptions = (style: ConsoleStyle) => {
  if (style === 'json') return { formatter: getJsonLinesFormatter() };
  if (style === 'devtools') return undefined;
  return {
    formatter: getAnsiColorFormatter({ timestamp: 'time' }),
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

let configured = false;

/**
 * Process-wide configure on the first call; later calls only return
 * `getLogger(['thymeapp', name])`. Extra `sinks` apply only on that first call.
 *
 * Unit-test workers (Jest `JEST_WORKER_ID`, `NODE_ENV=test`) never get the
 * real console or extra file/HTTP sinks.
 * Logs go to an in-memory interceptor for `toHaveLogged`. That interceptor
 * wraps the console sink so `enableLogging()` can print without reconfiguring.
 * Test-worker flags plus `NODE_ENV=production` or RN `__DEV__ === false` throw.
 */
export const createLogger = (options: CreateLoggerOptions): Logger => {
  assertTestLogInterceptorAllowed();
  if (!configured) {
    const underTest = isRunningUnderTest();
    const console = getConsoleSink(consoleSinkOptions(options.consoleStyle ?? 'ansi'));
    const sinks: Record<string, Sink> = {
      console: redact(underTest ? unitTestLogSink(console) : console),
    };
    if (!underTest) {
      for (const [id, sink] of Object.entries(options.sinks ?? {})) {
        sinks[id] = redact(sink);
      }
    }
    configureSync({
      reset: true,
      sinks,
      loggers: [
        {
          category: APP_CATEGORY,
          sinks: Object.keys(sinks),
          lowestLevel: options.lowestLevel ?? 'info',
        },
        { category: ['logtape', 'meta'], sinks: ['console'], lowestLevel: 'error' },
      ],
    });
    configured = true;
  }
  return getLogger([APP_CATEGORY, options.name]);
};

/** For tests. Production code should not need this. */
export const resetLogging = (): void => {
  configured = false;
  clearInterceptedLogs();
  setUnitTestLogPrinting(false);
  resetSync();
};

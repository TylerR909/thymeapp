import { APP_CATEGORY, configureAppLogging, defaultLowestLevel, getLogger, tryParseLogLevel } from '@thymeapp/logging';

const isProd = process.env.NODE_ENV === 'production';
const format = process.env.LOG_FORMAT;
const json = format === 'json' || (format !== 'pretty' && format !== 'text' && isProd);

configureAppLogging({
  lowestLevel: tryParseLogLevel(process.env.LOG_LEVEL) ?? defaultLowestLevel(!isProd),
  consoleStyle: json ? 'json' : 'ansi',
});

export const log = getLogger([APP_CATEGORY, 'server']);

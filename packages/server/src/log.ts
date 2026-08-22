import { createLogger, defaultLowestLevel, tryParseLogLevel } from '@thymeapp/logging';

const isProd = process.env.NODE_ENV === 'production';
const format = process.env.LOG_FORMAT;
const json = format === 'json' || (format !== 'pretty' && format !== 'text' && isProd);

export const log = createLogger({
  name: 'server',
  lowestLevel: tryParseLogLevel(process.env.LOG_LEVEL) ?? defaultLowestLevel(!isProd),
  consoleStyle: json ? 'json' : 'ansi',
});

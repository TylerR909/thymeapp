import { createLogger, parseLogLevel } from '@thymeapp/logging';

const isProd = process.env.NODE_ENV === 'production';

const resolveType = (): 'pretty' | 'json' => {
  const format = process.env.LOG_FORMAT;
  if (format === 'json') return 'json';
  if (format === 'pretty' || format === 'text') return 'pretty';
  return isProd ? 'json' : 'pretty';
};

export const log = createLogger({
  name: 'server',
  isDev: !isProd,
  minLevel: parseLogLevel(process.env.LOG_LEVEL) ?? parseLogLevel(process.env.TSLOG_LEVEL),
  type: resolveType(),
});

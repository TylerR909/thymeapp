import { createLogger, defaultLowestLevel } from '@thymeapp/logging';

export const log = createLogger({
  name: 'mobile',
  lowestLevel: defaultLowestLevel(__DEV__),
  consoleStyle: 'ansi',
});

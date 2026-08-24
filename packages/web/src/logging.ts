import { createLogger, defaultLowestLevel } from '@thymeapp/logging';

export const log = createLogger({
  name: 'web',
  lowestLevel: defaultLowestLevel(import.meta.env.DEV),
  consoleStyle: 'devtools',
});

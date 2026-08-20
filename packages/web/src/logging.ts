import { APP_CATEGORY, configureAppLogging, defaultLowestLevel, getLogger } from '@thymeapp/logging';

configureAppLogging({
  lowestLevel: defaultLowestLevel(import.meta.env.DEV),
  consoleStyle: 'devtools',
});

export const log = getLogger([APP_CATEGORY, 'web']);

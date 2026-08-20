import { APP_CATEGORY, configureAppLogging, defaultLowestLevel, getLogger } from '@thymeapp/logging';

configureAppLogging({
  lowestLevel: defaultLowestLevel(__DEV__),
  consoleStyle: 'ansi',
});

/** Console sink for now. File rotation + upload are extra sinks later. */
export const log = getLogger([APP_CATEGORY, 'mobile']);

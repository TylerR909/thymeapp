import { createLogger } from '@thymeapp/logging';

/** Stdout only for now (Metro / Xcode). Disk + remote queue come later. */
export const log = createLogger({
  name: 'mobile',
  isDev: __DEV__,
});

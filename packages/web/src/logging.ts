import { createLogger } from '@thymeapp/logging';

/** Devtools console. Remote upload is a later attachTransport. */
export const log = createLogger({
  name: 'web',
  isDev: import.meta.env.DEV,
});

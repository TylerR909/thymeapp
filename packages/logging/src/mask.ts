/** Keys redacted by default. Add more per-app; do not log RLS-private fields at all. */
export const DEFAULT_MASK_KEYS = [
  'password',
  'token',
  'accessToken',
  'refreshToken',
  'authorization',
  'apiKey',
  'secret',
  'cookie',
] as const;

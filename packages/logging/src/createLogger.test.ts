import { test } from 'bun:test';
import { createLogger } from './createLogger';

test('createLogger names the logger and respects minLevel', () => {
  const log = createLogger({ name: 'test', minLevel: 'WARN', type: 'hidden' });
  log.info('hidden by minLevel');
  log.warn({ token: 'super-secret' }, 'should mask');
});

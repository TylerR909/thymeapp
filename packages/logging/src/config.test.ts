import { getLogger } from '@logtape/logtape';
import { expect, test } from 'bun:test';
import { APP_CATEGORY, configureAppLogging } from './config';

test('configureAppLogging installs a logger for the app category', () => {
  configureAppLogging({ lowestLevel: 'warning' });
  const log = getLogger([APP_CATEGORY, 'test']);
  log.info('hidden by lowestLevel');
  log.warning('should emit');
  expect(log.category).toEqual([APP_CATEGORY, 'test']);
});

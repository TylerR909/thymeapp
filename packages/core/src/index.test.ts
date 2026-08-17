import { expect, test } from 'bun:test';
import { appName } from './index';

test('exports the product name', () => {
  expect(appName).toBe('ThymeApp');
});

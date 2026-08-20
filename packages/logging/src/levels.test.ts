import { expect, test } from 'bun:test';
import { defaultMinLevel, parseLogLevel } from './levels';

test('parseLogLevel accepts names case-insensitively', () => {
  expect(parseLogLevel('debug')).toBe('DEBUG');
  expect(parseLogLevel('WARN')).toBe('WARN');
  expect(parseLogLevel('nope')).toBeUndefined();
  expect(parseLogLevel(undefined)).toBeUndefined();
});

test('defaultMinLevel is DEBUG only when isDev is true', () => {
  expect(defaultMinLevel(true)).toBe('DEBUG');
  expect(defaultMinLevel(false)).toBe('INFO');
  expect(defaultMinLevel()).toBe('INFO');
});

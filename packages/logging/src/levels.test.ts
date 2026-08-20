import { expect, test } from 'bun:test';
import { defaultLowestLevel, tryParseLogLevel } from './levels';

test('tryParseLogLevel accepts names case-insensitively', () => {
  expect(tryParseLogLevel('debug')).toBe('debug');
  expect(tryParseLogLevel('WARN')).toBe('warning');
  expect(tryParseLogLevel('warning')).toBe('warning');
  expect(tryParseLogLevel('nope')).toBeUndefined();
  expect(tryParseLogLevel(undefined)).toBeUndefined();
});

test('defaultLowestLevel is debug only when isDev is true', () => {
  expect(defaultLowestLevel(true)).toBe('debug');
  expect(defaultLowestLevel(false)).toBe('info');
  expect(defaultLowestLevel()).toBe('info');
});

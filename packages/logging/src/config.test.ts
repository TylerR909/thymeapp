import type { Sink } from '@logtape/logtape';
import { createLogger } from './config';
import { enableLogging, hasLogged, toHaveLogged } from './testing';
import { isRunningUnderTest } from './unitTestLogs';

test('Jest is detected via JEST_WORKER_ID so logs are intercepted', () => {
  expect(process.env.JEST_WORKER_ID).toBeDefined();
  expect(process.env.NODE_ENV).toBe('test');
  expect(isRunningUnderTest()).toBe(true);
});

test('createLogger returns a category logger and intercepts records in tests', () => {
  const log = createLogger({ name: 'test', lowestLevel: 'warning' });
  log.info('hidden by lowestLevel');
  log.warning('visible to matcher only');
  expect(log.category).toEqual(['thymeapp', 'test']);
  expect(hasLogged('hidden by lowestLevel')).toBe(false);
  expect().toHaveLogged('visible to matcher only');
});

test('does not register extra sinks in a test worker', () => {
  let extraCalls = 0;
  const extra: Sink = () => {
    extraCalls += 1;
  };
  const log = createLogger({ name: 'test', sinks: { extra } });
  log.info('hello extra');
  expect(extraCalls).toBe(0);
  expect().toHaveLogged('hello extra');
});

test('toHaveLogged failure lists received logs', () => {
  const log = createLogger({ name: 'test' });
  log.info('how now brown cow');
  log.info('quick brown fox jumps over the lazy dog');
  log.info('goodbye, world');
  const result = toHaveLogged(log, 'hello world');
  expect(result.pass).toBe(false);
  expect(result.message()).toBe(
    [
      'Message "hello world" not logged. Received logs:',
      '- how now brown cow',
      '- quick brown fox jumps over the lazy dog',
      '- goodbye, world',
    ].join('\n'),
  );
});

test('toHaveLogged failure says (none) when nothing was logged', () => {
  const result = toHaveLogged(undefined, 'hello world');
  expect(result.pass).toBe(false);
  expect(result.message()).toBe('Message "hello world" not logged. Received logs:\n(none)');
});

test('enableLogging still records and prints', () => {
  enableLogging();
  const log = createLogger({ name: 'test' });
  log.info('printed and recorded');
  expect().toHaveLogged('printed and recorded');
});

test('refuses to intercept logs when React Native __DEV__ is false', () => {
  const g = globalThis as { __DEV__?: boolean };
  const previous = g.__DEV__;
  g.__DEV__ = false;
  try {
    expect(() => createLogger({ name: 'x' })).toThrow(/refusing to intercept logs/);
  } finally {
    g.__DEV__ = previous;
  }
});

test('refuses to intercept logs when a test worker is NODE_ENV=production', () => {
  const previousNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  try {
    expect(() => createLogger({ name: 'x' })).toThrow(/refusing to intercept logs/);
  } finally {
    process.env.NODE_ENV = previousNodeEnv;
  }
});

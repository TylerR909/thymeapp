/**
 * Helpers for asserting on logs in unit tests. Import from tests, not app code.
 *
 * `test/setupTests.ts` registers `toHaveLogged` on Jest's `expect` and resets
 * intercepted records after each test. You do not `expect.extend` in test files.
 *
 * Jest (`JEST_WORKER_ID`) is detected by `createLogger`. In those workers it
 * does not attach the real console or extra file/HTTP sinks — those would spam
 * the reporter or write to disk. Records are kept in memory:
 *
 *   test('logs the decision', () => {
 *     render(<Places />);
 *     expect().toHaveLogged('chose home');
 *   });
 *
 * Do not mock `Logger`. Assert on what was logged. Passing a logger to
 * `expect(log)` is optional and ignored; intercept is process-wide.
 *
 * `enableLogging()` forwards intercepted records to the real console for the
 * rest of that test (or suite, if you call it in `beforeAll`). Use it when
 * debugging a failure, not as the assertion.
 *
 * `createLogger` throws if those test-worker flags are set in a production-like
 * process (`NODE_ENV=production` or React Native `__DEV__ === false`).
 */
import { resetLogging } from './config';
import { interceptedLogRecords, logRecordText, setUnitTestLogPrinting } from './unitTestLogs';

export { resetLogging };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- Jest matcher augmentation
  namespace jest {
    interface Expect {
      (actual?: unknown): JestMatchers<unknown>;
    }
    interface Matchers<R> {
      toHaveLogged(expected: string): R;
    }
  }
}

export const enableLogging = (): void => {
  setUnitTestLogPrinting(true);
};

export const loggedMessages = (): string[] => interceptedLogRecords().map(logRecordText);

export const hasLogged = (expected: string): boolean => loggedMessages().some(message => message.includes(expected));

const receivedLogsList = (actual: readonly string[]): string => {
  const lines = actual.length === 0 ? ['(none)'] : actual.map(line => `- ${line}`);
  return `Received logs:\n${lines.join('\n')}`;
};

/** `expect().toHaveLogged('msg')` — the value passed to `expect` is ignored. */
export const toHaveLogged = (_received: unknown, expected: string) => {
  const pass = hasLogged(expected);
  const actual = loggedMessages();
  return {
    pass,
    message: () =>
      pass ?
        `Message ${JSON.stringify(expected)} was logged. ${receivedLogsList(actual)}`
      : `Message ${JSON.stringify(expected)} not logged. ${receivedLogsList(actual)}`,
  };
};

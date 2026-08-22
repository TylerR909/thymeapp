const defaults = require('../../test/jest.defaults.cjs');

/** @type {import('jest').Config} */
module.exports = {
  ...defaults,
  displayName: { name: 'web', color: 'cyan' },
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/packages/web/**/*.test.ts',
    '<rootDir>/packages/web/**/*.test.tsx',
  ],
};

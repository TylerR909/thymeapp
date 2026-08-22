const defaults = require('../../test/jest.defaults.cjs');

/** @type {import('jest').Config} */
module.exports = {
  ...defaults,
  displayName: { name: 'logging', color: 'white' },
  testMatch: ['<rootDir>/packages/logging/**/*.test.ts'],
};

const defaults = require('../../test/jest.defaults.cjs');

/** @type {import('jest').Config} */
module.exports = {
  ...defaults,
  displayName: 'logging',
  testMatch: ['<rootDir>/packages/logging/**/*.test.ts'],
};

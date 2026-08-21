const defaults = require('../../test/jest.defaults.cjs');

/** @type {import('jest').Config} */
module.exports = {
  ...defaults,
  displayName: 'server',
  testMatch: ['<rootDir>/packages/server/**/*.test.ts'],
};

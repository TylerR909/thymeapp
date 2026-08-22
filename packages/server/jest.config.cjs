const defaults = require('../../test/jest.defaults.cjs');

/** @type {import('jest').Config} */
module.exports = {
  ...defaults,
  displayName: { name: 'server', color: 'yellow' },
  testMatch: ['<rootDir>/packages/server/**/*.test.ts'],
};

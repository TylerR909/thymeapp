const defaults = require('../../test/jest.defaults.cjs');

/** @type {import('jest').Config} */
module.exports = {
  ...defaults,
  displayName: 'core',
  testMatch: ['<rootDir>/packages/core/**/*.test.ts'],
};

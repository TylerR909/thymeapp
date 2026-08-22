const path = require('node:path');

const repoRoot = path.join(__dirname, '..');

/**
 * Shared Jest defaults for everything except mobile.
 * Mobile uses `jest-expo` + `babel-preset-expo` and does not load this file.
 *
 * `testEnvironment: 'node'` is Jest's name for the non-DOM environment
 * (web overrides to `jsdom`). Tests still run through `bun run test`.
 *
 * @type {import('jest').Config}
 */
module.exports = {
  rootDir: repoRoot,
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/test/textEncoderPolyfill.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: { syntax: 'typescript', tsx: true },
          transform: { react: { runtime: 'automatic' } },
        },
        module: { type: 'commonjs' },
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!(@thymeapp|temporal-polyfill|temporal-spec|temporal-utils)/)'],
};

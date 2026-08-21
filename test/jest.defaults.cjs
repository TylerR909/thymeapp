const path = require('node:path');

const repoRoot = path.join(__dirname, '..');

/**
 * Shared Jest project defaults for packages that are not mobile.
 *
 * `testEnvironment: 'node'` is Jest's name for the non-DOM environment
 * (vs `jsdom` on web, `jest-expo` on mobile). Tests still run through
 * `bun run test`. `node:path` is the Node builtin specifier; Bun implements it.
 *
 * @type {import('jest').Config}
 */
module.exports = {
  rootDir: repoRoot,
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/test/textEncoderPolyfill.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: false,
        tsconfig: {
          module: 'commonjs',
          esModuleInterop: true,
          isolatedModules: true,
          strict: true,
          skipLibCheck: true,
          jsx: 'react-jsx',
          target: 'ES2022',
        },
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!(@thymeapp)/)'],
};

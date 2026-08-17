/** @type {import('jest').Config} */
export default {
  projects: [
    {
      displayName: 'mobile',
      preset: 'jest-expo',
      rootDir: 'packages/mobile',
      testMatch: ['<rootDir>/**/*.test.ts?(x)'],
    },
    {
      displayName: 'web',
      rootDir: 'packages/web',
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
      transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: { isolatedModules: true, esModuleInterop: true, rootDir: '.' } }] },
    },
    {
      displayName: 'core',
      rootDir: 'packages/core',
      testEnvironment: 'node',
      transform: { '^.+\\.ts$': ['ts-jest', { tsconfig: { isolatedModules: true, esModuleInterop: true, rootDir: '.' } }] },
    },
  ],
};

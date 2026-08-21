/** @type {import('jest').Config} */
module.exports = {
  passWithNoTests: true,
  projects: [
    '<rootDir>/packages/core',
    '<rootDir>/packages/logging',
    '<rootDir>/packages/server',
    '<rootDir>/packages/web',
    '<rootDir>/packages/mobile',
  ],
};

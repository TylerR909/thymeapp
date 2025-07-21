// https://docs.expo.dev/guides/using-eslint/
import { globalIgnores } from 'eslint/config';
import rootConfig from '../../eslint.config.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  globalIgnores([
    '**/metro.config.cjs', // uses require for Expo so just ignore it altogether
    '**/drizzle/**', // generated files
  ]),
  ...rootConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Add any mobile-specific overrides here
      'react-native/no-inline-styles': 'off', // Since this is common in RN development
    },
  },
];

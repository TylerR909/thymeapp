import { defineConfig } from 'eslint/config';
import { reactConfig, reactNativeConfig } from './eslint.react.js';
import { shared } from './eslint.shared.js';

export default defineConfig(
  shared,
  {
    ...reactConfig,
    files: ['packages/mobile/**/*.{jsx,tsx}', 'packages/web/**/*.{jsx,tsx}'],
  },
  {
    ...reactNativeConfig,
    files: ['packages/mobile/**/*.{js,jsx,ts,tsx}'],
  },
);

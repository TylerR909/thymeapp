import { fixupPluginRules } from '@eslint/compat';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from './.prettierrc.js';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig(
  {
    // Files that must remain CommonJS for tooling compatibility. Not sure why globalIgnores in packages/mobile isn't working.
    name: 'commonjs-ignores',
    ignores: [
      '**/metro.config.cjs', // uses require for Expo so just ignore it altogether
      '**/packages/mobile/drizzle/**', // generated file
    ],
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  { languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } } },
  { name: 'globals', languageOptions: { globals: { ...globals.browser, ...globals.es2021 } } },
  // This ensures ESLint runs Prettier as formatter
  { name: 'prettier', plugins: { prettier }, rules: { 'prettier/prettier': ['error', prettierConfig] } },
  // Contains all of recommended, recommended-type-checked, and strict, along with additional strict rules that require type information.
  tseslint.configs.strictTypeChecked,
  {
    name: 'typescript-custom-config',
    rules: {
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/prefer-find': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'warn',
    },
  },
  {
    name: 'react',
    // files: ['**/packages/mobile/**/*.{js,jsx,ts,tsx}', '**/packages/web/**/*.{js,jsx,ts,tsx}'],
    files: ['**/*.{jsx,tsx}'],
    plugins: { react: fixupPluginRules(react), 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules, // disables `react/jsx-uses-react` and `react/react-in-jsx-scope` per https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports
      ...reactHooks.configs['recommended-latest'].rules,
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-pascal-case': ['error', { allowNamespace: true }],
      'react/jsx-props-no-multi-spaces': 'error',
      'react/jsx-props-no-spread-multi': 'error',
      'react/no-array-index-key': 'error', // index is almost always wrong. Find something more unique. Maybe even prefer Math.random() over index.
      'react/no-deprecated': 'error',
      'react/no-object-type-as-default-prop': 'error',
      'react/self-closing-comp': 'error',
    },
  },
  {
    name: 'react-native',
    files: ['**/packages/mobile/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      'react-native': fixupPluginRules(reactNative),
    },
    rules: {
      'react-native/no-unused-styles': 'error',
      'react-native/no-inline-styles': 'off', // Disabled as per mobile package preference
      'no-unused-vars': 'off', // tseslint will pick this up
    },
  },
);

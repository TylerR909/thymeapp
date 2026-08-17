import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from './.prettierrc.js';

export const repoRoot = dirname(fileURLToPath(import.meta.url));

export const shared = defineConfig(
  {
    ignores: [
      '**/metro.config.cjs',
      '**/drizzle/**',
      '**/babel.config.js',
      '**/*.config.js',
      'eslint.shared.js',
      'eslint.react.js',
      '.prettierrc.js',
      '**/dist/**',
      '**/.expo/**',
      '**/expo-env.d.ts',
      'scripts/**',
    ],
  },
  { languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: repoRoot } } },
  { name: 'globals', languageOptions: { globals: { ...globals.es2021 } } },
  { name: 'prettier', plugins: { prettier }, rules: { 'prettier/prettier': ['error', prettierConfig] } },
  tseslint.configs.strictTypeChecked,
  {
    name: 'style',
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
);

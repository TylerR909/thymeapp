import { defineConfig } from '@lingui/cli';
import { formatter } from '@lingui/format-po';

/**
 * Mobile catalogs only. Web Lingui waits for the UI-foundations pass.
 * `pseudo-en` is Lingui's accented/padded English for spotting hard-coded strings.
 */
export default defineConfig({
  sourceLocale: 'en',
  locales: ['en', 'pseudo-en'],
  pseudoLocale: { locale: 'pseudo-en' },
  fallbackLocales: {
    'pseudo-en': 'en',
    default: 'en',
  },
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['src'],
    },
  ],
  format: formatter({ lineNumbers: false }),
});

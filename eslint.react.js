import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';

export const reactConfig = {
  name: 'react',
  files: ['**/*.{jsx,tsx}'],
  plugins: { react, 'react-hooks': reactHooks },
  settings: { react: { version: 'detect' } },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
    ...reactHooks.configs['recommended-latest'].rules,
    'react/jsx-no-leaked-render': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': ['error', { allowNamespace: true }],
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-props-no-spread-multi': 'error',
    'react/no-array-index-key': 'error',
    'react/no-deprecated': 'error',
    'react/no-object-type-as-default-prop': 'error',
    'react/self-closing-comp': 'error',
  },
};

export const reactNativeConfig = {
  name: 'react-native',
  files: ['**/*.{js,jsx,ts,tsx}'],
  plugins: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    'react-native': reactNative,
  },
  rules: {
    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'off',
    'no-unused-vars': 'off',
  },
};

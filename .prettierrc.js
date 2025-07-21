/** @type {import('prettier').Config} */
const config = {
  printWidth: 120,
  singleQuote: true,
  experimentalTernaries: true,
  objectWrap: 'preserve',
  arrowParens: 'avoid',
  plugins: ['prettier-plugin-organize-imports'],
};

export default config;

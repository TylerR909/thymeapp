/** @type {import('lint-staged').Configuration} */
export default {
  '*': ['bun run lint:fix'],
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
};

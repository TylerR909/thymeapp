// this file exists per expo-sqlite documentation https://orm.drizzle.team/docs/connect-expo-sqlite
/** @type {import('@babel/core').ConfigFunction} */
export default function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Lingui macros must expand before babel-preset-expo's React Compiler.
    plugins: ['@lingui/babel-plugin-lingui-macro', ['inline-import', { extensions: ['.sql'] }]],
  };
}

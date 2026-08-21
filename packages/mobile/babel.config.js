// this file exists per expo-sqlite documentation https://orm.drizzle.team/docs/connect-expo-sqlite
/** @type {import('@babel/core').ConfigFunction} */
export default function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Lingui macros expand in `plugins` (before presets). babel-preset-expo's
    // React Compiler then runs on the expanded source.
    plugins: ['@lingui/babel-plugin-lingui-macro', ['inline-import', { extensions: ['.sql'] }]],
  };
}

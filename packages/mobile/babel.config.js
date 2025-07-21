// this file exists per expo-sqlite documentation https://orm.drizzle.team/docs/connect-expo-sqlite
/** @type {import('@babel/core').ConfigFunction} */
export default function (api) {
  api.cache(true);
  return { presets: ['babel-preset-expo'], plugins: [['inline-import', { extensions: ['.sql'] }]] };
}

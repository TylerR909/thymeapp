const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
const { transformer } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('@lingui/metro-transformer/expo'),
};
config.resolver.sourceExts.push('sql', 'po', 'pot');
// Bundle target is Hermes, not the Bun process that runs Metro.
config.resolver.unstable_conditionNames = ['react-native', 'browser', 'require'];
config.resolver.assetExts.push('wasm');
config.server.enhanceMiddleware = middleware => (req, res, next) => {
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  return middleware(req, res, next);
};

module.exports = config;

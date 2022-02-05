const path = require('path');
const {
  override, useEslintRc, addWebpackResolve, useBabelRc,
} = require('customize-cra');
// const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');

module.exports = override(
  useBabelRc(),
  addWebpackResolve({
    alias: {
      '@': path.resolve('src/'),
    },
  }),
  // addWebpackPlugin(
  //   new UnusedFilesWebpackPlugin({
  //     patterns: ['src/**/*.*']
  //   })
  // )
);

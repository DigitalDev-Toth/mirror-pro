const { resolve } = require('path');
const webpack = require('webpack');

const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const happyThreadPool = HappyPack.ThreadPool({ size: 2 });
const {
  BUNDLE_TASK,
  ENTRY_PATH,
  INCLUDE_JS,
} = process.env;

module.exports = {
  HappyPack: { instance: HappyPack, threadPool: happyThreadPool },
  commonConfig: {
    context: process.cwd(),
    bail: true,
    cache: true,
    stats: 'errors-only',
    resolve: {
      extensions: ['.js', '.scss'],
      modules: [ resolve(__dirname, ENTRY_PATH), 'node_modules' ],
    },
    module: {
      rules: [{
        test: /\.js$/,
        loaders: ['happypack/loader?id=babel-js'],
        include: [resolve(__dirname, `../${INCLUDE_JS}`)],
        exclude: /node_modules/,
      }],
    },
    plugins: [
      new HappyPack({
        id: 'babel-js',
        loaders: ['babel-loader?cacheDirectory'],
        threadPool: happyThreadPool,
        verbose: false,
      }),
      BUNDLE_TASK !== 'dll' && BUNDLE_TASK !== 'wds'
      ? new HtmlWebpackPlugin({
        title: 'Toth - Mirror Pro',
        template: `${ENTRY_PATH}/index.html`,
        filename: 'index.html',
        chunksSortMode: 'dependency',
        inject: false,
      })
      : () => {},
    ],
  },
};

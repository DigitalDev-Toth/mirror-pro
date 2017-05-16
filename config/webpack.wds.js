const { resolve } = require('path');
const webpackMerge = require('webpack-merge');
const { HappyPack, commonConfig } = require('./webpack.common.js');

const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const {
  ENTRY_LIST,
  OUTPUT_PATH,
  OUTPUT_PATH_JS,
  INCLUDE_SCSS,
  INCLUDE_ESLINT,
  INCLUDE_STYLELINT,
  DLL_MANIFEST_PATH,
  WDS_HOSTNAME,
  WDS_PORT,
  WDS_PROXY,
} = process.env;

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: JSON.parse(ENTRY_LIST),
  output: {
    path: resolve(__dirname, `../${OUTPUT_PATH}`),
    publicPath: '/',
    filename: `${OUTPUT_PATH_JS}/[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['happypack/loader?id=scss'],
        include: [resolve(__dirname, `../${INCLUDE_SCSS}`)],
        exclude: /node_modules/,
      }, {
        test: /\.js$/,
        use: ['happypack/loader?id=eslint'],
        enforce: 'pre',
        include: [resolve(__dirname, `../${INCLUDE_ESLINT}`)],
        exclude: /node_modules/,
      }
    ],
  },
  plugins: [
    new DllReferencePlugin({
      context: process.cwd(),
      manifest: require(resolve(__dirname, `../${DLL_MANIFEST_PATH}.vendor.json`)),
    }),
    new HappyPack.instance({
      id: 'scss',
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      threadPool: HappyPack.threadPool,
      verbose: false,
    }),
    new HappyPack.instance({
      id: 'eslint',
      loaders: ['eslint-loader'],
      threadPool: HappyPack.threadPool,
      verbose: false,
    }),
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new StyleLintPlugin({
      context: resolve(__dirname, `../${INCLUDE_STYLELINT}`),
      syntax: 'scss',
    }),
  ],
  devServer: {
    contentBase: resolve(__dirname, `../${OUTPUT_PATH}`),
    publicPath: '/',
    host: WDS_HOSTNAME,
    port: WDS_PORT,
    proxy: { '/': WDS_PROXY },
    hot: true,
    inline: false,
    historyApiFallback: false,
    stats: {
      version: false,
      timings: true,
      hash: false,
      chunks: true,
      chunkModules: false,
      assets: false,
      colors: true,
    },
  },
});

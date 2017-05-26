const { resolve } = require('path');
const webpackMerge = require('webpack-merge');
const { HappyPack, commonConfig } = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

const {
  OUTPUT_PATH,
  OUTPUT_PATH_JS,
  INCLUDE_SCSS,
  DLL_MANIFEST_PATH,
} = process.env;

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: resolve(__dirname, `../${OUTPUT_PATH}`),
    publicPath: '/',
    filename: `${OUTPUT_PATH_JS}/[name].js`,
    sourceMapFilename: `${OUTPUT_PATH_JS}/[file].map`,
    chunkFilename: `${OUTPUT_PATH_JS}/[id].chunk.js`,
    library: 'ac_[name]',
    libraryTarget: 'var',
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ['happypack/loader?id=scss'],
      include: [resolve(__dirname, `../${INCLUDE_SCSS}`)],
      exclude: /node_modules/,
    }],
  },
  plugins: [
    // new DefinePlugin({ 'process.env.NODE_ENV': 'development' }),
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
  ],
});

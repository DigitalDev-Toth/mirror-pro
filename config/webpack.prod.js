const { resolve } = require('path');
const webpackMerge = require('webpack-merge');
const { commonConfig } = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const {
  OUTPUT_PATH,
  OUTPUT_PATH_JS,
  OUTPUT_PATH_CSS,
  INCLUDE_SCSS,
  DLL_MANIFEST_PATH,
  APPLICATION_VERSION,
} = process.env;

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  output: {
    path: resolve(__dirname, `../${OUTPUT_PATH}`),
    publicPath: '/',
    filename: `${OUTPUT_PATH_JS}/[name].[chunkhash].min.js`,
    sourceMapFilename: `${OUTPUT_PATH_JS}/[name].[chunkhash].min.map`,
    chunkFilename: `${OUTPUT_PATH_JS}/[id].[chunkhash].chunk.js`,
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
      }),
      include: [resolve(__dirname, `../${INCLUDE_SCSS}`)],
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.APPLICATION_VERSION': JSON.stringify(APPLICATION_VERSION),
    }),
    new DllReferencePlugin({
      context: process.cwd(),
      manifest: require(resolve(__dirname, `../${DLL_MANIFEST_PATH}.vendor.json`)),
    }),
    new ExtractTextPlugin(`${OUTPUT_PATH_CSS}/[name].[contenthash].min.css`),
    new OptimizeJsPlugin({ sourceMap: false }),
    new UglifyJsPlugin({
      beautify: false,
      sourceMap: true,
      output: { comments: false },
      mangle: { screw_ie8: true },
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false,
      },
    }),
  ],
});

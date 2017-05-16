const { resolve } = require('path');
const webpackMerge = require('webpack-merge');
const { commonConfig } = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const DllPlugin = require('webpack/lib/DllPlugin');
const PrefetchPlugin = require('webpack/lib/PrefetchPlugin');

const {
  ENTRY_NAME,
  OUTPUT_PATH,
  OUTPUT_PATH_JS,
  NODE_ENV,
  DLL_PATH,
} = process.env;

module.exports = webpackMerge(commonConfig, {
  entry: {
    [ENTRY_NAME]: Object.keys(require('../package.json').dependencies),
  },
  output: {
    path: resolve(__dirname, `../${OUTPUT_PATH}`),
    publicPath: '/',
    filename: `${OUTPUT_PATH_JS}/[name].vendor.js`,
    library: '[name]_lib',
  },

  plugins: [
    NODE_ENV
    ? new DefinePlugin({ 'process.env.NODE_ENV': 'production' })
    : () => {},
    new DllPlugin({
      name: '[name]_lib',
      path: resolve(__dirname, `../${DLL_PATH}/`, '[name].vendor.json')
    }),
    new PrefetchPlugin(resolve(__dirname, '../node_modules/react'), 'react'),
    new PrefetchPlugin(resolve(__dirname, '../node_modules/react-dom'), 'react-dom'),
    new PrefetchPlugin(resolve(__dirname, '../node_modules/react-redux'), 'react-redux'),
    new PrefetchPlugin(resolve(__dirname, '../node_modules/redux'), 'redux'),
    new PrefetchPlugin(resolve(__dirname, '../node_modules/lodash'), 'lodash'),
  ],
});

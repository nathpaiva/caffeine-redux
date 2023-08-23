'use strict'

const webpack = require('webpack');
const common = require('./common');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: common.entry,

  output: common.output,

  plugins: [
    new HtmlWebpackPlugin(common.htmlPluginConfig),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
  ],

  module: {
    rules: [
      common.jsLoader,
      common.fileLoader,
    ]
  },

  resolve: common.resolve

}

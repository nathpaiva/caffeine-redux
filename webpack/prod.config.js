'use strict'

const webpack = require('webpack')
const common = require('./common')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: common.entry,

  output: common.output,

  plugins: [
    new HtmlWebpackPlugin(common.htmlPluginConfig),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'proccess.env': {
        'NODE_ENV': '"production"'
      }
    }),
  ],

  module: {
    rules: [
      common.jsLoader,
      common.fileLoader,
      common.urlLoader,
      Object.assign({}, common.cssLoader, {
        use: ExtractTextPlugin.extract({
          fallback: common.cssLoader.use[0],
          use: common.cssLoader.use.slice(1)
        })
      }),
      common.cssLoaderUseable
    ]
  },

  resolve: common.resolve

}

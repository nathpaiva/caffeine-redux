'use strict'

const webpack = require('webpack')
const common = require('./common')

const HtmlPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = {
  devtool: 'source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:2000',
    'webpack/hot/only-dev-server',
    common.entry.main
  ],

  output: Object.assign({}, common.output, {
    filename: '[name].js',
    publicPath: '/'
  }),

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),

    new HtmlPlugin(common.htmlPluginConfig)
  ],

  module: {
    rules: [
      common.jsLoader,
      common.cssLoader,
      common.cssLoaderUseable,
      common.fileLoader,
      common.urlLoader
    ]
  },

  resolve: common.resolve
}

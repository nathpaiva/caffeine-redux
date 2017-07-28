'user strict'

const webpack = require('webpack');
const WebpackDevDerver = require('webpack-dev-server');
const config = require('./webpack/dev.config');

new WebpackDevDerver(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(2000, () => {
  console.log('====================================');
  console.log('Servidor rodando na :2000');
  console.log('====================================');
});

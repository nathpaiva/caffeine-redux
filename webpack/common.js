'use strict'

const { join } = require('path')

const paths = {
  root: join(__dirname, '..'),
  src: join(__dirname, '..', 'public', 'src'),
  dist: join(__dirname, '..', 'public', 'dist')
}

module.exports = {
  paths,

  entry: {
    main: join(paths.src, 'index')
  },

  output: {
    path: paths.dist,
    filename: '[name]-[chunkhash].js'
  },

  htmlPluginConfig: {
    title: 'Caffeine',
    template: join(paths.src, 'html', 'template.html'),
    favicon: join(paths.src, 'images', 'favicon.ico')
  },

  jsLoader: {
    test: /\.js$/,
    include: paths.src,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [['env', { modules: false }], 'stage-0', 'react'],
        plugins: [
          'react-hot-loader/babel',
          ['transform-runtime', {
            helpers: false,
            polyfill: false,
            regenerator: true
          }]
        ]
      }
    }
  },

  cssLoader: {
    test: /\.scss$/,
    include: paths.src,
    exclude: /\.useable\.scss$/,
    use: [
      { loader: "style-loader" },
      { loader: "css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]" },
      { loader: "sass-loader" }]
  },

  cssLoaderUseable: {
    test: /\.useable\.scss$/,
    use: [
      { loader: "style-loader/useable" },
      { loader: "css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]" },
      { loader: "sass-loader" }
    ]
  },

  fileLoader: {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|txt)(\?.*)?$/,
    include: paths.src,
    use: {
      loader: 'file-loader',
      options: {
        name: 'media/[name].[hash:8].[ext]'
      }
    }
  },

  urlLoader: {
    test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
    include: paths.src,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:8].[ext]'
      }
    }
  },

  resolve: {
    alias: {
      src: paths.src,
      components: join(paths.src, 'components'),
      utils: join(paths.src, 'utils')
    }
  }
}

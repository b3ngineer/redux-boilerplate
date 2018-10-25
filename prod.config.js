const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  target: 'web',
  mode: 'production',
  entry: {
    'bundle': './src/index.js',
    'bundle.min': './src/index.js'
  },
  watchOptions: {
    ignored: /node_modules/
  },
  output: {
    filename: '[name].js',
    library: 'terse-redux',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist')
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: true,
          ecma: 8,
          mangle: false
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}

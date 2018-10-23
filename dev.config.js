const path = require('path')
const exec = require('child_process').exec

const color = (colorValue, text) =>
  ['\u001b[', colorValue, 'm', text, '\u001b[0m'].join('')

const green = text => color(32, text)

const red = text => color(31, text)

const italicGray = text => color('90;3', text)

function colorize (text) {
  return text
    .replace(/(✓)/g, green('$1'))
    .replace(/(\d+\s+passing)/g, green('$1'))
    .replace(/(\d+\s+failing)/g, red('$1'))
    .replace(/(\s*at .+)/g, italicGray('$1'))
    .replace(/(\d+ms)/g, italicGray('$1'))
    .replace(/\s(\d+\).+)/, red('$1'))
    .replace(
      'info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.',
      ''
    )
}

function WatchTestRunnerPlugin (options = {}) {
  this.should =
    options.should ||
    function () {
      return true
    }
  this.cmd = options.cmd || 'yarn test'
  var that = this

  const runTest = function (compilation) {
    if (that.should()) {
      exec(that.cmd, function (err, stdout, stderr) {
        process.stdout.write(colorize(`${err ? err + '\n' : ''}${stdout}`))
      })
    }
  }

  this.apply = function (compiler) {
    compiler.hooks.afterEmit.tap('WatchTestRunnerPlugin', runTest)
  }
}

module.exports = {
  target: 'async-node',
  mode: 'development',
  watchOptions: {
    ignored: /node_modules/
  },
  entry: {
    main: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new WatchTestRunnerPlugin({
      cmd: 'jest --notify'
    })
  ],
  resolve: {
    symlinks: false
  }
}

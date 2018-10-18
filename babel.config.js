module.exports = function (api) {
  const env = api.env() // eslint-disable-line
  return {
    presets: [
      [
        '@babel/preset-env'
      ]
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }]
    ]
  }
}

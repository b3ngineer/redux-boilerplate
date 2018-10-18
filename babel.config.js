module.exports = function (api) {
  const env = api.env() // eslint-disable-line
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { node: '8' }
        }
      ],
      [
        '@babel/stage-0',
        {
          decoratorsLegacy: true
        }
      ]
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }]
    ]
  }
}

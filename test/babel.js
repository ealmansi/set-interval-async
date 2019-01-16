require('@babel/polyfill')
require('@babel/register')({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '6'
        }
      }
    ]
  ],
  plugins: ['@babel/plugin-transform-runtime']
})

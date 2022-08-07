const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

module.exports = {
  mode: "production",
  devtool: false,
  entry: './dist/browser/set-interval-async.cjs',
  output: {
    iife: true,
    library: 'SetIntervalAsync',
    filename: 'set-interval-async.iife.js',
    path: path.resolve(__dirname, 'dist', 'browser'),
  },
  module: {
    rules: [
      {
        test: /\.cjs$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: '> 0.4%, not dead',
              }],
            ],
            plugins: [
              '@babel/plugin-transform-modules-commonjs',
              '@babel/transform-runtime',
            ],
          },
        },
      }
    ],
  },
  plugins: [
    new webpack.BannerPlugin(
      fs.readFileSync(
        path.resolve(__dirname, "LICENSE"),
      ).toString(),
    ),
  ],
};

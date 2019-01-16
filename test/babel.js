/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

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

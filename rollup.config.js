import babel from 'rollup-plugin-babel'
import builtins from 'rollup-plugin-node-builtins'
import commonJS from 'rollup-plugin-commonjs'
import fs from 'fs'
import globals from 'rollup-plugin-node-globals'
import minify from 'rollup-plugin-babel-minify'
import path from 'path'
import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'

export default [
  {
    input: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      cjs: {
        file: pkg.main,
      },
      es: {
        file: pkg.module,
      },
      iife: {
        file: pkg.unpkg,
        name: pkg.library,
      }
    }
  },
  ...['dynamic', 'fixed', 'legacy'].map((curr) => {
    return {
      input: path.resolve(__dirname, 'src', `${curr}.js`),
      output: {
        cjs: {
          file: path.resolve(__dirname, curr, `index.js`),
        },
        es: {
          file: path.resolve(__dirname, curr, `index.mjs`),
        }
      }
    }
  })
].reduce(
  (acc, curr) => {
    return acc.concat(
      [
        {
          input: curr.input,
          external: isExternal,
          output: [
            {
              file: curr.output.cjs.file,
              format: 'cjs',
              sourcemap: true
            },
            {
              file: curr.output.es.file,
              format: 'es',
              sourcemap: true
            }
          ],
          plugins: [
            babel({
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      node: '6'
                    }
                  }
                ]
              ],
              runtimeHelpers: true,
              plugins: ['@babel/plugin-transform-runtime']
            })
          ],
          onwarn: onWarning
        },
        ...(curr.output.iife !== undefined ? [{
          input: curr.input,
          output: [
            {
              file: curr.output.iife.file,
              format: 'iife',
              name: curr.output.iife.name,
              sourcemap: true
            }
          ],
          context: 'window',
          plugins: [
            globals(),
            builtins(),
            resolve({
              browser: true,
              preferBuiltins: true
            }),
            commonJS(),
            babel({
              exclude: ['node_modules/**'],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: ['> 0.25%, not dead']
                    }
                  }
                ]
              ],
              runtimeHelpers: true,
              plugins: ['@babel/plugin-transform-runtime']
            }),
            minify({
              comments: false,
              banner: getBanner(),
              bannerNewLine: false,
              sourceMap: true
            })
          ],
          onwarn: onWarning
        }] : [])
      ]
    )
  },
  []
)

function isExternal (candidate) {
  return Object.keys(pkg.dependencies).some(dependency => {
    return candidate.startsWith(dependency)
  })
}

function getBanner () {
  const filePath = path.resolve(__dirname, 'src', 'banner.js')
  return fs.readFileSync(filePath).toString().trim()
}

function onWarning (warning, warn) {
  // https://github.com/Comandeer/rollup-plugin-babel-minify/issues/145
  if (warning.message.includes('transformBundle hook')) {
    return
  }
  warn(warning)
}

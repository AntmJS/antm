/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve, join } = require('path')
const { getBabelOutputPlugin } = require('@rollup/plugin-babel')
const json = require('@rollup/plugin-json')
const typescript = require('@rollup/plugin-typescript')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const cwd = process.cwd()

const config = {
  input: join(cwd, 'src/index.ts'),
  output: [
    {
      file: join(cwd, 'dist/index.js'),
      format: 'cjs',
      sourcemap: true,
    },
    {
      sourcemap: true,
      format: 'esm',
      file: join(cwd, 'dist/index.esm.js'),
    },
  ],
  external: ['@babel/runtime-corejs3'],
  plugins: [
    commonjs({
      include: /\/node_modules\//,
    }),
    nodeResolve({
      customResolveOptions: {
        moduleDirectories: ['node_modules'],
      },
    }),
    json(),
    typescript({
      allowSyntheticDefaultImports: true,
    }),
    getBabelOutputPlugin({
      configFile: resolve(__dirname, '../../babel.config.js'),
    }),
  ],
}

const h5Cfg = Object.assign({}, config, {
  input: join(cwd, 'src/h5.ts'),
  output: [
    {
      file: join(cwd, 'dist/h5.js'),
      format: 'cjs',
      sourcemap: true,
    },
    {
      sourcemap: true,
      format: 'esm',
      file: join(cwd, 'dist/h5.esm.js'),
    },
  ],
})

module.exports = [config, h5Cfg]

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
      exports: 'default',
      sourcemap: true,
    },
    {
      sourcemap: true,
      format: 'esm',
      exports: 'default',
      file: join(cwd, 'dist/index.esm.js'),
    },
  ],
  external: ['@babel/runtime-corejs3', 'react'],
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
      jsx: true,
    }),
    getBabelOutputPlugin({
      configFile: resolve(__dirname, '../../babel.config.js'),
    }),
  ],
}

module.exports = [config]

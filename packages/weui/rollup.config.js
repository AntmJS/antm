/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve, join } = require('path')
const { getBabelOutputPlugin } = require('@rollup/plugin-babel')
const json = require('@rollup/plugin-json')
const image = require('@rollup/plugin-image')
const copy = require('rollup-plugin-copy-watch')
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
  external: ['@babel/runtime-corejs3', 'react', 'react-dom'],
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
      tsconfig: resolve(__dirname, '../../tsconfig.json'),
      module: 'esnext',
    }),
    getBabelOutputPlugin({
      configFile: resolve(__dirname, '../../babel.config.js'),
    }),
    image(),
    copy({
      // the watch option is passed directly to Chokidar, so it can be a file,
      // dir, array or glob(s)
      watch: false,
      targets: [
        {
          src: join(cwd, 'src/style'),
          dest: join(cwd, 'dist'),
        },
      ],
    }),
  ],
}

module.exports = [config]

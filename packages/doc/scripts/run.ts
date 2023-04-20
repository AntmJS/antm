#!/usr/bin/env ts-node --transpileOnly --transpiler ts-node/transpilers/swc
import path from 'path'
// eslint-disable-next-line import/no-named-as-default
import webpack from 'webpack'
import Server from 'webpack-dev-server'
import getBase from '../config/base'
;(async function run() {
  process.env['NODE_ENV'] = 'development'
  const baseConfig = await getBase()

  const devServer = {
    port: baseConfig.devServer.port || 7777,
    historyApiFallback: true,
    open: true,
    hot: true,
    host: '0.0.0.0',
    static: {
      directory: path.join(__dirname, './dist'),
    },
  }

  const devConfig = Object.assign(baseConfig, {
    mode: 'development',
    devtool: 'eval',
    devServer,
  })

  const compiler = webpack(devConfig as any)

  setTimeout(async () => {
    const app = new Server(devServer, compiler)

    await app.start()
  }, 2000)
})()

import path from 'path'
// eslint-disable-next-line import/no-named-as-default
import webpack from 'webpack'
import Server from 'webpack-dev-server'
import getBase from '../config/base'

const devServer = {
  port: 7777,
  historyApiFallback: true,
  open: true,
  hot: true,
  static: {
    directory: path.join(__dirname, './dist'),
  },
}

;(async function run() {
  process.env['NODE_ENV'] = 'development'
  const baseConfig = await getBase()
  const devConfig = Object.assign(baseConfig, {
    mode: 'development',
    devtool: 'eval',
    devServer,
  })

  const compiler = webpack(devConfig as any)
  const app = new Server(devServer, compiler)

  setTimeout(async () => {
    await app.start()
  }, 333)
})()

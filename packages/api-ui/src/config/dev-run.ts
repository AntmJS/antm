import path from 'path'
// eslint-disable-next-line import/no-named-as-default
import webpack from 'webpack'
import Server from 'webpack-dev-server'
import getBase from './webpack.base.config.js'

import getConfig from './getConfig.js'

const antmConfig = getConfig()
const { buildPort } = antmConfig.apiUi || {}

const devServer = {
  port: buildPort || 7878,
  host: 'localhost',
  hot: true,
  open: true,
  static: {
    directory: path.join(__dirname, './dist'),
  },
  proxy: {
    '/mock': {
      target: 'http://localhost:10099',
      changeOrigin: true,
      pathRewrite: {
        '^/mock': '/',
      },
    },
  },
}

export default async function run() {
  process.env['NODE_ENV'] === 'development'
  const baseConfig = await getBase()
  const devConfig = Object.assign(baseConfig, {
    mode: 'development',
    devtool: 'eval',
    devServer,
  })

  const compiler = webpack(devConfig as any)
  const app = new Server(devServer, compiler)

  await app.start()
}

import path from 'path'
// eslint-disable-next-line import/no-named-as-default
import webpack from 'webpack'
import Server from 'webpack-dev-server'
import getBase from './webpack.base.config.js'
import getConfig from './getConfig.js'

const { buildPort } = getConfig()

const devServer = {
  port: buildPort || 7878,
  host: '0.0.0.0',
  hot: true,
  open: true,
  static: {
    directory: path.join(__dirname, './dist'),
  },
}

export default async function run() {
  process.env['NODE_ENV'] === 'development'
  const baseConfig = await getBase()
  const devConfig = Object.assign(baseConfig, {
    mode: 'development',
    // devtool: "eval",
    devServer,
  })
  try {
    const compiler = webpack(devConfig as any)
    const app = new Server(devServer, compiler)

    await app.start()
  } catch (err) {
    console.info(err)
    process.exit(1)
  }
}

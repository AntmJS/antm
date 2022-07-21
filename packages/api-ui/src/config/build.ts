import Webpack, { Stats } from 'webpack'
import log from '../log.js'
import getPro from './webpack.pro.config.js'

export default async function build() {
  process.env['NODE_ENV'] === 'production'
  const Con = await getPro()
  const compile = Webpack(Con as any)

  compile.run((err?: Error | null, stats?: Stats) => {
    if (err) {
      return log.error(err.toString())
    }
    console.info(stats)
  })
}

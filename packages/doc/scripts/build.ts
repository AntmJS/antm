import Webpack from 'webpack'
import { WebpackConfiguration } from 'webpack-dev-server'
import getPro from '../config/base'
;(async function build() {
  process.env['NODE_ENV'] = 'production'
  const Con = await getPro()
  const compile = Webpack(Con as WebpackConfiguration)

  compile.run((stas) => {
    if (stas) console.dir(stas)
  })
})()

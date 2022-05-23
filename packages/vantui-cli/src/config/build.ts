import Webpack from 'webpack'
import getPro from './webpack.pro.config.js'

export default async function build() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  process.env.NODE_ENV === 'production'
  const Con = await getPro()
  const compile = Webpack(Con as any, (err) => {
    if (err) console.info(err)
  })

  compile.run((err) => {
    if (err) console.info(err)
  })
}

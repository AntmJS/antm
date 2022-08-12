/* eslint-disable import/no-named-as-default */
import build from './config/build.js'
import file from './file.js'
import getConfig from './config/getConfig.js'

type Iprops = {
  path: string
}

const antmConfig = getConfig()
const api = antmConfig.api || {}

export default async function Run(props: Iprops) {
  const { path = 'src/actions/types' } = props

  await file({
    path: api['path'] || path,
    watch: false,
  })

  build()
}

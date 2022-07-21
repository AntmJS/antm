/* eslint-disable import/no-named-as-default */
import build from './config/build.js'
import file from './file.js'
import getConfig from './config/getConfig.js'

type Iprops = {
  path: string
}

const antmConfig = getConfig()
const apiUi = antmConfig.apiUi || {}

export default async function Run(props: Iprops) {
  const { path = 'src/actions/types' } = props

  await file({
    path: apiUi['path'] || path,
    watch: false,
  })

  build()
}

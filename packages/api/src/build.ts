/* eslint-disable import/no-named-as-default */
import build from './config/build'
import file from './file'
import getConfig from './config/getConfig'

type Iprops = {
  path: string
}

const apiConfig = getConfig()

export default async function Run(props: Iprops) {
  const { path } = props

  await file({
    path: path || apiConfig['path'] || 'src/actions/types',
    watch: false,
  })

  build()
}

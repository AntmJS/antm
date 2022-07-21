/* eslint-disable import/no-named-as-default */
import build from './config/build.js'
import file from './file.js'

type Iprops = {
  path: string
}

export default async function Run(props: Iprops) {
  const { path = 'src/actions/types' } = props

  await file({
    path,
    watch: false,
  })

  build()
}

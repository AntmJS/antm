/* eslint-disable import/no-named-as-default */
import path_ from 'path'
import nodemon from 'nodemon'
import runDev from './config/dev-run.js'
import log from './log.js'
import file from './file.js'
import getConfig from './config/getConfig.js'

type Iprops = {
  path?: string
  server?: boolean
  mock?: boolean
}

const antmConfig = getConfig()
const apiUi = antmConfig.apiUi || {}

export default async function watch(props: Iprops) {
  const { path = 'src/actions/types', mock, server } = props

  if (mock) {
    nodemon({
      script: path_.join(__dirname, './mock/index.js'),
      watch: ['./data'],
    })
      .on('quit', () => {
        log.error('mock api quit')
        process.exit()
      })
      .on('restart', () => {
        log.success('mock api will restart')
      })
  }

  await file({
    path: apiUi['path'] || path,
    watch: true,
  })

  if (!!server) {
    runDev()
  }
}

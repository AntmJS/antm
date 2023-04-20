/* eslint-disable import/no-named-as-default */
import path_ from 'path'
import * as ora from 'ora'
import nodemon from 'nodemon'
import runDev from './config/dev-run'
import log from './log'
import file from './file'
import getConfig from './config/getConfig'

type Iprops = {
  path?: string
  server?: boolean
  mock?: boolean
  action?: boolean
}

const apiConfig = getConfig()

export default async function watch(props: Iprops) {
  const {
    path = apiConfig['path'] || 'src/actions/types',
    mock,
    server,
    action,
  } = props

  const spinner = ora.default(`请求字段ts文件路径：${path}`)

  spinner.start(
    log.tips(`开始执行
`),
  )

  await file({
    path: path,
    watch: true,
    action: !!action,
  })

  if (!!mock) {
    nodemon({
      script: path_.join(__dirname, './mock/index.js'),
      watch: [path_.join(process.cwd(), './.cache/api-ui-data.json')],
    })
      .on('quit', () => {
        log.error('mock api quit')
        process.exit()
      })
      .on('restart', () => {
        log.success('mock api will restart')
      })
  }

  if (!!server) {
    runDev()
  }

  spinner.succeed(log.success('执行完成'))
}

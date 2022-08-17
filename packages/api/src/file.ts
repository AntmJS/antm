/* eslint-disable import/no-named-as-default */
import path_ from 'path'
import fs from 'fs'
import glob from 'glob'
import * as ora from 'ora'
import * as prettier from 'prettier'
import { watch } from 'chokidar'
import parser from './parser.js'
import log from './log.js'
import getConfig from './config/getConfig.js'
import { createDefaultModel } from './create-action/create.js'
import { getPrettierConfig } from './config/getPrettierConfig.js'

const spinner = ora.default()
const CWD = process.cwd()
const API_UI_DATA_PATH = path_.join(CWD, './.cache/api-ui-data.json')
const antmConfig = getConfig()
const { requestImport, requestFnName, dirPath } = antmConfig?.api?.action || {}
let result: any = {}

if (fs.existsSync(API_UI_DATA_PATH)) {
  result = require(API_UI_DATA_PATH)
}

export function workFile(targetUrl: string, action: boolean) {
  const writeActionTarget = path_.resolve(targetUrl, dirPath || '../')
  if (!fs.existsSync(writeActionTarget)) {
    fs.mkdirSync(writeActionTarget)
  }

  return new Promise((resolve) => {
    glob(`${targetUrl}/*.ts`, async (err: any, paths: string[]) => {
      if (err) {
        log.error(err.toString())
        process.exit(1)
      }

      await workUnit(paths, action, writeActionTarget)

      if (!fs.existsSync(path_.join(CWD, './.cache'))) {
        await fs.mkdirSync(path_.join(CWD, './.cache'))
      }

      await fs.writeFileSync(
        path_.join(CWD, './.cache/api-ui-data.json'),
        JSON.stringify(result),
      )

      resolve(true)
    })
  })
}

type Iprops = {
  path?: string
  watch?: boolean
  action?: boolean
}

export default async function file(props: Iprops) {
  const { path = 'src/actions/types', watch = false, action = false } = props
  const targetUrl = path_.join(CWD, path)
  await workFile(targetUrl, action)
  if (watch) {
    console.info(`开启监听请求字段ts文件`)

    watchAction(targetUrl, action, workFile)
  }
}

function watchAction(
  targetUrl: string,
  action: boolean,
  work: (p: string, action: boolean) => void,
) {
  let readyOk = false
  const watcher = watch(targetUrl, {
    persistent: true,
  })
  watcher.on('ready', function () {
    readyOk = true
  })
  watcher.on('add', function (path) {
    console.info(log.tips(`${path}类型文件新增`))
    if (readyOk) work(targetUrl, action)
  })
  watcher.on('change', function (path) {
    console.info(log.tips(`${path}类型文件变更`))
    if (readyOk) work(targetUrl, action)
  })
  watcher.on('unlink', function () {
    if (readyOk) work(targetUrl, action)
  })
}

function workUnit(paths: string[], action: boolean, writeActionTarget: string) {
  return new Promise(async (resolve) => {
    for (let i = 0; i < paths.length; i++) {
      const p = paths[i] as string
      const parseRes = parser(p)
      const fileArr = p.split('/')
      const fileName = fileArr[fileArr.length - 1]?.replace('.ts', '')
      if (parseRes && fileName) {
        const def = parseRes.definitions
        result[fileName] = def
        if (action) {
          let content = ''

          if (!antmConfig?.api?.action?.createDefaultModel) {
            content = createDefaultModel({
              data: def,
              fileName: fileName,
              requestImport,
              requestFnName,
            })
          } else {
            content = antmConfig?.api?.action?.createDefaultModel({
              data: def,
              fileName: fileName,
              requestImport,
              requestFnName,
            })
          }

          const prettierConfig = await getPrettierConfig()

          const formatContent = prettier.format(content, {
            ...prettierConfig,
            parser: 'typescript',
          })

          await fs.writeFileSync(
            path_.resolve(writeActionTarget, `${fileName}.ts`),
            formatContent,
          )
        }
      }

      spinner.info(
        log.tips(
          `生成请求接口模块: ${path_.resolve(
            writeActionTarget,
            `${fileName}.ts`,
          )}`,
        ),
      )
    }

    spinner.succeed(log.success('成功生成所有请求接口'))

    resolve(result)
  })
}

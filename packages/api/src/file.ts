/* eslint-disable import/no-named-as-default */
import path_ from 'path'
import fs from 'fs'
import * as ora from 'ora'
import glob from 'glob'
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
const apiConfig = getConfig()
const { requestImport, requestFnName, dirPath } = apiConfig?.action || {}
let result = {}

if (fs.existsSync(API_UI_DATA_PATH)) {
  result = require(API_UI_DATA_PATH)
}

export function workFile(targetUrl: string, action: boolean) {
  const globPaths = [`${targetUrl}/*.ts`, `${targetUrl}/ **/*.ts`]
  const writeActionTarget = path_.resolve(targetUrl, dirPath || '../')
  if (!fs.existsSync(writeActionTarget)) {
    fs.mkdirSync(writeActionTarget)
  }

  return new Promise((resolve) => {
    globMax(globPaths, async (err, paths: string[]) => {
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
  forceUpdate?: boolean
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
  watcher.on('add', function (p) {
    console.info(
      log.tips(`
    新增文件${p}`),
    )
    if (readyOk) work(targetUrl, action)
  })
  watcher.on('change', function (p) {
    console.info(
      log.tips(`
    文件变更${p}`),
    )
    if (readyOk) work(targetUrl, action)
  })
  watcher.on('unlink', function () {
    if (readyOk) work(targetUrl, action)
  })
}

function workUnit(paths: string[], action: boolean, writeActionTarget: string) {
  return new Promise(async (resolve) => {
    for (let i = 0; i < paths.length; i++) {
      const p = paths[i]
      if (p) {
        const parseRes = parser(p)
        const fileArr = p.split('/')
        const fileName = fileArr[fileArr.length - 1]?.replace('.ts', '')
        if (parseRes && fileName) {
          const def = parseRes.definitions
          result[fileName] = def
          if (action) {
            let content = ''

            if (!apiConfig?.action?.createDefaultModel) {
              content = createDefaultModel({
                data: def,
                fileName: fileName,
                requestImport,
                requestFnName,
              })
            } else {
              content = apiConfig?.action?.createDefaultModel({
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

            fs.writeFileSync(
              path_.resolve(writeActionTarget, `${fileName}.ts`),
              formatContent,
            )
          }
        }

        spinner.info(log.tips(`解析接口模块: ${p}`))
      }
    }

    spinner.succeed(log.success('所有ts模块解析完成'))

    resolve(result)
  })
}

async function globMax(files, callback) {
  let allPaths: string[] = []
  for (let i = 0; i < files.length; i++) {
    const pats = await globSync(files[i])
    if (pats) allPaths = allPaths.concat(pats)
  }
  callback(allPaths)
}

async function globSync(file): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(file, (err, pats) => {
      if (err) reject(err)
      resolve(pats)
    })
  })
}

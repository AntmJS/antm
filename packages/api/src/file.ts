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
  const globPaths = [`${targetUrl}/*.ts`, `${targetUrl}/**/*.ts`]
  const writeActionTarget = path_.resolve(targetUrl, dirPath || '../')
  if (!fs.existsSync(writeActionTarget)) {
    fs.mkdirSync(writeActionTarget)
  }

  return new Promise((resolve) => {
    globMax(globPaths, async (paths: string[]) => {
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
        const fileCode = fs.readFileSync(p, 'utf-8')
        const apiTypeComments = getApiTypeComments(fileCode)
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

            const formatContent = prettier.format(
              `${apiTypeComments}
                ${content}`,
              {
                ...prettierConfig,
                parser: 'typescript',
              },
            )

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
  const allPaths: string[] = []
  for (let i = 0; i < files.length; i++) {
    const pats = await globSync(files[i])
    pats.forEach((it) => {
      if (!allPaths.includes(it)) {
        allPaths.push(it)
      }
    })
  }

  callback(allPaths)
}

async function globSync(file): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(file, (err, pats) => {
      if (err) {
        console.info(err, '????')
        reject(err)
      }
      resolve(pats)
    })
  })
}

function getApiTypeComments(codeStr: string) {
  const commentsMatch = codeStr.match(/\/\*\*[\w\W]{4,100}\*\//)
  let comments = '/** @type front */'
  if (commentsMatch) {
    const commentsStr = commentsMatch[0]
    const comm: Record<string, any> = parseComments(commentsStr)
    if (comm['type']?.includes('swagger')) {
      comments = '/** @type from swagger */'
    }
  }

  return comments
}

function parseComments(comments = '') {
  const res = {}
  if (comments && comments.includes('\n')) {
    const arr = comments
      .split('\n')
      .filter((item) => item.includes('@'))
      .map((item) => item.replace(/^[\s]+/g, ''))
      .map((item) => item.replace('* ', ''))
      .map((item) => item.replace('@', ''))
      .map((item) => item.replace(/[\s]+/, '##'))

    arr.forEach((item) => {
      const cons = item.split('##')
      if (cons[0]) res[cons[0]] = cons[1]
    })
  } else if (comments) {
    const arr = comments
      .replace(/\/\*\*[\s]*/, '')
      .replace(/[\s]*\*\//, '')
      .replace('@', '')
      .split(' ')
    if (arr[0]) res[arr[0]] = arr[1]
  }

  return res
}

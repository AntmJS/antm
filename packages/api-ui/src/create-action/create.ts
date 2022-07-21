/* eslint-disable import/no-named-as-default */
import path_ from 'path'
import fs from 'fs'
import glob from 'glob'
import * as prettier from 'prettier'
import log from '../log.js'
import parser from '../parser.js'
import getConfig from '../config/getConfig.js'

const CWD = process.cwd()
const antmConfig = getConfig()
const { requestImport, requestFnName, requestSuffix } =
  antmConfig?.apiUi?.action || {}

type Iprops = {
  path: string
}

export default function createAll(props: Iprops) {
  const { path = 'src/actions/types' } = props
  const targetUrl = path_.join(CWD, path)
  const writeTarget = path_.resolve(targetUrl, '../')
  glob(`${targetUrl}/*.ts`, async (err, paths: string[]) => {
    if (err) {
      log.error(err.toString())
      process.exit(1)
    }
    paths.forEach((p) => {
      const parseRes = parser(p)
      const fileArr = p.split('/')
      const fileName = fileArr[fileArr.length - 1]?.replace('.ts', '')
      if (parseRes && fileName) {
        const def = parseRes.definitions
        let content = ''

        if (!antmConfig?.apiUi?.action?.createDefaultModel) {
          content = createDefaultModel({
            data: def,
            fileName: fileName,
            requestImport,
            requestFnName,
            requestSuffix,
          })
        } else {
          content = antmConfig?.apiUi?.action?.createDefaultModel(
            fileName,
            def as any,
          )
        }

        const formatContent = prettier.format(content, {
          semi: false,
          parser: 'typescript',
        })

        fs.writeFileSync(
          path_.resolve(writeTarget, `${fileName}.ts`),
          formatContent,
        )
      }
    })
  })
}

export function createDefaultModel({
  requestImport = "import { createFetch } from '@/utils/request'",
  requestFnName = 'createFetch',
  fileName = 'a',
  data = {},
  requestSuffix = 'Action',
}) {
  const packages = []
  let requestActionsStr = ''

  for (const key in data) {
    if (key !== 'Record<string,any>') {
      const item = data[key]
      packages.push(key)
      requestActionsStr += `
      // ${item.description}
      export const ${key}${requestSuffix} = ${requestFnName}<${key}['request'], ${key}['response']>('${item.url}', '${item.method}');
      `
    }
  }

  const packagesStr = packages.join(',')

  return `
  // @ts-nocheck
  ${requestImport}
  import type { ${packagesStr} } from './types/${fileName}';

  ${requestActionsStr}
  `
}

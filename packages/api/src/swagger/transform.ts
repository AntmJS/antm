/* eslint-disable @typescript-eslint/ban-ts-comment */
import pat from 'path'
import fs from 'fs'
import * as ora from 'ora'
import * as prettier from 'prettier'
import log from '../log.js'
import { getPrettierConfig } from '../config/getPrettierConfig.js'

const typeNameCache: any[] = []
let prettierConfig = {}
const DEAULT_REPONSE = `{
  /**
   * @value 200
   */
  code: number
  /**
   * @value true
   */
  success: boolean
}`

export async function transform(
  data: Record<string, any>,
  path: string,
  modules?: string[],
  // @ts-ignore
  createTypeFileName: (url: string) => string,
) {
  const typesUrl = pat.resolve(process.cwd(), path)
  const BaseTypesUrl = pat.resolve(typesUrl, '../baseTypes.ts')
  const result: any = {}
  const definitions = data['definitions']
  const paths = data['paths']
  prettierConfig = await getPrettierConfig()

  let baseTypes = ''
  if (!fs.existsSync(typesUrl)) {
    fs.mkdirSync(typesUrl)
  }

  const spinner = ora.default()

  spinner.start(log.tips('swagger数据解析中...'))

  for (const key in definitions) {
    const def = definitions[key]

    const parseResult = parseDef(def)
    spinner.start(log.tips('公共基础类型数据解析中...'))

    baseTypes += `
    /**
     * ${def.description || '--'}
     */
    export type ${formatBaseTypeKey(key)} = ${parseResult.codes}`
  }
  await fs.writeFileSync(BaseTypesUrl, formatTs(baseTypes))

  for (const key in paths) {
    const method = Object.keys(paths[key])[0] || ''
    const item = paths[key][method]
    const moduleName = item.tags[0]

    if (!modules || modules.length === 0 || modules.includes(moduleName)) {
      if (!result[moduleName]) {
        result[moduleName] = {}
        result[moduleName].codes = ''
        result[moduleName].dependencies = []
        result[moduleName].firstUrl = key
      }

      let reqCodes = `{ \n `
      const parameters = filterRepeatName(item.parameters)

      for (const km in parameters) {
        const it = parameters[km] || {}
        // @ts-ignore
        const { codes, dependencies } = parseDef(it, it.name)
        reqCodes += `${codes}`

        dependencies.map((dep) => {
          if (!result[moduleName].dependencies.includes(dep)) {
            result[moduleName].dependencies.push(dep)
          }
        })
      }

      reqCodes += `} \n `

      let resCodes = ``
      if (item.responses['200']?.schema) {
        const schema = item.responses['200']
        const resParseResult = parseDef(schema)
        resCodes += resParseResult.codes

        resParseResult.dependencies.map((dep) => {
          if (!result[moduleName].dependencies.includes(dep)) {
            result[moduleName].dependencies.push(dep)
          }
        })
      }

      if (!resCodes) resCodes = DEAULT_REPONSE

      const typeName = getRequestTypeName(key)
      result[moduleName].codes += `
    /**
     * ${item.summary || '--'}
     * @url ${key}
     * @method ${method}
     * @introduce ${item.description || '--'}
     */
    export type I${typeName} = {
      request: ${reqCodes}
      response: ${resCodes}
    }
    `
    }
  }

  for (const nn in result) {
    const mode = result[nn]
    const baseImport = `import { ${mode.dependencies.join(
      ',',
    )} } from "../baseTypes";
      `
    fs.writeFileSync(
      pat.join(typesUrl, `${createTypeFileName(mode.firstUrl)}.ts`),
      formatTs(`${baseImport}${mode.codes}`),
    )
  }

  console.info(
    log.tips(`
    👊 swagger数据解析完成
  `),
  )

  spinner.stop()
}

function parseDef(def: Record<string, any>, kk?: string) {
  const dependencies: string[] = []
  const result = workUnit(def, kk)

  function workUnit(data: Record<string, any>, key?: string, noMark?: boolean) {
    if (key && key.includes('.')) return ''

    let res = ''
    if (data['type'] && isBaseType(data['type'])) {
      const type__ = resetTypeName(data['type'])
      let $value = ''
      const $description = data['description'] || ''
      if (key) {
        if (type__ === 'string') {
          if (data['default']) $value = data['default']
          if (data['enum']) $value = `[${data['enum'].join(',')}]`
          if (data['format'] === 'date-time') {
            $value = `#datetime()`
          }
        } else if (type__ === 'number') {
          if (data['format'])
            $value = `#integer(${data['format'].replace('int', '')})`
        }
        const comments = `
        /**
         * ${$description}
         * @value ${$value}
         */
        `

        return `${comments}${key}${
          data['required'] === false ? '?' : ''
        }:${type__}${noMark ? '' : ' \n'}`
      } else return type__
    } else if (data['type'] === 'object' || data['schema']?.type === 'object') {
      const properties = data['properties'] || data['schema']?.properties
      if (!properties) {
        if (key) {
          res = `${key}${data['required'] === false ? '?' : ''}:{}${
            noMark ? '' : '\n'
          }`
        } else {
          res = `{}${noMark ? '' : '\n'}`
        }
      } else {
        if (!key) res += `{ \n `

        for (const kk in properties) {
          const item = properties[kk]
          res += workUnit(item, kk)
        }

        if (!key) res += `} ${noMark ? '' : '\n'}`
      }
    } else if (data['type'] === 'array' || data['schema']?.type === 'array') {
      const type__ = data['type'] || data['schema']?.type
      const items__ = data['items'] || data['schema']?.items
      if (type__ && isBaseType(type__)) {
        res += workUnit(
          {
            ...items__,
            required: data['required'] === false ? false : true,
            description: data['description'],
          },
          key,
          true,
        )
      } else if (items__ && !isBaseType(type__)) {
        if (items__.properties) res += `{ \n `
        res += workUnit(
          {
            ...items__,
            required: data['required'] === false ? false : true,
            description: data['description'],
            rule: 2,
          },
          key,
          true,
        )
        if (items__.properties) res += `} ${noMark ? '' : '\n'}`
      } else if (data['items']?.$ref) {
        const $ref = formatBaseTypeKey(
          data['items']?.$ref.replace('#/definitions/', ''),
        )
        dependencies.push($ref)
        res += workUnit({ type: $ref }, key, true)
      }
      res += '[] \n '
    } else if (data['$ref']) {
      const comments = `
      /**
       * ${data['description'] || ''}
       * @rule ${data['rule'] || ''}
       */
      `
      const $ref = formatBaseTypeKey(data['$ref'].replace('#/definitions/', ''))
      dependencies.push($ref)
      return `${
        key ? `${comments}${key}${data['required'] === false ? '?' : ''}:` : ''
      }${$ref}${noMark ? '' : ' \n '}`
    } else if (data['schema']?.$ref) {
      const comments = `
      /**
       * ${data['description'] || ''}
       * @rule ${data['rule'] || ''}
       */
      `
      const $ref = formatBaseTypeKey(
        data['schema']?.$ref.replace('#/definitions/', ''),
      )
      dependencies.push($ref)
      return `${
        key ? comments + key + `:${data['required'] === false ? '?' : ''}` : ''
      }${$ref}${noMark ? '' : ' \n '}`
    }
    return res
  }

  return {
    codes: result,
    dependencies: dependencies,
  }
}

function isBaseType(d?: string) {
  return !['object', 'array'].includes(d || '')
}

function resetTypeName(type: any) {
  if (type === 'file') return 'string'
  if (type === 'integer') return 'number'
  if (type === 'ref') return 'string'
  return type
}

function formatTs(str: string) {
  return prettier.format(str, {
    ...prettierConfig,
    parser: 'typescript',
  })
}

function getRequestTypeName(url: string) {
  const arrUrl: any = url.split('/').map((item) => {
    // 防止使用 a/${xxId}/abc
    return item.replace('{', '').replace('}', '')
  })

  if (arrUrl.length > 1) {
    let u = `${arrUrl[arrUrl.length - 2]}${wordFirstBig(
      arrUrl[arrUrl.length - 1],
    )}`

    u = typeNameCache.includes(u) ? u + `1` : u

    typeNameCache.push(u)

    return u
  } else {
    return arrUrl[arrUrl.length - 1]
  }
}

function wordFirstBig(str: string) {
  return str.substring(0, 1).toLocaleUpperCase() + str.substring(1)
}

function formatBaseTypeKey(key: string) {
  let res = key
  const invalidMark = ['（', '）', '，', '=', '(', ')', ',']

  invalidMark.forEach((it) => {
    res = replaceAll(it, '', res)
  })

  res = res.replace(/«/g, '').replace(/»/g, '').replace(/\./g, 'a')

  return res
}
// @ts-ignore
function replaceAll(find, replace, str) {
  const ff = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  return str.replace(new RegExp(ff, 'g'), replace)
}

function filterRepeatName(arr: any) {
  const keys: string[] = []
  const newArr: any[] = []

  for (let i = 0; i < arr.length; i++) {
    if (!keys.includes(arr[i].name)) {
      newArr.push(arr[i])
      keys.push(arr[i].name)
    }
  }

  return newArr
}

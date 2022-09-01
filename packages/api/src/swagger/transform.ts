import pat from 'path'
import fs from 'fs'
import prettier from 'prettier'
import * as ora from 'ora'
import log from '../log.js'
import { getPrettierConfig } from '../config/getPrettierConfig.js'

const typeNameCache: string[] = []
let prettierConfig = {}
const DEAULT_RESPONSE = `{
  /**
   * @value 200
   */
  code: number
  /**
   * @value success
   */
  success: boolean
}`

export async function transform(
  data: Record<string, any>,
  path: string,
  modules?: string[],
  createTypeFileName?: (url: string) => string,
) {
  const typesUrl = pat.resolve(process.cwd(), path)
  const BaseTypesUrl = pat.resolve(typesUrl, '../baseTypes.ts')
  const result: any = {}
  const definitions = data['definitions']
  const paths = data['paths']

  let baseTypes = ''
  prettierConfig = await getPrettierConfig()
  if (!fs.existsSync(typesUrl)) {
    fs.mkdirSync(typesUrl)
  }

  const spinner = ora.default()

  console.info(log.tips('swagger数据解析中...'))

  for (const key in paths) {
    const method = Object.keys(paths[key])[0] as string
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
      const parameters: Record<string, any> = filterRepeatName(item.parameters)

      for (const km in parameters) {
        const it = parameters[km]
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
      if (
        item.responses['200']?.schema &&
        (item.responses['200']?.schema?.type === 'object' ||
          item.responses['200']?.schema.$ref)
      ) {
        const schema = item.responses['200']
        const resParseResult = parseDef(schema)
        resCodes += resParseResult.codes

        resParseResult.dependencies.map((dep) => {
          if (!result[moduleName].dependencies.includes(dep)) {
            result[moduleName].dependencies.push(dep)
          }
        })
      } else {
        resCodes = DEAULT_RESPONSE
      }

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
    await fs.writeFileSync(
      pat.join(typesUrl, `${createTypeFileName?.(nn)}.ts`),
      formatTs(`${baseImport}${mode.codes}`),
    )
  }
  /** todo 只生成使用的基础类型 */
  for (const key in definitions) {
    const def = definitions[key]

    const parseResult = parseDef(def)
    const commentsParams = {}
    if (def.description) commentsParams['description'] = def.description
    const comments = createComments(commentsParams)

    baseTypes += `${comments}export type ${formatBaseTypeKey(key)} = ${
      parseResult.codes
    }`
  }
  await fs.writeFileSync(BaseTypesUrl, formatTs(baseTypes))

  console.info(
    log.success(`
    👊 swagger数据解析完成
  `),
  )

  spinner.stop()
}

function parseDef(def: Record<string, any>, kk?: string) {
  const dependencies: any[] = []
  const result = workUnit(def, kk)

  function workUnit(data, key?: string, noMark?: boolean) {
    if (key && key.includes('.')) return ''

    let res = ''
    if (data.type && isBaseType(data.type)) {
      const type__ = resetTypeName(data.type)
      let $value = ''
      const $description = data.description
      if (key) {
        if (type__ === 'string' || type__ === 'number') {
          if (data.default) $value = data.default
          if (data.enum)
            $value = `[${data.enum
              .map((it) => {
                if (!it.includes(`'`) && !it.includes(`"`)) return `"${it}"`
                return it
              })
              .join(',')}]`
          if (data.format === 'date-time') {
            $value = `#datetime()`
          }
        }

        const commentsParams: Record<string, any> = {}
        if ($value) commentsParams['value'] = $value
        if ($description) commentsParams['description'] = $description

        const comments = createComments(commentsParams)

        return `${comments}${key}${
          data.required === false ? '?' : ''
        }:${type__}${noMark ? '' : ' \n'}`
      } else return type__
    } else if (data.type === 'object' || data.schema?.type === 'object') {
      const properties = data.properties || data.schema?.properties
      if (!properties) {
        if (key) {
          res = `${key}:{}${noMark ? '' : '\n'}`
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
    } else if (data.type === 'array' || data.schema?.type === 'array') {
      const type__ = data.type || data.schema?.type
      const items__ = data.items || data.schema?.items
      if (type__ && isBaseType(type__)) {
        res += workUnit(
          {
            ...items__,
            required: data.required,
            description: data.description,
          },
          key,
          true,
        )
      } else if (items__ && !isBaseType(type__)) {
        if (items__.properties) res += `{ \n `
        res += workUnit(
          {
            ...items__,
            required: data.required,
            description: data.description,
            rule: 2,
          },
          key,
          true,
        )
        if (items__.properties) res += `} ${noMark ? '' : '\n'}`
      } else if (data.items?.$ref) {
        const $ref = formatBaseTypeKey(
          data.items?.$ref.replace('#/definitions/', ''),
        )
        dependencies.push($ref)
        res += workUnit({ type: $ref }, key, true)
      }
      res += '[] \n '
    } else if (data.$ref) {
      const commentsParams: Record<string, any> = {}
      if (data.rule) commentsParams['value'] = data.rule
      if (data.description) commentsParams['description'] = data.description

      const comments = createComments(commentsParams)

      const $ref = formatBaseTypeKey(data.$ref.replace('#/definitions/', ''))
      dependencies.push($ref)
      return `${
        key ? `${comments}${key}${data.required === false ? '?' : ''}:` : ''
      }${$ref}${noMark ? '' : ' \n '}`
    } else if (data.schema?.$ref) {
      const commentsParams: Record<string, any> = {}
      if (data.rule) commentsParams['value'] = data.rule
      if (data.description) commentsParams['description'] = data.description

      const comments = createComments(commentsParams)

      const $ref = formatBaseTypeKey(
        data.schema?.$ref.replace('#/definitions/', ''),
      )
      dependencies.push($ref)
      return `${
        key ? comments + key + `:${data.required === false ? '?' : ''}` : ''
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

function resetTypeName(type) {
  if (type === 'file') return 'string'
  if (type === 'integer') return 'number'
  if (type === 'ref') return 'string'
  return type
}

function formatTs(str) {
  // eslint-disable-next-line import/no-named-as-default-member
  return prettier.format(str, {
    ...prettierConfig,
    parser: 'typescript',
  })
}

function getRequestTypeName(url: string) {
  const arrUrl = url.split('/').map((item) => {
    // 防止使用 a/${xxId}/abc
    return item.replace('{', '').replace('}', '')
  })

  if (arrUrl.length > 1) {
    let u = `${arrUrl[arrUrl.length - 2]}${wordFirstBig(
      arrUrl[arrUrl.length - 1] || '',
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

function replaceAll(find, replace, str) {
  const find_ = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  return str.replace(new RegExp(find_, 'g'), replace)
}

function filterRepeatName(arr?: any) {
  const keys: any[] = []
  const newArr: any[] = []

  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      if (!keys.includes(arr[i].name)) {
        newArr.push(arr[i])
        keys.push(arr[i].name)
      }
    }
  }

  return newArr
}

function createComments(params?: Record<string, any>) {
  let res = ''
  if (params && Object.keys(params).length > 0) {
    res += `/**
    `
    for (const key in params) {
      res += ` * @${key} ${params[key]}
      `
    }
    res += `*/
    `
  }

  return res
}

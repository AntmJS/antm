/* eslint-disable @typescript-eslint/ban-ts-comment */
import http from 'http'
import path from 'path'
import * as prettier from 'prettier'
import { mock } from 'mockjs'
import deepMerge from 'deepmerge'
import * as ora from 'ora'
import log from '../log.js'
import getConfig from '../config/getConfig.js'

const apiConfig = getConfig()
const {
  port,
  baseIntercept,
  arrayRule,
  timeout: timeoutPublic,
} = apiConfig?.mock || {}
// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require(path.join(process.cwd(), './.cache/api-ui-data.json'))

main()

const spinner = ora.default()

export default function main() {
  const server = http.createServer()
  const mockData: any[] = []

  for (const key in data) {
    // @ts-ignore
    const items = data[key]
    for (const kk in items) {
      const it = items[kk]
      mockData.push({
        url: it.url,
        timeout: it.timeout,
        result: it?.properties?.response || {},
        params: it?.properties?.request || {},
      })
    }
  }

  server.listen(port || 10099, () => {
    spinner.succeed(
      log.success(
        `mockServer start success: http://localhost:${port || 10099} !`,
      ),
    )
  })

  server.on('request', (req: any, res: any) => {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'content-type',
      'Access-Control-Allow-Methods': 'DELETE,PUT,POST,GET,OPTIONS',
    })

    const reqUrl = req.url.split('?')[0]

    mockData.forEach((item) => {
      if (reqUrl === item.url && item.url) {
        const mockResult = transformMock(item.result, undefined, item.url)
        let mockData = mock(mockResult)
        mockData = prettier.format(JSON.stringify(mockData), {
          semi: false,
          parser: 'json',
        })
        setTimeout(() => {
          res.end(mockData)
        }, item.timeout || timeoutPublic || 0)
      }
    })

    if (mockData.filter((it) => it.url === reqUrl).length === 0) {
      res.end(
        JSON.stringify({
          success: false,
          code: 200,
          message: '没有匹配地址',
        }),
      )
    }
  })

  function transformMock(
    data: Record<string, any>,
    target?: Record<string, any>,
    url?: string,
  ): any {
    if (!data) return
    if (data['type'] === 'object') {
      const result = target || {}
      for (const key in data['properties']) {
        const item = data['properties'][key]
        if (['number', 'string', 'boolean'].includes(item.type)) {
          if (item.type === 'number') {
            let value__ = item.value
            if (baseIntercept) {
              value__ =
                baseIntercept({
                  url: url || '',
                  fieldName: key,
                  type: 'number',
                  originValue: value__,
                }) || item.value
            }
            if (typeof value__ === 'string') {
              value__ = value__.replace('#', '@')
            }

            let numberRule = item.rule ? `|${item.rule}` : '|+1'

            if (Array.isArray(value__)) {
              value__ = randomEnum(value__)
              numberRule = ''
            }

            result[`${key}${numberRule}`] = value__ || 1
          }
          if (item.type === 'boolean') {
            let value__: any = item.value || true
            if (baseIntercept) {
              value__ =
                baseIntercept({
                  url: url || '',
                  fieldName: key,
                  type: 'boolean',
                  originValue: value__,
                }) || value__
            }
            result[`${key}`] = value__
          }
          if (item.type === 'string') {
            if (/^#/.test(item.value)) {
              let value__: any = item.value.replace('#', '@')

              if (baseIntercept) {
                value__ =
                  baseIntercept({
                    url: url || '',
                    fieldName: key,
                    type: 'string',
                    originValue: value__,
                  }) || value__
              }

              if (Array.isArray(value__)) {
                value__ = randomEnum(value__)
              }

              result[`${key}`] = value__ || ''
            } else {
              let value__: any = item.value

              if (baseIntercept) {
                value__ =
                  baseIntercept({
                    url: url || '',
                    fieldName: key,
                    type: 'string',
                    originValue: value__,
                  }) || value__
              }

              if (Array.isArray(value__)) {
                value__ = randomEnum(value__)
              }
              result[`${key}`] = `${value__ || ''}`
            }
          }
        } else {
          let key_ = key
          let rule__ = item.rule
          if (item.type === 'array') {
            if (arrayRule) {
              rule__ =
                arrayRule({
                  url: url || '',
                  fieldName: key,
                  originRule: item.rule,
                }) || rule__
            }
            key_ = rule__ ? `${key}${rule__ ? `|${rule__}` : ''}` : key
            result[key_] = []
          } else {
            result[key] = {}
          }
          result[key_] = transformMock(item, result[key_], url)
        }
      }

      return result
    } else if (data['type'] === 'array') {
      if (data['items'].type === 'object') {
        const arr = [{}]
        transformMock(data['items'], arr[0], url)
        return arr
      } else {
        let value__
        if (data['value'] && Array.isArray(data['value'])) {
          value__ = data['value'].map((item) => {
            if (typeof item === 'string') {
              return item.replace('#', '@')
            }
            return item
          })
        }

        return value__ || [data['items'].type]
      }
    } else if (data['allOf'] && Array.isArray(data['allOf'])) {
      // 解决`&`运算类型数据
      let handleData = {}
      data['allOf'].reverse().map((item) => {
        handleData = deepMerge(handleData, item)
      })
      return transformMock(handleData, target, url)
    }
  }
}

function randomEnum(arr) {
  const ran = Math.floor(Math.random() * (arr.length - 0))

  return arr[ran]
}

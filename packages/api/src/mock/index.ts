/* eslint-disable @typescript-eslint/ban-ts-comment */
import http from 'http'
import path from 'path'
import * as prettier from 'prettier'
import * as ora from 'ora'
import { mock } from 'mockjs'
import log from '../log.js'
import getConfig from '../config/getConfig.js'

const antmConfig = getConfig()
const { mockPort } = antmConfig.api || {}
// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require(path.join(process.cwd(), './.cache/api-ui-data.json'))

main()

const spinner = ora.default()

export default function main() {
  const server = http.createServer()
  const mockData: any[] = []

  for (const key in data) {
    const items = data[key]
    for (const kk in items) {
      const it = items[kk]
      mockData.push({
        url: it.url,
        result: it?.properties?.response || {},
        params: it?.properties?.request || {},
      })
    }
  }

  server.listen(mockPort || 10099, () => {
    spinner.succeed(
      log.success(
        `mockServer start success: http://localhost:${mockPort || 10099} !`,
      ),
    )
  })

  server.on('request', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'content-type',
      'Access-Control-Allow-Methods': 'DELETE,PUT,POST,GET,OPTIONS',
    })

    const reqUrl = req.url.split('?')[0]

    mockData.forEach((item) => {
      if (reqUrl === item.url && item.url) {
        const mockResult = transformMock(item.result)
        let mockData = mock(mockResult)
        mockData = prettier.format(JSON.stringify(mockData), {
          semi: false,
          parser: 'json',
        })
        res.end(mockData)
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
  ): any {
    if (!data) return
    if (data['type'] === 'object') {
      const result = target || {}
      for (const key in data['properties']) {
        const item = data['properties'][key]
        if (['number', 'string', 'boolean'].includes(item.type)) {
          if (item.type === 'number') {
            let value__ = item.value
            if (typeof value__ === 'string') {
              value__ = value__.replace('#', '@')
            }
            result[`${key}${item.rule ? `|${item.rule}` : '|+1'}`] =
              value__ || 1
          }
          if (item.type === 'boolean') {
            result[`${key}`] = true
          }
          if (item.type === 'string') {
            if (/^#/.test(item.value)) {
              const value_ = item.value.replace('#', '@')
              result[`${key}`] = value_ || ''
            } else {
              result[`${key}`] = `${item.value || ''}`
            }
          }
        } else {
          let key_ = key
          if (item.type === 'array') {
            key_ = item.rule ? `${key}${item.rule ? `|${item.rule}` : ''}` : key
            result[key_] = []
          } else {
            result[key] = {}
          }
          result[key_] = transformMock(item, result[key_])
        }
      }

      return result
    } else if (data['type'] === 'array') {
      if (data['items'].type === 'object') {
        const arr = [{}]
        transformMock(data['items'], arr[0])
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
    }
  }
}

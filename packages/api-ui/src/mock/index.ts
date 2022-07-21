/* eslint-disable @typescript-eslint/ban-ts-comment */
import http from 'http'
import * as prettier from 'prettier'
import { mock } from 'mockjs'
import data from '../data/data.js'
import log from '../log.js'
import getConfig from '../config/getConfig.js'

const antmConfig = getConfig()
const { mockPort } = antmConfig.apiUi || {}

main()

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
        result: it?.properties?.response || {},
        params: it?.properties?.request || {},
      })
    }
  }

  server.listen(mockPort || 10099, () => {
    log.success('mockServer start success !')
  })

  server.on('request', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'content-type',
      'Access-Control-Allow-Methods': 'DELETE,PUT,POST,GET,OPTIONS',
    })

    mockData.forEach((item) => {
      if (req.url === item.url && item.url) {
        const mockResult = transformMock(item.result)
        let mockData = mock(mockResult)
        mockData = prettier.format(JSON.stringify(mockData), {
          semi: false,
          parser: 'json',
        })
        res.end(mockData)
      }
    })

    if (mockData.filter((it) => it.url === req.url).length === 0) {
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
            result[`${key}${item.rule ? `|${item.rule}` : '|+1'}`] = item.value
          }
          if (item.type === 'boolean') {
            result[`${key}`] = true
          }
          if (item.type === 'string') {
            if (/^#/.test(item.value)) {
              const value_ = item.value
                .replace('#', '@')
                .replace("'", '')
                .replace("'", '')
              result[`${key}`] = value_
            } else {
              result[`${key}`] = `${item.value}`
                .replace("'", '')
                .replace("'", '')
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
        return [data['items'].type]
      }
    }
  }
}

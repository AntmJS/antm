import { join } from 'path'
import fs from 'fs'
import log from '../log.js'

type Iconfig = {
  /** 请求ts的文件路径 */
  path?: string
  title?: string
  buildPath?: string
  buildPort?: number
  mock?: {
    /** 统一设置接口的延时返回 */
    timeout?: number
    port?: number
    baseIntercept?: (params: {
      url: string
      fieldName: string
      type: 'string' | 'number' | 'boolean'
      originValue?: any
    }) => any
    arrayRule?: (params: {
      url: string
      fieldName: string
      originRule?: any
    }) => string
  }
  /** 生成请求方法配置 */
  action?: {
    dirPath?: string
    requestImport?: string
    requestFnName?: string
    requestSuffix?: string
    /** 自定义请求方法 */
    createDefaultModel?: (params: {
      data: any
      fileName: string
      requestImport?: string
      requestFnName?: string
    }) => string
  }
  /** swagger生成请求字段类型 */
  swagger?: {
    url?: string
    /** 使用到的模块 */
    modules?: string[]
  }
} & Record<string, any>

let ifWarned = false

export default function getConfig(): Iconfig {
  const configPath = join(process.cwd(), 'antm.config.js')

  if (fs.existsSync(configPath)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const apiConfig = require(configPath).api || {}
    return apiConfig as Iconfig
  } else {
    if (!ifWarned) {
      log.warning('根目录找不到antm.config.js文件')
      ifWarned = true
    }
    return {
      path: './src/actions/types',
    }
  }
}

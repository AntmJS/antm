import { join } from 'path'
import fs from 'fs'
import log from '../log.js'

type Iconfig = {
  apiUi?: {
    /** 请求ts的文件路径 */
    path?: string
    buildPath: string
    buildPort: number
    mockPort: number
    /** 生成请求方法配置 */
    action?: {
      requestImport?: string
      requestFnName?: string
      requestSuffix?: string
      /** 自定义请求方法 */
      createDefaultModel?: (
        fileName: string,
        data: {
          url: string
          description: string
          method: string
        }[],
      ) => string
    }
  }
} & Record<string, any>

export default function getConfig(): Iconfig {
  const configPath = join(process.cwd(), 'antm.config.js')

  if (fs.existsSync(configPath)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const antmConfig = require(configPath)
    return antmConfig as Iconfig
  } else {
    log.warning('根目录找不到antm.config.js文件')

    return {}
  }
}

import { join } from 'path'
import fs from 'fs'
import { IApiConfig } from '@antmjs/types'
import log from '../log.js'

let ifWarned = false

export default function getConfig(): IApiConfig {
  let configPath = join(process.cwd(), 'antm.config.ts')

  if (!fs.existsSync(configPath)) {
    configPath = join(process.cwd(), 'antm.config.js')
  }

  if (fs.existsSync(configPath)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const apiConfig = require(configPath).api || {}
    return apiConfig as IApiConfig
  } else {
    if (!ifWarned) {
      log.warning('根目录找不到antm.config.js(ts)文件')
      ifWarned = true
    }
    return {
      path: './src/actions/types',
    }
  }
}

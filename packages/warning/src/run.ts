import path from 'path'
import fs from 'fs'
import { IWarningConfig } from '@antmjs/types'
import { getBranch, getGlobUrls } from './utils'
import webhooksWarning from './webhooksWarning'
import emailWarning from './emailWarning'

const cwd = process.cwd()
let configPath = path.resolve(cwd, './antm.config.ts')
if (!fs.existsSync(configPath)) {
  configPath = path.resolve(cwd, './antm.config.js')
}
let antmConfigWarning: IWarningConfig = { monitorFiles: [] }
const currentBranch = getBranch()

async function getAllConfig() {
  if (fs.existsSync(configPath)) {
    let antmConfig = await import(configPath)
    antmConfig = antmConfig.default
    if (antmConfig.warning && typeof antmConfig.warning === 'object') {
      antmConfigWarning = {
        webhooks: antmConfig.warning.webhooks,
        email: antmConfig.warning.email,
        monitorFiles: getGlobUrls(antmConfig.warning.monitorFiles),
        branchs: antmConfig.branchs,
      }
    } else {
      console.error(
        '请检查antm.config.js(ts)文件的配置信息和README的要求是否一致',
      )
      process.exit(1)
    }
  } else {
    console.error('根目录找不到antm.config.js(ts)文件')
    process.exit(1)
  }
}

/**
 *
 * @param {string} type  'webhook' | 'email'
 * @param {object} fnConfig
 */
export default async function run(type, fnConfig = {}) {
  await getAllConfig()
  if (
    antmConfigWarning.branchs &&
    !antmConfigWarning.branchs.includes(currentBranch || '')
  ) {
    return () => {
      console.info('')
    }
  }

  const triggers = {
    webhooks: webhooksWarning,
    email: emailWarning,
  }

  return (...args) => {
    if (type === 'webhooks') {
      args[0] = Object.assign(antmConfigWarning.webhooks || {}, args[0] || {})
    }

    if (type === 'email') {
      args[0] = Object.assign(antmConfigWarning.email || {}, args[0] || {})
    }

    if (!args[0].monitorFiles) {
      args[0].monitorFiles = antmConfigWarning.monitorFiles
    }

    args[0] = Object.assign(args[0] || {}, fnConfig)
    triggers[type](...args)
  }
}

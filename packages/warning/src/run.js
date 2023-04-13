/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
const cwd = process.cwd()
const { getBranch, getGlobUrls } = require('./utils')
const configPath = path.resolve(cwd, './antm.config.js')
let antmConfigWarning = { monitorFiles: [] }
const currentBranch = getBranch()

if (fs.existsSync(configPath)) {
  const antmConfig = require(configPath)
  if (antmConfig.warning && typeof antmConfig.warning === 'object') {
    antmConfigWarning = {
      webhooks: antmConfig.warning.webhooks,
      email: antmConfig.warning.email,
      monitorFiles: getGlobUrls(antmConfig.warning.monitorFiles),
      branchs: antmConfig.branchs,
    }
  } else {
    console.error('请检查antm.config.js文件的配置信息和README的要求是否一致')
    process.exit(1)
  }
} else {
  console.error('根目录找不到antm.config.js文件')
  process.exit(1)
}

/**
 *
 * @param {string} type  'webhook' | 'email'
 * @param {object} fnConfig
 */
module.exports = function run(type, fnConfig = {}) {
  if (
    antmConfigWarning.branchs &&
    !antmConfigWarning.branchs.includes(currentBranch)
  ) {
    return () => {
      console.info('')
    }
  }

  const triggers = {
    webhooks: require('./webhooksWarning.js'),
    email: require('./emailWarning.js'),
  }

  return (...args) => {
    if (type === 'webhooks') {
      args[0] = Object.assign(antmConfigWarning.webhooks, args[0] || {})
    }

    if (type === 'email') {
      args[0] = Object.assign(antmConfigWarning.email, args[0] || {})
    }

    if (!args[0].monitorFiles) {
      args[0].monitorFiles = antmConfigWarning.monitorFiles
    }

    args[0] = Object.assign(args[0] || {}, fnConfig)
    triggers[type](...args)
  }
}

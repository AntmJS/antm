/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
const cwd = process.cwd()
const { getBranch } = require('./utils')
const configPath = path.resolve(cwd, './antm.config.js')
let antmConfigWarning = { monitorFiles: ['./src/run.js'] }
const currentBranch = getBranch()

if (fs.existsSync(configPath)) {
  const antmConfig = require(configPath)
  if (antmConfig.warning && typeof antmConfig.warning === 'object') {
    antmConfigWarning = {
      webhooks: antmConfig.warning.webhooks,
      email: antmConfig.warning.email,
      monitorFiles: antmConfig.warning.monitorFiles,
      branchs: antmConfig.branchs,
    }
  }
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

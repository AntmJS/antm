/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
const cwd = process.cwd()
const configPath = path.resolve(cwd, './antm.config.js')
let antmConfigWarning = { monitorFiles: ['./src/run.js'] }

if (fs.existsSync(configPath)) {
  const antmConfig = require(configPath)
  if (antmConfig.warning && typeof antmConfig.warning === 'object') {
    antmConfigWarning = {
      webhooks: antmConfig.warning.webhooks,
      email: antmConfig.warning.email,
      monitorFiles: antmConfig.warning.monitorFiles,
    }
  }
}

/**
 *
 * @param {string} type  'webhook' | 'email'
 * @param {object} fnConfig
 */
module.exports = function run(type, fnConfig = {}) {
  const triggers = {
    webhook: require('./webhookWarning.js'),
    email: require('./emailWarning.js'),
  }

  return (...args) => {
    args[0] = Object.assign(args[0] || {}, antmConfigWarning)
    args[0] = Object.assign(args[0] || {}, fnConfig)
    triggers[type](...args)
  }
}

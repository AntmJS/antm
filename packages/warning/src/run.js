const path = require('path')
const fs = require('fs')
const cwd = process.cwd()
const configPath = path.resolve(cwd, './antm.config.js')
let antmConfigWarning = { monitorFiles: ['./src/run.js'] }

if (fs.existsSync(configPath)) {
  const antmConfig = require(configPath)
  if (antmConfig.warning && typeof antmConfig.warning === 'object') {

    antmConfigWarning = antmConfig.warning
  }
}

/**
 * 
 * @param {string} type  'chart' | 'email'
 * @param {object} fnConfig
 */
module.exports = function run(type, fnConfig = {}) {
  const triggers = {
    chart: require('./chartWarning.js'),
    email: require('./emailWarning.js')
  }

  return (...args) => {
    args[0] = Object.assign(args[0] || {}, antmConfigWarning)
    args[0] = Object.assign(args[0] || {}, fnConfig)
    triggers[type](...args)
  }
}

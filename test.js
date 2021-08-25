const cp = require('child_process')

function getUserInfo() {
  const { stdout, error } = cp.spawnSync('git', ['config', 'user.name'])
  if (error) {
    console.error(error)

  }
  return `${stdout}`.replace(/\n/g, '')
}

function getBranch() {
  const { stdout } = cp.spawnSync('git', ['branch'])
  return `${stdout}`.match(/^\*[/w/W]*/).input.replace(/\n|\*/g, '')
}


function getDiff() {
  const { stdout } = cp.spawnSync('git', ['diff', 'HEAD', 'package.json'])
  console.info(stdout)
}

module.exports = {
  getUserInfo,
  getBranch,
}
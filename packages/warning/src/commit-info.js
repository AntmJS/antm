const git = require('git-last-commit')
const path = require('path')
const cp = require('child_process')

function getUserInfo() {
  const { stdout } = cp.spawnSync('git', ['config', 'user.name'])
  return `${stdout}`
}

module.exports = function gitInfo(url) {
  return new Promise((resolve, reject) => {
    git.getLastCommit(function (error, commit) {
      if (error) return reject(error)
      resolve({
        ...commit,
        committer: getUserInfo().replace(/\n/, '')
      })
    }, { dst: path.resolve(__dirname, url) || './' })
  })
}

const path = require('path')
const fs = require('fs')
const { getDiff } = require('./utils')

module.exports = function getDiffs(files) {
  const diffRes = {}
  files.forEach(f => {
    if (fs.existsSync(path.resolve(process.cwd(), f))) {
      diffRes[f] = getDiff(f)
    }
  })

  return diffRes
}
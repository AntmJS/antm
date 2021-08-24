const fs = require('fs')
const diffStr = require('diff')
const path = require('path')
const shell = require('shelljs')
const cwd = process.cwd()
const tempPath = path.resolve(__dirname, './.temp')
const commitInfo = require('./commit-info')
const { monitorFiles } = require(path.join(cwd, './package.json')).repository
const projectName = require(path.join(cwd, './package.json')).name

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  process.exit(1)
}

if (!monitorFiles) {
  shell.echo('Sorry, this script requires monitorFiles in package.json repository.monitorFiles')
  process.exit(1)
}

module.exports = async function run(token) {
  if (fs.existsSync(tempPath)) shell.rm('-rf', tempPath)
  fs.mkdirSync(tempPath, { node: 0o422 })
  const lastCommitInfo = await commitInfo(cwd)
  shell.cd(cwd)
  monitorFiles.forEach((file) => {
    shell.exec(`git show ${lastCommitInfo.hash}:${file} > ${path.resolve(tempPath, file)}`)
  })

  const diffRes = {
    diff: {},
    branch: lastCommitInfo.branch,
    committer: lastCommitInfo.committer,
    projectName,
  }

  monitorFiles.forEach((file) => {
    const oldlySrt = fs.readFileSync(path.resolve(tempPath, file), 'utf-8')
    const newlyStr = fs.readFileSync(path.join(cwd, file), 'utf-8')
    diffRes.diff[file] = diffStr.diffLines(oldlySrt, newlyStr)
  })
  shell.rm('-rf', tempPath)
  require('./warning')(diffRes, { token })
}

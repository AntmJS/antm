/* eslint-disable @typescript-eslint/no-var-requires */
const npath = require('path')
const fs = require('fs')

function fillZero(value) {
  return value < 10 ? `0${value}` : value
}

function formatTime(timestamp, formatStr) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = fillZero(date.getMonth() + 1)
  const day = fillZero(date.getDate())
  const hour = fillZero(date.getHours())
  const minute = fillZero(date.getMinutes())
  const second = fillZero(date.getSeconds())

  return formatStr
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('hh', hour)
    .replace('mm', minute)
    .replace('ss', second)
}

function getFiles(dir = process.cwd(), prefix = '') {
  dir = npath.normalize(dir)
  if (!fs.existsSync(dir)) {
    return []
  }
  const files = fs.readdirSync(dir)
  let rst = []
  files.forEach((item) => {
    const filepath = dir + npath.sep + item
    const stat = fs.statSync(filepath)
    if (stat.isFile()) {
      if (!/^\.+/.test(item)) {
        rst.push(prefix + item)
      }
    } else if (stat.isDirectory()) {
      rst = rst.concat(
        getFiles(
          npath.normalize(dir + npath.sep + item),
          npath.normalize(prefix + item + npath.sep),
        ),
      )
    }
  })

  return rst
}

module.exports = {
  formatTime,
  getFiles,
}

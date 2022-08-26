/* eslint-disable @typescript-eslint/no-var-requires */
const os = require('os')
const fs = require('fs')
const npath = require('path')
const sh = require('shelljs')
const QRCode = require('qrcode')
const tma = npath.join(__dirname, '../node_modules/.bin/tma')

async function preview() {
  const imagePath = './preview_tt.png'
  try {
    sh.exec(`${tma} preview -f`, { fatal: true })
    const previewFilePath = npath.join(os.homedir(), '.tma-cli/preview.json')
    const currentResult = JSON.parse(
      fs.readFileSync(previewFilePath, 'utf-8') || '{}',
    )
    await QRCode.toFile(imagePath, currentResult.native, {
      width: 300,
      margin: 2,
    })
  } catch (error) {
    throw new Error(`抖音小程序预览异常: ${error}`)
  }
}

function upload(version) {
  try {
    const msg = '更新了一些内容'
    sh.exec(`${tma} upload -v ${version} -c ${msg}`, { fatal: true })
  } catch (error) {
    throw new Error(`抖音小程序上传异常: ${error}`)
  }
}

module.exports = async function tt(email, password, type, version) {
  try {
    sh.exec(`${tma} login-e ${email} ${password}`, { fatal: true })
  } catch (error) {
    throw new Error(`抖音小程序登录异常: ${error}`)
  }

  switch (type) {
    case 'upload':
      upload(version)
      break
    case 'preview':
      await preview()
      break
  }
}

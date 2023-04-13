/* eslint-disable @typescript-eslint/no-var-requires */
const npath = require('path')
const sh = require('shelljs')
const alipaydev = npath.join(__dirname, '../node_modules/.bin/alipaydev')

function preview(appId) {
  const imagePath = './preview_alipay.png'
  try {
    sh.exec(
      `${alipaydev} mini preview -i ${appId} -p ./alipay -o ${imagePath}`,
      { fatal: true },
    )
  } catch (error) {
    throw new Error(`支付宝小程序预览异常: ${error}`)
  }
}

function upload(appId, version) {
  try {
    sh.exec(
      `${alipaydev} mini upload -c alipay -i ${appId} -p ./alipay -v ${version}`,
      { fatal: true },
    )
  } catch (error) {
    throw new Error(`支付宝小程序上传异常: ${error}`)
  }
}

module.exports = function alipay(appId, privateKey, type, toolId, version) {
  try {
    sh.exec(`${alipaydev} config set -i ${toolId} -k ${privateKey}`, {
      fatal: true,
    })
  } catch (error) {
    throw new Error(`支付宝小程序配置异常: ${error}`)
  }

  switch (type) {
    case 'upload':
      upload(appId, version)
      break
    case 'preview':
      preview(appId)
      break
  }
}

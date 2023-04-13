/* eslint-disable @typescript-eslint/no-var-requires */
const npath = require('path')
const weappci = require('miniprogram-ci')
const projectConfig = require(npath.resolve(
  process.cwd(),
  './weapp/project.config.json',
))

async function preview(project, desc, robotId) {
  try {
    const imagePath = './preview_weapp.png'
    await weappci.preview({
      project,
      desc: desc,
      setting: {
        ...projectConfig.setting,
      },
      qrcodeFormat: 'image',
      qrcodeOutputDest: imagePath,
      robot: robotId,
    })
  } catch (error) {
    throw new Error(`微信小程序预览异常: ${error}`)
  }
}

async function upload(project, desc, robotId, version) {
  try {
    await weappci.upload({
      project,
      version: version,
      desc: desc,
      setting: {
        ...projectConfig.setting,
      },
      robot: robotId,
    })
  } catch (error) {
    throw new Error(`微信小程序上传异常: ${error}`)
  }
}

module.exports = async function weapp(
  appId,
  pkp,
  type,
  desc,
  robotId,
  version,
) {
  let project
  try {
    project = new weappci.Project({
      appid: appId,
      type: 'miniProgram',
      projectPath: './weapp',
      privateKeyPath: pkp,
      ignores: ['node_modules/**/*'],
    })
  } catch (error) {
    throw new Error(`微信小程序配置异常: ${error}`)
  }

  switch (type) {
    case 'upload':
      await upload(project, desc, robotId, version)
      break
    case 'preview':
      await preview(project, desc, robotId)
      break
  }
}

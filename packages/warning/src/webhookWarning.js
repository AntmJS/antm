const https = require('https')
const { URL } = require('url')
const path = require('path')
const cwd = process.cwd()
const { getBranch, getUserInfo, checkWebHooks, log } = require('./utils')
const projectName = require(path.join(cwd, './package.json')).name

module.exports = async function chartWarning(props) {
  if (!props.webhooks) {
    log.fail(`** please set webhooks **`)
    log.warining('set in cli like: antm-warning chart --webhooks https://abc.com')
    log.warining('set in antm.config.js like: { warning: { webhooks: ["https://abc.com"] } }')

    process.exit(1)
  }
  if (!props.monitorFiles) {
    log.fail(`** please set monitor files **`)
    log.warining('set in cli like: antm-warning chart --monitor-files package.json,README.md')
    log.warining('set in antm.config.js like: { warining: { monitorFiles: [ "package.json", "README.md"] } }')

    process.exit(1)
  }

  props.monitorFiles = Array.isArray(props.monitorFiles) ? props.monitorFiles : props.monitorFiles.split(',')
  props.webhooks = Array.isArray(props.webhooks) ? props.webhooks : props.webhooks.split(',')

  if (!checkWebHooks(props.webhooks)) {
    log.fail(`please set correct webhooks like https://abc.com`)

    process.exit(1)
  }

  const webhooksObjs = props.webhooks.map(item => {
    const u = new URL(item)
    return {
      hostname: u.hostname,
      pathname: u.pathname,
      search: u.search,
    }
  })

  const res = await require('./getDiffs')(props.monitorFiles)
  const hasFilesChange = Object.keys(res).some(item => !!res[item])
  const content = {
    msgtype: 'text',
    text: {
      content: `
文件修改通知
- 项目【${projectName}】
- 分支【${getBranch()}】
- 提交人【${getUserInfo()}】`,
    },
    at: {
      isAtAll: true,
    },
  }

  if (hasFilesChange) {
    Object.keys(res).map(key => {
      if (res[key]) {
        content.text.content += `
>>>>>>>>>>>>>>>>>>【${key}修改】<<<<<<<<<<<<<<<<<<<
${res[key]}`
      }
    })

    webhooksObjs.map(webhook => {
      const req = https.request({
        hostname: webhook.hostname,
        port: 443,
        path: webhook.pathname + webhook.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }, function (data) {
        let str = ''
        data.on('data', function (chunk) {
          str += chunk
        })
        data.on('end', function () {
          log.success('send monitor files diff results to chart group success, reponse: ' + str.toString())
        })
        data.on('err', function (err) {
          log.fail(err)
          process.exit(1)
        })
      })

      req.write(JSON.stringify(content))
      req.end()
    })
  }
}

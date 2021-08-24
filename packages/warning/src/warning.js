const https = require('https')

module.exports = function (res, { token }) {
  const content = {
    msgtype: 'text',
    at: {
      isAtAll: true,
    },
    text: {
      content: `文件修改通知
- 项目【${res.projectName}】
- 分支【${res.branch}】
- 提交人【${res.committer}】
`,
    },
  }
  let hasFilesChange = false
  Object.keys(res.diff).forEach((key) => {
    content.text.content += `变更文件【${key}】`
    res.diff[key].forEach((item) => {
      if (item.added || item.removed && !hasFilesChange) hasFilesChange = true
      if (item.added) {
        content.text.content += `
-———————— 变更后内容： ————————
${item.value}`
      } else if (item.removed) {
        content.text.content += `
-———————— 变更前内容： ————————
 ${item.value}`
      } else {
        content.text.content += item.value
      }
    })
  })

  if (hasFilesChange) {
    const req = https.request({
      hostname: 'oapi.dingtalk.com',
      port: 443,
      path: `/robot/send?access_token=${token}`,
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
        console.info(str.toString())
      })
      data.on('err', function (err) {
        console.info(err)
      })
    })

    req.write(JSON.stringify(content))
    req.end()
  }
}

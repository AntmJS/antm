import https from 'https'
import { URL } from 'url'
import { join } from 'path'
import { getBranch, getUserInfo, checkWebHooks, log } from './utils'
import getDiffs from './getDiffs'

const CWD = process.cwd()

export default async function chartWarning(props) {
  if (!props.url) {
    log.fail(`** please set webhooks **`)
    log.warining('set in cli like: antm-warning webhooks --url https://abc.com')
    log.warining(
      'set in antm.config.js like: { warning: { webhooks: ["https://abc.com"] } }',
    )

    process.exit(1)
  }
  if (!props.monitorFiles) {
    log.fail(`** please set monitor files **`)
    log.warining(
      'set in cli like: antm-warning webhooks --monitor-files package.json,README.md',
    )
    log.warining(
      'set in antm.config.js like: { warining: { monitorFiles: [ "package.json", "README.md"] } }',
    )

    process.exit(1)
  }

  props.monitorFiles = Array.isArray(props.monitorFiles)
    ? props.monitorFiles
    : props.monitorFiles.split(',')
  props.url = Array.isArray(props.url) ? props.url : props.url.split(',')

  if (!checkWebHooks(props.url)) {
    log.fail(`please set correct url like https://abc.com`)

    process.exit(1)
  }

  const webhooksObjs = props.url.map((item) => {
    const u = new URL(item)
    return {
      hostname: u.hostname,
      pathname: u.pathname,
      search: u.search,
    }
  })

  const res = getDiffs(props.monitorFiles)
  const hasFilesChange = Object.keys(res).some((item) => !!res[item])

  const pkg = await import(join(CWD, './package.json'))

  const content = {
    msgtype: 'text',
    text: {
      content: `
文件修改通知
- 项目【${pkg.default.name}】
- 分支【${getBranch()}】
- 提交人【${getUserInfo()}】`,
    },
    at: {
      isAtAll: true,
    },
  }

  if (hasFilesChange) {
    Object.keys(res).map((key) => {
      if (res[key]) {
        content.text.content += `
>>>>>>>>>>>>>>>>>>【${key}】<<<<<<<<<<<<<<<<<<<
${res[key]}`
      }
    })

    webhooksObjs.map((webhook) => {
      const req = https.request(
        {
          hostname: webhook.hostname,
          port: 443,
          path: webhook.pathname + webhook.search,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
        function (data) {
          let str = ''
          data.on('data', function (chunk) {
            str += chunk
          })
          data.on('end', function () {
            log.success(
              `send monitor files diff results to chart group success, reponse: ${str.toString()}`,
            )
          })
          data.on('err', function (err) {
            log.fail(err)
            process.exit(1)
          })
        },
      )

      req.write(JSON.stringify(content))
      req.end()
    })
  }
}

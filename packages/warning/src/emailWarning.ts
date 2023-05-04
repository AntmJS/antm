import { join } from 'path'
import nodemailer from 'nodemailer'
import {
  getBranch,
  getUserInfo,
  checkEmial,
  log,
  getCommitMessage,
} from './utils'
import getDiffs from './getDiffs'

const CWD = process.cwd()

export default async function emailWarning(props) {
  props = {
    ...props,
    ...props.email,
  }
  if (!props.sender) {
    log.fail(`** please set sender **`)
    log.warining('set in cli like: antm-warning email --sender abc@163.com')
    log.warining(
      'set in antm.config.js like: { warning: { email: { sender: abc@163.com  } } }',
    )

    process.exit(1)
  }

  if (!checkEmial(props.sender)) {
    log.fail(`** please set correct sender **`)
    log.warining('set in cli like: antm-warning email --sender abc@163.com')
    log.warining(
      'set in antm.config.js like: { warning: { email: { sender: abc@163.com } } }',
    )

    process.exit(1)
  }

  if (!props.receivers) {
    log.fail(`** please set receivers **`)
    log.warining('set in cli like: antm-warning email -receivers abc@163.com')
    log.warining(
      'set in antm.config.js like: { warning: { email: { receivers: abc@163.com } } }',
    )

    process.exit(1)
  }

  if (!props.senderPass) {
    log.fail(`** please set senderPass **`)
    log.warining('set in cli like: antm-warning email --sender-pass hgfdsa5rew')
    log.warining(
      'set in antm.config.js like: { warning: { email: { senderpass: hgfdsa5rew  } } }',
    )

    process.exit(1)
  }
  if (!props.monitorFiles) {
    log.fail(`** please set monitor files **`)
    log.warining(
      'set in cli like: antm-warning email --monitor-files package.json,README.md',
    )
    log.warining(
      'set in antm.config.js like: { warining: { monitorFiles: [ "package.json", "README.md"] } }',
    )

    process.exit(1)
  }

  props.monitorFiles = Array.isArray(props.monitorFiles)
    ? props.monitorFiles
    : props.monitorFiles.split(',')
  const res = getDiffs(props.monitorFiles)
  const hasFilesChange = Object.keys(res).some((item) => !!res[item])

  const pkg = await import(join(CWD, './package.json'))

  let html = `
    <h1>文件修改通知</h1>
    <h3>项目${pkg.default.name}</h3>
    <h3>分支${getBranch()}</h3>
    <h4>修改人${getUserInfo()}</h3>
    <h4>修改人${getCommitMessage()}</h3>`
  // @ts-ignore
  String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, 'gm'), s2)
  }

  if (hasFilesChange) {
    Object.keys(res).map((key) => {
      if (res[key]) {
        let s = `
<h5>【${key}修改】</h5>
${res[key]}`
        s = s.replace(
          /((?<=\n)[+]\s*[\s\S]+?)(?=\n+?)/g,
          '<div style="background: green">$1</div>',
        )
        s = s.replace(
          /((?<=\n)[-]\s*[\s\S]+?)(?=\n+?)/g,
          '<div style="background: red">$1</div>',
        )
        html += s.replace(/\n/g, '<br />')
      }
    })
  }

  SendEmail({
    html,
    sender: props.sender,
    senderPass: props.senderPass,
    receivers: props.receivers,
  }).then((res) => {
    log.success(
      `send monitor files diff results to assig emails success, reponse:${res}`,
    )
  })
}

//发送验证码
function SendEmail({ html, sender, senderPass, receivers }) {
  receivers = Array.isArray(receivers) ? receivers.join(',') : receivers
  const host = sender.split('@')[1]

  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: `smtp.${host}`, // 网易的邮件地址
      port: 465, // 端口
      secureConnection: false, // use SSL
      auth: {
        user: sender, // 邮箱账号
        pass: senderPass, // 邮箱的授权码
      },
    })

    const send = (mailOptions) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error)
          return log.fail(error)
        }
        resolve(info.messageId)
      })
    }

    const mailOptions = {
      from: sender, // 发件人地址
      to: receivers, // 收件人地址，多个收件人可以使用逗号分隔
      subject: '文件修改通知', // 邮件标题
      html, // 邮件内容
    }

    send(mailOptions)
  })
}

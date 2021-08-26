/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const nodemailer = require('nodemailer')
const cwd = process.cwd()
const { getBranch, getUserInfo, checkEmial, log } = require('./utils')
const projectName = require(path.join(cwd, './package.json')).name

module.exports = async function emailWarning(props) {
  props = {
    ...props,
    ...props.email,
  }
  if (!props.emailSender) {
    log.fail(`** please set emailSender **`)
    log.warining(
      'set in cli like: antm-warning email --email-sender abc@163.com',
    )
    log.warining(
      'set in antm.config.js like: { warning: { email: { emailSender: abc@163.com  } } }',
    )

    process.exit(1)
  }

  if (!checkEmial(props.emailSender)) {
    log.fail(`** please set correct emailSender **`)
    log.warining(
      'set in cli like: antm-warning email --email-sender abc@163.com',
    )
    log.warining(
      'set in antm.config.js like: { warning: { email: { emailSender: abc@163.com } } }',
    )

    process.exit(1)
  }

  if (!props.emailReceivers) {
    log.fail(`** please set emailReceivers **`)
    log.warining(
      'set in cli like: antm-warning email --email-receivers abc@163.com',
    )
    log.warining(
      'set in antm.config.js like: { warning: { email: { emailReceivers: abc@163.com } } }',
    )

    process.exit(1)
  }

  if (!props.emailSenderPass) {
    log.fail(`** please set emailSenderPass **`)
    log.warining(
      'set in cli like: antm-warning email --email-sender-pass hgfdsa5rew',
    )
    log.warining(
      'set in antm.config.js like: { warning: { email: { emailSenderpass: hgfdsa5rew  } } }',
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
  const res = await require('./getDiffs')(props.monitorFiles)
  const hasFilesChange = Object.keys(res).some((item) => !!res[item])

  let html = `
    <h1>文件修改通知</h1>
    <h3>项目${projectName}</h3>
    <h3>分支${getBranch()}</h3>
    <h4>修改人${getUserInfo()}</h3>`

  String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, 'gm'), s2)
  }

  if (hasFilesChange) {
    Object.keys(res).map((key) => {
      if (res[key]) {
        html += `
<h5>【${key}修改】</h5>
${res[key].replaceAll(/\n/, '<br />')}`
      }
    })
  }

  SendEmail({
    html,
    emailSender: props.emailSender,
    emailSenderPass: props.emailSenderPass,
    emailReceivers: props.emailReceivers,
  }).then((res) => {
    log.success(
      `send monitor files diff results to chart group success, reponse:
      ${res.toString()}`,
    )
  })
}

//发送验证码
function SendEmail({ html, emailSender, emailSenderPass, emailReceivers }) {
  emailReceivers = Array.isArray(emailReceivers)
    ? emailReceivers.join(',')
    : emailReceivers
  const host = emailSender.split('@')[1]

  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: `smtp.${host}`, // 网易的邮件地址
      port: 465, // 端口
      secureConnection: false, // use SSL
      auth: {
        user: emailSender, // 邮箱账号
        pass: emailSenderPass, // 邮箱的授权码
      },
    })

    const send = (mailOptions) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error)
          return console.log(error)
        }
        resolve(info.messageId)
        console.log('Message send: %s', info.messageId)
      })
    }

    const mailOptions = {
      from: emailSender, // 发件人地址
      to: emailReceivers, // 收件人地址，多个收件人可以使用逗号分隔
      subject: '文件修改通知', // 邮件标题
      html, // 邮件内容
    }

    send(mailOptions)
  })
}

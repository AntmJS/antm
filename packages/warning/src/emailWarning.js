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
  const res = await require('./getDiffs')(props.monitorFiles)
  const hasFilesChange = Object.keys(res).some((item) => !!res[item])

  let html = `
    <h1>??????????????????</h1>
    <h3>??????${projectName}</h3>
    <h3>??????${getBranch()}</h3>
    <h4>?????????${getUserInfo()}</h3>`

  String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, 'gm'), s2)
  }

  if (hasFilesChange) {
    Object.keys(res).map((key) => {
      if (res[key]) {
        let s = `
<h5>???${key}?????????</h5>
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

//???????????????
function SendEmail({ html, sender, senderPass, receivers }) {
  receivers = Array.isArray(receivers) ? receivers.join(',') : receivers
  const host = sender.split('@')[1]

  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: `smtp.${host}`, // ?????????????????????
      port: 465, // ??????
      secureConnection: false, // use SSL
      auth: {
        user: sender, // ????????????
        pass: senderPass, // ??????????????????
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
      from: sender, // ???????????????
      to: receivers, // ?????????????????????????????????????????????????????????
      subject: '??????????????????', // ????????????
      html, // ????????????
    }

    send(mailOptions)
  })
}

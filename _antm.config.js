module.exports = {
  warning: {
    monitorFiles: [
      './packages/[!node_modules]**/package.json',
      './package.json',
    ],
    webhooks: {
      url: 'https://oapi.dingtalk.com/robot/send?access_token=xxxx',
    },
  },
}

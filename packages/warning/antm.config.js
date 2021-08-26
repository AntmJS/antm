module.exports = {
  warning: {
    monitorFiles: ['package.json', './src/run.js'],
    // branchs: ['master'],
    webhooks: {
      url: 'https://oapi.dingtalk.com/robot/send?access_token=b82d1228bf1e75cd2e4efdad2dff934982447b76fab32d9a308ad10bcab3c40b',
    },
    email: {
      sender: 'zuolung@126.com',
      senderPass: 'IQHRFVTPWWYVAYJS',
      receivers: '461332496@qq.com',
    },
  },
}

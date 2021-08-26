# @antmjs/warning
在git commit的时候，获取工作区和暂存区指定的文件 与最后一次提交成功的对比的结果
- 实现通过微信、钉钉、飞书等聊天群机器人的webhooks，通知群内成员对比的结果
- 实现邮件发送，邮件通知到目标邮件对比结果
### 安装

使用前你需要确认安装 [husky](https://www.npmjs.com/package/husky)

```sh
yarn addd @antm/warning -D
```
### 配置
- 根目录配置antm.config.js
- 钉钉机器人配置的时候，安全设置需要设置为关键词“文件修改”，[钉钉机器人的配置](https://developers.dingtalk.com/document/robots/customize-robot-security-settings)
`emailReceivers`、`webhooks`的配置支持数组和逗号隔开的字符串
```javascript
module.exports = {
  warning: {
    monitorFiles: [                             // 监听的文件
      'package.json'
    ],
    webhooks: 'https://oapi.dingtalk.com/robot/send?access_token=xxx'，
    email: {
      emailSender: 'abcd@126.com',                // 发送人
      emailSenderPass: 'ASDFGHJASD',              // 发送令牌，邮箱需要设置SMTP服务获取
      emailReceivers: 'xxxxxx@qq.com',            // 接收人邮箱，多个用数组
    }
  }
}
```
### 命令行的使用
- 在husky的脚本中触发
- 所有相关的配置项都可以通过命令行设置
```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint-staged
antm-warning webhook
antm-warning email
```
antm-warning webhook的相关参数
```sh
antm-warning webhook:
  -webhooks, --webhooks, <webhooks>                    set webhooks api of dingding | wechart | Lark | others, separated by commas
  -monitor-files, --monitor-files, <monitorFiles>      set monitor files
```

antm-warning email的相关参数
```sh
antm-warning email:
  -monitor-files, --monitor-files, <webhooks>                   set monitor files
  -email-sender, --email-sender, <emailSender>                  set the email sender
  -email-sender-pass, --email-sender-pass, <emailSenderPass>    set the email sender pass
  -email-receivers, --email-receivers, <emailreceivers>         set the email receivers, separated by commas
```
# @antmjs/warning

### 介绍

在 git commit 的时候，获取工作区和暂存区指定的文件 与最后一次提交成功的对比的结果

- 实现通过微信、钉钉、飞书等聊天群机器人的 webhooks，通知群内成员对比的结果
- 实现邮件发送，邮件通知到目标邮件对比结果

### 为什么需要

团队成员对项目关键的配置项、公用组件、公共方法修改了，需要通知开发组成员修改内容，避免影响开发的规范性和统一性

### 安装

使用前你需要确认安装 [husky](https://www.npmjs.com/package/husky)

```sh
yarn add @antmjs/warning -D
```

### 配置

- 根目录配置 antm.config.ts(js)
- 钉钉机器人配置的时候，安全设置需要设置为关键词“文件修改”，[钉钉机器人的配置](https://developers.dingtalk.com/document/robots/customize-robot-security-settings)
  `emailReceivers`、`webhooks`的配置支持数组和逗号隔开的字符串

```javascript
module.exports = {
  warning: {
    monitorFiles: [
      'package.json',
      './packages/**/package.json', // 支持glob语法
    ],
    branchs: ['master'], // 监听的分支，不设置的话所有的分支都监听
    webhooks: {
      url: 'https://oapi.dingtalk.com/robot/send?access_token=xxx', // webhooks地址，多个用数组
    },
    email: {
      sender: 'abcd@126.com', // 发送人
      senderPass: 'ASDFGHJASD', // 发送令牌，邮箱需要设置SMTP服务获取
      receivers: 'xxxxxx@qq.com', // 接收人邮箱，多个用数组
    },
  },
}
```

### 命令行的使用

- 在 husky 的脚本中触发
- 命令行中可以配置相关配置

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint-staged
npx antm-warning webhooks
npx antm-warning email
```

antm-warning webhook 的相关参数

```bash
antm-warning webhooks:
  -u, --url, <url>                            set webhooks api of dingding | wechart | Lark | others, separated by commas
  -mf, --monitor-files, <monitorFiles>        set monitor files
```

antm-warning email 的相关参数

```bash
antm-warning email:
  -mf, --monitor-files, <monitorFiles>         set monitor files
  -sender, --sender, <sender>                  set the email sender
  -sender-pass, --sender-pass, <senderPass>    set the email sender pass
  -receivers, --receivers, <receivers>         set the email receivers, separated by commas
```

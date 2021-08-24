# 指定文件，在 git commit 提交的时候，钉钉通知到群组展示文件内容的修改

### 安装

使用前你需要确认安装 [husky](https://www.npmjs.com/package/husky)

```sh
npm install git-warning-dd -D
```

### 在 package.json 中的设置

- 指定监听的文件
- 设置 husky 的 pre-commit 触发文件检查
- [钉钉机器人的配置](https://developers.dingtalk.com/document/robots/customize-robot-security-settings)，安全设置为关键词“文件修改”

```
  ...
  "repository": {
    "type": "https",
    "url": "https://xxxxxxxx",
    "monitorFiles": [
      "./package.json",
      ...
    ]
  },
    "husky": {
    "hooks": {
      ...
      "pre-commit": "gitMonitor xxxxxxxDingDingtoken",
      ...
    }
  },
  ...
```

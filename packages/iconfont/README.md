# @antmjs/iconfont

> 生成可以在 Taro 里面使用的 Iconfont

## 为什么需要

iconfont 默认在小程序里面是不支持的，用它的好处是避免用图片来请求，而且图片资源更大

## 安装

```bash
yarn add @antmjs/iconfont --dev
```

## 使用

package.json

```json
{
  "scripts": {
    "iconfont": "npx antm-icon --input-path https://at.alicdn.com/t/xxxx.css --output-path src/iconfont.less"
  }
}
```

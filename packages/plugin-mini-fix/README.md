# @antmjs/plugin-mini-fix

> 解决 Taro 不应该关心但应用需要自己处理的异常或者优化

## 为什么需要

解决 Taro 不应该关心但应用需要自己处理的异常或者优化

## 安装

```bash
yarn add @antmjs/mini-fix
yarn add @antmjs/plugin-mini-fix --dev
```

## 使用

config/index.js

```javascript
const MiniFixPlugin = require('@antmjs/plugin-mini-fix')
{
  mini: {
    webpackChain(chain) {
      chain
        .plugin('MiniFixPlugin')
        .use(new MiniFixPlugin())
    },
  }
}

```

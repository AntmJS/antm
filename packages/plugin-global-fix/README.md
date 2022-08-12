# @antmjs/plugin-global-fix

> 解决 Taro 使用 polyfill 的时候支付宝等小程序报错的问题

## 为什么需要

解决 Taro 使用 polyfill 的时候支付宝等小程序报错的问题

## 安装

```bash
yarn add @antmjs/plugin-global-fix --dev
```

## 使用

config/index.js

```javascript
const GlobalFixPlugin = require('@antmjs/plugin-global-fix')
{
  mini: {
    webpackChain(chain) {
      chain
        .plugin('GlobalFixPlugin')
        .use(new GlobalFixPlugin())
    },
  }
}

```

# @antmjs/plugin-h5-fix

> 解决 Taro 不应该关心但应用需要自己处理的异常或者优化

### 为什么需要

解决 Taro 不应该关心但应用需要自己处理的异常或者优化

### 安装

```bash
yarn add @antmjs/plugin-h5-fix --dev
```

### 使用

config/index.js

```javascript
const H5FixPlugin = require('@antmjs/plugin-h5-fix')
{
  mini: {
    webpackChain(chain) {
      chain
        .plugin('H5FixPlugin')
        .use(new H5FixPlugin())
    },
  }
}

```

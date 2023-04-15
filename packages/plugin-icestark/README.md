# @antmjs/plugin-icestark

> TaroH5 支持飞冰的微前端框架

### 为什么需要

为了保证开发使用的框架保持一致，我们主要以 Taro 为核心，包括 PC 系统的构建也依赖 Taro。PC 应用比较庞大，也就实践出了这个临时方案

### 安装

```bash
yarn add @antmjs/plugin-icestark --dev
```

### 使用

文档参考[icestark](https://micro-frontends.ice.work/docs/guide)

config/index.js

```javascript
const IceStarkPlugin = require('@antmjs/plugin-icestark')
{
  h5: {
    webpackChain(chain) {
      chain
        .plugin('IceStarkPlugin')
        .use(new IceStarkPlugin({ libraryName: pkg.name }))
      chain.output.library(pkg.name).libraryTarget('umd').publicPath('//localhost:10086/')
    },
    devServer: {
      port: 10086,
      hot: true,
      host: '0.0.0.0',
      historyApiFallback: true,
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*', // 表示允许跨域
      },
    }
  }
}

```

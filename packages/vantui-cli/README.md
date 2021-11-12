# Lib Cli

Lib Cli 是一个 Vue 组件库构建工具，通过 Lib Cli 可以快速搭建一套功能完备的 React 组件库。

### 特性

- 提供丰富的命令，涵盖从开发测试到构建发布的完整流程
- 构建后的组件库默认支持按需引入、主题定制、Tree Shaking

### 手动安装

```shell
# 通过 npm 安装
npm i @antmjs/lib-cli -D

# 通过 yarn 安装
yarn add @antmjs/lib-cli --dev
```

安装完成后，请将以下配置添加到 package.json 文件中

```json
{
  "scripts": {
    "dev": "vant-cli dev",
    "build": "vant-cli build"
  },
  "browserslist": ["Chrome >= 51", "iOS >= 10"]
}
```

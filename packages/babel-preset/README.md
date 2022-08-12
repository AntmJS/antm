# @antmjs/babel-preset

> ES6+转译到 ES5 工具库

## 为什么需要

这个库包含了编译成 ES5 所需的最小可用 Presets，也就是说大部分情况下这个库能满足大部分的转译需求了。

## 安装

```bash
yarn add @antmjs/babel-preset --dev
```

## 使用

babel.config.js

```javascript
const path = require('path')
const apis = require('@tarojs/taro-h5/dist/taroApis')
module.exports = {
  presets: [
    [
      '@antmjs/babel-preset',
      {
        presets: {
          env: {
            debug: false,

            /**
             * false: 不处理polyfill，自己手动引入【全量】
             * usage: 按需加载 polyfill，且不需要手动引入【按需】
             * entry: 必须手动引入，但会根据设置的目标环境全量导入【按环境全量】
             * 注：在 Babel 7.4.0 之后的版本，Babel官方明确建议了不再使用 @babel/polyfill ，建议使用 core-js/stable 和 regenerator-runtime/runtime。本包已经安装了core-js、@babel/plugin-transform-runtime和@babel/runtime，所以选择false或者entry选项的只需要在主文件顶部引入core-js即可
             */
            useBuiltIns: 'usage',
            corejs: { version: 3, proposals: false },
            modules: false, // 对es6的模块文件不做转译，以便使用tree shaking、sideEffects等
          },
          react: {
            runtime: 'automatic',
          },
          typescript: {
            isTSX: true,
            jsxPragma: 'React',
            allExtensions: true,
            allowNamespaces: true,
          },
        },
        decorators: {
          legacy: false,
        },
        classProperties: {
          loose: false,
        },
        runtime: {
          absoluteRuntime: path.dirname(
            require.resolve('@babel/runtime-corejs3/package.json'),
          ),
          version: require('@babel/runtime-corejs3/package.json').version,
          corejs: false,
          helpers: true, // 使用到@babel/runtime
          regenerator: true, // 使用到@babel/runtime
          useESModules: false,
        },
        enableReactRefresh: true,
      },
    ],
  ],
  plugins: [
    [
      require('babel-plugin-transform-taroapi'),
      { packageName: '@tarojs/taro', apis },
    ][ // taro可以加，tree-shaking用
      (require('babel-plugin-import'),
      { libraryName: 'antd', style: true },
      'antd')
    ],
  ],
}
```

package.json

```json
{
  "browserslist": [
    "Chrome >= 35",
    "ChromeAndroid >= 35",
    "iOS >= 8",
    "Safari >= 8",
    "Android >= 4.1",
    "QQAndroid >= 4.1",
    "UCAndroid >= 4.1"
  ]
}
```

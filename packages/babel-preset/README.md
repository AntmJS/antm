# @antmjs/babel-preset

> ES6+转译到ES5工具库

## 安装

```bash
yarn add @antmjs/babel-preset --dev
```

## 使用

babel.config.js

```javascript
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
        runtime: {
          absoluteRuntime: false,
          corejs: false,
          helpers: true, // 使用到@babel/runtime
          regenerator: true, // 使用到@babel/runtime
          useESModules: false,
        },
        exclude: [/@babel[/|\\\\]runtime/, /core-js/],
        enableReactRefresh: true,
      },
    ],
  ],
  plugins: [
    [require('babel-plugin-import'), { "libraryName": "antd", "style": true }, 'antd']
  ]
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
  ],
}
```
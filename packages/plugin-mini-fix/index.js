/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const PLUGIN_NAME = 'MiniFixPlugin'
function MiniFixPlugin(options) {
  this.options = options
}

// 在插件函数的 prototype 上定义一个 `apply` 方法。
MiniFixPlugin.prototype.apply = function (compiler) {
  compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
    compilation.hooks.normalModuleLoader.tap(
      PLUGIN_NAME,
      (loaderContext, module) => {
        const { name } = path.parse(module.resource)
        if (name === 'app') {
          module.loaders.push({
            loader: path.join(__dirname, 'fixTaroQueryLoader'),
            options: {},
          })
        }
      },
    )
  })
}
module.exports = MiniFixPlugin

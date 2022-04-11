/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const PLUGIN_NAME = 'MiniFixPlugin'
const caches = []
function MiniFixPlugin(options) {
  this.options = options
}

// 在插件函数的 prototype 上定义一个 `apply` 方法。
MiniFixPlugin.prototype.apply = function (compiler) {
  compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
    compilation.hooks.normalModuleLoader.tap(
      PLUGIN_NAME,
      (loaderContext, module) => {
        const { base } = path.parse(module.resource)
        if (
          /app\.(tsx|jsx|ts|js)$/.test(base) &&
          !caches.includes(module.resource)
        ) {
          caches.push(module.resource)
          module.loaders.push({
            loader: path.join(__dirname, 'fixTaroQueryLoader'),
          })
        }
      },
    )
  })
}
module.exports = MiniFixPlugin

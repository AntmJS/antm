/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const PLUGIN_NAME = 'H5FixPlugin'
const caches = []
function H5FixPlugin(options) {
  this.options = options
}

// 在插件函数的 prototype 上定义一个 `apply` 方法。
H5FixPlugin.prototype.apply = function (compiler) {
  compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
    let normalModuleLoader
    if (Object.isFrozen(compilation.hooks)) {
      // webpack 5
      normalModuleLoader =
        require('webpack/lib/NormalModule').getCompilationHooks(
          compilation,
        ).loader
    } else {
      normalModuleLoader = compilation.hooks.normalModuleLoader
    }
    normalModuleLoader.tap(PLUGIN_NAME, (loaderContext, module) => {
      const { base, dir } = path.parse(module.resource)
      if (
        dir.indexOf('@tarojs/router') > -1 &&
        /^page\.(tsx|jsx|ts|js)$/.test(base) &&
        !caches.includes(module.resource)
      ) {
        caches.push(module.resource)
        module.loaders.push({
          loader: path.join(__dirname, 'fixTaroQueryLoader'),
        })
      }
    })
  })
}
module.exports = H5FixPlugin

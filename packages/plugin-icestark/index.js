/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const PLUGIN_NAME = 'IceStarkPlugin'
const entryFileName = 'app'
function IceStarkPlugin(options) {
  this.options = options
}

function getAppEntry(compiler) {
  const { entry } = compiler.options
  function getEntryPath(entry) {
    const app = entry[entryFileName]
    if (Array.isArray(app)) {
      return app.filter(
        (item) => path.basename(item, path.extname(item)) === entryFileName,
      )[0]
    }

    return app
  }
  const appEntryPath = getEntryPath(entry)

  return appEntryPath
}

// 在插件函数的 prototype 上定义一个 `apply` 方法。
IceStarkPlugin.prototype.apply = function (compiler) {
  const options = this.options
  const appEntry = getAppEntry(compiler)

  compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
    compilation.hooks.normalModuleLoader.tap(
      PLUGIN_NAME,
      (loaderContext, module) => {
        const { dir, name } = path.parse(module.resource)
        if (/@tarojs\/router\/dist/.test(path.join(dir, name))) {
          module.loaders.push({
            loader: path.join(__dirname, 'fixTaroRouterLoader'),
            options: {},
          })
        }
        if (path.join(dir, name) === appEntry) {
          let index = 0
          module.loaders.forEach((item, i) => {
            if (item.loader === '@tarojs/taro-loader/lib/h5') {
              index = i
            }
          })
          module.loaders.splice(index, 0, {
            loader: path.join(__dirname, 'taroEntryInjectLoader'),
            options: {
              libraryName: options.libraryName,
            },
          })
        }
      },
    )
  })
}
module.exports = IceStarkPlugin

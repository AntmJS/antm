// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

class EnjectPlugin {
  constructor(options) {
    this.options = options
  }
  getAppEntry(compiler) {
    const { entry } = compiler.options
    const { entryFileName } = this.options
    function getEntryPath(entry) {
      if (Array.isArray(entry)) {
        return entry.filter(
          (item) => path.basename(item, path.extname(item)) === entryFileName,
        )[0]
      }
      return entry
    }
    const appEntryPath = getEntryPath(entry)
    return appEntryPath
  }
  apply(compiler) {
    this.appEntry = this.getAppEntry(compiler)
    compiler.hooks.compilation.tap('EnjectPlugin', (compilation) => {
      compilation.hooks.normalModuleLoader.tap(
        'EnjectPlugin',
        (loaderContext, module) => {
          const { designWidth, deviceRatio } = this.options || {}
          const { dir, name } = path.parse(module.resource)
          if (/vantui[\\/]dist[\\/]h5\./.test(path.join(dir, name))) {
            module.loaders.push({
              loader: path.join(__dirname, 'pxTransformLoader.js'),
              options: {
                pxTransformConfig: {
                  designWidth,
                  deviceRatio,
                },
              },
            })
          }
        },
      )
    })
  }
}

module.exports = EnjectPlugin

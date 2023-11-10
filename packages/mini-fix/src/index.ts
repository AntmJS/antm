import { decodeParams } from '@antmjs/utils'

declare let App: any
declare let Page: any
declare let Component: any
declare const getCurrentPages: any

// 下面的逻辑为了抹平个端对于参数返回不一致的差异
function smoothOutParams() {
  const oriApp = App
  const oriPage = Page
  const oriComponent = Component
  let firstShow = true
  let firstShowOpt: any = null

  /**
   * 处理页面生命周期
   */
  const handlePageCycle = function (
    methodName: string,
    args: any,
    isApp = false,
  ) {
    switch (methodName) {
      case 'onLaunch': {
        // 微信和抖音需要decode，支付宝、快手自己decode过了
        if (process.env.TARO_ENV === 'weapp' || process.env.TARO_ENV === 'tt') {
          // 微信、支付宝、快手、抖音launch之后马上触发的appshow会使用当前的参数，所以这里decode过了，appshow就不需要decode了
          args[0].query = decodeParams(args[0].query || {})
        }
        firstShow = true
        // console.log('inner launch', JSON.stringify(args[0]))
        break
      }

      case 'onLoad': {
        // 微信和抖音需要decode，支付宝、快手自己decode过了
        // 实测抖音第一次进来的时候不需要decode
        if (process.env.TARO_ENV === 'weapp') {
          const pages = getCurrentPages()
          const currentPage = (pages && pages[pages.length - 1]) || {}
          args[0] = decodeParams(args[0] || {})
          currentPage.options = args[0]
        }
        if (process.env.TARO_ENV === 'tt') {
          const strParams = JSON.stringify(args[0] || {})
          const pages = getCurrentPages()
          const currentPage = (pages && pages[pages.length - 1]) || {}
          if (!firstShowOpt || (firstShowOpt && strParams !== firstShowOpt)) {
            args[0] = decodeParams(args[0] || {})
          }
          currentPage.options = args[0]
          currentPage.minifixWithTT = JSON.stringify(args[0])
        }
        firstShowOpt = null
        // console.log('inner load', JSON.stringify(args[0]))

        break
      }

      case 'onShow': {
        if (isApp) {
          if (firstShow) {
            firstShow = false
            firstShowOpt = JSON.stringify(args[0].query || {})
            // console.log('inner first show', JSON.stringify(args[0]))
          } else {
            if (process.env.TARO_ENV === 'weapp') {
              args[0].query = decodeParams(args[0].query || {})
            }
            if (process.env.TARO_ENV === 'tt') {
              const strParams = JSON.stringify(args[0].query || {})
              const pages = getCurrentPages()
              const currentPage = (pages && pages[pages.length - 1]) || {}
              if (strParams !== currentPage.minifixWithTT) {
                args[0].query = decodeParams(args[0].query || {})
              }
            }
            // console.log('inner not first show', JSON.stringify(args[0]))
          }
        }
        break
      }
      default:
        break
    }
    return args
  }

  const wrapMethod = function (target: any, methodName: string, isApp = false) {
    const methodFunc = target[methodName]
    target[methodName] = function (...args: any) {
      try {
        const factoryOptions = handlePageCycle(methodName, args, isApp)
        return methodFunc.apply(this, factoryOptions)
      } catch (e) {
        console.info('antmjs wrapMethod error', e)
      }

      return methodFunc.apply(this, args)
    }
  }

  const filterFunctions = (obj: any, isApp = false) => {
    try {
      if (obj) {
        Object.keys(obj)
          .filter((prop) => typeof obj[prop] === 'function')
          .forEach((methodName) => {
            wrapMethod(obj, methodName, isApp)
          })
      }
    } catch (e) {
      console.info('antmjs filterFunctions error', e)
    }
  }

  Page = (page: any) => {
    filterFunctions(page)
    oriPage(page)
  }

  Component = (component: any) => {
    component.methods && filterFunctions(component.methods)
    oriComponent(component)
  }

  App = (page: any) => {
    filterFunctions(page, true)
    oriApp(page)
  }
}

if (
  process.env.TARO_ENV === 'weapp' ||
  process.env.TARO_ENV === 'alipay' ||
  process.env.TARO_ENV === 'kwai' ||
  process.env.TARO_ENV === 'tt'
) {
  smoothOutParams()
}

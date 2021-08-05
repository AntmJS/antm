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
  let firstLoad = false

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
        firstLoad = true
        // 微信和抖音需要decode，支付宝自己decode过了
        if (process.env.TARO_ENV === 'weapp' || process.env.TARO_ENV === 'tt') {
          const params = JSON.parse(JSON.stringify(args[0].query || {}))
          args[0].query = decodeParams(params)
        }
        break
      }

      case 'onLoad': {
        // 微信和抖音需要decode，支付宝自己decode过了
        // 实测抖音第一次进来的时候不需要decode
        if (
          process.env.TARO_ENV === 'weapp' ||
          (process.env.TARO_ENV === 'tt' && !firstLoad)
        ) {
          const pages = getCurrentPages()
          const currentPage = pages[pages.length - 1]
          const options = JSON.parse(JSON.stringify(currentPage.options || {}))
          currentPage.options = decodeParams(options)

          const params = JSON.parse(JSON.stringify(args[0] || {}))
          args[0] = decodeParams(params)
        }

        if (firstLoad) {
          firstLoad = false
        }
        break
      }

      case 'onShow': {
        if (isApp) {
          // 微信和抖音需要decode，支付宝自己decode过了
          if (
            process.env.TARO_ENV === 'weapp' ||
            process.env.TARO_ENV === 'tt'
          ) {
            const params = JSON.parse(JSON.stringify(args[0].query || {}))
            args[0].query = decodeParams(params)
          }
        }
        break
      }
      default:
        break
    }
  }

  const wrapMethod = function (target: any, methodName: string, isApp = false) {
    const methodFunc = target[methodName]
    target[methodName] = function (...args: any) {
      try {
        handlePageCycle(methodName, args, isApp)
      } catch (e) {
        console.info('ace-mini wrapMethod error', e)
      }

      return methodFunc.apply(this, args)
    }
  }

  const filterFunctions = (obj: any, isApp = false) => {
    try {
      Object.keys(obj)
        .filter((prop) => typeof obj[prop] === 'function')
        .forEach((methodName) => {
          wrapMethod(obj, methodName, isApp)
        })
    } catch (e) {
      console.info('ace-mini filterFunctions error', e)
    }
  }

  Page = (page: any) => {
    filterFunctions(page)
    oriPage(page)
  }

  Component = (component: any) => {
    filterFunctions(component.methods)
    oriComponent(component)
  }

  App = (page: any) => {
    filterFunctions(page, true)
    oriApp(page)
  }
}

if (process.env.TARO_ENV === 'weapp' || process.env.TARO_ENV === 'tt') {
  smoothOutParams()
}

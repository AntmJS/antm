/* eslint-disable @typescript-eslint/no-empty-function */
import { decodeParams, stringify } from '@antmjs/utils'
import type Trace from '../types/index.d'

declare const my: any
declare const wx: any
declare const tt: any
declare const swan: any
declare const qq: any
declare const getCurrentPages: any
// eslint-disable-next-line prefer-const
declare let App: any
// eslint-disable-next-line prefer-const
declare let Page: any
// eslint-disable-next-line prefer-const
declare let Component: any

import {
  EGcs,
  EAppType,
  EAppSubType,
  ELf,
  EMlf,
  utf8ToBytes,
  getUuid,
} from './common'

const minins =
  typeof wx === 'object'
    ? wx
    : typeof my === 'object'
    ? my
    : typeof tt === 'object'
    ? tt
    : typeof tt === 'object'
    ? swan
    : typeof swan === 'object'
    ? qq
    : undefined

minins?.onError?.((res: any) => {
  pushMonitorData(EMlf.js, {
    d1:
      toString.call(res) === '[object Error]'
        ? res.toString()
        : JSON.stringify(res),
  })
})
minins?.onUnhandledRejection?.((res: any) => {
  pushMonitorData(EMlf.promise, {
    d1:
      toString.call(res) === '[object Error]'
        ? res.toString()
        : JSON.stringify(res),
  })
})

const cache: any = {
  appOpts: {},
  requestQueueList: [],
  monitorQueueList: [],
  prePageRoute: {},
  curPageRoute: {},
  appLaunchStartTime: Date.now(),
  appShowStartTime: Date.now(),
  pageShowStartTime: Date.now(),
}

let globalOptions: Trace.IOptions = {
  interval: 0,
}
let globalConfig: Trace.InitOption
let firstLoad = false
let uuid = ''
let net = ''
let battery = ''
let uid = ''
let gid: Trace.TGender = ''
let sysInfo: any
let location: Trace.ILocation

function setCommonTrackData() {
  const minins =
    typeof wx === 'object'
      ? wx
      : typeof my === 'object'
      ? my
      : typeof tt === 'object'
      ? tt
      : undefined
  if (!uuid) {
    minins.getStorage({
      key: 'mgstat_uuid',
      success(res: any) {
        if (res?.data) {
          uuid = res.data
        } else {
          uuid = getUuid()
          minins.setStorage({
            key: 'mgstat_uuid',
            data: uuid,
          })
        }
      },
      fail() {
        uuid = getUuid()
        minins.setStorage({ key: 'mgstat_uuid', data: uuid })
      },
    })
  }

  if (!net) {
    try {
      minins.getNetworkType({
        success(res: any) {
          if (res.networkType) {
            net = res.networkType
          }
        },
        fail() {},
      })
    } catch (e) {}
  }

  if (!battery) {
    try {
      minins.getBatteryInfo({
        success(res: any) {
          if (res.level) {
            battery = res.level.toString()
          }
        },
        fail() {},
      })
    } catch (e) {}
  }

  if (!sysInfo) {
    try {
      minins.getSystemInfo({
        success(res: any) {
          sysInfo = res
          if (!battery && typeof tt === 'object')
            battery = res.battery?.toString() ?? ''
        },
        fail() {},
      })
    } catch (e) {}
  }

  if (!location) {
    const promiseLocation = globalConfig!.getLocation()
    promiseLocation
      ?.then((loc) => {
        location = loc
      })
      .catch(() => {})
  }

  if (!uid) {
    const promiseUid = globalConfig!.getUserId()
    promiseUid
      ?.then((userId) => {
        uid = userId
      })
      .catch(() => {})
  }

  if (!gid) {
    const promiseGid = globalConfig!.getGenderId()
    promiseGid
      ?.then((genderId) => {
        gid = genderId
      })
      .catch(() => {})
  }
}

function getCommonTrackData(): Trace.ISystemLog &
  Trace.ILocationLog &
  Trace.IAppLog {
  const systemLog: Trace.ISystemLog = {
    os: sysInfo?.platform.toLowerCase() ?? '', // 手机操作系统
    os_v: sysInfo?.system?.toLowerCase() ?? '', // 手机操作系统版本
    os_net: net, // 网络
    os_br: sysInfo?.brand?.toLowerCase() ?? '', // 手机品牌 iphone
    os_pm: sysInfo?.model?.toLowerCase() ?? '', // 手机型号 iphone 12
    os_pr: sysInfo?.pixelRatio?.toString() ?? '', // number设备像素比
    os_cb: battery, // number电池电量
    os_ua: navigator?.userAgent ?? '',
  }

  const locationLog: Trace.ILocationLog = {
    os_gcs: location?.gcs ?? EGcs.unknown, // 坐标系
    os_lng: location?.longitude ?? '', // 经度
    os_lat: location?.latitude ?? '', // 纬度
  }

  const appLog: Trace.IAppLog = {
    ap_t: globalConfig!.appType, // 应用类型
    ap_v: sysInfo?.version ?? '', // 应用版本
    ap_st: globalConfig!.appSubType, // 应用内应用类型
    ap_stv: globalConfig!.appSubTypeVersion, // 应用内应用版本号
    ap_stmv:
      typeof my === 'object' ? my.SDKVersion ?? '' : sysInfo?.SDKVersion ?? '', // 小程序基础库版本 没有则为空字符串
    ap_id: globalConfig!.appId, // 应用ID
    ap_uid: uid, // userId
    ap_uuid: uuid, // uuid
    ap_gid: gid, // genderId
  }

  return Object.assign({}, systemLog, locationLog, appLog)
}

function pushTrackData(
  life: ELf,
  query?: Partial<Trace.ITrackLog & Trace.IDeliveryLog>,
) {
  const trackData = getCommonTrackData()
  const track: Trace.ITrackLog = {
    lf: life,
    dr: (Date.now() - cache.appLaunchStartTime).toString(), // 应用停留时间
    t: Date.now().toString(), // 触发该事件的时间戳

    cr: cache.curPageRoute.path || '', // 当前路由 href.split('?')[0]
    crq: stringify(cache.curPageRoute.options, false), // 当前路由参数 href.split('?')[1]
    orid: cache.curPageRoute.options?.orid || '', // 渠道标识符

    pr: cache.prePageRoute.path || '', // 当前路由 href.split('?')[0]
    prq: stringify(cache.prePageRoute.options, false), // 当前路由参数 href.split('?')[1]
    prt: cache.prePageRoute.prt || '0',

    ext: JSON.stringify(cache.appOpts), // object string lf === 'as' wsr lf === 'ck' ext
    abt: '0', // 应用第一次打开到应用关闭的时间
    ckid: '', // 点击的唯一识别符
  }
  const data = Object.assign({}, trackData, track, query || {})
  cache.requestQueueList.push(data)
}

function pushMonitorData(life: EMlf, query: Partial<Trace.IMonitorLog>) {
  const trackData = getCommonTrackData()
  const monitor: Trace.IMonitorLog = {
    lf: life,
    t: Date.now().toString(), // 触发该事件的时间戳
    cr: cache.curPageRoute?.path || '', // 当前路由 href.split('?')[0]
    crq: stringify(cache.curPageRoute?.options ?? {}, false), // 当前路由参数 href.split('?')[1]
    pr: cache.prePageRoute?.path || '', // 当前路由 href.split('?')[0]
    prq: stringify(cache.prePageRoute.options, false), // 当前路由参数 href.split('?')[1]
    prt: cache.prePageRoute.prt || '0',
    d1: '',
    d2: '',
    d3: '',
    d4: '',
    d5: '',
  }
  const data = Object.assign({}, trackData, monitor, query)
  cache.monitorQueueList.push(data)
}

function fetchTrackData(immediate = false) {
  if (cache.requestQueueList.length > 0 && uuid) {
    let list = cache.requestQueueList.splice(0)
    if (!list[0].ap_uuid) {
      list = list.map((item: any) => {
        item.ap_uuid = uuid

        return item
      })
    }
    if (immediate) {
      list.forEach((item: Trace.TLog) => {
        globalConfig!.request('log', item)
      })
    } else {
      globalConfig!.request('log', list)
    }
  }
}

function fetchMonitorData(immediate = false) {
  if (cache.monitorQueueList.length > 0 && uuid) {
    let list = cache.monitorQueueList.splice(0)
    if (!list[0].ap_uuid) {
      list = list.map((item: any) => {
        item.ap_uuid = uuid

        return item
      })
    }
    if (immediate) {
      list.forEach((item: Trace.TMonitor) => {
        globalConfig!.request('monitor', item)
      })
    } else {
      globalConfig.request('monitor', list)
    }
  }
}

const oriApp = App
const oriPage = Page
const oriComponent = Component

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
      if (!globalConfig) {
        console.error(
          '请在入口文件添加"import Trace from \'@antmjs/trace\'"，然后初始化该应用执行"Trace({})"',
        )
      }
      firstLoad = true
      let params = args && JSON.parse(JSON.stringify(args[0]?.query || {}))
      // 微信和抖音需要decode，支付宝自己decode过了
      if (
        globalConfig!.appSubType === EAppSubType.weapp ||
        globalConfig!.appSubType === EAppSubType.tt
      ) {
        params = decodeParams(params)
      }
      cache.appOpts = Object.assign({}, args[0], { query: params })
      break
    }

    case 'onLoad': {
      setCommonTrackData()
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const route = currentPage.route || currentPage.__route__
      const options = JSON.parse(JSON.stringify(currentPage.options || {}))
      // 缓存上一个页面的数据以及上一个页面的停留时长
      const now = Date.now()
      const prt = (now - cache.pageShowStartTime).toString()
      cache.prePageRoute = { prt, ...cache.curPageRoute }
      cache.pageShowStartTime = now

      // 微信和抖音需要decode，支付宝自己decode过了
      // 实测抖音第一次进来的时候不需要decode
      if (
        globalConfig!.appSubType === EAppSubType.weapp ||
        (globalConfig!.appSubType === EAppSubType.tt && !firstLoad)
      ) {
        cache.curPageRoute = {
          path: route,
          options: decodeParams(options),
        }
      } else {
        cache.curPageRoute = {
          path: route,
          options: options,
        }
      }

      if (firstLoad) {
        firstLoad = false
      }
      break
    }

    case 'onShow': {
      if (isApp) {
        cache.appShowStartTime = Date.now()
        pushTrackData(ELf.as)
      } else {
        pushTrackData(ELf.ps)
      }
      break
    }

    case 'onHide': {
      if (isApp) {
        pushTrackData(ELf.ah, {
          abt: (Date.now() - cache.appShowStartTime).toString(),
        })
        if (globalOptions.interval !== 0) {
          fetchTrackData()
          fetchMonitorData()
        }
      }
      break
    }
    default:
      break
  }
}

/**
 * 处理页面事件
 */
const handleEvents = function (args: any) {
  if (args?.length) {
    const arg1 = args[0]

    if (arg1?.type === 'touchstart') {
      let ckid = arg1.currentTarget?.dataset?.ckid
      let clickId = arg1.currentTarget?.dataset?.clickId
      let ext = arg1.currentTarget?.dataset?.ext
      if (!ckid && !clickId && globalConfig?.getElementById) {
        const { dataset } = globalConfig.getElementById(arg1.target.id)
        ckid = dataset?.ckid
        clickId = dataset?.clickId
        ext = dataset?.ext
      }

      if (ckid || clickId) {
        ext = ext || {}
        pushTrackData(ELf.ck, {
          ckid: (ckid || clickId).toString(),
          ext: JSON.stringify(Object.assign({ ap_opts: cache.appOpts }, ext)),
        })
      }
    }
  }
}

/**
 * 为页面所有方法加入埋点的钩子
 */
const wrapMethod = function (target: any, methodName: string, isApp = false) {
  const methodFunc = target[methodName]
  target[methodName] = function (...args: any) {
    try {
      handlePageCycle(methodName, args, isApp)
      handleEvents([].slice.call(args))
    } catch (e) {
      console.info('trace wrapMethod error', e)
    }

    return methodFunc.apply(this, args)
  }
}

/**
 * 过滤出所有的方法供二次包装
 */
const filterFunctions = (obj: any, isApp = false) => {
  try {
    Object.keys(obj)
      .filter((prop) => typeof obj[prop] === 'function')
      .forEach((methodName) => {
        wrapMethod(obj, methodName, isApp)
      })
  } catch (e) {
    console.info('trace filterFunctions error', e)
  }
}

App = (page: any) => {
  filterFunctions(page, true)
  oriApp(page)
}

Page = (page: any) => {
  filterFunctions(page)
  oriPage(page)
}

Component = (component: any) => {
  filterFunctions(component.methods)
  oriComponent(component)
}

export { utf8ToBytes, EGcs, EAppType, EAppSubType, EMlf }

export default function (
  init: Trace.InitOption,
  options?: Trace.IOptions,
): Trace.IMethods {
  // 初始化配置信息
  globalConfig = init
  globalOptions = { ...globalOptions, ...(options || {}) }

  // 非实时输出
  if (globalOptions.interval !== 0) {
    cache.__timer__ && clearInterval(cache.__timer__)
    cache.__timer__ = setInterval(() => {
      fetchTrackData()
      fetchMonitorData()
    }, globalOptions.interval)
  } else {
    while (true) {
      fetchTrackData(true)
      fetchMonitorData(true)
    }
  }

  // 投放使用
  function exposure(
    resourceId: string,
    componentId: string,
    planId: string,
  ): void {
    pushTrackData(ELf.ss, {
      so_id: resourceId, // 资源位ID
      so_cid: componentId, // 组件ID
      so_pid: planId, // 计划ID
    })
  }

  // 基础埋点使用
  function log(id: string, ext: Trace.TAnyObject): void {
    pushTrackData(ELf.ck, {
      ckid: id.toString(),
      ext: JSON.stringify(Object.assign({ ap_opts: cache.appOpts }, ext)),
    })
  }

  // 异常监控使用
  function monitor(
    life: EMlf,
    query: Partial<Pick<Trace.IMonitorLog, 'd1' | 'd2' | 'd3' | 'd4' | 'd5'>>,
  ): void {
    pushMonitorData(life, query)
  }

  return {
    exposure,
    log,
    monitor,
  }
}

/* eslint-disable @typescript-eslint/no-empty-function */
import type Trace from '../types/index.d'
import { stringify, parse } from '@antmjs/utils'
import MobileDetect from 'mobile-detect'
import history from 'history/browser'
import {
  EGcs,
  EAppType,
  EAppSubType,
  ELf,
  EMlf,
  utf8ToBytes,
  getUuid,
} from './common'

// 监听异常
// 可疑区域增加 try-catch
// 全局监控 JS 异常 window.onerror
// 全局监控静态资源异常 window.addEventListener
// 捕获没有 catch 的 Promise 异常用 unhandledrejection
// Vue errorHandler 和 React componentDidCatch
// Axios 请求统一异常处理用拦截器 interceptors
// 使用日志监控服务收集用户错误信息
// script 跨域 <script src="http://jartto.wang/main.js" crossorigin></script>
// window.onerror 函数只有在返回 true 的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 Uncaught Error: xxxxx
window.onerror = function (
  message /** 错误信息 */,
  source /** 出错文件 */,
  lineno /** 行号 */,
  colno /** 列号 */,
  error /** 错误对象 */,
) {
  if (process.env.NODE_ENV === 'development') {
    console.error(
      message /** 错误信息 */,
      source /** 出错文件 */,
      lineno /** 行号 */,
      colno /** 列号 */,
      error /** 错误对象 */,
    )
  }
  pushMonitorData(EMlf.js, {
    d1:
      toString.call(error) === '[object Error]'
        ? error!.toString()
        : JSON.stringify(error),
    d2: JSON.stringify(message || ''),
    d3: JSON.stringify(source || ''),
    d4: JSON.stringify(lineno || ''),
    d5: JSON.stringify(colno || ''),
  })
}
window.addEventListener(
  'error',
  function (res) {
    if (process.env.NODE_ENV === 'development') {
      console.error(res)
    }
    pushMonitorData(EMlf.js, {
      d1:
        toString.call(res.error) === '[object Error]'
          ? res.error!.toString()
          : JSON.stringify(res.error),
      d2: JSON.stringify(res.message || ''),
      d3: JSON.stringify(res.filename || ''),
      d4: JSON.stringify(res.lineno || ''),
      d5: JSON.stringify(res.colno || ''),
    })
  },
  true,
)
// 如果去掉控制台的异常显示，需要加上event.preventDefault();
window.addEventListener(
  'unhandledrejection',
  function (res) {
    pushMonitorData(EMlf.promise, {
      d1:
        toString.call(res) === '[object Error]'
          ? res.toString()
          : JSON.stringify(res),
    })
  },
  true,
)

const cache: any = {
  appOpts: {},
  requestQueueList: [],
  monitorQueueList: [],
  prePageRoute: {},
  curPageRoute: {},
  appLaunchStartTime: Date.now(),
  appShowStartTime: Date.now(),
  pageShowStartTime: Date.now(),
  stacks: [],
}

let globalOptions: Trace.IOptions = {
  interval: 0,
}
let globalConfig: Trace.InitOption
let uuid = ''
let net = ''
let battery = ''
let uid = ''
let gid: Trace.TGender = ''
let sysInfo: any
let location: Trace.ILocation

function getStorageSync(key: string): any {
  try {
    const data = window?.localStorage?.getItem?.(key)

    return data && JSON.parse(data)
  } catch (error) {}
}

function setStorageSync(key: string, value: any): void {
  try {
    const data = JSON.stringify(value)

    window?.localStorage?.setItem?.(key, data)
  } catch (error) {}
}

function setCommonTrackData() {
  if (!uuid) {
    uuid = getStorageSync('mgstat_uuid')
    if (!uuid) {
      uuid = getUuid()
      setStorageSync('mgstat_uuid', uuid)
    }
  }

  if (!net) {
    // 兼容性很差，差到没朋友
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection ||
      (navigator as any).msConnection
    if (!connection) {
      net = 'unknown'
    } else {
      if (!isNaN(Number(connection.type))) {
        switch (connection.type) {
          case connection.WIFI:
            net = 'wifi'
            break
          case connection.CELL_3G:
            net = '3g'
            break
          case connection.CELL_2G:
            net = '2g'
            break
          default:
            // ETHERNET, UNKNOWN
            net = 'unknown'
        }
      } else if (connection.type) {
        // Only supports the type value.
        net = connection.type
      } else if (connection.effectiveType) {
        //  effectiveType
        net = connection.effectiveType
      }
    }
  }

  if (!battery && (navigator as any).getBattery) {
    ;(navigator as any)
      .getBattery?.()
      .then((res: any) => {
        battery = ((res?.level ?? 0) * 100).toString()
      })
      .catch(() => {})
  }

  if (!sysInfo) {
    const md = new MobileDetect((navigator as any).userAgent)

    sysInfo = {
      brand: md.mobile(), // 手机品牌
      model: md.mobile(), // 手机型号
      system: md.os(), // 操作系统版本
      pixelRatio: window.devicePixelRatio, // 设备像素比
      screenWidth: window.screen.width, // 屏幕宽度
      screenHeight: window.screen.height, // 屏幕高度
      windowWidth: document.documentElement.clientWidth, // 可使用窗口宽度
      windowHeight: document.documentElement.clientHeight, // 可使用窗口高度
      version: '', // 微信版本号
      statusBarHeight: '', // 状态栏的高度
      platform: navigator.platform, // 客户端平台
      language: navigator.language, // 微信设置的语言
      fontSizeSetting: '', // 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px
      SDKVersion: '', // 客户端基础库版本
    }
  }

  if (!location) {
    const promiseLocation = globalConfig.getLocation?.()
    promiseLocation
      ?.then((loc) => {
        location = loc
      })
      .catch(() => {})
  }

  if (!uid) {
    const promiseUid = globalConfig.getUserId?.()
    promiseUid
      ?.then((userId) => {
        uid = userId
      })
      .catch(() => {})
  }

  if (!gid) {
    const promiseGid = globalConfig.getGenderId?.()
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
    os: sysInfo?.platform?.toLowerCase() ?? '', // 手机操作系统
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
    ap_t: globalConfig.appType!, // 应用类型
    ap_v: sysInfo?.version ?? '', // 应用版本
    ap_st: globalConfig.appSubType!, // 应用内应用类型
    ap_stv: globalConfig.appSubTypeVersion!, // 应用内应用版本号
    ap_stmv: sysInfo?.SDKVersion ?? '', // 小程序基础库版本 没有则为空字符串
    ap_id: globalConfig.appId!, // 应用ID
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

// applaunch
function appLaunch() {
  if (!globalConfig) {
    console.error(
      '请在入口文件添加"import Trace from \'@antmjs/trace\'"，然后初始化该应用执行"Trace({})"',
    )
  }
  cache.appOpts = {
    path: window.location.pathname.slice(1),
    query: window.location.search ? parse(window.location.search.slice(1)) : {},
  }
}

// appshow
function appShow() {
  cache.appShowStartTime = Date.now()
  pushTrackData(ELf.as)
}

function appHide() {
  pushTrackData(ELf.ah, {
    abt: (Date.now() - cache.appShowStartTime).toString(),
  })
  if (globalOptions.interval !== 0) {
    fetchTrackData()
    fetchMonitorData()
  }
}

// pageshow

function pageLoad() {
  setCommonTrackData()
  const route = window.location.pathname.slice(1)
  const options = window.location.search
    ? parse(window.location.search.slice(1))
    : {}
  // 缓存上一个页面的数据以及上一个页面的停留时长
  const now = Date.now()
  const prt = (now - cache.pageShowStartTime).toString()
  cache.prePageRoute = { prt, ...cache.curPageRoute }
  cache.pageShowStartTime = now
  cache.curPageRoute = {
    path: route,
    options: options,
  }
}

function pageShow() {
  pushTrackData(ELf.ps)
}

// 监听路由变化

history.listen((res) => {
  if (res.action === 'PUSH' || res.action === 'REPLACE') {
    pageLoad()
  }
  pageShow()
})

// 监听appshow apphide
let hidden = 'hidden',
  visibilityChange = 'visibilitychange',
  changeState = 'visibilityState'
if (typeof document.hidden !== 'undefined') {
  hidden = 'hidden'
  changeState = 'visibilityState'
  visibilityChange = 'visibilitychange' // 标准
} else if (typeof (document as any).mozHidden !== 'undefined') {
  hidden = 'mozHidden'
  changeState = 'mozVisibilityState'
  visibilityChange = 'mozvisibilitychange' // 火狐
} else if (typeof (document as any).msHidden !== 'undefined') {
  hidden = 'msHidden'
  changeState = 'msVisibilityState'
  visibilityChange = 'msvisibilitychange' // IE
} else if (typeof (document as any).webkitHidden !== 'undefined') {
  hidden = 'webkitHidden'
  changeState = 'webkitVisibilityState'
  visibilityChange = 'webkitvisibilitychange' // Chrome
}

// 添加监听器
document.addEventListener(
  visibilityChange,
  function () {
    if ((document as any)[changeState]) {
      if (
        (document as any)[changeState] === 'visible' ||
        (document as any)[changeState] ===
          (document as any).MS_PAGE_VISIBLE?.(1)
      ) {
        // 显示
        appShow()
        pageShow
      }

      if (
        (document as any)[changeState] === 'hidden' ||
        (document as any)[changeState] === (document as any).MS_PAGE_HIDDEN?.(1)
      ) {
        // 隐藏
        appHide()
      }
    } else if (typeof (document as any)[hidden] === 'boolean') {
      if ((document as any)[hidden]) {
        // 隐藏
        appHide()
      } else {
        // 显示
        appShow()
        pageShow()
      }
    }
  },
  false,
)

// window -> div 是捕获阶段
// div -> window 是冒泡阶段
// addEventListener true捕获阶段执行，false冒泡阶段执行
// 由于网络请求异常不会事件冒泡，因此必须在捕获阶段将其捕捉到才行，但是这种方式虽然可以捕捉到网络请求的异常，但是无法判断 HTTP 的状态是 404 还是其他比如 500 等等

// 监听标签点击事件
document.body.addEventListener(
  'ontouchend' in document.createElement('div') ? 'touchstart' : 'mousedown',
  function (e: any) {
    let target: any = e.target
    while (target?.tagName !== 'BODY') {
      let ckid = target!['data-ckid']
      let clickId = target!['data-click-id']
      let ext = target!['data-ext']
      if (!ckid && !clickId) {
        ckid = e.dataset?.ckid
        clickId = e.dataset?.clickId
        ext = e.dataset?.ext
      }

      if (ckid || clickId) {
        ext = ext || {}
        pushTrackData(ELf.ck, {
          ckid: (ckid || clickId).toString(),
          ext: JSON.stringify(Object.assign({ ap_opts: cache.appOpts }, ext)),
        })
        break
      }
      target = target!.parentNode
    }
  },
  false,
)

export { utf8ToBytes, EGcs, EAppType, EAppSubType, EMlf }

export default function (
  init: Trace.InitOption,
  options?: Trace.IOptions,
): Trace.IMethods {
  // 初始化配置信息
  globalConfig = init
  globalOptions = { ...globalOptions, ...(options || {}) }
  appLaunch()
  appShow()
  pageLoad()
  pageShow()

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

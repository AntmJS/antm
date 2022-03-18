/* eslint-disable camelcase */
// page show click add ext

// 地图     大陆/港/澳      台湾省          海外
// 高德      GCJ-02        WGS84          WGS84
// Google   GCJ-02        WGS84          WGS84
// 百度      BD-09/GCJ-02  BD-09/GCJ-02   WGS84
// 国测局规定：互联网地图在国内必须至少使用 GCJ02 进行首次加密，不允许直接使用 WGS84 坐标下的地理数据，同时任何坐标系均不可转换为 WGS84 坐标。因此不存在将 GCJ-02 坐标转换为 WGS84 坐标的官方转换方法
declare enum EGcs {
  unknown = '0',
  wgs84 = '1', // GPS 全球定位系统 一般通过GPS记录仪记录下来的经纬度，就是基于WGS84坐标系的数据
  gcj02 = '2', // 中国国家测绘局制订的地理信息系统的坐标系统，是在WGS84经纬度的基础上执行加密算法而成，火星坐标系
  bd09 = '3', // 百度坐标系
}

declare enum EAppType {
  app = '1',
  browser = '2',
  mini = '3',
}

declare enum EAppSubType {
  ios = '0',
  android = '1',
  browser = '2',
  // 微信小程序
  weapp = '3',
  // 支付宝小程序
  alipay = '4',
  // 抖音小程序
  tt = '5',
  // 百度小程序
  swan = '6',
  // QQ小程序
  qq = '7',
  // 钉钉小程序
  dd = '8',
  // 京东小程序
  jd = '9',
  // 企业微信小程序
  qywx = '10',
  // 支付宝IOT小程序
  iot = '11',
  // 快手小程序
  kwai = '12',
}

declare enum ELf {
  as = '1', // app show
  ah = '2', // app hide
  ps = '3', // page show
  ck = '4', // 自定义埋点
  ss = '5', // 投放资源曝光
}

declare enum EMlf {
  js = '1', // app show
  api = '2', // app hide
  promise = '3', // page show
}

declare namespace Trace {
  type Record<K extends keyof any, T> = {
    [P in K]: T
  }
  type TAnyObject = Record<string, any>

  type TGender = 'f' | 'm' | ''

  interface ILocation {
    gcs: EGcs
    latitude: string
    longitude: string
  }

  interface ISystemLog {
    os: string // 手机操作系统
    os_v: string // 手机操作系统版本
    os_net: string // 网络
    os_br: string // 手机品牌 iphone
    os_pm: string // 手机型号 iphone 12
    os_pr: string // number设备像素比
    os_cb: string // number电池电量
    os_ua: string // useragent
  }

  interface ILocationLog {
    os_gcs: EGcs // 坐标系
    os_lng: string // 经度
    os_lat: string // 纬度
  }

  interface IAppLog {
    ap_t: EAppType // 应用类型
    ap_v: string // 应用版本
    ap_st: EAppSubType // 应用内应用类型
    ap_stv: string // 应用内应用版本号
    ap_stmv: string // 小程序基础库版本 没有则为空字符串
    ap_id: string // 应用ID
    ap_uid: string // userId
    ap_uuid: string // uuid
    ap_gid: TGender // genderId
  }

  interface IDeliveryLog {
    so_id: string // 资源位ID
    so_cid: string // 组件ID
    so_pid: string // 计划ID
  }

  interface ITrackLog {
    lf: ELf
    dr: string // 应用停留时间
    t: string // 触发该事件的时间戳
    cr: string // 当前路由 href.split('?')[0]
    crq: string // 当前路由参数 href.split('?')[1]
    orid: string // 渠道标识符
    pr: string // 上一个路由 lf === 'ps'
    prq: string // 上一个路由 lf === 'ps'
    prt: string // 上一个路由停留时间
    ckid: string // 点击的唯一识别符
    ext: string // object string lf === 'as' wsr lf === 'ck' ext
    abt: string // 应用第一次打开到应用关闭的时间
  }

  interface IMonitorLog {
    lf: EMlf
    t: string
    cr: string // 当前路由 href.split('?')[0]
    crq: string // 当前路由参数 href.split('?')[1]
    pr: string // 上一个路由 lf === 'ps'
    prq: string // 上一个路由 lf === 'ps'
    prt: string // 上一个路由停留时间
    d1: string
    d2: string
    d3: string
    d4: string
    d5: string
  }

  type TLog = ISystemLog &
    ILocationLog &
    IAppLog &
    IDeliveryLog &
    ITrackLog &
    IDeliveryLog
  type TMonitor = ISystemLog & ILocationLog & IAppLog & IMonitorLog

  interface IRequestList {
    log: TLog | TLog[]
    monitor: TMonitor | TMonitor[]
  }

  interface InitOption {
    appId: string
    appType: EAppType
    appSubType: EAppSubType
    appSubTypeVersion: string
    request: <T extends keyof IRequestList>(
      type: T,
      data: IRequestList[T],
    ) => void
    getElementById?: (id: string) => any
    getUserId: () => Promise<string>
    getGenderId: () => Promise<TGender>
    getLocation: () => Promise<ILocation>
  }
  interface IOptions {
    interval: number
  }

  interface IMethods {
    /**
     * 投放系统曝光的时候可以执行此方法，投放点击可以用log，三个id可以放ext内
     *
     * @param {string} resourceId
     * @param {string} componentId
     * @param {string} planId
     */
    exposure: (resourceId: string, componentId: string, planId: string) => void
    /**
     * 无法通过定义埋点的，可以通过该方法进行手工埋点
     *
     * @param {string} id
     * @param {Trace.TAnyObject} ext
     */
    log: (id: string, ext: Trace.TAnyObject) => void

    /**
     * 针对API异常或者脚本异常的统计上报，目前onerror和onUnhandledRejection内部已进行监听
     * 开发者通过这个方法可以自行捕获api异常和jsx异常(componentDidCatch 和 error boundaries)
     *
     * @param {EMlf} life
     * @param {(Partial<Pick<Trace.IMonitorLog, 'd1' | 'd2' | 'd3' | 'd4' | 'd5'>>)} query
     */
    monitor: (
      life: EMlf,
      query: Partial<Pick<Trace.IMonitorLog, 'd1' | 'd2' | 'd3' | 'd4' | 'd5'>>,
    ) => void
  }
}

/**
 * 如果是通过阿里云日志服务的web tracking实现，则需要使用该方法设置x-log-bodyrawsize = utf8ToBytes(JSON.stringify({ __topic__: '', __logs__: [] })).length
 *
 * @param {string} string
 * @param {number} [units]
 * @return {*}  {number[]}
 */
declare function utf8ToBytes(string: string, units?: number): number[]

/**
 * 初始化埋点及异常上报需要的参数或方法
 *
 * @param {Trace.InitOption} init
 */
declare function Trace(
  init: Trace.InitOption,
  option?: Trace.IOptions,
): Trace.IMethods

export { utf8ToBytes, EGcs, EAppType, EAppSubType, EMlf }
export default Trace

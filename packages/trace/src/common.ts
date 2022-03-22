// 地图     大陆/港/澳      台湾省          海外
// 高德      GCJ-02        WGS84          WGS84
// Google   GCJ-02        WGS84          WGS84
// 百度      BD-09/GCJ-02  BD-09/GCJ-02   WGS84
// 国测局规定：互联网地图在国内必须至少使用 GCJ02 进行首次加密，不允许直接使用 WGS84 坐标下的地理数据，同时任何坐标系均不可转换为 WGS84 坐标。因此不存在将 GCJ-02 坐标转换为 WGS84 坐标的官方转换方法
export enum EGcs {
  unknown = '0',
  wgs84 = '1', // GPS 全球定位系统 一般通过GPS记录仪记录下来的经纬度，就是基于WGS84坐标系的数据
  gcj02 = '2', // 中国国家测绘局制订的地理信息系统的坐标系统，是在WGS84经纬度的基础上执行加密算法而成，火星坐标系
  bd09 = '3', // 百度坐标系
}

export enum EAppType {
  app = '1',
  browser = '2',
  mini = '3',
}

export enum EAppSubType {
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

export enum ELf {
  as = '1', // app show
  ah = '2', // app hide
  ps = '3', // page show
  ck = '4', // 自定义埋点
  ss = '5', // 投放资源曝光
}

export enum EMlf {
  js = '1', // app show
  api = '2', // app hide
  promise = '3', // page show
}

export function getUuid(): string {
  function n() {
    return Math.floor(65536 * (1 + Math.random()))
      .toString(16)
      .substring(1)
  }

  return n() + n() + n() + n() + n() + n() + n() + n()
}

// 计算字节数
export function utf8ToBytes(string: string, units?: number): number[] {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes: number[] = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xd7ff && codePoint < 0xe000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xdbff) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xdc00) {
        if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint =
        (((leadSurrogate - 0xd800) << 10) | (codePoint - 0xdc00)) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push((codePoint >> 0x6) | 0xc0, (codePoint & 0x3f) | 0x80)
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        (codePoint >> 0xc) | 0xe0,
        ((codePoint >> 0x6) & 0x3f) | 0x80,
        (codePoint & 0x3f) | 0x80,
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        (codePoint >> 0x12) | 0xf0,
        ((codePoint >> 0xc) & 0x3f) | 0x80,
        ((codePoint >> 0x6) & 0x3f) | 0x80,
        (codePoint & 0x3f) | 0x80,
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

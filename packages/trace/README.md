# @antmjs/trace

> 统一的埋点及异常收集工具

## 安装

```bash
yarn add @antmjs/trace
```

## 使用

纯H5应用需要添加resolve.mainFields(Taro框架构建工具已内置):

```json
{
  resolve: {
    mainFields: ['main:h5'],
  }
}
```

使用要求：

```js
import Trace from '@acejs/trace'
// Taro3需要
import { document } from '@tarojs/runtime'

Trace({
  appId: '',
  appType: process.env.TARO_ENV === 'h5' ? EAppType.browser : EAppType.mini,
  appSubType: process.env.TARO_ENV === 'h5' ? EAppSubType.browser : EAppSubType[process.env.TARO_ENV],
  // 应用内应用版本号（小程序版本号）
  appSubTypeVersion: process.env.DEPLOY_VERSION,
  // Taro3需要
  getElementById: document.getElementById,
  getUserId () {
    return new Promise((resolve) => {
      resolve('')
    })
  },
  getGenderId () {
    return new Promise((resolve) => {
      resolve('')
    })
  },
  getLocation () {
    return new Promise((resolve) => {
      resolve({
        gcs: EGcs.gcj02,
        latitude: '',
        longitude: '',
      })
    })
  },
  request (type, data) {
    if (process.env.API_ENV === 'real') {
      const body = {
        __topic__: '', // appId
        __logs__: data,
      }
      Taro.request({
        url: type === 'log' ? 'https://upload_log' : 'https://upload_monitor',
        method: 'POST',
        header: {
          'x-log-apiversion': '0.6.0',
          'x-log-bodyrawsize': `${utf8ToBytes(JSON.stringify(body)).length}`,
        },
        responseType: 'text',
        dataType: '其他',
        data: body,
        timeout: 10000,
        success () {},
        fail () {},
      })

    } else {
      console.info(type, data)
    }
  },
}, {
  interval: 3000 // 0 代表实时触发, 3000代表每隔3秒触发，前提是内部uuid已生成
})
```

## Description

```js
/**
 * 投放系统曝光的时候可以执行此方法，投放点击可以用log，三个id可以放ext内
 *
 * @param {string} resourceId
 * @param {string} componentId
 * @param {string} planId
 */
declare function exposure (resourceId: string, componentId: string, planId: string): void

/**
 * 无法通过定义埋点的，可以通过该方法进行手工埋点
 *
 * @param {string} id
 * @param {Trace.TAnyObject} ext
 */
declare function log (id: string, ext: Trace.TAnyObject): void

/**
 * 针对API异常或者脚本异常的统计上报，目前onerror和onUnhandledRejection内部已进行监听
 * 开发者通过这个方法可以自行捕获api异常和jsx异常(componentDidCatch 和 error boundaries)等
 *
 * @param {EMlf} life
 * @param {(Partial<Pick<Trace.IMonitorLog, 'd1' | 'd2' | 'd3' | 'd4' | 'd5'>>)} query
 */
declare function monitor (life: EMlf, query: Partial<Pick<Trace.IMonitorLog, 'd1' | 'd2' | 'd3' | 'd4' | 'd5'>>): void

/**
 * 如果是通过阿里云日志服务的web tracking实现，则需要使用该方法设置x-log-bodyrawsize = utf8ToBytes(JSON.stringify({ __topic__: '', __logs__: [] })).length
 *
 * @param {string} string
 * @param {number} [units]
 * @return {*}  {number[]}
 */
declare function utf8ToBytes (string: string, units?: number): number[]

/**
 * 初始化埋点及异常上报需要的参数或方法
 *
 * @param {Trace.IOtions} init
 */
declare function Trace (init: Trace.IOtions): void
```

### 自动触发点击埋点

- H5环境可以自动捕获
- 小程序环境需要定义事件在元素上才能捕获
- 支持data-ckid或者data-click-id，请指定其中一种
- Taro3环境需要在初始化的时候添加getElementById，Taro1和Taro2不需要


```jsx
// Taro环境
<View data-ckid="1" data-ext={{t: ""}} onClick={() => {}}></View>
<View data-click-id="1" data-ext={{t: ""}} onClick={() => {}}></View>
// h5环境
<div data-ckid="1" data-ext={{t: ""}}></div>
<div data-click-id="1" data-ext={{t: ""}}></div>
```

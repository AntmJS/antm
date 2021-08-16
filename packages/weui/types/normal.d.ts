import { CSSProperties } from 'react'
import { ViewProps } from '@tarojs/components/types/View'

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    TARO_ENV:
      | 'weapp'
      | 'swan'
      | 'alipay'
      | 'h5'
      | 'tt'
      | 'qq'
      | 'dd'
      | 'qywx'
      | 'jd'
      | 'iot'
  }
}

declare namespace WEUI {
  interface IBaseComponent extends ViewProps {
    style?: CSSProperties
  }
  type IAnyObject = Record<string, any>
}

export default WEUI

import { CSSProperties } from 'react'

declare namespace NodeJS {
  interface ProcessEnv {
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
  interface IBaseComponent {
    className?: string
    key?: string | number
    id?: string
    style?: CSSProperties
  }
}

export default WEUI

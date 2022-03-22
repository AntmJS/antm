declare global {
  namespace NodeJS {
    export interface ProcessEnv {
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
        | 'kwai'
    }
  }
}

declare namespace MiniFix {
  type Record<K extends keyof any, T> = {
    [P in K]: T
  }
  type IAnyObject = Record<string, any>
  type NoneEmptyArray<T> = [T, ...T[]]
}

export default MiniFix

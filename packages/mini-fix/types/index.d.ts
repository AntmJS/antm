declare global {
  namespace NodeJS {
    export interface ProcessEnv {
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
}

declare namespace MiniFix {
  type Record<K extends keyof any, T> = {
    [P in K]: T
  }
  type IAnyObject = Record<string, any>
  type NoneEmptyArray<T> = [T, ...T[]]
}

export default MiniFix

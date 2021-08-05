declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      TARO_ENV: 'weapp' | 'tt'
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

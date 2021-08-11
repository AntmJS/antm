import { CSSProperties } from 'react'

declare namespace WEUI {
  type Record<K extends keyof any, T> = {
    [P in K]: T
  }
  type IAnyObject = { [key: string]: any }
  // type IAnyObject = Record<string, any>
  type NoneEmptyArray<T> = [T, ...T[]]
  type IFunctionObject = Record<string, (arg?: any) => any>

  interface IBaseComponent {
    className?: string
    key?: string | number
    id?: string
    style?: CSSProperties
  }
}

export default WEUI

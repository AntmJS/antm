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

export { MiniBar } from './miniBar.d'
export { Button, MiniUserButton, MiniPhoneButton } from './button.d'

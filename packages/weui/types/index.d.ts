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
    }
  }
}

export { MiniBar } from './miniBar.d'
export {
  Button,
  MiniUserButton,
  MiniPhoneButton,
  MiniLoginButtonProps,
} from './button.d'
export { SearchBar } from './searchBar.d'
export { ActionSheet, IActionSheetRef } from './actionSheet.d'
export { HalfScreen, IHalfScreenRef } from './halfScreen.d'
export { Modal, IModalRef } from './modal.d'
export { Dialog, IDialogRef } from './dialog.d'

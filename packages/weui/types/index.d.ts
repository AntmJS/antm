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

export { Icon } from './icon.d'
export { Loading } from './loading.d'

export { MiniBar } from './miniBar.d'
export {
  Button,
  MiniLoginButton,
  MiniUserButton,
  MiniPhoneButton,
  MiniLoginButtonProps,
} from './button.d'
export { SearchBar } from './searchBar.d'
export { ActionSheet, ActionSheetItem, IActionSheetRef } from './actionSheet.d'
export { HalfScreen, IHalfScreenRef } from './halfScreen.d'
export { Modal, IModalRef } from './modal.d'
export { Dialog, IDialogRef } from './dialog.d'
export { Badge } from './badge.d'
export { Progress } from './progress.d'
export { Calendar } from './calendar.d'

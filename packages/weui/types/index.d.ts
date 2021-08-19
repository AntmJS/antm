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
export { InputNumber } from './inputNumber.d'
export { Rate } from './rate.d'
export { TabBar } from './tabBar.d'
export { Indexes } from './indexes.d'
export { List } from './list.d'
export { ListItem } from './listItem.d'
export { Radio } from './radio.d'
export { Checkbox } from './checkbox.d'
export { Message, IMessageRef } from './message.d'
export { ImagePicker } from './imagePicker.d'

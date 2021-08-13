import { ComponentClass } from 'react'
import WEUI from './normal'

export interface IDialogRef {
  showDialog: () => void
  hideDialog: () => void
}

export interface DialogProps extends WEUI.IBaseComponent {
  cref: React.MutableRefObject<IDialogRef | undefined>
  children: JSX.Element | string
  onClose?: () => void
}

declare const Dialog: ComponentClass<DialogProps>

export { Dialog }

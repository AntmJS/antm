import { ComponentClass } from 'react'
import WEUI from './normal'

export interface IDialogRef {
  show: () => void
  hide: () => void
}

export interface DialogProps extends WEUI.IBaseComponent {
  cref: React.MutableRefObject<IDialogRef | undefined>
  children: JSX.Element | string | JSX.Element[]
  onClose?: () => void
}

declare const Dialog: ComponentClass<DialogProps>

export { Dialog }

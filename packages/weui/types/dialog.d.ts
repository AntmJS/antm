import { ComponentClass } from 'react'
import WEUI from './normal'

export interface IDialogRef {
  show: () => void
  hide: () => void
}

export interface DialogProps extends WEUI.IBaseComponent {
  cref: React.MutableRefObject<IDialogRef | undefined>
  children: JSX.Element | string | JSX.Element[]
  closeIconFontFamily?: string
  closeIconName?: string
  closeIconPosition?: 'top-left' | 'top-right' | 'bottom-center'
  onClose?: () => void
}

declare const Dialog: ComponentClass<DialogProps>

export { Dialog }

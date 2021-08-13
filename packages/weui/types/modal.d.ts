import { ComponentClass } from 'react'
import WEUI from './normal'

export interface IModalRef {
  showModal: () => void
  hideModal: () => void
}

export interface ModalProps extends WEUI.IBaseComponent {
  cref: React.MutableRefObject<IModalRef | undefined>
  title: string
  content?: string
  onConfirm: () => void
  confirmText: string
  onCancel?: () => void
  cancelText?: string
}

declare const Modal: ComponentClass<ModalProps>

export { Modal }

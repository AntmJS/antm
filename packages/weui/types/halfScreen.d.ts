import { ComponentClass } from 'react'
import WEUI from './normal'

export interface IHalfScreenRef {
  show: () => void
  hide: () => void
}

export interface HalfScreenProps extends WEUI.IBaseComponent {
  cref: React.MutableRefObject<IHalfScreenRef | undefined>
  title?: string
  subTitle?: string
  children: JSX.Element | string | JSX.Element[]
  onClose?: () => void
  onConfirm?: () => void
}

declare const HalfScreen: ComponentClass<HalfScreenProps>

export { HalfScreen }

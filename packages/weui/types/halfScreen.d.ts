import { ComponentClass } from 'react'
import WEUI from './normal'

export interface IHalfScreenRef {
  showHalfScreen: () => void
  hideHalfScreen: () => void
}

export interface HalfScreenProps extends WEUI.IBaseComponent {
  cref: React.MutableRefObject<IHalfScreenRef | undefined>
  title?: string
  subTitle?: string
  children: JSX.Element | string
  onClose?: () => void
}

declare const HalfScreen: ComponentClass<HalfScreenProps>

export { HalfScreen }

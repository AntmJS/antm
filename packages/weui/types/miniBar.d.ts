import { ComponentClass } from 'react'
import WEUI from './normal'

export interface MiniBarProps extends WEUI.IBaseComponent {
  title?: string | React.ReactNode
  fixed?: boolean
  fixedPlaceholder?: boolean
  border?: boolean
  buttonColor?: 'white' | 'black'
  homeUrl: string
}

declare const MiniBar: ComponentClass<MiniBarProps>

export { MiniBar }

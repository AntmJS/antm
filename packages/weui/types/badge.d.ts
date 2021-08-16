import { ComponentClass } from 'react'
import WEUI from './normal'

export interface BadgeProps extends WEUI.IBaseComponent {
  dot?: boolean
  value?: string | number
  maxValue?: number
  children?: JSX.Element | JSX.Element[]
}

declare const Badge: ComponentClass<BadgeProps>

export { Badge }

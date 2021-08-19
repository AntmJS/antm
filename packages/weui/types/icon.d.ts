import { ComponentClass } from 'react'
import WEUI from './normal'

export interface IconProps extends WEUI.IBaseComponent {
  fontFamily?: string
  name: string
}

declare const Icon: ComponentClass<IconProps>

export { Icon }

import { ComponentClass } from 'react'
import WEUI from './normal'

export interface IconProps extends WEUI.IBaseComponent {
  prefixClass?: string
  name: string
}

declare const Icon: ComponentClass<IconProps>

export { Icon }

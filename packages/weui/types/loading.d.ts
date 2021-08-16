import { ComponentClass } from 'react'
import WEUI from './normal'

export interface LoadingProps extends WEUI.IBaseComponent {
  type?: 'primary' | 'similar'
}

declare const Loading: ComponentClass<LoadingProps>

export { Loading }

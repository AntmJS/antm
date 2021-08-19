import { ComponentClass } from 'react'
import WEUI from './normal'

export interface ListProps extends WEUI.IBaseComponent {
  title?: string
  type?: 'list' | 'form'
  children: JSX.Element | JSX.Element[]
}

declare const List: ComponentClass<ListProps>

export { List }

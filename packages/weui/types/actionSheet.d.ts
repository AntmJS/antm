import { ComponentClass } from 'react'
import WEUI from './normal'

export interface Item {
  name: string
  value: any
}

export interface IActionSheetRef {
  show: () => void
  hide: () => void
}

export interface ActionSheetProps extends WEUI.IBaseComponent {
  cref: React.MutableRefObject<IActionSheetRef | undefined>
  title?: string
  subTitle?: string
  children: JSX.Element | JSX.Element[]
  onClose?: () => void
  onCancel?: () => void
}

export interface ActionSheetItemProps extends WEUI.IBaseComponent {
  children: JSX.Element | string | JSX.Element[]
}

declare const ActionSheet: ComponentClass<ActionSheetProps>
declare const ActionSheetItem: ComponentClass<ActionSheetItemProps>

export { ActionSheet, ActionSheetItem }

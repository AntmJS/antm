import { ComponentClass } from 'react'
import WEUI from './normal'

export interface Item {
  name: string
  value: any
}

export interface IActionSheetRef {
  showActionSheet: () => void
  hideActionSheet: () => void
}

export interface ActionSheetProps extends WEUI.IBaseComponent {
  cref: React.MutableRefObject<IActionSheetRef | undefined>
  title?: string
  subTitle?: string
  list?: Item[]
  onSelect?: (value: any) => void
  children?: JSX.Element
  onClose?: () => void
  onCancel?: () => void
}

declare const ActionSheet: ComponentClass<ActionSheetProps>

export { ActionSheet }

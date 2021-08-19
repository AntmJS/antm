import { ComponentClass } from 'react'

import WEUI from './normal'

export interface CheckboxOption<T> {
  value: T
  label: string
  desc?: string
  disabled?: boolean
}

export interface CheckboxProps<T> extends WEUI.IBaseComponent {
  options: Array<CheckboxOption<T>>

  selectedList: Array<T>

  onChange: (selectedList: Array<T>) => void
}

declare const Checkbox: ComponentClass<CheckboxProps<any>>

export { Checkbox }

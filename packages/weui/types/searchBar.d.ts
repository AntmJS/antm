import { ComponentClass } from 'react'
import type { InputProps } from '@tarojs/components/types/Input'
import WEUI from './normal'

export interface SearchBarProps
  extends Omit<InputProps, 'style' | 'ref'>,
    WEUI.IBaseComponent {
  cref: React.MutableRefObject<HTMLInputElement | undefined>
  onClear?: () => void
  onCancel?: () => void
}

declare const SearchBar: ComponentClass<SearchBarProps>

export { SearchBar }

import { ComponentClass } from 'react'
import { ButtonProps as TaroButtonProps } from '@tarojs/components/types/Button'
import WEUI from './normal'

export interface ButtonProps
  extends Omit<TaroButtonProps, 'style' | 'size'>,
    WEUI.IBaseComponent {
  size?: 'small' | 'normal' | 'around' | 'full'
}

declare const Button: ComponentClass<ButtonProps>

export { Button }

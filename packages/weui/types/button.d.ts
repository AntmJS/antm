import { ComponentClass } from 'react'
import { ButtonProps as TaroButtonProps } from '@tarojs/components'
import WEUI from './normal'

interface IWeappUserMessage {
  code: string
  userInfo: Taro.UserInfo
}

interface IWeappPhoneMessage {
  code: string
  iv: string
  encryptedData: string
}

export interface ButtonProps
  extends Omit<TaroButtonProps, 'style' | 'size'>,
    WEUI.IBaseComponent {
  size?: 'small' | 'normal' | 'around' | 'full'
  children: JSX.Element | string
}

export interface MiniUserButtonProps extends WEUI.IBaseComponent {
  /**
   * @memberof ACEMiniUserAuthProps
   * @description 用户信息授权登录
   */
  onGetUserInfo: (res: IWeappUserMessage) => void
  children: JSX.Element | string
  size?: 'small' | 'normal' | 'around' | 'full'
  type?: 'primary' | 'default' | 'warn'
  desc?: string
  loading?: boolean
  disabled?: boolean
}

export interface MiniUserButtonRef {
  /**
   * @memberof MiniUserButtonRef
   * @description 调用login重新更新code
   */
  onUpdateCode: () => void
}

export interface MiniPhoneButtonProps extends WEUI.IBaseComponent {
  /**
   * @memberof MiniPhoneButtonProps
   * @description 手机号授权登录
   */
  onGetPhone: (res: IWeappPhoneMessage) => void
  children: JSX.Element | string
  size?: 'small' | 'normal' | 'around' | 'full'
  type?: 'primary' | 'default' | 'warn'
  desc?: string
  loading?: boolean
  disabled?: boolean
}

export interface MiniPhoneButtonRef {
  /**
   * @memberof MiniUserButtonRef
   * @description 调用login重新更新code
   */
  onUpdateCode: () => void
}

declare const Button: ComponentClass<ButtonProps>
declare const MiniUserButton: ComponentClass<MiniUserButtonProps>
declare const MiniPhoneButton: ComponentClass<MiniPhoneButtonProps>

export { Button, MiniUserButton, MiniPhoneButton }

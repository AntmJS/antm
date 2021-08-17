import { ComponentClass } from 'react'
import Taro from '@tarojs/taro'
import { ButtonProps as TaroButtonProps } from '@tarojs/components'
import { BaseEventOrig } from '@tarojs/components/types/common.d'
import WEUI from './normal'

export interface ButtonProps
  extends Omit<TaroButtonProps, 'style' | 'size'>,
    WEUI.IBaseComponent {
  size?: 'small' | 'normal' | 'around' | 'full'
  children: JSX.Element | string | JSX.Element[]
}

export interface MiniLoginButtonProps extends WEUI.IBaseComponent {
  onFail: (error: Taro.General.CallbackResult) => void
  onGetLoginCode: (loginInfo: Taro.login.SuccessCallbackResult) => void
  children: JSX.Element | string | JSX.Element[]
  size?: 'small' | 'normal' | 'around' | 'full'
  type?: 'primary' | 'default' | 'warn'
  loading?: boolean
  disabled?: boolean
}

export interface MiniUserButtonProps extends WEUI.IBaseComponent {
  onGetUserInfo: (
    userInfo:
      | Taro.UserInfo
      | Taro.getUserProfile.SuccessCallbackResult
      | TaroButtonProps.onGetUserInfoEventDetail,
  ) => void
  onFail: (
    error:
      | Taro.General.CallbackResult
      | BaseEventOrig<TaroButtonProps.onGetUserInfoEventDetail>,
  ) => void
  children: JSX.Element | string | JSX.Element[]
  size?: 'small' | 'normal' | 'around' | 'full'
  type?: 'primary' | 'default' | 'warn'
  desc?: string
  loading?: boolean
  disabled?: boolean
}

export interface MiniPhoneButtonProps extends WEUI.IBaseComponent {
  onFail: (
    error:
      | Taro.General.CallbackResult
      | BaseEventOrig<TaroButtonProps.onGetPhoneNumberEventDetail>,
  ) => void
  onGetPhone: (phoneInfo: TaroButtonProps.onGetPhoneNumberEventDetail) => void
  children: JSX.Element | string | JSX.Element[]
  size?: 'small' | 'normal' | 'around' | 'full'
  type?: 'primary' | 'default' | 'warn'
  desc?: string
  loading?: boolean
  disabled?: boolean
}

declare const Button: ComponentClass<ButtonProps>
declare const MiniLoginButton: ComponentClass<MiniLoginButtonProps>
declare const MiniUserButton: ComponentClass<MiniUserButtonProps>
declare const MiniPhoneButton: ComponentClass<MiniPhoneButtonProps>

export { Button, MiniLoginButton, MiniUserButton, MiniPhoneButton }

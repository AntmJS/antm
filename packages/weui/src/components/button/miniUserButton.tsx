import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { ButtonProps, CommonEventFunction } from '@tarojs/components'
import type { MiniUserButtonProps } from '../../../types/button.d'
import Button from './index'

export default function Index(props: MiniUserButtonProps): JSX.Element {
  const { onGetUserInfo, onFail, desc, children, ...others } = props
  const [userProfile, setUserProfile] = useState(true)

  useEffect(function () {
    setUserProfile(Taro.canIUse('getUserProfile'))
  }, [])

  const getUserProfile = function () {
    Taro.getUserProfile({
      desc: desc || '用于快速登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success(res) {
        onGetUserInfo(res)
      },
      fail(error) {
        onFail(error)
      },
    })
  }

  const getTTUserInfo = function () {
    Taro.getUserInfo({
      success(res) {
        onGetUserInfo(res)
      },
      fail(error) {
        onFail(error)
      },
    })
  }

  const getUserInfo: CommonEventFunction<ButtonProps.onGetUserInfoEventDetail> =
    function (e) {
      if (e.detail) {
        onGetUserInfo(e.detail)
      } else {
        onFail(e)
      }
    }

  return (
    <>
      {userProfile ? (
        <Button {...others} onClick={getUserProfile}>
          {children}
        </Button>
      ) : process.env.TARO_ENV === 'tt' ? (
        <Button {...others} onClick={getTTUserInfo}>
          {children}
        </Button>
      ) : (
        <Button {...others} openType="getUserInfo" onGetUserInfo={getUserInfo}>
          {children}
        </Button>
      )}
    </>
  )
}

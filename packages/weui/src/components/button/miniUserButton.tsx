import {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
  ForwardedRef,
} from 'react'
import Taro from '@tarojs/taro'
import { View, ButtonProps, CommonEventFunction } from '@tarojs/components'
import type {
  MiniUserButtonProps,
  MiniUserButtonRef,
} from '../../../types/button.d'
import Button from './index'

function Index(
  props: MiniUserButtonProps,
  ref: ForwardedRef<MiniUserButtonRef>,
): JSX.Element {
  const { onGetUserInfo, desc, children, ...others } = props
  const [code, setCode] = useState('')
  const [userProfile, setUserProfile] = useState(true)

  const onUpdateCode = () => {
    setCode('')
    Taro.login({
      success(res) {
        setCode(res.code)
      },
    })
  }

  useImperativeHandle(ref, () => ({
    onUpdateCode,
  }))

  useEffect(function () {
    Taro.login({
      success(res) {
        setCode(res.code)
      },
    })
    setUserProfile(Taro.canIUse('getUserProfile'))
  }, [])

  const getUserProfile = function () {
    Taro.getUserProfile({
      desc: desc || '用于快速登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success(res) {
        onGetUserInfo({
          code: code,
          userInfo: res.userInfo,
        })
      },
    })
  }

  const getTTUserInfo = function () {
    Taro.getUserInfo({
      success(res) {
        onGetUserInfo({
          code: code,
          userInfo: res.userInfo,
        })
      },
    })
  }

  const getUserInfo: CommonEventFunction<ButtonProps.onGetUserInfoEventDetail> =
    function (e) {
      if (e.detail.userInfo) {
        onGetUserInfo({
          code: code,
          userInfo: e.detail.userInfo as Taro.UserInfo,
        })
      } else {
        Taro.showToast({
          title: '授权失败，请重试',
        })
      }
    }

  const callLogin = function () {
    Taro.login({
      success(res) {
        setCode(res.code)
        Taro.showToast({
          title: '授权失败，请重试',
        })
      },
      fail() {
        Taro.showToast({
          title: '授权失败，请重试',
        })
      },
    })
  }

  return (
    <>
      {code ? (
        userProfile ? (
          <Button {...others} onClick={getUserProfile}>
            {children}
          </Button>
        ) : process.env.TARO_ENV === 'tt' ? (
          <Button {...others} onClick={getTTUserInfo}>
            {children}
          </Button>
        ) : (
          <Button
            {...others}
            openType="getUserInfo"
            onGetUserInfo={getUserInfo}
          >
            {children}
          </Button>
        )
      ) : (
        <View {...others} onClick={callLogin}>
          {children}
        </View>
      )}
    </>
  )
}

export default forwardRef(Index)

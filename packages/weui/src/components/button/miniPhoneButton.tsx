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
  MiniPhoneButtonProps,
  MiniPhoneButtonRef,
} from '../../../types/button.d'
import Button from './index'

function Index(
  props: MiniPhoneButtonProps,
  ref: ForwardedRef<MiniPhoneButtonRef>,
): JSX.Element {
  const { onGetPhone, children, ...others } = props
  const [code, setCode] = useState('')

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
  }, [])

  const getPhone: CommonEventFunction<ButtonProps.onGetPhoneNumberEventDetail> =
    function (e) {
      if (e.detail.encryptedData) {
        onGetPhone({
          code: code,
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData,
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
        <Button
          {...others}
          openType="getPhoneNumber"
          onGetPhoneNumber={getPhone}
        >
          {children}
        </Button>
      ) : (
        <View {...others} onClick={callLogin}>
          {children}
        </View>
      )}
    </>
  )
}

export default forwardRef(Index)

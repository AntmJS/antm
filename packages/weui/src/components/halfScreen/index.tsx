import { View, Text } from '@tarojs/components'
import type { HalfScreenProps } from '../../../types/halfScreen'
import { useMask } from '../../utils'
import Icon from '../icon'

export default function Index(props: HalfScreenProps) {
  const {
    children,
    title,
    subTitle,
    className,
    onClose,
    onConfirm,
    cref,
    ...others
  } = props
  const { maskRef, isShowMask } = useMask(cref)
  return (
    <View>
      <View
        className="weui-mask"
        style={{ display: 'none' }}
        ref={maskRef}
        onClick={() => {
          cref.current!.hide()
          onClose?.()
        }}
      ></View>
      <View
        className={`weui-half-screen-dialog weui-slideup-default ${
          isShowMask ? 'weui-slideup-show' : ''
        } ${className || ''}`}
        {...others}
      >
        <View className="weui-half-screen-dialog__hd">
          <View className="weui-half-screen-dialog__hd__side">
            <Icon
              name="weui-close"
              className="weui-icon-btn"
              onClick={() => {
                cref.current!.hide()
                onClose?.()
              }}
            />
          </View>
          <View className="weui-half-screen-dialog__hd__main">
            {!title && !subTitle && (
              <Text className="weui-half-screen-dialog__title">面板</Text>
            )}
            {title && (
              <Text className="weui-half-screen-dialog__title">{title}</Text>
            )}
            {subTitle && (
              <Text className="weui-half-screen-dialog__subtitle">
                {subTitle}
              </Text>
            )}
          </View>
          <View className="weui-half-screen-dialog__hd__side">
            {onConfirm && (
              <Icon
                name="weui-check"
                className="weui-icon-btn"
                onClick={onConfirm}
              />
            )}
          </View>
        </View>
        <View className="weui-half-screen-dialog__bd">{children}</View>
      </View>
    </View>
  )
}

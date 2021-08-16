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
        className="antmui-mask"
        style={{ display: 'none' }}
        ref={maskRef}
        onClick={() => {
          cref.current!.hide()
          onClose?.()
        }}
      ></View>
      <View
        className={`antmui-half-screen-dialog antmui-slideup-default ${
          isShowMask ? 'antmui-slideup-show' : ''
        } ${className || ''}`}
        {...others}
      >
        <View className="antmui-half-screen-dialog__hd">
          <View className="antmui-half-screen-dialog__hd__side">
            <Icon
              name="antmui-close"
              className="antmui-icon-btn"
              onClick={() => {
                cref.current!.hide()
                onClose?.()
              }}
            />
          </View>
          <View className="antmui-half-screen-dialog__hd__main">
            {!title && !subTitle && (
              <Text className="antmui-half-screen-dialog__title">面板</Text>
            )}
            {title && (
              <Text className="antmui-half-screen-dialog__title">{title}</Text>
            )}
            {subTitle && (
              <Text className="antmui-half-screen-dialog__subtitle">
                {subTitle}
              </Text>
            )}
          </View>
          <View className="antmui-half-screen-dialog__hd__side">
            {onConfirm && (
              <Icon
                name="antmui-check"
                className="antmui-icon-btn"
                onClick={onConfirm}
              />
            )}
          </View>
        </View>
        <View className="antmui-half-screen-dialog__bd">{children}</View>
      </View>
    </View>
  )
}

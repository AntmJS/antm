import { View, Text } from '@tarojs/components'
import type { ActionSheetProps } from '../../../types/actionSheet'
import { useMask } from '../../utils'

export default function Index(props: ActionSheetProps) {
  const {
    title,
    subTitle,
    onClose,
    onCancel,
    cref,
    className,
    children,
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
        className={`antmui-actionsheet antmui-slideup-default ${
          isShowMask ? 'antmui-slideup-show' : ''
        } ${className || ''}`}
        {...others}
      >
        <View className="antmui-actionsheet__title">
          {!title && !subTitle && (
            <Text className="antmui-actionsheet__title-text">菜单</Text>
          )}
          {title && (
            <Text className="antmui-actionsheet__title-text">{title}</Text>
          )}
          {subTitle && (
            <Text className="antmui-actionsheet__subtitle-text">
              {subTitle}
            </Text>
          )}
        </View>
        <View className="antmui-actionsheet__menu">{children}</View>
        <View className="antmui-actionsheet__action">
          <View
            className="antmui-actionsheet__cell"
            onClick={() => {
              cref.current!.hide()
              onCancel?.()
            }}
          >
            取消
          </View>
        </View>
      </View>
    </View>
  )
}

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
        className="weui-mask"
        style={{ display: 'none' }}
        ref={maskRef}
        onClick={() => {
          cref.current!.hide()
          onClose?.()
        }}
      ></View>
      <View
        className={`weui-actionsheet weui-slideup-default ${
          isShowMask ? 'weui-slideup-show' : ''
        } ${className || ''}`}
        {...others}
      >
        <View className="weui-actionsheet__title">
          {!title && !subTitle && (
            <Text className="weui-actionsheet__title-text">菜单</Text>
          )}
          {title && (
            <Text className="weui-actionsheet__title-text">{title}</Text>
          )}
          {subTitle && (
            <Text className="weui-actionsheet__subtitle-text">{subTitle}</Text>
          )}
        </View>
        <View className="weui-actionsheet__menu">{children}</View>
        <View className="weui-actionsheet__action">
          <View
            className="weui-actionsheet__cell"
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

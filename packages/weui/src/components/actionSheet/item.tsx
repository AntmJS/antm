import { View } from '@tarojs/components'
import { ActionSheetItemProps } from '../../../types/actionSheet'

export default function Index(props: ActionSheetItemProps) {
  const { children, className, ...others } = props
  return (
    <View className={`weui-actionsheet__cell ${className || ''}`} {...others}>
      {children}
    </View>
  )
}

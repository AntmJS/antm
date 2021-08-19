import { View, Text } from '@tarojs/components'
import { ListItemProps } from '../../../types/listItem'

export default function Index(props: ListItemProps) {
  const {
    labelRender,
    contentRender,
    actionRender,
    access,
    className,
    ...others
  } = props
  return (
    <View
      className={`antmui-cell  ${access ? 'antmui-cell_active' : ''} ${
        className || ''
      }`}
      {...others}
    >
      <View className="antmui-cell__hd">
        {typeof labelRender === 'string' ? (
          <Text className="antmui-label">{labelRender}</Text>
        ) : (
          labelRender
        )}
      </View>
      <View className="antmui-cell__bd">{contentRender}</View>
      <View className="antmui-cell__ft">{actionRender}</View>
    </View>
  )
}

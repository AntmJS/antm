import { View } from '@tarojs/components'
import { ListProps } from '../../../types/list'

export default function Index(props: ListProps) {
  const { title, type = 'list', children, className, ...others } = props
  return (
    <View className={type === 'list' ? '' : 'antmui-cells__group_form'}>
      {title && <View className="antmui-cells__title">{title}</View>}
      <View className={`${className || ''}`} {...others}>
        <View className={'antmui-cells'}>{children}</View>
      </View>
    </View>
  )
}

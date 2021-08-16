import { Text } from '@tarojs/components'
import { LoadingProps } from '../../../types/loading'

export default function Index(props: LoadingProps) {
  const { type, className, ...others } = props
  let cls = 'antmui-primary-loading'
  if (type === 'primary') {
    cls += ' antmui-primary-loading_primary'
  } else if (type === 'similar') {
    cls += ' antmui-primary-loading_similar'
  }
  return (
    <Text className={`${cls} ${className || ''}`} {...others}>
      <Text className="antmui-primary-loading__dot"></Text>
    </Text>
  )
}

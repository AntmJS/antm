import { Text } from '@tarojs/components'
import { LoadingProps } from '../../../types/loading'

export default function Index(props: LoadingProps) {
  const { type, className, ...others } = props
  let cls = 'weui-primary-loading'
  if (type === 'primary') {
    cls += ' weui-primary-loading_primary'
  } else if (type === 'similar') {
    cls += ' weui-primary-loading_similar'
  }
  return (
    <Text className={`${cls} ${className || ''}`} {...others}>
      <Text className="weui-primary-loading__dot"></Text>
    </Text>
  )
}

import { Text } from '@tarojs/components'
import { IconProps } from '../../../types/icon'

export default function Index(props: IconProps) {
  const { prefixClass = 'antmuifont', name, className, ...others } = props
  let activeCls = ''
  if (prefixClass && others.onClick) {
    activeCls = name + '-active'
  }
  return (
    <Text
      className={`antmui-icon ${prefixClass} ${name} ${activeCls} ${
        className || ''
      }`}
      {...others}
    />
  )
}

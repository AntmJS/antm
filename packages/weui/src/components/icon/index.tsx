import { Text } from '@tarojs/components'
import { IconProps } from '../../../types/icon'

export default function Index(props: IconProps) {
  const { prefixClass = 'weuifont', name, className, ...others } = props
  let activeCls = ''
  if (prefixClass && others.onClick) {
    activeCls = name + '-active'
  }
  console.log(name, 77778, activeCls)
  return (
    <Text
      className={`weui-icon ${prefixClass} ${name} ${activeCls} ${
        className || ''
      }`}
      {...others}
    />
  )
}

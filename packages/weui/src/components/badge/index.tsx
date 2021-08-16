import { View } from '@tarojs/components'
import { BadgeProps } from '../../../types/badge'

export default function Index(props: BadgeProps) {
  const {
    dot,
    value,
    maxValue = 99,
    children,
    className = '',
    ...others
  } = props

  function formatValue(
    value: string | number | undefined,
    maxValue: number,
  ): string | number {
    if (value === '' || value === null || typeof value === 'undefined')
      return ''
    const numValue = +value
    if (Number.isNaN(numValue)) {
      return value
    }
    return numValue > maxValue ? `${maxValue}+` : numValue
  }

  const val = formatValue(value, maxValue)

  return (
    <View className={`antmui-badge ${className}`} {...others}>
      {children}
      {dot ? (
        <View className="antmui-badge__dot"></View>
      ) : (
        val !== '' && <View className="antmui-badge__num">{val}</View>
      )}
    </View>
  )
}

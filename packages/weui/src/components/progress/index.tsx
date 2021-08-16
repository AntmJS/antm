import { View } from '@tarojs/components'
import Icon from '../icon'
import { ProgressProps } from '../../../types/progress'

export default function Index(props: ProgressProps) {
  const {
    strokeWidth,
    status,
    isHidePercent,
    className = '',
    ...others
  } = props
  let { percent } = props

  if (typeof percent !== 'number') {
    percent = 0
  }

  if (percent < 0) {
    percent = 0
  } else if (percent > 100) {
    percent = 100
  }

  const progressStyle = {
    width: percent && `${+percent}%`,
    height: strokeWidth && `${+strokeWidth}px`,
  }

  return (
    <View
      className={`antmui-progress ${
        !!status ? `antmui-progress--${status}` : ''
      } ${className}`}
      {...others}
    >
      <View className="antmui-progress__outer">
        <View className="antmui-progress__outer-inner">
          <View
            className="antmui-progress__outer-inner-background"
            style={progressStyle}
          />
        </View>
      </View>

      {!isHidePercent && (
        <View className="antmui-progress__content">
          {!status || status === 'progress' ? (
            `${percent}%`
          ) : (
            <Icon
              name={
                status === 'error' ? 'antmui-round-close' : 'antmui-round-check'
              }
              className={`antmui-icon ${
                status === 'error' ? 'antmui-round-close' : 'antmui-round-check'
              }`}
            ></Icon>
          )}
        </View>
      )}
    </View>
  )
}

import { View } from '@tarojs/components'
import type { DialogProps } from '../../../types/dialog'
import Icon from '../icon'
import { useMask } from '../../utils'

export default function Index(props: DialogProps) {
  const {
    closeIconFontFamily = 'antmuifont',
    closeIconName = 'antmui-round-close-fill',
    closeIconPosition = 'top-right',
    onClose,
    cref,
    className,
    children,
    ...others
  } = props
  const { maskRef } = useMask(cref)

  return (
    <View className="antmui-mask" style={{ display: 'none' }} ref={maskRef}>
      <View
        className={`antmui-dialog antmui-dialog-min-height ${className || ''}`}
        {...others}
      >
        {onClose && (
          <Icon
            name={closeIconName}
            fontFamily={closeIconFontFamily}
            className={`antmui-dialog-close-${closeIconPosition}`}
            onClick={() => {
              cref.current!.hide()
              onClose()
            }}
          />
        )}
        {children}
      </View>
    </View>
  )
}

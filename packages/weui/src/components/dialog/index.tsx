import { View } from '@tarojs/components'
import type { DialogProps } from '../../../types/dialog'
import Icon from '../icon'
import { useMask } from '../../utils'

export default function Index(props: DialogProps) {
  const { onClose, cref, className, children, ...others } = props
  const { maskRef } = useMask(cref)

  return (
    <View className="weui-mask" style={{ display: 'none' }} ref={maskRef}>
      <View
        className={`weui-dialog weui-dialog-min-height ${className || ''}`}
        {...others}
      >
        {onClose && (
          <Icon
            name="weui-round-close-fill"
            className="weui-icon-btn weui-dialog-close-top-right weui-icon-clear"
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

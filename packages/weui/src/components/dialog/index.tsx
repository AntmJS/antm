import { useRef } from 'react'
import type { DialogProps } from '../../../types/dialog'
import { useFadeIn, useFadeOut } from '../../utils'

function useDialog(): [
  React.MutableRefObject<HTMLDivElement | null>,
  () => void,
  () => void,
] {
  const ref = useRef<HTMLDivElement>(null)
  const fadeIn = useFadeIn(ref)
  const fadeOut = useFadeOut(ref)

  return [ref, fadeIn, fadeOut]
}

export default function Index(props: DialogProps) {
  const { onClose, cref, className, children, ...others } = props
  const [iosDialog, iosDialogIn, iosDialogOut] = useDialog()

  const actionRef = useRef({
    showDialog: iosDialogIn,
    hideDialog: iosDialogOut,
  })

  cref.current = actionRef.current

  return (
    <div className="js_dialog" style={{ display: 'none' }} ref={iosDialog}>
      <div className="weui-mask"></div>
      <div
        className={`weui-dialog weui-dialog-min-height ${className || ''}`}
        {...others}
      >
        {onClose && (
          <div
            className={`weui-icon-btn weui-dialog-close-top-right`}
            onClick={() => {
              iosDialogOut()
              onClose()
            }}
          >
            <i className="weui-icon-clear"></i>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

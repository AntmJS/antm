import { useRef } from 'react'
import type { ModalProps } from '../../../types/modal'
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

export default function Index(props: ModalProps) {
  const {
    title,
    content,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
    cref,
    className,
    ...others
  } = props
  const [iosDialog, iosDialogIn, iosDialogOut] = useDialog()

  const actionRef = useRef({
    showModal: iosDialogIn,
    hideModal: iosDialogOut,
  })

  cref.current = actionRef.current

  return (
    <div className="js_dialog" style={{ display: 'none' }} ref={iosDialog}>
      <div className="weui-mask"></div>
      <div className={`weui-dialog ${className || ''}`} {...others}>
        <div className="weui-dialog__hd">
          <strong className="weui-dialog__title">{title}</strong>
        </div>
        <div className="weui-dialog__bd">{content}</div>
        <div className="weui-dialog__ft">
          {onCancel && cancelText && (
            <a
              href="javascript:"
              className="weui-dialog__btn weui-dialog__btn_default"
              onClick={() => {
                iosDialogOut()
                onCancel()
              }}
            >
              {cancelText}
            </a>
          )}
          <a
            href="javascript:"
            className="weui-dialog__btn weui-dialog__btn_primary"
            onClick={() => {
              iosDialogOut()
              onConfirm()
            }}
          >
            {confirmText}
          </a>
        </div>
      </div>
    </div>
  )
}

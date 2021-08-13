import { useCallback, useRef, useState } from 'react'
import type { HalfScreenProps } from '../../../types/halfScreen'
import { useFadeIn, useFadeOut } from '../../utils'

function useDialog(): [
  boolean,
  React.RefObject<HTMLDivElement>,
  () => void,
  () => void,
] {
  const [isShowDialog, setIsShowDialog] = useState(false)
  const dialog = useRef<HTMLDivElement>(null)

  const dialogFadeIn = useFadeIn(dialog)
  const dialogFadeOut = useFadeOut(dialog)

  const showIOSDialog = useCallback(() => {
    dialogFadeIn()
    setIsShowDialog(true)
  }, [dialogFadeIn])

  const hideIOSDialog = useCallback(() => {
    dialogFadeOut()
    setIsShowDialog(false)
  }, [dialogFadeOut])
  return [isShowDialog, dialog, showIOSDialog, hideIOSDialog]
}

export default function Index(props: HalfScreenProps) {
  const { children, title, subTitle, className, onClose, cref, ...others } =
    props
  const [isShowDialog, dialog, showIOSDialog, hideIOSDialog] = useDialog()
  const actionRef = useRef({
    showHalfScreen: showIOSDialog,
    hideHalfScreen: hideIOSDialog,
  })
  cref.current = actionRef.current
  return (
    <div className="js_dialog" style={{ display: 'none' }} ref={dialog}>
      <div
        className="weui-mask"
        onClick={() => {
          hideIOSDialog()
          onClose?.()
        }}
      ></div>
      <div
        className={`weui-half-screen-dialog ${
          isShowDialog ? 'weui-half-screen-dialog_show' : ''
        } ${className || ''}`}
        {...others}
      >
        <div className="weui-half-screen-dialog__hd">
          <div className="weui-half-screen-dialog__hd__side">
            <div
              className="weui-icon-btn"
              onClick={() => {
                hideIOSDialog()
                onClose?.()
              }}
            >
              <i className="weui-icon-close-thin"></i>
            </div>
          </div>
          <div className="weui-half-screen-dialog__hd__main">
            {!title && !subTitle && (
              <strong className="weui-half-screen-dialog__title">面板</strong>
            )}
            {title && (
              <strong className="weui-half-screen-dialog__title">
                {title}
              </strong>
            )}
            {subTitle && (
              <span className="weui-half-screen-dialog__subtitle">
                {subTitle}
              </span>
            )}
          </div>
          {/* <div className="weui-half-screen-dialog__hd__side">
            <div className="weui-icon-btn">
              <i className="weui-icon-success-no-circle-thin"></i>
            </div>
          </div> */}
        </div>
        <div className="weui-half-screen-dialog__bd">{children}</div>
      </div>
    </div>
  )
}

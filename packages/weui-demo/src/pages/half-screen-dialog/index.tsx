import { useCallback, useRef, useState } from 'react'
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

export default function Index() {
  const [isShowDialog1, dialog1, showIOSDialog1, hideIOSDialog1] = useDialog()
  const [isShowDialog2, dialog2, showIOSDialog2, hideIOSDialog2] = useDialog()

  return (
    <body>
      <div className="page half-screen-dialog js_show">
        <div className="page__hd">
          <h1 className="page__title">Half-screen Dialog</h1>
          <p className="page__desc">半屏组件</p>
        </div>
        <div className="page__bd page__bd_spacing">
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            id="showIOSDialog1"
            onClick={showIOSDialog1}
          >
            样式一
          </a>
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            id="showIOSDialog2"
            onClick={showIOSDialog2}
          >
            样式二
          </a>
        </div>

        <div id="dialogs">
          <div
            className="js_dialog"
            id="iosDialog1"
            style={{ display: 'none' }}
            ref={dialog1}
          >
            <div className="weui-mask" onClick={hideIOSDialog1}></div>
            <div
              id="js_dialog_1"
              className={`weui-half-screen-dialog ${
                isShowDialog1 ? 'weui-half-screen-dialog_show' : ''
              }`}
            >
              <div className="weui-half-screen-dialog__hd">
                <div className="weui-half-screen-dialog__hd__side">
                  <div className="weui-icon-btn">
                    关闭<i className="weui-icon-close-thin"></i>
                  </div>
                </div>
                <div className="weui-half-screen-dialog__hd__main">
                  <strong className="weui-half-screen-dialog__title">
                    标题
                  </strong>
                </div>
              </div>
              <div className="weui-half-screen-dialog__bd">
                <br />
                <br />
                可放自定义内容
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
          <div
            className="js_dialog"
            id="iosDialog2"
            style={{ display: 'none' }}
            ref={dialog2}
          >
            <div className="weui-mask" onClick={hideIOSDialog2}></div>
            <div
              id="js_dialog_2"
              className={`weui-half-screen-dialog ${
                isShowDialog2 ? 'weui-half-screen-dialog_show' : ''
              }`}
            >
              <div className="weui-half-screen-dialog__hd">
                <div className="weui-half-screen-dialog__hd__side">
                  <div style={{ display: 'none' }} className="weui-icon-btn">
                    返回<i className="weui-icon-back-arrow-thin"></i>
                  </div>
                  <div className="weui-icon-btn">
                    关闭<i className="weui-icon-close-thin"></i>
                  </div>
                </div>
                <div className="weui-half-screen-dialog__hd__main">
                  <strong className="weui-half-screen-dialog__title">
                    标题
                  </strong>
                  <span className="weui-half-screen-dialog__subtitle">
                    标题
                  </span>
                </div>
                <div className="weui-half-screen-dialog__hd__side">
                  <div className="weui-icon-btn">
                    更多<i className="weui-icon-more"></i>
                  </div>
                </div>
              </div>
              <div className="weui-half-screen-dialog__bd">
                <p className="weui-half-screen-dialog__desc">
                  辅助描述内容，可根据实际需要安排
                </p>
                <p className="weui-half-screen-dialog__tips">
                  辅助提示内容，可根据实际需要安排
                </p>
              </div>
              <div className="weui-half-screen-dialog__ft">
                <a href="javascript:" className="weui-btn weui-btn_default">
                  辅助操作
                </a>
                <a href="javascript:" className="weui-btn weui-btn_primary">
                  主操作
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

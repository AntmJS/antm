import { useRef } from 'react'
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

export default function Index() {
  const [iosDialog1, iosDialog1In, iosDialog1Out] = useDialog()
  const [iosDialog2, iosDialog2In, iosDialog2Out] = useDialog()
  const [androidDialog1, androidDialog1In, androidDialog1Out] = useDialog()
  const [androidDialog2, androidDialog2In, androidDialog2Out] = useDialog()

  return (
    <body>
      <div className="page dialog js_show">
        <div className="page__hd">
          <h1 className="page__title">Dialog</h1>
          <p className="page__desc">对话框</p>
        </div>
        <div className="page__bd page__bd_spacing">
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            id="showIOSDialog1"
            onClick={iosDialog1In}
          >
            iOS Dialog样式一
          </a>
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            id="showIOSDialog2"
            onClick={iosDialog2In}
          >
            iOS Dialog样式二
          </a>
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            id="showAndroidDialog1"
            onClick={androidDialog1In}
          >
            Android Dialog样式一
          </a>
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            id="showAndroidDialog2"
            onClick={androidDialog2In}
          >
            Android Dialog样式二
          </a>
        </div>

        <div id="dialogs">
          <div
            className="js_dialog"
            id="iosDialog1"
            style={{ display: 'none' }}
            ref={iosDialog1}
          >
            <div className="weui-mask"></div>
            <div className="weui-dialog">
              <div className="weui-dialog__hd">
                <strong className="weui-dialog__title">弹窗标题</strong>
              </div>
              <div className="weui-dialog__bd">
                弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内
              </div>
              <div className="weui-dialog__ft">
                <a
                  href="javascript:"
                  className="weui-dialog__btn weui-dialog__btn_default"
                  onClick={iosDialog1Out}
                >
                  辅助操作
                </a>
                <a
                  href="javascript:"
                  className="weui-dialog__btn weui-dialog__btn_primary"
                  onClick={iosDialog1Out}
                >
                  主操作
                </a>
              </div>
            </div>
          </div>
          <div
            className="js_dialog"
            id="iosDialog2"
            style={{ display: 'none' }}
            ref={iosDialog2}
          >
            <div className="weui-mask"></div>
            <div className="weui-dialog">
              <div className="weui-dialog__bd">
                弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内
              </div>
              <div className="weui-dialog__ft">
                <a
                  href="javascript:"
                  className="weui-dialog__btn weui-dialog__btn_primary"
                  onClick={iosDialog2Out}
                >
                  知道了
                </a>
              </div>
            </div>
          </div>
          <div
            className="js_dialog"
            id="androidDialog1"
            style={{ display: 'none' }}
            ref={androidDialog1}
          >
            <div className="weui-mask"></div>
            <div className="weui-dialog weui-skin_android">
              <div className="weui-dialog__hd">
                <strong className="weui-dialog__title">弹窗标题</strong>
              </div>
              <div className="weui-dialog__bd">
                弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内
              </div>
              <div className="weui-dialog__ft">
                <a
                  href="javascript:"
                  className="weui-dialog__btn weui-dialog__btn_default"
                  onClick={androidDialog1Out}
                >
                  辅助操作
                </a>
                <a
                  href="javascript:"
                  className="weui-dialog__btn weui-dialog__btn_primary"
                  onClick={androidDialog1Out}
                >
                  主操作
                </a>
              </div>
            </div>
          </div>
          <div
            className="js_dialog"
            id="androidDialog2"
            style={{ display: 'none' }}
            ref={androidDialog2}
          >
            <div className="weui-mask"></div>
            <div className="weui-dialog weui-skin_android">
              <div className="weui-dialog__bd">
                弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内
              </div>
              <div className="weui-dialog__ft">
                <a
                  href="javascript:"
                  className="weui-dialog__btn weui-dialog__btn_default"
                  onClick={androidDialog2Out}
                >
                  辅助操作
                </a>
                <a
                  href="javascript:"
                  className="weui-dialog__btn weui-dialog__btn_primary"
                  onClick={androidDialog2Out}
                >
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

import { useRef } from 'react'
import { HalfScreen, IHalfScreenRef } from '@antmjs/weui'

export default function Index() {
  const showRef = useRef<IHalfScreenRef>()
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
            id="showIOSDialog2"
            onClick={() => {
              showRef.current!.showHalfScreen()
            }}
          >
            样式二
          </a>
        </div>
        <HalfScreen cref={showRef}>
          <>
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
              <a
                href="javascript:"
                className="weui-btn weui-btn_primary"
                onClick={() => {
                  showRef.current!.hideHalfScreen()
                }}
              >
                主操作
              </a>
            </div>
          </>
        </HalfScreen>
      </div>
    </body>
  )
}

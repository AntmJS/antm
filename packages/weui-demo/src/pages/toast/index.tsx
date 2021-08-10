import React, { useCallback, useRef } from 'react'
import { useFadeIn, useFadeOut } from '../../utils'

function useOnClick(): [
  React.MutableRefObject<HTMLDivElement | null>,
  () => void,
] {
  const ref = useRef<HTMLDivElement>(null)
  const fadeIn = useFadeIn(ref)
  const fadeOut = useFadeOut(ref)
  const callback = useCallback(() => {
    if (!ref.current || ref.current.style.display !== 'none') return
    fadeIn()
    setTimeout(function () {
      fadeOut()
    }, 2000)
  }, [ref, fadeIn, fadeOut])

  return [ref, callback]
}

export default function Index() {
  const [toast, onToastClick] = useOnClick()
  const [warnToast, onWarnToast] = useOnClick()
  const [textMoreToast, onTextMoreToast] = useOnClick()
  const [loadingToast, onLoadingToast] = useOnClick()
  const [textToast, onTextToast] = useOnClick()

  return (
    <body>
      <div className="page toast js_show">
        <div className="page__hd">
          <h1 className="page__title">Toast</h1>
          <p className="page__desc">弹出式提示</p>
        </div>
        <div className="page__bd page__bd_spacing">
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            id="showToast"
            onClick={onToastClick}
          >
            成功提示
          </a>
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            id="showWarnToast"
            onClick={onWarnToast}
          >
            失败提示
          </a>
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            id="showTextMoreToast"
            onClick={onTextMoreToast}
          >
            长文案提示
          </a>
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            id="showLoadingToast"
            onClick={onLoadingToast}
          >
            加载中提示
          </a>
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            id="showTextToast"
            onClick={onTextToast}
          >
            文字提示
          </a>
        </div>

        <div ref={toast} id="toast" style={{ display: 'none' }}>
          <div className="weui-mask_transparent"></div>
          <div className="weui-toast">
            <i className="weui-icon-success-no-circle weui-icon_toast"></i>
            <p className="weui-toast__content">已完成</p>
          </div>
        </div>

        <div ref={warnToast} id="textMoreToast" style={{ display: 'none' }}>
          <div className="weui-mask_transparent"></div>
          <div className="weui-toast weui-toast_text-more">
            <i className="weui-icon-warn weui-icon_toast"></i>
            <p className="weui-toast__content">此处为长文案提示详情</p>
          </div>
        </div>

        <div ref={textMoreToast} id="warnToast" style={{ display: 'none' }}>
          <div className="weui-mask_transparent"></div>
          <div className="weui-toast">
            <i className="weui-icon-warn weui-icon_toast"></i>
            <p className="weui-toast__content">获取链接失败</p>
          </div>
        </div>

        <div ref={loadingToast} id="loadingToast" style={{ display: 'none' }}>
          <div className="weui-mask_transparent"></div>
          <div className="weui-toast">
            <span className="weui-primary-loading weui-icon_toast">
              <span className="weui-primary-loading__dot"></span>
            </span>
            <p className="weui-toast__content">加载中</p>
          </div>
        </div>

        <div ref={textToast} id="textToast" style={{ display: 'none' }}>
          <div className="weui-mask_transparent"></div>
          <div className="weui-toast weui-toast_text">
            <p className="weui-toast__content">文字提示</p>
          </div>
        </div>
      </div>
    </body>
  )
}

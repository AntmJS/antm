import { useCallback, useRef, useState } from 'react'
import { useFadeIn, useFadeOut } from '../../../utils'

export default function Index() {
  const toast = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const showTooltips = useRef<HTMLAnchorElement>(null)
  const [isDisabled, setIsDisabled] = useState(true)

  const toastFadeIn = useFadeIn(toast)
  const toastFadeOut = useFadeOut(toast)

  const handleInput = useCallback(() => {
    setIsDisabled(input.current?.value ? false : true)
  }, [])

  const handleClick = useCallback(() => {
    if (showTooltips.current?.classList.contains('weui-btn_disabled')) {
      return
    }
    toastFadeIn()
    setTimeout(toastFadeOut, 2000)
  }, [toastFadeIn, toastFadeOut])

  return (
    <body>
      <div className="page js_show">
        <div className="weui-form">
          <div className="weui-form__text-area">
            <h2 className="weui-form__title">表单结构</h2>
            <div className="weui-form__desc">
              展示表单页面的信息结构样式,
              分别由头部区域/控件区域/提示区域/操作区域和底部信息区域组成。
            </div>
          </div>
          <div className="weui-form__control-area">
            <div className="weui-cells__group weui-cells__group_form">
              <div className="weui-cells__title">表单组标题</div>
              <div className="weui-cells weui-cells_form">
                <div className="weui-cell weui-cell_active">
                  <div className="weui-cell__hd">
                    <label className="weui-label">微信号</label>
                  </div>
                  <div className="weui-cell__bd">
                    <input
                      className="weui-input"
                      placeholder="填写本人微信号"
                      ref={input}
                      onInput={handleInput}
                    />
                  </div>
                </div>
                <div className="weui-cell weui-cell_active">
                  <div className="weui-cell__hd">
                    <label className="weui-label">昵称</label>
                  </div>
                  <div className="weui-cell__bd">
                    <input
                      className="weui-input"
                      placeholder="填写本人微信号的昵称"
                    />
                  </div>
                </div>
                <div className="weui-cell weui-cell_active">
                  <div className="weui-cell__hd">
                    <label className="weui-label">联系电话</label>
                  </div>
                  <div className="weui-cell__bd">
                    <input
                      className="weui-input"
                      placeholder="填写绑定的电话号码"
                      type="number"
                      pattern="[0-9]*"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="weui-form__tips-area">
            <p className="weui-form__tips">表单页提示，居中对齐</p>
          </div>
          <div className="weui-form__opr-area">
            <a
              className={`weui-btn weui-btn_primary ${
                isDisabled ? 'weui-btn_disabled' : ''
              }`}
              href="javascript:"
              id="showTooltips"
              ref={showTooltips}
              onClick={handleClick}
            >
              确定
            </a>
          </div>
          <div className="weui-form__tips-area">
            <p className="weui-form__tips">表单页提示，居中对齐</p>
          </div>
          <div className="weui-form__extra-area">
            <div className="weui-footer">
              <p className="weui-footer__links">
                <a href="javascript:" className="weui-footer__link">
                  底部链接文本
                </a>
              </p>
              <p className="weui-footer__text">Copyright © 2008-2019 weui.io</p>
            </div>
          </div>
        </div>
        <div id="js_toast" style={{ display: 'none' }} ref={toast}>
          <div className="weui-mask_transparent"></div>
          <div className="weui-toast">
            <i className="weui-icon-success-no-circle weui-icon_toast"></i>
            <p className="weui-toast__content">已完成</p>
          </div>
        </div>
      </div>
    </body>
  )
}

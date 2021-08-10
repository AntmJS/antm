import { useRef, useCallback } from 'react'
import { useFadeIn, useFadeOut } from '../../../utils'

export default function Index() {
  const tooltips = useRef<HTMLDivElement>(null)
  const toast = useRef<HTMLDivElement>(null)
  const toastFadeIn = useFadeIn(toast)
  const toastFadeOut = useFadeOut(toast)

  const showTooltips = useCallback(() => {
    toastFadeIn()
    setTimeout(function () {
      toastFadeOut()
    }, 2000)
  }, [toastFadeIn, toastFadeOut])

  return (
    <body>
      <div
        className="weui-toptips weui-toptips_warn js_tooltips"
        style={{ display: 'none' }}
        ref={tooltips}
      >
        错误提示
      </div>
      <div className="page form_checkbox js_show">
        <div className="weui-form">
          <div className="weui-form__text-area">
            <h2 className="weui-form__title">复选框样式展示</h2>
          </div>
          <div className="weui-form__control-area">
            <div className="weui-cells__group weui-cells__group_form">
              <div className="weui-cells weui-cells_checkbox">
                <label
                  className="weui-cell weui-cell_active weui-check__label"
                  htmlFor="s11"
                >
                  <div className="weui-cell__hd">
                    <input
                      type="checkbox"
                      className="weui-check"
                      name="checkbox1"
                      id="s11"
                      checked
                    />
                    <i className="weui-icon-checked"></i>
                  </div>
                  <div className="weui-cell__bd">
                    <p>standard is dealt for u.</p>
                  </div>
                </label>
                <label
                  className="weui-cell weui-cell_active weui-check__label"
                  htmlFor="s12"
                >
                  <div className="weui-cell__hd">
                    <input
                      type="checkbox"
                      name="checkbox1"
                      className="weui-check"
                      id="s12"
                    />
                    <i className="weui-icon-checked"></i>
                  </div>
                  <div className="weui-cell__bd">
                    <p>standard is dealicient for u.</p>
                  </div>
                </label>
                <a
                  href="javascript:"
                  className="weui-cell weui-cell_active weui-cell_link"
                >
                  <div className="weui-cell__bd">添加更多</div>
                </a>
              </div>
            </div>
          </div>
          <div className="weui-form__opr-area">
            <a
              className="weui-btn weui-btn_primary"
              href="javascript:"
              id="showTooltips"
              onClick={showTooltips}
            >
              下一步
            </a>
          </div>
          <div className="weui-form__tips-area">
            <p className="weui-form__tips">
              点击下一步即表示<a href="javascript:">同意用户协议</a>
            </p>
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

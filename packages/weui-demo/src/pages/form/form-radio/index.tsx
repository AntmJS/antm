import { useRef, useCallback } from 'react'
import { RadioGroup } from '@tarojs/components'
import { useFadeIn, useFadeOut } from '../../../utils'

export default function Index() {
  const tooltips = useRef<HTMLDivElement>(null)
  const toast = useRef<HTMLDivElement>(null)
  const toastFadeIn = useFadeIn(toast)
  const toastFadeOut = useFadeOut(toast)

  const showTooltips = useCallback(() => {
    if (tooltips.current?.style.display !== 'none') return

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
      <div className="page js_show">
        <div className="weui-form">
          <div className="weui-form__text-area">
            <h2 className="weui-form__title">单选框样式展示</h2>
          </div>
          <div className="weui-form__control-area">
            <div className="weui-cells__group weui-cells__group_form">
              <RadioGroup className="weui-cells weui-cells_radio">
                <label
                  className="weui-cell weui-cell_active weui-check__label"
                  htmlFor="x11"
                >
                  <div className="weui-cell__bd">
                    <p>cell standard</p>
                  </div>
                  <div className="weui-cell__ft">
                    <input
                      type="radio"
                      className="weui-check"
                      name="radio1"
                      id="x11"
                    />
                    <span className="weui-icon-checked"></span>
                  </div>
                </label>
                <label
                  className="weui-cell weui-cell_active weui-check__label"
                  htmlFor="x12"
                >
                  <div className="weui-cell__bd">
                    <p>cell standard</p>
                  </div>
                  <div className="weui-cell__ft">
                    <input
                      type="radio"
                      name="radio1"
                      className="weui-check"
                      id="x12"
                      checked
                    />
                    <span className="weui-icon-checked"></span>
                  </div>
                </label>
                <a
                  href="javascript:"
                  className="weui-cell weui-cell_active weui-cell_link"
                >
                  <div className="weui-cell__bd">添加更多</div>
                </a>
              </RadioGroup>
            </div>
          </div>
          <div className="weui-form__opr-area">
            <a
              className="weui-btn weui-btn_primary"
              href="javascript:"
              id="showTooltips"
              onClick={showTooltips}
            >
              确定
            </a>
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

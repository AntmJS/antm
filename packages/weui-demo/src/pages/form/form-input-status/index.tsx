import { useCallback, useEffect, useRef, useState } from 'react'
import { useFadeIn, useFadeOut } from '../../../utils'

function useInput(): [
  string,
  (e: any) => void,
  React.RefObject<HTMLInputElement>,
  React.Dispatch<React.SetStateAction<string>>,
] {
  const ref = useRef<HTMLInputElement>(null)
  const [content, setContent] = useState('')
  const onInput = useCallback((e: any) => {
    setContent(e.target.value)
  }, [])
  return [content, onInput, ref, setContent]
}

export default function Index() {
  const tooltips = useRef<HTMLDivElement>(null)
  const toast = useRef<HTMLDivElement>(null)
  const inputClear = useRef<HTMLButtonElement>(null)
  const cell = useRef<HTMLDivElement>(null)

  const [isShowCurrentTips, setIsShowCurrentTips] = useState(false)
  const [isShowToolTips, setIsShowToolTips] = useState(false)
  const [isShowCloseButton, setIsShowCloseButton] = useState(false)

  const [inputText, updateInput, input, setInputText] = useInput()
  const [currentInputText, updatecurrentInput, currentInput] = useInput()

  const handleInput = useCallback(
    (e: any) => {
      updateInput(e)
      if (cell.current?.classList.contains('weui-cell_warn')) {
        cell.current.classList.remove('weui-cell_warn')
      }
    },
    [updateInput],
  )

  useEffect(() => {
    setIsShowToolTips(inputText ? true : false)
  }, [inputText])

  useEffect(() => {
    setIsShowCurrentTips(currentInputText ? true : false)
  }, [currentInputText])

  const tooltipsFadeIn = useFadeIn(tooltips)
  const tooltipsFadeOut = useFadeOut(tooltips)
  const toastFadeIn = useFadeIn(toast)
  const toastFadeOut = useFadeOut(toast)

  const showTooltips = useCallback(() => {
    if (!isShowToolTips) return
    if (tooltips.current?.style.display !== 'none') return

    cell.current?.classList.remove('slideIn')

    if (inputText.length < 16) {
      cell.current?.classList.add('weui-cell_warn')
      tooltipsFadeIn()
      setTimeout(function () {
        tooltipsFadeOut()
      }, 2000)
    } else {
      toastFadeIn()
      setTimeout(function () {
        toastFadeOut()
      }, 2000)
    }
  }, [
    inputText,
    isShowToolTips,
    tooltipsFadeIn,
    tooltipsFadeOut,
    toastFadeIn,
    toastFadeOut,
  ])

  const handleClearInput = useCallback(() => {
    if (inputText) {
      setInputText('')
    }
  }, [inputText, setInputText])

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
            <h2 className="weui-form__title">输入框状态</h2>
            <div className="weui-form__desc">
              可体验表单输入的反馈状态。显示报错信息有两种类型，一种是超过1个输入项的时候，用置顶tipsbar报错信息，告知错误原因，页面聚焦到对应的报错区域，内容标红色，另一种是在当前输入项位置报错，适用于只有1个输入项的时候，用户焦点主要是输入区域。
            </div>
          </div>
          <div className="weui-form__control-area">
            <div className="weui-cells__group weui-cells__group_form">
              <div className="weui-cells__title">
                表单报错：置顶tipsbar报错信息
              </div>
              <div className="weui-cells weui-cells_form">
                <div
                  className="weui-cell weui-cell_active"
                  id="js_cell"
                  ref={cell}
                >
                  <div className="weui-cell__hd">
                    <label className="weui-label">卡号</label>
                  </div>
                  <div className="weui-cell__bd weui-flex">
                    <input
                      ref={input}
                      id="js_input"
                      className="weui-input"
                      autoFocus
                      type="text"
                      pattern="[0-9]*"
                      placeholder="请输入16位数卡号"
                      maxLength={16}
                      value={inputText}
                      onInput={handleInput}
                      onBlur={() => setIsShowCloseButton(false)}
                      onFocus={() => setIsShowCloseButton(true)}
                    />
                    <button
                      ref={inputClear}
                      id="js_input_clear"
                      className="weui-btn_reset weui-btn_icon weui-btn_input-clear"
                      style={{
                        display: `${
                          isShowCloseButton && input.current?.value
                            ? 'block'
                            : 'none'
                        }`,
                      }}
                      onClick={handleClearInput}
                    >
                      <i className="weui-icon-clear"></i>
                    </button>
                  </div>
                </div>
                <div className="weui-cell weui-cell_active">
                  <div className="weui-cell__hd">
                    <label className="weui-label">持卡人</label>
                  </div>
                  <div className="weui-cell__bd weui-flex">
                    <input
                      className="weui-input"
                      type="text"
                      placeholder="请输入持卡人姓名"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="weui-cells__group weui-cells__group_form">
              <div className="weui-cells__title">表单报错：当前项位置报错</div>
              <div className="weui-cells weui-cells_form">
                <div className="weui-cell weui-cell_active">
                  <div className="weui-cell__hd">
                    <label className="weui-label">金额</label>
                  </div>
                  <div className="weui-cell__bd weui-flex">
                    <input
                      id="js_current_input"
                      className="weui-input"
                      type="text"
                      placeholder="请输入金额"
                      ref={currentInput}
                      value={currentInputText}
                      onInput={updatecurrentInput}
                    />
                  </div>
                </div>
              </div>
              <div
                id="js_current_tips"
                style={{ display: isShowCurrentTips ? 'block' : 'none' }}
                className="weui-cells__tips weui-cells__tips_warn"
              >
                最多支持8位数
              </div>
            </div>
            <div className="weui-cells__group weui-cells__group_form">
              <div className="weui-cells__title">表单只读、置灰</div>
              <div className="weui-cells weui-cells_form">
                <div className="weui-cell weui-cell_active weui-cell_readonly">
                  <div className="weui-cell__hd">
                    <label className="weui-label">EMail</label>
                  </div>
                  <div className="weui-cell__bd">
                    <input
                      className="weui-input"
                      placeholder="请输入EMail"
                      value="1234567"
                      readOnly
                    />
                  </div>
                </div>
                <div className="weui-cell weui-cell_active weui-cell_disabled">
                  <div className="weui-cell__hd">
                    <label className="weui-label">微信号</label>
                  </div>
                  <div className="weui-cell__bd">
                    <input
                      className="weui-input"
                      placeholder="请输入微信号"
                      value="WeUI"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="weui-form__opr-area">
            <a
              className={`weui-btn weui-btn_primary ${
                isShowToolTips ? '' : 'weui-btn_disabled'
              }`}
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

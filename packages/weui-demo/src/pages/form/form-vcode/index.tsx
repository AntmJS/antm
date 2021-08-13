import { View } from '@tarojs/components'
import { useCallback, useRef, useState } from 'react'
import { HalfScreen, IHalfScreenRef } from '@antmjs/weui'
import { useFadeIn, useFadeOut } from '../../../utils'

export default function Index() {
  const tooltips = useRef<HTMLDivElement>(null)
  const toast = useRef<HTMLDivElement>(null)
  const halfScreenDialog = useRef<IHalfScreenRef>()
  const iosDialog1 = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const showTooltips = useRef<HTMLAnchorElement>(null)
  const weuiAgree = useRef<HTMLLabelElement>(null)
  const agreeCheckbox = useRef<HTMLInputElement>(null)

  const [inputText, setInputText] = useState('')
  const [isAgree, setIsAgree] = useState(false)
  const [isShowTooltips, setIsShowTooltips] = useState(false)

  const iosDialog1FadeIn = useFadeIn(iosDialog1)
  // const iosDialog1FadeOut = useFadeOut(iosDialog1)
  const toastFadeIn = useFadeIn(toast)
  const toastFadeOut = useFadeOut(toast)

  const onInput = useCallback((e) => {
    const value = e.detail.value
    setInputText(value)
    setIsShowTooltips(value ? true : false)
  }, [])

  const onShowTooltipsClick = useCallback(() => {
    if (showTooltips.current?.classList.contains('weui-btn_disabled')) return
    if (tooltips.current?.style.display !== 'none') return

    if (isAgree) {
      toastFadeIn()
      setTimeout(() => {
        toastFadeOut()
      }, 2000)
    } else {
      weuiAgree.current?.classList.add('weui-agree_animate')
      setTimeout(() => {
        weuiAgree.current?.classList.remove('weui-agree_animate')
      }, 2000)
    }
  }, [isAgree, toastFadeIn, toastFadeOut])

  // const onMaskClick = useCallback(() => {
  //   halfScreenDialog.current?.hideHalfScreen()
  //   iosDialog1FadeOut()
  // }, [iosDialog1FadeOut])

  // const onDialogsClose = useCallback(() => {
  //   halfScreenDialog.current?.hideHalfScreen()
  //   iosDialog1FadeOut()
  // }, [iosDialog1FadeOut])

  const onShowIOSDialog1 = useCallback(() => {
    iosDialog1FadeIn()
    halfScreenDialog.current?.showHalfScreen()
  }, [iosDialog1FadeIn])

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
            <h2 className="weui-form__title">验证码</h2>
            <div className="weui-form__desc">验证手机号样式</div>
          </div>
          <div className="weui-form__control-area">
            <div className="weui-cells__group weui-cells__group_form">
              <div className="weui-cells weui-cells_form">
                <div className="weui-cell weui-cell_active">
                  <div className="weui-cell__hd">
                    <label className="weui-label">手机号</label>
                  </div>
                  <div className="weui-cell__bd">
                    <input
                      className="weui-input"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="请输入手机号"
                      value="12345678907"
                    />
                  </div>
                  <div className="weui-cell__ft">
                    <a className="weui-btn_reset weui-btn_icon">
                      <i
                        id="showIOSDialog1"
                        className="weui-icon-info-circle"
                        onClick={onShowIOSDialog1}
                      ></i>
                    </a>
                  </div>
                </div>
                <div className="weui-cell weui-cell_active weui-cell_vcode">
                  <div className="weui-cell__hd">
                    <label className="weui-label">验证码</label>
                  </div>
                  <div className="weui-cell__bd">
                    <input
                      value={inputText}
                      autoFocus
                      className="weui-input"
                      type="text"
                      pattern="[0-9]*"
                      id="js_input"
                      placeholder="输入验证码"
                      maxLength={6}
                      ref={input}
                      onInput={onInput}
                    />
                  </div>
                  <div className="weui-cell__ft">
                    <button className="weui-btn weui-btn_default weui-vcode-btn">
                      获取验证码
                    </button>
                  </div>
                </div>
              </div>
              <div className="weui-cells__tips">
                <a className="weui-link" href="javascript:">
                  收不到验证码
                </a>
              </div>
            </div>
          </div>
          <View
            className="weui-form__tips-area"
            onClick={() => setIsAgree(!isAgree)}
          >
            <label
              id="weuiAgree"
              htmlFor="weuiAgreeCheckbox"
              className="weui-agree"
              ref={weuiAgree}
            >
              <div
                id="weuiAgreeCheckbox"
                className={`weui-agree__checkbox ${
                  isAgree ? 'weui-agree__checkbox-check' : ''
                }`}
                ref={agreeCheckbox}
              />
              <span className="weui-agree__text">
                阅读并同意
                <a href="javascript:">《相关条款》</a>
              </span>
            </label>
          </View>
          <div className="weui-form__opr-area">
            <a
              className={`weui-btn weui-btn_primary ${
                !isShowTooltips ? 'weui-btn_disabled' : ''
              }`}
              href="javascript:"
              id="showTooltips"
              ref={showTooltips}
              onClick={onShowTooltipsClick}
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
        <div id="dialogs">
          <HalfScreen cref={halfScreenDialog}>ddd</HalfScreen>
        </div>
      </div>
    </body>
  )
}

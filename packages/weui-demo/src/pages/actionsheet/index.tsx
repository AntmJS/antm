import { useCallback, useRef, useState } from 'react'
import { useFadeIn, useFadeOut } from '../../utils'

export default function Index() {
  const [isShowIOS, setIsShowIOS] = useState(false)
  const iosMaskRef = useRef<HTMLDivElement>()
  const androidRef = useRef<HTMLDivElement>()

  const iosMaskfadeOut = useFadeOut(iosMaskRef)
  const iosMaskfadeIn = useFadeIn(iosMaskRef)

  const hideActionSheet = useCallback(
    function () {
      setIsShowIOS(false)
      iosMaskfadeOut()
    },
    [iosMaskfadeOut],
  )

  const showIOSActionSheet = useCallback(
    function () {
      setIsShowIOS(true)
      iosMaskfadeIn()
    },
    [iosMaskfadeIn],
  )

  const hideAndroidActionSheet = useFadeOut(androidRef)
  const showAndroidActionSheet = useFadeIn(androidRef)

  return (
    <body>
      <div className="page actionsheet js_show">
        <div className="page__hd">
          <h1 className="page__title">ActionSheet</h1>
          <p className="page__desc">弹出式菜单</p>
        </div>
        <div className="page__bd page__bd_spacing">
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            id="showIOSActionSheet"
            onClick={showIOSActionSheet}
          >
            iOS ActionSheet
          </a>
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            id="showAndroidActionSheet"
            onClick={showAndroidActionSheet}
          >
            Android ActionSheet
          </a>
        </div>
        <div>
          <div
            className="weui-mask"
            id="iosMask"
            style={{ display: 'none' }}
            ref={iosMaskRef as React.LegacyRef<HTMLDivElement> | undefined}
            onClick={hideActionSheet}
          ></div>
          <div
            className={`weui-actionsheet ${
              isShowIOS ? 'weui-actionsheet_toggle' : ''
            }`}
            id="iosActionsheet"
          >
            <div className="weui-actionsheet__title">
              <p className="weui-actionsheet__title-text">
                这是一个标题，可以为一行或者两行。
              </p>
            </div>
            <div className="weui-actionsheet__menu">
              <div className="weui-actionsheet__cell">示例菜单</div>
              <div className="weui-actionsheet__cell">示例菜单</div>
              <div className="weui-actionsheet__cell weui-actionsheet__cell_warn">
                负向菜单
              </div>
            </div>
            <div className="weui-actionsheet__action">
              <div
                className="weui-actionsheet__cell"
                id="iosActionsheetCancel"
                onClick={hideActionSheet}
              >
                取消
              </div>
            </div>
          </div>
        </div>

        <div
          className="weui-skin_android"
          id="androidActionsheet"
          style={{ display: 'none' }}
          ref={androidRef as React.LegacyRef<HTMLDivElement> | undefined}
        >
          <div className="weui-mask" onClick={hideAndroidActionSheet}></div>
          <div className="weui-actionsheet">
            <div className="weui-actionsheet__menu">
              <div className="weui-actionsheet__cell">示例菜单</div>
              <div className="weui-actionsheet__cell">示例菜单</div>
              <div className="weui-actionsheet__cell">示例菜单</div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

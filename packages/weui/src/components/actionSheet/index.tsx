import { useRef, useState } from 'react'
import type { ActionSheetProps } from '../../../types/actionSheet'
import { useFadeIn, useFadeOut } from '../../utils'

export default function Index(props: ActionSheetProps) {
  const {
    title,
    subTitle,
    list,
    onSelect,
    onClose,
    onCancel,
    cref,
    className,
    children,
    ...others
  } = props
  const [isShowIOS, setIsShowIOS] = useState(false)
  const iosMaskRef = useRef<HTMLDivElement>()
  const actionRef = useRef({
    showActionSheet: function () {
      setIsShowIOS(true)
      iosMaskfadeIn()
    },
    hideActionSheet: function () {
      setIsShowIOS(false)
      iosMaskfadeOut()
    },
  })

  const iosMaskfadeOut = useFadeOut(iosMaskRef)
  const iosMaskfadeIn = useFadeIn(iosMaskRef)

  cref.current = actionRef.current

  return (
    <div>
      <div
        className="weui-mask"
        style={{ display: 'none' }}
        ref={iosMaskRef as React.LegacyRef<HTMLDivElement> | undefined}
        onClick={() => {
          actionRef.current.hideActionSheet()
          onClose?.()
        }}
      ></div>
      <div
        className={`weui-actionsheet ${
          isShowIOS ? 'weui-actionsheet_toggle' : ''
        } ${className || ''}`}
        {...others}
      >
        <div className="weui-actionsheet__title">
          {!title && !subTitle && (
            <p className="weui-actionsheet__title-text">菜单</p>
          )}
          {title && <p className="weui-actionsheet__title-text">{title}</p>}
          {subTitle && (
            <p className="weui-actionsheet__subtitle-text">{subTitle}</p>
          )}
        </div>
        <div className="weui-actionsheet__menu">
          {list
            ? list.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="weui-actionsheet__cell"
                    onClick={() => {
                      actionRef.current.hideActionSheet()
                      onSelect?.(item.value)
                    }}
                  >
                    {item.name}
                  </div>
                )
              })
            : children}
          {/* <div className="weui-actionsheet__cell weui-actionsheet__cell_warn">
            负向菜单
          </div> */}
        </div>
        <div className="weui-actionsheet__action">
          <div
            className="weui-actionsheet__cell"
            onClick={() => {
              actionRef.current.hideActionSheet()
              onCancel?.()
            }}
          >
            取消
          </div>
        </div>
      </div>
    </div>
  )
}

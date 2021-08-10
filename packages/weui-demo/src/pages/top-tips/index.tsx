import React, { useRef } from 'react'
import { useFadeIn, useFadeOut } from '../../utils'

export default function Index() {
  const topTips = useRef<HTMLDivElement>()

  const showTopTips = useFadeIn(topTips)
  const hideTopTips = useFadeOut(topTips)

  return (
    <body>
      <div className="page top-tips js_show">
        <div className="page__hd">
          <h1 className="page__title">TopTips</h1>
          <p className="page__desc">顶部提示条</p>
        </div>
        <div className="page__bd page__bd_spacing">
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            id="showTopTips"
            onClick={() => showTopTips()}
          >
            显示提示条
          </a>
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            id="hideTopTips"
            onClick={() => hideTopTips()}
          >
            隐藏提示条
          </a>
        </div>

        <div
          className="weui-toptips weui-toptips_warn"
          id="topTips"
          ref={topTips as React.LegacyRef<HTMLDivElement> | undefined}
        >
          错误提示
        </div>
      </div>
    </body>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'

export default function Index() {
  const [progress, setProgress] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const btnRef = useRef<HTMLAnchorElement>()
  const progressRef = useRef<number>(progress)

  const next = useCallback(function () {
    const cur = progressRef.current!
    if (cur >= 100) {
      setIsLoading(false)
      return
    }
    setProgress(cur + 1)
    setTimeout(next, 20)
  }, [])

  const handleClick = useCallback(
    function () {
      const btn = btnRef.current
      if (!btn || isLoading) return

      setIsLoading(true)
      setProgress(0)
    },
    [isLoading],
  )

  useEffect(() => {
    progressRef.current = progress
    if (progress === 0) {
      next()
    }
  }, [progress, next])

  return (
    <body>
      <div className="page progress js_show">
        <div className="page__hd">
          <h1 className="page__title">Progress</h1>
          <p className="page__desc">进度条</p>
        </div>
        <div className="page__bd page__bd_spacing">
          <div className="weui-progress">
            <div className="weui-progress__bar">
              <div
                className="weui-progress__inner-bar js_progress"
                style={{ width: `${progress === -1 ? '0' : progress}%` }}
              ></div>
            </div>
            <a href="javascript:" className="weui-progress__opr">
              <i className="weui-icon-cancel"></i>
            </a>
          </div>
          <br />
          <div className="weui-progress">
            <div className="weui-progress__bar">
              <div
                className="weui-progress__inner-bar js_progress"
                style={{ width: `${progress === -1 ? '50' : progress}%` }}
              ></div>
            </div>
            <a href="javascript:" className="weui-progress__opr">
              <i className="weui-icon-cancel"></i>
            </a>
          </div>
          <br />
          <div className="weui-progress">
            <div className="weui-progress__bar">
              <div
                className="weui-progress__inner-bar js_progress"
                style={{ width: `${progress === -1 ? '80' : progress}%` }}
              ></div>
            </div>
            <a href="javascript:" className="weui-progress__opr">
              <i className="weui-icon-cancel"></i>
            </a>
          </div>
          <div className="weui-btn-area">
            <a
              href="javascript:"
              ref={btnRef as React.LegacyRef<HTMLAnchorElement> | undefined}
              className={
                'weui-btn weui-btn_primary' +
                `${isLoading ? 'weui-btn_disabled' : ''}`
              }
              id="btnUpload"
              onClick={handleClick}
            >
              上传
            </a>
          </div>
        </div>
      </div>
    </body>
  )
}

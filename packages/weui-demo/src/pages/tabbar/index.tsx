import { useState, useCallback } from 'react'
import Icon from '../../images/icon_tabbar.png'

export default function Index() {
  const [active, setActive] = useState(0)

  const handleClick = useCallback((idx) => setActive(idx), [])

  return (
    <body>
      <div className="page tabbar js_show">
        <div className="page__bd" style={{ height: '100%' }}>
          <div className="weui-tab">
            <div className="weui-tab__panel"></div>
            <div className="weui-tabbar">
              <div
                className={`weui-tabbar__item ${
                  active === 0 ? 'weui-bar__item_on' : ''
                }`}
                onClick={() => handleClick(0)}
              >
                <div style={{ display: 'inline-block', position: 'relative' }}>
                  <img src={Icon} alt="" className="weui-tabbar__icon" />
                  <span
                    className="weui-badge"
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-13px',
                    }}
                  >
                    8
                  </span>
                </div>
                <p className="weui-tabbar__label">微信</p>
              </div>
              <div
                className={`weui-tabbar__item ${
                  active === 1 ? 'weui-bar__item_on' : ''
                }`}
                onClick={() => handleClick(1)}
              >
                <img src={Icon} alt="" className="weui-tabbar__icon" />
                <p className="weui-tabbar__label">通讯录</p>
              </div>
              <div
                className={`weui-tabbar__item ${
                  active === 2 ? 'weui-bar__item_on' : ''
                }`}
                onClick={() => handleClick(2)}
              >
                <div style={{ display: 'inline-block', position: 'relative' }}>
                  <img src={Icon} alt="" className="weui-tabbar__icon" />
                  <span
                    className="weui-badge weui-badge_dot"
                    style={{ position: 'absolute', top: '0', right: '-6px' }}
                  ></span>
                </div>
                <p className="weui-tabbar__label">发现</p>
              </div>
              <div
                className={`weui-tabbar__item ${
                  active === 3 ? 'weui-bar__item_on' : ''
                }`}
                onClick={() => handleClick(3)}
              >
                <img src={Icon} alt="" className="weui-tabbar__icon" />
                <p className="weui-tabbar__label">我</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

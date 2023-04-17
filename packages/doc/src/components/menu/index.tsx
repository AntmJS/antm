// @ts-ignore
import React, { useContext } from 'react'
import { preCls } from '../../utils/common'
import { IDocMenuNavs } from '../../../types'
import { UrlConext } from '../../context'
import { routerEvent } from '../../utils/history'
import './index.less'

type Iprops = {
  menu: IDocMenuNavs
  routeType?: 'hash' | 'history'
}

export default function Menu({ menu, routeType = 'hash' }: Iprops) {
  const [currentUrl, setCurrentUrl] = useContext(UrlConext)

  const jumpPage = (url) => {
    setCurrentUrl(url)
    routerEvent.switch(`/${url}`, routeType)
    if (window.scrollY >= 60) {
      window.scrollTo(0, 64)
    } else {
      window.scrollTo(0, 0)
    }
  }

  const onScroll = function (e) {
    e.stopPropagation()
  }

  return (
    <div
      className={`${preCls}-menu`}
      onScroll={onScroll}
      style={{ height: document.documentElement.clientHeight }}
    >
      {menu.map((item) => (
        <div className={`${preCls}-menu-nav`} key={`menu-nav${item.name}`}>
          <div className={`${preCls}-menu-nav_title`}>{item.name}</div>
          {item.items.map((item, index) => (
            <div
              key={`menu-item${index}`}
              className={`${preCls}-menu-item ${preCls}-menu-item-${
                item.path === currentUrl ? 'active' : 'no'
              }`}
              onClick={() => jumpPage(item.path)}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

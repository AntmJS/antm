// @ts-ignore
import React, { useContext, useCallback } from 'react'
import { preCls } from '../../utils/common'
import { IDocMenuNavs, Ii18n } from '../../../types'
import { UrlConext, LangConext } from '../../context'
import { routerEvent } from '../../utils/history'
import './index.less'

type Iprops = {
  menu: IDocMenuNavs
  routeType?: 'hash' | 'history'
  i18n?: Ii18n
  routes?: string[]
}

export default function Menu({
  menu,
  routeType = 'hash',
  i18n,
  routes,
}: Iprops) {
  const [currentUrl, setCurrentUrl] = useContext(UrlConext)
  const [lang] = useContext(LangConext)

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

  const i18Text = useCallback(
    (item, key) => {
      if (i18n && typeof item[key] === 'object') {
        return item[key][lang] || ''
      } else {
        return item[key] || ''
      }
    },
    [i18n, lang],
  )

  const i18nPath = useCallback(
    (path) => {
      if (i18n) {
        const langPath = `${path}/${lang}`
        if (routes?.includes(langPath)) {
          return langPath
        } else {
          return path
        }
      } else {
        return path
      }
    },
    [i18n, lang, routes],
  )

  return (
    <div
      className={`${preCls}-menu`}
      onScroll={onScroll}
      style={{ height: document.documentElement.clientHeight }}
    >
      {menu.map((item, i) => (
        <div className={`${preCls}-menu-nav`} key={`menu-nav${i}`}>
          <div className={`${preCls}-menu-nav_title`}>
            {i18Text(item, 'name')}
          </div>
          {item.items.map((item, index) => (
            <div
              key={`menu-item${index}`}
              className={`${preCls}-menu-item ${preCls}-menu-item-${
                i18nPath(item.path) === currentUrl ? 'active' : 'no'
              }`}
              onClick={() => jumpPage(i18nPath(item.path))}
            >
              {i18Text(item, 'title')}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// @ts-ignore
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { preCls } from '../../utils/common'
import { IDocheaderLinks, Ii18n } from '../../../types'
import { LangConext, UrlConext } from '../../context'
import Search from '../search'
import './index.less'
import { routerEvent } from '../../utils/history'

type Iprops = {
  logo?: string
  title: string
  links?: IDocheaderLinks
  i18n?: Ii18n
  routes?: string[]
}

const pCls = `${preCls}-header`

export default function Header(props: Iprops) {
  const { title, logo, links, i18n, routes } = props
  const [selectShow, setSelectShow] = useState<string[]>([])
  const [lang, setLang] = useContext(LangConext)
  const [url] = useContext(UrlConext)

  const selectTrigger = useCallback(
    (e, item) => {
      e?.stopPropagation()
      const index = selectShow.indexOf(item.title)
      if (index >= 0) {
        selectShow.splice(index, 1)
      } else {
        selectShow.push(item.title)
      }

      setSelectShow([...selectShow])
    },
    [selectShow],
  )

  useEffect(() => {
    if (i18n && i18n.langs[0]) {
      setLang(i18n.langs[0])
    }
    document.addEventListener('click', () => {
      setSelectShow([])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const switchLang = useCallback(
    (e, it) => {
      e.stopPropagation()
      selectTrigger(e, { title: 'i18n' })
      setLang(it)
      const lastPathItem = url.split('/')[url.split('/').length - 1] || ''
      let langPath = url
      let originPath = url
      if (!i18n?.langs.includes(lastPathItem)) {
        langPath = `${langPath}/${it}`
      } else {
        originPath = `${url.replace(`/${lastPathItem}`, '')}`
        langPath = `${originPath}/${it}`
      }
      if (routes?.includes(langPath)) {
        routerEvent.switch(langPath)
      } else {
        routerEvent.switch(originPath)
      }
    },
    [i18n?.langs, routes, selectTrigger, setLang, url],
  )

  return (
    <header className={pCls}>
      <div className={`${pCls}-wrapper`}>
        <a className={`${pCls}-left`} href="/">
          {logo && (
            <div className={`${pCls}-logo`}>
              <img src={logo} />
            </div>
          )}
          <span className={`${pCls}-title`}>{title}</span>
        </a>

        <div className={`${pCls}-right`}>
          <div className={`${pCls}-navs-box`}>
            <Search />
            {(links || []).map((item, index) => (
              <div className={`${pCls}-nav`} key={`${pCls}-nav${index}`}>
                {item.type === 'img' && (
                  <a
                    href={item.url}
                    target="_blank"
                    className="nav-img"
                    rel="noreferrer"
                  >
                    <img src={i18Text(item, 'title')} />
                  </a>
                )}
                {item.type === 'text' && (
                  <a
                    href={item.url}
                    target="_blank"
                    className="nav-text"
                    rel="noreferrer"
                  >
                    {i18Text(item, 'title')}
                  </a>
                )}
                {item.type === 'select' && (
                  <div
                    className="nav-select"
                    onClick={(e) => selectTrigger(e, item)}
                  >
                    <span>{i18Text(item, 'title')}</span>
                    <svg
                      className="version-icon"
                      viewBox="0 0 1024 1024"
                      width="12"
                      height="12"
                    >
                      <path
                        fill="#001938"
                        d="M535.12 711.6L870.528 355.2a29.376 29.376 0 0 0 0-42.352 31.376 31.376 0 0 0-43.52 0l-315.2 334.912-315.2-334.912a31.376 31.376 0 0 0-43.52 0 29.376 29.376 0 0 0 0 42.352l335.408 356.4a36.272 36.272 0 0 0 46.624 0z"
                      ></path>
                    </svg>
                    <div
                      className="nav-options"
                      style={
                        selectShow.includes(i18Text(item, 'title'))
                          ? {}
                          : { display: 'none' }
                      }
                    >
                      {(item.options || []).map((it) => (
                        <div
                          className="nav-opt"
                          key={`nav-opt${it.title}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(it.url)
                            selectTrigger(null, item)
                          }}
                        >
                          {it.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className={`${pCls}-nav`}>
              {i18n && (
                <div
                  className="nav-select"
                  onClick={(e) => selectTrigger(e, { title: 'i18n' })}
                >
                  <span>{lang}</span>
                  <div
                    className="nav-options"
                    style={
                      selectShow.includes('i18n') ? {} : { display: 'none' }
                    }
                  >
                    {(i18n.langs || [])
                      .filter((it) => it !== lang)
                      .map((it) => (
                        <div
                          className="nav-opt"
                          key={`nav-opt-lang${it}`}
                          onClick={(e) => switchLang(e, it)}
                        >
                          {it}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

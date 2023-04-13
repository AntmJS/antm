import { useCallback, useEffect, useState } from 'react'
import { preCls } from '../../utils/common'
import { IDocheaderLinks } from '../../../types'
import './index.less'

type Iprops = {
  logo?: string
  title: string
  links?: IDocheaderLinks
}

const pCls = `${preCls}-header`

export default function Header(props: Iprops) {
  const { title, logo, links } = props
  const [selectShow, setSelectShow] = useState<string[]>([])

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
    document.addEventListener('click', () => {
      setSelectShow([])
    })
  }, [])

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
            {(links || []).map((item, index) => (
              <div className={`${pCls}-nav`} key={`${pCls}-nav${index}`}>
                {item.type === 'img' && (
                  <a
                    href={item.url}
                    target="_blank"
                    className="nav-img"
                    rel="noreferrer"
                  >
                    <img src={item.title} />
                  </a>
                )}
                {item.type === 'text' && (
                  <a
                    href={item.url}
                    target="_blank"
                    className="nav-text"
                    rel="noreferrer"
                  >
                    {item.title}
                  </a>
                )}
                {item.type === 'select' && (
                  <div
                    className="nav-select"
                    onClick={(e) => selectTrigger(e, item)}
                  >
                    <span>{item.title}</span>
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
                        selectShow.includes(item.title)
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
                          {item.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

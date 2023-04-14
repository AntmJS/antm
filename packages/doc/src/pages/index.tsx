// @ts-ignore
import React, {
  useState,
  useEffect,
  memo,
  useLayoutEffect,
  useContext,
} from 'react'
import MarkdownBox from '../components/markdown/index'
import { routerEvent } from '../utils/history'
import { UrlConext } from '../context'
import './index.less'
import { scrollToTargetParent } from '../utils/common'

let historyMd = ''

type Iprops = {
  markdownMain: any
  routerType?: 'hash' | 'history'
  simulator: boolean
  firstPage?: string
  pageYOffset: number
}

const Docs = function Docs({
  markdownMain,
  routerType = 'hash',
  simulator,
  firstPage,
  pageYOffset,
}: Iprops) {
  const [md, setMd] = useState(historyMd)
  const [currentUrl, setCurrentUrl] = useContext(UrlConext)
  const [rightNavs, setRightNavs] = useState([])
  const [mdRects, setMdRects] = useState<{ id: string; top: number }[]>([])
  const [navShow, setNavShow] = useState(false)

  useLayoutEffect(() => {
    if (markdownMain) {
      if (routerType === 'hash') {
        window.addEventListener('hashchange', () => {
          mdChange(markdownMain)
        })
      } else {
        routerEvent.register(() => {
          mdChange(markdownMain)
        })
      }
    }

    return () => {
      routerEvent.unregister()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markdownMain])

  useEffect(() => {
    if (markdownMain) {
      mdChange(markdownMain)
      const params: string = location.href.split('?')[1] || ''
      if (params.split('=')[1]) {
        // @ts-ignore
        const target = decodeURIComponent(params.split('=')[1])?.substring(
          0,
          20,
        )

        setTimeout(() => {
          scrollToTargetParent(encodeURIComponent(target))
        }, 166)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markdownMain])

  const getAllMdRects = () => {
    const cards = document.querySelectorAll('.antm-docs-markdown .card')
    const h3s = document.querySelectorAll('.antm-docs-markdown .card>h3')
    if (cards && cards.length) {
      for (let i = 0; i < cards.length; i++) {
        const d = cards[i]

        if (d) {
          mdRects.push({
            id: h3s[i]?.id ? decodeURIComponent(h3s[i]?.id || '') : '',
            top: d['offsetTop'] || 0,
          })
        }
      }
    }

    setMdRects([...mdRects])
  }

  const mdChange = (markdownMain) => {
    let pathName =
      routerType === 'hash' ? location.hash.replace('#', '') : location.pathname
    setCurrentUrl(pathName.replace(/^\//, '').split('?')[0] || '')
    pathName =
      pathName.replace(/^\//, '').replace(/\//g, '__').split('?')[0] || ''
    const docs = markdownMain[pathName]
    setMdRects([])
    setRightNavs([])
    if (docs) {
      docs.then((res) => {
        const result = res.default
        document.title = result.tile
        historyMd = result.docs
        setMd(result.docs)
        setRightNavs(result.h3Ids.split(':::'))
      })
    } else if (firstPage) {
      routerEvent.switch(`/${firstPage.replace('_', '/')}`, routerType)
    }
  }

  useEffect(() => {
    if (rightNavs.length) {
      setTimeout(() => {
        getAllMdRects()
      }, 33.33)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightNavs])

  const targetChange = (t) => {
    routerEvent.switch(`${currentUrl}?target=${t}`)
    scrollToTargetParent(encodeURIComponent(t))
  }

  return (
    <div
      className={`antm-docs-page ${
        simulator
          ? 'antm-docs-page-with-simulator'
          : 'antm-docs-page-no-simulator'
      }`}
    >
      <MarkdownBox>{md}</MarkdownBox>
      {rightNavs.length > 1 && (
        <div
          className={`antm-doc-right-navs-wrapper ${
            simulator ? 'antm-doc-right-navs-stretch' : ''
          }`}
          style={simulator ? { right: !navShow ? -148 : 0 } : {}}
        >
          {simulator && (
            <div
              className={`nav-button ${navShow ? 'nav-button-close' : ''}`}
              onClick={() => setNavShow(!navShow)}
            >
              <svg viewBox="0 0 1024 1024" width="22" height="22">
                <path
                  d="M133.8 115h756.4c20.9 0 37.8 16.9 37.8 37.8v37.8c0 20.9-16.9 37.8-37.8 37.8H133.8c-20.9 0-37.8-16.9-37.8-37.8v-37.8c0-20.9 16.9-37.8 37.8-37.8zM133.8 455.3h491.6c20.9 0 37.8 16.9 37.8 37.8v37.8c0 20.9-16.9 37.8-37.8 37.8H133.8c-20.9 0-37.8-16.9-37.8-37.8v-37.8c0-20.9 16.9-37.8 37.8-37.8zM133.8 795.6h756.4c20.9 0 37.8 16.9 37.8 37.8v37.8c0 20.9-16.9 37.8-37.8 37.8H133.8c-20.9 0-37.8-16.9-37.8-37.8v-37.8c0-20.9 16.9-37.8 37.8-37.8zM757.8 600.7V423.3c0-22 29.2-33.1 46.2-17.5l97.1 88.7c10.6 9.7 10.6 25.3 0 35L804 618.1c-17 15.6-46.2 4.6-46.2-17.4z"
                  p-id="3111"
                ></path>
              </svg>
            </div>
          )}
          <div
            className="antm-doc-right-navs"
            style={{ top: 150 - pageYOffset > 64 ? 150 - pageYOffset : 64 }}
          >
            <div className="antm-doc-right-navs-title">本页目录</div>
            {rightNavs.map((item) => (
              <div
                className={`antm-doc-right-nav antm-doc-right-nav-${
                  item === findNearest(mdRects, pageYOffset) ? 'active' : 'no'
                }`}
                key={`doc-right-navs${item}`}
                onClick={() => targetChange(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function findNearest(arr, scrollY) {
  let cur = 0
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item.top < scrollY + 30) {
      cur = i
    }
  }

  return arr[cur]?.id
}

export default memo(Docs)

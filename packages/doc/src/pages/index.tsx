/* eslint-disable react/no-unknown-property */
// @ts-ignore
import React, {
  useState,
  useEffect,
  memo,
  useLayoutEffect,
  useContext,
} from 'react'
import classNames from 'classnames'
import MarkdownBox from '../components/markdown/index'
import { routerEvent } from '../utils/history'
import { UrlConext } from '../context'
import { scrollToTargetParent } from '../utils/common'
import { BackToTopIcon } from '../components/search/icons'
import './index.less'

type Iprops = {
  markdownMain: any
  routerType?: 'hash' | 'history'
  simulator: boolean
  firstPage?: string
}

const MARKDOWN_QUORTA = '::::_QA'
const MARKDOWN_AB = '::::_AB'
let historyMd = ''

const Docs = function Docs({
  markdownMain,
  routerType = 'hash',
  simulator,
  firstPage,
}: Iprops) {
  const [md, setMd] = useState(historyMd)
  const [currentUrl, setCurrentUrl] = useContext(UrlConext)
  const [rightNavs, setRightNavs] = useState([])
  const [navShow, setNavShow] = useState(false)
  const [navActive, setNavActive] = useState(0)
  const [backTopBtnShow, setbackTopBtnShow] = useState(false)

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

        const toParentTimer = setTimeout(() => {
          scrollToTargetParent(encodeURIComponent(target))
        }, 166)

        return () => {
          clearTimeout(toParentTimer)
        }
      }
    }

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const mdChange = (markdownMain) => {
    let pathName =
      routerType === 'hash' ? location.hash.replace('#', '') : location.pathname
    setCurrentUrl(pathName.replace(/^\//, '').split('?')[0] || '')
    pathName =
      pathName.replace(/^\//, '').replace(/\//g, '__').split('?')[0] || ''
    const docs = markdownMain[pathName]
    setRightNavs([])
    if (docs) {
      docs.then((res) => {
        const result = res.default
        document.title = result.tile
        historyMd = result.docs
        setMd(
          result.docs
            .replaceAll(MARKDOWN_QUORTA, '`')
            .replaceAll(MARKDOWN_AB, '${'),
        )
        setRightNavs(result.h3Ids.split(':::'))
      })
    } else if (firstPage) {
      routerEvent.switch(`/${firstPage.replace('_', '/')}`, routerType)
    }
  }

  const targetChange = (t) => {
    routerEvent.switch(`${currentUrl}?target=${t}`)
    scrollToTargetParent(encodeURIComponent(t))
  }

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setbackTopBtnShow(true)
    } else {
      setbackTopBtnShow(false)
    }
    const contentSections = document.querySelectorAll(
      '.antm-docs-markdown .card',
    )

    let navActive = NaN

    contentSections.forEach((section, i) => {
      const rect = section.getBoundingClientRect()
      if (
        rect.y >= 0 &&
        isNaN(navActive) &&
        rect.bottom > 0 &&
        rect.bottom < document.documentElement.offsetHeight * 30
      ) {
        navActive = i
      }
    })

    if (!isNaN(navActive)) setNavActive(navActive)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div
        className={classNames(
          'antm-docs-body',
          rightNavs.length === 1 && 'antm-docs-body-no-right-navs',
        )}
      >
        <MarkdownBox>{md}</MarkdownBox>
      </div>
      {rightNavs.length > 1 && (
        <div
          className={classNames(
            'antm-doc-right-navs-wrapper',
            simulator && 'antm-doc-right-navs-stretch',
            simulator &&
              `antm-doc-right-navs-stretch-navs-${navShow ? 'show' : 'hide'}`,
          )}
        >
          {simulator && (
            <div
              className={classNames(
                'nav-button',
                navShow && 'nav-button-close',
              )}
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
            className={classNames(
              'antm-doc-right-navs',
              `antm-doc-right-navs-${navShow ? 'show' : 'hide'}`,
            )}
          >
            <div className="antm-doc-right-navs-title">Current Page</div>
            {rightNavs.map((item, i) => (
              <div
                className={`antm-doc-right-nav ${
                  navActive === i ? 'antm-doc-right-nav-active' : ''
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
      {backTopBtnShow && (
        <BackToTopIcon
          className="backToTopIcon"
          onClick={() => window.scrollTo(0, 0)}
        ></BackToTopIcon>
      )}
    </>
  )
}

export default memo(Docs)

import {
  useState,
  useEffect,
  memo,
  useLayoutEffect,
  useContext,
  useRef,
} from 'react'
import MarkdownBox from '../components/markdown/index'
import { routerEvent } from '../utils/history'
import { UrlConext } from '../context'
import './index.less'

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
  const [currentNavs, setCurrentNavs] = useState<
    { id: string; intersectionRatio: number }[]
  >([])
  const contentObserver = useRef<any>([])

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
          10,
        )

        setTimeout(() => {
          document.getElementById(encodeURIComponent(target))?.scrollIntoView({
            block: 'start',
          })
        }, 166)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markdownMain])

  const mdChange = (markdownMain) => {
    let pathName =
      routerType === 'hash' ? location.hash.replace('#', '') : location.pathname
    setCurrentUrl(pathName.replace(/^\//, '').split('?')[0] || '')
    pathName =
      pathName.replace(/^\//, '').replace(/\//g, '__').split('?')[0] || ''
    const docs = markdownMain[pathName]
    if (docs) {
      docs.then((res) => {
        unobserve()
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

  const initRect = function (target, i) {
    if (contentObserver.current[i] != null) {
      contentObserver.current[i].disconnect()
    }

    contentObserver.current[i] = new IntersectionObserver(function (res: any) {
      for (let i = 0; i < res.length; i++) {
        const tId = decodeURIComponent(
          res[i].target.getElementsByTagName('h3')[0]?.id,
        )

        let index
        currentNavs.forEach((item, i) => {
          if (item.id === tId) {
            index = i
          }
        })
        if (index !== undefined) {
          // @ts-ignore
          currentNavs[index].intersectionRatio = res[i].intersectionRatio
          setCurrentNavs([...currentNavs])
        }
      }
    })

    contentObserver.current[i].observe(target, {
      thresholds: [0, 0.2, 0.4, 0.6, 0.8, 1],
    })
  }

  const unobserve = () => {
    setCurrentNavs([])
    const targets = document.querySelectorAll('.antm-docs-markdown .card')

    if (targets.length) {
      for (let i = 0; i < targets.length; i++) {
        if (targets[i]) {
          contentObserver.current[i]?.unobserve(targets[i])
        }
      }
    }
  }

  useEffect(() => {
    if (rightNavs.length) {
      if (!currentNavs.length) {
        rightNavs.forEach((item) => {
          currentNavs.push({
            id: item,
            intersectionRatio: 0,
          })
        })
      }
      setTimeout(() => {
        const targets = document.querySelectorAll('.antm-docs-markdown .card')

        if (targets.length) {
          for (let i = 0; i < targets.length; i++) {
            if (targets[i]) {
              initRect(targets[i], i)
            }
          }
        }
      }, 33.33)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightNavs])

  const targetChange = (t) => {
    routerEvent.switch(`${currentUrl}?target=${t}`)
    document.getElementById(encodeURIComponent(t))?.scrollIntoView({
      block: 'start',
    })
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
      {!simulator && rightNavs.length > 2 && (
        <div
          className="antm-doc-right-navs"
          style={{ top: 150 - pageYOffset > 64 ? 150 - pageYOffset : 64 }}
        >
          <div className="antm-doc-right-navs-title">本页目录</div>
          {rightNavs.map((item, index) => {
            if (index) {
              return (
                <div
                  className={`antm-doc-right-nav antm-doc-right-nav-${
                    item === findMaxIntersectionRatio(currentNavs, pageYOffset)
                      ? 'active'
                      : 'no'
                  }`}
                  key={`doc-right-navs${item}`}
                  onClick={() => targetChange(item)}
                >
                  {item}
                </div>
              )
            } else return null
          })}
        </div>
      )}
    </div>
  )
}

function findMaxIntersectionRatio(arr, pageYOffset) {
  const max = 0
  let cur = 0
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item.intersectionRatio > max) {
      cur = i
    }
  }

  if (pageYOffset > 40) {
    return arr[cur]?.id
  } else {
    return ''
  }
}

export default memo(Docs)

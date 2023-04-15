import type { IDocsConfig } from '../../../types/index'
// @ts-ignore
import React, { useState, useEffect, useMemo } from 'react'
import Page from '../../pages/index'
import {
  preCls,
  getSimulatorUrl,
  scrollToTargetParent,
} from '../../utils/common'
import { UrlConext } from '../../context'
import Header from '../header'
import Menu from '../menu'
import './index.less'

export default function PageLayout() {
  const [docsConfig, setDocsConfig] = useState<IDocsConfig>()
  const [markdownMain, setMarkdownMain] = useState<any>()
  const [currentUrl, setCurrentUrl] = useState('')
  const [iframeTop, setIframeTop] = useState(84)
  const [pageYOffset, setpageYOffset] = useState(0)
  const [loading, setLoading] = useState([true, true])

  useEffect(() => {
    // @ts-ignore
    import('../../.temp/antm-doc/all-config.js').then((res) => {
      setDocsConfig(res.default.config as IDocsConfig)
      loading[0] = false
      setLoading([...loading])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // @ts-ignore
    import('../../.temp/antm-doc/markdown-main.js').then((res) => {
      setMarkdownMain(res.default)
      loading[1] = false
      setLoading([...loading])
      console.info(
        'DOC_ROUTERS',
        Object.keys(res.default).map((item) => item.replace('__', '/')),
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const mobileUrl = useMemo(
    () => {
      if (docsConfig?.simulator) {
        return getSimulatorUrl(docsConfig.simulator, currentUrl)
      } else return ''
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUrl],
  )

  useEffect(() => {
    window.addEventListener('scroll', function () {
      requestIdleCallback(() => {
        setpageYOffset(this.scrollY)
        if (this.scrollY < 74 && this.scrollY > 30) {
          setIframeTop(84 - this.scrollY)
        } else if (this.scrollY >= 74) {
          setIframeTop(10)
        } else {
          setIframeTop(84)
        }
      })
    })
  }, [])

  useEffect(() => {
    if (markdownMain) {
      const targetStr = location.href.split('?')[1]
      if (targetStr) {
        const targetId = targetStr.split('=')[1]
        if (targetId) {
          setTimeout(() => {
            scrollToTargetParent(targetId)
          }, 166)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!loading[0] && !loading[1]) {
    return (
      <UrlConext.Provider value={[currentUrl, setCurrentUrl]}>
        <div className={`${preCls}-container`}>
          <Header
            links={docsConfig?.headerLinks || []}
            title={docsConfig?.title || ''}
            logo={docsConfig?.logo}
          />
          <div className={`${preCls}-main`}>
            <Menu
              menu={docsConfig?.menu || []}
              routeType={docsConfig?.route?.type}
            />
            <div className={`${preCls}-body`}>
              <Page
                pageYOffset={pageYOffset}
                markdownMain={markdownMain}
                routerType={docsConfig?.route?.type}
                simulator={!!docsConfig?.simulator}
                firstPage={docsConfig?.menu[0]?.items[0]?.path}
              />
              {docsConfig?.simulator && (
                <iframe
                  className={`${preCls}-body-example`}
                  src={mobileUrl}
                  style={{ top: iframeTop }}
                />
              )}
            </div>
          </div>
        </div>
      </UrlConext.Provider>
    )
  } else return <></>
}

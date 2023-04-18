/* eslint-disable import/no-unresolved */
import type { IDocsConfig } from '../../../types/index'
// @ts-ignore
import React, { useState, useEffect } from 'react'
// @ts-ignore
import Page from '../../pages/index'
import { preCls, scrollToTargetParent } from '../../utils/common'
import { UrlConext } from '../../context'
import './index.less'
import { usePersistFn } from '../../hooks'
import Header from '../header'
import Menu from '../menu'
import { Example } from '../example'

export default function PageLayout() {
  const [docsConfig, setDocsConfig] = useState<IDocsConfig>()
  const [markdownMain, setMarkdownMain] = useState<any>()
  const [currentUrl, setCurrentUrl] = useState('')
  const [loading, setLoading] = useState(true)

  const initLoadDoc = usePersistFn(async () => {
    const [_docsConfig, _markdownMain] = await Promise.all([
      // @ts-ignore
      import('../../.temp/antm-doc/all-config.js'),
      // @ts-ignore
      import('../../.temp/antm-doc/markdown-main.js'),
    ])
    setDocsConfig(_docsConfig.default.config as IDocsConfig)
    setMarkdownMain(_markdownMain.default)
    console.info(
      'DOC_ROUTERS',
      Object.keys(_markdownMain.default).map((item) => item.replace('__', '/')),
    )
    setLoading(false)
  })

  useEffect(() => {
    initLoadDoc()
  }, [initLoadDoc])

  useEffect(() => {
    if (!markdownMain) {
      return
    }
    const targetStr = location.href.split('?')[1]
    if (targetStr) {
      const targetId = targetStr.split('=')[1]
      if (targetId) {
        setTimeout(() => {
          scrollToTargetParent(targetId)
        }, 166)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return null
  }

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
          <Page
            markdownMain={markdownMain}
            routerType={docsConfig?.route?.type}
            simulator={!!docsConfig?.simulator}
            firstPage={docsConfig?.menu?.[0]?.items?.[0]?.path}
          />
          {docsConfig?.simulator && (
            <Example simulator={docsConfig?.simulator} url={currentUrl} />
          )}
        </div>
      </div>
    </UrlConext.Provider>
  )
}

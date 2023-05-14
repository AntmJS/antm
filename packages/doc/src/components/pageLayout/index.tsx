import type { IDocsConfig } from '../../../types/index'
// @ts-ignore
import React, { useState, useEffect, useMemo } from 'react'
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import pkg from 'CWD/package.json'
import Page from '../../pages/index'
import {
  preCls,
  scrollToTargetParent,
  JSONparse,
  formatPkgName,
} from '../../utils/common'
import { UrlConext, LangConext } from '../../context'
import './index.less'
import { usePersistFn } from '../../hooks'
import Header from '../header'
import Menu from '../menu'
import { Example } from '../example'

const pkgName = formatPkgName(pkg.name)

export default function PageLayout() {
  const [docsConfig, setDocsConfig] = useState<IDocsConfig>()
  const [markdownMain, setMarkdownMain] = useState<any>()
  const [currentUrl, setCurrentUrl] = useState('')
  const [lang, setLang] = useState('')
  const [loading, setLoading] = useState(true)
  const [routes, setRoutes] = useState<any[]>([])

  const initLoadDoc = usePersistFn(async () => {
    const [_docsConfig, _markdownMain] = await Promise.all([
      // @ts-ignore
      import(`CWD/.temp/${pkgName}/all-config.js`),
      // @ts-ignore
      import(`CWD/.temp/${pkgName}/markdown-main.js`),
    ])
    setDocsConfig(JSONparse(_docsConfig.default.config) as IDocsConfig)
    setMarkdownMain(_markdownMain.default)
    const allRoutes = Object.keys(_markdownMain.default)
      .map((item) => item.replace('__', '/'))
      .filter((item) => {
        // 过滤demo和demoContainer的异步容器的key
        return !item.includes('/demo-') && !item.includes('DEMO_')
      })
    setRoutes(allRoutes)
    console.info(allRoutes, '______________________DOC_ROUTERS')
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

  const menu = useMemo(() => {
    return Array.isArray(docsConfig?.menu)
      ? docsConfig?.menu || []
      : docsConfig?.menu?.[lang] || []
  }, [docsConfig?.menu, lang])

  if (loading) {
    return null
  }

  return (
    <div>
      {/** @ts-ignore */}
      <LangConext.Provider
        value={[
          lang,
          (v) => {
            setLang(v)
            window['__LANGE__'] = v
          },
        ]}
      >
        {/** @ts-ignore */}
        <UrlConext.Provider value={[currentUrl, setCurrentUrl]}>
          <div className={`${preCls}-container`}>
            <Header
              links={docsConfig?.headerLinks || []}
              title={docsConfig?.title || ''}
              logo={docsConfig?.logo}
              i18n={docsConfig?.i18n}
              routes={routes}
              routeType={docsConfig?.route?.type}
            />
            <div className={`${preCls}-main`}>
              <Menu
                menu={menu}
                routeType={docsConfig?.route?.type}
                i18n={docsConfig?.i18n}
                routes={routes}
              />
              {/** @ts-ignore */}
              <Page
                markdownMain={markdownMain}
                routerType={docsConfig?.route?.type}
                simulator={!!docsConfig?.simulator}
                firstPage={docsConfig?.menu?.[0]?.items?.[0]?.path}
              />
              {docsConfig?.simulator && (
                <>
                  {/** @ts-ignore */}
                  <Example simulator={docsConfig?.simulator} url={currentUrl} />
                </>
              )}
            </div>
          </div>
        </UrlConext.Provider>
      </LangConext.Provider>
    </div>
  )
}

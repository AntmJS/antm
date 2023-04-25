// @ts-ignore
import React, { useState, useEffect } from 'react'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { routerEvent } from '../../utils/history'
import * as search from '../../utils/search'
import { SearchIcon, ClearIcon, PageIcon, LinkIcon } from './icons'
import './index.less'

const mdTypeToTag = {
  Table: 'table',
  Paragraph: 'p',
  CodeBlock: 'code',
}
const clsPre = 'antm-doc-search'
const config = {
  highlight: function (str, lang) {
    return hljs.highlight(str, { language: lang || 'markdown' }).value
  },
  html: true,
}

const Markdown = MarkdownIt(config)
type Iprops = {
  routeType?: 'hash' | 'history'
}

export default function Search(props: Iprops) {
  const [show, setShow] = useState(true)
  const [result, setResult] = useState({})

  useEffect(() => {
    requestIdleCallback(async () => {
      await search.init()
      const res = await search.run('规则')

      res.map((item) => {
        const menuName = item.belongMenu.name
        if (!result[menuName]) {
          result[menuName] = [item]
        } else {
          result[menuName].push(item)
        }
      })

      setResult({ ...result })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePage = (path, docTarget) => {
    setShow(false)
    routerEvent.switch(path, props.routeType)
    const mdType = docTarget.doc.type
    const tagType = mdTypeToTag[mdType]

    if (tagType) {
      document
        .querySelectorAll(`.antm-docs-markdown ${tagType}`)
        [docTarget.mdTypeIndex]?.scrollIntoView()
    }
  }

  return (
    <>
      <div className={`${clsPre}-btn-wrapper`}>
        <SearchIcon className={`${clsPre}-btn`} onClick={() => setShow(true)} />
      </div>
      {show && (
        <>
          <div className={`${clsPre}-mask`} onClick={() => setShow(false)} />
          <div className={`${clsPre}-modal`}>
            <div className={`${clsPre}-input`}>
              <SearchIcon className={`${clsPre}-btn`} />
              <input placeholder="搜索文档" />
              <ClearIcon />
            </div>

            <div className={`${clsPre}-result`}>
              {Object.keys(result).map((key, i) => {
                const item = result[key]
                return (
                  <div key={`seatch-result-rows${i}`}>
                    <div className="result-nav">{key}</div>
                    <div className="result-rows">
                      {item.map((it, index) => (
                        <div
                          className="row"
                          key={`seatch-result-item${index}@${i}`}
                          onClick={() => handlePage(it.routePath, it)}
                        >
                          <PageIcon />
                          <div className="md-content">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: Markdown.render(it.doc.raw),
                              }}
                            ></div>
                          </div>
                          <LinkIcon />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </>
  )
}

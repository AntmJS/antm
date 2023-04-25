// @ts-ignore
import React, { useState, useEffect, useRef } from 'react'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { routerEvent } from '../../utils/history'
import * as search from '../../utils/search'
import { useDebounce } from '../../hooks/index'
import {
  SearchIcon,
  ClearIcon,
  PageIcon,
  LinkIcon,
  LoadingIcon,
  EmptyIcon,
} from './icons'
import './index.less'

const clsPre = 'antm-doc-search'
const mdTypeToTag = {
  Table: 'table',
  Paragraph: 'p',
  CodeBlock: 'code',
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  List: 'ul',
}
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
  const [show, setShow] = useState(false)
  const [result, setResult] = useState({})
  const [words, setWords] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchWords, setSearchWords] = useState('')
  const inputRef = useRef<any>()

  useEffect(() => {
    requestIdleCallback(async () => {
      await search.init()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePage = (path, docTarget) => {
    setShow(false)
    routerEvent.switch(path, props.routeType)
    let mdType = docTarget.doc.type
    if (mdType === 'Header') {
      mdType = `H${docTarget.doc.depth}`
    }
    const tagType = mdTypeToTag[mdType]
    console.info(docTarget)

    if (tagType) {
      const tt = document.querySelectorAll(`.antm-docs-markdown ${tagType}`)[
        docTarget.mdTypeIndex
      ]

      const rect = tt?.getClientRects() || []
      window.scrollTo(0, rect[0]?.y ? rect[0]?.y - 50 : 0)
    }
  }

  const handleSearch = useDebounce(
    async (words) => {
      setSearchWords(words)
      if (!words) return
      setLoading(true)
      const res = await search.run(words)
      const result = {}

      res.map((item) => {
        const menuName = item.belongMenu.title
        if (!result[menuName]) {
          result[menuName] = [item]
        } else {
          result[menuName].push(item)
        }
      })

      setResult(result)
      setTimeout(() => {
        setLoading(false)
      }, 700)
    },
    1000,
    [words],
  )

  const handleInput = (e) => {
    const ws = e.target.value
    setWords(ws)
    handleSearch(ws)
  }

  useEffect(() => {
    if (!show) {
      setWords('')
      setSearchWords('')
    }
    if (show) {
      inputRef.current?.focus()
    }
  }, [show])

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
              <input
                ref={inputRef}
                placeholder="搜索文档"
                value={words}
                onChange={handleInput}
              />
              <ClearIcon onClick={() => setWords('')} />
            </div>
            {loading && (
              <div className="loading-wrapper">
                <LoadingIcon />
              </div>
            )}
            {!loading && searchWords && Object.keys(result).length === 0 && (
              <div className="empty-wrapper">
                <EmptyIcon />
                <div className="empty-tips">
                  未找到关于<span> &ldquo;{searchWords} &ldquo;</span>{' '}
                  的搜索结果
                </div>
              </div>
            )}
            {!!Object.keys(result).length && !loading && (
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
                            <div className="md-content-wrapper">
                              <div className="md-content">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: Markdown.render(it.doc.raw),
                                  }}
                                ></div>
                              </div>
                            </div>
                            <LinkIcon />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

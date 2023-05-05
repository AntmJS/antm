// @ts-ignore
import React, { useState, useEffect, useRef, useContext } from 'react'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { routerEvent } from '../../utils/history'
import * as search from '../../utils/search'
import { useDebounce } from '../../hooks/index'
import { LangConext } from '../../context'
import { Ii18n } from '../../../types/index'
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
  Paragraph: 'p',
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
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
  i18n?: Ii18n
}

export default function Search(props: Iprops) {
  const [show, setShow] = useState(false)
  const [result, setResult] = useState({})
  const [words, setWords] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchWords, setSearchWords] = useState('')
  const [lang, setLang] = useContext(LangConext)
  const inputRef = useRef<any>()

  const handlePage = (path, docTarget) => {
    setShow(false)
    routerEvent.switch(path, props.routeType)
    const lastPathItem = path.split('/')[path.split('/').length - 1]
    if (props.i18n?.langs.includes(lastPathItem)) {
      setLang(lastPathItem)
    }
    let mdType = docTarget.doc.type
    if (mdType === 'Header') {
      mdType = `H${docTarget.doc.depth}`
    }
    const tagType = mdTypeToTag[mdType]

    setTimeout(() => {
      if (tagType) {
        const tt = document.querySelectorAll(`.antm-docs-markdown ${tagType}`)[
          docTarget.mdTypeIndex
        ]

        const rect = tt?.getClientRects() || []
        window.scrollTo(0, rect[0]?.y ? rect[0]?.y - 50 : 0)
      }
    })
  }

  const handleSearch = useDebounce(
    async (words) => {
      setSearchWords(words)
      if (!words) return
      setLoading(true)
      await search.init()
      const res = await search.run(words)
      const result = {}

      console.info(res)

      res.forEach((item) => {
        const menuName = item.belongMenu.title
        if (props.i18n) {
          const pathArr = item.routePath.split('/')
          const lang__ = pathArr[pathArr.length - 1]
          const curLang = props.i18n.langs.includes(lang__)
            ? lang__
            : props.i18n.noSuffixLang
          if (curLang !== lang) return // 过滤非当前lang
        }
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
                placeholder="search"
                value={words}
                onChange={handleInput}
              />
              <ClearIcon
                onClick={() => {
                  setWords('')
                  setResult({})
                  setSearchWords('')
                }}
              />
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
                  No results for <span> &ldquo;{searchWords} &ldquo;</span>
                </div>
              </div>
            )}
            {!!Object.keys(result).length && !loading && (
              <div className={`${clsPre}-result`}>
                {Object.keys(result).map((key, i) => {
                  const item = result[key]
                  return (
                    <div key={`seatch-result-rows${i}`}>
                      <div
                        className="result-nav"
                        onClick={() => {
                          routerEvent.switch(item[0].routePath, props.routeType)
                          setShow(false)
                        }}
                      >
                        {key === 'undefined' ? '--' : key}
                      </div>
                      <div className="result-rows">
                        {item.map((it, index) => (
                          <div
                            className="row"
                            key={`seatch-result-item${index}@${i}`}
                            onClick={() => handlePage(it.routePath, it)}
                          >
                            <PageIcon />
                            <div className="md-content-wrapper">
                              {it.currentH3Title &&
                                it.doc.type !== 'Header' &&
                                it.doc.depth !== 3 && (
                                  <h3 className="currentH3Title">
                                    {it.currentH3Title}&nbsp;
                                  </h3>
                                )}
                              <div className="md-content">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: Markdown.render(
                                      cutMarkdownRaw(it.doc, searchWords),
                                    ),
                                  }}
                                ></div>
                              </div>
                            </div>
                            <LinkIcon className="link-icon" />
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

function cutMarkdownRaw(doc, query) {
  const { raw } = doc
  if (raw.includes('\n')) {
    const arr = raw.split('\n')
    let matchIndex = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].includes(query)) {
        matchIndex = i
        arr[i] = arr[i].replace(
          query,
          `<span class='primary-color'>${query}</span>`,
        )
        break
      }
    }

    return arr
      .slice(matchIndex - 3 < 0 ? 0 : matchIndex - 3, matchIndex + 3)
      .map((item) => {
        return `<div>${item}</div>`
      })
      .join('')
  } else {
    const matchIndex = raw.indexOf(query)
    const start = matchIndex - 40
    return raw
      .substring(start > 0 ? start : 0, matchIndex + 40)
      .replace(/`/g, '')
      .replace(query, `<span class='primary-color'>${query}</span>`)
  }
}

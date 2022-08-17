/* eslint-disable react/prop-types */
import React, { useLayoutEffect, useCallback, useState, useEffect } from 'react'
import ReactJson from 'react-json-view'

export function ApiUi(props) {
  const { apiData, title, mockPort = 10099 } = props
  const data = {}

  Object.keys(apiData).map((key) => {
    data[key] = {}
    for (const kk in apiData[key]) {
      const item = apiData[key][kk]
      if (item.url && item.description) {
        data[key][kk] = item
      }
    }
  })
  const apiModuleNames = Object.keys(data)
  const [active, setActive] = useState([0, 0])
  const [urls, setUrls] = useState([])
  const [api, setApi] = useState()

  const hashChange = () => {
    const hash_ = window.location.hash.replace('#/', '')
    if (!hash_.includes('readme')) {
      const arr = hash_.split('/')
      setActive([Number(arr[0]), Number(arr[1])])
    }
  }

  useLayoutEffect(() => {
    hashChange()
    window.addEventListener('hashchange', hashChange)
    return () => {
      window.removeEventListener('hashchange', hashChange)
    }
  }, [])

  useEffect(() => {
    const apiModuleKey = apiModuleNames[active[0]]
    const urls_ = []
    if (apiModuleKey) {
      const moduleData = filterNotNull(data[apiModuleKey])
      Object.keys(moduleData).forEach((key, index) => {
        if (index === active[1]) {
          setApi(moduleData[key])
        }
        if (moduleData[key].url) {
          urls_.push({
            title: moduleData[key].description,
            url: moduleData[key].url,
          })
        }
      })
      setUrls(urls_)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const setActiveHeader = useCallback(
    function (index, target) {
      active[target] = index
      if (target === 0) {
        active[1] = 0
      }
      window.location.hash = `/${active[0]}/${active[1]}`
    },
    [active],
  )

  return (
    <div className="api-ui-container">
      <div className="api-ui-header">
        <div className="header-l">
          <span className="logo-title">{title || `@antmjs/api`}</span>
        </div>
        <div
          className="goReadme"
          onClick={() => {
            window.open('https://github.com/AntmJS/antm/tree/main/packages/api')
          }}
        >
          查看文档
        </div>
      </div>
      <div className="mudules-header">
        {apiModuleNames.map((item, index) => (
          <div
            className={`mudules-item ${
              active[0] === index ? 'mudules-item-active' : ''
            }`}
            key={`${index}mudules-header`}
            onClick={() => setActiveHeader(index, 0)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="body-box">
        <div className="menu-box">
          {urls.map((item, index) => (
            <div
              onClick={() => setActiveHeader(index, 1)}
              className={`menu-item ${
                active[1] === index ? 'menu-item-active' : ''
              }`}
              key={`${index}apiModuleNames`}
            >
              <div className="menu-name">{item.title}</div>
              <div className="menu-key">{item.url}</div>
            </div>
          ))}
        </div>

        <div className="api-body">
          {api && (
            <>
              <div className="api-title">{api.description}</div>
              <div className="api-row">
                <span>地址：</span>
                <span
                  className="api-url"
                  onClick={() =>
                    window.open(`http://localhost:${mockPort}${api.url}`)
                  }
                >
                  {api.url}
                </span>
              </div>

              <div className="api-row">
                <span>请求方式：</span>
                <span>{api.method}</span>
              </div>

              <div className="api-row">
                <span>简介：</span>
                <span>{api.introduce || '--'}</span>
              </div>

              <div className="api-title l-top">请求参数</div>
              <div className="api-tree">
                <ReactJson
                  name="请求参数"
                  indentWidth={6}
                  displayObjectSize={false}
                  enableClipboard={false}
                  src={api ? transformData(api.properties.request) : ''}
                />
              </div>

              <div className="api-title l-top">响应内容</div>
              <div className="api-tree">
                <ReactJson
                  name="响应内容"
                  indentWidth={6}
                  displayObjectSize={false}
                  enableClipboard={false}
                  src={api ? transformData(api.properties.response) : ''}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function transformData(data, target) {
  if (!data) return
  if (data.type === 'object') {
    let result = target || {}
    for (const key in data.properties) {
      const item = data.properties[key]
      if (['number', 'string', 'boolean'].includes(item.type)) {
        result[key] = `${item.type}${
          data.required && data.required.includes(key) ? '(必填)' : '(非必填)'
        }${item.description ? `【${item.description}】` : ''}`
      } else {
        let key__ = `${key} ${
          data.required && data.required.includes(key) ? '(必填)' : '(非必填)'
        }${item.description ? `【${item.description}】` : ''}`
        if (item.type === 'array') {
          result[key__] = []
        } else {
          result[key__] = {}
        }
        result[key__] = transformData(item, result[key__])
      }
    }

    return result
  } else if (data.type === 'array') {
    if (data.items.type === 'object') {
      let arr = [{}]
      transformData(data.items, arr[0])
      return arr
    } else {
      return [data.items.type]
    }
  }
}

function filterNotNull(data) {
  const res = {}
  for (const key in data) {
    const item = data[key]
    if (key !== 'Record<string,any>') {
      res[key] = item
    }
  }

  return res
}

import React, { useLayoutEffect, useCallback, useState, useEffect } from 'react'
import ReactJson from 'react-json-view'
import dataU from './data/data.js'
const data = {}
Object.keys(dataU).map((key) => {
  data[key] = {}

  for (const kk in dataU[key]) {
    const item = dataU[key][kk]

    if (item.url && item.description) {
      data[key][kk] = item
    }
  }
})
const apiModuleNames = Object.keys(data)
export function ApiUi(props) {
  // eslint-disable-next-line react/prop-types
  const { mockPort = 10099 } = props
  const [active, setActive] = useState([0, 0])
  const [urls, setUrls] = useState([])
  const [api, setApi] = useState()
  const [hash, setHash] = useState('')

  const hashChange = () => {
    const hash_ = window.location.hash?.replace('#/', '')
    setHash(hash_)

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
    } // eslint-disable-next-line react-hooks/exhaustive-deps
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
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: 'api-ui-container',
    },
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'api-ui-header',
      },
      /*#__PURE__*/ React.createElement(
        'div',
        {
          className: 'header-l',
        },
        /*#__PURE__*/ React.createElement('img', {
          className: 'logo',
          src: 'https://antm-js.gitee.io/resource/antmjs-vantui.jpg',
        }),
        /*#__PURE__*/ React.createElement(
          'span',
          {
            className: 'logo-title',
          },
          '@antmjs/open-ui',
        ),
      ),
      /*#__PURE__*/ React.createElement(
        'div',
        {
          className: 'goReadme',
          onClick: () => {
            window.open('/#/readme')
          },
        },
        '\u67E5\u770B\u6587\u6863',
      ),
    ),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'mudules-header',
      },
      apiModuleNames.map((item, index) =>
        /*#__PURE__*/ React.createElement(
          'div',
          {
            className: `mudules-item ${
              active[0] === index ? 'mudules-item-active' : ''
            }`,
            key: `${index}mudules-header`,
            onClick: () => setActiveHeader(index, 0),
          },
          item,
        ),
      ),
    ),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'body-box',
      },
      /*#__PURE__*/ React.createElement(
        'div',
        {
          className: 'menu-box',
        },
        urls.map((item, index) =>
          /*#__PURE__*/ React.createElement(
            'div',
            {
              onClick: () => setActiveHeader(index, 1),
              className: `menu-item ${
                active[1] === index ? 'menu-item-active' : ''
              }`,
              key: `${index}apiModuleNames`,
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'menu-name',
              },
              item.title,
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'menu-key',
              },
              item.url,
            ),
          ),
        ),
      ),
      /*#__PURE__*/ React.createElement(
        'div',
        {
          className: 'api-body',
        },
        api &&
          /*#__PURE__*/ React.createElement(
            React.Fragment,
            null,
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'api-title',
              },
              api.description,
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'api-row',
              },
              /*#__PURE__*/ React.createElement(
                'span',
                null,
                '\u5730\u5740\uFF1A',
              ),
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  className: 'api-url',
                  onClick: () =>
                    window.open(`http://localhost:${mockPort}${api.url}`),
                },
                api.url,
              ),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'api-row',
              },
              /*#__PURE__*/ React.createElement(
                'span',
                null,
                '\u8BF7\u6C42\u65B9\u5F0F\uFF1A',
              ),
              /*#__PURE__*/ React.createElement('span', null, api.method),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'api-row',
              },
              /*#__PURE__*/ React.createElement(
                'span',
                null,
                '\u7B80\u4ECB\uFF1A',
              ),
              /*#__PURE__*/ React.createElement(
                'span',
                null,
                api.introduce || '--',
              ),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'api-title l-top',
              },
              '\u8BF7\u6C42\u53C2\u6570',
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'api-tree',
              },
              /*#__PURE__*/ React.createElement(ReactJson, {
                name: '\u8BF7\u6C42\u53C2\u6570',
                indentWidth: 6,
                displayObjectSize: false,
                enableClipboard: false,
                src: api ? transformData(api.properties.request) : '',
              }),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'api-title l-top',
              },
              '\u54CD\u5E94\u5185\u5BB9',
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'api-tree',
              },
              /*#__PURE__*/ React.createElement(ReactJson, {
                name: '\u54CD\u5E94\u5185\u5BB9',
                indentWidth: 6,
                displayObjectSize: false,
                enableClipboard: false,
                src: api ? transformData(api.properties.response) : '',
              }),
            ),
          ),
      ),
    ),
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

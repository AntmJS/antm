// @ts-ignore
import React, { version } from 'react'
import { createApp } from 'vue'
import ReactDom from 'react-dom'

export function handleShowCode(e, btn) {
  e.stopPropagation()
  const codeWrapperId = btn.parentNode.id
  const codeBox = document.querySelector(`#${codeWrapperId} .code-box`)
  if (codeBox) {
    const curHeight = getComputedStyle(codeBox).height
    codeBox['style'].height = curHeight === '0px' ? 'auto' : '0px'

    const btnStyle = getComputedStyle(btn)
    const transform =
      btnStyle.getPropertyValue('-webkit-transform') ||
      btnStyle.getPropertyValue('-moz-transform') ||
      btnStyle.getPropertyValue('-o-transform') ||
      btnStyle.getPropertyValue('transform')

    btn['style'].transform = transform === 'none' ? 'rotateX(180deg)' : 'none'
  }
}

export function bindEvent() {
  setTimeout(() => {
    const codeBtns = document.getElementsByClassName('show-code-btn') || []
    for (let i = 0; i < codeBtns.length; i++) {
      const btn = codeBtns[i]
      if (btn) btn['onclick'] = (e) => handleShowCode(e, btn)
    }
    const tabBtns = document.getElementsByClassName('code-tab-name')
    for (let i = 0; i < tabBtns.length; i++) {
      const btn = tabBtns[i]
      if (btn) {
        btn['onclick'] = (e) => {
          e.stopPropagation()
          const index = e.target.id.replace('name', '')
          const allCodeItems =
            e.target.parentNode.parentNode.getElementsByClassName(`code-item`)
          const allTabs =
            e.target.parentNode.getElementsByClassName(`code-tab-name`)
          if (allCodeItems.length) {
            for (let i = 0; i < allCodeItems.length; i++) {
              if (allCodeItems[i]) {
                if (`${i}` === index) {
                  allCodeItems[i].style.display = 'block'
                  allTabs[i].setAttribute(
                    'class',
                    'code-tab-name code-tab-name-active',
                  )
                } else {
                  allCodeItems[i].style.display = 'none'
                  allTabs[i].setAttribute('class', 'code-tab-name')
                }
              }
            }
          }
        }
      }
    }
  }, 66)
}

let VueDemoContainer
let ReactDemoContainer

export function renderDemoCode({ DemoComponent, id, markdownMain }) {
  if (!ReactDemoContainer) {
    markdownMain['DEMO_REACT_CONTAINER']?.then((res) => {
      ReactDemoContainer = res.default
    })
  }

  if (!VueDemoContainer) {
    markdownMain['DEMO_VUE_CONTAINER']?.then((res) => {
      VueDemoContainer = res.default
    })
  }

  setTimeout(() => {
    const dom = document.getElementById(id)
    const type =
      DemoComponent.render && toString.call(DemoComponent) === '[object Object]'
        ? 'vue'
        : 'react'

    const insertProps = { _rootid: id }

    if (dom) {
      if (type === 'react') {
        if (ReactDemoContainer) {
          rcRender({
            dom,
            app: (
              <ReactDemoContainer>
                <DemoComponent {...insertProps} />
              </ReactDemoContainer>
            ),
          })
        } else {
          rcRender({
            dom,
            app: <DemoComponent {...insertProps} />,
          })
        }
      } else {
        const app = createApp(DemoComponent)
        app.mount(`#${id}`)
      }
    }
  }, 133)
}

const rootMap = new Map()

export async function rcRender({ dom, app }) {
  const vm = Number(version.split('.')[0])
  if (vm >= 18) {
    let root
    // @ts-ignore
    const rcDom = await import('react-dom/client')
    if (rootMap.has(dom)) {
      root = rootMap.get(dom)
    } else {
      root = rcDom.default.createRoot(dom)
      rootMap.set(dom, root)
    }
    root.render(app)
  } else {
    // @ts-ignore
    // eslint-disable-next-line import/no-named-as-default-member
    ReactDom.render(app, dom)
  }
}

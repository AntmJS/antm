// @ts-ignore
import React from 'react'
import { createApp } from 'vue'
import { createRoot } from 'react-dom/client'

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

    if (dom) {
      if (type === 'react') {
        const root = createRoot(dom)
        if (ReactDemoContainer) {
          root.render(
            <ReactDemoContainer>
              <DemoComponent />
            </ReactDemoContainer>,
          )
        } else {
          root.render(<DemoComponent />)
        }
      } else {
        const app = createApp(DemoComponent)
        app.mount(`#${id}`)
      }
    }
  }, 33)
}

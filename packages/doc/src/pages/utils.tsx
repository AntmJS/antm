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
        console.info(DemoComponent)
        const app = createApp(DemoComponent)
        app.mount(`#${id}`)
      }
    }
  }, 33)
}

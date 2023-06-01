// @ts-ignore
import React from 'react'
import App from './app'
import { rcRender } from './pages/utils'
import './style.less'

const dom = document.getElementById('root')

if (dom) {
  rcRender({
    dom,
    app: <App />,
  })
}

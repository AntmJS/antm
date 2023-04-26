// @ts-ignore
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import './style.less'

const dom = document.getElementById('root')

if (dom) {
  const root = createRoot(dom)
  root.render(<App />)
}

import React, { version } from 'react'
import { createRoot } from 'react-dom/client'
import { render } from 'react-dom'
import { ApiUi } from './api-ui.js'
/** API_DATA_IMPORT */
import './app.less'

function App() {
  return <ApiUi md={true} /** API_DATA_USE */ />
}

const dom = document.getElementById('root')

if (parseInt(version.split('.')[0]) < 18) {
  render(<App />, dom)
} else if (createRoot) {
  createRoot(document.getElementById('root')).render(<App />)
}

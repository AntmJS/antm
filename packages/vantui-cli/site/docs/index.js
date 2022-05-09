import * as React from 'react'
import ReactDom from 'react-dom'
import { createRoot } from 'react-dom/client'
import App from './app.js'

// ReactDom.render(<App />, document.getElementById("root"));

const root = createRoot(document.getElementById('root'))

root.render(<App />)

import React from 'react'
import { render } from 'react-dom'
import readme from '../README.md'
import { ApiUi } from './api-ui.js'
import MarkdownBox from './markdown/index.js'
import './app.less'

function App() {
  if (window.location.hash.includes('readme')) {
    return (
      <div className="api-ui-readme-body">
        <MarkdownBox>{readme}</MarkdownBox>
      </div>
    )
  }

  return <ApiUi />
}

const dom = document.getElementById('root')

render(<App />, dom)

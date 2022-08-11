import path from 'path'
import fs from 'fs'
import log from '../log.js'

const evalTemp = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
}

let isWarning = false

export function getPrettierConfig(): Promise<Record<string, any>> {
  return new Promise((resolve) => {
    const prettierPath = path.join(process.cwd(), '.prettierrc')
    if (fs.existsSync(prettierPath)) {
      const content = fs.readFileSync(prettierPath, 'utf-8')
      eval(`evalTemp = ${content}`)
    } else {
      if (!isWarning) {
        isWarning = true
        console.info(log.warning('未找到本地.prettierrc配置,将使用默认配置'))
      }
    }

    resolve(evalTemp)
  })
}

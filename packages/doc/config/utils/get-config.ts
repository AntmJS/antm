import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { IDocsConfig } from '../../types'
import { CONFIG_PATH } from './contanst'

// https://regexr.com/47jlq
const IMPORT_RE =
  /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from(\s+)?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g
export const configAboutCache: string[] = []

async function getConfig(): Promise<{
  docs: IDocsConfig
}> {
  if (!existsSync(CONFIG_PATH)) throw Error(`it's not exsist: ${CONFIG_PATH}`)
  clearconfigAboutCache()
  getconfigAboutCache()
  const result = await import(CONFIG_PATH)

  return result.default
}

function getconfigAboutCache() {
  const content = readFileSync(CONFIG_PATH, 'utf8')
  const allImports = content.match(IMPORT_RE) || []
  for (let i = 0; i < allImports.length; i++) {
    const importItem = allImports[i] || ''
    if (importItem?.includes('./')) {
      const name =
        importItem.split('from')[1]?.replace(/\'|\"|\s|\;/g, '') || ''
      let filePath = resolve(CONFIG_PATH, '../', name)
      if (!filePath.includes('.')) {
        filePath = `${filePath}.${getExistSuffix(filePath)}`
      }
      configAboutCache.push(filePath)
    }
  }
}

function getExistSuffix(spath) {
  const allSuffix = ['ts', 'js', 'json']
  let existsSuffix = ''
  for (let i = 0; i < allSuffix.length; i++) {
    const suffix = allSuffix[i] || ''
    if (existsSync(`${spath}.${suffix}`)) {
      existsSuffix = suffix
      break
    }
  }

  return existsSuffix
}

function clearconfigAboutCache() {
  delete require.cache[CONFIG_PATH]
  if (configAboutCache.length) {
    configAboutCache.forEach((key) => {
      delete require.cache[key]
    })
  }
}

export { getConfig }

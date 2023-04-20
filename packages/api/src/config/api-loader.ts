import { join } from 'path'
import getConfig from './getConfig'

const apiConfig = getConfig()
const { port } = apiConfig?.['mock'] || {}

export default function apiLoader(source) {
  // @ts-ignore
  this.cacheable = false
  const CWD = process.cwd()
  // @ts-ignore
  const callback = this.async()

  if (source.includes('API_DATA_IMPORT')) {
    source = source
      .replace(
        '/** API_DATA_IMPORT */',
        `import ApiData from "${join(CWD, './.cache/api-ui-data.json')}"`,
      )
      .replace(
        `/** API_DATA_USE */`,
        `apiData={ApiData} mockPort={${port}} ${
          apiConfig['title'] ? `title="${apiConfig['title']}"` : ''
        }`,
      )
  }

  callback(null, source)
}

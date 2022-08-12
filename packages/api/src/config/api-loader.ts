/* eslint-disable @typescript-eslint/ban-ts-comment */
import { join } from 'path'

export default function apiLoader(source: any) {
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
      .replace(`/** API_DATA_USE */`, `apiData={ApiData}`)
  }

  callback(null, source)
}

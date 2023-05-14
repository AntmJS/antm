// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import pkg from 'CWD/package.json'
import { formatPkgName } from '../utils/common'

let searchData: any[] = []
const pkgName = formatPkgName(pkg.name)
let documentIndex: any = {}

export async function init() {
  const flexsearchDoc = (await import('flexsearch/src/document')).default
  documentIndex = new flexsearchDoc({
    tokenize: 'full',
    document: {
      id: 'routePath',
      index: ['doc[]:raw'],
    },
  })
  // @ts-ignore
  searchData = (await import(`CWD/.temp/${pkgName}/all-search.json`)).default

  searchData.map((item) => {
    documentIndex.add(item)
  })
}

export async function run(query: string) {
  const { result } =
    (
      await documentIndex?.search(query, {
        index: 'doc[]:raw',
        enrich: true,
      })
    )?.[0] || {}

  if (result) {
    const detailRes: any = []
    result.forEach((item) => {
      const index = Number(item.split('@')[1])
      detailRes.push({
        ...searchData[index],
        routePath: item.split('@')[0],
      })
    })

    return detailRes
  } else {
    return []
  }
}

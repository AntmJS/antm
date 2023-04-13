export function createDefaultModel({
  requestImport = "import { createFetch } from '@/utils/request'",
  requestFnName = 'createFetch',
  fileName = 'a',
  data = {},
}) {
  const packages: string[] = []
  let requestActionsStr = ''

  for (const key in data) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const item = data[key]
    if (key !== 'Record<string,any>' && item.url && item.description) {
      packages.push(key)
      requestActionsStr += `
      // ${item.description || '暂无描述'}
      export const ${
        key +
        fileName.replace(/^\S/, function (s) {
          return s.toUpperCase()
        })
      } = ${requestFnName}<${key}['request'], ${key}['response']>('${
        item.url
      }', '${item.method}');
      `
    }
  }

  const packagesStr = packages.join(',')

  return `
  /* eslint-disable import/no-cycle */
  // @ts-nocheck
  ${requestImport}
  import type { ${packagesStr} } from './types/${fileName}';

  ${requestActionsStr}
  `
}

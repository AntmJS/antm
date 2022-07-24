/* eslint-disable import/no-named-as-default */

export function createDefaultModel({
  requestImport = "import { createFetch } from '@/utils/request'",
  requestFnName = 'createFetch',
  fileName = 'a',
  data = {},
}) {
  const packages: string[] = []
  let requestActionsStr = ''

  for (const key in data) {
    const item = data[key]
    if (key !== 'Record<string,any>' && item.url) {
      packages.push(key)
      requestActionsStr += `
      // ${item.description}
      export const ${key}${wordFirstBig(
        fileName,
      )} = ${requestFnName}<${key}['request'], ${key}['response']>('${
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

function wordFirstBig(str: string) {
  return str.substring(0, 1).toLocaleUpperCase() + str.substring(1)
}

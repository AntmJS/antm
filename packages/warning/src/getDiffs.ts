import { getDiff } from './utils'

export default function getDiffs(files) {
  const diffRes = {}
  files.forEach((f) => {
    diffRes[f] = getDiff(f)
  })

  return diffRes
}

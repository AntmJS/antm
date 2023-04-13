import fs from 'fs'
import path from 'path'
import { getDiff } from './utils'

export default function getDiffs(files) {
  const diffRes = {}
  files.forEach((f) => {
    if (fs.existsSync(path.resolve(process.cwd(), f))) {
      diffRes[f] = getDiff(f)
    }
  })

  return diffRes
}

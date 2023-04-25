import { join } from 'path'
import { existsSync } from 'fs'

export const CWD = process.cwd()
// 临时文件目录
export const TEMP_DIR = join(__dirname, '../../src/.temp')

let CONFIG_PATH = join(CWD, './antm.config.ts')

const CONFIG_PATH_JS = join(CWD, './antm.config.js')

export const MARKDOWN_QUORTA = '::::_QA'
export const MARKDOWN_AB = '::::_AB'

if (!existsSync(CONFIG_PATH)) {
  CONFIG_PATH = CONFIG_PATH_JS
}

export { CONFIG_PATH }

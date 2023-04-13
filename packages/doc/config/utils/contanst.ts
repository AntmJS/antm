import { join } from 'path'
import { existsSync } from 'fs'

export const CWD = process.cwd()
// 临时文件目录
export const TEMP_DIR = join(CWD, './src/.temp')

export const ANTM_TEMP_DIR = join(TEMP_DIR, './antm-doc')

export const MARKDOWN_MAIN = join(ANTM_TEMP_DIR, './markdown-main.js')

export const ALL_CONFIG = join(ANTM_TEMP_DIR, `all-config.js`)

let CONFIG_PATH = join(CWD, './antm.config.ts')

const CONFIG_PATH_JS = join(CWD, './antm.config.js')

if (existsSync(CONFIG_PATH_JS)) {
  CONFIG_PATH = CONFIG_PATH_JS
}

export { CONFIG_PATH }

import { existsSync } from 'fs'
import { IDocsConfig } from '../../types'
import { CONFIG_PATH } from './contanst'

async function getConfig(): Promise<{
  docs: IDocsConfig
}> {
  if (!existsSync(CONFIG_PATH)) throw Error(`it's not exsist: ${CONFIG_PATH}`)
  delete require.cache[CONFIG_PATH]
  const result = await import(CONFIG_PATH)

  return result.default
}

export { getConfig }

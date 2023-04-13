import type { IDocsConfig } from './doc'
import type { IWarningConfig } from './warning'
import type { IApiConfig } from './api'

// @ts-ignore
export type * from './doc'
// @ts-ignore
export type * from './warning'
// @ts-ignore
export type * from './api'

export type IAntmConfig = {
  warning?: IWarningConfig
  docs?: IDocsConfig
  api?: IApiConfig
}

export function defineConfig(config: IAntmConfig): IAntmConfig {
  return config
}

export type IApiMock = {
  port?: number
  timeout?: number
  baseIntercept?: (params: {
    type: 'number' | 'string' | 'boolean'
    fieldName: string
    originValue: any
    url: 'string'
  }) => string | boolean
  arrayRule?: (params: { fieldName: string }) => string
}

export type IApiAction = {
  requestImport?: string
  dirPath?: string
  requestFnName?: string
  createDefaultModel?: (params: {
    requestImport: string
    requestFnName: string
    fileName: string
    data: any
  }) => string
}

export type IApiSwagger = {
  url?: string
  modules?: string[]
}

export type IApiConfig = {
  path?: string
  buildPath?: string
  buildPort?: string
  mock?: IApiMock
  swagger?: IApiSwagger
  action?: IApiAction
}

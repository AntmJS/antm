declare module '*.json' {
  const value: any
  export default value
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development'
  }
}

declare module 'glob'
declare module 'Api-see'

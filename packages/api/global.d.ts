declare module 'glob'
declare module 'ora'
declare module 'nodemon'
declare module 'js-yaml'
declare module 'node-fetch'
declare module 'spark-md5'
declare module 'prettier'
declare module 'pinyin-pro'
declare module '*.json' {
  const value: any
  export default value
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development'
  }
}

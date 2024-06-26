/** 菜单项 */
export type IDocMenuItem = {
  title?: string | Record<string, string>
  path: string
} & Record<string, any>

export type IDocMenuItems = IDocMenuItem[]

/** 菜单模块 */
export type IDocMenuNavs = {
  name?: string | Record<string, string>
  items: IDocMenuItems
}[]

/** 头部链接 */
export type IDocheaderLinks = {
  title?: string | Record<string, string>
  url?: string
  type: 'img' | 'select' | 'text'
  options?: {
    title: string
    url: string
  }[]
}[]

/** 路由配置 */
export type IDocRouter = {
  exclude?: string[]
  level?: number
  type?: 'history' | 'hash'
  redirect?: string
}

/** 移动端插入 */
export type IDocSimulator = {
  url?: {
    development: string
    production: string
  }
  noMate?: {
    redirect: string
    urls: string[]
  }
  transform?: (url: string) => string
}

export type Ii18n = {
  langs: string[]
  // 没有后缀的默认语言
  noSuffixLang: string
}

export type IDemoCode = {
  // 公共容器的绝对路径
  container?: {
    vue?: string
    react?: string
  }
  // 案例所在文件夹
  dir?: string
}
/** 广告插入功能项 */
export type IAdvertisement = {
  title?: string
  img?: string
  imgStyle?: React.CSSProperties
  content?: string
  style?: React.CSSProperties
  termType?: 'week' | 'day' | 'month'
}

/** 全局样式注入 */
type IDocGlobalStyles = string[]

type IDocMarkdownPlugins = any[]

export type IDocsConfig = {
  title: string
  logo?: string
  src: string | string[]
  output?: string
  buildPort?: number
  menu: IDocMenuNavs
  headerLinks?: IDocheaderLinks
  route?: IDocRouter
  simulator?: IDocSimulator
  globalStyles?: IDocGlobalStyles
  markdownPlugins?: IDocMarkdownPlugins
  i18n?: Ii18n
  demoCode?: IDemoCode
  advertisement?: IAdvertisement
}

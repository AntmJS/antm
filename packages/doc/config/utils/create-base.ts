import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { basename, join, sep, extname } from 'path'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { watch } from 'chokidar'
import { glob } from 'glob'
import mdAst from 'markdown-to-ast'
import { IDocsConfig, IDocMenuNavs } from '../../types'
import { parseCode } from './markdown-code'
import {
  TEMP_DIR,
  CONFIG_PATH,
  CWD,
  MARKDOWN_QUORTA,
  MARKDOWN_AB,
} from './contanst'
import { getConfig, configAboutCache } from './get-config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const currentPkgName = require(join(CWD, './package.json'))?.name
let ANTM_TEMP_DIR = ''
let MARKDOWN_MAIN = ''
let SEARCH_JSON = ''
let ALL_CONFIG = ''

const demoCodes = {}
const demoCodesMap = {} // 案例代码路径对应的markdown路径
const moduleFilePaths: string[] = [] // markdown的js模块文件路径

let inited = false
let _src: string[] = []
let _level = 2
let _config: any = {}
let _exclude: string[] = [
  join(CWD, './node_modules/**/*.md'),
  join(CWD, './**/node_modules/**/*.md'),
]

export async function createBase(config: IDocsConfig) {
  const { src, route } = config
  const { level = 2, exclude } = route || {}
  _exclude = _exclude.concat(exclude || [])
  _level = level
  _src = Array.isArray(src) && src ? src : [src]
  _config = config

  getTempNames()

  let MD_PATHS: string[] = []

  for (let i = 0; i < _src.length; i++) {
    const _srcItem = _src[i] || ''
    if (!extname(_srcItem)) {
      const filepath = resolveWindowsPath(_srcItem || '')
      MD_PATHS = MD_PATHS.concat([`${filepath}/**/*.md`, `${filepath}/*.md`])
    } else {
      MD_PATHS.push(_srcItem)
    }
  }

  const mdPaths = await glob(MD_PATHS, {
    ignore: _exclude,
  })

  if (!existsSync(TEMP_DIR)) mkdirSync(TEMP_DIR)
  if (!existsSync(ANTM_TEMP_DIR)) {
    mkdirSync(ANTM_TEMP_DIR)
  }

  for (let i = 0; i < mdPaths.length; i++) {
    const mp = mdPaths[i]
    if (mp) {
      const moduleFilePath = unitWork(mp)
      moduleFilePaths.push(moduleFilePath)
    }
  }
  createMarkdownMain(moduleFilePaths)
  createBaseConfig()
  createSearchJson(mdPaths)

  if (process.env['NODE_ENV'] === 'development') {
    console.info('watch files success')
    watchFiles([CONFIG_PATH, ...MD_PATHS, ...configAboutCache], _exclude)
    watchDemoFiles()
  }

  if (!inited) inited = true

  return {
    globalStyles: config.globalStyles,
  }
}

/**
 * 根据各个项目的package.name生成临时文件路径
 */
function getTempNames() {
  const pkgName = currentPkgName.replace(/\@/g, '').replace(/\//g, '-')

  ANTM_TEMP_DIR = join(TEMP_DIR, `${pkgName}`)

  MARKDOWN_MAIN = join(ANTM_TEMP_DIR, './markdown-main.js')

  ALL_CONFIG = join(ANTM_TEMP_DIR, `all-config.js`)

  SEARCH_JSON = join(ANTM_TEMP_DIR, 'all-search.json')
}

/**
 * 创建markdownjs文件
 * @param mp markdown文件的路径
 */
function unitWork(mp: string) {
  const routeName = getRoutePath(mp)
  const routeNameNoLang = filterI18n(routeName)

  const config = {
    highlight: function (str, lang) {
      return hljs.highlight(str, { language: lang || 'markdown' }).value
    },
    html: true,
  }
  const Markdown = MarkdownIt(config)
  const markdownPlugins = _config.markdownPlugins || []
  markdownPlugins.map((plugin) => {
    Markdown.use(plugin)
  })

  let mdstr = readFileSync(mp, 'utf-8')
  const moduleFilePath = join(ANTM_TEMP_DIR, `${routeName}.js`)
  // 是否以`::: demo-xx :::` 引入外部代码， 并且给定pre元素容器
  const transformResult = parseCode({
    mdStr: mdstr,
    path: mp,
    routeName: routeNameNoLang,
    demoDir: _config?.demoCode?.dir || 'example',
  })
  mdstr = transformResult.mdStr
  const res = markdownCardWrapper(Markdown.render(mdstr))
  const docs =
    '`' +
    `${res.html
      .replace(/\`/g, MARKDOWN_QUORTA)
      .replace(/\$\{/g, MARKDOWN_AB)}` +
    '`'
  const h3Ids = '`' + res.h3Ids.join(':::') + '`'
  const title = '`' + getTitleFromMd(mdstr, routeName.replace('__', '/')) + '`'
  const curDemoCodeKeys: string[] = []

  transformResult.demoEntrys.forEach((e) => {
    const last = e.split('/')[e.split('/').length - 1]
    const entryKey = `${routeNameNoLang}__${last?.split('.')[0]}`
    demoCodes[entryKey] = e
    demoCodesMap[e] = mp
    curDemoCodeKeys.push(entryKey)
  })

  console.info(`生成临时文件： ${moduleFilePath}`)

  writeFileSync(
    moduleFilePath,
    `export default {
      tile: ${title},
      docs: ${docs},
      h3Ids: ${h3Ids},
      codePath: ${JSON.stringify(curDemoCodeKeys)}
    }`,
  )

  return moduleFilePath
}
/**
 * 存储所有文档配置到js文件
 * @param config 文档配置
 */
async function createBaseConfig() {
  let config = {}
  const c = await getConfig()
  if (c) config = c.docs

  writeFileSync(
    ALL_CONFIG,
    `export default {
      
      config: ${JSON.stringify(config, function (_, val) {
        if (typeof val === 'function') {
          return val.toString()
        }
        return val
      })}
    }`,
  )
}
/**
 * 创建异步模块：markdown打包的js和异步引用的demo组件的js
 * @param mdjss
 */
function createMarkdownMain(mdjss: string[]) {
  let mdMain = `{`
  for (let i = 0; i < mdjss.length; i++) {
    const item = mdjss[i]
    if (item) {
      const name = basename(item, '.js')
      let filePath = item
      if (process.platform === 'win32') {
        filePath = filePath.replace(/\\/g, '\\\\')
      }
      mdMain += `"${name}": import("${filePath}"),\n`
    }
  }
  // 异步引用的demo组件的js
  for (const key in demoCodes) {
    const item = demoCodes[key]
    if (item) {
      let filePath = item
      if (process.platform === 'win32') {
        filePath = filePath.replace(/\\/g, '\\\\')
      }
      mdMain += `"${key}": import("${filePath}"),\n`
    }
  }
  // 异步引用的demo组件公用的外层容器组件
  const demoReactContainer = _config?.demoCode?.container?.react
  const demoVueContainer = _config?.demoCode?.container?.vue
  if (demoReactContainer) {
    mdMain += `DEMO_REACT_CONTAINER: import("${demoReactContainer}"),\n`
  }
  if (demoVueContainer) {
    mdMain += `DEMO_VUE_CONTAINER: import("${demoVueContainer}"),\n`
  }

  mdMain += `}`

  writeFileSync(MARKDOWN_MAIN, `export default ${mdMain}`)
}

/**
 * 生成新的js文件名称
 * @param ps markdown文件
 * @returns markdown文件转换后的路径名称
 */
function getRoutePath(ps: string): string {
  const paths = resolveWindowsPath(ps.replace('.md', ''))
  const arr = paths.split('/').reverse()
  const res: string[] = []
  for (let i = 0; i < _level; i++) {
    const it = arr[i]
    if (it && it !== 'README') {
      res.push(it)
    } else if (i === 0 && it === 'README') {
      const next = arr[i + 1]
      if (next) {
        res.push(next)
      }
    }
  }

  return res.reverse().join('__')
}
/**
 * 获取markdown文件的大标题
 * @param md
 * @returns
 */
function getTitleFromMd(md: string, routePath) {
  let firstLine = md.split(`\n`)[0] || ''

  // 不是标准大标题时
  if (firstLine.includes('<')) {
    firstLine = '`' + _config.title + '`'
  }
  // 没有h1标题的时候从菜单里面获取
  if (!firstLine) {
    firstLine = getTitleFromMenu(routePath)
  }

  return firstLine.replace(/\#/g, '').replace(/\s/g, '').replace(/\`/g, '')
}
// 过滤带i18n标识的模块名称
function filterI18n(fname: string) {
  const langs = _config?.i18n?.langs || []
  langs.forEach((item) => {
    if (fname.includes(`__${item}`)) {
      fname = fname.replace(`__${item}`, '')
    }
  })

  return fname
}

/**
 * 监听各个文件的变化
 * @param files 监听的文件
 */
function watchFiles(files: string[], exclude: string[]) {
  let readyOk = false
  const watcher = watch(files, {
    persistent: true,
    ignored: exclude,
  })
  watcher.on('ready', function () {
    setTimeout(() => {
      readyOk = true
    }, 1000)
  })
  watcher.on('change', function (path) {
    if (readyOk) {
      console.info('_______________ change', path)

      if (path === CONFIG_PATH || configAboutCache.includes(path)) {
        createBaseConfig()
      } else {
        unitWork(path)
        createMarkdownMain(moduleFilePaths)
        if (process.env['NODE_ENV'] === 'development') {
          watchDemoFiles()
        }
      }
    }
  })
  watcher.on('add', function (path) {
    if (readyOk) {
      console.info('_______________ add', path)
      createBaseConfig()
      const newModuleFilePath = unitWork(path)
      moduleFilePaths.push(newModuleFilePath)
      createMarkdownMain(moduleFilePaths)
      if (process.env['NODE_ENV'] === 'development') {
        watchDemoFiles()
      }
    }
  })
}

let demoWatcher
/**
 * 监听组件库demo代码，有更新则强制重新生成新的markdown对应的js文件
 */
function watchDemoFiles() {
  if (demoWatcher) demoWatcher.close()
  const demoFiles = Object.keys(demoCodes).map((key) => {
    return demoCodes[key]
  })
  let readyOk = false
  demoWatcher = watch(demoFiles, {
    persistent: true,
  })
  demoWatcher.on('ready', function () {
    setTimeout(() => {
      readyOk = true
    }, 1000)
  })

  const work = function (mdPath) {
    const newModuleFilePath = unitWork(mdPath)
    moduleFilePaths.push(newModuleFilePath)
    createMarkdownMain(moduleFilePaths)
  }

  const works = function (path) {
    if (readyOk) {
      const mdPath = demoCodesMap[path].replace(
        `__${_config?.i18n?.noSuffixLang}`,
        '',
      )
      work(mdPath)
      if (_config?.i18n?.langs) {
        let pathWidthNolang = mdPath
        _config?.i18n?.langs.forEach((item) => {
          const lanSuffix = `__${item}`
          if (mdPath.includes(lanSuffix)) {
            pathWidthNolang = mdPath.replace(lanSuffix, '')
          }
        })

        // 暂时不支持xx.xx.tsx的书写
        const pathNameWidthNolang = pathWidthNolang.split('.')[0]
        const pathSuffixWidthNolang = pathWidthNolang.split('.')[1]

        _config?.i18n?.langs.forEach((lan) => {
          const curPath = `${pathNameWidthNolang}__${lan}.${pathSuffixWidthNolang}`
          if (existsSync(curPath)) {
            work(curPath)
          }
        })
      }
    }
  }

  demoWatcher.on('change', works)
  demoWatcher.on('add', works)
  demoWatcher.on('unlink', works)
}

/** 重置markdown的html字符串 */
function markdownCardWrapper(htmlCode) {
  const group = htmlCode
    .replace(/<h3/g, ':::::<h3')
    .replace(/<h2/g, ':::::<h2')
    .split(':::::')

  const h3Ids: string[] = []

  const newHtml = group
    .map((fragment) => {
      if (fragment.indexOf('<h3') !== -1) {
        const h3Title = fragment
          .split('h3>')[1]
          .replace('</', '')
          .substring(0, 20)

        h3Ids.push(h3Title)

        const h3Id = encodeURIComponent(h3Title)

        const newFragment = fragment.replace(
          '<h3>',
          `<h3 id="${h3Id}"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>`,
        )
        return `<div class="card">${newFragment}</div>`
      }

      return fragment
    })
    .join('')

  return {
    html: newHtml,
    h3Ids: h3Ids,
  }
}

const resolveWindowsPath = (path: string) => {
  if (typeof path !== 'string') {
    return path
  }
  if (sep === '\\') {
    // 如果当前操作系统为Windows，则将双反斜杠转换为单反斜杠
    return path.replace(/\\/g, '/')
  }
  return path
}

/**
 * 获取markdown的ast里面的标题和段落、所在菜单、路由等信息
 */
function createSearchJson(mdPaths) {
  const mdTypeMap = {}
  const result: any[] = []
  let index = 0
  for (let i = 0; i < mdPaths.length; i++) {
    const p = mdPaths[i]
    const mdstr = readFileSync(p, 'utf-8')
    const routePath = getRoutePath(p).replace('__', '/')
    if (!mdTypeMap[routePath]) mdTypeMap[routePath] = {}
    const title = '`' + getTitleFromMd(mdstr, routePath) + '`'
    const ast = mdAst.parse(mdstr).children
    let currentH3Title = ''
    for (let j = 0; j < ast.length; j++) {
      const aa = ast[j]
      if (aa.type === 'Header' || aa.type === 'Paragraph') {
        const item: any = {
          routePath: `${routePath}@${index}`,
          title,
          doc: aa,
          belongMenu: findBelongMenu(routePath),
        }
        let mdType = aa.type
        if (mdType === 'Header') {
          if (aa.depth === 3) currentH3Title = aa.raw.replace('### ', '')
          mdType = `H${aa.depth}`
        }
        if (mdTypeMap[routePath][mdType] === undefined) {
          mdTypeMap[routePath][mdType] = 0
        } else {
          mdTypeMap[routePath][mdType] += 1
        }

        item.mdTypeIndex = mdTypeMap[routePath][mdType]
        item.currentH3Title = currentH3Title

        result.push(item)
        index++
      }
    }
  }

  writeFileSync(SEARCH_JSON, JSON.stringify(result))
}

function findBelongMenu(path) {
  const menu = _config?.menu as IDocMenuNavs
  let lang = ''
  if (_config?.i18n) {
    const langs = _config?.i18n?.langs
    const lastPathItem = path.split('/')[path.split('/').length - 1]
    if (langs.includes(lastPathItem)) {
      lang = lastPathItem
      path = path.replace(`/${lastPathItem}`, '')
    } else {
      lang = _config?.i18n?.noSuffixLang
    }
  }

  for (let i = 0; i < menu.length; i++) {
    const items = menu[i]?.items || []
    for (let j = 0; j < items.length; j++) {
      if (items[j]?.path === path) {
        return {
          title: _config?.i18n ? items[j]?.title?.[lang] : items[j]?.title,
        }
      }
    }
  }

  return {}
}

function getTitleFromMenu(t) {
  let res = ''
  _config.menu.map((item) => {
    item.items.map((a) => {
      if (a.path === t) {
        res = a.title
      }
    })
  })

  return res
}

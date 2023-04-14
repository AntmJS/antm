import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { basename, join, relative, sep } from 'path'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { watch } from 'chokidar'
import { glob } from 'glob'
import { IDocsConfig } from '../../types'
import {
  TEMP_DIR,
  ANTM_TEMP_DIR,
  CONFIG_PATH,
  ALL_CONFIG,
  MARKDOWN_MAIN,
  CWD,
} from './contanst'
import { getConfig } from './get-config'

const extraEntrys = {}
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

  let MD_PATHS: string[] = []

  for (let i = 0; i < _src.length; i++) {
    let filepath = _src[i] || ''
    if (sep === '\\') {
      // 如果当前操作系统为Windows，则将双反斜杠转换为单反斜杠
      filepath = filepath.replace(/\\/g, '/')
    }
    MD_PATHS = MD_PATHS.concat([`${filepath}/**/*.md`, `${filepath}/*.md`])
  }

  const mdPaths = await glob(MD_PATHS, {
    ignore: _exclude,
  })

  if (!existsSync(TEMP_DIR)) mkdirSync(TEMP_DIR)
  if (!existsSync(ANTM_TEMP_DIR)) mkdirSync(ANTM_TEMP_DIR)

  const moduleFilePaths: string[] = []

  for (let i = 0; i < mdPaths.length; i++) {
    const mp = mdPaths[i]
    if (mp) {
      const moduleFilePath = unitWork(mp)
      moduleFilePaths.push(moduleFilePath)
    }
  }
  createMarkdownMain(moduleFilePaths)
  createBaseConfig(_config)

  if (process.env['NODE_ENV'] === 'development') {
    console.info('watch files success')
    watchFiles([CONFIG_PATH, ...mdPaths], _exclude)
  }

  if (!inited) inited = true

  const lessAdditionalData = await injectGlobalStyles(config.globalStyles)

  return {
    extraEntrys,
    lessAdditionalData,
  }
}
/**
 * 创建markdownjs文件
 * @param mp markdown文件的路径
 */
function unitWork(mp) {
  const routeName = getRoutePath(mp)

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

  const mdstr = readFileSync(mp, 'utf-8')
  const moduleFilePath = join(ANTM_TEMP_DIR, `${routeName}.js`)
  extraEntrys[routeName] = moduleFilePath
  const res = markdownCardWrapper(Markdown.render(mdstr))
  const docs =
    '`' + `${res.html.replace(/\`/g, '::::').replace(/\$\{/g, '::_::')}` + '`'
  writeFileSync(
    moduleFilePath,
    `export default {
      tile: "${getTitleFromMd(mdstr)}",
      docs: ${docs},
      h3Ids: "${res.h3Ids.join(':::')}"
    }`,
  )

  return moduleFilePath
}
/**
 * 存储所有文档配置到js文件
 * @param config 文档配置
 */
async function createBaseConfig(config?) {
  extraEntrys['all-config'] = ALL_CONFIG

  if (!config) {
    const c = await getConfig()
    if (c) config = c.docs
  }

  writeFileSync(
    ALL_CONFIG,
    `export default {
      config: ${JSON.stringify(config)}
    }`,
  )
}

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
  mdMain += `}`

  writeFileSync(MARKDOWN_MAIN, `export default ${mdMain}`)
}

/** 注入外部全局样式 */
async function injectGlobalStyles(globalStyles?: string[]) {
  if (globalStyles && globalStyles.length) {
    let coverStyles = ''
    for (let i = 0; i < globalStyles.length; i++) {
      if (globalStyles[i])
        // @ts-ignore
        coverStyles += `@import "${globalStyles[i]}";
        `
    }

    return function additionalData(content, loaderContext) {
      const { resourcePath, rootContext } = loaderContext
      const relativePath = relative(rootContext, resourcePath)

      if (relativePath.includes('style.less')) {
        return coverStyles + content
      }

      return content
    }
  } else return null
}

/**
 * 生成新的js文件名称
 * @param ps markdown文件
 * @returns markdown文件转换后的路径名称
 */
function getRoutePath(ps: string): string {
  const paths = ps.replace('.md', '')
  const arr = paths.split('/').reverse()
  const res: string[] = []
  for (let i = 0; i < _level; i++) {
    const it = arr[i]
    if (it && it !== 'README') {
      res.push(it)
    }
  }

  return res.reverse().join('__')
}
/**
 * 获取markdown文件的大标题
 * @param md
 * @returns
 */
function getTitleFromMd(md: string) {
  const firstLine = md.split(`\n`)[0] || ''
  return firstLine.replace('# ', '')
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
    readyOk = true
  })
  watcher.on('change', function (path) {
    if (readyOk) {
      console.info('_______________ change', path)

      if (path === CONFIG_PATH) {
        createBaseConfig()
      } else {
        unitWork(path)
      }
    }
  })
  watcher.on('add', function (path) {
    if (readyOk) {
      console.info('_______________ add', path)

      unitWork(path)
    }
  })
}
/** 重置markdown的html字符串 */
function markdownCardWrapper(htmlCode) {
  const group = htmlCode
    .replace(/<h3/g, ':::<h3')
    .replace(/<h2/g, ':::<h2')
    .split(':::')

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

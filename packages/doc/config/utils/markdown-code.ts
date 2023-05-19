import fs from 'fs'
import { resolve } from 'path'

const allSuffix = ['.tsx', '.jsx', '.vue', '.d.ts', '.ts']
const demoCodeReg = /\n\n:::\s\$?demo[a-z\-]*\s:::/g
// https://regexr.com/47jlq
const IMPORT_RE =
  /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from(\s+)?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g

type Iprops = {
  mdStr: string
  path: string
  routeName: string
  demoDir?: string
}

/**
 * 创建额外渲染的文件
 * 替换文档中的`::: demoxxx :::`
 * import的文件不支持热更新
 */
export function parseCode(props: Iprops) {
  // eslint-disable-next-line prefer-const
  let { mdStr, path, routeName, demoDir } = props

  const demoEntrys: string[] = []
  const dirPath = path
    .split('/')
    .slice(0, path.split('/').length - 1)
    .join('/')
  const demos = mdStr.match(demoCodeReg) as string[]
  // $开头的字符不需要执行渲染demo代码
  const noNeedRenders: string[] = []

  mdStr = createPreContainer(mdStr)

  const demoNames =
    demos?.map((item) => {
      const nItem = item.replace(/\$|\:|\s/g, '')
      if (item.includes('$')) {
        noNeedRenders.push(nItem)
      }
      return nItem
    }) || []

  demoNames.forEach((item, index) => {
    let demoPath = `${dirPath}/${item}`
    if (demoDir) {
      demoPath = `${dirPath}/${demoDir}/${item}`
    }
    const suffix = getExistSuffix(demoPath)
    if (suffix) {
      const demoFileName = `${demoPath}${suffix}`
      if (!noNeedRenders.includes(item)) {
        demoEntrys.push(demoFileName)
      }
      const codeType =
        suffix.replace('.', '') === 'vue'
          ? 'typescript'
          : suffix.replace('.', '')
      const codes = fs.readFileSync(demoFileName, 'utf-8')
      const codeItem = '\n``` ' + codeType + '\n' + codes + '\n```\n'
      let allCodes = [
        {
          code: codeItem,
          path: demoFileName,
        },
      ]
      const importCodes = getImportCodes(codes, path, demoDir)
      allCodes = allCodes.concat(importCodes)

      let tabsStr = `\n <div class="demo-code-tabs">`
      let codeBoxStr = ''
      for (let i = 0; i < allCodes.length; i++) {
        const cItem = allCodes[i]
        if (cItem) {
          const fNameArr = cItem.path.split('/')
          const fName = fNameArr[fNameArr.length - 1]
          const activeClass = i === 0 ? 'code-tab-name-active' : ''
          tabsStr += `<div class="code-tab-name ${activeClass}" id="name${i}">${fName}</div>`
          codeBoxStr += `
<div class="code-item code-item${i}">

${cItem.code}

</div>
          `
        }
      }
      tabsStr += '</div>'

      if (demos[index]) {
        if (!noNeedRenders.includes(item)) {
          mdStr = mdStr.replace(
            demos[index] || '',
            `

  <div class="demo-code-wrapper" id="${routeName}__${item}_wrapper">
  <div class="demo-code-box" id="${routeName}__${item}"></div>
  <div class="show-code-btn">
  <svg t="1683506698040" class="icon" viewBox="0 0 1024 1024"  width="20" height="20"><path d="M753.6 611.52a32 32 0 1 1 28.8 56.96l-256 128a32 32 0 0 1-28.8 0l-256-128a32 32 0 0 1 28.8-56.96L512 732.16z m0-288a32 32 0 1 1 28.8 56.96l-256 128a32 32 0 0 1-28.8 0l-256-128a32 32 0 1 1 28.8-56.96L512 444.16z" p-id="2292"></path></svg>
  </div>
  
  <div class="code-box">
  \n
  ${tabsStr}
  
  ${codeBoxStr}
  
  </div>
  </div>
  `,
          )
        } else {
          mdStr = mdStr.replace(
            demos[index] || '',
            `
  <div class="demo-code-show" id="${routeName}__${item}_wrapper">  
  <div class="code-box">
  
  ${tabsStr}
  
  ${codeBoxStr}
  
  </div>
  </div>
  `,
          )
        }
      }
    }
  })

  return {
    mdStr,
    demoEntrys,
  }
}

function getExistSuffix(spath) {
  let existsSuffix = ''
  for (let i = 0; i < allSuffix.length; i++) {
    const suffix = allSuffix[i] || ''
    if (fs.existsSync(`${spath}${suffix}`)) {
      existsSuffix = suffix
      break
    }
  }

  return existsSuffix
}

function getImportType(p) {
  let res = ''
  let np = p
  if (p.includes('.')) {
    res = p.split('.')[1] || ''
  } else {
    const ss = ['.ts', '.tsx', '.js', '.vue', '.d.ts']
    for (let i = 0; i < ss.length; i++) {
      const suffix = ss[i] || ''
      if (fs.existsSync(`${p}${suffix}`)) {
        res = suffix
        break
      }
    }
    np = `${p}${res}`
  }

  return {
    codeType: res,
    newPath: np,
  }
}

function getCodeLange(suffix) {
  let lang = suffix.replace('.', '')
  if (!['jsx', 'vue', 'tsx', 'ts', ''].includes(lang)) {
    if (lang === 'd.ts') {
      lang = 'ts'
    } else {
      lang = 'text'
    }
  }

  return lang
}

function getImportCodes(codes: string, path: string, demoDir?: string) {
  const importCodes: any[] = []
  const dir = path
    .split('/')
    .slice(0, path.split('/').length - 1)
    .join('/')
  const allImports = codes.match(IMPORT_RE) || []
  for (let i = 0; i < allImports.length; i++) {
    const importItem = allImports[i] || ''
    if (importItem.includes('./')) {
      if (importItem.includes('from')) {
        const name = importItem.split('from')[1]?.replace(/\'|\"|\s/g, '')
        // 忽略引用组件的源文件的展示
        if (name && !name.includes('index')) {
          const npath = resolve(dir, demoDir || '', name)
          const { codeType, newPath } = getImportType(npath)
          const codes = fs.readFileSync(newPath, 'utf-8')
          importCodes.push({
            path: newPath,
            code: '\n``` ' + getCodeLange(codeType) + '\n' + codes + '\n```\n',
          })
        }
      } else {
        // 样式文件的引入获取
        const name = importItem.split(' ')[1]?.replace(/\'|\"/g, '') || ''
        const np = resolve(dir, demoDir || '', name)
        const cc = fs.readFileSync(np, 'utf-8')
        if (name) {
          importCodes.push({
            path: np,
            code: '\n``` less' + '\n' + cc + '\n```\n',
          })
        }
      }
    }
  }

  return importCodes
}

function createPreContainer(str) {
  str = str.replace(
    /(```[\w-]*\n[\s\S]*?\n```)/gm,
    '\n<div class="code-box-max">\n\n$1\n\n</div>\n',
  )

  console.info(str, '()())(())()()()()()(')

  return str
}

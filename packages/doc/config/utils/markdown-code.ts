import fs from 'fs'

const allSuffix = ['.vue', '.jsx', '.tsx']
const demoCodeReg = /\n\n:::\sdemo[a-z\-]*\s:::/g

type Iprops = {
  mdStr: string
  path: string
  routeName: string
}

/**
 * 创建额外渲染的文件
 * 替换文档中的`::: demoxxx :::`
 */
export function parseCode(props: Iprops) {
  // eslint-disable-next-line prefer-const
  let { mdStr, path, routeName } = props

  const demoEntrys: string[] = []
  const dirPath = path
    .split('/')
    .slice(0, path.split('/').length - 1)
    .join('/')
  const demos = mdStr.match(demoCodeReg) as string[]

  const demoNames =
    demos?.map((item) => {
      return item.replace(/:|\s/g, '')
    }) || []

  demoNames.forEach((item, index) => {
    const demoPath = `${dirPath}/${item}`
    const suffix = getExistSuffix(demoPath)
    if (suffix) {
      const demoFileName = `${demoPath}${suffix}`
      demoEntrys.push(demoFileName)
      const codeItem =
        '```' +
        suffix.replace('.', '') +
        '\n' +
        fs.readFileSync(demoFileName, 'utf-8') +
        '\n```'

      if (demos[index]) {
        mdStr = mdStr.replace(
          demos[index] || '',
          `
<div class="demo-code-wrapper" id="${routeName}__${item}_wrapper">
<div class="demo-code-box" id="${routeName}__${item}"></div>
<div class="show-code-btn">
<svg t="1683506698040" class="icon" viewBox="0 0 1024 1024"  width="20" height="20"><path d="M753.6 611.52a32 32 0 1 1 28.8 56.96l-256 128a32 32 0 0 1-28.8 0l-256-128a32 32 0 0 1 28.8-56.96L512 732.16z m0-288a32 32 0 1 1 28.8 56.96l-256 128a32 32 0 0 1-28.8 0l-256-128a32 32 0 1 1 28.8-56.96L512 444.16z" p-id="2292"></path></svg>
</div>
<div class="code-box">

${codeItem}

</div>
</div>
`,
        )
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

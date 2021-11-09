import type { IGeneratedCode } from '../types/index.d'
import * as path from 'path'
import * as fs from 'fs'
import * as crypto from 'crypto'
import mkdirp from 'mkdirp'
import inquirer from 'inquirer'
import chalk from 'chalk'
import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json')

export function withoutExt(p: string) {
  return p.replace(/\.[^/.]+$/, '')
}

export function relativeImport(from: string, to: string) {
  return withoutExt('./' + path.relative(path.dirname(from), to))
}

export function mixGeneratedCode(codeArr: Array<IGeneratedCode>) {
  const imports = codeArr.map((c) => c.import)
  const bodies = codeArr.map((c) => c.body)
  const _exports = codeArr.map((c) => c.export)
  return `
    ${imports.join('\n')}
    ${bodies.join('\n')}
    ${_exports.join('\n')}
  `
}

export function writeFile(filepath: string, contents: string): Promise<void> {
  return new Promise((resolve, reject) => {
    mkdirp(path.dirname(filepath))
      .then(() => {
        fs.writeFile(filepath, contents, (err) => {
          if (err) return reject(`filepath: ${filepath}, ${err}`)
          resolve()
        })
      })
      .catch((err: any) => {
        reject(`filepath: ${filepath}, ${err}`)
      })
  })
}

export function moveFile(from: string, to: string): Promise<void> {
  return new Promise((resolve, reject) => {
    mkdirp(path.dirname(to))
      .then(() => {
        const contents = fs.readFileSync(from)
        fs.writeFile(to, contents, (err) => {
          if (err) return reject(`写入文件失败: ${to}, ${err}`)
          resolve()
        })
      })
      .catch((err: any) => {
        reject(`读取文件失败: ${from}, ${err}`)
      })
  })
}

/**
 * 命令是否在根目录执行
 */
export function isInRoot() {
  const cwd = process.cwd()
  const flag = fs.existsSync(path.resolve(cwd, 'package.json'))
  return flag
}

// function allPath(source: string, cwd: string): string[] {
//   let all: any = []
//   try {
//     all = fs
//       .readdirSync(path.join(cwd, source))
//       .filter((v) => fs.lstatSync(path.join(cwd, source) + v).isDirectory())
//   } catch (error) {
//     console.log(error)
//   }
//   // 把错误吃掉返回文件夹
//   return all
// }

export function searchRootPath(rank = 4): string {
  const _rank = rank > 4 ? 4 : rank
  const cwd = process.cwd()
  let dir = ['/', '/../', '/../../', '/../../../']
  dir = dir.slice(0, _rank)
  let rootPath = ''
  for (const v of dir) {
    try {
      const flag = fs.existsSync(
        path.resolve(path.join(cwd, v), 'package.json'),
      )
      if (flag) {
        rootPath = path.join(cwd, v)
        break
      }
    } catch (error) {
      break
    }
  }
  if (!rootPath) {
    console.log('请移到项目内后再试')
    return rootPath
  }
  return rootPath
}

/** 获取文件md5 */
export function getMd5(fileContent: string) {
  const hash = crypto.createHash('md5')
  hash.update(fileContent)
  return hash.digest('hex')
}

export function getOldProjectId(rappperPath: string): string | undefined {
  const indexPath = path.resolve(process.cwd(), rappperPath, './index.ts')
  try {
    const content = fs.readFileSync(indexPath, 'utf-8') || ''
    const projectIdStr = content.split('\n')[1] || ''
    const matchArr = projectIdStr.match(/\/\*\sRap仓库id:\s(\S*)\s\*\//) || []
    return matchArr[1]
  } catch (err) {
    return undefined
  }
}

export function getRapModuleId<T extends boolean = false>(
  content: string,
  isDel: T,
): T extends false
  ? number | undefined
  : {
      content: string
      modId: number
    } {
  const modReg = /\/\*\s+Rap仓库ModuleId:\s(\S*)\s\*\/\n/
  let fiveElements = ''
  const newContent = content.replace(/^(([^\n]+)?\n){5}/, (e) => {
    fiveElements = e
    return ''
  })

  const matchArr = fiveElements.match(modReg) ?? []
  // console.log('fiveElements', fiveElements)
  if (isDel) {
    fiveElements = fiveElements
      .replace(modReg, '')
      .replace(/\/\*\s+md5:\s+\w+\s+\*\/\n/g, '')
    return {
      content: (fiveElements + newContent).replace(
        /\*?(\s+)?@rapUrl\s+\S+\n/g,
        '',
      ),
      modId: Number(matchArr[1]),
    } as any
  }
  return Number(matchArr[1]) as any
}

/** 模板文件覆盖确认 */
export async function templateFilesOverwriteConfirm() {
  const question = [
    {
      name: 'confirmed',
      type: 'confirm',
      message: chalk.green(
        '检测到您修改了 rapper 生成的模板代码，新生成的模板代码将覆盖您的修改，确定要继续么？',
      ),
      default: false,
    },
  ]
  const answers = await inquirer.prompt(question)
  return answers
}

/** 存在接口依赖被删确认 */
export async function templateFilesRelyConfirm() {
  const question = [
    {
      name: 'confirmed',
      type: 'confirm',
      message: chalk.green(
        '确定要继续同步接口到本地吗? (会存在页面中调用的接口不存在的风险)？',
      ),
      default: false,
    },
  ]
  const answers = await inquirer.prompt(question)
  return answers
}

/** 获取当前包名 */
export function getPackageName() {
  return packageJson.name
}

export function getPackageRegistry() {
  return packageJson.publishConfig.registry
}

/** 获取最新的版本 */
export async function latestVersion(
  packageName: string,
  isBeta?: boolean,
): Promise<any> {
  const response = await axios.get(`${getPackageRegistry()}/${packageName}`, {
    timeout: 1000 * 10,
  })
  const versionsList = Object.keys(response.data.versions)
  for (let i = versionsList.length - 1; i >= 0; i--) {
    if (isBeta) {
      return versionsList[i]
    }
    if (versionsList[i]!.indexOf('beta') === -1) {
      return versionsList[i]
    }
  }
}

export function getContentMd5(content: string) {
  const md5FlagReg = /^\/\*\smd5:\s(\S*)\s\*\/\n/
  const oldMd5 = content.match(md5FlagReg)
  const _content = oldMd5 ? content.replace(md5FlagReg, '') : content
  return {
    oldMd5: oldMd5 ? oldMd5[1] : null,
    content: _content,
    newMd5: getMd5(_content),
  }
}
export function updateFileContent(filePath: any, content: any) {
  // `/* md5: ${getMd5(item.content)} */\n${item.content}
  const contentMd5 = getContentMd5(content)
  const _content = `/* md5: ${contentMd5.newMd5} */\n${contentMd5.content}`
  // contentArr[0].match(/\/\*\smd5:\s(\S*)\s\*\//) || [];
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, _content, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve({
        status: 'ok',
      })
    })
  })
}

export function promiseReadFile(
  path: string,
): Promise<{ content: string; path: string }> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve({
        content: data,
        path,
      })
    })
  })
}

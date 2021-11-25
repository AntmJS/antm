/* eslint-disable import/default */
import { sep } from 'path'
import fse from 'fs-extra'
import { transformAsync } from '@babel/core'
import { replaceExt } from '../common/index.js'
import { replaceCSSImportExt } from '../common/css.js'
import { replaceScriptImportExt } from './get-deps.js'

// eslint-disable-next-line import/no-named-as-default-member
const { readFileSync, removeSync, outputFileSync } = fse
/**
 *
 * @param filePath 读取路径和输出路径，有outputPath时仅为读取路径
 * @param outputPath
 */
export async function compileScript(
  filePath: string,
  outputPath?: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (filePath.includes('.d.ts')) {
      resolve()
      return
    }

    let code = readFileSync(filePath, 'utf-8')

    if (!filePath.includes(`${sep}style${sep}`)) {
      code = replaceCSSImportExt(code)
    }
    code = replaceScriptImportExt(code, '.vue', '')

    transformAsync(code, { filename: filePath })
      .then((result: any) => {
        if (result) {
          const jsFilePath = replaceExt(outputPath || filePath, '.js')
          // watch的时候不删除目标
          if (!outputPath) removeSync(filePath)
          outputFileSync(jsFilePath, result.code)
          resolve()
        }
      })
      .catch(reject)
  })
}

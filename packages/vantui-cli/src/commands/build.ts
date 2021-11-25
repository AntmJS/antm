/* eslint-disable import/default */
import { join, relative } from 'path'
// import execa from 'execa'
import fse from 'fs-extra'
import { CSS_LANG } from '../common/css.js'
import { ora, consola } from '../common/logger.js'
import { installDependencies } from '../common/manager.js'
// import { compileSfc } from '../compiler/compile-sfc.js'
import { compileStyle } from '../compiler/compile-style.js'
import { compileScript } from '../compiler/compile-script.js'
import { compilePackage } from '../compiler/compile-package.js'
import { genPackageEntry } from '../compiler/gen-package-entry.js'
import { genStyleDepsMap } from '../compiler/gen-style-deps-map.js'
import { genComponentStyle } from '../compiler/gen-component-style.js'
import { SRC_DIR, LIB_DIR, ES_DIR } from '../common/constant.js'
import { genPackageStyle } from '../compiler/gen-package-style.js'
import {
  isDir,
  // isSfc,
  isAsset,
  isStyle,
  isScript,
  // isDemoDir,
  // isTestDir,
  setNodeEnv,
  setModuleEnv,
  setBuildTarget,
} from '../common/index.js'
import { clean } from './clean.js'

// eslint-disable-next-line import/no-named-as-default-member
const { remove, copy, readdir } = fse

async function compileFile(filePath: string) {
  if (isScript(filePath)) {
    return compileScript(filePath)
  }
  if (isStyle(filePath)) {
    return compileStyle(filePath)
  }
  if (isAsset(filePath)) {
    return Promise.resolve()
  }
  return remove(filePath)
}

/**
 * Pre-compile
 * 1. Remove unneeded dirs
 * 2. compile sfc into scripts/styles
 */
// async function preCompileDir(dir: string) {
//   const files = await readdir(dir)

//   await Promise.all(
//     files.map((filename) => {
//       const filePath = join(dir, filename)

//       if (isDemoDir(filePath) || isTestDir(filePath)) {
//         return remove(filePath)
//       }
//       if (isDir(filePath)) {
//         return preCompileDir(filePath)
//       }
//       if (isSfc(filePath)) {
//         return compileSfc(filePath)
//       }
//       return Promise.resolve()
//     }),
//   )
// }

async function compileDir(dir: string) {
  const files = await readdir(dir)
  await Promise.all(
    files.map((filename) => {
      const filePath = join(dir, filename)
      return isDir(filePath) ? compileDir(filePath) : compileFile(filePath)
    }),
  )
}

async function copySourceCode(type?: 'lib' | 'es') {
  let copys: any = []
  if (type === 'es') {
    copys = [copy(SRC_DIR, ES_DIR)]
  } else if (type === 'lib') {
    copys = [copy(SRC_DIR, LIB_DIR)]
  } else {
    copys = [copy(SRC_DIR, ES_DIR), copy(SRC_DIR, LIB_DIR)]
  }
  return Promise.all(copys)
}

async function buildESMOutputs() {
  setModuleEnv('esmodule')
  setBuildTarget('package')
  await compileDir(ES_DIR)
}

async function buildCJSOutputs() {
  setModuleEnv('commonjs')
  setBuildTarget('package')
  await compileDir(LIB_DIR)
}

async function buildTypeDeclarations() {
  // await Promise.all([preCompileDir(ES_DIR), preCompileDir(LIB_DIR)])
  // const tsConfig = join(process.cwd(), 'tsconfig.declaration.json')
  // if (existsSync(tsConfig)) {
  //   await execa('tsc', ['-p', tsConfig])
  // }
}

async function buildStyleEntry() {
  await genStyleDepsMap()
  genComponentStyle()
}

async function buildPackageScriptEntry(types?: 'lib' | 'es') {
  const esEntryFile = join(ES_DIR, 'index.js')
  const libEntryFile = join(LIB_DIR, 'index.js')

  if (!types || types === 'es') {
    genPackageEntry({
      outputPath: esEntryFile,
      pathResolver: (path: string) => `./${relative(SRC_DIR, path)}`,
    })
  }

  if (!types || types === 'lib') {
    await copy(esEntryFile, libEntryFile)
  }
}

async function buildPackageStyleEntry() {
  const styleEntryFile = join(LIB_DIR, `index.${CSS_LANG}`)

  genPackageStyle({
    outputPath: styleEntryFile,
    pathResolver: (path: string) => path.replace(SRC_DIR, '.'),
  })
}

async function buildBundledOutputs() {
  setModuleEnv('esmodule')
  await compilePackage(false)
  await compilePackage(true)
}

const tasks = [
  {
    text: 'Copy Source Code',
    task: copySourceCode,
  },
  {
    text: 'Build Package Script Entry',
    task: buildPackageScriptEntry,
  },
  {
    text: 'Build Component Style Entry',
    task: buildStyleEntry,
  },
  {
    text: 'Build Package Style Entry',
    task: buildPackageStyleEntry,
  },
  {
    text: 'Build Type Declarations',
    task: buildTypeDeclarations,
  },
  {
    text: 'Build ESModule Outputs',
    task: buildESMOutputs,
  },
  {
    text: 'Build CommonJS Outputs',
    task: buildCJSOutputs,
  },
  {
    text: 'Build Bundled Outputs',
    task: buildBundledOutputs,
  },
]

const LIB_INDEX = 6
const ES_INDEX = 5

async function runBuildTasks(type?: 'es' | 'lib') {
  const _tasks = tasks
  if (type === 'es') {
    _tasks.splice(LIB_INDEX, 1)
  }
  if (type === 'lib') {
    _tasks.splice(ES_INDEX, 1)
  }
  for (let i = 0; i < _tasks.length; i++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { task, text } = _tasks[i]
    const spinner = ora(text).start()

    try {
      /* eslint-disable no-await-in-loop */
      await task(type)
      spinner.succeed(text)
    } catch (err) {
      spinner.fail(text)
      console.log(err)
      throw err
    }
  }

  consola.success('Compile successfully')
}

export async function build(params: { type?: 'es' | 'lib' }) {
  setNodeEnv('production')

  try {
    await clean()
    await installDependencies()
    await runBuildTasks(params.type)
  } catch (err) {
    consola.error('Build failed')
    process.exit(1)
  }
}

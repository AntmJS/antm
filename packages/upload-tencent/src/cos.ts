import npath from 'path'
import crypto from 'crypto'
import fs from 'fs'
import chalk from 'chalk'
import COS from 'cos-nodejs-sdk-v5'
import * as inquirer from 'inquirer'
import * as util from './util'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const configPath = npath.resolve(process.cwd(), './antm.config.js')

const bucketConfig = {
  CDN: '',
  SecretId: '',
  SecretKey: '',
  Bucket: '',
  Region: '',
}

const comfirmType = {
  type: 'confirm',
  name: 'confirm',
  message: 'Confirm upload ？',
  default: true,
}

if (fs.existsSync(configPath)) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const antmConfig = require(configPath)
  if (
    antmConfig.uploadTencent &&
    typeof antmConfig.uploadTencent === 'object'
  ) {
    bucketConfig.CDN = antmConfig.uploadTencent.CDN
    bucketConfig.Bucket = antmConfig.uploadTencent.Bucket
    bucketConfig.Region = antmConfig.uploadTencent.Region
    bucketConfig.SecretId = antmConfig.uploadTencent.SecretId
    bucketConfig.SecretKey = antmConfig.uploadTencent.SecretKey
  } else {
    console.error('请检查antm.config.js文件的配置信息和README的要求是否一致')
    process.exit(1)
  }
} else {
  console.error('根目录找不到antm.config.js文件')
  process.exit(1)
}

const cos = new COS({
  SecretId: bucketConfig.SecretId,
  SecretKey: bucketConfig.SecretKey,
})

function generateTargetFilePath(
  targetDir = '',
  baseDir = '',
  filePath = '',
  replace,
) {
  const relativePath = npath.relative(baseDir, filePath)
  let key = npath.join(targetDir, relativePath)

  if (replace) {
    const parse = npath.parse(key)
    key = npath.join(parse.dir, `${Date.now()}_${parse.name}${parse.ext}`)
  }

  return {
    Key: key.replace(/[\u4E00-\u9FFF\u0020]/g, ''),
    FilePath: filePath,
  }
}

function generateTargetFilePaths(targetDir, dir, excludeRegexp) {
  const files = util.getFiles(dir)

  return files
    .filter(function (item) {
      if (!excludeRegexp) {
        return true
      }
      const reg = new RegExp(excludeRegexp)

      return !reg.test(item)
    })
    .map((item) => {
      return generateTargetFilePath(
        targetDir,
        dir,
        npath.join(dir, item),
        false,
      )
    })
}

async function uploadToTencentRemote(target, targetDir) {
  return new Promise((resolve, reject) => {
    if (toString.call(target) === '[object Array]') {
      const targets = target.map((item) => {
        return {
          Bucket: bucketConfig.Bucket,
          Region: bucketConfig.Region,
          ...item,
        }
      })
      cos.uploadFiles(
        {
          files: targets,
          SliceSize: 1024 * 1024,
          // onProgress (info) {
          //   const percent = parseInt(info.percent * 10000) / 100
          //   const speed = parseInt(info.speed / 1024 / 1024 * 100) / 100
          //   console.log(`进度：${percent}%; 速度：${speed}Mb/s;`)
          // },
          onFileFinish(err) {
            if (err) {
              console.error(chalk.bgWhite('                   '))
              console.error(err)
              console.error(chalk.bgWhite('                   '))
              reject(err)
            }
          },
        },
        function (err) {
          if (err) {
            console.error(chalk.red('Upload fail.'))
            console.error(chalk.bgWhite('                   '))
            console.error(err)
            console.error(chalk.bgWhite('                   '))
            reject(err)
          } else {
            console.info(chalk.green('Upload success.'))
            console.info(
              chalk.green(
                `Request path: https://${npath.join(
                  bucketConfig.CDN,
                  targetDir,
                  '...',
                )}`,
              ),
            )
            resolve('')
          }
        },
      )
    } else {
      cos.sliceUploadFile(
        {
          Bucket: bucketConfig.Bucket,
          Region: bucketConfig.Region,
          ...target /* 必须 */,
          // onProgress (info) { /* 非必须 */
          //   const percent = parseInt(info.percent * 10000) / 100
          //   const speed = parseInt(info.speed / 1024 / 1024 * 100) / 100
          //   console.log(`进度：${percent}%; 速度：${speed}Mb/s;`)
          // },
        },
        function (err) {
          if (err) {
            console.error(chalk.red('Upload fail.'))
            console.error(chalk.bgWhite('                   '))
            console.error(err)
            console.error(chalk.bgWhite('                   '))
            reject(err)
          } else {
            console.info(chalk.green('Upload success'))
            console.info(
              chalk.green(
                `Request path: https://${npath.join(
                  bucketConfig.CDN,
                  target.Key,
                )}`,
              ),
            )
            resolve('')
          }
        },
      )
    }
  })
}

// cli调用
async function upload(program) {
  if (!program.dir && !program.filePath) {
    program.dir = './'
  }
  const md5 = crypto.createHash('md5')
  md5.update(`${program.filePath || program.dir}${Math.random()}`)
  const token = md5.digest('hex').substring(0, 5).toUpperCase()
  program.targetDir = npath.join(
    'dcos',
    `${util.formatTime(Date.now(), 'YYYY/MM/DD')}`,
    token,
  )
  console.warn(
    chalk.magentaBright(
      'Notice: chinese and spaces in filePath will be ignored.',
    ),
  )

  if (program.filePath) {
    program.filePath = npath.resolve(program.filePath)
    console.info(chalk.yellow(`Upload filePath: ${program.filePath}`))
  }

  if (program.dir) {
    program.dir = npath.resolve(program.dir)
    console.info(chalk.yellow(`Upload dir: ${program.dir}`))
  }
  console.info(chalk.yellow(`Target dir: ${program.targetDir}/`))
  let confirm = true
  if (!program.redirect) {
    const data = await inquirer.prompt([comfirmType])
    confirm = data.confirm
  }

  if (confirm) {
    try {
      // start 微信上传
      if (program.dir) {
        const files = generateTargetFilePaths(
          program.targetDir,
          program.dir,
          program.excludeRegexp,
        )
        await uploadToTencentRemote(files, program.targetDir)
      }

      if (program.filePath) {
        const baseDir = npath.dirname(program.filePath)
        const file = generateTargetFilePath(
          program.targetDir,
          baseDir,
          program.filePath,
          true,
        )
        await uploadToTencentRemote(file, program.targetDir)
      }
      // end 微信上传
    } catch (error) {
      process.exit(1)
    }
  } else {
    process.exit(1)
  }
}

async function bundle(program) {
  if (!program.dir) {
    console.error(chalk.red('Empty --dir'))
    process.exit(1)
  }

  if (!program.targetDir) {
    console.error(chalk.red('Empty --target-dir'))
    process.exit(1)
  }

  program.dir = npath.resolve(program.dir)
  console.info(chalk.yellow(`Upload dir: ${program.dir}`))
  console.info(chalk.yellow(`Target dir: ${program.targetDir}/`))
  try {
    // start 微信上传
    const files = generateTargetFilePaths(
      program.targetDir,
      program.dir,
      program.excludeRegexp,
    )
    await uploadToTencentRemote(files, program.targetDir)
    // end 微信上传
  } catch (error) {
    process.exit(1)
  }
}

export { upload, bundle }

#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const npath = require('path')
const https = require('https')
const fs = require('fs')

function accMul(arg1, arg2) {
  let m = 0
  const s1 = arg1.toString()
  const s2 = arg2.toString()
  try {
    const sp = s1.split('.')
    if (sp.length > 1) {
      m += s1.split('.')[1].length
    }
  } catch (e) {
    console.error(e)
  }

  try {
    const sp = s1.split('.')
    if (sp.length > 1) {
      m += s2.split('.')[1].length
    }
  } catch (e) {
    console.error(e)
  }

  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  )
}

function grabConfigFromScript(str, n) {
  const stash = []
  let rst = ''
  for (let i = n, l = str.length; i < l; i++) {
    if (str[i] === '{') {
      stash.push('{')
    }

    if (str[i] === '}') {
      stash.pop()
      if (stash.length === 0) {
        rst += '}'
        break
      }
    }

    if (stash.length) {
      rst += str[i]
    }
  }

  return rst
}

function transform(url, output) {
  return new Promise(function (resolve, reject) {
    https.get(url, (res) => {
      let content = ''
      res.on('error', (e) => {
        reject(e)
      })
      res.on('data', (chunk) => {
        content += chunk
      })
      res.on('end', () => {
        let match = content.match(
          new RegExp('[\\s\\r\\n]*@font-face[\\s\\r\\n]*'),
        )
        match = match ? match[0] : undefined
        const replaceContent = match
          ? grabConfigFromScript(content, content.indexOf(match) + match.length)
          : false
        replaceContent.replace(/url\(['"]([\s\S]+?)['"]\)/, (c, url) => {
          if (url.indexOf('//') === 0) {
            url = `https:${url}`
          } else if (url.indexOf('http:') === 0) {
            url = url.replace('http:', 'https:')
          }
          url = `${url.substr(0, url.lastIndexOf('.'))}.ttf?t=${Date.now()}`
          https.get(url, (res) => {
            const chunks = []
            res.on('error', (e) => {
              reject(e)
            })
            res.on('data', (chunk) => {
              chunks.push(chunk)
            })
            res.on('end', () => {
              const base64 = Buffer.concat(chunks).toString('base64')
              let font =
                "{font-family: 'iconfont';src: url(data:font/truetype;charset=utf-8;base64,#BASE64) format('truetype');font-weight: normal;font-style: normal;}"
              font = font.replace('#BASE64', base64)
              content = content.replace(replaceContent, font)
              content = content.replace(/(\d+(\.{0,1}\d+){0,1})px/, (a, b) => {
                return a.replace(a, `${accMul(b, 2)}px`)
              })
              fs.writeFileSync(npath.resolve(output), content)
              resolve()
            })
          })
        })
      })
    })
  })
}
async function start(inputPath, outputPath) {
  try {
    await transform(inputPath, outputPath)
    console.info('转换成功')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

let input = ''
let output = ''
process.argv.forEach((val, index) => {
  if (val === '--input-path') {
    input = process.argv[index + 1]
  }
  if (val === '--output-path') {
    output = process.argv[index + 1]
  }
})

if (input && output) {
  start(input, output)
} else {
  console.error(
    '参数错误',
    'npx antm-icon --input-path https://at.alicdn.com/t/xxxxxxx.css --output-path src/iconfont.less',
  )
}

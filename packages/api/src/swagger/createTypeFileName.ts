import { pinyin } from 'pinyin-pro'

export function createTypeFileName(swaggerTagName: string) {
  let swaggerTagName_ = swaggerTagName
  const regInvalidWords = /[\.\,\，\.\-]/g
  swaggerTagName_ = swaggerTagName_.replace(regInvalidWords, '')

  swaggerTagName_ = pinyin(swaggerTagName_, { toneType: 'none' })

  return swaggerTagName_.replace(/\s/g, '')
}

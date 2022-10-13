import { pinyin } from 'pinyin-pro'

export function createTypeFileName(swaggerTagName: string) {
  let swaggerTagName_ = swaggerTagName
  const regInvalidWords = /[\.\,\，\.\-]/g
  swaggerTagName_ = swaggerTagName_.replace(regInvalidWords, '')

  swaggerTagName_ = pinyin(swaggerTagName_, { toneType: 'none' })

  swaggerTagName_ = swaggerTagName_.replace(/\s/g, '')

  if (swaggerTagName_.length === 0) {
    swaggerTagName_ = 'Default'
  }

  return swaggerTagName_
}

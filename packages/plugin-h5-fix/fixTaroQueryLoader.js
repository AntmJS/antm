module.exports = function (source) {
  // 简单点先修复一下吧，以后再改成ast
  return source.replace(
    'queryString.parse(search, { decode: false })',
    'queryString.parse(search, { decode: true })',
  )
}

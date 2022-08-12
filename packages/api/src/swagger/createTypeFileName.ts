export function createTypeFileName(url: string) {
  const urlArr = url
    .split('/')
    .filter((it) => !!it)
    .map((u) => {
      return u.replace('.', '')
    })

  if (url.length > 2) {
    return `${urlArr[0]}-${urlArr[1]}-${urlArr[2]}`
  } else {
    return ''
  }
}

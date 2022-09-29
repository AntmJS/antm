type Record<K extends keyof any, T> = {
  [P in K]: T
}
type IAnyObject = Record<string, any>

export function version(ver1: string, ver2: string): number {
  const v1: string[] = ver1.split('.')
  const v2: string[] = ver2.split('.')
  const len: number = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }

  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1: number = v1[i] ? parseInt(v1[i]!) : 0
    const num2: number = v2[i] ? parseInt(v2[i]!) : 0

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

export function decodeParams(params: IAnyObject): IAnyObject {
  const newParams: IAnyObject = {}
  if (!isObject(params)) {
    return newParams
  }

  for (const key in params) {
    const kkey = decodeURIComponent(key)
    const vvalue = decodeURIComponent(params[key])
    if (isString(vvalue)) {
      try {
        newParams[kkey] = JSON.parse(vvalue)
        if (isNumber(newParams[kkey]) && newParams[kkey] + '' !== vvalue + '') {
          newParams[kkey] = vvalue
        }
      } catch (error) {
        newParams[kkey] = vvalue
      }
    } else {
      newParams[kkey] = vvalue
    }
  }

  return newParams
}

export function encodeParams(params: IAnyObject): IAnyObject {
  const newParams: IAnyObject = {}
  if (!isObject(params)) {
    return newParams
  }

  for (const key in params) {
    const kkey = encodeURIComponent(key)
    const vvalue = encodeURIComponent(params[key])
    newParams[kkey] = vvalue
  }

  return newParams
}

export function parse(str: string, decode = true): IAnyObject {
  const params: IAnyObject = {}
  if (!isString(str)) {
    return params
  }
  const trimStr: string = str.trim()
  if (trimStr === '') {
    return params
  }

  const newStr: string[] = trimStr.split('&')

  for (let i = 0; i < newStr.length; i++) {
    const [key, value]: string[] = newStr[i]!.split('=')
    if (decode) {
      const kkey = decodeURIComponent(key!)
      const vvalue = decodeURIComponent(value!)
      if (isString(vvalue)) {
        try {
          params[kkey] = JSON.parse(vvalue)
          if (isNumber(params[kkey]) && params[kkey] + '' !== vvalue + '') {
            params[kkey] = vvalue
          }
        } catch (error) {
          params[kkey] = vvalue
        }
      } else {
        params[kkey] = vvalue
      }
    } else {
      params[key!] = value
    }
  }

  return params
}

export function stringify(obj: IAnyObject, encode = true): string {
  if (!isObject(obj)) {
    return ''
  }
  const str: string[] = []
  for (const key in obj) {
    let value = ''
    if (encode) {
      if (typeof obj[key] === 'object') {
        value = `${encodeURIComponent(key)}=${encodeURIComponent(
          JSON.stringify(obj[key]),
        )}`
      } else if (typeof obj[key] === 'undefined') {
        value = `${encodeURIComponent(key)}=undefined`
      } else {
        value = `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      }
    } else {
      value = `${key}=${obj[key]}`
    }
    str.push(value)
  }

  return str.join('&')
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function isString(args: any): boolean {
  return toString.call(args) === '[object String]'
}

export function isArray(args: any): boolean {
  return toString.call(args) === '[object Array]'
}

export function isBoolean(args: any): boolean {
  return toString.call(args) === '[object Boolean]'
}

export function isUndefined(args: any): boolean {
  return toString.call(args) === '[object Undefined]'
}

export function isNull(args: any): boolean {
  return toString.call(args) === '[object Null]'
}

export function isNumber(args: any): boolean {
  return toString.call(args) === '[object Number]'
}

export function isObject(args: any): boolean {
  return toString.call(args) === '[object Object]'
}

export function isEmptyObject(args: any): boolean {
  if (!isObject(args)) {
    return false
  }

  for (const prop in args) {
    if (!isUndefined(args[prop])) {
      return false
    }
  }

  return true
}

export function isFunction(args: any): boolean {
  return toString.call(args) === '[object Function]'
}

export function isSymbol(args: any): boolean {
  return toString.call(args) === '[object Symbol]'
}

type Record<K extends keyof any, T> = {
  [P in K]: T
}
type IAnyObject = Record<string, any>
type NoneEmptyArray<T> = [T, ...T[]]

/**
 * @description 判断是否是字符串类型
 * @supported all
 * @example
 * ```tsx
 * const bool = isString(xxx)
 * ```
 * @export
 * @param {any} args
 * @returns {boolean}
 */
declare function isString(args: any): boolean

/**
 * @description 判断是否是数组类型
 * @supported all
 * @example
 * ```tsx
 * const bool = isArray(xxx)
 * ```
 * @export
 * @param {any} args
 * @returns {boolean}
 */
declare function isArray(args: any): boolean

/**
 * @description 判断是否是布偶类型
 * @supported all
 * @example
 * ```tsx
 * const bool = isBoolean(xxx)
 * ```
 * @export
 * @param {any} args
 * @returns {boolean}
 */
declare function isBoolean(args: any): boolean

/**
 * @description 判断是否是undefined
 * @supported all
 * @example
 * ```tsx
 * const bool = isUndefined(xxx)
 * ```
 * @export
 * @param {any} args
 * @returns {boolean}
 */
declare function isUndefined(args: any): boolean

/**
 * @description 判断是否是null
 * @supported all
 * @example
 * ```tsx
 * const bool = isNull(xxx)
 * ```
 * @export
 * @param {any} args
 * @returns {boolean}
 */
declare function isNull(args: any): boolean

/**
 * @description 判断是否是数字类型
 * @supported all
 * @example
 * ```tsx
 * const bool = isNumber(xxx)
 * ```
 * @export
 * @param {any} args
 * @returns {boolean}
 */
declare function isNumber(args: any): boolean

/**
 * @description 判断是否是对象
 * @supported all
 * @example
 * ```tsx
 * const bool = isObject(xxx)
 * ```
 * @export
 * @param {any} args
 * @returns {boolean}
 */
declare function isObject(args: any): boolean

/**
 * @description 判断是否是空对象
 * @supported all
 * @example
 * ```tsx
 * const bool = isEmptyObject(xxx)
 * ```
 * @export
 * @param {any} args
 * @returns {boolean}
 */
declare function isEmptyObject(args: any): boolean

/**
 * @description 判断是否是方法
 * @supported all
 * @example
 * ```tsx
 * const bool = isFunction(xxx)
 * ```
 * @export
 * @param {any} args
 * @returns {boolean}
 */
declare function isFunction(args: any): boolean

/**
 * @description 判断是否是symbol
 * @supported all
 * @example
 * ```tsx
 * const bool = isSymbol(xxx)
 * ```
 * @export
 * @param {any} args
 * @returns {boolean}
 */
declare function isSymbol(args: any): boolean

/**
 * @description decode对象内的所有属性值
 * @supported all
 * @example
 * ```tsx
 * const obj = decodeParams({})
 * ```
 * @export
 * @param {IAnyObject} params
 * @return {*}  {IAnyObject}
 */
declare function decodeParams(params: IAnyObject): IAnyObject

/**
 * @description encode对象内的所有属性值
 * @supported all
 * @example
 * ```tsx
 * const obj = encodeParams({})
 * ```
 * @export
 * @param {IAnyObject} params
 * @return {*}  {IAnyObject}
 */
declare function encodeParams(params: IAnyObject): IAnyObject

/**
 * @description 传入不带问号的search返回对象，解析query成对象
 * @supported all
 * @example
 * ```tsx
 * const obj = parse('')
 * ```
 * @export
 * @param {string} str
 * @param {boolean} decode
 * @return {*}  {IAnyObject}
 */
declare function parse(str: string, decode?: boolean): IAnyObject

/**
 * @description 传入一个对象返回&拼接的字符串，对象解析成字符串以&拼接
 * @supported all
 * @example
 * ```tsx
 * const str = stringify({})
 * ```
 * @export
 * @param {IAnyObject} obj
 * @param {boolean} encode
 * @return {*}  {string}
 */
declare function stringify(obj: IAnyObject, encode?: boolean): string

/**
 * @description 比较版本号大小
 * @param {string} ver1
 * @param {string} ver2
 * @returns {number}
 */
declare function version(ver1: string, ver2: string): number

export {
  version,
  stringify,
  parse,
  decodeParams,
  encodeParams,
  isString,
  isArray,
  isBoolean,
  isEmptyObject,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isSymbol,
  isUndefined,
}

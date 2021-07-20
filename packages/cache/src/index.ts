import Cache from '../types/index.d'

declare const my: any
declare const wx: any
declare const tt: any

const minins =
  typeof wx === 'object'
    ? wx
    : typeof my === 'object'
    ? my
    : typeof tt === 'object'
    ? tt
    : undefined

function isUndefined(args: any): boolean {
  return toString.call(args) === '[object Undefined]'
}

function isNull(args: any): boolean {
  return toString.call(args) === '[object Null]'
}

export default function <
  TRam extends Cache.IAnyObject,
  TLocal extends Cache.IAnyObject,
>(init: { ram: TRam; loc: TLocal }): Cache.IMethod<TRam, TLocal> {
  const tempKeys = Object.keys(init.ram) as (keyof TRam)[]
  const localKeys = Object.keys(init.loc) as (keyof TLocal)[]
  const store = { ...init.ram, ...init.loc }

  function cacheGetSync<T extends Cache.ICacheOptAllKey<TRam, TLocal>>(
    key: T,
  ): Partial<Cache.StateOpt<Cache.ICacheOptAll<TRam, TLocal>>>[T] {
    if (tempKeys.includes(key as keyof TRam)) {
      return store[key]
    } else if (localKeys.includes(key as keyof TLocal)) {
      let value = store[key]
      if (isUndefined(value) || isNull(value)) {
        try {
          value = minins?.getStorageSync(key)
          store[key] = value
        } catch {}
      }

      return value
    }
    console.error(
      `请先注册该Key：ACEMiniCache({ ram: { ${key}: '${key}' }, loc: { ${key}: '${key}' } })`,
    )
    return
  }

  function cacheGet<T extends Cache.ICacheOptAllKey<TRam, TLocal>>(option: {
    key: T
  }): Promise<Partial<Cache.StateOpt<Cache.ICacheOptAll<TRam, TLocal>>>[T]> {
    return new Promise(function (resolve) {
      if (tempKeys.includes(option.key as keyof TRam)) {
        resolve(store[option.key])
      } else if (localKeys.includes(option.key as keyof TLocal)) {
        const value = store[option.key]
        if (isUndefined(value) || isNull(value)) {
          minins?.getStorage({
            ...option,
            success(res: any) {
              store[option.key] = res.data
              resolve(res.data)
            },
            fail() {
              resolve(value)
            },
          })
        } else {
          resolve(value)
        }
      } else {
        console.error(
          `请先注册该Key：ACEMiniCache({ ram: { ${option.key}: '${option.key}' }, loc: { ${option.key}: '${option.key}' } })`,
        )
        resolve(undefined)
      }
    })
  }

  function cacheSetSync<T extends Cache.ICacheOptAllKey<TRam, TLocal>>(
    key: T,
    value: Cache.StateOpt<Cache.ICacheOptAll<TRam, TLocal>>[T],
  ): void {
    if (tempKeys.includes(key as keyof TRam)) {
      store[key] = value
    } else if (localKeys.includes(key as keyof TLocal)) {
      store[key] = value
      if (!isUndefined(value) && !isNull(value)) {
        minins?.setStorageSync(key, value)
      }
    } else {
      console.error(
        `请先注册该Key：ACEMiniCache({ ram: { ${key}: '${key}' }, loc: { ${key}: '${key}' } })`,
      )
    }
  }

  function cacheSet<T extends Cache.ICacheOptAllKey<TRam, TLocal>>(option: {
    key: T
    data: Cache.StateOpt<Cache.ICacheOptAll<TRam, TLocal>>[T]
  }): Promise<void> {
    return new Promise(function (resolve: (args: void) => void) {
      if (tempKeys.includes(option.key as keyof TRam)) {
        store[option.key] = option.data
        resolve()
      } else if (localKeys.includes(option.key as keyof TLocal)) {
        store[option.key] = option.data
        if (!isUndefined(option.data) && !isNull(option.data)) {
          minins?.setStorage({
            ...option,
            success() {
              resolve()
            },
            fail() {
              resolve()
            },
          })
        } else {
          resolve()
        }
      } else {
        console.error(
          `请先注册该Key：ACEMiniCache({ ram: { ${option.key}: '${option.key}' }, loc: { ${option.key}: '${option.key}' } })`,
        )
        resolve()
      }
    })
  }

  function cacheRemoveSync<T extends Cache.ICacheOptAllKey<TRam, TLocal>>(
    key: T,
  ): void {
    if (tempKeys.includes(key as keyof TRam)) {
      delete store[key]
    } else if (localKeys.includes(key as keyof TLocal)) {
      delete store[key]

      minins?.removeStorageSync(key)
    } else {
      console.error(
        `请先注册该Key：ACEMiniCache({ ram: { ${key}: '${key}' }, loc: { ${key}: '${key}' } })`,
      )
    }
  }

  function cacheRemove<T extends Cache.ICacheOptAllKey<TRam, TLocal>>(option: {
    key: T
  }): Promise<void> {
    return new Promise(function (resolve: (args: void) => void) {
      if (tempKeys.includes(option.key as keyof TRam)) {
        delete store[option.key]
        resolve()
      } else if (localKeys.includes(option.key as keyof TLocal)) {
        delete store[option.key]
        minins?.removeStorage({
          ...option,
          success() {
            resolve()
          },
          fail() {
            resolve()
          },
        })
      } else {
        console.error(
          `请先注册该Key：ACEMiniCache({ ram: { ${option.key}: '${option.key}' }, loc: { ${option.key}: '${option.key}' } })`,
        )
        resolve()
      }
    })
  }

  return {
    cacheGetSync,
    cacheGet,
    cacheSetSync,
    cacheSet,
    cacheRemoveSync,
    cacheRemove,
  }
}

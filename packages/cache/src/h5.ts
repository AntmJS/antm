import type Cache from '../types/index.d'

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
  const store: any = {}

  function cacheGetSync<T extends Cache.ICacheOptAllKey<TRam, TLocal>>(
    key: T,
  ): Partial<Cache.StateOpt<Cache.ICacheOptAll<TRam, TLocal>>>[T] {
    if (tempKeys.includes(key as keyof TRam)) {
      return store[key] || init.ram[key as keyof TRam]
    } else if (localKeys.includes(key as keyof TLocal)) {
      let value = store[key]
      if (isUndefined(value) || isNull(value)) {
        try {
          const result = window.localStorage.getItem(key as string)
          if (result) {
            value = JSON.parse(result)
          }
          store[key] = value
        } catch {}
      }

      return value ?? (init.loc[key as keyof TLocal] as any)
    }
    console.error(
      `请先注册该Key：Cache({ ram: { ${key}: '${key}' }, loc: { ${key}: '${key}' } })`,
    )
    return
  }

  function cacheGet<T extends Cache.ICacheOptAllKey<TRam, TLocal>>(option: {
    key: T
  }): Promise<Partial<Cache.StateOpt<Cache.ICacheOptAll<TRam, TLocal>>>[T]> {
    return new Promise(function (resolve) {
      if (tempKeys.includes(option.key as keyof TRam)) {
        resolve(store[option.key] || init.ram[option.key as keyof TRam])
      } else if (localKeys.includes(option.key as keyof TLocal)) {
        let value = store[option.key]
        if (isUndefined(value) || isNull(value)) {
          try {
            const result = window.localStorage.getItem(option.key as string)
            if (result) {
              value = JSON.parse(result)
            }
            store[option.key] = value
            resolve(value ?? (init.loc[option.key as keyof TLocal] as any))
          } catch {
            resolve(value ?? (init.loc[option.key as keyof TLocal] as any))
          }
        } else {
          resolve(value)
        }
      } else {
        console.error(
          `请先注册该Key：Cache({ ram: { ${option.key}: '${option.key}' }, loc: { ${option.key}: '${option.key}' } })`,
        )
        resolve(undefined)
      }
    })
  }

  function cacheSetSync<T extends Cache.ICacheOptAllKey<TRam, TLocal>>(
    key: T,
    value: Partial<Cache.StateOpt<Cache.ICacheOptAll<TRam, TLocal>>[T]>,
  ): void {
    if (tempKeys.includes(key as keyof TRam)) {
      store[key] = value
    } else if (localKeys.includes(key as keyof TLocal)) {
      store[key] = value
      if (!isUndefined(value) && !isNull(value)) {
        try {
          window.localStorage.setItem(key as string, JSON.stringify(value))
        } catch {}
      }
    } else {
      console.error(
        `请先注册该Key：Cache({ ram: { ${key}: '${key}' }, loc: { ${key}: '${key}' } })`,
      )
    }
  }

  function cacheSet<T extends Cache.ICacheOptAllKey<TRam, TLocal>>(option: {
    key: T
    data: Partial<Cache.StateOpt<Cache.ICacheOptAll<TRam, TLocal>>[T]>
  }): Promise<void> {
    return new Promise(function (resolve: (args: void) => void) {
      if (tempKeys.includes(option.key as keyof TRam)) {
        store[option.key] = option.data
        resolve()
      } else if (localKeys.includes(option.key as keyof TLocal)) {
        store[option.key] = option.data
        if (!isUndefined(option.data) && !isNull(option.data)) {
          try {
            window.localStorage.setItem(
              option.key as string,
              JSON.stringify(option.data),
            )
            resolve()
          } catch {
            resolve()
          }
        }
      } else {
        console.error(
          `请先注册该Key：Cache({ ram: { ${option.key}: '${option.key}' }, loc: { ${option.key}: '${option.key}' } })`,
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
      try {
        window.localStorage.removeItem(key as string)
      } catch {}
    } else {
      console.error(
        `请先注册该Key：Cache({ ram: { ${key}: '${key}' }, loc: { ${key}: '${key}' } })`,
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
        try {
          window.localStorage.removeItem(option.key as string)
          resolve()
        } catch {
          resolve()
        }
      } else {
        console.error(
          `请先注册该Key：Cache({ ram: { ${option.key}: '${option.key}' }, loc: { ${option.key}: '${option.key}' } })`,
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

declare namespace Cache {
  type Record<K extends keyof any, T> = {
    [P in K]: T
  }
  type IAnyObject = { [key: string]: any }
  // type IAnyObject = Record<string, any>
  type NoneEmptyArray<T> = [T, ...T[]]
  type IFunctionObject = Record<string, (arg?: any) => any>

  type ICacheOptAll<TRam extends IAnyObject, TLocal extends IAnyObject> = {
    [K in keyof TLocal]: TLocal[K]
  } &
    { [K in keyof TRam]: TRam[K] }

  type ICacheOptAllKey<TRam extends IAnyObject, TLocal extends IAnyObject> =
    | keyof TRam
    | keyof TLocal

  type StateOpt<T> = {
    [K in keyof T]: T[K] extends null | undefined
      ? any
      : T[K] extends IAnyObject
      ? T[K] & IAnyObject
      : T[K]
  }
  interface IMethod<TRam extends IAnyObject, TLocal extends IAnyObject> {
    cacheGetSync: <T extends ICacheOptAllKey<TRam, TLocal>>(
      key: T,
    ) => Partial<StateOpt<ICacheOptAll<TRam, TLocal>>>[T]
    cacheGet: <T extends ICacheOptAllKey<TRam, TLocal>>(option: {
      key: T
    }) => Promise<Partial<StateOpt<ICacheOptAll<TRam, TLocal>>>[T]>
    cacheSetSync: <T extends ICacheOptAllKey<TRam, TLocal>>(
      key: T,
      value: StateOpt<ICacheOptAll<TRam, TLocal>>[T],
    ) => void
    cacheSet: <T extends ICacheOptAllKey<TRam, TLocal>>(option: {
      key: T
      data: StateOpt<ICacheOptAll<TRam, TLocal>>[T]
    }) => Promise<void>
    cacheRemoveSync: <T extends ICacheOptAllKey<TRam, TLocal>>(key: T) => void
    cacheRemove: <T extends ICacheOptAllKey<TRam, TLocal>>(option: {
      key: T
    }) => Promise<void>
  }
}

declare function Cache<
  TRam extends IAnyObject,
  TLocal extends IAnyObject,
>(init: { ram: TRam; local: TLocal }): Cache.IMethod<TRam, TLocal>

export default Cache

declare namespace GlobalState {
  type Record<K extends keyof any, T> = {
    [P in K]: T
  }
  type IAnyObject = Record<string, any>
  type NoneEmptyArray<T> = [T, ...T[]]
  type IFunctionObject = Record<string, (arg?: any) => any>
  type IPromiseFunctionObject<TData> = Partial<
    {
      [K in keyof TData]: (
        params?: any,
      ) => Promise<{ data: any; error?: { code: string; message: string } }>
    }
  >

  type StateOpt<T> = {
    [K in keyof T]: T[K] extends null | undefined
      ? any
      : T[K] extends IAnyObject
      ? T[K] & IAnyObject
      : T[K]
  }

  interface IUpdate<
    TData extends IAnyObject,
    TFetch extends IPromiseFunctionObject<TData>,
  > {
    fetchAndUpdate: (key: keyof TFetch, params?: any) => Promise<void>
    update: <T extends keyof TData>(
      key: T,
      value: Partial<StateOpt<{ [K in keyof TData]: TData[K] }>>[T],
    ) => void
  }

  interface IMethod<
    TData extends IAnyObject,
    TFetch extends IPromiseFunctionObject<TData>,
  > {
    Provider: ({ children }: any) => JSX.Element
    useGlobalState: <T extends keyof TData>(
      key: T,
    ) => Partial<StateOpt<{ [K in keyof TData]: TData[K] }>>[T]

    useGlobalLoading: <T extends keyof TData>(
      key?: T,
    ) => Partial<{ [K in keyof TFetch]: boolean }>

    useGlobalError: <T extends keyof TData>(
      key?: T,
    ) => Partial<{ [K in keyof TFetch]: { code: string; message: string } }>

    useUpdate: () => IUpdate<TData, TFetch>
  }
}

declare function GlobalState<
  TData extends IAnyObject,
  TFetch extends IPromiseFunctionObject<TData>,
>(data: TData, fetch: TFetch): GlobalState.IMethod<TData, TFetch>

export default GlobalState

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

  // function useGlobalState<T extends keyof TData>(
  //   key?: T,
  // ): Partial<StateOpt<{ [K in keyof TData]: TData[K] }>>[T]
  interface IUseGlobalState<T extends keyof TData, TData extends IAnyObject> {
    (): Partial<StateOpt<{ [K in keyof TData]: TData[K] }>>
    (key: T): Partial<StateOpt<{ [K in keyof TData]: TData[K] }>>[T]
  }

  interface IMethod<
    TData extends IAnyObject,
    TFetch extends IPromiseFunctionObject<TData>,
  > {
    Provider: ({ children }: any) => JSX.Element
    useGlobalState: {
      (): Partial<StateOpt<{ [K in keyof TData]: TData[K] }>>
      <T extends keyof TData>(key: T):
        | Partial<StateOpt<{ [K in keyof TData]: TData[K] }>>[T]
    }

    useGlobalLoading: {
      (): Partial<{ [K in keyof TFetch]: boolean }>
      <T extends keyof TFetch>(key: T): Partial<
        { [K in keyof TFetch]: boolean }
      >[T]
    }

    useGlobalError: {
      (): Partial<{ [K in keyof TFetch]: { code: string; message: string } }>
      <T extends keyof TFetch>(key: T): Partial<
        { [K in keyof TFetch]: { code: string; message: string } }
      >[T]
    }

    useClearGlobalError: () => React.Dispatch<
      React.SetStateAction<
        Partial<{ [K in keyof TFetch]: { code: string; message: string } }>
      >
    >

    useUpdate: () => <T extends keyof TData>(
      key: T,
      value: Partial<GlobalState.StateOpt<{ [K in keyof TData]: TData[K] }>>[T],
    ) => void

    useFetchAndUpdate: () => (key: keyof TFetch, params?: any) => void
  }
}

declare function GlobalState<
  TData extends GlobalState.IAnyObject,
  TFetch extends GlobalState.IPromiseFunctionObject<TData>,
>(data: TData, fetch: TFetch): GlobalState.IMethod<TData, TFetch>

export default GlobalState

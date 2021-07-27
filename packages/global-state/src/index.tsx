import { useRef, useState } from 'react'

import { createContext, useContextSelector } from 'use-context-selector'
import GlobalState from '../types/index.d'

export default function <
  TData extends GlobalState.IAnyObject,
  TFetch extends GlobalState.IPromiseFunctionObject<TData>,
>(data: TData, fetch: TFetch): GlobalState.IMethod<TData, TFetch> {
  // 全局数据使用的context
  const context = createContext(null) as React.Context<
    | null
    | [
        GlobalState.StateOpt<{ [K in keyof TData]: TData[K] }>,
        React.Dispatch<React.SetStateAction<TData>>,
      ]
  >

  // 远程请求数据状态变更使用的context
  const loadingContext = createContext(null) as React.Context<
    null | [Partial<{ [K in keyof TFetch]: boolean }>, any]
  >

  // 远程请求数据发生错误使用的context
  const errorContext = createContext(null) as React.Context<
    | null
    | [Partial<{ [K in keyof TFetch]: { code: string; message: string } }>, any]
  >

  // 更新全局数据使用的context
  const fetchContext = createContext({
    fetchAndUpdate: (key: keyof TFetch, params?: any) => {
      console.error('调用失败，还未初始化', key, params)
    },
    update: <T extends keyof TData>(
      key: T,
      value: Partial<GlobalState.StateOpt<{ [K in keyof TData]: TData[K] }>>[T],
    ) => {
      console.error('调用失败，还未初始化', key, value)
    },
  })

  const Provider = ({ children }: any) => {
    const [state, setState] = useState(data)
    const [loading, setLoading] = useState({})
    const [error, setError] = useState({})
    const ins = useRef({
      fetchAndUpdate: async (key: keyof TFetch, params?: any) => {
        if (fetch[key]) {
          const { data, error } = await fetch[key]!(params)
          if (!error) {
            setState((pre) => {
              return { ...pre, [key]: data }
            })
          }
        }
      },
      update: <T extends keyof TData>(
        key: T,
        value: Partial<
          GlobalState.StateOpt<{ [K in keyof TData]: TData[K] }>
        >[T],
      ) => {
        console.error('调用失败，还未初始化', key, value)
      },
    })

    return (
      <context.Provider value={[state, setState]}>
        <fetchContext.Provider value={ins.current}>
          <loadingContext.Provider value={[loading, setLoading]}>
            <errorContext.Provider value={[error, setError]}>
              {children}
            </errorContext.Provider>
          </loadingContext.Provider>
        </fetchContext.Provider>
      </context.Provider>
    )
  }

  function useGlobalState<T extends keyof TData>(
    key: T,
  ): Partial<GlobalState.StateOpt<{ [K in keyof TData]: TData[K] }>>[T] {
    return useContextSelector(context, (v) => v?.[0][key])
  }

  function useGlobalLoading<T extends keyof TData>(
    key?: T,
  ): Partial<{ [K in keyof TFetch]: boolean }> {
    console.log(key)
    return {}
  }

  function useGlobalError<T extends keyof TData>(
    key?: T,
  ): Partial<{ [K in keyof TFetch]: { code: string; message: string } }> {
    console.log(key)
    return {}
  }

  function useUpdate(): GlobalState.IUpdate<TData, TFetch> {
    return {
      fetchAndUpdate: async (key: keyof TFetch, params?: any) => {
        if (fetch[key]) {
          const { data, error } = await fetch[key]!(params)
          console.log(data, error)
          // if (!error) {
          //   setState((pre) => {
          //     return { ...pre, [key]: data }
          //   })
          // }
        }
      },
      update: <T extends keyof TData>(
        key: T,
        value: Partial<
          GlobalState.StateOpt<{ [K in keyof TData]: TData[K] }>
        >[T],
      ) => {
        console.error('调用失败，还未初始化', key, value)
      },
    }
  }

  return {
    Provider,
    useGlobalState,
    useGlobalLoading,
    useGlobalError,
    useUpdate,
  }
}

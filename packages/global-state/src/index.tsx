import type GlobalState from '../types/index.d'
import { useRef, useState } from 'react'

import { createContext, useContextSelector } from 'use-context-selector'

export default function <
  TData extends GlobalState.IAnyObject,
  TFetch extends GlobalState.IPromiseFunctionObject<TData>,
>(data: TData, fetch: TFetch): GlobalState.IMethod<TData, TFetch> {
  // 全局数据使用的context
  const context = createContext(null) as React.Context<
    | null
    | [
        GlobalState.StateOpt<{ [K in keyof TData]: TData[K] }>,
        React.Dispatch<
          React.SetStateAction<
            GlobalState.StateOpt<{ [K in keyof TData]: TData[K] }>
          >
        >,
      ]
  >

  // 远程请求数据状态变更使用的context
  const loadingContext = createContext(null) as React.Context<
    | null
    | [
        Partial<{ [K in keyof TFetch]: boolean }>,
        React.Dispatch<
          React.SetStateAction<Partial<{ [K in keyof TFetch]: boolean }>>
        >,
      ]
  >

  // 远程请求数据发生错误使用的context
  const errorContext = createContext(null) as React.Context<
    | null
    | [
        Partial<{ [K in keyof TFetch]: GlobalState.IError }>,
        React.Dispatch<
          React.SetStateAction<
            Partial<{ [K in keyof TFetch]: GlobalState.IError }>
          >
        >,
      ]
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
    const [state, setState] = useState(data || {})
    const [loading, setLoading] = useState({})
    const [error, setError] = useState({})
    const ins = useRef({
      fetchAndUpdate: async (key: keyof TFetch, params?: any) => {
        if (fetch[key]) {
          setLoading({ [key]: true })
          const { data, error } = await fetch[key]!(params)
          setLoading({ [key]: false })
          if (!error) {
            setState((pre) => {
              return { ...pre, [key]: data }
            })
          } else {
            setError({ [key]: error })
          }
        }
      },
      update: <T extends keyof TData>(
        key: T,
        value: Partial<
          GlobalState.StateOpt<{ [K in keyof TData]: TData[K] }>
        >[T],
      ) => {
        setState((pre) => {
          return { ...pre, [key]: value }
        })
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

  function useGlobalState<T extends keyof TData>(key?: T): any {
    return useContextSelector(context, (v) => {
      if (!v) console.error('Provider未初始化')
      return key ? v![0][key] : v![0]
    })
  }

  function useGlobalLoading<T extends keyof TFetch>(key?: T): any {
    return useContextSelector(loadingContext, (v) => {
      if (!v) console.error('Provider未初始化')
      return key ? v![0][key] : v![0]
    })
  }

  function useGlobalError<T extends keyof TFetch>(key?: T): any {
    return useContextSelector(errorContext, (v) => {
      if (!v) console.error('Provider未初始化')
      return key ? v![0][key] : v![0]
    })
  }

  function useClearGlobalError(): any {
    return useContextSelector(errorContext, (v) => {
      if (!v) console.error('Provider未初始化')
      return v![1]
    })
  }

  function useUpdate(): any {
    const { update } = useContextSelector(fetchContext, (v) => {
      if (!v) console.error('Provider未初始化')
      return v
    })
    return update
  }

  function useFetchAndUpdate(): any {
    const { fetchAndUpdate } = useContextSelector(fetchContext, (v) => {
      if (!v) console.error('Provider未初始化')
      return v
    })
    return fetchAndUpdate
  }

  return {
    Provider,
    useGlobalState,
    useGlobalLoading,
    useGlobalError,
    useClearGlobalError,
    useUpdate,
    useFetchAndUpdate,
  }
}

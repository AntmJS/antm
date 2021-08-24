/* eslint-disable react-hooks/exhaustive-deps */
import type TypeUnite from '../types/index.d'
import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh,
  useReachBottom,
  usePageScroll,
  useRouter,
} from '@tarojs/taro'
import { useRef, useState, useEffect, memo } from 'react'

let catchMethod: any

function executeCatch(
  err: any,
  setError: React.Dispatch<React.SetStateAction<TypeUnite.IError | undefined>>,
): void {
  if (catchMethod) {
    catchMethod(err, setError)
  } else {
    console.warn('请先注册registerCatch')
  }
}

function useEventEnhancement<
  TState extends TypeUnite.IAnyObject,
  TProps extends TypeUnite.IFunctionObject,
  TAll extends TypeUnite.IAnyObject,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
>(
  config: TypeUnite.Option<TState, TAll, TProps>,
  setState: React.Dispatch<React.SetStateAction<TState>>,
  setError: React.Dispatch<React.SetStateAction<TypeUnite.IError | undefined>>,
  context: React.MutableRefObject<any>,
): TypeUnite.EventEnhancementResponse<TAll> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventsRef = <React.MutableRefObject<any>>useRef({})

  const [loading, setLoading] = useState({})
  // 解决development环境热更新问题，重新创建eventsRef
  if (!context.current.__init || process.env.NODE_ENV === 'development') {
    context.current.__init = true

    const _setState = function (
      obj: Partial<TypeUnite.StateOpt<TState>>,
    ): void {
      if (context.current.__mounted) {
        setState((preState) => {
          return { ...preState, ...obj }
        })
      }
    }

    const _setError: React.Dispatch<
      React.SetStateAction<TypeUnite.IError | undefined>
    > = function (res) {
      if (context.current.__mounted) {
        setError(res)
      }
    }

    const _setLoading = function (
      obj: Partial<{ [K in keyof TypeUnite.PromiseProperties<TAll>]: boolean }>,
    ): void {
      if (context.current.__mounted) {
        // 这里同步更新，保证this.loading的同步性
        context.current.loading = { ...loading, ...obj }
        setLoading((preState) => {
          return { ...preState, ...obj }
        })
      }
    }

    // 这里只执行一遍
    context.current.loading = loading
    context.current.setState = _setState
    eventsRef.current.setState = _setState
    context.current.setError = _setError
    eventsRef.current.setError = _setError

    for (const item in config) {
      if (typeof config[item] === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newFunc = <(...args: any[]) => any>config[item]

        /** 开发环境保留原始函数 */
        // if (process.env.NODE_ENV === 'development') {
        //   eventsRef.current[`${item}_origin`] = config[item]
        // }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _defined = function (this: any, ...args: any[]): any {
          let res: any
          try {
            res = newFunc.call(this, ...args)
            if (typeof res?.then !== 'function') {
              return res
            }
          } catch (err) {
            executeCatch(err, _setError)
          }

          const loadingTrue = {
            [item]: true,
          } as Partial<
            { [K in keyof TypeUnite.PromiseProperties<TAll>]: boolean }
          >
          const loadingFalse = {
            [item]: false,
          } as Partial<
            { [K in keyof TypeUnite.PromiseProperties<TAll>]: boolean }
          >
          try {
            return new Promise(function (resolve) {
              _setLoading(loadingTrue)
              res
                .then(function (result: any) {
                  _setLoading(loadingFalse)
                  resolve(result)
                })
                .catch(function (err: any) {
                  _setLoading(loadingFalse)
                  executeCatch(err, _setError)
                })
            })
          } catch (err) {
            _setLoading(loadingFalse)
            executeCatch(err, _setError)
          }
        }
        context.current[item] = _defined.bind(context.current)
        eventsRef.current[item] = _defined.bind(context.current)
      } else if (item !== 'state') {
        context.current[item] = config[item]
      }
    }
  }

  return { events: eventsRef.current, loading }
}

function useContainer<
  TState extends TypeUnite.IAnyObject,
  TProps extends TypeUnite.IAnyObject,
  TAll extends TypeUnite.IAnyObject,
>(
  config: TypeUnite.Option<TState, TAll, TProps>,
  props: TProps,
): TypeUnite.Response<TState, TAll> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context = <React.MutableRefObject<any>>(
    useRef({ __mounted: false, __init: false, props })
  )
  const [state, setState] = useState(config.state)
  const [error, setError] = useState(undefined) as [
    TypeUnite.IError | undefined,
    React.Dispatch<React.SetStateAction<TypeUnite.IError | undefined>>,
  ]

  const { events, loading } = useEventEnhancement(
    config,
    setState,
    setError,
    context,
  )

  const routerInfo: Taro.RouterInfo = useRouter()
  context.current.location = routerInfo
  context.current.state = state
  context.current.error = error

  useEffect(function () {
    // 解决development环境热更新（useState不可破坏性），重新setState
    if (process.env.NODE_ENV === 'development') setState(config.state)
    context.current.__mounted = true
    context.current?.onLoad?.()

    return function (): void {
      context.current && (context.current.__mounted = false)
      setError(undefined)
      context.current?.onUnload?.()
    }
  }, [])

  useReady(function () {
    context.current?.onReady?.()
  })

  useDidShow(function () {
    context.current.__mounted = true
    context.current?.onShow?.()
  })

  useDidHide(function () {
    context.current?.onHide?.()
  })

  usePullDownRefresh(function () {
    context.current?.onPullDownRefresh?.()
  })

  useReachBottom(function () {
    context.current?.onReachBottom?.()
  })

  usePageScroll(function (payload: Taro.PageScrollObject) {
    context.current?.onPageScroll?.(payload)
  })

  useEffect(() => {
    if (context.current) {
      context.current.props = props
    }
  }, [props])

  return { state, events, loading, error }
}

export function registerCatch(
  method: (
    err: TypeUnite.IError,
    setError: React.Dispatch<
      React.SetStateAction<TypeUnite.IError | undefined>
    >,
  ) => void,
): void {
  catchMethod = method
}

export default function Unite<
  TState extends TypeUnite.IAnyObject,
  TAll extends TypeUnite.IAnyObject,
  TProps extends TypeUnite.IAnyObject,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
>(
  config: TypeUnite.Option<TState, TAll, TProps>,
  renderCom: (
    data: TypeUnite.Response<TState, TAll>,
    props?: TProps,
  ) => JSX.Element,
): (props: TProps) => any {
  return memo(function Index(props) {
    const data = useContainer(config, props)

    return renderCom(data, props)
  })
}

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
  useResize,
} from '@tarojs/taro'
import { useRef, useState, useEffect, memo } from 'react'

function isString(args: any): boolean {
  return toString.call(args) === '[object String]'
}

function parse(str: string, decode = true): TypeUnite.IAnyObject {
  const params: TypeUnite.IAnyObject = {}
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
          if (
            toString.call(params[kkey]) === '[object Number]' &&
            params[kkey] + '' !== vvalue + ''
          ) {
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

let catchMethod: any

function executeCatch(
  err: any,
  setError: React.Dispatch<React.SetStateAction<TypeUnite.IError | undefined>>,
): void {
  if (catchMethod) {
    catchMethod(err, setError)
  } else {
    console.error(err)
  }
}

function useContainer<
  TState extends TypeUnite.IAnyObject,
  TProps extends TypeUnite.IAnyObject,
  TAll extends TypeUnite.IAnyObject,
>(
  config: TypeUnite.Option<TState, TAll, TProps>,
  props: TProps,
): TypeUnite.Response<TState, TAll> {
  // 兼容react-refresh
  const cfgRef = <React.MutableRefObject<any>>useRef({})
  cfgRef.current = config

  // 通过ref初始化实例对象
  const insRef = <React.MutableRefObject<any>>useRef({
    loading: {},
    hooks: {},
  })

  // 初始化state
  const [state, setState]: any = useState(cfgRef.current.state)

  // 定义错误收集器，页面级展示的错误可以设置到这里面
  const [error, setError]: any = useState()

  // 定义加载收集器
  const [loading, setLoading]: any = useState({})

  // 通过ref定义一些开关
  const flagRef = <React.MutableRefObject<any>>useRef({
    __mounted: false,
    __init: false,
    __refactor: function () {
      insRef.current.setState = function (
        res:
          | Partial<TypeUnite.StateOpt<TState>>
          | React.SetStateAction<TypeUnite.StateOpt<TState>>,
      ): void {
        if (flagRef.current.__mounted) {
          if (toString.call(res) === '[object Object]') {
            setState((preState: any) => {
              return { ...preState, ...res }
            })
          } else {
            setState(res as React.SetStateAction<TypeUnite.StateOpt<TState>>)
          }
        }
      }

      insRef.current.setError = function (res: TypeUnite.IError | undefined) {
        if (flagRef.current.__mounted) {
          setError(res)
        }
      }

      const _setLoading = function (
        obj: Partial<
          { [K in keyof TypeUnite.PromiseProperties<TAll>]: boolean }
        >,
      ): void {
        if (flagRef.current.__mounted) {
          setLoading((preState: any) => {
            return { ...preState, ...obj }
          })
        }
      }
      for (const item in cfgRef.current) {
        if (typeof cfgRef.current[item] === 'function') {
          const copyFunc = cfgRef.current[item]
          const _defined = function (this: any, ...args: any[]): any {
            let res: any
            try {
              if (insRef.current.loading[item]) {
                return new Promise(() => {})
              }
              res = copyFunc!.call(this, ...args)
              if (typeof res?.then !== 'function') {
                return res
              }
            } catch (err) {
              executeCatch(err, insRef.current.setError)
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
                insRef.current.loading[item] = true
                _setLoading(loadingTrue)
                res
                  .then(function (result: any) {
                    insRef.current.loading[item] = false
                    _setLoading(loadingFalse)
                    resolve(result)
                  })
                  .catch(function (err: any) {
                    const allLoading: any = {}
                    Object.keys(insRef.current.loading).map((xitem) => {
                      insRef.current.loading[xitem] = false
                      allLoading[xitem] = false
                    })
                    _setLoading(allLoading)
                    executeCatch(err, insRef.current.setError)
                  })
              })
            } catch (err) {
              const allLoading: any = {}
              Object.keys(insRef.current.loading).map((xitem) => {
                insRef.current.loading[xitem] = false
                allLoading[xitem] = false
              })
              _setLoading(allLoading)
              executeCatch(err, insRef.current.setError)
            }
          }
          insRef.current[item] = _defined.bind(insRef.current)
        } else if (item !== 'state') {
          insRef.current[item] = cfgRef.current[item]
        }
      }
      insRef.current.setHooks = function (hooks: any) {
        insRef.current.hooks = Object.assign(insRef.current.hooks, hooks)
      }
    },
  })

  // 初始化
  if (!flagRef.current.__init) {
    flagRef.current.__init = true
    flagRef.current.__refactor()
  }

  // 将loading直接赋值给实例对象，方便开发通过this.loading取值
  insRef.current.loading = loading

  // 将state直接赋值给实例对象，方便开发通过this.state取值
  insRef.current.state = state

  // 将props直接赋值给实例对象，方便开发通过this.props取值
  insRef.current.props = props

  // 将路由信息挂在到实例对象，方便开发通过this.location取值
  const routerInfo: Taro.RouterInfo = useRouter()
  if (process.env.TARO_ENV === 'h5') {
    const query = parse(location.search ? location.search.slice(1) : '')
    routerInfo.params = { ...routerInfo.params, ...query }
  }
  insRef.current.location = routerInfo

  // 将页面级错误也挂到实例对象，方便开发通过this.error取值
  // 一般不需要用到，因为页面级的错误通常是传递给render函数去渲染错误页面即可
  insRef.current.error = error

  useEffect(function () {
    flagRef.current.__mounted = true
    // if (flagRef.current.__reactRefresh) {
    //   flagRef.current.__reactRefresh = false
    //   //解决react-refresh问题
    //   insRef.current = {
    //     props: insRef.current.props,
    //   }
    //   setLoading({})
    //   insRef.current.loading = {}
    //   setState(cfgRef.current.state)
    //   insRef.current.state = cfgRef.current.state
    //   flagRef.current.__refactor()
    // }
    insRef.current?.onLoad?.()

    return function (): void {
      flagRef.current.__mounted = false
      // flagRef.current.__reactRefresh = true
      setError(undefined)
      insRef.current.error = undefined
      insRef.current?.onUnload?.()
    }
  }, [])

  useReady(function () {
    insRef.current?.onReady?.()
  })

  useDidShow(function () {
    flagRef.current.__mounted = true
    insRef.current?.onShow?.()
  })

  useDidHide(function () {
    insRef.current?.onHide?.()
  })

  usePullDownRefresh(function () {
    insRef.current?.onPullDownRefresh?.()
  })

  useReachBottom(function () {
    insRef.current?.onReachBottom?.()
  })

  usePageScroll(function (payload: Taro.PageScrollObject) {
    insRef.current?.onPageScroll?.(payload)
  })

  useResize(function () {
    insRef.current?.onResize?.()
  })

  return { state, events: insRef.current, loading, error }
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
>(
  config: TypeUnite.Option<TState, TAll, TProps>,
  renderCom: (
    data: TypeUnite.Response<TState, TAll>,
    props: TProps,
  ) => JSX.Element,
): (props: TProps) => any {
  return memo(function Index(props) {
    const data = useContainer(config, props)

    return renderCom(data, props)
  })
}

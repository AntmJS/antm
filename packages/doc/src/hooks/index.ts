import { useRef, useEffect, useCallback } from 'react'

export function useDebounce(fn, delay, dep) {
  const { current } = useRef<any>({ fn, timer: null })
  useEffect(
    function () {
      current.fn = fn
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fn, dep],
  )

  return useCallback(
    function f(...args) {
      if (current.timer) {
        clearTimeout(current.timer)
      }
      current.timer = setTimeout(() => {
        current.fn(...args)
      }, delay)
    },
    [current, delay],
  )
}

export function useThrottle(fn, delay, dep: any[]) {
  const { current } = useRef<any>({ fn, timer: null })
  useEffect(
    function () {
      current.fn = fn
    },
    [current, fn],
  )

  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer
      }, delay)
      current.fn(...args)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dep || [])
}

export * from './usePersistFn'
export * from './useTimeout'
export * from './useDepsTimeout'

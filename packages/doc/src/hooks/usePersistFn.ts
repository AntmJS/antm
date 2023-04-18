import { useMemo, useRef } from 'react'

type noop = (this: any, ...args: any[]) => any

type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>

export function usePersistFn<T extends noop>(fn: T) {
  if (typeof fn !== 'function') {
    console.error(
      `usePersistFn expected parameter is a function, got ${typeof fn}`,
    )
  }

  const fnRef = useRef<T>(fn)

  fnRef.current = useMemo(() => {
    if (typeof fn === 'function') {
      return fn
    }
    return (() => {}) as T
  }, [fn])

  const persistFn = useRef<PickFunction<T>>()
  if (!persistFn.current) {
    persistFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args)
    }
  }

  return persistFn.current as T
}

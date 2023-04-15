import { useEffectTimeout } from './useEffectTimeout'

export const useTimeout = (fn: () => void, delay?: number) => {
  const clear = useEffectTimeout(fn, [], delay)

  return clear
}

import { useRef, useEffect, useCallback } from 'react'

export function useDebounce(fn, delay, dep: any[]) {
  const { current } = useRef<any>({ fn, timer: null });
  useEffect(function () {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn( ...args);
    }, delay);
  }, dep || [])
}

export function useThrottle(fn, delay, dep: any[]) {
  const { current } = useRef<any>({ fn, timer: null });
  useEffect(function () {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn(...args);
    }
  }, dep || []);
}

export * from './usePersistFn'
export * from './useTimeout'
export * from './useDepsTimeout'

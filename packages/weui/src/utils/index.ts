import { useCallback, useRef, useState } from 'react'
import { nextTick } from '@tarojs/taro'

export function useFadeIn(ref: any) {
  return useCallback(
    function () {
      if (ref.current) {
        ref.current.style.cssText = 'display: block;opacity: 0'
      }
      nextTick(() => {
        if (ref.current) {
          ref.current.style.cssText =
            'transition: opacity .2s linear;opacity: 1;display: block;'
        }
      })
    },
    [ref],
  )
}

export function useFadeOut(ref: any) {
  return useCallback(
    function () {
      if (ref.current) {
        ref.current.style.cssText =
          'transition: opacity .2s linear;opacity: 0;display: block;'
      }
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.cssText = 'display: none;opacity: 0;'
        }
      }, 200)
    },
    [ref],
  )
}

export function useMask(ref: any) {
  const [isShowMask, setIsShowMask] = useState(false)
  const maskRef = useRef<HTMLDivElement>()
  const maskfadeOut = useFadeOut(maskRef)
  const maskfadeIn = useFadeIn(maskRef)
  const actionRef = useRef({
    show: function () {
      setIsShowMask(true)
      maskfadeIn()
    },
    hide: function () {
      setIsShowMask(false)
      maskfadeOut()
    },
  })
  ref.current = actionRef.current
  return { maskRef, isShowMask }
}

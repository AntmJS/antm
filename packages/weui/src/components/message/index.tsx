import { useRef, LegacyRef, useState } from 'react'
import { nextTick } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useFadeIn, useFadeOut } from '../../utils'
import { MessageProps } from '../../../types/message'
import Icon from '../icon'

export default function Index(props: MessageProps) {
  const { cref, className, ...others } = props
  const topTips = useRef<HTMLDivElement>()
  const [msg, setMsg] = useState('')

  const showTopTips = useFadeIn(topTips)
  const hideTopTips = useFadeOut(topTips)

  const actionRef = useRef({
    show: function (str: string) {
      setMsg(str)
      nextTick(() => {
        showTopTips()
      })
    },
    hide: function () {
      hideTopTips()
      nextTick(() => {
        setMsg('')
      })
    },
  })
  cref.current = actionRef.current

  return (
    <View
      className={`antmui-toptips antmui-toptips_warn ${className || ''}`}
      ref={topTips as LegacyRef<HTMLDivElement> | undefined}
      {...others}
    >
      {msg}
      <Icon
        name="antmui-round-close"
        onClick={() => actionRef.current.hide()}
      />
    </View>
  )
}

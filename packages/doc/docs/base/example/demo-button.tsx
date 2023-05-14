import React from 'react'
import { haha } from './haha'
import toast, { Toaster } from 'react-hot-toast'
import './demo.less'

export default function Index() {
  const L = window['$L']

  const onClick = () => {
    haha()
    toast.success(`${L['操作成功']}`)
  }

  return (
    <>
      {/** @ts-ignore */}
      <Toaster />
      <span onClick={onClick} className="antm-demo-btn">
        {L['点击Toast']}
      </span>
    </>
  )
}

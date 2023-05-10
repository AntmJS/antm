import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function Index() {
  const L = window['$L']

  const onClick = () => {
    toast.success(`${L['操作成功']}`)
  }

  return (
    <>
      {/** @ts-ignore */}
      <Toaster />
      <span
        onClick={onClick}
        style={{
          background: 'green',
          color: '#fff',
          padding: '6px 12px',
          cursor: 'pointer',
          borderRadius: 16,
        }}
      >
        {L['点击Toast']}
      </span>
    </>
  )
}

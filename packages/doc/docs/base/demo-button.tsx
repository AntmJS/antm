import React from 'react'
import { toast } from 'react-hot-toast'

export default function Index() {
  const onClick = () => {
    toast.success('操作成功！')
  }

  return (
    <>
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
        点击Toast
      </span>
    </>
  )
}

// @ts-ignore
import React, { useEffect, memo } from 'react'
// eslint-disable-next-line import/no-named-as-default
import toast, { Toaster } from 'react-hot-toast'
import { copyToClipboard, scrollToTargetParent } from '../../utils/common'
import './index.less'

type Iprops = {
  children: string
}

function MarkdownBox(props: Iprops) {
  useEffect(() => {
    if (props.children) {
      setTimeout(() => {
        scrollTargetInit()
        copyAction()
      }, 66)
    }
  }, [props.children])

  return (
    <div className="antm-docs-markdown">
      {/** @ts-ignore */}
      <Toaster />
      <div
        dangerouslySetInnerHTML={{
          __html: props.children,
        }}
      />
    </div>
  )
}

function scrollTargetInit() {
  const h3Title = document.querySelectorAll('.antm-docs-markdown .card h3')
  if (!h3Title || !h3Title.length) {
    return
  }
  for (let i = 0; i < h3Title.length; i++) {
    const item: any = h3Title[i]
    item.onclick = () => {
      scrollToTargetParent(item?.id)

      const cur = location.href.split('?')[0]

      window.location.href = `${cur}?target=${item.id}`
    }
  }
}

function copyAction() {
  const codeBoxes = document.querySelectorAll('.antm-docs-markdown pre code')
  if (!codeBoxes || !codeBoxes.length) {
    return
  }
  for (let i = 0; i < codeBoxes.length; i++) {
    const item: any = codeBoxes[i]
    const timer = null
    item.onclick = () => {
      if (timer) return
      const content = item.innerText
      copyToClipboard(content)
      toast.success('复制成功！', {
        style: { position: 'relative', top: 250 },
      })
    }
  }
}

export default memo(MarkdownBox)

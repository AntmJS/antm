import { useRef } from 'react'
import { Modal, IModalRef, Dialog, IDialogRef } from '@antmjs/weui'

export default function Index() {
  const cref1 = useRef<IModalRef>()
  const cref2 = useRef<IModalRef>()
  const cref3 = useRef<IDialogRef>()

  return (
    <body>
      <div className="page dialog js_show">
        <div className="page__hd">
          <h1 className="page__title">Dialog</h1>
          <p className="page__desc">对话框</p>
        </div>
        <div className="page__bd page__bd_spacing">
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            onClick={() => {
              cref1.current!.showModal()
            }}
          >
            iOS Modal样式一
          </a>
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            onClick={() => {
              cref2.current!.showModal()
            }}
          >
            iOS Modal样式二
          </a>
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            onClick={() => {
              cref3.current!.showDialog()
            }}
          >
            iOS Dialog样式
          </a>
        </div>

        <div id="dialogs">
          <Modal
            cref={cref1}
            title="标题"
            content="这个里面是内容"
            confirmText="确定"
            onConfirm={() => {
              console.log('确定了')
            }}
          />
          <Modal
            cref={cref2}
            title="标题"
            content="这个里面是内容"
            cancelText="取消"
            onCancel={() => {
              console.log('取消了')
            }}
            confirmText="确定"
            onConfirm={() => {
              console.log('确定了')
            }}
          />
          <Dialog
            cref={cref3}
            onClose={() => {
              console.log('取消了')
            }}
          >
            这里是内容
          </Dialog>
        </div>
      </div>
    </body>
  )
}

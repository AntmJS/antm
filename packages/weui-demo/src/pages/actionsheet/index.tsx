import { useRef } from 'react'
import { ActionSheet, IActionSheetRef } from '@antmjs/weui'

export default function Index() {
  const showRef = useRef<IActionSheetRef>()

  return (
    <body>
      <div className="page actionsheet js_show">
        <div className="page__hd">
          <h1 className="page__title">ActionSheet</h1>
          <p className="page__desc">弹出式菜单</p>
        </div>
        <div className="page__bd page__bd_spacing">
          <a
            href="javascript:"
            className="weui-btn weui-btn_default"
            onClick={() => {
              showRef.current!.showActionSheet()
            }}
          >
            iOS ActionSheet
          </a>
        </div>
        <ActionSheet
          cref={showRef}
          title="dddddj哈哈哈"
          subTitle="dddddj哈哈哈"
          list={[
            { name: '哈哈哈', value: 'ddd' },
            { name: '哈哈哈11', value: 'ddd11' },
          ]}
          onSelect={(item) => {
            console.log(item)
          }}
        />
      </div>
    </body>
  )
}

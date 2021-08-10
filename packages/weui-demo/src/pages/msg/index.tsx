export default function Index() {
  return (
    <body>
      <div className="page msg js_show">
        <div className="page__hd">
          <h1 className="page__title">Msg</h1>
          <p className="page__desc">提示页</p>
        </div>
        <div className="page__bd page__bd_spacing">
          <a
            href="/pages/msg/success/index"
            className="weui-btn weui-btn_default"
          >
            成功提示页
          </a>
          <a href="/pages/msg/warn/index" className="weui-btn weui-btn_default">
            失败提示页
          </a>
          <a href="/pages/msg/text/index" className="weui-btn weui-btn_default">
            无图标提示页
          </a>
          <a
            href="/pages/msg/text-primary/index"
            className="weui-btn weui-btn_default"
          >
            无图标提示页
          </a>
          <a
            href="/pages/msg/area-preview/index"
            className="weui-btn weui-btn_default"
          >
            key-value场景
          </a>
          <a
            href="/pages/msg/area-tips/index"
            className="weui-btn weui-btn_default"
          >
            描述列表场景
          </a>
          <a
            href="/pages/msg/area-cell/index"
            className="weui-btn weui-btn_default"
          >
            跳转列表场景
          </a>
        </div>
      </div>
    </body>
  )
}

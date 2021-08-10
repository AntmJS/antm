export default function Index() {
  return (
    <body>
      <div className="page loading js_show">
        <div className="page__hd">
          <h1 className="page__title">Loading</h1>
          <p className="page__desc">加载中</p>
        </div>
        <div className="page__bd">
          <div className="loading_demo">
            <i className="weui-loading"></i>
            <span className="weui-primary-loading">
              <span className="weui-primary-loading__dot"></span>
            </span>
            <span className="weui-primary-loading weui-primary-loading_brand">
              <span className="weui-primary-loading__dot"></span>
            </span>
            <span className="weui-primary-loading weui-primary-loading_transparent">
              <span className="weui-primary-loading__dot"></span>
            </span>
          </div>
        </div>
      </div>
    </body>
  )
}

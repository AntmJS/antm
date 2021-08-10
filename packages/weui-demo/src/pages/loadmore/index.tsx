export default function Index() {
  return (
    <body>
      <div className="page loadmore js_show">
        <div className="page__hd">
          <h1 className="page__title">Loadmore</h1>
          <p className="page__desc">加载更多</p>
        </div>
        <div className="page__bd">
          <div className="weui-loadmore">
            <span className="weui-primary-loading">
              <i className="weui-primary-loading__dot"></i>
            </span>
            <span className="weui-loadmore__tips">正在加载</span>
          </div>
          <div className="weui-loadmore weui-loadmore_line">
            <span className="weui-loadmore__tips">暂无数据</span>
          </div>
          <div className="weui-loadmore weui-loadmore_line weui-loadmore_dot">
            <span className="weui-loadmore__tips"></span>
          </div>
        </div>
      </div>
    </body>
  )
}

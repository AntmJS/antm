export default function Index() {
  return (
    <body>
      <div className="page badge js_show">
        <div className="page__hd">
          <h1 className="page__title">Badge</h1>
          <p className="page__desc">徽章</p>
        </div>
        <div className="page__bd">
          <div className="weui-cells__title">
            新消息提示跟摘要信息后，统一在列表右侧
          </div>
          <div className="weui-cells">
            <div className="weui-cell weui-cell_active weui-cell_access">
              <div className="weui-cell__bd">单行列表</div>
              <div
                className="weui-cell__ft"
                style={{
                  fontSize: 0,
                }}
              >
                <span className="demo_badge_tips">详细信息</span>
                <span className="weui-badge weui-badge_dot"></span>
              </div>
            </div>
          </div>

          <div className="weui-cells__title">
            未读数红点跟在主题信息后，统一在列表左侧
          </div>
          <div className="weui-cells demo_badge_cells">
            <div className="weui-cell weui-cell_active">
              <div className="weui-cell__hd">
                <img
                  src={require('../../images/pic_160.png')}
                  width="50px"
                  height="50px"
                />
                <span className="weui-badge">8</span>
              </div>
              <div className="weui-cell__bd">
                <p>联系人名称</p>
                <p className="demo_badge_desc">摘要信息</p>
              </div>
            </div>
            <div className="weui-cell weui-cell_active weui-cell_access">
              <div className="weui-cell__bd">
                <span className="demo_badge_title">单行列表</span>
                <span className="weui-badge">8</span>
              </div>
              <div className="weui-cell__ft"></div>
            </div>
            <div className="weui-cell weui-cell_active weui-cell_access">
              <div className="weui-cell__bd">
                <span className="demo_badge_title">单行列表</span>
                <span className="weui-badge">8</span>
              </div>
              <div className="weui-cell__ft">详细信息</div>
            </div>
            <div className="weui-cell weui-cell_active weui-cell_access">
              <div className="weui-cell__bd">
                <span className="demo_badge_title">单行列表</span>
                <span className="weui-badge">New</span>
              </div>
              <div className="weui-cell__ft"></div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

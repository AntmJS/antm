export default function Index() {
  return (
    <body>
      <div className="page icons js_show">
        <div className="page__hd">
          <h1 className="page__title">Icons</h1>
          <p className="page__desc">图标</p>
        </div>
        <div className="page__bd page__bd_spacing">
          <div className="icon-box">
            <i className="weui-icon-success weui-icon_msg"></i>
            <div className="icon-box__ctn">
              <h3 className="icon-box__title">成功</h3>
              <p className="icon-box__desc">用于表示操作顺利达成</p>
            </div>
          </div>
          <div className="icon-box">
            <i className="weui-icon-info weui-icon_msg"></i>
            <div className="icon-box__ctn">
              <h3 className="icon-box__title">提示</h3>
              <p className="icon-box__desc">
                用于表示信息提示；也常用于缺乏条件的操作拦截，提示用户所需信息
              </p>
            </div>
          </div>
          <div className="icon-box">
            <i className="weui-icon-warn weui-icon_msg-primary"></i>
            <div className="icon-box__ctn">
              <h3 className="icon-box__title">普通警告</h3>
              <p className="icon-box__desc">
                用于表示操作后将引起一定后果的情况
              </p>
            </div>
          </div>
          <div className="icon-box">
            <i className="weui-icon-warn weui-icon_msg"></i>
            <div className="icon-box__ctn">
              <h3 className="icon-box__title">强烈警告</h3>
              <p className="icon-box__desc">
                用于表示操作后将引起严重的不可挽回的后果的情况
              </p>
            </div>
          </div>
          <div className="icon-box">
            <i className="weui-icon-waiting weui-icon_msg"></i>
            <div className="icon-box__ctn">
              <h3 className="icon-box__title">等待</h3>
              <p className="icon-box__desc">用于表示等待</p>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

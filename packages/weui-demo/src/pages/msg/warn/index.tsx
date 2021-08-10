export default function Index() {
  return (
    <body>
      <div className="page warn js_show">
        <div className="weui-msg">
          <div className="weui-msg__icon-area">
            <i className="weui-icon-warn weui-icon_msg"></i>
          </div>
          <div className="weui-msg__text-area">
            <h2 className="weui-msg__title">操作失败</h2>
            <p className="weui-msg__desc">
              内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现
              <a href="javascript:">文字链接</a>
            </p>
          </div>
          <div className="weui-msg__tips-area">
            <p className="weui-msg__tips">
              提示详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现
              <a href="javascript:">文字链接</a>
            </p>
          </div>
          <div className="weui-msg__opr-area">
            <p className="weui-btn-area">
              <a
                href="javascript:history.back();"
                className="weui-btn weui-btn_default"
              >
                辅助操作
              </a>
            </p>
          </div>
          <div className="weui-msg__extra-area">
            <div className="weui-footer">
              <p className="weui-footer__links">
                <a href="javascript:" className="weui-footer__link">
                  底部链接文本
                </a>
              </p>
              <p className="weui-footer__text">
                Copyright &copy; 2008-2016 weui.io
              </p>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

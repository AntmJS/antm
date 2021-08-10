export default function Index() {
  return (
    <body>
      <div className="page msg_custom_area_cell js_show">
        <div className="weui-msg">
          <div className="weui-msg__icon-area">
            <i className="weui-icon-success weui-icon_msg"></i>
          </div>
          <div className="weui-msg__text-area">
            <h2 className="weui-msg__title">操作成功</h2>
            <p className="weui-msg__desc">
              内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现
              <a href="javascript:">文字链接</a>
            </p>
            <div className="weui-msg__custom-area">
              <div className="weui-cells__group weui-cells__group_form">
                <div className="weui-cells">
                  <a className="weui-cell weui-cell_access" href="javascript:">
                    <div className="weui-cell__bd">
                      <p>cell standard</p>
                    </div>
                    <div className="weui-cell__ft"></div>
                  </a>
                  <a className="weui-cell weui-cell_access" href="javascript:">
                    <div className="weui-cell__bd">
                      <p>cell standard</p>
                    </div>
                    <div className="weui-cell__ft"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="weui-msg__opr-area">
            <p className="weui-btn-area">
              <a
                href="javascript:history.back();"
                className="weui-btn weui-btn_primary"
              >
                推荐操作
              </a>
            </p>
          </div>
        </div>
      </div>
    </body>
  )
}

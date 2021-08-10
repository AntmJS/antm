export default function Index() {
  return (
    <body>
      <div className="page js_show">
        <div className="weui-form">
          <div className="weui-form__text-area">
            <h2 className="weui-form__title">跳转列表项</h2>
          </div>
          <div className="weui-form__control-area">
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
      </div>
    </body>
  )
}

export default function Index() {
  return (
    <body>
      <div className="page js_show">
        <div className="weui-form">
          <div className="weui-form__text-area">
            <h2 className="weui-form__title">文本域</h2>
            <div className="weui-form__desc">
              输入更多内容的输入区域样式展示
            </div>
          </div>
          <div className="weui-form__control-area">
            <div className="weui-cells__group weui-cells__group_form">
              <div className="weui-cells__title">问题描述</div>
              <div className="weui-cells weui-cells_form">
                <div className="weui-cell ">
                  <div className="weui-cell__bd">
                    <textarea
                      className="weui-textarea"
                      placeholder="请描述你所发生的问题"
                      rows={3}
                    ></textarea>
                    <div className="weui-textarea-counter">
                      <span>0</span>/200
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="weui-form__opr-area">
            <a
              className="weui-btn weui-btn_primary"
              href="javascript:"
              id="showTooltips"
            >
              确定
            </a>
          </div>
        </div>
      </div>
    </body>
  )
}

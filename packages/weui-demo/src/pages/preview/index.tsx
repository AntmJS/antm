export default function Index() {
  return (
    <body>
      <div className="page preview js_show">
        <div className="page__hd">
          <h1 className="page__title">Preview</h1>
          <p className="page__desc">表单预览</p>
        </div>
        <div className="page__bd">
          <div className="weui-form-preview">
            <div className="weui-form-preview__hd">
              <div className="weui-form-preview__item">
                <label className="weui-form-preview__label">付款金额</label>
                <em className="weui-form-preview__value">¥2400.00</em>
              </div>
            </div>
            <div className="weui-form-preview__bd">
              <div className="weui-form-preview__item">
                <label className="weui-form-preview__label">商品</label>
                <span className="weui-form-preview__value">电动打蛋机</span>
              </div>
              <div className="weui-form-preview__item">
                <label className="weui-form-preview__label">标题标题</label>
                <span className="weui-form-preview__value">名字名字名字</span>
              </div>
              <div className="weui-form-preview__item">
                <label className="weui-form-preview__label">标题标题</label>
                <span className="weui-form-preview__value">
                  很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字
                </span>
              </div>
            </div>
            <div className="weui-form-preview__ft">
              <a
                className="weui-form-preview__btn weui-form-preview__btn_primary"
                href="javascript:"
              >
                操作
              </a>
            </div>
          </div>
          <br />
          <div className="weui-form-preview">
            <div className="weui-form-preview__hd">
              <label className="weui-form-preview__label">付款金额</label>
              <em className="weui-form-preview__value">¥2400.00</em>
            </div>
            <div className="weui-form-preview__bd">
              <div className="weui-form-preview__item">
                <label className="weui-form-preview__label">商品</label>
                <span className="weui-form-preview__value">电动打蛋机</span>
              </div>
              <div className="weui-form-preview__item">
                <label className="weui-form-preview__label">标题标题</label>
                <span className="weui-form-preview__value">名字名字名字</span>
              </div>
              <div className="weui-form-preview__item">
                <label className="weui-form-preview__label">标题标题</label>
                <span className="weui-form-preview__value">
                  很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字
                </span>
              </div>
            </div>
            <div className="weui-form-preview__ft">
              <a
                className="weui-form-preview__btn weui-form-preview__btn_default"
                href="javascript:"
              >
                辅助操作
              </a>
              <a
                className="weui-form-preview__btn weui-form-preview__btn_primary"
                href="javascript:"
              >
                操作
              </a>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default function Index() {
  return (
    <body>
      <div className="page form js_show">
        <div className="page__hd">
          <h1 className="page__title">Form</h1>
          <p className="page__desc">表单页</p>
        </div>
        <div className="page__bd page__bd_spacing">
          <a
            href="/pages/form/form-page/index"
            className="weui-btn weui-btn_default"
          >
            表单结构
          </a>
          <a
            href="/pages/form/form-input-status/index"
            className="weui-btn weui-btn_default"
          >
            输入框状态
          </a>
          <a
            href="/pages/form/form-vcode/index"
            className="weui-btn weui-btn_default"
          >
            验证码
          </a>
          <a
            href="/pages/form/form-checkbox/index"
            className="weui-btn weui-btn_default"
          >
            复选框
          </a>
          <a
            href="/pages/form/form-access/index"
            className="weui-btn weui-btn_default"
          >
            跳转列表项
          </a>
          <a
            href="/pages/form/form-radio/index"
            className="weui-btn weui-btn_default"
          >
            单选框
          </a>
          <a
            href="/pages/form/form-switch/index"
            className="weui-btn weui-btn_default"
          >
            开关
          </a>
          <a
            href="/pages/form/form-select/index"
            className="weui-btn weui-btn_default"
          >
            原生选择框
          </a>
          <a
            href="/pages/form/form-select-primary/index"
            className="weui-btn weui-btn_default"
          >
            模拟选择框
          </a>
          <a
            href="/pages/form/form-textarea/index"
            className="weui-btn weui-btn_default"
          >
            文本域
          </a>
        </div>
      </div>
    </body>
  )
}

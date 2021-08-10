export default function Index() {
  return (
    <body>
      <div className="page footer js_show">
        <div className="page__hd">
          <h1 className="page__title">Footer</h1>
          <p className="page__desc">页脚</p>
        </div>
        <div className="page__bd page__bd_spacing">
          <div className="weui-footer">
            <p className="weui-footer__text">
              Copyright &copy; 2008-2016 weui.io
            </p>
          </div>
          <br />
          <br />
          <div className="weui-footer">
            <p className="weui-footer__links">
              <a href="javascript:" className="weui-footer__link">
                底部链接
              </a>
            </p>
            <p className="weui-footer__text">
              Copyright &copy; 2008-2016 weui.io
            </p>
          </div>
          <br />
          <br />
          <div className="weui-footer">
            <p className="weui-footer__links">
              <a href="javascript:" className="weui-footer__link">
                底部链接
              </a>
              <a href="javascript:" className="weui-footer__link">
                底部链接
              </a>
            </p>
            <p className="weui-footer__text">
              Copyright &copy; 2008-2016 weui.io
            </p>
          </div>
          <div className="weui-footer weui-footer_fixed-bottom">
            <p className="weui-footer__links">
              <a href="javascript:home();" className="weui-footer__link">
                WeUI首页
              </a>
            </p>
            <p className="weui-footer__text">
              Copyright &copy; 2008-2016 weui.io
            </p>
          </div>
        </div>
      </div>
    </body>
  )
}

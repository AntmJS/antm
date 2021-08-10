export default function Index() {
  return (
    <body>
      <div className="page gallery js_show">
        <div className="page__hd">
          <h1 className="page__title">Gallery</h1>
          <p className="page__desc">画廊，可实现上传图片的展示或幻灯片播放</p>
        </div>
        <div
          className="weui-gallery"
          style={{
            display: 'block',
          }}
        >
          <span
            className="weui-gallery__img"
            style={{
              backgroundImage: `url(${require('../../images/pic_article.png')})`,
            }}
          ></span>
          <div className="weui-gallery__opr">
            <a href="javascript:" className="weui-gallery__del">
              <i className="weui-icon-delete weui-icon_gallery-delete"></i>
            </a>
          </div>
        </div>
      </div>
    </body>
  )
}

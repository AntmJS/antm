import { useCallback, useRef } from 'react'
import Taro from '@tarojs/taro'
import Pic from '../../images/pic_160.png'
import { useFadeIn, useFadeOut } from '../../utils'

function useGallery(): [
  React.RefObject<HTMLSpanElement>,
  React.RefObject<HTMLDivElement>,
  () => void,
  () => void,
] {
  const galleryImg = useRef<HTMLSpanElement>(null)
  const gallery = useRef<HTMLDivElement>(null)

  const galleryFadeIn = useFadeIn(gallery)
  const galleryFadeOut = useFadeOut(gallery)

  return [galleryImg, gallery, galleryFadeIn, galleryFadeOut]
}

function usePreview(
  galleryImg: React.RefObject<HTMLSpanElement>,
  fadeIn: () => void,
): [React.RefObject<HTMLLIElement>, () => void] {
  const item = useRef<HTMLLIElement>(null)

  const handlePreview = useCallback(() => {
    if (galleryImg.current && item.current) {
      galleryImg.current.style.cssText = item.current.style.cssText
      fadeIn()
    }
  }, [galleryImg, fadeIn])

  return [item, handlePreview]
}

export default function Index() {
  const [galleryImg, gallery, galleryFadeIn, galleryFadeOut] = useGallery()

  const [item1, onItem1Click] = usePreview(galleryImg, galleryFadeIn)
  const [item2, onItem2Click] = usePreview(galleryImg, galleryFadeIn)
  const [item3, onItem3Click] = usePreview(galleryImg, galleryFadeIn)
  const [item4, onItem4Click] = usePreview(galleryImg, galleryFadeIn)
  const [item5, onItem5Click] = usePreview(galleryImg, galleryFadeIn)

  const hanldeUpload = function () {
    Taro.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        Taro.uploadFile({
          url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0] || '',
          name: 'file',
          formData: {
            user: 'test',
          },
          success(res) {
            const data = res.data
            console.log(data)
            //do something
          },
        })
      },
    })
  }

  return (
    <body>
      <div className="page uploader js_show">
        <div className="page__hd">
          <h1 className="page__title">Uploader</h1>
          <p className="page__desc">
            上传组件，一般配合
            <a className="link" href="/pages/gallery/index">
              组件Gallery
            </a>
            来使用。
          </p>
        </div>
        <div className="page__bd">
          <div
            className="weui-gallery"
            id="gallery"
            ref={gallery}
            onClick={galleryFadeOut}
          >
            <span
              className="weui-gallery__img"
              id="galleryImg"
              ref={galleryImg}
            ></span>
            <div className="weui-gallery__opr">
              <a href="javascript:" className="weui-gallery__del">
                <i className="weui-icon-delete weui-icon_gallery-delete"></i>
              </a>
            </div>
          </div>

          <div className="weui-cells weui-cells_form">
            <div className="weui-cell  weui-cell_uploader">
              <div className="weui-cell__bd">
                <div className="weui-uploader">
                  <div className="weui-uploader__hd">
                    <p className="weui-uploader__title">图片上传</p>
                    <div className="weui-uploader__info">0/2</div>
                  </div>
                  <div className="weui-uploader__bd">
                    <ul className="weui-uploader__files" id="uploaderFiles">
                      <li
                        className="weui-uploader__file"
                        style={{ backgroundImage: `url(${Pic})` }}
                        ref={item1}
                        onClick={onItem1Click}
                      ></li>
                      <li
                        className="weui-uploader__file"
                        style={{ backgroundImage: `url(${Pic})` }}
                        ref={item2}
                        onClick={onItem2Click}
                      ></li>
                      <li
                        className="weui-uploader__file"
                        style={{ backgroundImage: `url(${Pic})` }}
                        ref={item3}
                        onClick={onItem3Click}
                      ></li>
                      <li
                        className="weui-uploader__file weui-uploader__file_status"
                        style={{ backgroundImage: `url(${Pic})` }}
                        ref={item4}
                        onClick={onItem4Click}
                      >
                        <div className="weui-uploader__file-content">
                          <i className="weui-icon-warn"></i>
                        </div>
                      </li>
                      <li
                        className="weui-uploader__file weui-uploader__file_status"
                        style={{ backgroundImage: `url(${Pic})` }}
                        ref={item5}
                        onClick={onItem5Click}
                      >
                        <div className="weui-uploader__file-content">50%</div>
                      </li>
                    </ul>
                    <div className="weui-uploader__input-box">
                      <div
                        id="uploaderInput"
                        className="weui-uploader__input"
                        onClick={hanldeUpload}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

import { Component } from 'react'
import { MiniBar } from '@antmjs/weui'

export default class Index extends Component {
  state = {
    isFold: [true, true, true, true, true, true],
  }

  setIsFold(index: any) {
    const list = [...this.state.isFold]
    list[index] = !list[index]
    this.setState({
      isFold: list,
    })
  }

  render() {
    const isFold = this.state.isFold
    return (
      <body>
        <MiniBar homeUrl="pages/index/index" />
        <div className="page home js_show">
          <div className="page__hd">
            <h1 className="page__title">
              <img
                src={require('../../images/logo.png')}
                alt="WeUI"
                height="21px"
                width="62px"
              />
            </h1>
            <p className="page__desc">
              WeUI
              是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信内网页和微信小程序量身设计，令用户的使用感知更加统一。
            </p>
          </div>
          <div className="page__bd page__bd_spacing">
            <ul>
              <li
                onClick={() => this.setIsFold(0)}
                className={isFold[0] ? '' : 'js_show'}
              >
                <div className="weui-flex js_category">
                  <p className="weui-flex__item">表单</p>
                  <img src={require('../../images/icon_nav_form.png')} alt="" />
                </div>
                <div className="page__category js_categoryInner">
                  <div className="weui-cells page__category-content">
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/button/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Button</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/form/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Form</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/list/index"
                    >
                      <div className="weui-cell__bd">
                        <p>List</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/slider/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Slider</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/uploader/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Uploader</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                  </div>
                </div>
              </li>
              <li
                onClick={() => this.setIsFold(1)}
                className={isFold[1] ? '' : 'js_show'}
              >
                <div className="weui-flex js_category">
                  <p className="weui-flex__item">基础组件</p>
                  <img
                    src={require('../../images/icon_nav_layout.png')}
                    alt=""
                  />
                </div>
                <div className="page__category js_categoryInner">
                  <div className="weui-cells page__category-content">
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/article/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Article</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/badge/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Badge</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/flex/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Flex</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/footer/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Footer</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/gallery/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Gallery</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/grid/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Grid</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/icons/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Icons</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/loading/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Loading</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/loadmore/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Loadmore</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/panel/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Panel</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/preview/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Preview</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/progress/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Progress</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                  </div>
                </div>
              </li>
              <li
                onClick={() => this.setIsFold(2)}
                className={isFold[2] ? '' : 'js_show'}
              >
                <div className="weui-flex js_category">
                  <p className="weui-flex__item">操作反馈</p>
                  <img
                    src={require('../../images/icon_nav_feedback.png')}
                    alt=""
                  />
                </div>
                <div className="page__category js_categoryInner">
                  <div className="weui-cells page__category-content">
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/actionsheet/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Actionsheet</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/dialog/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Dialog</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/half-screen-dialog/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Half-screen Dialog</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/msg/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Msg</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/picker/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Picker</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/toast/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Toast</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/top-tips/index"
                    >
                      <div className="weui-cell__bd">
                        <p>TopTips</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                  </div>
                </div>
              </li>
              <li
                onClick={() => this.setIsFold(3)}
                className={isFold[3] ? '' : 'js_show'}
              >
                <div className="weui-flex js_category">
                  <p className="weui-flex__item">导航相关</p>
                  <img src={require('../../images/icon_nav_nav.png')} alt="" />
                </div>
                <div className="page__category js_categoryInner">
                  <div className="weui-cells page__category-content">
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/navbar/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Navbar</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/tabbar/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Tabbar</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                  </div>
                </div>
              </li>
              <li
                onClick={() => this.setIsFold(4)}
                className={isFold[4] ? '' : 'js_show'}
              >
                <div className="weui-flex js_category">
                  <p className="weui-flex__item">搜索相关</p>
                  <img
                    src={require('../../images/icon_nav_search.png')}
                    alt=""
                  />
                </div>
                <div className="page__category js_categoryInner">
                  <div className="weui-cells page__category-content">
                    <a
                      className="weui-cell weui-cell_active weui-cell_access js_item"
                      href="/pages/search/index"
                    >
                      <div className="weui-cell__bd">
                        <p>Search Bar</p>
                      </div>
                      <div className="weui-cell__ft"></div>
                    </a>
                  </div>
                </div>
              </li>
              <li
                onClick={() => this.setIsFold(5)}
                className={isFold[5] ? '' : 'js_show'}
              >
                <div className="weui-flex js_item" data-id="layers">
                  <p className="weui-flex__item">层级规范</p>
                  <img
                    src={require('../../images/icon_nav_z-index.png')}
                    alt=""
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </body>
    )
  }
}

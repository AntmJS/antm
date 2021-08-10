export default function Index() {
  return (
    <body>
      <div className="page list js_show">
        <div className="page__hd">
          <h1 className="page__title">List</h1>
          <p className="page__desc">列表</p>
        </div>
        <div className="page__bd">
          <div className="weui-cells__title">带说明的列表项</div>
          <div className="weui-cells">
            <div className="weui-cell ">
              <div className="weui-cell__bd">
                <p>标题文字</p>
              </div>
              <div className="weui-cell__ft">说明文字</div>
            </div>
            <div className="weui-cell  weui-cell_swiped">
              <div
                className="weui-cell__bd"
                style={{ transform: 'translateX(-68px)' }}
              >
                <div className="weui-cell ">
                  <div className="weui-cell__bd">
                    <p>标题文字</p>
                  </div>
                  <div className="weui-cell__ft">说明文字</div>
                </div>
              </div>
              <div className="weui-cell__ft">
                <a
                  className="weui-swiped-btn weui-swiped-btn_warn"
                  href="javascript:"
                >
                  删除
                </a>
              </div>
            </div>
          </div>

          <div className="weui-cells__title">带图标、说明的列表项</div>
          <div className="weui-cells">
            <div className="weui-cell  weui-cell_example">
              <div className="weui-cell__hd">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
                  alt=""
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '16px',
                    display: 'block',
                  }}
                />
              </div>
              <div className="weui-cell__bd">
                <p>标题文字</p>
              </div>
              <div className="weui-cell__ft">说明文字</div>
            </div>
            <div className="weui-cell  weui-cell_example">
              <div className="weui-cell__hd">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
                  alt=""
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '16px',
                    display: 'block',
                  }}
                />
              </div>
              <div className="weui-cell__bd">
                <p>标题文字</p>
              </div>
              <div className="weui-cell__ft">说明文字</div>
            </div>
          </div>

          <div className="weui-cells__title">带跳转的列表项</div>
          <div className="weui-cells">
            <a className="weui-cell  weui-cell_access" href="javascript:">
              <div className="weui-cell__bd">
                <p>cell standard</p>
              </div>
              <div className="weui-cell__ft"></div>
            </a>
            <a className="weui-cell  weui-cell_access" href="javascript:">
              <div className="weui-cell__bd">
                <p>cell standard</p>
              </div>
              <div className="weui-cell__ft"></div>
            </a>
          </div>

          <div className="weui-cells__title">带说明、跳转的列表项</div>
          <div className="weui-cells">
            <a className="weui-cell  weui-cell_access" href="javascript:">
              <div className="weui-cell__bd">
                <p>cell standard</p>
              </div>
              <div className="weui-cell__ft">说明文字</div>
            </a>
            <a className="weui-cell  weui-cell_access" href="javascript:">
              <div className="weui-cell__bd">
                <p>cell standard</p>
              </div>
              <div className="weui-cell__ft">说明文字</div>
            </a>
          </div>

          <div className="weui-cells__title">带图标、说明、跳转的列表项</div>
          <div className="weui-cells">
            <a
              className="weui-cell  weui-cell_access weui-cell_example"
              href="javascript:"
            >
              <div className="weui-cell__hd">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
                  alt=""
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '16px',
                    display: 'block',
                  }}
                />
              </div>
              <div className="weui-cell__bd">
                <p>cell standard</p>
              </div>
              <div className="weui-cell__ft">说明文字</div>
            </a>
            <a
              className="weui-cell  weui-cell_access weui-cell_example"
              href="javascript:"
            >
              <div className="weui-cell__hd">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
                  alt=""
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '16px',
                    display: 'block',
                  }}
                />
              </div>
              <div className="weui-cell__bd">
                <p>cell standard</p>
              </div>
              <div className="weui-cell__ft">说明文字</div>
            </a>
          </div>
        </div>
      </div>
    </body>
  )
}

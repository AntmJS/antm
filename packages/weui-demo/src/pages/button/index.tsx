import { MiniBar, Button, MiniUserButton, MiniPhoneButton } from '@antmjs/weui'
export default function Index() {
  return (
    <body>
      <MiniBar homeUrl="pages/index/index" />
      <div className="page button js_show">
        <div className="page__hd">
          <h1 className="page__title">Button</h1>
          <p className="page__desc">按钮</p>
        </div>
        <div className="page__bd">
          <MiniUserButton
            size="around"
            type="primary"
            onGetUserInfo={(res) => {
              console.log(res)
            }}
          >
            授权用户信息
          </MiniUserButton>
          <MiniPhoneButton
            size="around"
            type="primary"
            onGetPhone={(res) => {
              console.log(res)
            }}
          >
            授权用户手机号
          </MiniPhoneButton>
          <Button size="around" type="primary">
            页面主操作
          </Button>
          <Button size="around" type="primary" loading>
            页面主操作
          </Button>
          <Button size="around" type="primary" disabled>
            页面主操作
          </Button>
          <div className="button-sp-area">
            <Button size="normal" type="primary">
              页面主操作
            </Button>
            <Button size="normal" type="primary" loading>
              页面主操作
            </Button>
            <Button size="normal" type="primary" disabled>
              页面主操作
            </Button>
            <Button size="normal" type="default">
              页面次要操作
            </Button>
            <Button size="normal" type="default" loading>
              页面次要操作
            </Button>
            <Button size="normal" type="default" disabled>
              页面次要操作
            </Button>
            <Button size="normal" type="warn">
              警告类操作
            </Button>
            <Button size="normal" type="warn" loading>
              警告类操作
            </Button>
            <Button size="normal" type="warn" disabled>
              警告类操作
            </Button>
          </div>

          <div className="button-sp-area cell">
            <Button size="full" type="default">
              普通行按钮
            </Button>

            <Button size="full" type="primary">
              强调行按钮
            </Button>
            <Button size="full" type="primary">
              <>
                <img
                  className="weui-btn_cell__icon"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
                />
                强调行按钮
              </>
            </Button>
            <Button size="full" type="warn">
              警告行按钮
            </Button>
          </div>

          <div className="button-sp-area">
            <Button type="primary" size="small">
              按钮
            </Button>
            <Button type="default" size="small">
              按钮
            </Button>
            <Button type="warn" size="small">
              按钮
            </Button>
          </div>
        </div>
      </div>
    </body>
  )
}

# @antmjs/unite

> 统一的开发模式

### 为什么需要

团队人数比较多但又没有足够的精力走 CR 的情况下，如何让大家开发的模式尽量保持一致是这个库的价值

### 安装

```bash
yarn add @antmjs/unite
```

### 注意

2.2.0 版本开始 Unite 里面默认移除了 H5 路由参数的 decode 处理，也就是 this.location 取到的是未 decode 过的参数，如需自动处理请添加
@antmjs/plugin-h5-fix 插件

### 使用

> 非 Taro 的 H5 环境使用可添加 resolve.mainFields: ["unite:h5"]

```jsx
// 代码不多，可以自己看源码
import { Unite } from '@antmjs/unite'
// 和UI无关的全局数据定义在这里面，具体可以看项目模版
import {} from '@/cache'
// 和UI相关的全局数据定义在这里面，具体可以看项目模版
import {} from '@/store'

// 一切都是类型安全，一切都是自动提示 ！哈哈哈哈
// Unite外的错误逻辑Unite无法捕获，Unite回调函数内的方法的异常Unite无法捕获
export default Unite(
  {
    // 和UI相关的当前页面变量定义在state里，和UI无关的当前页面变量定义在和state同层，比如tempData1,tempData2
    state: {},
    tempData1: 'xxx',
    tempData2: 'xxx',
    // onLoad onReady onShow 如果有发起异步请求的，记得加上async await 否则下拉刷新会打开后立即关闭
    async onLoad() {
      // 通过this.state可以取到state的结果
      // 通过this.props可以取到props的结果
      // 通过this.location可以取到路由的结果
      // 通过this.loading可以取到当前正在异步加载中的方法
      // 通过this.hooks可以取到下面传递过来的hooks数据
      // 通过this.error可以取到错误数据，一般不需要用到，Container会通过全局Context去获取及处理
    },
    async onReady() {},
    async onShow() {},
    async onHide() {},
  },
  // 这里返回的state loading error 和上方this一致，events除了上方定义的方法外，还有部分内置的方法比如；setHooks setError
  function ({ state, events, loading, error }, props) {
    // 伪代码
    const [menuButton, setMenuButton]: any = useRecoilState(menuButtonStore)
    // 这里通过setHooks方法可以将全局数据及全局数据的设置方法传递过去，方法里面可以通过this.hooks['xxx']获取到
    events.setHooks({
      xxx: menuButton,
      yyy: setMenuButton,
    })
    // 这里可以写hooks
    useEffect(() => {}, [])
    return (
      // 这里可以引入Container组件包裹起来，内置导航栏、下拉刷新逻辑、自动处理异常、登录等，具体可以看Container组件
      <View>Unite</View>
    )
  },
  // cancelInterception 默认对事件都添加了“防抖”策略，即触发async方法只有等结束之后再点才有效
  { page: true, cancelInterception: [] },
)
```

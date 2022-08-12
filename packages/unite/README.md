# @antmjs/unite

> 统一的开发模式

## 为什么需要

团队人数比较多但又没有足够的精力走 CR 的情况下，如何让大家开发的模式尽量保持一致是这个库的价值

## 安装

```bash
yarn add @antmjs/unite
```

## 使用

app.tsx

```js
import { registerCatch } from '@antmjs/unite'

registerCatch(function (err, setError) {
  // 在Unite方法的第一个参数对象内发起的请求或者js异常都会在这里被捕获到，你可以在这里处理好异常根据实际情况toast或者setError
})
```

```js
import Unite from '@antmjs/unite'

Unite(
  {
    state: {},
    onLoad() {
      cosnole.log(this.error)
      this.setError({})
    },
  },
  function ({ state, events, loading, error }, props) {
    return <View>Hello World</View>
  },
)
```

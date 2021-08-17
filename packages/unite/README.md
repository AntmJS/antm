# @antmjs/unite

> 统一的开发模式

## 为什么需要

团队人数比较多但又没有足够的精力走CV的情况下，如何让大家开发的模式尽量保持一致是这个库的价值

## 安装

```bash
yarn add @antmjs/unite
```

## 使用


```js
import Unite from '@antmjs/unite'

const { exposure, log, monitor } =  Unite(
  { state: {}, onLoad() {} }, function ({state, events, loading}) {
    return <View>Hello World</View>
  }
)
```
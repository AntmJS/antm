# @antmjs/global-state

> 全局 UI 数据缓存解决方案

## 为什么需要

我所理解的缓存分 4 类，1: 和 UI 无关的临时缓存；2: 和 UI 无关的本地缓存； 3: 和 UI 相关的全局缓存； 4: 和 UI 相关的局部缓存。本仓库解决的就是 3 的问题。
众所周知，这一类的解决方案其实有很多，比如 redux、mobx，重点其实在于我们的项目适不适合这些比较重的解决方案。结合面试者的回答，有都走 redux 的，有请求走 redux 的，有自己约定的。其实都是在找一个临界点，而这个临界点结合业务以及一线小伙伴的理解都会产生不一样的结果，最终 redux 就成了一个黑洞。
我现在更倾向于少用，当然不是不用，而是可枚举的用（你很清楚里面存储了什么东西，和你使用@antmjs/cache 这个库一样，你很清楚你定义了哪些 key），而且由负责人维护，结合 hooks，业务开发者只管取值。可以看看[模版](https://github.com/AntmJS/temptaro)

## 安装

```bash
yarn add @antmjs/global-state
```

## 使用

```js
import GlobalState from '@antmjs/global-state'

const {
  Provider,
  useGlobalState,
  useGlobalLoading,
  useGlobalError,
  useUpdate,
  useFetchAndUpdate,
} = GlobalState(
  { user: {} },
  {
    user: async function () {
      /** await getUser */
    },
  },
)
```

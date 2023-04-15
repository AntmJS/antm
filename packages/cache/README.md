# @antmjs/cache

> 全局缓存解决方案，支持本地存储和内存存储

### 为什么需要

我所理解的缓存分 4 类，1: 和 UI 无关的临时缓存；2: 和 UI 无关的本地缓存； 3: 和 UI 相关的全局缓存； 4: 和 UI 相关的局部缓存。本仓库解决的就是 1 和 2 的问题，临时缓存很好理解，就是直接存储在全局变量里面，
而本地缓存则通过 localStorage 进行储存，本仓库对 localStorage 的优化在于会增量进行临时缓存，下次重新读取的时候会优先进行缓存取值，如果没有再进行本地读取，提高性能。

顺便说下第三点，redux、mobx 都用过，结合面试者的回答，有都走 redux 的，有请求走 redux 的，有自己约定的。其实都是在找一个临界点，而这个临界点结合业务以及一线小伙伴的理解都会产生不一样的结果，最终 redux 就成了一个黑洞。
我现在更倾向于少用，当然不是不用，而是可枚举的用（你很清楚里面存储了什么东西，和你使用这个库一样，你很清楚你定义了哪些 key），而且由负责人维护，结合 hooks，业务开发者只管取值，请求什么的都不用业务来处理，和 localStorage 有点类似。可以看看[模版](https://github.com/AntmJS/temptaro)

### 安装

```bash
yarn add @antmjs/cache
```

### 使用

```js
import Cache from '@antmjs/cache'

const {
  cacheGetSync,
  cacheGet,
  cacheSetSync,
  cacheSet,
  cacheRemoveSync,
  cacheRemove,
} = Cache({
  ram: { token1: '存储在缓存中' },
  loc: { token2: '存储在缓存及localStorage中' },
})
```

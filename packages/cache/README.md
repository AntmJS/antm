# @antmjs/cache

> 全局缓存解决方案，支持本地存储和内存存储

## 为什么需要

我所理解的缓存分4类，1: 和UI无关的临时缓存；2: 和UI无关的本地缓存； 3: 和UI相关的全局缓存； 4: 和UI相关的局部缓存。本仓库解决的就是1和2的问题，临时缓存很好理解，就是直接存储在全局变量里面，
而本地缓存则通过localStorage进行储存，本仓库对localStorage的优化在于会增量进行临时缓存，下次重新读取的时候会优先进行缓存取值，如果没有再进行本地读取，提高性能。

顺便说下第三点，redux、mobx都用过，结合面试者的回答，有都走redux的，有请求走redux的，有自己约定的。其实都是在找一个临界点，而这个临界点结合业务以及一线小伙伴的理解都会产生不一样的结果，最终redux就成了一个黑洞。
我现在更倾向于少用，当然不是不用，而是可枚举的用（你很清楚里面存储了什么东西，和你使用这个库一样，你很清楚你定义了哪些key），而且由负责人维护，结合hooks，业务开发者只管取值，请求什么的都不用业务来处理，和localStorage有点类似。可以看看[模版](https://github.com/AntmJS/temptaro)

## 安装

```bash
yarn add @antmjs/cache
```

## 使用

```js
import Cache from '@antmjs/cache'

const {
  cacheGetSync,
  cacheGet,
  cacheSetSync,
  cacheSet,
  cacheRemoveSync,
  cacheRemove,
} = Cache({ ram: { token1: '存储在缓存中' }, loc: { token2: '存储在缓存及localStorage中' } })
```
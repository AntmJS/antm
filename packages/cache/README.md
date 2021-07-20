# @antmjs/cache

> 全局缓存解决方案，支持本地存储和内存存储

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
# @antmjs/antmui

> 一套适用于Taro3.3的antmui组件库

## 为什么需要

基于TaroUI+WeUI整合的基于less的Taro组件库，避免每次都要重新造一遍轮子。变更主题只要重写@antmjs/antmui/dist/style/index.less内的变量即可

## 安装

```bash
yarn add @antmjs/antmui
```

## 使用

src/style/index.less

```css
@import 'node_modules/@antmjs/antmui/dist/style/index';
```

```js
import { Button } from '@antmjs/antmui'
```
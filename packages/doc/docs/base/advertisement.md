# 广告投放

### 基础使用

`advertisement`配置中设置，`termType`是展示周期间隔，目前仅支持每天、每周、每月弹出一次

```tsx
export default defineConfig({
  docs: {
    advertisement: {
      title: '募捐',
      content: '感谢大家支持～',
      img: 'https://raw.githubusercontent.com/AntmJS/vantui/main/resource/abcd.png',
      termType: 'week',
    },
  },
})
```

### 自定义样式

- `imgStyle`和`style`可以分别设置图片和弹窗的样式
- 其他样式可以通过 [全局样式设置](/#/style)

# 基础配置

### 基础信息

页面标题和 logo

```ts
export default defineConfig({
  docs: {
    title: 'antmjs Doc',
    logo: 'xxxxx',
  },
})
```

### 文档源文件和输出

文档源文件路径`src`, 默认为`./docs`, 相对命令执行的根目录

```ts
export default defineConfig({
  docs: {
    src: join(CWD, './docs'),
    output: 'doc_build',
  },
})
```

### 顶部导航链接

使用`headerLinks`设置页面顶部导航

- 普通图标导航`type:image`

```ts
export default defineConfig({
  docs: {
    headerLinks: [
      {
        type: 'image',
        title: 'https://b.yzcdn.cn/vant/logo/github.svg',
        url: 'https://github.com',
      },
    ],
  },
})
```

- 普通图标导航 `type:text`

```ts
export default defineConfig({
  docs: {
    headerLinks: [
      {
        type: 'text',
        title: 'github',
        url: 'https://github.com',
      },
    ],
  },
})
```

- 普通图标导航 `type:select`

```ts
export default defineConfig({
  docs: {
    headerLinks: [
      {
        type: 'select',
        title: '更多',
        options: [
          {
            title: 'antmjs',
            github: 'https://github.com/AntmJS/antm',
          },
        ],
      },
    ],
  },
})
```

### 菜单配置

菜单暂时只支持二级菜单，由于`require缓存`, 菜单配置单独存放，会导致不支持热更新

```ts
import type { IMenuNavs } from '@antmjs/types'

const menu: IMenuNavs = [
  {
    name: '使用指南',
    items: [
      {
        title: '介绍',
        path: 'introduce',
      },
    ],
  },
]

export default defineConfig({
  docs: {
    menu: menu,
  },
})
```

### 移动端展示

主要配置如下

- `url`: 分为开发环境和生产环境
- `noMate`: 没有映射关系的 url 的时候，设置重定向
- `transform`: 定义映射规则

```ts
export default defineConfig({
  docs: {
    simulator: {
      url: {
        development: 'http://10.254.9.214:10086',
        production: '/vantui/main/mobile.html',
      },
      transform: (url) => `#/pages/${url}/index`,
      noMate: {
        urls: [
          'quickstart',
          'custom-style',
          'home',
          'theme',
          'use-in-react',
          'contributing',
          'v2-to-v3',
          'comments',
          'premium',
        ],
        redirect: '#/pages/dashboard/index',
      },
    },
  },
})
```

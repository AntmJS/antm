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

文档源文件路径`src`, 默认为`./docs`, 可以是文件夹或文件，支持数组

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

菜单暂时只支持二级菜单

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

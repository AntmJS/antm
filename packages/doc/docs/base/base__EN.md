# Basic Configuration

### Basic Information

Page title and logo

```ts
export default defineConfig({
  docs: {
    title: 'antmjs Doc',
    logo: 'xxxxx',
  },
})
```

### Document Source and Output

The document source file path `src` is set to `./docs` by default, relative to the root directory where the command is executed.

```ts
export default defineConfig({
  docs: {
    src: join(CWD, './docs'),
    output: 'doc_build',
  },
})
```

### Top Navigation Links

Use `headerLinks` to set the top navigation of the page.

- Regular icon navigation `type:image`

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

- Regular icon navigation `type:text`

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

- Regular icon navigation `type:select`

```ts
export default defineConfig({
  docs: {
    headerLinks: [
      {
        type: 'select',
        title: 'More',
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

### Menu Configuration

The menu currently only supports two-level menus. Due to `require cache`, the menu configuration is stored separately, which may not support hot updates.

```ts
import type { IMenuNavs } from '@antmjs/types'

const menu: IMenuNavs = [
  {
    name: 'User Guide',
    items: [
      {
        title: 'Introduction',
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

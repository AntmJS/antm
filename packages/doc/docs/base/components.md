# 构建组件库文档

### 介绍

antmjs Doc 可以支持移动端组件库和 PC 端组件库，两种方式的需要执行不同的操作

### PC 组件库

#### 案例代码文件

- 路径：案例代码和文档 md 文件须要再文件同层级
- 命名：文件必须以`demo`为开头前缀，后续为`[a-z\-]`
  同一个 md 文档内要避免命名冲突
- 类型：支持`.tsx`、`.jsx`三中文件类型, 暂时只支持`react`
- 代码：案例代码必须有默认导出的组件，即 `export default`
  代码里面`import`本地的文件,也会展示,除了包含`index`的文件路径

案例代码所在 的文件夹, 在`antm.config下配置`下配置,

```ts
export default {
  docs: {
    demoCode: {
      dir: 'example',
    },
  },
}
```

> 不设置则案例代码和 markdown 文件在同一层级

目录结构例如：

```markdown
├── docs
├── example/demo-button.tsx
├── components.md
```

#### md 文件中引用案例代码

如上文件 components.md 中使用，真实使用中必须带上空行和换行符

```markdown
::: demo-buttona :::
// 只引用代码展示，不渲染
::: $demo-buttona :::
```

> 需要注意的是，要先创建案例代码文件，再设置引入标识

下面是一个简单 react 的 `toast` 组件案例展示

::: demo-button :::

下面是一个简单 vue 的 `toast` 组件案例展示

::: demo-buttona :::

案例[antd-max](https://antmjs.github.io/antd-max)

### 组件库的 i8n

```ts
export default {
  docs: {
    // ......
    demoCode: {
      container: {
        react: path.join(process.cwd(), './docs/demo-i18n.tsx'),
        vue: path.join(process.cwd(), './docs/demo-i18n.tsx'),
      },
    },
  },
}
```

配置文件`antm.config下配置`配置`doc.demoCode.container.react`，即组件案例公共的容器组件
下面是模拟 i18n 组件的简单实现，全局变量`__LANGE__`当前文档切换的语言

```typescript
import React from 'react'

let langCache = ''

export default function Index({ children }) {
  if (window['__LANGE__'] && window['__LANGE__'] !== langCache) {
    const I18nMap = {
      CN: {
        点击Toast: '点击Toast',
        点击按钮: '点击按钮',
        操作成功: '操作成功',
      },
      EN: {
        点击Toast: 'click Toast',
        点击按钮: 'click button',
        操作成功: 'operate success',
      },
    }
    window['$L'] = I18nMap[window['__LANGE__']]
  }

  return <div>{children}</div>
}
```

### 移动端组件库

一种方式是通过`simulator`配置，以 iframe 的方式展示

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

移动端 iframe 案例[vantui](https://antmjs.github.io/vantui/main/)

还一种方式是通过 css 改变 PC 端组件展示的样式

```less
.demo-code-wrapper {
  display: flex;
  flex-direction: row-reverse;
  .code-box {
    height: auto;
    margin-top: 0;
    flex: 1;

    .code-item pre {
      max-height: 624px;
      height: 624px;
    }
  }

  .demo-code-box {
    width: 375px;
    height: 667px;
    overflow: scroll;
    border: 2px solid #758479;
    margin-left: 4px;
  }

  .show-code-btn {
    display: none;
  }
}
```

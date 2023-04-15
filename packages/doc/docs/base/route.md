# 约定式路由

### 什么是约定式路由

antm.js Doc 使用的是文件系统路由，页面的文件路径会简单的映射为路由路径，这样会让整个项目的路由非常直观。

例如，如果在 docs 目录中有一个名为 foo.md 的文件，则该文件的路由路径将是 /foo

> 浏览器控制台会默认打印 `DOC_ROUTERS`即生成的全部路由页面

### 映射规则

antm.js Doc 会自动扫描根目录和所有子目录，并将文件路径映射到路由路径。例如，如果你有以下的文件结构：

```markdown
docs
├── foo
│ └── bar.md
└── foo.md
```

得到的映射规则如下：

| 文件路径             | 路由路径    |
| -------------------- | ----------- |
| `docs/foo.md`        | ` /foo`     |
| `docs/foo/bar.md`    | ` /foo/bar` |
| `docs/abc/README.md` | ` /abc`     |

### 自定义规则

通过配置定义自定义生成路由的规则

`src`配置，文档文件所在的根路径，可以是字符或数字

`route`配置：

- `exclude`：不需要转换为文档的 markdown 文件, 支持 `/abc/*.md`写法,请使用全路径匹配
- `redirect`：当路由没有匹配的，或者为`/`根路由的时候重定向的路径
- `type`：路由类型`hash`或`history`
- `level`：控制路由路径的长度，如 level 设置 1 的时候，`docs/foo/bar.md`映射`/bar`, 可能会出现**路由冲突**，谨慎使用

```js
import { defineConfig } from '@antmjs/types';

export default defineConfig({
  docs: {
    src: ['./doc'],
    route: {
      level: 1,
      exclude: [join(CWD, '/a/*.md')],
      redirect: '/introduce'
      type: 'hash'
    }
  }
})
```

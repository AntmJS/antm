# markdown 语法扩展

### 基于 markdown-it

antmjs Doc 是基于 markdown-it 对 markdown 内容进行解析的，我们可以通过`markdown-it`的插件机制进行语法扩展，如：

- [下标 (markdown-it-sub)](https://github.com/markdown-it/markdown-it-sub)
- [上标 (markdown-it-sup)](https://github.com/markdown-it/markdown-it-sup)
- [脚注 (markdown-it-footnote)](https://github.com/markdown-it/markdown-it-footnote)
- [定义列表 (markdown-it-deflist)](https://github.com/markdown-it/markdown-it-deflist)
- [缩写 (markdown-it-abbr)](https://github.com/markdown-it/markdown-it-abbr)
- [emoji (markdown-it-emoji)](https://github.com/markdown-it/markdown-it-emoji)
- [自定义代码块 (markdown-it-container)](https://github.com/markdown-it/markdown-it-container)
- [插入 (markdown-it-ins)](https://github.com/markdown-it/markdown-it-ins)
- [标记 (markdown-it-mark)](https://github.com/markdown-it/markdown-it-mark)
- ... 以及[其他的](https://www.npmjs.com/search?q=markdown-it%20plugin)

### 使用

在 antmjs.config 中，使用方式如下

```ts
import markdownItSub from 'markdown-it-sub'
import type { IDocsConfig } from '@antmjs/doc'

const docs: IDocsConfig = {
  markdownPlugins: [markdownItSub],
}
// ...
```

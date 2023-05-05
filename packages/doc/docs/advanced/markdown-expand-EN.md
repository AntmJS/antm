# Markdown Syntax Extension

### Based on markdown-it

antmjs Doc is based on markdown-it to parse markdown content. We can use the plugin mechanism of `markdown-it` to extend the syntax, such as:

- [Subscript (markdown-it-sub)](https://github.com/markdown-it/markdown-it-sub)
- [Superscript (markdown-it-sup)](https://github.com/markdown-it/markdown-it-sup)
- [Footnote (markdown-it-footnote)](https://github.com/markdown-it/markdown-it-footnote)
- [Definition list (markdown-it-deflist)](https://github.com/markdown-it/markdown-it-deflist)
- [Abbreviation (markdown-it-abbr)](https://github.com/markdown-it/markdown-it-abbr)
- [Emoji (markdown-it-emoji)](https://github.com/markdown-it/markdown-it-emoji)
- [Custom container (markdown-it-container)](https://github.com/markdown-it/markdown-it-container)
- [Insert (markdown-it-ins)](https://github.com/markdown-it/markdown-it-ins)
- [Mark (markdown-it-mark)](https://github.com/markdown-it/markdown-it-mark)
- ... and [others](https://www.npmjs.com/search?q=markdown-it%20plugin)

### Usage

In antmjs.config, use it as follows:

```ts
import markdownItSub from 'markdown-it-sub'
import type { IDocsConfig } from '@antmjs/doc'

const docs: IDocsConfig = {
  markdownPlugins: [markdownItSub],
}
// ...
```

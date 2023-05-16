### 安装

```bash
yarn add @antmjs/doc
npm i @antmjs/doc
```

### 定位

antm.js Doc 是一个面向前端技术文档的框架, 以最简单、高效的方式构建技术文档。
支持`h1`和`h3`的`markdown`的标签形式， 即

```markdown
# 大标题

### 副标题
```

支持常见的文档搭建需求：

- `Markdown`语法扩展
- 自定义全局样式
- 全文搜索

后续将支持：

- 自定义主题
- 头部导航栏菜单
- 分辨率适配
- 搜索自定义化

### 搜索功能

基于[flexsearch](https://www.npmjs.com/package/flexsearch)实现的搜索功能

<img src="https://camo.githubusercontent.com/64811ef125fd0abc2db32d3668edf879b532a8e9d3cd2fc87ed25d8edfbd8028/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6e657874617070732d64652f666c6578736561726368406d61737465722f646f632f666c65787365617263682d6c6f676f2d676c6173732e7376673f7632" alt="FlexSearch.js: Next-Generation full text search library for Browser and Node.js" data-canonical-src="https://cdn.jsdelivr.net/gh/nextapps-de/flexsearch@master/doc/flexsearch-logo-glass.svg?v2" style="max-width: 40%;">

目前默认支持标题、段落和表格信息的搜索

### 功能特性

#### 支持 Markdown 语法扩展

antm.js Doc 基于`MarkdownItPlugin`进行 Markdown 语法的扩展

详情请参考[markdown 语法扩展](/#/markdown-expand)

# Introduction

### Overview

antm.js Doc is a framework for building front-end technical documentation in the simplest and most efficient way possible. It supports the `h1` and `h3` tags in `markdown` format, as follows:

```markdown
# Heading 1

### Heading 3
```

It also supports common documentation building requirements such as:

- Markdown syntax extensions
- Custom global styles
- Full-text search

In the future, it will support:

- Custom themes
- Header navigation menus
- Resolution adaptation
- Customized search

### Search Functionality

The search function is implemented based on [flexsearch](https://www.npmjs.com/package/flexsearch).

<img src="https://camo.githubusercontent.com/64811ef125fd0abc2db32d3668edf879b532a8e9d3cd2fc87ed25d8edfbd8028/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6e657874617070732d64652f666c6578736561726368406d61737465722f646f632f666c65787365617263682d6c6f676f2d676c6173732e7376673f7632" alt="FlexSearch.js: Next-Generation full text search library for Browser and Node.js" data-canonical-src="https://cdn.jsdelivr.net/gh/nextapps-de/flexsearch@master/doc/flexsearch-logo-glass.svg?v2" style="max-width: 40%;">

Currently, it supports searching for titles, paragraphs, and table information by default.

### Features

#### Support for Markdown Syntax Extensions

antm.js Doc extends Markdown syntax based on the `MarkdownItPlugin`.

For details, please refer to [Markdown Syntax Extensions](/#/markdown-expand).

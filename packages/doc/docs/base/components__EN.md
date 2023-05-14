# Build Component Library Document

### Introduction

Antmjs Doc can support both mobile and PC component libraries, with different operations required for both methods

### PC component library

#### Case code file

-Path: The case code and document MD file need to be at the same level as the file
-Naming: The file must start with 'demo' as the prefix, followed by '[a-z -]`
Avoid naming conflicts within the same MD document
-Type: Supports three file types: '. tsx' and '. jsx'. Currently, only 'react' is supported`
-Code: The case code must have a default exported component, which is' export default '`
The 'import' local file in the code will also be displayed, except for the file path containing 'index'
The folder where the case code is located is configured under 'antm. config',

```ts
export default {
  docs: {
    demoCode: {
      dir: 'example',
    },
  },
}
```

> If not set, the case code and markup file are at the same level
> Directory structure, for example:

```markdown
├── docs
├── example/demo-button.tsx
├── components.md
```

#### Referencing Case Codes in MD Files

Used in the above file components.md, empty lines and line breaks must be included in actual use

```markdown
::: demo-buttona :::
//Only reference code display, no rendering
::: $demo-buttona :::
```

> It should be noted that the case code file needs to be created first, and then the introduction identifier needs to be set
> Below is a simple 'toast' component case study of React
> ::: demo-button :::
> The following is a simple Vue 'toast' component case display
> ::: demo-buttona :::

### I8n of component library

```ts
export default {
  docs: {
    // ......
    demoCode: {
      container: {
        react: path.join(process.cwd(), './ docs/demo-i18n.tsx'),
        vue: path.join(process.cwd(), './ docs/demo-i18n.tsx'),
      },
    },
  },
}
```

Configure 'doc. demoCode. container. read' under the configuration file 'antm. config', which is a container component that is common to component cases
The following is a simple implementation of simulating i18n components, with global variables`__ LANGE__` Language for switching the current document

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

### Mobile component library

The main configurations are as follows
-URL: divided into development environment and production environment
-'noMate': Set redirection when there is no mapping relationship between urls
-'transform ': Define mapping rules

```ts
export default defineConfig({
  docs: {
    simulator: {
      url: {
        development: ' http://10.254.9.214:10086 ',
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

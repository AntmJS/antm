# Building Component Library Documentation

### Introduction

antmjs Doc can support both mobile and PC component libraries, and requires different operations for each.

### PC Component Library

#### Example Code Files

- Path: Example code and document md files must be in the same layer of the file
- Naming: The file must start with the prefix `demo`, followed by `[a-z-]`
  Avoid naming conflicts within the same md document
- Type: Supports `.tsx`, `.jsx` three file types, currently only supports `react`
- Code: Example code must have a default exported component, i.e. `export default`

```markdown
├── docs
├── components.md
├── demo-button.tsx
```

#### Referencing Example Code in md Files

As used in the above components.md file, a blank line and line feed character must be included in actual use.

```markdown
::: demo-button :::
```

> Note that you need to create the example code file first and then set the import identifier.

Below is a simple react example of a `toast` component display.

::: demo-button :::

Below is a simple vue example of a `button` component display

::: demo-buttona :::

### I18n of component library

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

### Mobile Component Library

The main configuration is as follows:

- `url`: Divided into development and production environments.
- `noMate`: When there is no mapping relationship for the url, set the redirection.
- `transform`: Define mapping rules.

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

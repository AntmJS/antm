# Building Component Library Documentation

### Introduction

antmjs Doc supports both mobile and PC component libraries, which require different operations.

### PC Component Library

#### Example Code Files

- Path: The example code and documentation MD files should be in the same directory.
- Naming: The file must start with the prefix "demo" followed by lowercase letters and hyphens (`[a-z\-]`).
  Avoid naming conflicts within the same MD file.
- Type: Supports `.tsx` and `.jsx` file types. Currently, only supports React.
- Code: The example code must have a default exported component (`export default`).

```markdown
├── docs
├── components.md
├── demo-button.tsx
```

#### Referencing Example Code in MD Files

To use the code in the file `components.md`, make sure to include empty lines and line breaks.

```markdown
::: demo-button :::
```

Here is a simple example of a "toast" component:

::: demo-button :::

### Mobile Component Library

The main configuration is as follows:

- `url`: Divided into development and production environments.
- `noMate`: Redirects when there is no mapping relationship for the URL.
- `transform`: Defines the mapping rules.

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

Mobile iframe example: [vantui](https://antmjs.github.io/vantui/main/)

Another approach is to change the PC component display style using CSS.

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

### Translation of Markdown Document

Here is the translation of the provided Markdown document:

# Building Component Library Documentation

### Introduction

antmjs Doc supports both mobile and PC component libraries, which require different operations.

### PC Component Library

#### Example Code Files

- Path: The example code and documentation MD files should be in the same directory.
- Naming: The file must start with the prefix "demo" followed by lowercase letters and hyphens (`[a-z\-]`).
  Avoid naming conflicts within the same MD file.
- Type: Supports `.tsx` and `.jsx` file types. Currently, only supports React.
- Code: The example code must have a default exported component (`export default`).
  The code can also include local file imports, except for files with "index" in their path.

The folder containing the example code is configured in `antm.config` as follows:

```ts
export default {
  docs: {
    demoCode: {
      dir: 'example

',
    },
  },
}
```

> If not set, the example code and markdown files should be in the same directory.

Directory structure example:

```markdown
├── docs
├── example/demo-button.tsx
├── components.md
```

#### Referencing Example Code in MD Files

To use the code in the `components.md` file, make sure to include empty lines and line breaks.

```markdown
::: demo-buttona :::
// Only display the code, without rendering
::: $demo-buttona :::
```

> Note: Create the example code file before setting the import tag.

Here is a simple example of a "toast" component in React:

::: demo-button :::

And here is a simple example of a "toast" component in Vue:

::: demo-buttona :::

Example: [antd-max](https://antmjs.github.io/antd-max)

### Component Library Internationalization (i18n)

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

In the `antm.config` file, configure `doc.demoCode.container.react` for the shared container component of the component examples.
Here is a simple implementation of a mock i18n component that uses the global variable `__LANGE__` to determine the current language:

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

One way to display mobile components is through the `simulator` configuration using an iframe.

The main configuration is as follows:

- `url`: Divided into development and production environments.
- `noMate`: Redirects when there is no mapping relationship for the URL.
- `transform`: Defines the mapping rules.

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

Mobile iframe example: [vantui](https://antmjs.github.io/vantui/main/)

Another approach is to change the display style of PC components using CSS.

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

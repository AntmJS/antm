# Custom Global Styles

In some cases, you may need to add some global styles on top of the theme UI. The framework provides a configuration item `globalStyles` to achieve this function.

### Usage

Add the following configuration to `antm.config.ts`:

```ts
import { defineConfig } from '@antmjs/types'
import path from 'path'

export default defineConfig({
  doc: {
    globalStyles: [join(CWD, './styles/index.css')],
  },
})
```

Currently, only a small number of CSS variables are supported. An example of the style code is as follows:

```less
:root {
  --primary-color: rgb(78, 78, 200);
  --primary-back-color: #e5e4f8;
  --header-back-color: rgb(78, 78, 200);
}

.antm-docs-menu {
  width: 200px;
}
```

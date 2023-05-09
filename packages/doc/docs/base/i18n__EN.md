# i18n

### File Structure

Create File Format: `introduce__ EN. md` default corresponding route ` introduce/EN`

```markdown
├── docs
├── introduce.md
├── introduce\_\_EN.md
```

### i18n configuration

- `i18n.langs`: List of supported languages, with the first being the default language
- `noSuffixLang`: File path without suffix, default to corresponding language

```js
import { defineConfig } from '@antmjs/types'

export default defineConfig({
  docs: {
    i18n: {
      langs: ['CN', 'EN'],
      noSuffixLang: 'CN',
    },
  },
})
```

### Multilingual menus and navigation bar

In internationalization mode, if there are only two languages, 'CN' and 'EN', the 'name' and 'title' fields in the 'menu' are as follows

```js
const menu = [
  {
    name: {
      CN: '指南',
      EN: 'Guide',
    },
    items: [
      {
        title: {
          CN: '介绍',
          EN: 'introduce',
        },
        path: 'introduce',
      },
    ],
  },
]
```

The 'title' under the navigation bar 'headerLinks' is written the same way as the' title 'under the menu' menu '

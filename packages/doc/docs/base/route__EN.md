# Convention-based Routing

### What is Convention-based Routing

Antm.js Doc uses file system routing, where the file path of a page is simply mapped to its routing path. This makes the routing of the entire project very intuitive.

For example, if there is a file named `foo.md` in the `docs` directory, its routing path would be `/foo`.

> The browser console will print `DOC_ROUTERS` by default, which shows all generated routing pages.

### Mapping Rules

Antm.js Doc will automatically scan the root directory and all subdirectories and map the file path to its routing path. For example, if you have the following file structure:

```markdown
docs
├── foo
│ └── bar.md
└── foo.md
```

The mapping rules are as follows:

| File Path            | Routing Path |
| -------------------- | ------------ |
| `docs/foo.md`        | `/foo`       |
| `docs/foo/bar.md`    | `/foo/bar`   |
| `docs/abc/README.md` | `/abc`       |

### Custom Rules

Custom routing rules can be defined through configuration.

`src` configuration specifies the root path of the documentation files, which can be a string or number.

`route` configuration includes:

- `exclude`: markdown files that do not need to be converted into documentation, supports `/abc/*.md` syntax, please use full path matching.
- `redirect`: the path to redirect to when there is no matching route or for the root route `/`.
- `type`: type of routing, either `hash` or `history`.
- `level`: controls the length of the routing path. For example, when level is set to 1, `docs/foo/bar.md` is mapped to `/bar`. There may be **routing conflicts**, so use with caution.

```js
import { defineConfig } from '@antmjs/types'

export default defineConfig({
  docs: {
    src: ['./doc'],
    route: {
      level: 1,
      exclude: [join(CWD, '/a/*.md')],
      redirect: '/introduce',
      type: 'hash',
    },
  },
})
```

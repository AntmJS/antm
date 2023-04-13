# 自定义全局样式

某些场景下，你可能需要在主题 UI 的基础上添加一些全局样式，框架提供了一个配置项 globalStyles 来实现这个功能

### 使用方法

在 antm.config.ts 中添加以下配置

```ts
import { defineConfig } from '@antmjs/types'
import path from 'path'

export default defineConfig({
  doc: {
    globalStyles: [join(CWD, './styles/index.css')],
  },
})
```

暂时只支持少量 css 变量, 样式案例代码如下：

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

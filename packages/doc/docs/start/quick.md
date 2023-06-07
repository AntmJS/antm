# 快速开始

### 安装

```bash
npm i @antmjs/doc
```

在 package.json 下新增脚本

```json
{
  "scripts": {
    "start": "antm-doc-start",
    "build": "antm-doc-build"
  }
}
```

### 配置

然后初始化一个配置文件`antm.config.js`

```ts
import { defineConfig } from '@antmjs/types'

export default defineConfig({
  title: 'antm.js Doc',
  src: join(process.cwd(), './docs'),
  menu: [
    {
      name: '开始',
      items: [
        {
          title: '介绍',
          url: 'introduce',
        },
      ],
    },
  ],
})
```

### 启动 Dev Server

执行本地脚本命令

```bash
yarn start
```

支持文档文件和配置文件编辑的热更新

### 生产环境构建

```bash
yarn build
```

默认情况下，打包结果将输出到`doc_build`目录

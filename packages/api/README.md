## @antmjs/api 是什么？

`@antmjs/api` 是 `typeScript` 的最佳拍档，它可以帮你生成具有类型定义的请求方案和接口文档。

- 无需自行书写请求代码，把 HTTP 接口当做函数调用
- 代码自动化转化为接口文档，代码和文档完全保持一致
- 本地生成 mock 服务，提升联调效率
- 基于 swagger 接口文档，生成本地字段类型 ts 文件和请求方法，同时支持简易 mock 方法

### 安装

```
yarn add @antmjs/api
```

### 快速开始

- `antm-api watch`: 监听请求字段类型文件，生成 描述接口文档 的数据，`server`独立构建文档服务，`mock`开启 mock 服务, `action`根据请求字段类型生成请求方法
- `antm-api build`: 接口文档单独打包
- `antm-api file`: 执行一次生成 描述接口文档 的数据
- `antm-api swagger`: 根据 swagger 数据生成 本地 请求字段类型 ts 文件、请求方法 ts 文件

```json
{
  "scripts": {
    "api:watch": "antm-api  watch --path ./src/actions/types --server true --mock true --action true",
    "api:build": "antm-api  build --path ./src/actions/types",
    "api:file": "antm-api  file --path ./src/actions/types",
    "swagger": "antm-api swagger --url https://xxxxxxxx/v2/api-docs"
  }
}
```

### 相关配置

antmjs.config.js 下配置 api

| 字段                       | 描述                                                                               | 类型       | 默认值                                         |
| -------------------------- | ---------------------------------------------------------------------------------- | ---------- | ---------------------------------------------- |
| path                       | 请求字段类型所在的文件路径`                                                        | _string_   | "./src/actions/types"                          |
| buildPath                  | 接口文档打包路径                                                                   | _string_   | "./api-ui"                                     |
| buildPort                  | 接口文档开发环境服务端口                                                           | _number_   | 7878                                           |
| mockPort                   | 接口文档开发环境服务端口                                                           | _number_   | 10099                                          |
| action.requestImport       | 导入请求方法的代码字符串                                                           | _string_   | "import { createFetch } from "@/utils/request" |
| action.dirPath             | 请求方法所在文件夹, 相对类型文件的路径                                             | _string_   | "../"                                          |
| action.requestFnName       | 请求方法名称                                                                       | _string_   | "createFetch"                                  |
| action.createDefaultModel  | 自行定义请求方法的结构                                                             | _function_ | `createDefaultModel`                           |
| swagger.url                | swagger 数据地址                                                                   | _string_   | --                                             |
| swagger.modules            | 使用的的接口模块，对应`swagger.tags.name`, 不传则使用所有                          | _string_   | --                                             |
| swagger.createTypeFileName | 根据请求路径生成 ts 类型文件名称，不需要后缀，返回空则默认使用 `swagger.tags.name` | _function_ | `createTypeFileName`                           |

默认的`createTypeFileName`如下

```js
export function createTypeFileName(url) {
  const urlArr = url
    .split('/')
    .filter((it) => !!it)
    .map((u) => {
      return u.replace('.', '')
    })

  if (url.length > 2) {
    return `${urlArr[0]}-${urlArr[1]}-${urlArr[2]}`
  } else {
    // 返回空则使用swagger.tags.name
    return ''
  }
}
```

默认的`createDefaultModel`如下

```js
function createDefaultModel({
  requestImport = "import { createFetch } from '@/utils/request'",
  requestFnName = 'createFetch',
  fileName = 'a',
  data = {},
  requestSuffix = 'Action',
}) {
  const packages = []
  let requestActionsStr = ''
  // 根据data拼接多个业务请求方法
  for (const key in data) {
    if (key !== 'Record<string,any>') {
      const item = data[key]
      packages.push(key)
      requestActionsStr += `
      // ${item.description}
      export const ${key}${requestSuffix} = ${requestFnName}<${key}['request'], ${key}['response']>('${item.url}', '${item.method}');
      `
    }
  }

  const packagesStr = packages.join(',')

  return `
    // @ts-nocheck
    ${requestImport}
    import type { ${packagesStr} } from './types/${fileName}';

    ${requestActionsStr}
    `
}
```

##### 如何定义请求字段

- `普通注释`: 接口描述或字段描述
- `@url`: 请求路径
- `@introduce`: 接口额外的详细介绍
- `@value`: 基础类型字段的固定 mock 数据, 可以使用 mockjs 规则,规则前缀`@`改为`#`,例如#title、#date('YYYY-MM-DD')
- `@rule`: mock 复杂数据的规则，例如：19-20，生成数组数组 19 条或者 20 条
- 更多 mock 配置，请查看[mockjs](http://mockjs.com/)

```js
/**
 * 获取用户列表信息
 * @url /z/common/user/list
 * @introduce 这是请求所有用户数据的接口
 * @method GET
 */
export type userInfo = {
  request: {
    /**
     * 每页数据数量
     **/
    pageSize: number
    /**
     * 第几页
     **/
    pageSize: number
  };
  response: {
    /**
     * 成功
     **/
    success: boolean;
    data: {
      /**
       * 用户总数
       * @value 39
       **/
      total: number
      /**
       * 用户列表
       * @rule 19-20
       **/
      list: {
      /**
       * 用户名称
       * @value #title
       **/
        userName: string
      }[]
    };
  };
};
```

### 将文档 UI 应用到测试环境

开发环境只需要开启 `antm-api watch --path ./src/actions/types --mock true --action true`
正式打包则使用 `antm-api file`, 再执行本地项目的构建

```jsx
import { ApiUi } from '@antmjs/api'
// 默认当前项目生成接口文档数据，.gitignore文件加上 .cache
import apiData from '@/../.cache/api-ui-data.json'
import '@antmjs/api/ui/app.less'

export default function Index(): React.ReactNode {
  return <ApiUi title="crm接口文档" mockPort={10998} apiData={apiData} />
}
```

### 使用案例

[github:api-ui-demo](https://github.com/zuolung/api-ui-demo)

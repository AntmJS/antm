## @antmjs/api-ui 是什么？

`@antmjs/api-ui` 是 `typeScript` 的最佳拍档，它可以帮你生成具有类型定义的请求方案和接口文档。

- 无需自行书写请求代码，把 HTTP 接口当做函数调用
- 代码自动化转化为接口文档，代码和文档完全保持一致
- 本地生成mock服务，提升联调效率

### 安装
```
yarn add @antmjs/api-ui
```

### 快速开始
- `antm-api-ui watch`: 监听请求字段类型文件，生成ui构建的数据，`server`独立构建文档服务，`mock`开启mock服务
- `antm-api-ui build`: 接口文档单独打包
- `antm-api-ui action`: 根据请求字段类型生成请求方法
```json
{
  "scripts": {
    "api:watch": "antm-api-ui watch --path ./src/actions/types --server true --mock true",
    "api:build": "antm-api-ui build --path ./src/actions/types",
    "api:action": "antm-api-ui action --path ./src/actions/types",
  }
}
```

### 将文档UI应用到测试环境

开发环境只需要开启 `antm-api-ui watch --path ./src/actions/types  --mock`
正式打包则使用 `antm-api-ui file`, 再执行本地项目的构建

```jsx
import { ApiUi } from '@antmjs/api-ui'
import '@antmjs/api-ui/ui/app.less'

export default () => <ApiUi />
```
### 相关配置
antmjs.config.js下配置openUi

| 字段 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| path | 请求字段类型所在的文件路径` | _string_ | "./src/actions/types" |
| buildPath | 接口文档打包路径 | _string_ | "./api-ui" |
| buildPort | 接口文档开发环境服务端口 | _number_ | 7878 |
| mockPort | 接口文档开发环境服务端口 | _number_ | 10099 |
| action.requestImport | 导入请求方法的代码字符串 | _string_ | "import { createFetch } from "@/utils/request" |
| action.requestFnName | 请求方法名称 | _string_ | "createFetch" |
| action.requestSuffix | 生成业务请求方法的后缀 | _string_ | "Action" |
| action.createDefaultModel | 自行定义请求方法的结构 | _function_ | `createDefaultModel` |

默认的`createDefaultModel`如下

```js
function createDefaultModel({
  requestImport = "import { createFetch } from '@/utils/request'",
  requestFnName = "createFetch",
  fileName = "a",
  data = {},
  requestSuffix = "Action",
}) {
  const packages = [];
  let requestActionsStr = "";
  // 根据data拼接多个业务请求方法
  for (const key in data) {
    if (key !== "Record<string,any>") {
      const item = data[key];
      packages.push(key);
      requestActionsStr += `
      // ${item.description}
      export const ${key}${requestSuffix} = ${requestFnName}<${key}['request'], ${key}['response']>('${item.url}', '${item.method}');
      `;
    }
  }

  const packagesStr = packages.join(",");

  return `
    // @ts-nocheck
    ${requestImport}
    import type { ${packagesStr} } from './types/${fileName}';

    ${requestActionsStr}
    `;
}
```

### 如何定义请求字段
- `普通注释`: 接口描述或字段描述
- `@url`: 请求路径
- `@introduce`: 接口额外的详细介绍
- `@value`: 基础类型字段的固定mock数据, 可以使用mockjs规则,规则前缀`@`改为`#`,例如#title、#date('YYYY-MM-DD')
- `@rule`: mock复杂数据的规则，例如：19-20，生成数组数组19条或者20条
- 更多mock配置，请查看[mockjs](http://mockjs.com/)

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

### 使用案例
[github:api-ui-demo](https://github.com/zuolung/api-ui-demo)
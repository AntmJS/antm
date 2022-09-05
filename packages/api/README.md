## @antmjs/api 是什么？

`@antmjs/api` 是日常开发中接口的效率化工具。

![image](https://raw.githubusercontent.com/zuolung/api-ui-demo/main/theme.png)

- 代码自动化转化为接口文档，代码和文档完全保持一致
- 自动生成请求方法
- 本地生成 mock 服务，提升联调效率
- 根据后端 swagger 文档生成接口请求字段类型

### 安装

```
yarn add @antmjs/api
```

### 快速开始

接口定义的方案可以分为 `前端ts文件定义接口` 和 `后端swagger定义接口`

##### 前端 ts 文件定义接口

- `antm-api watch`: 监听请求字段类型文件，生成 描述接口文档 的数据，`server`本地文档服务,`mock`开启 mock 服务, `action`根据请求字段类型生成请求方法
- `antm-api build`: 接口文档单独打包
- `antm-api file`: 执行一次生成 描述接口文档 的数据, 应用场景：1.刚拉取业务项目初始化、2.仅想重新生成一次请求方法

```json
{
  "scripts": {
    // ...
    "api:watch": "antm-api watch --path ./src/actions/types --server true --mock true --action true",
    "api:build": "antm-api build --path ./src/actions/types",
    "api:file": "antm-api file --path ./src/actions/types --action true",
    "build": "yarn build & yarn api:build"
  }
}
```

接口文档和项目一起打包到测试环境`yarn build`, 建议打包的目录结构如下，通过设置配置项`buildPath`为`./build/api`

```
- build
  - index.html
  ......
  - api (antm-api打包的结果，可以通过配置文件配置打包路径)
```

##### 后端 swagger 定义接口

- `antm-api swagger`: 生成请求字段类型文件， 再执行`antm-api watch`
- `antm-api watch`: 监听请求字段类型文件，生成 描述接口文档 的数据，`server`本地文档服务,`mock`开启 mock 服务, `action`根据请求字段类型生成请求方法

是否再生成新的接口文档可以自己选择，如果只需要 mock 服务，将`--server true`移除即可

```json
{
  "scripts": {
    "swagger": "antm-api swagger --path ./src/actions/swagger/types --url https://scapi.lsmart.wang/v2/api-docs",
    "api:watch": "antm-api watch --path ./src/actions/types --server true --mock true --action true"
  }
}
```

### 基本配置

配置文件根目录下 antm.config.js 文件下`api`属性

| 字段      | 描述                                                           | 类型     | 默认值     |
| --------- | -------------------------------------------------------------- | -------- | ---------- |
| path      | 请求字段类型所在的文件路径` | _string_ | "./src/actions/types" |
| buildPath | 接口文档打包路径                                               | _string_ | "./api-ui" |
| buildPort | 接口文档开发环境服务端口                                       | _number_ | 7878       |

### mock 服务配置

antm.config.js 文件下`api`的`mock`属性, 前端定义接口通过`定义请求字段`的注释来 mock 数据或者拦截 mock 服务的方式，
基于后端 swagger 只能通过拦截 mock 服务的方式，mock 服务会返回根据 swagger 的枚举数据和 formatDate 等数据类型生成的默认的 mock 数据

| 字段          | 描述                   | 类型       | 默认值 |
| ------------- | ---------------------- | ---------- | ------ |
| port          | mock 服务端口          | _number_   | 10099  |
| timeout       | 所有接口延时返回的时间 | _number_   | 0      |
| baseIntercept | 拦截基本类型数据       | _function_ | --     |
| arrayRule     | 拦截数组类型数据       | _function_ | --     |

拦截基本类型数据`mock.baseIntercept`配置案例，[建议按照 mockjs 字符、数字、布尔值 规则 返回](http://mockjs.com/examples.html#String).

**可以根据字段名称和名称去定义返回的数据**

```js
function baseIntercept(params) {
  // type：string、number、boolean
  // fieldName：字段名称
  // originValue：原有值，swagger枚举类型、formatDate等或手动写的@value注释
  // url：请求路径
  const { type, fieldName, originValue, url } = params
  if (originValue) return originValue

  if (type === 'string') {
    if (fieldName.includes('name') || fieldName.includes('Name'))
      return '@cname'
    if (fieldName.includes('code') || fieldName.includes('Code'))
      return '@word(4, 6)'
    if (
      fieldName.includes('intro') ||
      fieldName.includes('Intro') ||
      fieldName.includes('Long')
    ) {
      return '@cparagraph(1, 3)'
    }
    return '@ctitle'
  } else if (type === 'number') {
    if (fieldName.includes('Id') || fieldName.includes('id')) {
      return '@integer(99, 100000)'
    }

    return 1
  } else if (type === 'boolean') {
    if (fieldName === 'success') return true
    return Math.random() > 0.5 ? true : false
  }
}
```

拦截数组类型数据`mock.arrayRule`配置案例， [建议按照 mockjs 数组 规则 返回](http://mockjs.com/examples.html#Array)

```js
function arrayRule(params) {
  const { type, fieldName, url } = params
  // 随机19-20条数组
  if (fieldName === 'list') return '19-20'
}
```

### action 配置

antm.config.js 文件下`api`的`action`属性

| 字段               | 描述                 | 类型       | 默认值                                         |
| ------------------ | -------------------- | ---------- | ---------------------------------------------- |
| requestImport      | 请求方法的代码字符串 | _string_   | "import { createFetch } from "@/utils/request" |
| dirPath            | 相对类型文件的路径   | _string_   | "../"                                          |
| requestFnName      | 请求方法名称         | _string_   | "createFetch"                                  |
| createDefaultModel | 定义请求方法的结构   | _function_ | `createDefaultModel`                           |

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
    // 需要判断item.description && item.url
    if (key !== 'Record<string,any>' && item.description && item.url) {
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

### swagger 配置

antm.config.js 文件下`api`的`swagger`属性, swagger 转换后，对应 formatDate 和枚举类型的数据会转换成 mock 数据。
生成请求字段文件的名称为`swagger.tags.name`,如果有中文则转拼音

| 字段    | 描述                                                      | 类型     | 默认值 |
| ------- | --------------------------------------------------------- | -------- | ------ |
| url     | swagger 数据地址                                          | _string_ | --     |
| modules | 使用的的接口模块，对应`swagger.tags.name`, 不传则使用所有 | _string_ | --     |

##### 如何定义请求字段

- `普通注释`: 接口描述或字段描述
- `@url`: 请求路径
- `@timeout`: 接口延时返回 单位毫秒
- `@introduce`: 接口额外的详细介绍
- `@value`: 基础类型字段的固定 mock 数据, 可以使用 mockjs 规则,规则前缀`@`改为`#`,例如#title、#date('YYYY-MM-DD')
- `@rule`: mock 复杂数据的规则，例如：19-20，生成数组数组 19 条或者 20 条
- 更多 mock 配置，请查看[mockjs](http://mockjs.com/)
- mockjs 官网域名到期可以前往[第三方博客-mockjs 使用介绍](https://www.jianshu.com/p/d812ce349265)

支持外部定义公共类型，例如请求结构，分页数据接口都是可以提取出来，像分页数据可以公共设置为 数据`rule`19-20， total 总数为 39，随机数据取测试页面里的分页功能

```typescript
/**
 * 获取用户列表信息
 * @url /z/common/user/list
 * @introduce 这是请求所有用户数据的接口
 * @timeout 1000
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
    pageNum: number
  }
  response: {
    /**
     * 成功
     **/
    success: boolean
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
         * 用户拥有的角色， 《注意字符需要双引号》
         * @value ["运营", "HR", "销售"]
         **/
        roles: string[]
        /**
         * 用户名称
         * @value #title
         **/
        userName: string
        /**
         * 枚举值字符 《注意字符需要双引号》
         * @value ["状态1", "状态2"]
         **/
        someone: string
        /**
         * 枚举值数字
         * @value [1, 2]
         **/
        someNum: number
      }[]
    }
  }
}
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


## Rapper 是什么？

Rapper 是 TypeScript 的最佳拍档，它可以帮你生成具有类型定义的请求方案。

- 无需自行书写请求代码，把 HTTP 接口当做函数调用
- 请求参数/返回数据类型化，静态校验、自动补全快到飞起



## @antmjs/rapper 是什么？
基于 Rapper 开发，使配置更灵活，同时增加本地类型同步远程文档重要功能
- ++++
- 本地接口类型上传到rapper远程文档，本地编码驱动远程文档
- 自定义请求函数模板，满足不同编程规范

## 快速开始
1. package.json scripts中 添加 
{ "rap" : "npx rapper"}

2.  配置antm.config.js
```js
{
  rapper: {
    // 拉取接口地址
    apiUrl?: string;
    /** rap 前端地址，默认是 http://rap2.taobao.org */
    rapUrl?: string;
    // 生成的文件目录地址
    rapperPath?: string;
    // rap登录cookie
    tokenCookie?: string;
    // rap项目id
    repositoryId?: number;
  }
}
```
3. 开始写你的ts接口类型, 然后执行 npm run rap


## rapper 名称对应 接口ts类型介绍

>ts接口类型需要配合rapper使用
* 暂时不支持url带path参数
> rapper接口字段名称对应 
```ts
interface XY {
  x: number;
  y: number;
  z: number;
}
export type IUserInfo = {
  request: { // (1)
    age?: string; // (2)
  };
  response: { // (3)
    /**
     *
     * @value true 
     */
    success: boolean;
    data: {
      /**
       * 数组演示 // (4)
       * @rule 123 // (6)
       */
      array: {
        /**
         * 名称
         * @value #cname // (5)
         */
         name: string;
        /**
         * 支持泛型以及接口引用
         */
        other: XY;
      }[];
    };
  };
};
```

以下是rapper中含义
* 1 [request] 请求参数定义;
* 2 [age?: string] 入参定义字段名称，必选，类型;
* 3 [response] 返回数据定义;
* 4 [jsDoc 描述： 数组演示] 字段简介
* 5 [jsDoc 关键字：@value #cname] 字段初始值
* 6 [jsDoc 关键字：@rule 123] 字段生成规则

> 注意 jsDoc 关键字的值中【@】符号由于转义问题需要替换成【#】或者【\\@】或者【/@】


## 文档


### 命令函入参会和config合并（命令行优先级更高）

* --u  上传
* --d  下载
* --m xx  指定moduleId，不传默认提交更改的模块
###  rapper 配置config   有三种方案

* 方案一（推荐）

  通过antm.config.js配置config

    ```js
    <!-- antm.config.js文件 -->
    const antmRapper = require('@antmjs/rapper')
    <!--  使用antm 提供 defineConfig 会有类型提示 -->
    export.default = antmRapper.defineConfig({
      upload: { xx: xx }, // 本地上传 配置
    })
    ```
* 方案二
    通过 命令行参数执行config 路径
    ```bash
      $ npx rapper --config  ./config/index.js
    ```
   
    ```js
    <!-- ./config/index.js文件 -->
    const antmRapper = require('@antmjs/rapper')
    <!--  antmRapper 提供 defineConfig 会有类型提示 -->
    export.default = antmRapper.defineConfig({
      upload: { xx: xx }, // 本地上传 配置
      download: { xx: xx } // 远程下载 配置
    })
    ```



* 方案三
  通过 package.json 配置 antm.rapper


    ```js
    <!--package.json  文件  -->
    {
      'antm': {
      'rapper': {
        'upload': { xx: xx }, // 本地上传 配置
      }
    }
    }
    ```


## 本地代码类型同步到远程raper文档
* 解析本地文件
* fetch 方法追加注释 （接口id  接口模块id）
* 格式化 类型
* 调用rapper 接口

## 增量更新实现
* 每次更新会给文件头部 加一个 MD5值
* 初始化会检查合法的文件（符合formatFunc  结构的文件） MD5值 对不住
* 去解析当前文件以及 依赖当前文件的文件
* 提交变更的模块接口（文件级检查）,做不到方法级检查
## config 接口类型
```ts


interface IConfig {
  // 下载配置
  download: {
    /**
     *
     * @param params   rap上填入接口的信息
     * @returns
     * reqTypeName: request类型名称;
     * resTypeName: response类型名称;
     * funcMain: 请求函数体;
     */
    requestFunc?: (params: {
      funcDescription: string;
      repositoryId: number;
      moduleId: number;
      interfaceId: number;
      requestUrl: string;
      requestMethod: string;
      rapUrl: string;
    }) => {
      reqTypeName: string;
      resTypeName: string;
      funcMain: string;
    };
    /**
     *
     * @param params   rap 上填入的module信息
     * @returns
     * fileName: 模块的文件名称;
     * moduleHeader: 模块头部的banner;
     */
    requestModule?: (params: {
      repositoryId: number;
      moduleId: number;
      moduleRapUrl: string;
      moduleDescription: string;
    }) => {
      fileName: string;
      moduleHeader: string;
    };
    // 自定下载的module
    moduleId?: number;
  };
  rapper: {
    // 拉取接口地址
    apiUrl?: string;
    /** rap 前端地址，默认是 http://rap2.taobao.org */
    rapUrl?: string;
    // 生成的文件目录地址
    rapperPath?: string;
    // rap登录cookie
    tokenCookie?: string;
    // rap项目id
    repositoryId?: number;
  };
  upload: {
    //  模式 type 文件扫描入口是type（需要编译生成fetch)
    //  fetch 文件扫描入口是fetch请求函数（不需要编译）
    mode?: 'type' | 'fetch';
    // 需要解析的文件名称正则
    fileRegex?: string;
    /**
     *
     * @param params  函数信息
     * @returns
     *  resTypeName: request 类型名称;
     * reqTypeName: response  类型名称;
     * reqUrl: 请求 url;
     * reqMethod: 请求method;
     * interfaceId: 接口id;
     */
    formatFunc?: (params: {
      funcName: string;
      body: string;
      comment: string;
      // 三种函数 定义 会被选中到导出
      funcType: 'CallExpression' | 'FunctionDeclaration' | 'ArrowFunction';
    }) => {
      resTypeName: string;
      reqTypeName: string;
      reqUrl: string;
      reqMethod: string;
      interfaceId: number;
    } | null;
    // 指定下载的 模块id
    moduleId?: number;
    // webpack 别名
    alias?: Record<string, string>;
  };
  // 内部标识使用 不用管
  __completion?: boolean;
  // 是不是上传
  isUpload: boolean;
}


export type IOptions = Partial<IConfig>

```

## defaultConfig 会和传进来的config合并补全

```js
   const defaultOptions = {
    download: {
      //请求 function 模板
      requestFunc(params) {
        function getFnName(url: string): null | string {
          const fnName = url.match(/\/([.a-z0-9_-]+)\/([a-z0-9_-]+$)/i);
          if (fnName && fnName.length === 3) {
            if (/^\d+\.\d+$/.test(fnName[1])) {
              return fnName[2];
            }
            return fnName[1] + fnName[2].charAt(0).toUpperCase() + fnName[2].slice(1);
          }
          return null;
        }
        const fnName = getFnName(params.requestUrl);
        if (!fnName) {
          throw new TypeError('接口路径不对,请修改合规');
        }
        const camelCaseName = `${fnName.charAt(0).toUpperCase()}${fnName.slice(1)}`;
        const reqTypeName = `IReq${camelCaseName}`;
        const resTypeName = `IRes${camelCaseName}`;
        return {
          reqTypeName,
          resTypeName,
          funcMain: `
              /**
               * 接口名：${params.funcDescription}
               * Rap 地址: ${params.rapUrl}?id=${params.repositoryId}&mod=${params.moduleId}&itf=${params.interfaceId}
               */
              export const ${fnName} = createFetch<${reqTypeName}, ${resTypeName}>('${params.requestUrl}', '${params.requestMethod}')
              `,
        };
      },
      //请求 函数共工头（用于引入函数
      requestModule(params) {
        return {
          fileName: params.moduleDescription,
          moduleHeader: `
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

import instance from '@/utils/request'

function createFetch<REQ extends Record<string, unknown>, RES extends {data: any}> (url: string, method: string) {
  return  <T extends boolean = false>(
    data: REQ,
    options?: {
      proxy?: T
      pageError?: boolean
    }
  ): Promise<T extends true ? RES['data'] : RES> => {
    return instance(
      {
        url,
        method,
        data,
      },
      options
    )
  }
}
`,
        };
      },
    },
    rapper: {
      // 拉取接口地址
      apiUrl:
        'http://rap2api.taobao.org/repository/get?id=284428&token=TTDNJ7gvXgy9R-9axC-7_mbi4ZxEPlp6',
      /** rap 前端地址，默认是 http://rap2.taobao.org */
      rapUrl: 'http://rap2.taobao.org',

      rapperPath: './src/actions',
      tokenCookie:
        'aliyungf_tc=f3a5915db08fc3b6de3ec5df0d0b3a5dc07c0b701e44cf4bf98a855799570bfe; koa.sid=2I353u8TTwtrHSdPXdJ9t8Mx5lTOeQFV; koa.sid.sig=D4vYLNcryQ8vcU4GkJJknTi_Fm8',
      repositoryId: 284428,
    },
    upload: {
      mode: 'type' as const,
      // fileRegex 将尝试使用绝对文件路径检测测试文件
      // (/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$
      fileRegex: './src/actions/types/.*(js|jsx|ts|tsx)',

      formatFunc(params) {
        // createFetch<IReqGoodsQbf, IResGoodsQbf>('/c/api/1.0/approve/goods/qbf', 'GET')
        // export const goodsQbf = createFetch<IGoodsQbf['request'], IGoodsQbf['response']>("/c/api/1.0/approve/goods/qbf", "GET");
        const [_, reqTypeName, resTypeName, reqUrl, reqMethod] =
          params.body.match(
            /createFetch<([\w\[\]'"]+),\s+([\w\[\]'"]+)>\(['"]([\s\S]+)['"], ['"]([a-zA-Z]+)['"]\)/,
          ) || [];
        if (!reqTypeName || !resTypeName) {
          return null;
        }
        const matchInterfaceId = params.comment.match(/http:\/\/rap2\.tao[\s\S]+&itf=(\d+)/);
        return {
          resTypeName,
          reqTypeName,
          // 如果返回 null '' undefined 0 等 就会被认为是新的接口，会触发上rap操作
          interfaceId: matchInterfaceId ? Number(matchInterfaceId[1]) : null,
          reqUrl: reqUrl,
          reqMethod: reqMethod,
        };
      },
      // webpack 别名 alias 绝对路径
      alias: {
        '@': './src',
      },
    },
    isUpload: true,
  };
    ```

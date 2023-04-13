import * as path from 'path'
import { searchRootPath } from './../utils'
function completionOptions(options: IOptions = { download: {}, upload: {} }) {
  const defaultOptions = {
    download: {
      //请求 function 模板
      requestFunc(params: {
        funcDescription: string
        repositoryId: number
        moduleId: number
        interfaceId: number
        requestUrl: string
        requestMethod: string
        rapUrl: string
      }) {
        function getFnName(url: string): null | string {
          const fnName = url.match(/\/([.a-z0-9_-]+)\/([a-z0-9_-]+$)/i) as any[]
          if (fnName && fnName.length === 3) {
            if (/^\d+\.\d+$/.test(fnName[1])) {
              return fnName[2]
            }
            return (
              fnName[1] + fnName[2].charAt(0).toUpperCase() + fnName[2].slice(1)
            )
          }
          return null
        }
        const fnName = getFnName(params.requestUrl)
        if (!fnName) {
          throw new TypeError('接口路径不对,请修改合规')
        }
        const camelCaseName = `${fnName.charAt(0).toUpperCase()}${fnName.slice(
          1,
        )}`
        const reqTypeName = `IReq${camelCaseName}`
        const resTypeName = `IRes${camelCaseName}`
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
        }
      },
      //请求 函数共工头（用于引入函数
      requestModule(params: {
        repositoryId: number
        moduleId: number
        moduleRapUrl: string
        moduleDescription: string
      }) {
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
        }
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

      formatFunc(params: {
        funcName: string
        body: string
        comment: string
        // 三种函数 定义 会被选中到导出
        funcType: 'CallExpression' | 'FunctionDeclaration' | 'ArrowFunction'
      }) {
        // createFetch<IReqGoodsQbf, IResGoodsQbf>('/c/api/1.0/approve/goods/qbf', 'GET')
        // export const goodsQbf = createFetch<IGoodsQbf['request'], IGoodsQbf['response']>("/c/api/1.0/approve/goods/qbf", "GET");
        const [_, reqTypeName, resTypeName, reqUrl, reqMethod] =
          params.body.match(
            /createFetch<([\w\[\]'"]+),\s+([\w\[\]'"]+)>\(['"]([\s\S]+)['"], ['"]([a-zA-Z]+)['"]\)/,
          ) || []
        if (!reqTypeName || !resTypeName) {
          return null
        }
        const matchInterfaceId = params.comment.match(
          /http:\/\/rap2\.tao[\s\S]+&itf=(\d+)/,
        )
        return {
          resTypeName,
          reqTypeName,
          // 如果返回 null '' undefined 0 等 就会被认为是新的接口，会触发上rap操作
          interfaceId: matchInterfaceId ? Number(matchInterfaceId[1]) : null,
          reqUrl: reqUrl,
          reqMethod: reqMethod,
        }
      },
      // webpack 别名 alias 绝对路径
      alias: {
        '@': './src',
      },
    },
    isUpload: true,
  }

  const _options: IOptions | any = {}
  _options.download = {
    ...defaultOptions.download,
    ...(options.download || {}),
  }
  _options.upload = {
    ...defaultOptions.upload,
    ...(options.upload || {}),
  }
  _options.isUpload =
    typeof _options.isUpload === 'boolean'
      ? _options.isUpload
      : defaultOptions.isUpload

  _options.rapper = {
    ...defaultOptions.rapper,
    ...(options.rapper || {}),
  }

  _options.__completion = true

  const rootPath = searchRootPath()
  if (!rootPath) {
    process.exit(1)
  }

  // _options.upload.matchDir = path.resolve(rootPath, _options.upload.matchDir)
  _options.rapper.rapperPath = path.resolve(
    rootPath,
    _options.rapper.rapperPath,
  )
  _options.upload.fileRegex = path.resolve(rootPath, _options.upload.fileRegex)

  const alias = _options.upload.alias
  for (const v in alias) {
    _options.upload.alias[v] = path.resolve(rootPath, alias[v])
  }

  return _options
}

// 文件缓存  增速

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
      funcDescription: string
      repositoryId: number
      moduleId: number
      interfaceId: number
      requestUrl: string
      requestMethod: string
      rapUrl: string
    }) => {
      reqTypeName: string
      resTypeName: string
      funcMain: string
    }
    /**
     *
     * @param params   rap 上填入的module信息
     * @returns
     * fileName: 模块的文件名称;
     * moduleHeader: 模块头部的banner;
     */
    requestModule?: (params: {
      repositoryId: number
      moduleId: number
      moduleRapUrl: string
      moduleDescription: string
    }) => {
      fileName: string
      moduleHeader: string
    }
    // 自定下载的module
    moduleId?: number
  }
  rapper: {
    // 拉取接口地址
    apiUrl?: string
    /** rap 前端地址，默认是 http://rap2.taobao.org */
    rapUrl?: string
    // 生成的文件目录地址
    rapperPath?: string
    // rap登录cookie
    tokenCookie?: string
    // rap项目id
    repositoryId?: number
  }
  upload: {
    // moduleUpdate: 'create' | 'update'
    //  模式 type 文件扫描入口是type（需要编译生成fetch)
    //  fetch 文件扫描入口是fetch请求函数（不需要编译）
    mode?: 'type' | 'fetch'
    // 需要解析的文件名称正则
    fileRegex?: string
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
      funcName: string
      body: string
      comment: string
      // 三种函数 定义 会被选中到导出
      funcType: 'CallExpression' | 'FunctionDeclaration' | 'ArrowFunction'
    }) => {
      resTypeName: string
      reqTypeName: string
      reqUrl: string
      reqMethod: string
      interfaceId: number
    } | null
    // 指定下载的 模块id
    moduleId?: number
    // webpack 别名
    alias?: Record<string, string>
  }
  // 内部标识使用 不用管
  __completion?: boolean
  // 是不是上传
  isUpload: boolean
}

export type IOptions = Partial<IConfig>

export default function defineConfig(options: IOptions, completion = true) {
  if (completion && options.__completion) {
    return options
  }
  return completionOptions(options)
}

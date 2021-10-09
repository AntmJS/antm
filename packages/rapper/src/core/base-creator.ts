import type { Intf, IGeneratedCode, ICreatorExtr } from '../../types/index.d'
import chalk from 'chalk'
import { getPackageName } from '../utils'
import convert from './convert'
import { creatInterfaceHelpStr } from './tools'

import { IOptions } from './../typeSync/mergeOptions'
const packageName = getPackageName()

/** 生成 Models 文件 */
export async function createModel(
  interfaces: Array<Intf>,
  extr: ICreatorExtr,
  config: IOptions,
) {
  return await Promise.all(
    interfaces.map(async (itf) => {
      try {
        const [reqItf, resItf] = await convert(itf)
        const ReqType = reqItf!
          .replace(/export (type|interface) Req =?/, '')
          .replace(/;/g, '')
          .replace(/\s?{}\s?/g, 'Record<string, unknown>')
        const ResType = resItf!
          .replace(/export (type|interface) Res =?/, '')
          .replace(/\s?{}\s?/g, 'Record<string, unknown>')

        const { reqTypeName, resTypeName, funcMain } = config!.download!
          .requestFunc!({
          funcDescription: itf.name,
          repositoryId: itf.repositoryId,
          moduleId: itf.moduleId,
          interfaceId: itf.id,
          rapUrl: `${extr.rapUrl}/repository/editor`,
          requestMethod: itf.method,
          requestUrl: `${itf.url}`,
        })
        const tsInterface = `
          ${creatInterfaceHelpStr(extr.rapUrl, itf)}
          export type ${reqTypeName} = ${ReqType}
          export type ${resTypeName} = ${ResType}
        `
        const tsInterfaceName = [reqTypeName, resTypeName]
        const tsCode = `
        ${funcMain}
          `
        return {
          tsInterface,
          tsCode,
          tsInterfaceName,
        }
      } catch (error) {
        throw chalk.red(`接口：${extr.rapUrl}/repository/editor?id=${itf.repositoryId}&mod=${itf.moduleId}&itf=${itf.id}
          生成出错
          ${error}`)
      }
    }),
  )
}

/** 生成 IResponseTypes */
export function createResponseTypes(interfaces: Array<Intf>) {
  return `
    export interface IResponseTypes {
      ${interfaces.map(
        ({ modelName }) => `
        '${modelName}': ResSelector<IModels['${modelName}']['Res']>
      `,
      )}
    }
  `
}

// // 创建门店

export async function createBaseRequestStr(
  interfaces: Array<Intf>,
  extr: ICreatorExtr,
  config: IOptions,
) {
  const modelArr = await createModel(interfaces, extr, config)
  const tsInterfaceStr = modelArr.map((e) => e.tsInterface).join('\n\n')
  const tsCodeStr = modelArr.map((e) => e.tsCode).join('\n\n')
  const tsInterfaceNames: string[] = modelArr.reduce((p: any[], c) => {
    return p.concat(c.tsInterfaceName)
  }, [])
  return {
    tsInterfaceStr: `
    /* eslint-disable */
    ${tsInterfaceStr}
    `,
    tsCodeStr,
    tsInterfaceNames,
  }
}

export function createBaseIndexCode(): IGeneratedCode {
  return {
    import: `
      import { createFetch, IModels } from './request'
      import * as commonLib from '${packageName}/runtime/commonLib'
    `,
    body: `
      const { defaultFetch } = commonLib
      let fetch = createFetch({}, { fetchType: commonLib.FetchType.BASE })
    `,
    export: `
      export const overrideFetch = (fetchConfig: commonLib.RequesterOption) => {
        fetch = createFetch(fetchConfig, { fetchType: commonLib.FetchType.AUTO })
      }
      export { fetch, createFetch, defaultFetch }
      export type Models = IModels
    `,
  }
}

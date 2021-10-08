/* md5: b46d8583448fe64f1f5696b8f60789b0 */
/* Rap仓库ModuleId: 479542 */ 
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

import type {IReqUser, IResUser, IReqUserType, IResUserType} from './types/userType.ts'
import instance from '@/utils/request'
function createFetch<REQ extends Record<string, unknown>, RES extends {data: any}>(url: string, method: string) {
  return <T extends boolean = false>(
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

/**
* 接口名：查询用户
* Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=479542&itf=2091279
*/
export const findUser = createFetch<IReqUser, IResUser>('/c/b/w/api/2.0/user', 'GET')

/**
* 接口名：删除用户
* Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=479542&itf=2091278
*/
export const removeUser = createFetch<IReqUserType, IResUserType>('/c/b/w/api/1.0/user/type', 'GET')

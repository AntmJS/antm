/* Rap仓库ModuleId: 487580 */

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

import type { IUserInfo2, IUserInfo, IResGoodsAudit, getRouters } from '@/actions/types/testTypeDemo';
  
/**
 * 接口名：结口3
 * Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=487580&itf=2134019
 */
export const iUserInfo2TestTypeDemo = createFetch<IUserInfo2['request'], IUserInfo2['response']>('/c/b/w/api/1.0/user', 'GET');

/**
 * 接口名：结口1
 * Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=487580&itf=2134020
 */
export const iUserInfoTestTypeDemo = createFetch<IUserInfo['request'], IUserInfo['response']>('/c/b/w/api/1.0/user', 'GET');

/**
 * 接口名：接口2
 * Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=487580&itf=2133696
 */
export const iResGoodsAuditTestTypeDemo = createFetch<IResGoodsAudit['request'], IResGoodsAudit['response']>('/c/b/w/api/1.0/user/9', 'POST');

/**
 * 接口名：我是刚刚新建的接口
 * Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=487580&itf=2133697
 */
export const getRoutersTestTypeDemo = createFetch<getRouters['request'], getRouters['response']>('/c/b/w/api/1.0/router/6', 'POST');

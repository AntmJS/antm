/* Rap仓库ModuleId: 486617 */

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

import type { IUserInfo, IResGoodsAudit, getRouters } from "@/actions/types/testTypeDemo.ts";
  
/**
 * 接口名：结口1
 * Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=486617&itf=2128383
 */
export const iUserInfoTestTypeDemo = createFetch<IUserInfo['request'], IUserInfo['response']>("/c/b/w/api/1.0/user", "GET");

/**
 * 接口名：接口2
 * Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=486617&itf=2128384
 */
export const iResGoodsAuditTestTypeDemo = createFetch<IResGoodsAudit['request'], IResGoodsAudit['response']>("/c/b/w/api/1.0/user/9", "POST");

/**
 * 接口名：我是刚刚新建的接口
 * Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=486617&itf=2128385
 */
export const getRoutersTestTypeDemo = createFetch<getRouters['request'], getRouters['response']>("/c/b/w/api/1.0/router/6", "POST");

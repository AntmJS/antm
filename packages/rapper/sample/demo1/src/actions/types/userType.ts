/* md5: 48fdc74eec4bcee463f53ab0e7b829b8 */
/* eslint-disable */

/**
 * 接口名：我是描述
 * Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=477847&itf=2081705
 */
export type IReqUser = {
  age: string
  sex?: string
  /**
   * 新加的2
   */
  goods?: {
    arr: {
      count: string
      name: string
    }
  }
  goods2: {
    count: string
    name: string
  }
}

export type IResUser = {
  /**
   *
   * @value true
   */
  success: boolean
  data: {
    /**
     * 数组演示
     * @rule 5
     */
    array: {
      /**
       * n名称
       * @value /@cname
       */
      name: string
      /**
       * 年纪er
       * @value /@increment(10)
       */
      age: string
      /**
       * 心别
       * @value /@increment(10)
       */
      sex: number
    }[]
  }
  /**
   *
   * @value 0
   */
  code: number
}

/**
 * 接口名：我是描述2
 * Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=477847&itf=2081706
 */
export type IReqUserType = {
  shape: {
    size: number
  }
  point: {
    x: number
    y: number
    z: number
  }
  radius: number
}

export type IResUserType = {
  data: {
    shape: {
      size: number
    }
    point: {
      x: number
      y: number
      z: number
    }
    radius: number
  }
  success: boolean
}

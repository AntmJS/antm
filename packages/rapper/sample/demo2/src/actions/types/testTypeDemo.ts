/* md5: 2739ab5cb72c940356eda8e20afb9f71 */
/* Rap仓库ModuleId: 487580 */
interface XY {
  x: number
  y: number
  z: number
}

interface Shape {
  size: number
}

interface Circle {
  shape: Shape
  point: XY
  radius: number
}

type IGetRES<T> = {
  data: T
  /**
   * 成功
   * @value  true
   **/
  success: boolean
}

/**
 *  结口3
 * @url /c/b/w/api/1.0/user
 * @method GET
 * @rapUrl http://rap2.taobao.org/repository/editor?id=284428&mod=487580&itf=2134019
 */
export type IUserInfo2 = {
  request: {
    age: string
    sex?: string
  }
  response: Record<string, unknown>
}

/**
 *  结口1
 * @url /c/b/w/api/1.0/user
 * @method GET
 * @rapUrl http://rap2.taobao.org/repository/editor?id=284428&mod=487580&itf=2134020
 */
export type IUserInfo = {
  request: {
    age: string
    sex?: string
  }
  response: {
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
         * 名称
         * @value #cname
         */
        name: string
        /**
         * 年纪
         * @value \@increment(10)
         */
        age: string
        /**
         * 性别
         * @value \@increment(10)
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
}

export type IReqGoodsAudit = Record<string, unknown>

interface IList {
  /**
   * 我是name
   * @value #cname
   */
  name: string
  /**
   * 我是id
   * @value /@id
   */
  id: number
}

/**
 *  接口2
 * @url /c/b/w/api/1.0/user/9
 * @method POST
 * @rapUrl http://rap2.taobao.org/repository/editor?id=284428&mod=487580&itf=2133696
 */
export type IResGoodsAudit = {
  request: Circle
  //
  // response: IGetRES<Circle>;
  // 修改
  response: IGetRES<{
    /**
     * 我是列表
     * @rule 23
     */
    list: IList[]
    /**
     * 总数
     * @value 500
     */
    total: number
  }>
}

// 新建
/**
 * 我是刚刚新建的接口
 * @url /c/b/w/api/1.0/router/6
 * @method POST
 * @rapUrl http://rap2.taobao.org/repository/editor?id=284428&mod=487580&itf=2133697
 */
export type getRouters = {
  request: Circle
  response: IGetRES<Circle>
}

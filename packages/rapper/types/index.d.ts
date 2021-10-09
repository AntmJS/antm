declare namespace Rapper {
  interface IProperty {
    id: number
    scope: string
    type: string
    pos: number
    name: string
    rule?: string
    value: string
    description: string
    parentId: number
    priority: number
    interfaceId: number
    creatorId: number
    moduleId: number
    repositoryId: number
    required: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt?: any
  }

  interface IRoot {
    id: number
    name: string
    url: string
    method: string
    description: string
    priority: number
    status: number
    creatorId: number
    lockerId?: any
    moduleId: number
    repositoryId: number
    createdAt: Date
    updatedAt: Date
    deletedAt?: any
    locker?: any
    properties: Array<IProperty>
  }
}

declare type Intf = Rapper.IRoot & { modelName: string }

declare interface IModules {
  id: number
  name: string
  description: string
  priority: number
  creatorId: number
  repositoryId: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
  interfaces: Array<Intf>
}

declare interface ICollaborator {
  id: number
  name: string
  token: string
  description: string
  logo?: any
  visibility: boolean
  ownerId: number
  organizationId?: any
  creatorId: number
  lockerId?: any
  createdAt: Date
  updatedAt: Date
  deletedAt?: any
}

/** url 匹配函数 */
declare interface IUrlMapper {
  (url: string): string
}

/** 生成模板类型 */
declare type RAPPER_TYPE = 'normal' | 'redux'

/** 句尾逗号 */
declare enum TRAILING_COMMA {
  NONE = 'none',
  ALL = 'all',
  ES5 = 'es5',
}

/** 生成出的代码 */
declare interface IGeneratedCode {
  /** 顶部 import */
  import: string
  body: string
  export: string
}

/** create 函数的参数 */
declare interface ICreatorExtr {
  rapUrl: string
  resSelector: string
}

export {
  Intf,
  IModules,
  ICollaborator,
  IUrlMapper,
  RAPPER_TYPE,
  TRAILING_COMMA,
  IGeneratedCode,
  ICreatorExtr,
}
export default Rapper

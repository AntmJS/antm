import { URL } from 'url'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fetch from 'node-fetch' // 更新接口
export function updateInterface(
  params: { properties: any; id: number },
  codePosition: string,
  apiUrl: string,
  cookie: string,
): Promise<any> {
  return fetch(`${new URL(apiUrl).origin}/properties/update?itf=${params.id}`, {
    headers: {
      'content-type': 'application/json',
      cookie,
    },
    body: JSON.stringify({
      properties: params.properties,
      summary: { bodyOption: 'FORM_DATA', posFilter: 2 },
    }),
    method: 'POST',
  })
    .then(
      (e: {
        status: number
        statusText: string | undefined
        json: () => any
      }) => {
        if (e.status !== 200) {
          if (e.status === 500) {
            throw new Error(`${codePosition}远程接口不存在`)
          }
          throw new Error(e.statusText)
        }
        return e.json()
      },
    )
    .then((e: { isOk: any; data: any; errMsg: any }) => {
      if (e.isOk || e.data) {
        return e.data
      } else {
        throw e.errMsg
      }
    })

    .catch((err: any) => {
      throw err
    })
}

// 创建接口
export async function createInterface(
  params: {
    name: string
    url: string
    method: string
    description?: string
    moduleId: number
    repositoryId: number
  },
  apiUrl: string,
  cookie: string,
) {
  const data = await fetch(`${new URL(apiUrl).origin}/interface/create`, {
    headers: {
      'content-type': 'application/json',
      cookie,
    },
    body: JSON.stringify(params),
    method: 'POST',
  })
    .then(
      (e: {
        status: number
        statusText: string | undefined
        json: () => any
      }) => {
        if (e.status !== 200) {
          throw new Error(e.statusText)
        }
        return e.json()
      },
    )
    .then((e: { isOk: any; data: any; errMsg: any }) => {
      if (e.isOk || e.data) {
        return e.data
      } else {
        throw e.errMsg
      }
    })
    .catch((err: any) => {
      throw err
    })
  return data
}

// 删除接口
export function deleteInterface(
  { id }: { id: number },
  apiUrl: string,
  cookie: string,
) {
  return fetch(`${new URL(apiUrl).origin}/interface/remove?id=${id}`, {
    headers: {
      cookie,
    },
    method: 'GET',
  })
    .then(
      (e: {
        status: number
        statusText: string | undefined
        json: () => any
      }) => {
        if (e.status !== 200) {
          throw new Error(e.statusText)
        }
        return e.json()
      },
    )
    .then((e: { isOk: any; data: any; errMsg: string | undefined }) => {
      if (e.isOk || e.data) {
      } else {
        throw new Error(e.errMsg)
      }
    })

    .catch((err: string | undefined) => {
      throw new Error(err)
    })
}

// 删除模块
export function deleteModule(
  { id }: { id: number },
  apiUrl: string,
  cookie: string,
) {
  return fetch(`${new URL(apiUrl).origin}/module/remove?id=${id}`, {
    headers: {
      'content-type': 'application/json',
      cookie,
    },
    method: 'GET',
  })
    .then(
      (e: {
        status: number
        statusText: string | undefined
        json: () => any
      }) => {
        if (e.status !== 200) {
          throw new Error(e.statusText)
        }
        return e.json()
      },
    )
    .then((e: { isOk: any; data: any; errMsg: string | undefined }) => {
      if (e.isOk || e.data) {
      } else {
        throw new Error(e.errMsg)
      }
    })

    .catch((err: any) => {
      // console.log(err, '接口报错')
      throw err
    })
}

// 创建模块
export async function createModule(
  params: {
    description: string
    name: string
    repositoryId: number
  },
  apiUrl: string,
  cookie: string,
): Promise<any> {
  const data = await fetch(`${new URL(apiUrl).origin}/module/create`, {
    headers: {
      'content-type': 'application/json',
      cookie,
    },
    body: JSON.stringify(params),
    method: 'POST',
  })
    .then(
      (e: {
        status: number
        statusText: string | undefined
        json: () => any
      }) => {
        if (e.status !== 200) {
          throw new Error(e.statusText)
        }
        return e.json()
      },
    )
    .then((e: { isOk: any; data: any; errMsg: any }) => {
      if (e.isOk || e.data) {
        return e.data
      } else {
        throw e.errMsg
      }
    })

    .catch((err: string | undefined) => {
      throw new Error(err)
    })
  return data
}

export default function versionCompatible(dna: {
  data: Record<string, any>
  requestParams?: Record<string, any>
  responseData?: Record<string, any>
}): any {
  const { data, requestParams, responseData } = dna
  const swaggerVersion = data['swagger'] || data['openapi']
  let definitions = []
  let pathsRequestParams: any = undefined
  let pathsResponseData: any = undefined

  if (/^3\./.test(swaggerVersion)) {
    definitions = data['components']['schemas']
    if (requestParams) {
      pathsRequestParams =
        requestParams['requestBody']?.['content']?.['application/json'] ||
        requestParams['requestBody']?.['content']?.['text/json']
    }
    if (responseData) {
      pathsResponseData =
        responseData?.['responses']?.['200']?.['content']?.[
          'application/json'
        ] || responseData?.['responses']?.['200']?.['content']?.['text/json']
    }
  } else if (/^2\./.test(swaggerVersion)) {
    definitions = data['definitions']
    if (requestParams) {
      pathsRequestParams = filterRepeatName(requestParams['parameters'])
    }

    if (responseData) {
      pathsResponseData = responseData?.['responses']?.['200']
    }
  }

  return {
    definitions,
    pathsRequestParams,
    pathsResponseData,
  }
}
// 低版本有可能有重复申明的请求字段类型
function filterRepeatName(arr?: any) {
  const keys: any[] = []
  const newArr: any[] = []

  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      if (!keys.includes(arr[i].name)) {
        newArr.push(arr[i])
        keys.push(arr[i].name)
      }
    }
  }

  return newArr
}

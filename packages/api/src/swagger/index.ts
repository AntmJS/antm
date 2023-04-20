import getConfig from '../config/getConfig'
import log from '../log'
import file from '../file'
import { transform } from './transform'
import { fetchData } from './fetch'

type Iprops = {
  url?: string
  path?: string
  modules?: string
  action?: boolean
}

export default async function swagger(props: Iprops) {
  const { path, modules, action } = props
  const config = getConfig()
  const url = props.url || config?.swagger?.url
  const path_ = path || config?.path || 'src/actions/types'
  const modules_ = modules ? modules.split(',') : config?.swagger?.modules
  if (!url) {
    log.error('can not get swagger url')
    return
  }

  console.info(log.tips('开始获取swagger数据'))

  const swaggerData: any = await fetchData(url)
  const swaggerVersion = swaggerData['swagger'] || swaggerData['openapi']
  const publicTypes =
    swaggerData['definitions'] || swaggerData['components']['schemas']

  console.info(
    log.success(`
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
swagger data                                                    +
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ 🚀 swagger版本: ${swaggerVersion}                        
+ 🚴‍♀️ 接口模块数: ${swaggerData['tags'].length}                      
+ 🚗 接口数: ${Object.keys(swaggerData['paths']).length}           
+ 🚄 公共类型数: ${Object.keys(publicTypes).length}  
+ 🐘 执行模块: ${modules_ ? modules_.join(`, `) : '所有模块'}          
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
`),
  )
  await transform(swaggerData, path_, modules_)
  // 选择创建请求方法时，才执行file生成请求方法和ts的ast描述
  if (action) {
    setTimeout(() => {
      file({
        path: path_,
        action: action,
        forceUpdate: true,
      })
    })
  }
}

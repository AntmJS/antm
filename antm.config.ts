import { join } from 'path'
import { defineConfig, IDocMenuNavs } from '@antmjs/types'

const CWD = process.cwd()

// 在根目录创建".webhooks.js", 设置 webhooks.token :  { token: xxx }

export default defineConfig({
  warning: {
    monitorFiles: [
      './packages/[!node_modules]**/package.json',
      './package.json',
    ],
    webhooks: {
      url: `https://oapi.dingtalk.com/robot/send?access_token=${require('./.webhooks.js')}`,
    },
  },
  docs: {
    title: 'antmjs',
    src: join(CWD, './packages'),
    route: {
      exclude: [join(CWD, './packages/doc/**/*.md')],
    },
    menu: getMenus(),
  },
})

function getMenus(): IDocMenuNavs {
  return [
    {
      name: '使用指南',
      items: [
        {
          path: 'introduce',
          title: '介绍',
        },
      ],
    },
  ]
}

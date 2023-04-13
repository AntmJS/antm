import { join } from 'path'
import { defineConfig, IDocMenuNavs } from '@antmjs/types'

const CWD = process.cwd()

export default defineConfig({
  warning: {
    monitorFiles: [
      './packages/[!node_modules]**/package.json',
      './package.json',
    ],
    webhooks: {
      url: 'https://oapi.dingtalk.com/robot/send?access_token=c2ca61d59a4e22f5d60b8d841494ab5ab570ec190accb16bbee10562092c8fe8',
    },
  },
  docs: {
    title: 'antmjs',
    src: join(CWD, './packages'),
    route: {
      exclude: [join(CWD, './packages/doc/*'), join(CWD, './packages/types/*')],
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

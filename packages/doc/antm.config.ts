import type { IDocMenuNavs } from '@antmjs/types'
import path from 'path'
import { defineConfig } from '@antmjs/types'
import pkg from './package.json'

export default defineConfig({
  docs: {
    title: 'antm.js Doc',
    src: path.resolve(process.cwd(), './docs'),
    buildPort: 7676,
    globalStyles: [path.resolve(process.cwd(), './theme.less')],
    logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
    route: {
      level: 1,
    },
    headerLinks: [
      {
        title: 'https://b.yzcdn.cn/vant/logo/github.svg',
        url: 'https://github.com/AntmJS/antm/tree/main/packages/doc',
        type: 'img',
      },
      {
        title: '更多',
        type: 'select',
        options: [
          {
            title: 'antmjs',
            url: 'https://antmjs.github.io/antm/main/',
          },
          {
            title: 'antmjs Vantui',
            url: 'https://antmjs.github.io/vantui',
          },
        ],
      },
      {
        title: `v${pkg.version}`,
        url: '',
        type: 'text',
      },
    ],
    menu: createMenu(),
    // simulator: {
    //   url: {
    //     production: 'xx',
    //     development: 'xxx',
    //   },
    // },
  },
})

function createMenu(): IDocMenuNavs {
  return [
    {
      name: '使用指南',
      items: [
        {
          title: '介绍',
          path: 'introduce',
        },
        {
          title: '快速开始',
          path: 'quick',
        },
      ],
    },
    {
      name: '基础功能',
      items: [
        {
          title: '基本配置',
          path: 'base',
        },
        {
          title: '约定式路由',
          path: 'route',
        },
        {
          title: '全局样式',
          path: 'style',
        },
      ],
    },
    {
      name: '高级功能',
      items: [
        {
          title: 'markdown语法扩展',
          path: 'markdown-expand',
        },
      ],
    },
  ]
}

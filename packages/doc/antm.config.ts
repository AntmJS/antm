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
        title: {
          CN: '更多',
          EN: 'more',
        },
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
    i18n: {
      langs: ['CN', 'EN'],
      noSuffixLang: 'CN',
    },
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
      name: {
        CN: '使用指南',
        EN: 'Guide',
      },
      items: [
        {
          title: {
            CN: '介绍',
            EN: 'introduce',
          },
          path: 'introduce',
        },
        {
          title: {
            CN: '快速开始',
            EN: 'quick',
          },
          path: 'quick',
        },
      ],
    },
    {
      name: {
        CN: '基础功能',
        EN: 'Base Feature',
      },
      items: [
        {
          title: {
            CN: '基本配置',
            EN: 'base config ',
          },
          path: 'base',
        },
        {
          title: {
            EN: 'convention route',
            CN: '约定式路由',
          },
          path: 'route',
        },
        {
          title: {
            CN: '国际化',
            EN: 'i18n',
          },
          path: 'i18n',
        },
        {
          title: {
            CN: '全局样式',
            EN: 'globale style',
          },
          path: 'style',
        },
      ],
    },
    {
      name: {
        CN: '高级功能',
        EN: 'Senior Feature',
      },
      items: [
        {
          title: {
            CN: 'markdown语法扩展',
            EN: 'markdown expand',
          },
          path: 'markdown-expand',
        },
      ],
    },
  ]
}

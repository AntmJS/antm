import type { IDocMenuNavs } from '@antmjs/types'

export const menu: IDocMenuNavs = [
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
      {
        title: {
          CN: '常见问题',
          EN: 'question',
        },
        path: 'question',
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
          CN: '组件库文档',
          EN: 'components doc',
        },
        path: 'components',
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
          CN: '广告投放',
          EN: 'Advertising placement',
        },
        path: 'advertisement',
      },
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

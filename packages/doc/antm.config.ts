import path from 'path'
import { defineConfig } from '@antmjs/types'
import pkg from './package.json'
import { menu } from './menu'

export default defineConfig({
  docs: {
    title: 'antm.js Doc',
    src: [
      path.resolve(process.cwd(), './docs'),
      path.resolve(process.cwd(), 'README.md'),
    ],
    buildPort: 7171,
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
    demoCode: {
      container: {
        react: path.join(process.cwd(), './docs/demo-i18n.tsx'),
        vue: path.join(process.cwd(), './docs/demo-i18n.tsx'),
      },
      dir: 'example',
    },
    menu: menu,
    advertisement: {
      title: '募捐',
      content: '感谢大家支持～',
      img: 'https://raw.githubusercontent.com/AntmJS/vantui/main/resource/abcd.png',
      termType: 'week',
    },
  },
})

import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import htmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import autoprefixer from 'autoprefixer'

import CreateBase from './createBase.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const cwd = process.cwd()

function resolveLoaderPath(url: string) {
  return path.join(__dirname, `../../node_modules/${url}`)
}

export default async function base() {
  const vantuiBase = await CreateBase()

  const config = {
    entry: {
      vant: path.join(__dirname, './vant.base.js'),
      index: {
        import: path.join(__dirname, '../../site/docs/index.js'),
        dependOn: 'vant',
      },
    },

    output: {
      filename: '[name]_[hash].js',
      path: path.join(cwd, vantuiBase.outDir || './site'),
    },

    stats: 'normal',

    resolve: {
      extensions: ['.js', '.json'],
    },

    module: {
      rules: [
        {
          test: /\.js|.ts|.tsx$/,
          loader: resolveLoaderPath('babel-loader'),
          exclude: /node_modules/,
          options: {
            presets: [
              [
                resolveLoaderPath('@babel/preset-env'),
                {
                  targets: {
                    esmodules: false,
                  },
                },
              ],
              resolveLoaderPath('@babel/preset-react'),
            ],
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, resolveLoaderPath('css-loader')],
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            resolveLoaderPath('css-loader'),
            resolveLoaderPath('less-loader'),
            {
              loader: resolveLoaderPath('postcss-loader'),
              options: {
                postcssOptions: {
                  plugins: () => {
                    autoprefixer({
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      browsers: ['last 2 version', '>1%'],
                    })
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif)(\?.+)?$/,
          loader: resolveLoaderPath('file-loader'),
        },
        {
          test: /\.md$/,
          loader: resolveLoaderPath('raw-loader'),
        },
      ],
    },

    plugins: [
      // 抽离出css
      new MiniCssExtractPlugin({
        filename: 'css/[name]_[contenthash].css',
        chunkFilename: '[id]_[contenthash]',
      }),

      new htmlWebpackPlugin({
        title: vantuiBase.title || '--',
        template: path.join(__dirname, '../../site/docs/index.html'),
        filename: 'index.html',
        favicon_: vantuiBase.logo,
      }),
    ],
  }

  return config
}

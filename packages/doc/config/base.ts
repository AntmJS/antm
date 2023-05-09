import path from 'path'
import htmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import autoprefixer from 'autoprefixer'
import { getConfig } from './utils/get-config'
import { createBase } from './utils/create-base'
import { CWD } from './utils/contanst'

export default async function base() {
  const result = await getConfig()
  const base = result.docs
  const { lessAdditionalData } = await createBase(base)

  const config = {
    entry: {
      index: path.join(__dirname, '../src/index.tsx'),
    },

    mode: process.env['NODE_ENV'],

    output: {
      path: path.join(CWD, base.output || 'doc_build'),
      filename: '[name]_[hash].js',
    },

    devServer: {
      port: base.buildPort,
    },

    stats: 'normal',

    resolve: {
      alias: {
        CWD: CWD,
      },
      extensions: ['.js', '.json', '.tsx', '.ts'],
    },

    module: {
      rules: [
        {
          test: /.ts|.tsx$/,
          loader: 'babel-loader',
          exclude: /node_modules\/(?!@antmjs\/doc)/,
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: false,
                  },
                },
              ],
              [
                '@babel/preset-typescript',
                {
                  isTSX: true,
                  jsxPragma: 'React',
                  allExtensions: true,
                  allowNamespaces: true,
                },
              ],
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
            ],
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'less-loader',
              options: lessAdditionalData
                ? {
                    additionalData: lessAdditionalData,
                  }
                : {},
            },
            {
              loader: 'postcss-loader',
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
          loader: 'file-loader',
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
        title: base.title || '--',
        template: path.join(__dirname, '../src/index.html'),
        filename: 'index.html',
        favicon_: base.logo,
        chunks: ['index'],
      }),
    ],
  }

  return config
}

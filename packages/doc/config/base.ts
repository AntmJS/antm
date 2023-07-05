import path from 'path'
import htmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import { getConfig } from './utils/get-config'
import { createBase } from './utils/create-base'
import { CWD } from './utils/contanst'

export default async function base() {
  const result = await getConfig()
  const base = result.docs
  const { globalStyles } = await createBase(base)

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
          loader: 'swc-loader',
          exclude: /node_modules\/(?!@antmjs\/doc)/,
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
              target: 'es2022',
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
            module: {
              type: 'es6',
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
            {
              loader: 'style-resources-loader',
              options: {
                patterns: globalStyles || [],
                injector: 'append',
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif)(\?.+)?$/,
          loader: 'file-loader',
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
      ],
    },

    plugins: [
      new VueLoaderPlugin(),
      // 抽离出css
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        ignoreOrder: true,
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

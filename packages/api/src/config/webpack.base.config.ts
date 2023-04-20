import path from 'path'
import htmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import autoprefixer from 'autoprefixer'
import getConfig from './getConfig'

const { buildPath } = getConfig()
const cwd = process.cwd()

export default async function base() {
  const config = {
    entry: path.join(__dirname, '../../ui/app.js'),

    output: {
      filename: '[name]_[hash].js',
      path: buildPath || path.join(cwd, './api-ui'),
    },

    resolve: {
      extensions: ['.js', '.json'],
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: require.resolve('babel-loader'),
          exclude: /node_modules\/(?!@antmjs\/api)/,
          options: {
            presets: [
              [
                require.resolve('@babel/preset-env'),
                {
                  targets: {
                    esmodules: false,
                  },
                },
              ],
              require.resolve('@babel/preset-react'),
            ],
            plugins: [
              [
                require.resolve('@babel/plugin-transform-runtime'),
                {
                  corejs: { version: 3 }, // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
                },
              ],
            ],
          },
        },
        {
          test: /\.js|.ts|.tsx$/,
          loader: require.resolve('./api-loader.js'),
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')],
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            require.resolve('css-loader'),
            require.resolve('less-loader'),
            {
              loader: require.resolve('postcss-loader'),
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
      ],
    },

    plugins: [
      // 抽离出css
      new MiniCssExtractPlugin({
        filename: 'css/[name]_[contenthash].css',
        chunkFilename: '[id]_[contenthash]',
      }),

      new htmlWebpackPlugin({
        title: 'api-ui',
        template: path.join(__dirname, '../../ui/index.html'),
        filename: 'index.html',
      }),
    ],
  }

  return config
}

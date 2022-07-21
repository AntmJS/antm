import path from 'path'
import htmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import autoprefixer from 'autoprefixer'
import getConfig from './getConfig.js'

const antmConfig = getConfig()
const { buildPath } = antmConfig.apiUi || {}
const cwd = process.cwd()

export default async function base() {
  const config = {
    entry: path.join(__dirname, '../../ui/app.js'),

    output: {
      filename: '[name]_[hash].js',
      path: buildPath || path.join(cwd, './api-ui'),
    },

    stats: 'normal',

    resolve: {
      extensions: ['.js', '.json'],
    },

    module: {
      rules: [
        {
          test: /\.js|.ts|.tsx$/,
          loader: require.resolve('babel-loader'),
          exclude: /node_modules\/(?!@antmjs\/api-ui)/,
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
          },
        },
        {
          test: /\.md$/,
          loader: require.resolve('raw-loader'),
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

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

module.exports = () => {
  return {
    entry: path.resolve('src/main.ts'),
    output: {
      clean: true,
      pathinfo: false,
      path: path.resolve('build'),
      filename: 'static/js/[name].[contenthash:8].js',
      // assetModuleFilename: 'image/[contenthash:8][ext][query]',
      // 目前配置下开发环境publicPath不用[/]刷新就有问题
      publicPath: process.env.NODE_ENV === 'development' ? '/' : process.env.PUBLIC_PATH
    },
    stats: {
      preset: 'minimal',
      // moduleTrace: true,
      errorDetails: true
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.(t|j)sx?$/,
          include: path.resolve('src'),
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                appendTsSuffixTo: [/\.vue$/]
              }
            }
          ]
        },
        // element-plus按需引入需要的配置
        {
          test: /\.mjs$/,
          resolve: {
            byDependency: {
              esm: {
                fullySpecified: false
              }
            }
          }
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024
            }
          },
          generator: {
            filename: 'static/image/[contenthash:8][ext][query]'
          },
          type: 'asset'
        },
        {
          test: /\.ttf|eot|woff2?$/i,
          generator: {
            filename: 'static/font/[contenthash:8][ext][query]'
          },
          type: 'asset/resource'
        },
        {
          test: /\.mp3|mp4$/i,
          generator: {
            filename: 'static/media/[contenthash:8][ext][query]'
          },
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack5 App',
        template: path.resolve('public/index.html'),
        hash: true
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            to: 'public',
            globOptions: {
              ignore: ['**/index.html']
            }
          }

        ]
      }),
      new ForkTsCheckerPlugin(),
      new VueLoaderPlugin(),
      new webpack.ProvidePlugin({
        cloneDeep: ['lodash', 'cloneDeep'],
        throttle: ['lodash', 'throttle'],
        debounce: ['lodash', 'debounce']
        // moment: 'moment'
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router'
        ],
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver({
          importStyle: 'sass',
          directives: true
        })]
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve('src'),
        'img': path.resolve('src/assets/image')
      },
      extensions: ['.ts', '.tsx', '.js', '.vue', '.scss']
    }
  }
}

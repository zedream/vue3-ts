const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpackBase = require('./webpack.base.config')
const { merge } = require('webpack-merge')

module.exports = env => {
  return merge(webpackBase(env), {
    module: {
      rules: [{
        test: /\.(sa|sc|c)ss$/i,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]_[hash:base64:8]'
                  }
                }
              },
              'postcss-loader',
              'sass-loader'
            ]
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  additionalData: `@use "@/assets/styles/element-plus.scss" as *;`
                }
              }
            ]
          }
        ]
      }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        /**
         * filename chunkFilename  ?
         */
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].css',
        ignoreOrder: true
      }),
      new webpack.DefinePlugin({
        ...env,
        __VUE_OPTIONS_API__: JSON.stringify(false),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          quiet: true
        }
      })
    ],
    optimization: {
      minimize: true,
      runtimeChunk: true,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          parallel: true,
          terserOptions: {
            compress: true,
            output: {
              comments: false
            }
          },
          extractComments: true
        }),
        new CssMinimizerPlugin()
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 20480,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        // enforceSizeThreshold: 50000
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            name: 'vendor/vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 10 // 优先级
          }
        }
      }
    },
    performance: {
      hints: false
    }
  })
}

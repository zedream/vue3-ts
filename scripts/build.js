const webpack = require('webpack')
const chalk = require('chalk')
const inquirer = require('inquirer')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const webpackProdConfig = require('../config/webpack.prod.config')
const envConfig = require('../config/config').env

inquirer.prompt([
	{
		type: 'list',
		message: 'Please select a packaging environment：',
		name: 'env',
		default: 'prod',
		choices: Object.keys(envConfig),
		filter: function (val) {
			return val
		}
	}
]).then(answer => {
	const env = require('./env')(answer.env)
  process.env.PUBLIC_PATH = JSON.parse(env['process.env.PUBLIC_PATH']) || '/'

  const prodConfig = webpackProdConfig(env)
	prodConfig.mode = 'production'
	if (process.env.BUILD_TYPE === 'analyzer') {
		const  { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
		prodConfig.plugins.push(new BundleAnalyzerPlugin())
	}
	prodConfig.plugins.push(new WorkboxWebpackPlugin.GenerateSW({
		clientsClaim: true,
		skipWaiting: true,
		maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
	}))

	const compiler = webpack(prodConfig)
	console.log(`App ${chalk.black.bgBlue('INFO')} Building for ${answer.env === 'prod' ? 'production' : answer.env}...`)
	compiler.run((err, stats) => {
		compiler.close((closeErr) => {
		})
	})
});








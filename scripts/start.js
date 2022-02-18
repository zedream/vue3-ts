const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const chalk = require('chalk')
const webpackDevConfig = require('../config/webpack.dev.config')
const env = require('./env')('dev')
process.env.PUBLIC_PATH = JSON.parse(env['process.env.PUBLIC_PATH']) || '/'
process.env.NODE_ENV = 'development'

webpackDevConfig(env).then(devConfig => {
	devConfig.mode = 'development'
	const compiler = webpack(devConfig)
	const devServerOptions = { ...devConfig.devServer }
	const server = new webpackDevServer(devServerOptions, compiler)
	console.log(`App ${chalk.black.bgBlue('INFO')} Starting development server...`)
	server.start()
})

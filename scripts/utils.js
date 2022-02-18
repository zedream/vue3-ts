'use strict'

const fs = require('fs')
const path = require('path')

module.exports = {
	readEnv (fileRelativePath) {
		let build = ''
		if (process.env.NODE_ENV === 'development') {
			build = 'dev'
		} else if (process.env.NODE_ENV === 'production') {
			build = process.env.BUILD || 'prod'
		}
		const chalk = require('chalk')
		const { resolveApp } = require('./paths')
		const log = console.log
		const envMap = {}
		const file = resolveApp(fileRelativePath)

		if (!fs.existsSync(file)) {
			log(`App ${chalk.black.bgYellow('WARN')} ${chalk.magentaBright('.env')} file was not found when BUILD equals ${chalk.magentaBright(build)}`)
			return envMap
		}
		const data = fs.readFileSync(file, { encoding: 'utf8' })
		const d = data.replace(/\n/g, '').split('\r')
		if (!d[d.length - 1]) {
			d.pop()
		}
		const envDyadicArray = d.map(item => {
			return item.split('=')
		})
		envDyadicArray.forEach(item => {
			envMap[`process.env.${item[0]}`] = JSON.stringify(item[1])
		})
		return envMap
	},
	getIp () {
		let netHost = ''
		const os = require('os')
		try {
			const network = os.networkInterfaces()
			for (let type in network) {
				let networkInter = network[type]
				networkInter.forEach(item => {
					if (item.family === "IPv4" && item.address !== "127.0.0.1" && !item.internal) {
						netHost = item.address
					}
				})
			}
		} catch {
			netHost = 'localhost'
		}
		return netHost
	},
	createNotifierCallback ()  {
		const notifier = require('node-notifier')
		const packageConfig = require('../package.json')
		return (severity, errors) => {
			if (severity !== 'error') return

			const error = errors[0]
			const filename = error.file && error.file.split('!').pop()

			notifier.notify({
				title: packageConfig.name,
				message: severity + ': ' + error.name,
				subtitle: filename || '',
				icon: path.join(__dirname, '../public/favicon.ico')
			})
		}
	}
}

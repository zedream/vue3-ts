const chalk = require('chalk')
const { env } = require('../config/config')

module.exports = (appEnv) => {
	const envMap = env[appEnv]
	if (!envMap) {
		console.log(`App ${chalk.black.bgYellow('WARN')} No configuration found for environment variables`)
		return {}
	}
	const envDefine = {}
	for (let key in envMap) {
		envDefine[`process.env.${key}`] = JSON.stringify(envMap[key])
	}
	return envDefine
}

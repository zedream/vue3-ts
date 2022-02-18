'use strict'

const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath || 'non-existent')

const prodEnvPathMap = {
    test: 'env/.env.production.test'
}

module.exports = {
    resolveApp,
    prodEnvPathMap
}

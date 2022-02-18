## 模块联邦

_暴露方_
````javascript
/**
 * webpack config
 */
const { ModuleFederationPlugin } = require('webpack').container

webpackConfig.plugins.push(
    new ModuleFederationPlugin({
        name: 'name',
        filename: 'filename.[ext]',
        remotes: {},
        exposes: {
            './TheHeader': './src/components/TheHeader.js'
        },
        shared: {}
    })
)
````
_引用方_
````javascript
/**
 * webpack config
 */
const { ModuleFederationPlugin } = require('webpack').container

webpackConfig.plugins.push(
    new ModuleFederationPlugin({
        name: '',
        filename: '',
        remotes: {
            [name]: '[remoteName]@[remoteUrl]/[remoteFilename]'},
        exposes: {
            
        },
        shared: {}
    })
)

/**
 * module dereference
 */
import('[localRemotesKey]/[remoteExposesKey]').then(Component => {
    // Component.default()
})
````

## Service Worker（workbox）
_main.js_
````javascript
/**
 * webpack config
 */
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

new WorkboxWebpackPlugin.GenerateSW({
    clientsClaim: true,
    skipWaiting: true,
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
})
/**
 * js
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').then(registration => {
            console.log('SW registered ', registration)
        }).catch(registrationError => {
            console.log('SW registration failed ', registrationError)
        })
    })
}
````

## Web Works
````javascript
/**
 * work.js
 */
self.onmessage = message => {
    self.postMessage({
        //
    })
}
/**
 * module.js
 */
const worker = new Worker(new URL('./work.js', import.meta.url))

worker.postMessage({
    //
})
worker.onmessage = message => {
    console.log(message.data)
}
````

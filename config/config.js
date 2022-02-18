module.exports = {
	port: 3090,
	proxy: [
		{
			context: ['/mall'],
			target: 'https://supply-test19-2.brightoilonline.com',
			changeOrigin: true,
			secure: false,
		},
    {
      context: ['/api'],
      target: 'https://newmid-test14.brightoilonline.com',
      changeOrigin: true,
      secure: false,
      // pathRewrite: { '^/api': '/' }
    }
	],
  name: 'App',
  version: '1.0.0',
  app: {
	  fixIndex: true, // 固定首页tag（建议为true， 不然关闭所有navTag后不知道该去哪个路由了， 虽然程序已经默认再次去往首页）
    indexPath: '/',
    refresh: true
  },
	env: {
		dev: {
			APP_NODE_ENV: 'dev',
			PUBLIC_PATH: '/',
			BASE_URL: '/'
		},
		prod: {
			APP_NODE_ENV: 'prod',
			PUBLIC_PATH: '/vue3/',
			// BASE_URL: 'https://seller.brightoilonline.com/mall'
      BASE_URL: '/'
    },
		sit: {
			APP_NODE_ENV: 'sit',
			PUBLIC_PATH: '/',
			BASE_URL: 'https://seller-test19.brightoilonline.com/mall'
		},
		uat: {
			APP_NODE_ENV: 'uat',
			PUBLIC_PATH: '/',
			BASE_URL: 'https://c2b-test15.brightoilonline.com'
		}
	}
}

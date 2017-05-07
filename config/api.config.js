module.exports = {
	apiPath: 'http://www.abc.cn',
	proxyPath: 'http://www.abc.cn',
	httpsPath: 'https://www.abc.cn',
	originPath: 'http://m.abc.cn',
	originHttpsPath: 'https://m.abc.cn',
	successCode: [0, 200],
	timeout: 3500,
	// 只存公共状态码，活动的2xx不计入
	msgMap: {
		'408': '网络繁忙，请稍后重试'
	},
	proxyTable: {
    '/index.php':{
      target: 'http://m.abc.cn',
      changeOrigin: true
    },
    '/api-*.html':{
      target: 'http://m.abc.cn',
      changeOrigin: true
    },
    '/geocoder':{
      target: 'http://m.abc.cn',
      changeOrigin: true
    }
	}
}

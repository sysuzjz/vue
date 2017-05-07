// 请求统一处理
import reqwest from 'reqwest'
import util from 'lib/util'
import urlParser from 'url'
import cookie from 'lib/cookie'

const apiConfig = require('config/api.config'),
	// debug = process.env.NODE_ENV !== 'production',
	isHttps = window.location.protocol === 'https:' || window.location.protocol === 'https',
	apiPath = isHttps ? apiConfig.httpsPath : apiConfig.apiPath,
	originPath = isHttps ? apiConfig.originHttpsPath : (apiConfig.originPath ? apiConfig.originPath : apiPath)

const defaultOption = {
	method: 'GET',
	type: 'json',
	crossOrigin: true,
	withCredentials: true,
	timeout: apiConfig.timeout
}

// 请求参数适配
const setQueryOption = (queryOption) => {
	const option = Object.assign({}, defaultOption, queryOption)

	// 兼容旧接口
	let url = option.url
	if (option.url.indexOf('${originPath}') > -1) {
		url = option.url.replace('${originPath}', originPath)
	}
	else {
		// 自适应协议链接不做处理
		if (option.url.indexOf('//') < 0) {
			// 没有host时添加默认host
			const urlParts = urlParser.parse(option.url)
			if (!urlParts.host) {
				url = apiPath + option.url
			}
		}
	}
	option.url = url

	if (!option.data) {
		option.data = {}
	}

	// 旧站默认key是安卓的
	if (!option.data.clientType) {
		option.data.clientType = 'android'
	}
	if (!option.data.marsCid) {
		option.data['marsCid'] = util.getMarsCid()
	}

	return option
}

// 请求队列，每个请求有独一无二的id。请求完成后删除该请求
// 存储promise方便以后对请求进行检测等
const quene = {}
let queneLength = 0
const addRequest = (symbol, promise) => {
	if (queneLength === 0) {
		util.loading.show()
	}
	quene[symbol] = promise
	queneLength++
}
const deleteRequest = (symbol) => {
	delete quene[symbol]
	queneLength--
	if (queneLength === 0) {
		util.loading.hide()
	}
}

const request = {
	request (queryOption) {
		const symbol = Symbol()
		const option = setQueryOption(queryOption)
		const promise = new Promise((resolve, reject) => {
			// 只要请求结束，无论成功还是失败都从队列中删除
			reqwest(option).then((res) => {
				deleteRequest(symbol)
				const result = Object.assign({}, res)
				// 旧接口无状态码，直接返回数据
				if (result.code === undefined) {
					resolve(result)
				}
				// 修改提示信息
				if (apiConfig.msgMap[res.code]) {
					result.msg = apiConfig.msgMap[res.code]
				}
				// 没在成功状态码集合中
				if (apiConfig.successCode.indexOf(+result.code) < 0) {
					// cookie异常时清空cookie
					if (+result.code === 3022) {
						cookie.delete('userid')
						cookie.delete('triton')
						cookie.delete('saturn')
					}
					reject(result)
				}
				else {
					resolve(result.data)
				}
			}, (err, msg) => {
				deleteRequest(symbol)
				// 失败统一弹窗
				util.toast('网络繁忙，请稍后重试', 1500)
				reject(err, msg)
			})
		})
		addRequest(symbol, promise)
		return promise
	},
	get (url, data, queryOption = {}) {
		const option = Object.assign({}, defaultOption, {
			url,
			data
		}, queryOption)
		return this.request(option)
	},
	post (url, data, queryOption = {}) {
		const option = Object.assign({}, defaultOption, {
			method: 'POST',
			url,
			data,
		}, queryOption)
		return this.request(option)
	},
	jsonp (url, data, queryOption = {}) {
		const option = Object.assign({}, {
			method: 'JSONP',
			type: 'jsonp',
			url,
			data,
			jsonpCallback: 'jsonp'
		}, queryOption)
		return this.request(option)
	}
}

export default request

// 保持全局唯一实例
import Vue from 'vue'
import urlParser from 'url'

const vue = new Vue()

const util = {
	// 获取单例
	getInstance () {
		return vue
	},
	// 全局toast
	toast (msg, duration, callback) {
		vue.$emit('toast', msg, duration, callback)
	},
	loading: {
		show: () => {
			vue.$emit('showLoading')
		},
		hide: () => {
			vue.$emit('hideLoading')
		}
	},
	/*
	 * header: 标题，不填则隐藏头部
	 * content: 弹窗主体内容
	 * cancelText: 取消按钮文案（左边按钮）,默认”取消“
	 * confirmText: 确认按钮文案（右边按钮），默认”确认“
	 * cancelCallback: 点击取消按钮回调，默认关闭弹窗。回调参数为dialog对象，可以通过dialog.hide关闭弹窗
	 * confirmCallback: 点击确认按钮回调，默认关闭弹窗。回调参数为dialog对象，可以通过dialog.hide关闭弹窗
	 * dialogType: 对话框类型。'double-btn'为两个按钮，即取消+确认。'single-btn'为单按钮，只有确认按钮。默认'double-btn'
	 */
	dialog (option) {
		vue.$emit('dialog', option)
	},
	isWechat () {
		return /MicroMessenger/i.test(window.navigator.userAgent)
	},
	// 是否隐私模式
	isPrivateMode () {
		let isPrivateMode = false
		try {
			window.localStorage.setItem('test', 'test')
		}
		catch (e) {
			isPrivateMode = true
		}
		return isPrivateMode
	},
	// 是否在域名白名单内
	isHostLegal (href) {
		if (!href) {
			return false
		}
		const {host} = urlParser.parse(href, false)
		const hostWhiteList = ['.abc.com']
		for (const hostSuffix of hostWhiteList) {
			if (host.indexOf(hostSuffix) > -1) {
				return true
			}
		}
		return false
	},
	/* 表单验证
	 * 两种传参，一种传validate(rule, data)，一种传validate({rule: rule, data: data})
	 *	rule：规则
	 *	data：待验证的字符串
	 */
	validate (option, ...args) {
		let rule = null,
			data = null
		if (args.length > 0) {
			rule = option
			data = args[0]
		}
		else {
			rule = option.rule
			data = option.data
		}
		switch (rule) {
			// 中文验证
			case 'cn':
				return /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])$/.test(data)
			// 验证码不定位数，但一定是数字和字母的组合，并且不止一位
			case 'captcha':
				return /^\w+$/.test(data)
			// 身份证，17位数字+最后一位为x或数字
			case 'idcard':
				return /^\d{17}(\d|x)$/.test(data)
			case 'mobile':
				return /^1\d{10}$/.test(data)
			case 'number':
				return /^\d+$/.test(data)
			case 'password':
				// 不能包括不能包含汉字、空格或全角字符，长度为6-20
				return !/(:?[^\x00-\xff]|\s)/.test(data) && /^.{6,20}$/.test(data)
			default:
				return data.length > 0
		}
	},
	// 中文转unicode编码
	cnToUnicode (str) {
		return str.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g, ($1) => {
			return `\\u${$1.charCodeAt(0).toString(16)}`
		})
	},
	unicodeToCn (str) {
	},
	// 格式化对象，把值为null或undefined的键去掉。当strict为true时过滤空对象和空字符串
	objectFilter (object, strict = false) {
		const obj = Object.assign({}, object)
		Object.keys(obj).forEach((key) => {
			if (obj[key] === undefined || obj[key] === null) {
				delete obj[key]
			}
			if (strict) {
				if (obj[key] === '' || ((typeof obj).toLowerCase() === 'object' && Object.keys(obj).length === 0)) {
					delete obj[key]
				}
			}
		})
		return obj
	},
	/* 日期格式化
	 * date：时间戳或date类型
	 * format：如yyyy-mm-dd hh:ii:ss。不区分大小写，位数任意
	 */
	dateFormat (date, format) {
		if (!(date instanceof Date)) {
			return util.dateFormat(new Date(date), format)
		}
		let result = format
		const o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'H+': date.getHours(),
			'i+': date.getMinutes(),
			's+': date.getSeconds(),
			'q+': Math.floor((date.getMonth() + 3) / 3),
		}
		if (/(y+)/i.test(result)) {
			result = result.replace(RegExp.$1, (date.getFullYear().toString()).substr(4 - RegExp.$1.length))
		}
		for (const key in o) {
			if (new RegExp(`(${key})`, 'i').test(result)) {
				result = result.replace(RegExp.$1, (RegExp.$1.length === 1)
					? (o[key])
					: ((`00${o[key]}`).substr(`${o[key]}`.length)))
			}
		}
		return result
	}

}
export default util

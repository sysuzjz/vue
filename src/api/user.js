import request from 'lib/request'

const userAction = {
	getUserInfo: () => {
		return request.get('/wap/user/info')
	},
	// 注册获取短信验证码
	getRegisterCode: (data) => {
		return request.get('/wap/user/registercode', data)
	},
	// 注册、登录前风险校验
	secureCheck: (data) => {
		return request.get('/wap/user/securecheck', data)
	},
	// 注册
	register: (data) => {
		return request.post('/wap/user/register', data)
	},
	// 忘记密码获取短信验证码
	getResetPasswordCode: (data) => {
		return request.get('/wap/user/resetpasswordcode', data)
	},
	resetPassword: (data) => {
		return request.post('/wap/user/resetpassword', data)
	}
}

export default userAction

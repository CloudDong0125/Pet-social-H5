module.exports = {
	nowTime() {
		//时间戳
		let date = new Date()
		return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ':' + date
			.getMinutes() + ':' + date.getSeconds();
	},
	//判空
	isNull(str) {
		// eslint-disable-next-line eqeqeq
		if (str == '') return true
		var regu = '^[ ]+$'
		var re = new RegExp(regu)
		return re.test(str)
	},
	// 身份证号验证
	idPartern(str) {
		let pattern = /^([0-9]){7,18}(x|X)?$ 或 ^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$/
		if (!pattern.test(str)) return true
	},
	// 手机号验证
	phonePartern(str) {
		if (!(/^1[3456789]\d{9}$/.test(str))) return true
	},
	// 邮箱验证
	emailPartern(str) {
		let pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
		if (!pattern.test(str)) return true
	},
	// 密码必须是6-16位的字母和数字组合
	pdPartern(str) {
		let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
		if (!pattern.test(str)) return true
	},
	// 校验 				
	check(token) {
		if (!token) {
			//校验是否有token
			uni.showModal({
				title: '提示',
				content: '登录失效或未登录，是否去登录',
				success(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
				}
			})
			return false
		} else {
			return true
		}
	},
}

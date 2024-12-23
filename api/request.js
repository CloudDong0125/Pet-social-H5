const request = (options = {}) => {
	let {
		url,
		data,
		method
	} = options
	let token = uni.getStorageSync('token')
	console.log(token,'1111')

	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data,
			header: token ? {
				'Authorization': 'Bearer ' + token
			} : {},
			// header: token ? {
			// 	token
			// } : {},
			method,
			success: res => {
				resolve(res.data)
				// if (res.data.code === 0) {
				// 	resolve(res.data)
				// } else if (res.data.code === 401) {
				// 	uni.removeStorageSync('token');
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '登录失效或未登录，是否去登录',
				// 		success(res) {
				// 			if (res.confirm) {
				// 				wx.redirectTo({
				// 					url: '/pages/login/login'
				// 				})
				// 			} else if (res.cancel) {
				// 				uni.navigateBack({
				// 					delta: 1
				// 				});
				// 			}
				// 		}
				// 	})
				// } else {
				// 	uni.hideLoading()
				// 	console.log("登录失败")
				// 	console.log('错误', res.data.msg)
				// 	uni.showToast({
				// 		title: res.data.msg,
				// 		icon: 'none'
				// 	})
				// }
			},
			fail: err => {
				console.log('网络异常')
				uni.showToast({
					title: '网络异常',
					icon: 'none'
				})

			}
		})
	})
}

module.exports = {
	request,
}

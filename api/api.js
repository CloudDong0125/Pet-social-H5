const {
	request
} = require('./request.js')


let urlTypr = 'test'
const baseUrl = (urlTypr == 'test') ? 'http://localhost:3000/demo/api/' : 'http://localhost:3000/web/api/';


function getParameter(data) {
	var parameter = '?'
	for (var item in data) {
		parameter = parameter + item + '=' + data[item] + '&'
	}
	parameter = parameter.substring(0, parameter.length - 1)
	console.log(parameter)
	return parameter
}
export const getAnnouncements = () => {
	return request({
		url: baseUrl + 'rest/announcements',
		method: 'GET'
	})
}
//登录接口
export const getLogin = (data) => {
	return request({
		url: baseUrl + 'login',
		method: 'POST',
		data: data
	})
}
// 注册
export const getSignIn = (data) => {
	return request({
		url: baseUrl + 'rest/admin_users',
		method: 'POST',
		data: data
	})
}

// 广告
export const getAds = () => {
	return request({
		url: baseUrl + 'rest/ads',
		method: 'GET'
	})
}

// 小宠之星
export const getItems = () => {
	return request({
		url: baseUrl + 'rest/items',
		method: 'GET'
	})
}

// 新闻
export const getNewsList = () => {
	return request({
		url: baseUrl + 'news/list',
		method: 'GET'
	})
}

// ---宠友圈
export const getRoom = () => {
	return request({
		url: baseUrl + 'rest/room',
		method: 'GET'
	})
}


// 点赞
export const getAdd = (data) => {
	return request({
		url: baseUrl + `rest/room/${data._id}`,
		data: data,
		method: 'PUT'
	})

}
// 取消点赞
export const getCancle = (data) => {
	return request({
		url: baseUrl + `rest/room/${data._id}`,
		data: data,
		method: 'PUT'
	})

}
// 删除
export const delRoom = (data) => {
	return request({
		url: baseUrl + `rest/room/${data._id}`,
		method: 'DELETE'
	})

}
// ---收养
export const getBuy = (type) => {
	return request({
		url: baseUrl + `rest/buy/?type=${type}`,
		method: 'GET'
	})
}

// 点赞
export const putAddBuy = (data) => {
	return request({
		url: baseUrl + `rest/buy/${data._id}`,
		data: data,
		method: 'PUT'
	})

}
// 取消点赞
export const putCancleBuy = (data) => {
	return request({
		url: baseUrl + `rest/buy/${data._id}`,
		data: data,
		method: 'PUT'
	})

}
// 删除
export const delBuy = (data) => {
	return request({
		url: baseUrl + `rest/buy/${data._id}`,
		method: 'DELETE'
	})

}


// 发布找家
export const postUpload = (data) => {
	return request({
		url: baseUrl + 'rest/forum',
		method: 'POST',
		data: data
	})
}


export const postDaySend = (data) => {
	return request({
		url: baseUrl + 'rest/room',
		method: 'POST',
		data: data
	})
}
export const postFindSend = (data) => {
	return request({
		url: baseUrl + 'rest/buy',
		method: 'POST',
		data: data
	})
}

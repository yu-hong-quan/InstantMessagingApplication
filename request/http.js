const headerUrl = 'http://192.168.31.198:8080';

function request(url, method = 'GET', data = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: headerUrl + url,
			method,
			data,
			header: {
				'Content-Type': 'application/json', // 可根据需求修改 Content-Type
				'Authorization': `Bearer ${uni.getStorageSync('xiaoyuApp_token')}`
			}, // 设置请求头
			success: (res) => {
				// 成功时返回响应数据
				resolve(res.data);
				if (res.code === 401 && res.message == 'token无效,请重新登录') {
					setTimeout(()=>{
						uni.reLaunch({
							url:`/pages/signin/signin`
						})
					},2000)
				}
			},
			fail: (err) => {
				console.log(err);
				// 失败时返回错误信息
				reject(err);
			}
		});
	});
}

export default request;
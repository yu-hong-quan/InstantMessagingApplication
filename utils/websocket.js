let socketTask = null;

export function connectWebSocket() {
	console.log(uni.getStorageSync('xiaoyuApp_token'));
	socketTask = uni.connectSocket({
		url: 'wss://192.168.31.198:8080/',
		header: {
			'Authorization': `Bearer ${uni.getStorageSync('xiaoyuApp_token')}`, // 在header中添加token
			'Content-Type': 'application/json'
		},
	});

	uni.onSocketOpen((res) => {
		console.log('WebSocket连接已打开');
		socketTask = true;
	});

	uni.onSocketError((err) => {
		console.error('WebSocket连接发生错误：', err);
	});

	uni.onSocketClose((res) => {
		console.log('WebSocket连接已关闭');
		socketTask = false;
	});
}

export function sendWebSocketMessage(message) {
	if (socketTask) {
		uni.sendSocketMessage({
			data: JSON.stringify(message),
			success: () => {
				console.log('消息发送成功');
			},
			fail: (err) => {
				console.error('消息发送失败：', err);
			}
		});
	} else {
		console.error('WebSocket连接未打开或已断开');
	}
}
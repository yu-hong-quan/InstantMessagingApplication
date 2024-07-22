let socketTask = null;

export function connectWebSocket() {
	socketTask = uni.connectSocket({
		url: 'ws://192.168.31.198:3200/', //本地开发环境用ws  生产用wss
		header: {
			'Authorization': `Bearer ${uni.getStorageSync('xiaoyuApp_token')}`, // 在header中添加token
			'Content-Type': 'application/json'
		},
	});

	uni.onSocketOpen((res) => {
		console.log('WebSocket连接成功');
		socketTask = true;
	});

	uni.onSocketError((err) => {
		console.error('WebSocket连接发生错误：', err);
	});

	uni.onSocketClose((res) => {
		console.log('WebSocket连接已关闭');
		socketTask = false;
	});

	// 处理接收到的消息
	uni.onSocketMessage((event) => {
		console.log(event);
		// const data = JSON.parse(event.data);
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
export default{
	
	// 首页消息时间转换
	dateTime(e){
		
		//过去时间
		let oldTime = new Date(e);
		//现在时间
		let nowTime = new Date();
		
		// 获取oldTime的具体时间
		let d = oldTime.getTime();
		let h = oldTime.getHours();
		let m = oldTime.getMinutes();
		let Y = oldTime.getFullYear();
		let M = oldTime.getMonth()+1;
		let D = oldTime.getDate();
		
		// 获取nowTime的具体时间
		let nd = nowTime.getTime();
		let nh = nowTime.getHours();
		let nm = nowTime.getMinutes();
		let nY = nowTime.getFullYear();
		let nM = nowTime.getMonth()+1;
		let nD = nowTime.getDate();
		
		// 当天的时间处理
		if(D === nD && Y === nY && M === nM){
			// 判断小时小于10
			if(h<10){
				h = `0${h}`;
			}
			// 判断分钟小于10
			if(m<10){
				m = `0${m}`;
			}
			return `${h}:${m}`;
		}
		
		// 前天的时间处理
		if(D+1 === nD && Y === nY && M === nM){
			// 判断小时小于10
			if(h<10){
				h = `0${h}`;
			}
			// 判断分钟小于10
			if(m<10){
				m = `0${m}`;
			}
			return `前天${h}:${m}`;
		}else{
			// 大于两天
			return `${Y}/${M}/${D}`;
		}
	}
}
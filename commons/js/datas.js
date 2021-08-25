export default {
	friends(){
		let friendarr = [
			{
				id:1,
				imgurl:'four.png',
				email:'senglin@163.com',
				tip:2,
				name:'大海',
				time:new Date(),
				news:'文件（Object）上传至存储空间（Bucket）后，OSS会自动生成文件URL，您可以直接通过文件URL',
			},
			{
				id:2,
				imgurl:'one.png',
				email:'senglin@163.com',
				tip:2,
				name:'山川',
				time:new Date(),
				news:'文件（Object）上传至存储空间（Bucket）后，OSS会自动生成文件URL，您可以直接通过文件URL',
			},
			{
				id:4,
				imgurl:'four.png',
				email:'senglin@163.com',
				tip:1,
				name:'河流',
				time:new Date(),
				news:'文件（Object）上传至存储空间（Bucket）后',
			},
			{
				id:3,
				imgurl:'two.png',
				email:'senglin@163.com',
				tip:0,
				name:'天空',
				time:new Date(),
				news:'OSS会自动生成文件URL，您可以直接通过文件URL',
			},
			{
				id:5,
				imgurl:'three.png',
				email:'senglin@163.com',
				tip:99,
				name:'太空',
				time:new Date(),
				news:'海大海大海大海大海大海大海大海大海大海大海大海大海大海大海大海',
			},
			{
				id:6,
				imgurl:'four.png',
				email:'senglin@163.com',
				tip:33,
				name:'大海',
				time:new Date(),
				news:'（即Bucket外网访问域名）访问该文件。若您希望通过自定义域名（自有域名）访问这些文件，需要将自定义域名绑定至文件所在的Bucket。',
			},
			{
				id:7,
				imgurl:'four.png',
				email:'senglin@163.com',
				tip:1,
				name:'大海',
				time:new Date(),
				news:'文件（Object）上传至存储空间（Bucket）后，OSS会自动生成文件URL，您可以直接通过文件URL（即Bucket外网访问域名）访问该文件。若您希望通过自定义域名（自有域名）访问这些文件，需要将自定义域名绑定至文件所在的Bucket。',
			},
			{
				id:8,
				imgurl:'four.png',
				email:'senglin@163.com',
				tip:2,
				name:'大海',
				time:new Date(),
				news:'文件（Object）上传至存储空间（Bucket）后，OSS会自动生成文件URL，您可以直接通过文件URL',
			},
			{
				id:9,
				imgurl:'one.png',
				email:'senglin@163.com',
				tip:2,
				name:'山川',
				time:new Date(),
				news:'文件（Object）上传至存储空间（Bucket）后，OSS会自动生成文件URL，您可以直接通过文件URL',
			},
			{
				id:10,
				imgurl:'four.png',
				email:'senglin@163.com',
				tip:1,
				name:'河流',
				time:new Date(),
				news:'文件（Object）上传至存储空间（Bucket）后',
			},
			{
				id:11,
				imgurl:'two.png',
				email:'senglin@163.com',
				tip:0,
				name:'天空',
				time:new Date(),
				news:'OSS会自动生成文件URL，您可以直接通过文件URL',
			},
			{
				id:12,
				imgurl:'three.png',
				email:'senglin@163.com',
				tip:99,
				name:'太空',
				time:new Date(),
				news:'海大海大海大海大海大海大海大海大海大海大海大海大海大海大海大海',
			},
			{
				id:13,
				imgurl:'four.png',
				email:'senglin@163.com',
				tip:33,
				name:'大海',
				time:new Date(),
				news:'（即Bucket外网访问域名）访问该文件。若您希望通过自定义域名（自有域名）访问这些文件，需要将自定义域名绑定至文件所在的Bucket。',
			},
			{
				id:14,
				imgurl:'four.png',
				email:'senglin@163.com',
				tip:1,
				name:'大海',
				time:new Date(),
				news:'文件（Object）上传至存储空间（Bucket）后，OSS会自动生成文件URL，您可以直接通过文件URL（即Bucket外网访问域名）访问该文件。若您希望通过自定义域名（自有域名）访问这些文件，需要将自定义域名绑定至文件所在的Bucket。',
			},
		];
		return friendarr;
	},
	// 好友关系
	isFriend(){
		let isfriend = [
			{
				userid:1,
				friend:2,
			},
			{
				userid:1,
				friend:3,
			},
			{
				userid:1,
				friend:5,
			},
			{
				userid:1,
				friend:6,
			},
		];
		return isfriend;
	},
	// 消息列表
	message(){
		let msgs = [
			{
				id:'a',//用户id
				imgurl:'two.png',
				message:{
					name:'天安门城楼售票处',
					address:'东长安街天安门城楼内',
					latitude:'39.909473',
					longitude:'116.39730899999999',
				},
				type:3, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date(),//发送时间
				tip:15,
			},
			{
				id:'b',//用户id
				imgurl:'one.png',
				message:{
					name:'雁门关雁门关雁门关雁门关雁门关',
					address:'东长安街天安门城楼内,东长安街天安门城楼内,东长安街天安门城楼内',
					latitude:'39.909473',
					longitude:'116.39730899999999',
				},
				type:3, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date(),//发送时间
				tip:16,
			},
			{
				id:'a',//用户id
				imgurl:'two.png',
				message:{
					name:'天安门城楼售票处',
					address:'东长安街天安门城楼内',
					latitude:'39.909473',
					longitude:'116.39730899999999',
				},
				type:3, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date(),//发送时间
				tip:17,
			},
			{
				id:'b',//用户id
				imgurl:'one.png',
				message:{
					name:'雁门关雁门关雁门关雁门关雁门关',
					address:'东长安街天安门城楼内,东长安街天安门城楼内,东长安街天安门城楼内',
					latitude:'39.909473',
					longitude:'116.39730899999999',
				},
				type:3, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date(),//发送时间
				tip:18,
			},
			{
				id:'a',//用户id
				imgurl:'two.png',
				message:{
					name:'天安门城楼售票处',
					address:'东长安街天安门城楼内',
					latitude:'39.909473',
					longitude:'116.39730899999999',
				},
				type:3, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date(),//发送时间
				tip:19,
			},
			{
				id:'b',//用户id
				imgurl:'one.png',
				message:{
					name:'雁门关雁门关雁门关雁门关雁门关',
					address:'东长安街天安门城楼内,东长安街天安门城楼内,东长安街天安门城楼内',
					latitude:'39.909473',
					longitude:'116.39730899999999',
				},
				type:3, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date(),//发送时间
				tip:20,
			},
			{
				id:'a',//用户id
				imgurl:'two.png',
				message:'iOS 离线SDK下载地址。',
				type:0, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date()-1000,//发送时间
				tip:1,
			},
			{
				id:'b',//用户id
				imgurl:'one.png',
				message:'yi.jpg',
				type:1, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date()-1000*16,//发送时间
				tip:2,
			},
			{
				id:'a',//用户id
				imgurl:'two.png',
				message:'one.png',
				type:1, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date()-1000*60,//发送时间
				tip:3,
			},
			{
				id:'b',//用户id
				imgurl:'one.png',
				message:'离线SDK下载已迁移到新地址，android 离线SDK下载地址、iOS 离线SDK下载地址。',
				type:0, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date()-1000*60*36,//发送时间
				tip:4,
			},
			{
				id:'a',//用户id
				imgurl:'two.png',
				message:'离线SDK下载已迁移到新地址，android 离线SDK下载地址、iOS 离线SDK下载地址。离线SDK下载已迁移到新地址，android 离线SDK下载地址、iOS 离线SDK下载地址。',
				type:0, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date()-1000*60*40,//发送时间
				tip:5,
			},
			{
				id:'b',//用户id
				imgurl:'one.png',
				message:'离线SDK下载已迁移到新地址，android 离线SDK下载地址、iOS 离线SDK下载地址。',
				type:0, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date()-1000*60*57,//发送时间
				tip:6,
			},
			{
				id:'a',//用户id
				imgurl:'two.png',
				message:'离线SDK下载已迁移到新地址，android 离线SDK下载地址、iOS 离线SDK下载地址。离线SDK下载已迁移到新地址，android 离线SDK下载地址、iOS 离线SDK下载地址。',
				type:0, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date()-1000*60*58,//发送时间
				tip:7,
			},
			{
				id:'b',//用户id
				imgurl:'one.png',
				message:'wu.jpg',
				type:1, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date()-1000*60*60*50,//发送时间
				tip:8,
			},
			{
				id:'a',//用户id
				imgurl:'two.png',
				message:'离线SDK下载已迁移到新地址，android 离线SDK下载地址、iOS 离线SDK下载地址。离线SDK下载已迁移到新地址，android 离线SDK下载地址、iOS 离线SDK下载地址。',
				type:0, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date()-1000*60*60*101,//发送时间
				tip:9,
			},
			{
				id:'b',//用户id
				imgurl:'one.png',
				message:'离线SDK下载已迁移到新地址，android 离线SDK下载地址、iOS 离线SDK下载地址。',
				type:0, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date()-1000*60*60*201,//发送时间
				tip:10,
			},
			{
				id:'a',//用户id
				imgurl:'two.png',
				message:'离线SDK下载已迁移到新地址，android 离线SDK下载地址、iOS 离线SDK下载地址。离线SDK下载已迁移到新地址，android 离线SDK下载地址、iOS 离线SDK下载地址。',
				type:0, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date()-1000*60*60*211,//发送时间
				tip:11,
			},
			{
				id:'b',//用户id
				imgurl:'one.png',
				message:'离线SDK下载已迁移到新地址，android 离线SDK下载地址、iOS 离线SDK下载地址。',
				type:0, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date()-1000*60*60*241,//发送时间
				tip:12,
			},
			{
				id:'a',//用户id
				imgurl:'one.png',
				message:{
					voice:'a',
					time:60,
				},
				type:2, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date(),//发送时间
				tip:13,
			},
			{
				id:'b',//用户id
				imgurl:'two.png',
				message:{
					voice:'a',
					time:2,
				},
				type:2, //内容类型（0文字，1图片链接，2音频链接...）
				time:new Date(),//发送时间
				tip:14,
			},
		]
		return msgs;
	}
}
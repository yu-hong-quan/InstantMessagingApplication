<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-center">
				<view class="text">详情</view>
			</view>
			<view class="top-bar-left" @click="backOne">
				<image src="../../static/images/common/back.png" mode="" class="back-img"></image>
			</view>
			<view class="top-bar-right">
				<view class="pice"></view>
			</view>
		</view>
		<view class="main">
			<view class="column heads">
				<view class="row head">
					<view class="title">头像</view>
					<view class="user-head">
						<image-cropper :src="tempFilePath" @confirm="confirm"  @cancel="cancel"></image-cropper>
						<image :src="imgurl" @tap="upload" class="user-img"></image>
						<canvas  id="myCanvas"  canvas-id="myCanvas" class="meslist_canvas" crop-width="200"  crop-height="200"></canvas>
					</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="row" @tap="modify('签名',dataarr.sign,false)">
					<view class="title">签名</view>
					<view class="cont">{{dataarr.sign}}</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="row">
					<view class="title">注册</view>
					<view class="cont">{{changeTime(dataarr.importTime)}}</view>
				</view>
			</view>
			<view class="column heads">
				<view class="row" @tap="modify('昵称',dataarr.name,false)">
					<view class="title">昵称</view>
					<view class="cont">{{dataarr.name}}</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="row">
					<view class="title">性别</view>
					<view class="cont">
						<picker @change="bindPickerChange" :value="dataarr.sex" :range="array">
							<view class="uni-input">{{array[dataarr.sex]}}</view>
						</picker>
					</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="row">
					<view class="title">生日</view>
					<view class="cont">
						<picker mode="date" :value="dataarr.birth" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{dataarr.birth}}</view>
						</picker>
					</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="row" @tap="modify('电话',dataarr.tell,true)">
					<view class="title">电话</view>
					<view class="cont">{{dataarr.tell}}</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="row" @tap="modify('邮箱',dataarr.mail,true)">
					<view class="title">邮箱</view>
					<view class="cont">{{dataarr.mail}}</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="column heads">
				<view class="row">
					<view class="title">密码</view>
					<view class="cont">*******</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="bt2">退出登录</view>
		</view>
		<view class="modify" :animation="animationData" :style="{bottom:-+widHeight + 'px'}">
			<view class="modify-header">
				<view class="close" @tap="modify()">取消</view>
				<view class="title">{{modifyTitle}}</view>
				<view class="define" @tap="modifyStbmit">确定</view>
			</view>
			<view class="modfiy-main">
				<input v-show="ispwd" type="text" v-model="pwd" class="modfiy-pwd" placeholder="请输入原密码" placeholder-style="color:#bbb;font-weight:400;"></input>
				<textarea v-model="dataText" class="modfiy-content" placeholder="" />
			</view>
		</view>
	</view>
</template>

<script>
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
	import myfun from "@/commons/js/myfun.js";
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				dataarr:{
					name:'思琪',
					sign:'我爱你你爱我蜜雪冰城甜蜜蜜,我爱你你爱我蜜雪冰城甜蜜蜜我爱你你爱我蜜雪冰城甜蜜蜜',
					importTime:new Date(),
					sex:1,
					birth:'1998-04-12',
					tell:'15017872699',
					mail:'15017872699@163com',
				},
				imgurl: '../../static/images/img/four.png',
				array: ['男', '女', '未知'],
				index: 1,
				date: currentDate,
				tempFilePath: '',
				modifyTitle:'',
				dataText:'修改的内容',
				pwd:'',
				animationData:{},//动画实例
				isModfiy:false,//动画开关
				widHeight:'',
				ispwd:false,
			};
		},
		components:{ImageCropper},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onReady() {
			this.getElementStyle();
		},
		methods: {
			// 返回至上一页
			backOne() {
				uni.navigateBack({
					data: 1
				})
			},
			changeTime(date){
				return myfun.detailTime(date);
			},
			// 性别选择器
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			// 日期选择器
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 100;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 图片裁剪
			 upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: (res) => {
						this.tempFilePath = res.tempFilePaths.shift()
					}
				});
			},
			confirm(e) {
				this.tempFilePath = ''
				this.imgurl = e.detail.tempFilePath;
				// #ifdef APP-PLUS||MP
				//除了H5端返回base64数据外，其他端都是返回临时地址，所以你要判断base64还是临时文件名，（用条件编译APP-PLUS||MP执行编译。）
				//按我这里是先上传裁剪得来的临时文件地址然后得到临时文件名，
				//待活你要判断是H5还是其他端传给后端类型参数让后端判断执行何种情况代码就OK了
			
				uni.uploadFile({
					url: "后端地址上传图片接口地址",
					filePath: this.imgurl,
					name: "file",
					fileType: "image",
					//formData:{},传递参数
					success: (uploadFileRes) => {
					  var backstr = uploadFileRes.data;
					  //自定义操作
					},
			
					fail(e) {
					  console.log("this is errormes " + e.message);
					},
				});
				
				// #endif
			},
			cancel() {
				console.log('canceled')
			},
			// 获取元素位置等信息
			getElementStyle(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.modify').boundingClientRect(data => {
					console.log("得到布局位置信息" + JSON.stringify(data));
					console.log("节点离页面顶部的距离为" + data.top);
					this.widHeight = data.height;
				}).exec();
			},
			// 修改项弹框
			modify(type,data,ispwd){
				this.isModfiy = !this.isModfiy;
				this.ispwd = ispwd;
				this.modifyTitle = type;
				this.dataText = data;
				var animation = uni.createAnimation({
					duration:300,
					timingFunction:"ease",
				})
				if(this.isModfiy){
					animation.bottom(0).step();
				}else{
					animation.bottom(-this.widHeight).step();
				}
				this.animationData = animation.export()
			},
			// 弹窗修改确定
			modifyStbmit(){
				this.modify()
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.top-bar {
		background: rgba(255, 255, 255, .95);
		border-bottom: 1px solid $uni-border-color;
	}

	.main {
		padding-top: var(--status-bar-height); // 处理app端顶部自定义tabbar被消息栏遮挡问题
		margin-top: 118rpx;
		display: flex;
		flex-direction: column;

		.column {
			display: flex;
			flex-direction: column;
			width: 100%;
			padding-top: 12rpx;
			border-bottom: 1px solid $uni-border-color;

			.row {
				display: flex;
				flex-direction: row;
			}

			.user-head {
				flex: auto;
			}

			.user-img {
				width: $uni-img-size-lg;
				height: $uni-img-size-lg;
				border-radius: $uni-border-radius-base;
			}

			.title {
				flex: none;
				padding: 0 $uni-spacing-col-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 112rpx;
			}

			.head {
				height: 148rpx;
				display: flex;
				align-items: center;
			}

			.cont {
				flex: auto;
				font-size: $uni-font-size-lg;
				color: $uni-text-color-grey;
				line-height: 112rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.more {
				flex: none;
				height: 112rpx;
				display: flex;
				align-items: center;

				image {
					width: 80rpx;
					height: 28rpx;
				}
			}
		}

		.bt2 {
			margin-top: 160rpx;
			text-align: center;
			font-size: $uni-font-size-lg;
			font-weight: 400;
			color: $uni-color-warning;
			line-height: 88rpx;
		}
		.meslist_canvas{
			position: fixed;
			top:0;
			width: 200px;
			height: 200px;
			visibility: hidden;
		}
	}
	// 修改弹框
	.modify{
		position: fixed;
		z-index: 1002;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: #fff;
		.modify-header{
			width:100%;
			height: 88rpx;
			padding-top: var(--status-bar-height);
			display: flex;
			flex-direction: row;
			align-items: center;
			border-bottom: 1px solid $uni-border-color;
			.close{
				padding-left: 32rpx;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 44rpx;
			}
			.title{
				line-height: 88rpx;
				color: $uni-text-color;
				font-size:40rpx;
				flex: auto;
				text-align: center;
			}
			.define{
				padding-right: $uni-spacing-col-base;
				font-size: $uni-font-size-lg;
				color: $uni-color-success;
				line-height: 44rpx;
			}
		}
		.modfiy-main{
			display: flex;
			padding:$uni-spacing-col-base;
			flex-direction: column;
			.modfiy-pwd{
				flex: auto;
				width: 100%;
				padding: 0 20rpx;
				box-sizing: border-box;
				height: 88rpx;
				margin-bottom: $uni-spacing-col-base;
				background:$uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 88rpx;
				
			}
			.modfiy-content{
				flex: auto;
				width: 100%;
				height: 386rpx;
				background:$uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 44rpx;
				padding: 16rpx 20rpx;
				box-sizing: border-box;
			}
		}
	}
</style>

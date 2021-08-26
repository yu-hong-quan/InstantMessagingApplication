<template>
	<view class="contents">
		<view class="top-bar">
			<view class="top-bar-left" @click="backOne">
				<image src="../../static/images/common/back1.png" mode="" class="back-img"></image>
			</view>
			<view class="top-bar-right">
				<view class="more-img">
					<image src="../../static/images/group/more1.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="top-bar bgbar" :animation="animationData">
			<view class="top-bar-left" @click="backOne">
				<image src="../../static/images/common/back.png" mode="" class="back-img"></image>
			</view>
			<view class="top-bar-right">
				<view class="more-img">
					<image src="../../static/images/group/more.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="bg">
			<image :src="gimg" alt="aspectFill" class="bg-img"></image>
		</view>
		<view class="main">
			<view class="main-inner">
				<view class="inf">
					<view class="name">今天很好</view>
					<view class="time">2020/11/1</view>
					<view class="notice">文件（Object）上传至存储空间（Bucket）后，OSS会自动生成文件URL，您可以直接通过文件URL文件（Object）上传至存储空间（Bucket）后，OSS会自动生成文件URL，您可以直接通过文件URL</view>
				</view>
				<view class="member">
					<view class="top">
						<view class="title">群成员</view>
						<view class="more">
							管理群成员
						</view>
						<image src="../../static/images/common/more.png" mode="aspectFit" class="more-img"></image>
					</view>
					<view class="member-ls">
						<view class="member-li" v-for="(item,index) in groupmember" :key="index">
							<view class="imgs">
								<image src="../../static/images/group/delete.png" mode="aspectFill" class="delete"></image>
								<image :src="item.imgurl" mode="aspectFit" class="user-img"></image>
							</view>
							<view class="name">{{item.name}}</view>
						</view>
						<view class="member-li">
							<view class="imgs">
								<image src="../../static/images/group/add.png" mode="aspectFill" class="user-add"></image>
							</view>
							<view class="name">邀请</view>
						</view>
					</view>
				</view>
				<view class="mitem">
					<view class="row">
						<view class="title">群名称</view>
						<view class="cont" @tap="modify('群名称','今天天气真好呀',true)">今天天气真好呀</view>
						<view class="more">
							<image src="../../static/images/common/more.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="row">
						<view class="title">群头像</view>
						<view class="user-head">
							<image-cropper :src="tempFilePath" @confirm="confirm"  @cancel="cancel"></image-cropper>
							<image :src="gimg" @tap="upload" class="user-img"></image>
							<canvas  id="myCanvas"  canvas-id="myCanvas" class="meslist_canvas" crop-width="200"  crop-height="200"></canvas>
						</view>
						<view class="more">
							<image src="../../static/images/common/more.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="row">
						<view class="title">群公告</view>
						<view class="cont" @tap="modify('群公告','爱祖国爱人民',true)">爱祖国爱人民</view>
						<view class="more">
							<image src="../../static/images/common/more.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="row">
						<view class="title">群内名</view>
						<view class="cont" @tap="modify('群内名','小僧',true)">小僧</view>
						<view class="more">
							<image src="../../static/images/common/more.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="row">
						<view class="title">消息免打扰</view>
						<view class="cont"></view>
						<view class="more">
							 <switch :checked="swit" @change="switchChange" color="rgba(255,228,49,1)" class="switch"/>
						</view>
					</view>
				</view>
				<view class="bt2" @tap="quit">解散群</view>
			</view>
		</view>
		<view class="modify" :animation="animationData2" :style="{bottom:-+widHeight + 'px'}">
			<view class="modify-header">
				<view class="close" @tap="modify()">取消</view>
				<view class="title">{{modifyTitle}}</view>
				<view class="define" @tap="modifyStbmit">确定</view>
			</view>
			<view class="modfiy-main">
				<textarea v-model="dataText" class="modfiy-content" placeholder="" />
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js';
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
	export default {
		data() {
			return {
				gimg:'',
				gid:'',
				groupmember:[],
				swit:false,
				tempFilePath: '',
				top:0,
				animationData:{},
				modifyTitle:'',
				animationData2:{},//动画实例
				isModfiy:false,//动画开关
				widHeight:'',
				dataText:'修改的内容',
			};
		},
		components:{ImageCropper},
		onLoad(e) {
			console.log(e)
			this.gid = e.gid;
			this.gimg = e.gimg;
			this.getMember();
			
		},
		onReady() {
			this.getTop()
			this.getElementStyle();
		},
		methods:{
			// 返回至上一页
			backOne(){
				uni.navigateBack({data:1})
			},
			// 跳转个人详情页
			goUserDetails(){
				uni.navigateTo({
					url:'../userdetails/userdetails'
				})
			},
			// 获取元素距离顶部得高度
			getTop(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.main-inner').boundingClientRect(data => {
					this.top = data.top;
				}).exec();
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
			// 获取群成员
			getMember(){
				let members = datas.friends();
				for (let i=0; i<members.length; i++) {
					members[i].imgurl = `../../static/images/img/${members[i].imgurl}`;
					
				}
				this.groupmember = members;
				console.log(this.groupmember)
			},
			switchChange: function (e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
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
				this.gimg = e.detail.tempFilePath;
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
			// 顶部切换动画
			addAnimat(){
				var animation = uni.createAnimation({
					duration:300,
					timingFunction:"linear",
				})
				if(this.top<80){
					animation.opacity(1).step();
				}else{
					animation.opacity(0).step()
				}
				this.animationData = animation.export();
			},
			// 修改项弹框
			modify(type,data){
				this.isModfiy = !this.isModfiy;
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
				this.animationData2 = animation.export()
			},
			// 弹窗修改确定
			modifyStbmit(){
				this.modify()
			}
		},
		onPageScroll() {
			this.getTop()
			this.addAnimat()
		},
	}
</script>

<style lang="scss">
	@import  "../../commons/css/mycss.scss";
	.bgbar{
		opacity: 0;
		background: #fff;
	}
	.bg{
		width: 100%;
		height: 100%;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		.bg-img{
			width: 100%;
			height: 750rpx;
		}
	}
	.main{
		padding-top: 360rpx;
		.main-inner{
			width: 100%;
			min-height: 720rpx;
			background: #fff;
			border-radius: 40rpx 40rpx 0 0;
		}
		.inf{
			padding:$uni-spacing-row-base $uni-spacing-col-base 0;
			padding-bottom: 40rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;
			.name{
				float: left;
				font-size: 48rpx;
				font-weight: 600;
				color: #272832;
				line-height: 66rpx;
			}
			.time{
				float: right;
				font-size: 28rpx;
				color: rgba(39,40,50,.5);
				line-height: 66rpx;
			}
			.notice{
				padding-top: 20rpx;
				
				clear: both;
				font-size: 28rpx;
				line-height: 40rpx;
				display: -webkit-box;
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2;
				overflow: hidden;
			}
		}
		.member{
			border-bottom: 1px solid #eee;
			.top{
				padding:$uni-spacing-row-base $uni-spacing-col-base 0;
				box-sizing: border-box;
				height: 100rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				padding-bottom: 20rpx;
				.title{
					flex: 1;
					font-size: 36rpx;
					font-weight: 600;
					color: #272B32;
				}
				.more{
					float: right;
					padding-right: 20rpx;
					font-size: 32rpx;
					font-weight: 400;
					color: rgba(39,40,50,.6);
				}
				.more-img{
					width:16rpx;
					height: 28rpx;
				}
			}
			.member-ls{
				width: 100%;
				padding: 20rpx 16rpx;
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
			}
			.member-li{
				width: 20%;
				padding-bottom: 32rpx;
				float: left;
				text-align: center;
				.imgs{
					display: inline-block;
					position: relative;
					width: 104rpx;
					height: 104rpx;
					border-radius: 20rpx;
					background-color: $uni-color-primary;
					
				}
				.user-img{
					width: 104rpx;
					height: 104rpx;
					border-radius: 20rpx;
				}
				.delete{
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					z-index: 10;
					top: -15rpx;
					right: -15rpx;
				}
				.name{
					padding:0 8rpx;
					font-size: 28rpx;
					color: #272832;
					line-height: 40rpx;
					display: -webkit-box;
					-webkit-box-orient:vertical;
					-webkit-line-clamp:1;
					overflow: hidden;
				}
				.user-add{
					width: 104rpx;
					height: 104rpx;
					padding: 32rpx;
					box-sizing: border-box;
				}
			}
		}
		.mitem{
			border-bottom: 1px solid #eee;
			.row {
				display: flex;
				flex-direction: row;
			}
			
			.user-head {
				flex: auto;
				display: flex;
				align-items: center;
			}
			
			.user-img {
				width: 80rpx;
				height:80rpx;
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
				height: 112rpx;
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
			.switch{
				margin-right: 22rpx;
			}
		}
		.meslist_canvas{
			position: fixed;
			top:0;
			width: 200px;
			height: 200px;
			visibility: hidden;
		}
		.bt2 {
			margin: 60rpx 0;
			text-align: center;
			font-size: $uni-font-size-lg;
			font-weight: 400;
			color: $uni-color-warning;
			line-height:100rpx;
			padding-bottom: env(safe-area-inset-bottom);
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

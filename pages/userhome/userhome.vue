<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @click="backOne">
				<image src="../../static/images/common/back.png" mode="" class="back-img"></image>
			</view>
			<view class="top-bar-right" @click="goUserDetails">
				<view class="more-img">
					<image src="../../static/images/group/more.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="bg">
			<view class="bg-bai" :animation="animationData5"></view>
			<image src="../../static/images/img/four.png" mode="aspectFill" class="bg-img"></image>
		</view>
		<view class="main">
			<view class="user-header">
				<view class="sex" :style="{background:sexBg}" :animation="animationData4">
					<image src="../../static/images/userhome/female.png" mode=""></image>
				</view>
				<image src="../../static/images/img/four.png" mode="aspectFill" class="user-img" :animation="animationData3"></image>
			</view>
			<view class="user-imf">
				<view class="name">{{user.name}}</view>
				<view class="nick">昵称:{{user.nick}}</view>
				<view class="intr">{{user.intr}}</view>
			</view>
		</view>
		<view class="bottom-bar">
			<view class="bottom-btn btn1" @tap="addFriendAnimat">加为好友</view>
		</view>
		
		<view class="add-misg" :style="{height:`${addHeight}px`,bottom:`-${addHeight}px`}" :animation="animationData">
			<view class="name">{{user.name}}</view>
			<textarea :value="myname + '请求加为好友~'" placeholder="亲爱的,快点到我这里来~" maxlength="120" class="add-main"/>
		</view>
		<view class="add-bt bottom-bar" :animation="animationData2">
			<view class="close btn1 " @tap="addFriendAnimat">取消</view>
			<view class="send btn1">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexBg:'rgba(255,93,91,1)',
				myname:'春雨',
				user:{
					name:'秋田',
					nick:'秋之国',
					intr:'人生短暂，做美好的自己。人生短暂，做美好的自己。人生短暂，做美好的自己。人生短暂，做美好的自己。'
				},
				addHeight:'',
				animationData:{},//动画实例
				animationData2:{},
				animationData3:{},
				animationData4:{},
				animationData5:{},
				isAdd:false,
			};
		},
		onReady() {
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
			// 获取元素位置等信息
			getElementStyle(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.bg').boundingClientRect(data => {
					console.log("得到布局位置信息" + JSON.stringify(data));
					console.log("节点离页面顶部的距离为" + data.top);
					this.addHeight = data.height - 186;
				}).exec();
			},
			// 添加好友动画
			addFriendAnimat(){
				this.isAdd = !this.isAdd;
				var animation = uni.createAnimation({
					duration:300,
					timingFunction:"ease",
				})
				var animation2 = uni.createAnimation({
					duration:600,
					timingFunction:"ease",
				})
				var animation3 = uni.createAnimation({
					duration:300,
					timingFunction:"ease",
				})
				var animation4 = uni.createAnimation({
					duration:300,
					timingFunction:"ease",
				})
				var animation5 = uni.createAnimation({
					duration:300,
					timingFunction:"ease",
				})
				/*
					温馨提示如果传入 Number类型的值 则默认使用 px，
				*/
				if(this.isAdd){
					animation.bottom(0).step();
					animation2.bottom(0).step();
					animation3.width('240rpx').height('240rpx').top('60rpx').left('-200rpx').step();
					animation4.opacity(0).step();
					animation5.backgroundColor('rgba(255,228,49,.4)').step();
				}else{
					animation.bottom(-this.addHeight).step();
					animation2.bottom(-100).step();
					animation3.width().height().top('0rpx').left('0rpx').step();
					// animation3.width('400rpx').height('400rpx').top('0rpx').left('0rpx').step();
					animation4.opacity(1).step();
					animation5.backgroundColor('rgba(255,255,255,0)').step();
				}
				
				this.animationData = animation.export();
				this.animationData2 = animation2.export();
				this.animationData3 = animation3.export();
				this.animationData4 = animation4.export();
				this.animationData5 = animation5.export();
			}
		}
	}
</script>

<style lang="scss">
	@import  "../../commons/css/mycss.scss";
	.bg{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -2;
		.bg-bai{
			width: 100%;
			height: 100%;
		}
		.bg-img{
			opacity: 0.4;
			position: absolute;
			z-index: -1;
			left: -10rpx;
			top: -10rpx;
			width: 110%;
			height: 110%;
			filter:blur(16px);
		}
	}
	.main{
		text-align: center;
		padding-top: var(--status-bar-height); // 处理app端顶部自定义tabbar被消息栏遮挡问题
		.user-header{
			position: relative;
			padding-top: 148rpx;
			margin: 0 auto;
			width: 412rpx;
			height: 412rpx;
			.sex{
				position: absolute;
				bottom: 22rpx;
				z-index: 11;
				right: 22rpx;
				width: 64rpx;
				height: 64rpx;
				border-radius: $uni-border-radius-circle;
				image{
					padding: 16rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}
			.user-img{
				width: 400rpx;
				height: 400rpx;
				z-index: 10;
				border-radius: 48rpx;
				border: 6rpx solid rgba(255,255,255,1);
				top:0rpx;
				left: 0;
				box-shadow: 0rpx 36rpx 40rpx 0rpx rgba(39,40,50,0.1);
				// position: absolute;
			}
		}
		.user-imf{
			padding-top: 42rpx;
			.name{
				font-size: 52rpx;
				color: $uni-text-color;
				line-height: 74rpx;
			}
			.nick{
				font-size: $uni-font-size-base;
				line-height: 40rpx;
				color: $uni-text-color;
			}
			.intr{
				width: 552rpx;
				font-size: $uni-font-size-base;
				padding: 20rpx 100rpx;
				font-weight: 300;
				line-height: 48rpx;
				color: $uni-text-color;
			}
		}
	}
	.bottom-bar{
		.bottom-btn{
			background: $uni-color-primary;
			margin: 0 $uni-spacing-col-base;
		}
	}
	.add-misg{
		width: 100%;
		background: rgba(255,255,255,1);
		position: fixed;
		padding: 0 56rpx;
		box-sizing: border-box;
		border-radius: 40rpx 40rpx 0px 0px;
		.name{
			padding: 168rpx 0 40rpx;
			font-size: 52rpx;
			color: $uni-text-color;
			line-height: 74rpx;
		}
		.add-main{
			padding: 18rpx 22rpx;
			height: 320rpx;
			width: 100%;
			box-sizing: border-box;
			background: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
			line-height: 44rpx;
		}
	}
	.add-bt{
		bottom: -200rpx;
		z-index: 100;
		display: flex;
		.close{
			width: 172rpx;
			background: $uni-bg-color-hover;
			border-radius: $uni-border-radius-sm;
			margin-left: $uni-spacing-col-base;
		}
		.send{
			margin: 0 $uni-spacing-col-base;
			flex: auto;
			background: $uni-color-primary;
		}
	}
</style>

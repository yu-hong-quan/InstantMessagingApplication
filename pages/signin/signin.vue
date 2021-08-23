<template>
	<view class="contents">
		<view class="top-bar">
			<view class="top-bar-right" @click="toSignUp">
				<view class="text">注册</view>
			</view>
		</view>
		<view class="logo">
			<image src="../../static/images/index/logo.png" mode=""></image>
		</view>
		<view class="main">
			<view class="title">登录</view>
			<view class="slogan">您好，欢迎来到yike！</view>
			<view class="inputs">
				<input type="text" value="" placeholder="用户名/邮箱" placeholder-style="color:#bbb;font-weight:400;" class="user" @blur="getUser"/>
				<input type="password" value="" placeholder="密码" placeholder-style="color:#bbb;font-weight:400;" class="psw" @blur="getPassword"/>
			</view>
			<view class="tips">输入用户或密码错误!</view>
		</view>
		<view class="submit" @tap="login">登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:'',
				psw:''
			};
		},
		methods:{
			// 跳转至注册页面
			toSignUp(){
				uni.navigateTo({
					url:'../signup/signup'
				})
			},
			// 获取失去焦点后用户名输入框内的值
			getUser(e){
				this.user = e.detail.value;
			},
			// 获取失去焦点后密码输入框内的值
			getPassword(e){
				this.psw = e.detail.value;
			},
			// 登录提交
			login(){
				if(this.user && this.psw){
					console.log('提交')
				}
			}
		}
	}
</script>

<style lang="scss">
	@import  "../../commons/css/mycss.scss";
	.logo {
		text-align: center;
		image{
			padding-top: 256rpx;
			width: 194rpx;
			height: 92rpx;
			margin: 0 auto;
		}
	}
	.main{
		padding:54rpx $uni-spacing-row-lg 120rpx;
		.title{
			font-size: 56rpx;
			font-weight: 500;
			color: $uni-text-color;
			line-height: 80rpx;
		}
		.slogan{
			font-size: 40rpx;
			color: $uni-text-color-grey;
			line-height: 56rpx;
		}
		.inputs{
			padding-top: 8rpx;
			input{
				height: 88rpx;
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height:88rpx;
				border-bottom: 1px solid $uni-border-color;
				padding-top: 40rpx;
			}
		}
		.tips{
			float: left;
			font-size: $uni-font-size-lg;
			color: $uni-color-warning;
			line-height:56rpx;
		}
	}
	.submit{
		margin:0 auto;
		width: 520rpx;
		height: 96rpx;
		background:$uni-color-primary;
		box-shadow: 0px 50rpx 32rpx -36rpx rgba(255,228,49,.4);
		border-radius: 48rpx;
		font-size: $uni-font-size-lg;
		font-weight: 500;
		line-height: 96rpx; 
		color: $uni-text-color;
		text-align: center;
	}
</style>

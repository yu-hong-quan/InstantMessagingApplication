<template>
	<view class="contents">
		<view class="top-bar">
			<view class="top-bar-contaner">
				<view class="top-bar-right" @click="toSignUp">
					<view class="text">注册</view>
				</view>
			</view>
		</view>
		<view class="logo">
			<image src="../../static/images/index/logo.png" mode=""></image>
		</view>
		<view class="main">
			<view class="title">登录</view>
			<view class="slogan">您好，欢迎来到小鱼交友App！</view>
			<view class="inputs">
				<input type="text" :value="user" placeholder="用户名" placeholder-style="color:#bbb;font-weight:400;"
					class="user" @blur="getUser" />
				<input type="text" :value="psw" placeholder="密码" placeholder-style="color:#bbb;font-weight:400;"
					class="psw" @blur="getPassword" />
			</view>
			<view class="tips" v-show="isShowTips">用户名或密码错误!</view>
		</view>
		<view class="submit" @tap="login">登录</view>

		<!-- 提示信息弹窗 -->
		<uni-popup ref="messageTost" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import request from '@/request/http';
	export default {
		data() {
			return {
				user: '小余',
				psw: '123123',
				token: '',
				isShowTips: false,
				msgType: '',
				messageText: '',
				isClickLogin: true,
			};
		},
		onLoad(options) {
			console.log(options);
			uni.removeStorageSync('xiaoyuApp_token');
			uni.removeStorageSync('userInfo');
			if (options.username) {
				this.user = options.username;
			}
		},
		methods: {
			// 跳转至注册页面
			toSignUp() {
				uni.navigateTo({
					url: '../signup/signup'
				})
			},
			// 获取失去焦点后用户名输入框内的值
			getUser(e) {
				this.user = e.detail.value;
			},
			// 获取失去焦点后密码输入框内的值
			getPassword(e) {
				this.psw = e.detail.value;
			},
			// 登录提交
			async login() {
				if (this.user && this.psw && this.isClickLogin) {
					this.isClickLogin = false;
					uni.showLoading({
						title: '正在登录中...',
						mask: true,
					});
					try {
						const res = await request('/login', 'POST', {
							username: this.user,
							password: this.psw,
						})
						if (res.code === 200) {
							uni.setStorageSync('xiaoyuApp_token', res.token);
							uni.setStorageSync('xiaoyuApp_userid',res.user_id);
							this.token = res.token;
							this.messageToggle('success', '登录成功');
							setTimeout(() => {
								uni.hideLoading();
								uni.reLaunch({
									url:`/pages/index/index`
								})
								this.user = '';
								this.psw = '';
							}, 1000)
						} else if (res.code === 401) {
							uni.hideLoading();
							this.messageToggle('error', '用户名或密码错误，请重新输入')
							this.isClickLogin = true;
						}
					} catch {
						this.isClickLogin = true;
					}
				} else {
					this.messageToggle('warn', '请输入用户名或密码');
					this.isClickLogin = true;
				}
			},
			// tost消息窗
			messageToggle(type, text) {
				this.msgType = type
				this.messageText = text
				this.$refs.messageTost.open()
			},
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.logo {
		text-align: center;

		image {
			padding-top: 256rpx;
			width: 194rpx;
			height: 92rpx;
			margin: 0 auto;
		}
	}

	.main {
		padding: 54rpx $uni-spacing-row-lg 120rpx;

		.title {
			font-size: 56rpx;
			font-weight: 500;
			color: $uni-text-color;
			line-height: 80rpx;
		}

		.slogan {
			font-size: 40rpx;
			color: $uni-text-color-grey;
			line-height: 56rpx;
		}

		.inputs {
			padding-top: 8rpx;

			input {
				height: 88rpx;
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 88rpx;
				border-bottom: 1px solid $uni-border-color;
				padding-top: 40rpx;
			}
		}

		.tips {
			float: left;
			font-size: $uni-font-size-lg;
			color: $uni-color-warning;
			line-height: 56rpx;
		}
	}

	.submit {
		margin: 0 auto;
		width: 520rpx;
		height: 96rpx;
		background: $uni-color-primary;
		box-shadow: 0px 50rpx 32rpx -36rpx rgba(255, 228, 49, .4);
		border-radius: 48rpx;
		font-size: $uni-font-size-lg;
		font-weight: 500;
		line-height: 96rpx;
		color: $uni-text-color;
		text-align: center;
	}
</style>
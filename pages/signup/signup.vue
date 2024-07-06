<template>
	<view class="contents">
		<view class="top-bar">
			<view class="top-bar-contaner">
				<view class="top-bar-left" @click="backOne">
					<image src="../../static/images/common/back.png" mode="" class="back-img"></image>
				</view>
			</view>
		</view>
		<view class="logo">
			<image src="../../static/images/index/logo.png" mode=""></image>
		</view>
		<view class="main">
			<view class="title">注册</view>
			<view class="inputs">
				<view class="inputs-div">
					<input type="text" value="" placeholder="请取个名字" placeholder-class="ipt-placeholder-style"
						@input="getUsr" class="user" />
					<view class="employ" v-show="useremploy">名字已被占用</view>
					<image src="../../static/images/sign/right1.png" mode="" class="ok" v-show="isuser"></image>
				</view>
				<view class="inputs-div">
					<input type="text" value="" placeholder="请输入邮箱" placeholder-class="ipt-placeholder-style"
						@input="isemailFnc" class="email" />
					<view class="employ" v-show="emailemploy">邮箱已被占用</view>
					<view class="invalid" v-show="invalid">邮箱无效</view>
					<image src="../../static/images/sign/right1.png" mode="" class="ok" v-show="isemail"></image>
				</view>
				<view class="inputs-div">
					<input :type="type" value="" placeholder="请输入密码且长度不得小于5" @input="getPsw" class="psw"
						placeholder-class="ipt-placeholder-style" />
					<image :src="lookurl" mode="" class="look" @click="looks"></image>
				</view>

			</view>
		</view>
		<view :class="[{submit:isok},{submit1:!isok}]" @click="isok ? submit() : ''">注册</view>

		<!-- 提示信息弹窗 -->
		<uni-popup ref="messageTost" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2500"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import {
		debounce
	} from '../../utils/index.js';
	import request from '@/request/http';
	export default {
		data() {
			return {
				isuser: false, //用户名是否可用
				isemail: false, //邮箱是否可用
				look: true, //是否显示密码
				invalid: false, //邮箱是否符合
				useremploy: false, //用户名是否被占用
				emailemploy: false, //邮箱是否被占用
				lookurl: '../../static/images/sign/look.png',
				type:'text',
				email: '', //邮箱
				user: '', //用户名称
				psw: '', //密码
				isok: false,
				msgType: '',
				messageText: '',
				isClickSubmit: true,
			};
		},
		methods: {
			// 返回至上一页
			backOne() {
				uni.navigateBack({
					data: 1
				})
			},
			// 密码显示隐藏方法
			looks() {
				if (this.look) {
					this.type = 'password';
					this.look = false;
					this.lookurl = '../../static/images/sign/biyan.png';
				} else {
					this.type = 'text';
					this.look = true;
					this.lookurl = '../../static/images/sign/look.png';
				}
			},
			// 监听邮箱输入
			isemailFnc: debounce(function(e) {
				if (e.detail.value.trim() !== '') {
					let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
					this.email = e.detail.value;
					if (reg.test(this.email)) {
						this.invalid = false;
						this.isemail = true;
					} else {
						this.invalid = true;
						this.isemail = false;
					}
				} else {
					this.invalid = false;
					this.isemail = false;
				}

			}, 500),
			// 监听用户名输入
			getUsr: debounce(function(e) {
				if (e.detail.value.trim() !== '') {
					this.user = e.detail.value.trim();
					this.checkUserExists(this.user);
					this.isOk();
				} else {
					this.isuser = false;
					this.useremploy = false;
				}
			}, 500),
			// 监听密码输入
			getPsw: debounce(function(e) {
				this.psw = e.detail.value;
				this.isOk()
			}, 500),
			// 判断是否可以点击注册了
			isOk() {
				if (this.isuser && this.isemail && this.psw.length >= 5) {
					this.isok = true;
				} else {
					this.isok = false;
				}
			},
			// 查询用户名是否存在
			async checkUserExists(val) {
				try {
					const res = await request('/checkUserExists', 'POST', {
						username: val
					});
					console.log(res);
					if (res.code === 200 && res.user_id) {
						this.useremploy = true;
						this.isuser = false;
						this.messageToggle('error', '名字已被占用，请重新输入')
					} else {
						this.isuser = true;
						this.useremploy = false;
					}
				} catch {
					console.log('Failed to fetch user data:');
				}
			},
			// 提交注册
			async submit() {
				if (this.isClickSubmit) {
					this.isClickSubmit = false;
					uni.showLoading({
						title: '正在注册中...',
						mask: true,
					});
					try {
						const res = await request('/register', 'POST', {
							username: this.user,
							password: this.psw,
							email: this.email
						})
						if (res.code === 200) {
							uni.hideLoading();
							this.messageToggle('success', res.message)
							setTimeout(() => {
								uni.navigateTo({
									url: `/pages/signin/signin?username=${res.username}`
								})
							}, 800)
						}
					} catch {
						this.isClickSubmit = true;
					}
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

		.inputs-div {
			position: relative;
		}

		.employ,
		.invalid {
			position: absolute;
			right: 0;
			top: 40rpx;
			font-size: $uni-font-size-base;
			font-weight: 500;
			color: $uni-color-warning;
			line-height: 88rpx;
		}

		.ok {
			position: absolute;
			width: 38rpx;
			height: 30rpx;
			top: 76rpx;
			right: 0;
		}

		.look {
			position: absolute;
			right: 0;
			top: 76rpx;
			width: 32rpx;
			height: 18rpx;
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

	.submit1 {
		margin: 0 auto;
		width: 520rpx;
		height: 96rpx;
		background: rgba(30, 40, 50, .2);
		border-radius: 48rpx;
		font-size: $uni-font-size-lg;
		font-weight: 500;
		line-height: 96rpx;
		color: $uni-text-color-inverse;
		text-align: center;
	}
</style>
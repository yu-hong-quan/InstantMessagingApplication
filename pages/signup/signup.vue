<template>
	<view class="contents">
		<view class="top-bar">
			<view class="top-bar-left" @click="toSignin">
				<image src="../../static/images/common/back.png" mode="" class="back-img"></image>
			</view>
		</view>
		<view class="logo">
			<image src="../../static/images/index/logo.png" mode=""></image>
		</view>
		<view class="main">
			<view class="title">注册</view>
			<view class="inputs">
				<view class="inputs-div">
					<input type="text" value="" placeholder="请取个名字" placeholder-style="color:#bbb;font-weight:400;" @input="getUsr" class="user"/>
					<view class="employ" v-show="useremploy">名字已被占用</view>
					<image src="../../static/images/sign/right1.png" mode="" class="ok" v-show="isuser"></image>
				</view>
				<view class="inputs-div">
					<input type="text" value="" placeholder="请输入邮箱" placeholder-style="color:#bbb;font-weight:400;" @input="isemailFnc" class="email"/>
					<view class="employ" v-show="emailemploy">邮箱已被占用</view>
					<view class="invalid" v-show="invalid">邮箱无效</view>
					<image src="../../static/images/sign/right1.png" mode="" class="ok" v-show="isemail"></image>
				</view>
				<view class="inputs-div">
					<input type="password" value="" placeholder="请输入密码" placeholder-style="color:#bbb;font-weight:400;" @input="getPsw" class="psw"/>
					<image :src="lookurl" mode="" class="look" @click="looks"></image>
				</view>
				
			</view>
		</view>
		<view :class="[{submit:isok},{submit1:!isok}]">注册</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'password',
				isuser:false,//用户名是否可用
				isemail:false,//邮箱是否可用
				look:true,//是否显示密码
				invalid:false,//邮箱是否符合
				useremploy:false,//用户名是否被占用
				emailemploy:false,//邮箱是否被占用
				lookurl:'../../static/images/sign/look.png',
				email:'',//邮箱
				user:'',//用户名称
				psw:'',//密码
				isok:false,
			};
		},
		methods:{
			// 返回至上一页
			toSignin(){
				uni.navigateBack({data:1})
			},
			// 密码显示隐藏方法
			looks(){
				if(this.look){
					this.type = 'password';
					this.look = false;
					this.lookurl = '../../static/images/sign/biyan.png';
				}else{
					this.type = 'text';
					this.look = true;
					this.lookurl = '../../static/images/sign/look.png';
				}
			},
			// 判断是否为邮箱格式
			isemailFnc(e){
				console.log(e.detail.value)
				let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
				this.email = e.detail.value;
				if(this.email.length > 0){
					if(reg.test(this.email)){
						this.invalid = false;
						this.isemail = true;
					}else{
						this.invalid = true;
						this.isemail = false;
					}
				}else{
					this.invalid = true;
					this.isemail = false;
				}
			},
			// 获取用户名
			getUsr(e){
				this.user = e.detail.value;
				this.isOk();
			},
			// 获取密码
			getPsw(e){
				this.psw = e.detail.value;
				this.isOk()
			},
			// 判断是否可以点击注册了
			isOk(){
				if(this.isuser && this.isemail && this.psw.length > 5){
					this.isok = true;
				}else{
					this.isok = false; 
				}
			}
		}
	}
</script>

<style lang="scss">
	.contents{
		padding-top: var(--status-bar-height);// 处理app端顶部自定义tabbar被消息栏遮挡问题
		
	}
	.top-bar{
		width: 100%;
		height: 88rpx;
		position: fixed;
		z-index: 1001;
		top: 0;
		left: 0;
		background: $uni-bg-color;
		padding-top: var(--status-bar-height);// 处理app端顶部自定义tabbar被消息栏遮挡问题
		.top-bar-left{
			float: left;
			padding-left: 32rpx;
			width: 88rpx;
			height: 88rpx;
			.text{
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 88rpx;
			}
			.back-img{
				width: 26rpx;
				height: 46rpx;
				margin-top: 21rpx;
			}
		}
	}
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
		.inputs-div{
			position: relative;
		}
		.employ,.invalid{
			position: absolute;
			right: 0;
			top: 40rpx;
			font-size: $uni-font-size-base;
			font-weight: 500;
			color: $uni-color-warning;
			line-height: 88rpx;
		}
		.ok{
			position: absolute;
			width: 38rpx;
			height: 30rpx;
			top: 76rpx;
			right: 0;
		}
		.look{
			position: absolute;
			right: 0;
			top: 76rpx;
			width: 32rpx;
			height: 18rpx;
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
	.submit1{
		margin:0 auto;
		width: 520rpx;
		height: 96rpx;
		background:rgba(30,40,50,.2);
		border-radius: 48rpx;
		font-size: $uni-font-size-lg;
		font-weight: 500;
		line-height: 96rpx; 
		color: $uni-text-color-inverse;
		text-align: center;
	}
</style>

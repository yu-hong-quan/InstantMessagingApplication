<template>
	<view class="contents">
		<!-- 顶部标题栏 -->
		<view class="top-bar">
			<view class="top-bar-center">
				<view class="text">头文字D</view>
			</view>
			<view class="top-bar-left" @click="backOne">
				<image src="../../static/images/common/back.png" mode="" class="back-img"></image>
			</view>
			<view class="top-bar-right">
				<view class="pice"></view>
				<view class="group-img">
					<image src="../../static/images/img/two.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<!-- 主体聊天内容栏 -->
		<scroll-view class="chat" scroll-y="true" scroll-with-animation="true">
			<view class="chat-main">
				<view class="chat-ls" v-for="(item,index) in msgs" :key="index">
					<!-- 消息时间 -->
					<view class="chat-time">{{changeTime(item.time)}}</view>
					<!-- 消息内容-左边 -->
					<view class="msg-m msg-left" v-if="item.id != 'b'">
						<!-- 用户头像 -->
						<image :src="item.imgurl" mode="" class="user-img"></image>
						<!-- 发送的消息 -->
						<view class="message">
							<!-- 文字类型的消息 -->
							<view class="msg-text">{{item.message}}</view>
						</view>
					</view>
					<!-- 消息内容-右边 -->
					<view class="msg-m msg-right" v-if="item.id == 'b'">
						<!-- 用户头像 -->
						<image src="../../static/images/img/four.png" mode="" class="user-img"></image>
						<!-- 发送的消息 -->
						<view class="message">
							<!-- 文字类型的消息 -->
							<view class="msg-text">您好啊，我的朋友。您好啊，我的朋友。您好啊，我的朋友。您好啊，我的朋友。您好啊，我的朋友。</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js';
	import myfun from '../../commons/js/myfun.js';
	export default {
		data() {
			return {
				msgs:[],
			};
		},
		onLoad() {
			this.getMsg()
		},
		methods:{
			// 返回至上一页
			backOne() {
				uni.navigateBack({
					data: 1
				})
			},
			// 处理时间
			changeTime(date) {
				return myfun.dateTime(date)
			},
			// 获取聊天数据
			getMsg(){
				let msg = datas.message();
				for(let i=0; i<msg.length; i++){
					msg[i].imgurl = `../../static/images/img/${msg[i].imgurl}`;
					if(msg[i].type == 1){
						msg[i].message = `../../static/images/img/${msg[i].message}`;
					}
					// 倒序插入
					this.msgs.unshift(msg[i])
				}
				console.log(this.msgs);
			}
		}
	}
</script>

<style lang="scss">
	@import  "../../commons/css/mycss.scss";
	page{
		height: 100%;
	}
	.contents{
		height: 100%;
		background:rgba(244,244,244,.95);
	}
	.top-bar{
		background: rgba(244,244,244,.95);
		border-bottom: 1px solid $uni-border-color;
		.group-img{
			position: absolute;
			bottom: 10rpx;
			right: $uni-spacing-col-base;
			width: 68rpx;
			height: 68rpx;
			image {
				width: 68rpx;
				height: 68rpx;
				border-radius: 16rpx;
			}
		}
	}
	.chat{
		height: 100%;
		.chat-main{
			padding-left: $uni-spacing-col-base;
			padding-right: $uni-spacing-col-base;
			padding-top: 100rpx;
			padding-bottom: 120rpx;
			display: flex;
			flex-direction: column;
		}
		.chat-ls{
			.chat-time{
				font-size: $uni-font-size-sm;
				line-height: 34rpx;
				color: rgba(39,40,50,.3);
				padding: 20rpx 0;
				text-align: center;
			}
			.msg-m{
				display: flex;
				padding: 20rpx 0;
				.user-img{
					flex: none;
					width: $uni-img-size-sm;
					height: $uni-img-size-sm;
					border-radius: $uni-border-radius-base;
				}
				.message{
					max-width: 480rpx;
					flex: auto;
				}
				.msg-text{
					font-size: $uni-font-size-lg;
					padding: 18rpx 24rpx;
					line-height: 44rpx;
					color: $uni-text-color;
				}
				
			}
			.msg-left{
				flex-direction: row;
				.msg-text{
					margin-left: 16rpx;
					background-color:#fff;
					border-radius: 0px 20rpx 20rpx 20rpx;
				}
			}
			.msg-right{
				flex-direction: row-reverse;
				.msg-text{
					margin-right: 16rpx;
					background-color:#fff260;
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}
			}
		}
	}
</style>

<template>
	<view class="contents">
		<view class="top-bar">
			<view class="top-bar-contaner">
				<view class="top-bar-center">
					<image src="../../static/images/index/logo.png" mode="" class="logo"></image>
				</view>
				<view class="top-bar-right">
					<view class="search" @tap="toSearch">
						<image src="../../static/images/index/search.png" mode=""></image>
					</view>
					<view class="add" @tap="toBuildgroup">
						<image src="../../static/images/index/add.png" mode=""></image>
					</view>
				</view>
				<navigator class="top-bar-left" :url="'../userhome/userhome?user_id=' + userInfo.user_id"
					hover-class="none">
					<!-- ../../static/images/img/four.png -->
					<image :src="userInfo.avatar" mode=""></image>
				</navigator>
			</view>
		</view>
		<view class="main">
			<view class="friends">
				<view class="friend-list" @tap="goGoodFriend">
					<view class="friend-list-l">
						<text class="tip">1</text>
						<image src="../../static/images/index/apply.png" mode=""></image>
					</view>
					<view class="friend-list-r">
						<view class="top">
							<view class="name">好友申请</view>
							<view class="time">上午14:45</view>
						</view>
						<view class="info">茫茫人海，与你相遇</view>
					</view>
				</view>
			</view>
			<view class="friends">
				<view class="friend-list" v-for="(item,index) in friends" :key="item.id" @tap="goChat(item)">
					<view class="friend-list-l">
						<text class="tip" v-show="item.tip != 0">{{item.tip}}</text>
						<image :src="item.imgurl" mode=""></image>
					</view>
					<view class="friend-list-r">
						<view class="top">
							<view class="name">{{item.name}}</view>
							<view class="time">{{changeTime(item.time)}}</view>
						</view>
						<view class="info">{{item.news}}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 提示信息弹窗 -->
		<uni-popup ref="messageTost" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import request from '@/request/http';
	import datas from '../../commons/js/datas.js';
	import myfun from '../../commons/js/myfun.js';
	import {
		connectWebSocket,
		sendWebSocketMessage
	} from '@/utils/websocket';
	export default {
		data() {
			return {
				user_id: '',
				userInfo: {},
				friends: [],
				msgType: '',
				messageText: '',
				token: null,
			}
		},
		onLoad(options) {
			uni.showLoading({
				title: '加载中...',
			})
			this.user_id = uni.getStorageSync('xiaoyuApp_userid');
			this.token = uni.getStorageSync('xiaoyuApp_token');
			// 建立WebSocket连接
			connectWebSocket();
			setTimeout(() => {
				uni.hideLoading()
				this.getUserInfo()
			}, 200)
		},
		methods: {
			async getUserInfo() {
				try {
					const res = await request('/getUserInfo', 'POST', {
						user_id: this.user_id
					})
					console.log(res);
					if (res.code === 200) {
						this.userInfo = res.userInfo;
						uni.setStorageSync('userInfo', JSON.stringify(res.userInfo));
						console.log(this.userInfo);
						this.getFrinds();
					} else if (res.code === 401) {
						this.messageToggle('error', res.error)
						uni.removeStorageSync('xiaoyuApp_token');
						uni.removeStorageSync('xiaoyuApp_userid');
						setTimeout(() => {
							uni.navigateTo({
								url: `/pages/signin/signin`
							})
						}, 1500)
					}
				} catch (error) {
					console.log(error);
				}
			},
			// 跳转至搜索页面
			toSearch() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			// 跳转至好友请求列表页
			toFriendrequest() {
				uni.navigateTo({
					url: '../friendrequest/friendrequest'
				})
			},
			// 跳转创建群页面
			toBuildgroup() {
				uni.navigateTo({
					url: '../buildgroup/buildgroup'
				})
			},
			changeTime(date) {
				return myfun.dateTime(date)
			},
			getFrinds() {
				this.friends = datas.friends();
				for (let i = 0; i < this.friends.length; i++) {
					this.friends[i].imgurl = '../../static/images/img/' + this.friends[i].imgurl;
				}
			},
			// 跳转至好友添加列表
			goGoodFriend() {
				uni.navigateTo({
					url: '../friendrequest/friendrequest'
				})
			},
			// 跳转至聊天页
			goChat(e) {
				console.log(e)
				uni.navigateTo({
					url: '../chatroom/chatroom?fid=' + e.id + '&fimgUrl=' + e.imgurl + '&type=' + e.type +
						'&title=' + e.name
				})
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

	.top-bar {
		background: rgba(255, 255, 255, .95);
		border-bottom: 1px solid $uni-border-color;
	}

	.main {
		margin-top: 104rpx;
		padding-bottom: 32rpx;
	}

	.friend-list {
		height: 96rpx;
		padding: 16rpx $uni-spacing-col-base;

		&:active {
			background-color: $uni-bg-color-grey;
		}

		.friend-list-l {
			float: left;
			position: relative;

			image {
				width: 96rpx;
				height: 96rpx;
				border-radius: $uni-border-radius-base;
				background-color: $uni-color-primary;
			}

			.tip {
				position: absolute;
				top: -10rpx;
				left: 68rpx;
				min-width: 20rpx;

				height: 36rpx;
				background: $uni-color-warning;
				border-radius: 18rpx;
				padding: 0 8rpx;

				z-index: 10;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-inverse;
				line-height: 36rpx;
				text-align: center;
			}
		}

		.friend-list-r {
			padding-left: 128rpx;

			.top {
				height: 50rpx;

				.name {
					float: left;
					font-size: 36rpx;
					font-weight: 400;
					color: $uni-text-color;
					line-height: 50rpx;
				}

				.time {
					float: right;
					font-size: $uni-font-size-sm;
					color: $uni-text-color-disable;
					line-height: 50rpx;
				}
			}
		}

		.info {
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
			line-height: 40rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
		}
	}
</style>
<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-contaner">
				<view class="search-div">
					<image src="../../static/images/search/search.png" mode="" class="search-img"></image>
					<input type="search" value="" @input="search" placeholder="搜索用户/群"
						placeholder-style="color:#bbb;font-weight:400;font-size:25rpx;" class="search" />
				</view>
				<view class="top-bar-right">
					<view class="text" @tap="backOne">取消</view>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="search-user result">
				<view class="title" v-show="userarr.length>0">用户</view>
				<view class="list user" v-for="(item,index) in userarr" :key="item.id">
					<navigator :url="'../userhome/userhome?user_id=' + item.user_id" hover-class="none">
						<image :src="item.avatar" mode=""></image>
					</navigator>
					<view class="names">
						<view class="name" v-html="item.username"></view>
						<view class="email" v-html="item.email"></view>
					</view>
					<template v-if="item.user_id != user_id">
						<view class="right-bt send" v-show="item.tip == 1" @tap="send">发消息</view>
						<view class="right-bt add" v-show="item.tip != 1" @tap="addFriend(item.user_id)">加好友</view>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js';
	import request from '@/request/http';
	import {
		debounce
	} from '@/utils/index.js';
	export default {
		data() {
			return {
				user_id: '',
				userarr: []
			};
		},
		onLoad() {
			this.user_id = uni.getStorageSync('xiaoyuApp_userid');
		},
		methods: {
			async getUserList(keyword) {
				try {
					const res = await request('/searchUsers', 'POST', {
						keyword,
						user_id: this.user_id
					})
					console.log(res);
					if (res.code === 200) {
						this.searchUser(res.data, keyword)
					} else if (res.code === 401) {}
				} catch (error) {
					console.log(error);
				}
			},
			// 点击加好友按钮
			addFriend(user_id) {
				uni.navigateTo({
					url: `../userhome/userhome?user_id=${user_id}`
				})
			},
			// 点击发送消息按钮
			send() {
				uni.navigateTo({
					url: '../chatroom/chatroom'
				})
			},
			search: debounce(function(e) {
				this.userarr = [];
				let searchval = e.detail.value;
				if (searchval.trim().length > 0) {
					this.getUserList(searchval);
				}
			}, 200),
			// 寻找关键词匹配的好友
			searchUser(datas, e) {
				// let arr = datas.friends();

				let exp = eval(`/${e}/g`); //定义全局搜索关键词正则
				for (let i = 0; i < datas.length; i++) {
					// 判断输入的关键词是否在好友列表中存在（好友名称或者邮箱）
					if (datas[i].username.search(e) != -1 || datas[i].email.search(e) != -1) {
						this.isFriend(datas[i])
						// 替换查询到的关键词为特定样式html文本使其高亮
						datas[i].username = datas[i].username.replace(exp, `<span style='color:#4AAAFF;'>${e}</span>`)
						datas[i].email = datas[i].email.replace(exp, `<span style='color:#4AAAFF;'>${e}</span>`)
						this.userarr.push(datas[i]);
					}
				}
				console.log(this.userarr)
			},
			// 判断是否已是好友
			isFriend(e) {
				let tip = 0;
				// 获取到已是本人好友的好友列表数据
				let arr = datas.isFriend();
				console.log(arr)
				// 遍历查询到的好友列表
				for (let i = 0; i < arr.length; i++) {
					// 判断好友的friend是否与本人id相等，相等的话将默认值复制为1
					if (arr[i].friend == e.id) {
						tip = 1;
					}
				}
				// 将查询到的用户并且friend是否与本人id相等，则将关联字段tip重新赋值为本人id
				e.tip = tip;
			},
			// 返回至上一页
			backOne() {
				uni.navigateBack({
					data: 1
				})
			},
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.top-bar {
		background: rgba(255, 255, 255, .95);
		border-bottom: 1px solid $uni-border-color;

		.top-bar-contaner {
			display: flex;
			align-items: center;

			.search-div {
				width: 100%;
				height: 100%;
				padding-left: $uni-spacing-col-base;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				flex: 2;

				.search {
					height: 60rpx;
					background: $uni-bg-color-grey;
					border-radius: 10rpx;
					padding: 0 60rpx 0 12rpx;
					font-size: 25rpx;
					width: 510rpx;
				}

				.search-img {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					right: 150rpx;
					top: 22rpx;
				}
			}

			.top-bar-right {}
		}

	}

	.main {
		padding: 88rpx $uni-spacing-col-base;
		padding-top: var(--status-bar-height); // 处理app端顶部自定义tabbar被消息栏遮挡问题
		margin-top: 88rpx;

		.result {
			padding-top: $uni-spacing-col-base;

			.title {
				font-size: 44rpx;
				font-weight: 600;
				color: $uni-text-color;
				line-height: 60rpx;
			}

			.list {
				width: 100%;
				height: 80rpx;
				padding: 20rpx 0;

				image {
					float: left;
					width: 88rpx;
					height: 88rpx;
					border-radius: $uni-border-radius-base;
				}
			}

			.names {
				float: left;
				padding-left: $uni-spacing-col-base;

				.name {
					font-size: 36rpx;
					color: $uni-text-color;
					line-height: 50rpx;
				}
			}

			.right-bt {
				float: right;
				width: 120rpx;
				height: 48rpx;
				border-radius: 24rpx;
				font-size: $uni-font-size-sm;
				line-height: 48rpx;
				text-align: center;
				margin-top: 16rpx;
			}

			.email {
				color: $uni-text-color;
				font-size: $uni-font-size-sm;
				line-height: 28rpx;
			}

			.send {
				background: $uni-color-primary;
				color: $uni-text-color;
			}

			.add {
				background: rgba(74, 170, 255, 0.1);
				color: $uni-color-success;
			}
		}
	}
</style>
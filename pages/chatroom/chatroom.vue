<template>
	<view class="contents">
		<!-- 顶部标题栏 -->
		<view class="top-bar">
			<view class="top-bar-contaner">
				<view class="top-bar-center">
					<view class="text">{{title}}</view>
				</view>
				<view class="top-bar-left" @click="backOne">
					<image src="../../static/images/common/back.png" mode="" class="back-img"></image>
				</view>
				<view class="top-bar-right">
					<view class="pice"></view>
					<view class="group-img" @tap="goGroupHome" v-show="type == 1">
						<image :src="fimgUrl" mode=""></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 主体聊天内容栏 -->
		<scroll-view class="chat" scroll-y="true" :scroll-with-animation="swanition" :scroll-into-view="scrollToView"
			:scroll-top="scrollTop" @scrolltoupper="nextPage">
			<view class="chat-main" :style="{paddingBottom:chatMainPBottom + 'px'}" @click="handleChatMain">
				<view class="loading" :class="{displaynone:isloading}">
					<image src="../../static/images/common/loading.png" mode="" class="loading-img"
						:animation="animationData"></image>
				</view>
				<view class="chat-ls" v-for="(item,index) in msgs" :key="index" :id="`msg${item.tip}`">
					<!-- 消息时间 -->
					<view class="chat-time" v-if="item.time != ''">{{changeTime(item.time)}}</view>
					<!-- 消息内容-左边 -->
					<view class="msg-m msg-left" v-if="item.id != 'b'">
						<!-- 用户头像 -->
						<image :src="item.imgurl" mode="" class="user-img"></image>
						<!-- 发送的消息 -->
						<!-- 文字类型的消息 -->
						<view class="message" v-if="item.type == 0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<!-- 图片类型的消息 -->
						<view class="message" v-if="item.type == 1">
							<image :src="item.message" class="msg-img" mode="widthFix" @tap="perviewImg(item.message)">
							</image>
						</view>
						<!-- 音频类型的消息 -->
						<view class="message" v-if="item.type == 2">
							<view class="msg-text voice" @tap="playVoice(item.message.voice)"
								:style="{width:item.message.time*4 + 'px'}">
								<image src="../../static/images/chatroom/yy.png" mode="" class="voice-img"></image>
								{{item.message.time + '″'}}
							</view>
						</view>
						<!-- 定位位置类型的消息 -->
						<view class="message" v-if="item.type == 3">
							<view class="msg-map" @tap="openLocation(item.message)">
								<view class="map-name">{{item.message.name}}</view>
								<view class="map-address">{{item.message.address}}</view>
								<image src="../../static/images/chatroom/map.png" mode="aspectFit" class="map-msg">
								</image>
								<!-- <map :latitude="item.message.latitude" :longitude="item.message.longitude" :markers="covers(item.message)" class="map"></map> -->
							</view>
						</view>
					</view>
					<!-- 消息内容-右边 -->
					<view class="msg-m msg-right" v-if="item.id == 'b'">
						<!-- 用户头像 -->
						<image :src="item.imgurl" mode="" class="user-img"></image>
						<!-- 发送的消息 -->
						<!-- 文字类型的消息 -->
						<view class="message" v-if="item.type == 0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<!-- 图片类型的消息 -->
						<view class="message" v-if="item.type == 1">
							<image :src="item.message" class="msg-img" mode="widthFix" @tap="perviewImg(item.message)">
							</image>
						</view>
						<!-- 音频类型的消息 -->
						<view class="message" v-if="item.type == 2">
							<view class="msg-text voice" @tap="playVoice(item.message.voice)"
								:style="{width:item.message.time*4 + 'px'}">
								{{item.message.time + '″'}}
								<image src="../../static/images/chatroom/yy.png" mode="" class="voice-img"></image>
							</view>
						</view>
						<!-- 定位位置类型的消息 -->
						<view class="message" v-if="item.type == 3">
							<view class="msg-map" @tap="openLocation(item.message)">
								<view class="map-name">{{item.message.name}}</view>
								<view class="map-address">{{item.message.address}}</view>
								<image src="../../static/images/chatroom/map.png" mode="aspectFit" class="map-msg">
								</image>
								<!-- <map :latitude="item.message.latitude" :longitude="item.message.longitude" :markers="covers(item.message)" class="map"></map> -->
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="padbt"></view> -->
		</scroll-view>
		<submit @inputs="inputs" @heights="heights" @inputFocus="inputFocus" @inputBlur="inputBlur"
			@handleEmojiAndMore="handleEmojiAndMore"></submit>

		<!-- 提示信息弹窗 -->
		<uni-popup ref="messageTost" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js';
	import myfun from '../../commons/js/myfun.js';
	import submit from '../../components/submit/submit.vue';
	import request from '@/request/http';
	import {
		sendWebSocketMessage
	} from '@/utils/websocket';
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				user_id: '',
				userInfo: {},
				msgs: [],
				imgMsg: [],
				oldTime: new Date(),
				scrollToView: '',
				chatMainPBottom: '90',
				scrollTop: '',
				animationData: {},
				nowpage: 0, //页码
				loadingTime: null,
				isloading: true,
				swanition: true,
				beginloading: true,
				fimgUrl: '../../static/images/img/two.png',
				fid: 'a',
				type: '1', //0为好友，1为群
				title: '',
				msgType: '',
				messageText: '',
			};
		},
		components: {
			submit
		},
		onLoad(e) {
			uni.showLoading({
				title: '加载中...',
			})
			console.log(e)
			this.user_id = uni.getStorageSync('xiaoyuApp_userid');
			this.token = uni.getStorageSync('xiaoyuApp_token');
			this.type = e.type;
			this.fid = e.fid;
			this.fimgUrl = e.fimgUrl;
			this.title = e.title;

			setTimeout(() => {
				uni.hideLoading()
				this.getUserInfo()
			}, 200)

			// this.nextPage()
		},
		methods: {
			// 返回至上一页
			backOne() {
				uni.navigateBack({
					data: 1
				})
			},
			// 获取元素高度
			getElementHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.chat-main').boundingClientRect(data => {
					this.scrollTop = data.height;
				}).exec();
			},
			// 处理时间
			changeTime(date) {
				return myfun.messageTime(date)
			},
			// 进入群详情
			goGroupHome() {
				uni.navigateTo({
					url: '../grouphome/grouphome?gid=' + this.fid + '&gimg=' + this.fimgUrl
				})
			},
			async getUserInfo() {
				try {
					const res = await request('/getUserInfo', 'POST', {
						user_id: this.user_id
					})
					if (res.code === 200) {
						this.userInfo = res.userInfo;
						uni.setStorageSync('userInfo', JSON.stringify(res.userInfo));
						this.getMsg(this.nowpage)
						
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
			// 获取聊天数据
			getMsg(page) {
				let msg = datas.message();
				let maxpages = msg.length;
				if (msg.length > (page + 1) * 10) {
					maxpages = (page + 1) * 10;
					// 页数加1
					this.nowpage++;
				} else {
					// 数据已经全部获取完毕
					this.nowpage = -1;
				}
				for (var i = page * 10; i < maxpages; i++) {
					msg[i].imgurl = `../../static/images/img/${msg[i].imgurl}`;
					// 时间间隔
					if (i < msg.length - 1) {
						let t = myfun.spacTime(this.oldTime, msg[i].time);
						if (t) {
							this.oldTime = t;
						}
						msg[i].time = t;
					}
					if (msg[i].type == 1) {
						msg[i].message = `../../static/images/img/${msg[i].message}`;
						this.imgMsg.unshift(msg[i].message);
					}
					// 倒序插入
					this.msgs.unshift(msg[i])
				}

				this.$nextTick(function() {
					this.swanition = false;
					// 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
					this.scrollToView = `msg${this.msgs[maxpages-page*10-1].tip}`;
				})
				clearInterval(this.loadingTime);
				// 关闭loading图标
				this.isloading = true;
				// 恢复加载控制
				this.beginloading = true;

				sendWebSocketMessage({
					send_user_id: this.user_id,
					receiver_user_id: 928813,
					send_content: '测试发送',
					content_type: 0,
				});
			},
			// 预览图片
			perviewImg(e) {
				let index = 0;
				for (let i = 0; i < this.imgMsg.length; i++) {
					if (this.imgMsg[i] == e) {
						index = i;
					}
				}
				// 预览图片
				uni.previewImage({
					urls: this.imgMsg,
					current: index,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			// 音频播放
			playVoice(e) {
				innerAudioContext.src = e;
				innerAudioContext.play();
			},
			// 地图定位
			covers(e) {
				let map = [{
					latitude: e.latitude,
					longitude: e.longitude,
					iconPath: '../../static/images/chatroom/dw.png'
				}]
				return map;
			},
			// 打开导航
			openLocation(e) {
				console.log(e)
				uni.openLocation({
					latitude: e.latitude,
					longitude: e.longitude,
					name: e.name,
					address: e.address,
					success: function() {
						console.log('success');
					}
				});
			},
			// 接收输入的内容
			inputs(e) {
				this.swanition = true;
				let len = this.msgs.length;
				let nowTime = new Date();
				// 时间间隔
				let t = myfun.spacTime(this.oldTime, nowTime);
				if (t) {
					this.oldTime = t;
				}
				nowTime = t;
				let data = {
					id: 'b', //用户id
					imgurl: '../../static/images/img/one.png',
					message: e.message,
					type: e.types, //内容类型（0文字，1图片链接，2音频链接...）
					time: nowTime, //发送时间
					tip: len,
				}
				console.log(data)
				this.msgs.push(data)
				this.$nextTick(function() {
					this.getElementHeight()
				})
				if (e.types == 1) {
					this.imgMsg.push(e.message);
				}
			},
			//接收输入框元素的高度
			heights(e) {
				console.log(e)
				this.inputH = e;
				this.$nextTick(function() {
					this.getElementHeight()
				})
			},
			// 输入框获取焦点监听
			inputFocus(e) {
				this.goBottom()
			},
			// 输入框失去焦点监听
			inputBlur() {
				this.chatMainPBottom = 90;
				this.goBottom()
			},
			// 表情窗/更多功能的显示/隐藏
			handleEmojiAndMore(val) {
				if (!val) {
					this.chatMainPBottom = 300;
				} else {
					this.chatMainPBottom = 90;
				}
				this.goBottom();
			},
			handleChatMain() {
				// this.goBottom();
			},
			// 滚动到底部
			goBottom() {
				this.swanition = true;
				this.scrollToView = '';
				this.$nextTick(function() {
					let len = this.msgs.length - 1;
					this.scrollToView = `msg${this.msgs[len].tip}`;
				})
			},
			// 滚动顶部加载下一页
			nextPage() {
				if (this.nowpage > 0 && this.beginloading) {
					// 出现loading图标
					this.isloading = false;
					// 禁止重复加载
					this.beginloading = false;
					var animation = uni.createAnimation({
						duration: 1000,
						timingFunction: 'step-start',
					})
					this.animation = animation
					let i = 1;
					this.loadingTime = setInterval(function() {
						animation.rotate(i * 30).step()
						this.animationData = animation.export()
						i++;
						if (i > 40) {
							this.getMsg(this.nowpage);
						}
					}.bind(this), 20)
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

	page {
		height: 100%;
	}

	.contents {
		height: 100%;
		background: rgba(244, 244, 244, .95);
		padding-top: 0;
	}

	.top-bar {
		position: fixed;
		top: 0;
		background: rgba(244, 244, 244, .95);
		border-bottom: 1px solid $uni-border-color;

		.group-img {
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

	.displaynone {
		display: none;
	}

	.chat {
		height: 100%;
		background: #fff;
		flex-grow: 1;
		overflow-y: auto;

		.padbt {
			height: env(safe-area-inset-bottom);
			width: 100%;
		}

		.loading {
			text-align: center;

			.loading-img {
				width: 60rpx;
				height: 60rpx;
			}
		}

		.chat-main {
			padding-left: $uni-spacing-col-base;
			padding-right: $uni-spacing-col-base;
			padding-top: 160rpx;
			display: flex;
			flex-direction: column;
		}

		.chat-ls {
			.chat-time {
				font-size: $uni-font-size-sm;
				line-height: 34rpx;
				color: rgba(39, 40, 50, .3);
				padding: 20rpx 0;
				text-align: center;
			}

			.msg-m {
				display: flex;
				padding: 20rpx 0;

				.user-img {
					flex: none;
					width: $uni-img-size-sm;
					height: $uni-img-size-sm;
					border-radius: $uni-border-radius-base;
				}

				.message {
					max-width: 480rpx;
					flex: none;
				}

				.msg-text {
					font-size: $uni-font-size-lg;
					padding: 18rpx 24rpx;
					line-height: 44rpx;
					color: $uni-text-color;
					max-width: 480rpx;
					/*这两行代码可以解决大部分场景下的换行问题*/
					word-break: break-all;
					word-wrap: break-word;
					/*但在有些场景中，还需要加上下面这行代码*/
					white-space: normal;
				}

				.msg-img {
					max-width: 400rpx;
					border-radius: $uni-border-radius-base;
				}

				.msg-map {
					background: #fff;
					width: 464rpx;
					height: 284rpx;
					overflow: hidden;

					.map-name {
						font-size: $uni-font-size-lg;
						line-height: 44rpx;
						color: $uni-text-color;
						padding: 18rpx 24rpx 0 24rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}

					.map-address {
						font-size: $uni-font-size-sm;
						color: $uni-text-color-disable;
						padding: 0rpx 24rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}

					.map {
						padding-top: 8rpx;
						width: 464rpx;
						height: 190rpx;
					}

					.map-msg {
						padding-top: 8rpx;
						width: 480rpx;
						height: 190rpx;
					}
				}

				.voice {
					min-width: 80rpx;
					max-width: 400rpx;
				}

				.voice-img {
					width: 28rpx;
					height: 36rpx;
				}
			}

			.msg-left {
				flex-direction: row;

				.msg-text {
					margin-left: 16rpx;
					background-color: #fff;
					border-radius: 0px 20rpx 20rpx 20rpx;
				}

				.msg-img {
					margin-left: 16rpx;
				}

				.msg-map {
					margin-left: 16rpx;
					background-color: #fff;
					border-radius: 20rpx;
					border: 1rpx solid #eee;
					bottom: 0;
					box-sizing: border-box;
				}

				.voice {
					text-align: right;
				}

				.voice-img {
					float: left;
					transform: rotate(180deg);
					padding-bottom: 4rpx;
				}
			}

			.msg-right {
				flex-direction: row-reverse;

				.msg-text {
					margin-right: 16rpx;
					background-color: #9EEA6A;
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}

				.message {
					display: flex;
					justify-content: flex-end;

					.msg-img {
						margin-right: 16rpx;
					}

					.msg-map {
						margin-right: 16rpx;
						border-radius: 20rpx;
						border: 1rpx solid #eee;
						bottom: 0;
						box-sizing: border-box;
					}

					.voice {
						text-align: left;
					}

					.voice-img {
						float: right;
						padding-top: 4rpx;
					}
				}
			}
		}
	}
</style>
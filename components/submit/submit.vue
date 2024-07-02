<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<view class="bt-img" @tap="records">
					<image :src="toc" mode=""></image>
				</view>
				<textarea v-model="msg" cursor-spacing="30" auto-blur="true" auto-height="true" @input="inputs"
					@focus="handleFocus" @blur="handleBlur" class="chat-send btn" :class="{displaynone:isrecord}" />
				<view class="record btn" :class="{displaynone:!isrecord}" @touchstart="touchstart" @touchend="touchend"
					@touchmove="touchmove">按住说话</view>
				<view class="bt-img" @tap="emoji">
					<image src="../../static/images/submit/bq.png" mode=""></image>
				</view>
				<view class="bt-img" @tap="more">
					<image src="../../static/images/submit/tj.png" mode=""></image>
				</view>
			</view>
			<view class="emoji" :class="{displaynone:isemoji}">
				<view class="emoji-send">
					<view class="emoji-send-det" @tap="emojiBack">
						<image src="../../static/images/submit/back.png" mode=""></image>
					</view>
					<view class="emoji-send-bt" @tap="emojiSend">发送</view>
				</view>
				<emoji @emotion="emotion" :height="260"></emoji>
			</view>
			<view class="more" :class="{displaynone:ismore}">
				<view class="more-list" @tap="sendImg('album')">
					<image src="../../static/images/submit/tp.png" mode=""></image>
					<view class="more-list-title">图片</view>
				</view>
				<view class="more-list" @tap="sendImg('camera')">
					<image src="../../static/images/submit/pz.png" mode=""></image>
					<view class="more-list-title">拍照</view>
				</view>
				<view class="more-list" @tap="chooseLocation">
					<image src="../../static/images/submit/dw.png" mode=""></image>
					<view class="more-list-title">定位</view>
				</view>
				<view class="more-list">
					<image src="../../static/images/submit/sp.png" mode=""></image>
					<view class="more-list-title">视频</view>
				</view>
				<view class="more-list">
					<image src="../../static/images/submit/wj.png" mode=""></image>
					<view class="more-list-title">文件</view>
				</view>
			</view>
		</view>
		<view class="voice-bg" :class="{displaynone:voicebg}">
			<view class="voice-bg-len">
				<view class="voice-bg-time" :style="{width:vlength / 0.6  + '%'}">{{vlength}}″
				</view>
			</view>
			<view class="voice-del">上滑取消录音</view>
		</view>
	</view>
</template>

<script>
	import emoji from '../../components/emoji/emoji.vue';
	// 录音api组件
	let recorderManager = uni.getRecorderManager();
	export default {
		name: "submit",
		data() {
			return {
				isrecord: false,
				toc: "../../static/images/submit/yy.png",
				isemoji: true,
				msg: '',
				ismore: true,
				timer: null,
				vlength: 1,
				voicebg: true,
				pageY: 0,
			};
		},
		components: {
			emoji
		},
		watch: {},
		methods: {
			// 获取元素高度
			getElementHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					this.$emit('heights', data.height + 40)
				}).exec();
			},
			allGetHeight() {
				setTimeout(() => {
					this.getElementHeight();
				}, 20)
			},
			// 点击切换音频
			records() {
				this.isrecord = !this.isrecord;
				this.ismore = true;
				this.isemoji = true;
				if (this.isrecord) {
					this.toc = '../../static/images/submit/jp.png'
				} else {
					this.toc = '../../static/images/submit/yy.png'
				}
				this.allGetHeight()
			},
			// 表情
			emoji() {
				this.ismore = true;
				this.isemoji = !this.isemoji;
				this.isrecord = false;
				this.toc = '../../static/images/submit/yy.png';
				this.$emit('handleEmojiAndMore', this.isemoji)
			},
			// 监听输入框输入
			inputs(e) {
				this.msg = e.detail.value;
				var post = this.msg.indexOf('\n');
				// 判断键入的是否是回车键
				if (post != -1 && this.msg.length > 1) {
					this.send(this.msg, 0) //0:文字类型
				}
			},
			//接收表情
			emotion(e) {
				this.msg += e;
			},
			// 输入框聚焦
			handleFocus() {
				this.handleBlur();
				this.isemoji = true;
				this.ismore = true;
				this.$emit('inputFocus')
			},
			handleBlur() {
				this.isemoji = true;
				this.ismore = true;
				this.$emit('inputBlur')
			},
			// 表情内发送
			emojiSend() {
				if (this.msg.length > 0) {
					this.isemoji = !this.isemoji;
					this.send(this.msg, 0) //0:文字类型
					this.$emit('handleEmojiAndMore', this.isemoji)
				}
			},
			// 表情内退格
			emojiBack() {
				if (this.msg.length > 0) {
					this.msg = this.msg.substring(0, this.msg.length - 1)
				}
			},
			// 音频处理
			// 开始录音
			touchstart(e) {
				this.voicebg = false;
				this.pageY = e.changedTouches[0].pageY;
				let i = 1;
				this.timer = setInterval(() => {
					i++;
					this.vlength = i;
					if (i > 60) {
						this.touchend()
					}
				}, 1000)
				recorderManager.start();
			},
			// 结束录音
			touchend() {
				clearInterval(this.timer)
				recorderManager.stop();
				let self = this;
				if(self.vlength < 2){
					uni.showToast({
					    title: `说话时间太短:${self.vlength}s`,
					    duration: 1500,
						icon:'error',
					});
					self.vlength = 1;
					self.voicebg = true;
					return false;
				}
				recorderManager.onStop(function(res) {
					let data = {
						voice: res.tempFilePath,
						time: self.vlength
					}
					if (!self.voicebg) {
						self.send(data, 2);
					}
					self.vlength = 1;
					self.voicebg = true;
				});
			},
			// 中途终止录音
			touchmove(e) {
				if (this.pageY - e.changedTouches[0].pageY > 100) {
					// 关闭录音控件
					clearInterval(this.timer)
					this.voicebg = true;
					this.vlength = 1;
				}
			},
			// 发送
			send(msg, type) {
				let data = {
					message: msg,
					types: type,
				}
				this.$emit('inputs', data);
				setTimeout(() => {
					this.msg = '';
				}, 0)
			},
			// 更多功能
			more() {
				this.ismore = !this.ismore;
				this.isemoji = true;
				this.isrecord = false;
				this.toc = '../../static/images/submit/yy.png';
				this.allGetHeight()
				this.$emit('handleEmojiAndMore', this.ismore)
			},
			// 选择图片并发送
			sendImg(e) {
				let count = 9;
				let _this = this;
				if (e == 'album') {
					count = 9;
				} else {
					count = 1;
				}
				uni.chooseImage({
					count, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [e], //从相册选择
					success: function(res) {
						const filePaths = res.tempFilePaths;
						_this.isemoji = true;
						_this.ismore = true;
						_this.$emit('handleEmojiAndMore', true)
						for (let i = 0; i < filePaths.length; i++) {
							// 调用发送消息方法
							_this.send(filePaths[i], 1)
						}
					}
				});
			},
			chooseLocation() {
				uni.chooseLocation({
					success: res => {
						let data = {
							name: res.name,
							address: res.address,
							latitude: res.latitude,
							longitude: res.longitude,
						}
						this.isemoji = true;
						this.ismore = true;
						this.$emit('handleEmojiAndMore', true)
						this.send(data, 3) //3:其他类型

						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.submit {
		background: rgb(255, 255, 255);
		border-top: 1px solid $uni-border-color;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 1003;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.displaynone {
		display: none;
	}

	.submit-chat {
		width: 100%;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		padding: 14rpx 14rpx;
		background: #eee;

		image {
			width: 56rpx;
			height: 56rpx;
			margin: 0 10rpx;
			flex: auto;
		}

		.btn {
			flex: auto;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 18rpx;
			max-height: 180rpx;
			margin: 0 10rpx;
			overflow-y: scroll;
		}

		.record {
			text-align: center;
			line-height: 44rpx;
			font-size: $uni-font-size-lg;
			color: $uni-text-color-grey;
		}

	}

	.emoji {
		width: 100%;
		height: 460rpx;
		background: rgba(236, 237, 238, 1);
		box-shadow: 0px -1rpx 0px 0px rgba(0, 0, 0, .1);

		.emoji-send {
			width: 280rpx;
			padding-top: 24rpx;
			height: 104rpx;
			background-color: rgba(236, 237, 238, .8);
			position: fixed;
			bottom: 0;
			bottom: env(safe-area-inset-bottom);
			right: 0;
			display: flex;

			.emoji-send-bt {
				flex: 1;
				margin: 0 32rpx 0 20rpx;
				width: 120rpx;
				height: 80rpx;
				background: rgba(255, 228, 49, 1);
				text-align: center;
				font-size: 32rpx;
				line-height: 80rpx;
				border-radius: 12rpx;
			}

			.emoji-send-det {
				flex: 1;
				margin-left: 24rpx;
				height: 76rpx;
				background: #fff;
				text-align: center;
				font-size: 32rpx;
				line-height: 80rpx;
				border-radius: 12rpx;
				padding-top: 4rpx;

				image {
					width: 42rpx;
					height: 32rpx;
				}
			}
		}
	}

	.more {
		width: 100%;
		height: 436rpx;
		background-color: rgba(236, 237, 238, 1);
		box-shadow: 0px -1rpx 0px 0px rgba(0, 0, 0, .1);
		bottom: env(safe-area-inset-bottom);
		padding: 8rpx 20rpx;
		box-sizing: border-box;

		.more-list {
			width: 25%;
			float: left;
			text-align: center;
			padding-top: 32rpx;

			image {
				width: 72rpx;
				height: 72rpx;
				padding: 24rpx;
				border-radius: 24rpx;
				background-color: rgba(255, 255, 255, 1);
			}

			.more-list-title {
				font-size: 24rpx;
				color: rgba(39, 40, 50, .5);
				line-height: 34rpx;
			}
		}
	}

	.voice-bg {
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, .3);
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 1002;

		.voice-bg-len {
			height: 84rpx;
			width: 600rpx;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			background-color: rgba(255, 255, 255, .5);
			border-radius: 42rpx;
			text-align: center;
		}

		.voice-bg-time {
			display: inline-block;
			line-height: 84rpx;
			background-color: $uni-color-primary;
			border-radius: 42rpx;
			min-width: 60rpx;

		}

		.voice-del {
			position: absolute;
			bottom: 148rpx;
			margin-bottom: env(safe-area-inset-bottom);
			width: 100%;
			text-align: center;
			color: #fff;
			font-size: $uni-font-size-base;
		}
	}
</style>
<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-contaner">
				<view class="top-bar-center">
					<view class="text">详情</view>
				</view>
				<view class="top-bar-left" @click="backOne">
					<image src="../../static/images/common/back.png" mode="" class="back-img"></image>
				</view>
				<view class="top-bar-right">
					<view class="pice"></view>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="main-content">
				<view class="column heads">
					<view class="row head">
						<view class="title">头像</view>
						<view class="user-head">
							<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
							<view class="user-img">
								<image :src="userInfo.avatar" class="avatar-img">
								</image>
								<image src="../../static/images/group/change.png" v-show="user_id == first_id"
									class="pan" @tap="upload"></image>
							</view>
							<canvas id="myCanvas" canvas-id="myCanvas" class="meslist_canvas" crop-width="200"
								crop-height="200"></canvas>
						</view>
						<view class="more" v-show="user_id == first_id">
							<image src="../../static/images/common/more.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="row"
						@tap="user_id == first_id ? modify('签名','signature',userInfo.signature,false) : ''">
						<view class="title">签名</view>
						<view class="cont">{{userInfo.signature}}</view>
						<view class="more" v-show="user_id == first_id">
							<image src="../../static/images/common/more.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="row">
						<view class="title">注册</view>
						<view class="cont">{{changeTime(userInfo.registration_time)}}</view>
					</view>
				</view>
				<view class="column heads">
					<view class="row"
						@tap="user_id == first_id ? modify('昵称','username',userInfo.username,false) : ''">
						<view class="title">昵称</view>
						<view class="cont">{{userInfo.username}}</view>
						<view class="more" v-show="user_id == first_id">
							<image src="../../static/images/common/more.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="row">
						<view class="title">性别</view>
						<view class="cont">
							<picker @change="handleGenderPickerChange" :value="userInfo.gender" :range="genderArray"
								v-if="user_id == first_id">
								<view class="uni-input">{{genderArray[userInfo.gender]}}</view>
							</picker>
							<view class="uni-input" v-else>{{genderArray[userInfo.gender]}}</view>
						</view>
						<view class="more" v-show="user_id == first_id">
							<image src="../../static/images/common/more.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="row">
						<view class="title">生日</view>
						<view class="cont">
							<picker mode="date" :value="userInfo.birthday" :start="startDate" :end="endDate"
								@change="bindDateChange" class="picker-box" v-if="user_id == first_id">
								<view class="uni-input">{{userInfo.birthday}}</view>
							</picker>
							<view class="uni-input" v-else>{{userInfo.birthday}}</view>
						</view>
						<view class="more" v-show="user_id == first_id">
							<image src="../../static/images/common/more.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="row"
						@tap="user_id == first_id ? modify('电话','phone',userInfo.phone,false) : ''">
						<view class="title">电话</view>
						<view class="cont">{{userInfo.phone}}</view>
						<view class="more" v-show="user_id == first_id">
							<image src="../../static/images/common/more.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="row"
						@tap="user_id == first_id ? modify('邮箱','email',userInfo.email,false) : ''">
						<view class="title">邮箱</view>
						<view class="cont">{{userInfo.email}}</view>
						<view class="more" v-show="user_id == first_id">
							<image src="../../static/images/common/more.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="column heads" v-show="user_id == first_id">
					<view class="row" @tap="modify('修改密码','password',userInfo.password,true)">
						<view class="title">密码</view>
						<view class="cont">*******</view>
						<view class="more">
							<image src="../../static/images/common/more.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="bt2" v-show="user_id == first_id" @tap="quit">退出登录</view>
				<view class="bt2" v-show="user_id != first_id" @tap="deleteFriend">删除好友</view>
			</view>
		</view>

		<view class="modify" :animation="animationData" :style="{bottom:-+widHeight + 'px'}">
			<view class="modify-header">
				<view class="close" @tap="modify()">取消</view>
				<view class="title">{{modifyTitle}}</view>
				<view class="define" @tap="modifyStbmit()">确定</view>
			</view>
			<view class="modfiy-main">

				<textarea v-show="titleKey == 'signature'" v-model="dataText" class="modfiy-content"
					placeholder="请输入个性签名" />

				<input v-show="titleKey == 'username'" type="text" v-model="dataText" class="modfiy-pwd"
					placeholder="请输入昵称" placeholder-class="ipt-placeholder-style" maxlength="30"></input>

				<input v-show="titleKey == 'phone'" type="text" v-model="dataText" class="modfiy-pwd"
					placeholder="请输入电话" placeholder-class="ipt-placeholder-style" maxlength="11"></input>

				<input v-show="titleKey == 'email'" type="text" v-model="dataText" class="modfiy-pwd"
					placeholder="请输入邮箱" placeholder-class="ipt-placeholder-style" maxlength="35"></input>

				<template v-if="titleKey == 'password' && ispwd">
					<input type="text" v-model="password" class="modfiy-pwd" placeholder="请输入原密码"
						placeholder-class="ipt-placeholder-style"></input>
					<input type="text" v-model="newPassword" class="modfiy-pwd" placeholder="请输入新密码"
						placeholder-class="ipt-placeholder-style"></input>
				</template>

			</view>
		</view>

		<!-- 提示窗示例 -->
		<uni-popup ref="alertDialog" type="dialog" :mask-click="false">
			<uni-popup-dialog type="dialog" cancelText="取消" confirmText="确认" title="系统提示" content="您是否确认退出登录?"
				@confirm="dialogConfirm" @close="dialogClose" :before-close="true"></uni-popup-dialog>
		</uni-popup>

		<!-- 提示信息弹窗 -->
		<uni-popup ref="messageTost" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import request from '@/request/http';
	import {
		validateEmail,
		validatePhoneNumber
	} from '../../utils/index.js';
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
	import myfun from "@/commons/js/myfun.js";
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				user_id: '',
				first_id:'',
				userInfo: {},
				tempFilePath: '',
				imgurl: '',
				genderArray: ['女', '男'],
				dataText: '',
				password: '',
				newPassword: '',
				modifyTitle: '',
				animationData: {}, //动画实例
				isModfiy: false, //动画开关
				widHeight: '',
				ispwd: false,
				titleKey: '',
				messageText: '',
				msgType: '',
			};
		},
		components: {
			ImageCropper
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onReady() {
			this.getElementStyle();
		},
		onLoad(options) {
			uni.showLoading({
				title: '加载中...',
			})
			this.user_id = uni.getStorageSync('xiaoyuApp_userid');
			this.first_id = options.user_id;
			this.getUserInfo()
		},
		methods: {
			// 获取元素位置等信息
			getElementStyle() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.modify').boundingClientRect(data => {
					console.log("得到布局位置信息" + JSON.stringify(data));
					console.log("节点离页面顶部的距离为" + data.top);
					this.widHeight = data.height;
				}).exec();
			},
			// 返回至上一页
			backOne() {
				uni.navigateBack({
					data: 1
				})
			},
			async getUserInfo() {
				try {
					const res = await request('/getUserInfo', 'POST', {
						user_id: this.first_id
					})
					console.log(res);
					if (res.code === 200) {
						this.userInfo = res.userInfo;
						uni.hideLoading();
					} else if (res.code === 401) {
						uni.hideLoading();
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
			changeTime(date) {
				return myfun.detailTime(date);
			},
			// 性别选择器
			handleGenderPickerChange: function(e) {
				this.updateUserInfo('gender', {
					gender: e.detail.value
				})
			},
			// 日期选择器
			bindDateChange: function(e) {
				this.updateUserInfo('birthday', {
					birthday: e.detail.value
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 100;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 图片裁剪
			upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						this.tempFilePath = res.tempFilePaths.shift()
					}
				});
			},
			confirm(e) {
				const _this = this;
				this.tempFilePath = ''
				this.imgurl = e.detail.tempFilePath;
				//除了H5端返回base64数据外，其他端都是返回临时地址，所以你要判断base64还是临时文件名，（用条件编译APP-PLUS||MP执行编译。）
				// #ifdef WEB
				uni.uploadFile({
					url: "http://192.168.31.198:8080/updateAvatar",
					filePath: this.imgurl,
					name: "file",
					fileType: "image",
					header: {
						'Authorization': `Bearer ${uni.getStorageSync('xiaoyuApp_token')}`
					}, // 设置请求头
					formData: {
						user_id: _this.userInfo.user_id,
						type: 'WEB'
					}, //传递参数
					success: (uploadFileRes) => {
						let backstr = uploadFileRes.data;
					},
					fail(e) {
						console.log("this is errormes " + e.message);
					},
				});
				// #endif

				// #ifdef APP-PLUS||MP
				//这里是先上传裁剪得来临时文件地址然后得到临时文件名，
				uni.uploadFile({
					url: "http://192.168.31.198:3000/updateAvatar",
					filePath: this.imgurl,
					name: "file",
					fileType: "image",
					header: {
						'Authorization': `Bearer ${uni.getStorageSync('xiaoyuApp_token')}`
					}, // 设置请求头
					formData: {
						user_id: _this.userInfo.user_id,
						type: 'APP-PLUS || MP'
					}, //传递参数
					success: (uploadFileRes) => {
						let backstr = uploadFileRes.data;
					},

					fail(e) {
						console.log("this is errormes " + e.message);
					},
				});
				// #endif
			},
			cancel() {
				console.log('canceled')
			},

			// 修改项弹框
			modify(type, key, title, ispwd) {
				this.isModfiy = !this.isModfiy;
				this.ispwd = ispwd;
				this.modifyTitle = type;
				this.dataText = title;
				this.titleKey = key;

				let animation = uni.createAnimation({
					duration: 300,
					timingFunction: "ease",
				})
				if (this.isModfiy) {
					animation.bottom(0).step();
				} else {
					animation.bottom(-this.widHeight).step();
				}
				this.animationData = animation.export()
			},
			// 弹窗修改确定
			modifyStbmit() {
				let data = {};
				if (this.dataText.trim() != '') {
					if (this.titleKey == 'phone') {
						if (!validatePhoneNumber(this.dataText)) {
							this.messageToggle('warn', '请输入正确格式的手机号');
							return;
						}
					}
					if (this.titleKey == 'email') {
						if (!validateEmail(this.dataText)) {
							this.messageToggle('warn', '请输入正确格式的邮箱');
							return;
						}
					}
					data[this.titleKey] = this.dataText
					this.updateUserInfo(this.titleKey, data)
					this.modify()
					return;
				}
				this.messageToggle('warn', '请输入');
			},
			// 退出登录
			quit() {
				this.$refs.alertDialog.open()
			},
			// 删除好友
			deleteFriend() {

			},
			// 修改用户信息
			async updateUserInfo(key, data) {
				console.log(data);
				const res = await request('/updateUserInfo', 'POST', {
					user_id: this.userInfo.user_id,
					...data
				});
				if (res.code === 200) {
					this.userInfo[key] = data[key];
					uni.setStorageSync('userInfo', JSON.stringify(this.userInfo))
					this.messageToggle('success', '更新成功')
				} else {
					this.messageToggle('error', '更新失败')
				}
			},
			async dialogConfirm() {
				this.$refs.alertDialog.close();
				uni.showLoading({
					title: '退出中...',
					mask: true,
				})
				try {
					const res = await request('/logout', 'POST');
					if (res.code === 200) {
						setTimeout(() => {
							uni.removeStorageSync('xiaoyuApp_token');
							uni.removeStorageSync('xiaoyuApp_userid');
							uni.reLaunch({
								url: `/pages/signin/signin`
							})
							uni.hideLoading()
						}, 500)
					}
				} catch (error) {
					console.log(error);
				}
			},
			dialogClose() {
				this.$refs.alertDialog.close()
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
		padding-top: var(--status-bar-height); // 处理app端顶部自定义tabbar被消息栏遮挡问题

		display: flex;
		flex-direction: column;

		.main-content {
			display: flex;
			flex-direction: column;
			padding-top: 100rpx;
		}

		.column {
			display: flex;
			flex-direction: column;
			width: 100%;
			padding-top: 12rpx;
			border-bottom: 1px solid $uni-border-color;

			.row {
				display: flex;
				flex-direction: row;
			}

			.user-head {
				flex: auto;
			}

			.user-img {
				width: $uni-img-size-lg;
				height: $uni-img-size-lg;
				border-radius: $uni-border-radius-base;
				position: relative;

				.avatar-img {
					width: $uni-img-size-lg;
					height: $uni-img-size-lg;
					border-radius: $uni-border-radius-base;
				}

				.pan {
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					width: 40rpx;
					height: 40rpx;
					margin: auto;
					z-index: 10;
				}
			}



			.title {
				flex: none;
				padding: 0 $uni-spacing-col-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 112rpx;
			}

			.head {
				height: 148rpx;
				display: flex;
				align-items: center;
			}

			.cont {
				flex: auto;
				font-size: $uni-font-size-lg;
				color: $uni-text-color-grey;
				line-height: 112rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				.picker-box {
					width: 100%;
					height: 100%;
				}
			}

			.more {
				flex: none;
				height: 112rpx;
				display: flex;
				align-items: center;

				image {
					width: 80rpx;
					height: 28rpx;
				}
			}
		}

		.bt2 {
			margin-top: 30rpx;
			text-align: center;
			font-size: $uni-font-size-lg;
			font-weight: 400;
			color: $uni-color-warning;
			line-height: 88rpx;
		}

		.meslist_canvas {
			position: fixed;
			top: 0;
			width: 200px;
			height: 200px;
			visibility: hidden;
		}
	}

	// 修改弹框
	.modify {
		position: fixed;
		z-index: 1002;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: #fff;

		.modify-header {
			width: 100%;
			height: 88rpx;
			padding-top: var(--status-bar-height);
			display: flex;
			flex-direction: row;
			align-items: center;
			border-bottom: 1px solid $uni-border-color;

			.close {
				padding-left: 32rpx;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 44rpx;
			}

			.title {
				line-height: 88rpx;
				color: $uni-text-color;
				font-size: 40rpx;
				flex: auto;
				text-align: center;
			}

			.define {
				padding-right: $uni-spacing-col-base;
				font-size: $uni-font-size-lg;
				color: $uni-color-success;
				line-height: 44rpx;
			}
		}

		.modfiy-main {
			display: flex;
			padding: $uni-spacing-col-base;
			flex-direction: column;

			.modfiy-pwd {
				flex: auto;
				width: 100%;
				padding: 0 20rpx;
				box-sizing: border-box;
				height: 88rpx;
				margin-bottom: $uni-spacing-col-base;
				background: $uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 88rpx;

			}

			.modfiy-content {
				flex: auto;
				width: 100%;
				height: 386rpx;
				background: $uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 44rpx;
				padding: 16rpx 20rpx;
				box-sizing: border-box;
			}
		}
	}
</style>
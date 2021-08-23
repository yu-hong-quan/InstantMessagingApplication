<template>
	<view class="contents">
		<view class="top-bar">
			
			<view class="top-bar-center">
				<view class="text">好友请求</view>
			</view>
			<view class="top-bar-left" @click="backOne">
				<image src="../../static/images/common/back.png" mode="" class="back-img"></image>
			</view>
			<view class="top-bar-right">
				<view class="pic"></view>
			</view>
		</view>
		<view class="main">
			<view class="requester" v-for="(item,index) in requesters" :key="index">
				<view class="request-top">
					<view class="reject btn">拒绝</view>
					<view class="header-img">
						<image :src="item.imgurl" mode="" ></image>
					</view>
					<view class="aggree btn">同意</view>
				</view>
				<view class="request-center">
					<view class="title">{{item.name}}</view>
					<view class="time">
						{{changeTime(item.time)}}
					</view>
				</view>
				<view class="notic">
					<text>留言：</text>{{item.news}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js';
	import myfun from '../../commons/js/myfun.js';
	export default {
		data() {
			return {
				requesters: []
			};
		},
		onLoad() {
			this.getRequesters()
		},
		methods:{
			// 返回至上一页
			backOne(){
				uni.navigateBack({data:1})
			},
			// 获取时间修改
			changeTime(date) {
				return myfun.dateTime(date)
			},
			// 获取好友请求列表
			getRequesters() {
				this.requesters = datas.friends();
				for (let i = 0; i < this.requesters.length; i++) {
					this.requesters[i].imgurl = '../../static/images/img/' + this.requesters[i].imgurl;
				}
				console.log(this.requesters)
			},
		}
	}
</script>

<style lang="scss">
	@import  "../../commons/css/mycss.scss";
	.top-bar{
		background: rgba(255,255,255,.95);
		border-bottom: 1px solid $uni-border-color;
	}
	.main{
		padding:108rpx $uni-spacing-col-base;
		.requester{
			margin-top: 112rpx;
			padding: $uni-spacing-col-base;
			background: rgba(255,255,255,1);
			box-shadow:0px 24rpx 64rpx -8rpx rgba(0,0,0,0.1);
			border-radius: $uni-border-radius-base;
		}
		.request-top{
			display: flex;
			flex-direction: row;
			.btn{
				flex: auto;
				width: 160rpx;
				height: 64rpx;
				background: rgba(255,93,91,.1);
				border-radius: 40rpx;
				text-align: center;
				line-height: 64rpx;
				font-size: $uni-font-size-lg;
			}
			.reject{
				color: $uni-color-warning;
				background-color: rgba(255,93,91,.1);
			}
			.aggree{
				color: $uni-text-color;
				background-color: $uni-color-primary;
			}
			.header-img{
				flex: auto;
				text-align: center;
				margin-top: -104rpx;
				image{
					width: 144rpx;
					height: 144rpx;
					border-radius: 50%;
					background-color: $uni-color-primary;
				}
			}
		}
		.request-center{
			text-align: center;
			padding-top: 20rpx;
			padding-bottom: 40rpx;
			.title{
				font-size: 36rpx;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 50rpx;
			}
			.time{
				font-size: $uni-font-size-sm;
				color: $uni-text-color-disable;
				line-height: 34rpx;
			}
		}
		.notic{
			font-size: $uni-font-size-base;
			color: $uni-text-color;
			line-height: 40rpx;
			background-color:$uni-bg-color-grey;
			padding: $uni-spacing-col-sm $uni-spacing-col-base;
			border-radius: $uni-border-radius-base;
		}
	}
</style>

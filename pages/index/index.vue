<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/images/img/four.png" mode=""></image>
			</view>
			<view class="top-bar-center">
				<image src="../../static/images/index/logo.png" mode="" class="logo"></image>
			</view>
			<view class="top-bar-right">
				<view class="search"><image src="../../static/images/index/search.png" mode=""></image></view>
				<view class="add"><image src="../../static/images/index/add.png" mode=""></image></view>
			</view>
		</view>
		<view class="main">
			<view class="friends">
				<view class="friend-list">
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
				<view class="friend-list" v-for="(item,index) in friends" :key="item.id">
					<view class="friend-list-l">
						<text class="tip">{{item.tip}}</text>
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
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js';
	import myfun from '../../commons/js/myfun.js';
	export default {
		data() {
			return {
				friends:[]
			}
		},
		onLoad() {
			this.getFrinds()
		},
		methods: {
			changeTime(date){
				return myfun.dateTime(date)
			},
			getFrinds(){
				this.friends = datas.friends();
				for(let i=0; i<this.friends.length; i++){
					this.friends[i].imgurl = '../../static/images/img/' + this.friends[i].imgurl;
				}
				console.log(this.friends)
			}
		}
	}
</script>

<style lang="scss">
	.content{
		// 处理app端顶部自定义tabbar被消息栏遮挡问题
		padding-top: var(--status-bar-height);
		padding-bottom:32rpx;
	}
	.top-bar{
		width: 100%;
		height: 88rpx;
		position: fixed;
		z-index: 1001;
		top: 0;
		left: 0;
		background: $uni-bg-color;
		border-bottom:1px solid $uni-border-color;
		padding-top: var(--status-bar-height);// 处理app端顶部自定义tabbar被消息栏遮挡问题
		.top-bar-left{
			float: left;
			padding-left: $uni-spacing-col-base;
			image{
				width: 68rpx;
				height: 68rpx;
				margin-top: 10rpx;
				border-radius: 16rpx;
			}
		}
		.top-bar-center{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			text-align: center;
			padding-top: var(--status-bar-height);
			.logo{
				padding-top: 19rpx;
				width: 88rpx;
				height: 42rpx;
			}
		}
		.top-bar-right{
			display: flex;
			float: right;
			.search,.add{
				width: 88rpx;
				height: 88rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: nowrap;
			}
			image{
				
				width: 45rpx;
				height:45rpx;
			}
		}
	}
	.main{
		padding-top: 104rpx;
	}
	.friend-list{
		height: 96rpx;
		padding: 16rpx $uni-spacing-col-base;
		&:active{
			background-color: $uni-bg-color-grey;
		}
		.friend-list-l{
			float: left;
			position: relative;
			image{
				width: 96rpx;
				height: 96rpx;
				border-radius: $uni-border-radius-base;
				background-color: $uni-color-primary;
			}
			.tip{
				position: absolute;
				top: -6rpx;
				left: 68rpx;
				min-width: 36rpx;
				max-width: 36rpx;
				height: 36rpx;
				background: $uni-color-warning;
				border-radius: $uni-border-radius-circle;
				z-index: 10; 
				font-size: $uni-font-size-sm;
				color: $uni-text-color-inverse;
				line-height: 36rpx;
				text-align: center;
			}
		}
		.friend-list-r{
			padding-left: 128rpx;
			.top{
				height: 50rpx;
				.name{
					float: left;
					font-size: 36rpx;
					font-weight: 400;
					color: $uni-text-color;
					line-height: 50rpx;
				}
				.time{
					float: right;
					font-size: $uni-font-size-sm;
					color: $uni-text-color-disable;
					line-height: 50rpx;
				}
			}
		}
		.info{
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
			line-height: 40rpx;
			display: -webkit-box;
			-webkit-box-orient:vertical;
			-webkit-line-clamp:1;
			overflow: hidden;
		}
	}
</style>

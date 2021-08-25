<template>
	<view class="contents">
		<view class="top-bar">
			<view class="top-bar-center">
				<view class="text">创建群聊</view>
			</view>
			<view class="top-bar-left" @click="backOne">
				<view class="text">取消</view>
			</view>
			<view class="top-bar-right">
				<view class="pice"></view>
			</view>
		</view>
		<view class="main">
			<view class="top">
				<!-- 群头像 -->
				<view class="group-img">
					<image-cropper :src="tempFilePath" @confirm="confirm"  @cancel="cancel"></image-cropper>
					<image :src="imgurl" class="img"></image>
					<canvas  id="myCanvas"  canvas-id="myCanvas" class="meslist_canvas" crop-width="200"  crop-height="200"></canvas>
					<image src="../../static/images/group/change.png" @tap="upload" class="pan"></image>
				</view>
				<!-- 群名字 -->
				<view class="group-name">
					<input type="text" value="" v-model="name" placeholder="为群取个名字" class="group-name-input" placeholder-style="color:#aaa;font-weight:400;" />
				</view>
				<view class="title">用户</view>
			</view>
			
			<!-- 选择用户 -->
			<view class="friends">
				<view class="user" v-for="(item,index) in user" :key="index" @tap="selectFriend(index)">
					<view class="selected" :class="{isselected:item.selected}">
						<image src="../../static/images/group/choose.png" mode="" class="selected-img" v-if="item.selected"></image>
					</view>
					<image :src="item.imgurl" mode="" class="user-img"></image>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="bottom-bar">
			<view class="bottom-btn btn1" @tap="" :class="{noselecte:selec&&name.length>0}">创建({{selectedn}})</view>
		</view>
	</view>
</template>

<script>
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
	export default {
		data() {
			return {
				tempFilePath: '',
				imgurl:'../../static/images/group/group.png',
				headimg:'',
				user:[
					{selected:false,imgurl:'../../static/images/img/one.png',name:'打坐'},
					{selected:false,imgurl:'../../static/images/img/two.png',name:'天空人'},
					{selected:true,imgurl:'../../static/images/img/three.png',name:'天人'},
					{selected:true,imgurl:'../../static/images/img/two.png',name:'虾仁'},
					{selected:false,imgurl:'../../static/images/img/one.png',name:'土鳖'},
					{selected:false,imgurl:'../../static/images/img/one.png',name:'突袭者'},
					{selected:false,imgurl:'../../static/images/img/one.png',name:'打坐'},
					{selected:false,imgurl:'../../static/images/img/two.png',name:'天空人'},
					{selected:true,imgurl:'../../static/images/img/three.png',name:'天人'},
					{selected:true,imgurl:'../../static/images/img/two.png',name:'虾仁'},
					{selected:false,imgurl:'../../static/images/img/one.png',name:'土鳖'},
					{selected:false,imgurl:'../../static/images/img/one.png',name:'突袭者'},
				],
				selectedn:0,
				name:'',
			};
		},
		components:{ImageCropper},
		computed:{
			// 是否选择好友
			selec(e){
				console.log(this.selectedn)
				if(this.selectedn > 0){
					return true;
				}else{
					return false;
				}
			}
		},
		onLoad() {
			this.selectedNober()
		},
		methods:{
			// 返回至上一页
			backOne() {
				uni.navigateBack({
					data: 1
				})
			},
			// 图片裁剪
			upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: (res) => {
						this.tempFilePath = res.tempFilePaths.shift()
					}
				});
			},
			confirm(e) {
				this.tempFilePath = ''
				this.imgurl = e.detail.tempFilePath;
				// #ifdef APP-PLUS||MP
				//除了H5端返回base64数据外，其他端都是返回临时地址，所以你要判断base64还是临时文件名，（用条件编译APP-PLUS||MP执行编译。）
				//按我这里是先上传裁剪得来的临时文件地址然后得到临时文件名，
				//待活你要判断是H5还是其他端传给后端类型参数让后端判断执行何种情况代码就OK了
			
				uni.uploadFile({
					url: "后端地址上传图片接口地址",
					filePath: this.imgurl,
					name: "file",
					fileType: "image",
					//formData:{},传递参数
					success: (uploadFileRes) => {
					  var backstr = uploadFileRes.data;
					  //自定义操作
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
			// 已经选择得好友个数
			selectedNober(){
				for(let i=0;i<this.user.length; i++){
					if(this.user[i].selected == true){
						this.selectedn ++;
					}
				}
			},
			// 动态选择好友
			selectFriend(e){
				if(this.user[e].selected){
					this.user[e].selected = false;
					this.selectedn --;
				}else{
					this.user[e].selected = true;
					this.selectedn ++;
					if(this.selectedn == 0){
						
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";
	.top-bar {
		background: rgba(255, 255, 255,1);
		border-bottom: 1px solid $uni-border-color;
	}
	.main{
		
		display: flex;
		flex-direction: column;
		.top{
			padding-top: 148rpx;
			position: fixed;
			background-color: #fff;
			width: 100%;
			z-index: 100;
			
		}
		.group-img{
			margin: 0 auto;
			width: 196rpx;
			height:196rpx;
			background: $uni-color-primary;
			box-shadow: 0px 36rpx 40rpx 0px rgba(39,40,50,.1);
			border-radius: 40rpx;
			overflow: hidden;
			position: relative;
			flex: auto;
			.img{
				width: 196rpx;
				height:196rpx;
			}
			.pan{
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				width: 56rpx;
				height: 56rpx;
				margin: auto;
				z-index: 10;
			}
			.meslist_canvas{
				position: fixed;
				top:0;
				width: 200px;
				height: 200px;
				visibility: hidden;
			}
		}
		.group-name{
			padding: 62rpx $uni-spacing-col-base;
			padding-bottom: 0;
		}
		.group-name-input{
			text-align: center;
			// width: 686rpx;
			height: 92rpx;
			background: $uni-bg-color-grey;
			border-radius: 46rpx;
			font-size: 32rpx;
			color: $uni-text-color;
		}
		.title{
			font-size: 44rpx;
			font-weight: 600;
			color: $uni-text-color;
			line-height: 60rpx;
			padding: $uni-spacing-col-base $uni-spacing-row-base 20rpx;
		}
		.friends{
			padding:600rpx $uni-spacing-col-base 100rpx;
			.user{
				display: flex;
				flex-direction: row;
				height: 120rpx;
				align-items: center;
				.selected{
					flex: none;
					width: 48rpx;
					height: 48rpx;
					margin-right: 30rpx;
					border-radius: 24rpx;
					background: rgba(255,228,49,.5);
					position: relative;
					.selected-img{
						width: 30rpx;
						height: 20rpx;
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
						margin: auto;
					}
				}
				.isselected{
					background: rgba(255,228,49,1);
				}
				.user-img{
					width: 80rpx;
					height: 80rpx;
					border-radius: $uni-border-radius-base;
					flex: none;
				}
				.name{
					font-size: 36rpx;
					font-weight: 400;
					padding-left: 32rpx;
					color: $uni-text-color;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}
			}
		}
	}
	.bottom-bar{
		background: rgba(250,250,250,.9);
		box-shadow: 0px 2rpx 0px 0px rgba(0,0,0,.25);
		.bottom-btn{
			background: $uni-bg-color-grey;
			margin: 0 $uni-spacing-col-base;
		}
		.noselecte{
			background: $uni-color-primary;
			
		}
	}
</style>

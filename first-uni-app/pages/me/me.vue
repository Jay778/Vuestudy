<template>
		<view class="contener">
			<view class="header">
				<image class="img1" src="../../static/xiangji.png"></image>
			</view>
			<view class="user">
			<view class="user1">
				<image src="../../static/user.jpg"></image>
			</view>
			<view class="neirongs">
				<view class="username">
					<text>purple passion</text>
				</view>
				<view class="left">
					<text>微信号：hj949219778</text>
				</view>
			</view>
			</view>
			<view class="list" v-for="(weixins, index) in weixinsList" :key="index">
				<view class="icon1">
					<image :src="weixins.imageUrl"></image>
				</view>
				<view class="names">
					{{weixins.name}}
				</view>
				<view class="right">
					<image class="img2" src="../../static/arrow-right-copy.png"></image>
				</view>
			</view>
		</view>
</template>

<script>
export default{
		data:{
			weixinsList: [{
					imageUrl: 'static/zhifu.png',
					name: '支付'
				},
				{
					name: '收藏',
					imageUrl:'static/favorite.png'
				},
				{
					name: '相册',
					imageUrl: 'static/xiangce.png'

				},
				{
					name: '卡包',
					imageUrl: 'static/qiabao.png'
				},
				{
					name: '表情',
					imageUrl: 'static/fabiaoqing.png'
				},
				{
					name: '设置',
					imageUrl: 'static/shezhi.png'
				}
			]
		}
	}
</script>

<style>
	.icon1{
		margin: 23upx;
	}
	image{
		width: 50upx;
		height: 50upx;
	}
	.user{	
		display: flex;
		margin-bottom: 20upx;
	}
	.user1 image {
		width: 80px;
		height: 80px;
		margin: 10px;
		border-radius: 10px;
		margin-top: 90upx;
		
	}
    .neirongs{
		margin-left:30upx;
		margin-top: 90upx;
		width: 100%;
	}
	.header{

	}
	.names{
		flex: 1 1 20%;
	}
	.img{
		flex: 1 1 20%;
	}
	.img1 {
		float: right;
		margin: 10upx;
		width: 50upx;
		height: 50upx;
		margin-top: 50upx;
	}
	.right{
		
		float: right;
		margin-right: 20upx;
	}
	.img2{
		width: 40upx;
		height: 40upx;
	}
	.contener {
		display: flex;
		margin: 0 auto;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: #FFFFF;
	}

	.list {
		display: flex;
		margin: 0 auto;
		width: 100%;
		height: 100upx;
		margin-bottom: 20upx;
		margin-left: 20upx;
		background-color: #FFFFFF;
		align-items: center;
	}
</style>

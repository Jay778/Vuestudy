<template>
	<view class="content">
		<view class="header">
			<view class="left">
				<p class="text1">微信</p>
			</view>
			<view class="right">
				<image src="../../static/sousuo.png"></image>
				<image src="../../static/add-line.png"></image>
			</view>
		</view>
		<view class="all" v-for="(list,index) in lists" :key="index">
				
			<view class="icon">
				<image :src="list.imageUrl"></image>
			</view>

			<view class="neirong">
				
			<view class="name">
				<p class="p">{{list.name}}</p>	
				<p class="p1">{{list.time}}</p>
			</view>	
			<view class="name1">
				<p>{{list.neirong}}</p>
			</view>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data:{
			lists:[
				{
				imageUrl:'static/1z.jpg',
				name:'软件1721大二下',
				neirong:'Jay:[图片]',
				time:'14:00'
			},
			{
				imageUrl:'static/2z.jpg',
				name:'黑桃K',
				neirong:'新年快乐!!',
				time:'15:00'
			},
			{
				imageUrl:'static/3z.jpg',
				name:'迎往相送',
				neirong:'明天的我和昨天的你',
				time:'2:00'
			},
			{
				imageUrl:'static/4z.jpg',
				name:'traveler',
				neirong:'[文件]',
				time:'1月1日'
			},
			{
				imageUrl:'static/5z.jpg',
				name:'青辞书屋',
				neirong:'那时的生命........',
				time:'20:00'
			},
			{
				imageUrl:'static/6z.jpg',
				name:'巫山云',
				neirong:'[视频通话]',
				time:'00:00'
			}
			]
		},
		onLoad() {

		},
		methods:{

		}
	}
</script>

<style>
	view{
		font-family: -apple-system,"Helvetica Neue",Arial,"PingFang SC","Hiragino Sans GB",STHeiti,"Microsoft YaHei","Microsoft JhengHei","Source Han Sans SC","Noto Sans CJK SC","Source Han Sans CN","Noto Sans SC","Source Han Sans TC","Noto Sans CJK TC","WenQuanYi Micro Hei",SimSun,sans-serif;
	}
	.all{
		display: flex;
		margin:0 auto;
		width: 100%;
		height:100upx;
		margin-bottom: 50upx;
		align-items: center;
	}
	.icon{
		width: 80upx;
		height: 80upx;
		margin: 10upx;
		border-radius: 10upx;
	}
	.neirong{
		width: 100%;
		margin-left:40upx;
	}
	.name{
		font-size: 33upx;
		display: flex;
		width: 100%;
		justify-content: space-between;	
	}
	.p1{
		margin-right: 15upx;
	}
	.name1{
		font-size: 23upx;
		color: #aaa;
		margin-top: 15upx;
		width: 100%;
	}
	.content {
		text-align: center;
		height: 400upx;
	}
	.header{	
		width: 100%;
		height: 130upx;
		background-color: #F8F8F8;
	}
	.left{
		float: left;
		margin-left: 11upx;
		margin-top: 60upx;
	}

	.right{
		float: right;
		margin-right: 5upx;
		margin-top: 33upx;
	}
	image{
		width: 50upx;
		height: 50upx;
		margin: 30upx;
	}
	.icon image {
		width: 100upx;
		height: 100upx;
		margin: 10upx;
		border-radius: 10upx;
	    
	}
</style>

<template>
	<view class="content">
		
		<view class="item" v-for="(item,index) in items" :key="index">
			<view class="left">
				<image :src="item.url"></image>
				<text class="primary-font" class="tex">{{item.name}}</text>
				<image class="static" :src="item.pic"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return { 
				items:[
					{
					name:'朋友圈',
					url:'../../static/f9.png'
					
				},
				{
					name:'扫一扫',
					url:'../../static/f6.png'
				
				},
				{
					name:'摇一摇',
					url:'../../static/f1.png'
					
				},
				{
					name:'看一看',
					url:'../../static/f2.png'
					
				},
				{
					name:'搜一搜',
					url:'../../static/f3.png'
					
				},
				{
					name:'购      物',
					url:'../../static/f5.png'
					
				},
				{
					name:'游       戏',
					url:'../../static/f10.png'
					
				},
				{
					name:'小程序',
					url:'../../static/f8.png'
				}
				
			]}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.left{
		display: flex;
		
	}
	
	.item{
		display: flex;
		flex-direction: column;
		margin-top: 80upx;
		
	}
	
	.picture{
		margin-left: 450upx;
	}
	image{
		position: relative;
		display: flex;
		width: 60upx;
		height: 60upx;
		margin-left: 30upx;
		
	}
	.tex{
		margin-left: 20upx;
	}
</style>

<template>
	<view class="content">	
	<view class="card" v-for="(friend,index) in friends" :key="index">
		<view class="logo">
			<view class="left"><image :src="friend.avatar"></image></view>
			<view class="name">
				<text>{{friend.id}}</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
export default {
	data:{
			friends: [
				{
					id: '彬彬哥哥',
					avatar: 'static/1.jpg'
				},
				{
					id: '不忘初心',
					avatar: 'static/2.jpg'
				},
				{
					id: 'Besokuse',
					avatar: 'static/3.jpg'
				},
				{
					id: '丑八怪',
					avatar: 'static/4.jpg'
				},
				{
					id: '人心有几层',
					avatar: 'static/5.jpg'
				},
				{
					id: '无休止的想你',
					avatar: 'static/6.jpg'
				},
				{
					id: '一块钱',
					avatar: 'static/7.jpg'
				}
			]
		}
	,
	onLoad() {},
	methods: {}
};
</script>

<style>
.card {
	display: flex;
	border: 1upx solid #eee;
	width: 95%;
	height: 100upx;
	margin-bottom: 8upx;
	/* 垂直方向居中 */
	align-items: center;
	/* 水平方向居中 */
	/* justify-content: center; */
	padding-left: 10upx;
	padding-right: 10upx;
}
image{
 width: 80upx;
 height: 80upx;
}
.left {
	flex: 1 1 20%;
	width: 75upx;
	height: 75upx;
}
.name{
	flex: 1 1 60%;
}
</style>

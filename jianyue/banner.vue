<template>
	<!--pages/demo/maskview.wxml-->
	<view>
		<graceHeader title="弹出层" desc="请点击按钮测试 ^_^ "></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view style="padding:200rpx 15%;">
				<button type="primary" @tap="showBanner">打开弹出层演示1</button>
				<button type="primary" @tap="showBanner2" style="margin:15px 0;">打开弹出层演示2</button>
			</view>
		</view>
		<!-- 弹出层演示 1 -->
		<graceMaskView :show="show" bgcolor="#00C777" v-on:close="closeBanner">
			<view>
				<image :src="staticUrl + 'banner-gui.png'" style="width:100%; margin-top:25px; border-top-right-radius:5px; border-top-left-radius:5px;" mode="widthFix"></image>
			</view>
			<view style="padding:25px; padding-bottom:30px;">
				<button type='warn' style="background:#F6644D; padding:0 20px;">一个按钮</button>
			</view>
		</graceMaskView>
		<!-- 弹出层演示 2 -->
		<graceMaskView :show="show2" bgcolor="none" v-on:close="closeBanner2">
			<view @tap="tap2">
				<image src="http://static.hcoder.net/graceui/hb.png" style="width:100%; border-radius:5px;" mode="widthFix"></image>
			</view>
		</graceMaskView>
	</view>
</template>
<script>
import graceMaskView from "../../graceUI/components/graceMaskView.vue";
export default {
	data() {
		return {
			staticUrl: this.staticUrl,
			show : false,
			show2 : false
		}
	},
	methods:{
		// 第1个演示 开启与关闭
		showBanner : function(){
			this.show = true;
		},
		closeBanner : function(){
			this.show = false;
		},
		// 第2个演示 开启与关闭
		showBanner2 : function(){
			this.show2 = true;
		},
		closeBanner2 : function(){
			this.show2 = false;
		},
		tap2 : function(){
			uni.showToast({
				title:"您点击了红包图片",
				icon:"none"
			})
		}
	},
	components :{
		graceMaskView
	}
}
</script>
<style>
/*
版权声明 : 
GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
侵权必究，请遵守版权约定！
*/
</style>
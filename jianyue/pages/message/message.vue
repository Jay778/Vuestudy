<template>
	<view class="container">
		<view class="top">
			<view class="top-left">
				<view class="top-left-box">
					<view class="box" v-show="!recommend"><navigator @tap="clickshow()">关注</navigator></view>
					<view class="box navigator" v-show="recommend"><navigator>关注</navigator></view>
				</view>
				<view class="top-left-box">
					<view class="box" v-show="!special"><navigator @tap="clickshow2()">签到</navigator></view>
					<view class="box navigator" v-show="special"><navigator>签到</navigator></view>
				</view>
				<view class="top-left-box">
					<view class="box" v-show="!serialize"><navigator @tap="clickshow3()">专题</navigator></view>
					<view class="box navigator" v-show="serialize"><navigator>专题</navigator></view>
				</view>
				<view class="top-left-box">
					<view class="box" v-show="!four"><navigator @tap="clickshow4()">作者</navigator></view>
					<view class="box navigator" v-show="four"><navigator>作者</navigator></view>
				</view>
			</view>
			<view class="top-right" >
				<view class="search">
					<navigator url="../search/search"><image src="../../static/gengduo.png"></image></navigator>
				</view>
			</view>
		</view>
		<view class="content" >
					<view class="list">
						<view class="list-item" v-for="(follow, index) in follows" :key="index" v-show="recommend">
							<image :src="follow.avatar" class="avatar_small"></image>
							<text class="text">{{follow.nickname}}</text>
						</view>
					</view>
				</view>
				<view v-show="special">
					<graceHeader title="弹出层" desc="请点击按钮测试 ^_^ "></graceHeader>
					<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
						<view style="padding:200rpx 15%;">
							<button type="primary" @tap="showBanner">签到</button>
						</view>
					</view>
					<!-- 弹出层演示 1 -->
					<graceMaskView :show="show" bgcolor="#ffff" v-on:close="closeBanner">
						<view>
							<image :src="staticUrl + 'banner-gui.png'" style="width:100%; margin-top:25px; border-top-right-radius:5px; border-top-left-radius:5px;" mode="widthFix"></image>
						</view>
						<view style="padding:25px; padding-bottom:30px;">
							<text>签到成功！！！</text>
							<button type='warn' style="background:#F6644D; padding:0 20px;">确定</button>
						</view>
					</graceMaskView>
					<!-- 弹出层演示 2 -->
					<graceMaskView :show="show2" bgcolor="none" v-on:close="closeBanner2">
						<view @tap="tap2">
							<image src="http://static.hcoder.net/graceui/hb.png" style="width:100%; border-radius:5px;" mode="widthFix"></image>
						</view>
					</graceMaskView>
				</view>
	</view>
</template>

<script>
	import graceMaskView from "../../graceUI/components/graceMaskView.vue";
export default{
	data(){
		return{
		recommend: true,
		special: false,
		serialize: false,
		four:false,
		five:false,
		follows:[],
		articles:[],
		show:false,
		show2:false,
		staticUrl: this.staticUrl
		};
		},
	onShow: function() {
		var _this = this;
		const loginKey = uni.getStorageSync('login_key');

		if (loginKey) {
			this.storageData = {
				login: loginKey.login,
				nickname: loginKey.nickname,
				avatar: loginKey.avatar,
				userId: loginKey.userId
			};
			uni.request({
				url: this.apiServer + '/article/user',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					userId: this.storageData.userId
				},
				success: res => {
					_this.articles = res.data.data;
				}
			});
			uni.request({
				url: this.apiServer + '/follow/list',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: this.storageData.userId
				},
				success: res => {
					_this.follows = res.data.data;
				}
			});
		} else {
			this.storageData = {
				login: false
			};
		}

		uni.request({
			url: 'http://localhost:8080/api/user/' + uni.getStorageSync('login_key').userId,
			method: 'GET',
			header: { 'content-type': 'application/json' },
			success: res => {
				if (res.data.code === 0) {
					console.log(res.data.data.avatar + '————————————');
					_this.avatar = res.data.data.avatar;
					_this.nickname = res.data.data.nickname;
				}
			}
		});
	},

		methods:{
			clickshow: function() {
				this.recommend = true;
				this.special = false;
				this.serialize = false;
				this.four = false;
			},
			clickshow2: function() {
				this.recommend = false;
				this.special = true;
				this.serialize = false;
				this.four = false;
			},
			clickshow3: function() {
				this.recommend = false;
				this.special = false;
				this.serialize = true;
				this.four = false;
			},
				clickshow4: function() {
				this.recommend = false;
				this.special = false;
				this.serialize = false;
				this.four = true;
				
			},
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
	.content{
		
	}
.avatar_small{
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
	.text{
		margin-left: 20px;
		
	}
.list{
	margin-top: 20px;
}
.list-item{
	margin-bottom: 40px;
    height: 70px;
	
}
.top {
	width: 100%;
	height: 35px;
	background: #ffffff;
	display: flex;
	justify-content: space-between;
	
	margin-top: 15px;
	
}
.top-left {
	
	margin-left: 3px;
	display: flex;
	width: 100%;
}
.top-left-box {
	height: 100%;
	display: flex;
	flex: 1 1 30%;
}
.top-right {
	margin-right: 10px;
}
.navigator {
	color: #fd572b;
	border-bottom: 2px solid #fd572b;
}
.search image {
	width: 25px;
	height: 25px;
}

</style>


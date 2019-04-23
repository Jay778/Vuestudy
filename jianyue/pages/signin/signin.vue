<template>
	<view class="uni-flex uni-column container">
		<view class="header">
		<h2>帐号密码登录</h2>
		</view>
		<view class="content">
		<input class="uni-input" type="number" placeholder="请输入手机号/邮箱" v-model="userDTO.mobile" required="required"/>
		<input class="uni-input" password type="text" placeholder="请输入密码" v-model="userDTO.password" required="required"/>
		</view>
		<view class="btn">
		<button type="primary" @tap="signIn(userDTO)" class="btn1">登录</button>
		</view>
		<view class="register">
		<navigator url="../signup/signup" class="zhuce">手机号快捷登录</navigator>
		<text class="fenge">|</text>
		<navigator class="zhuce">登录遇到问题</navigator>
		</view>
		<view class="foot">
			<view class="top">
				<text class="top1">———社交帐号直接登录———</text>
			</view>
			<view class="content1">
				<view class="weixin">
					<image src="../../static/微信.png"></image>
					<text class="kuai1">微信</text>
				</view>
				<view class="kuai">
					<image src="../../static/qq.png"></image>
					<text class="kuai1">QQ</text>
				</view>
				<view class="kuai">
					<image src="../../static/微博.png"></image>
					<text class="kuai1">微博</text>
				</view>
				<view class="kuai">
					<image src="../../static/其他.png"> </image>
					<text class="kuai1">其他</text>
				</view>
			</view>
			<view class="end">
				<text class="end1">登录代表您已经同意</text>
				<navigator class="end2">用户协议</navigator>
				<text class="end1">和</text>
				<navigator class="end2">隐私政策</navigator>
			</view>
		</view>
	</view>
	
</template>

<script>
export default {
	data() {
		return {
			userDTO: {
				mobile:'',
				password:''
			}
		};
	},
	onLoad() {
	},
	methods: {
		signIn: function(userDTO) {
			var _this = this;
			uni.request({
				url: this.apiServer + '/user/sign_in',
				method: 'POST',
				data: {
					mobile: userDTO.mobile,
					password: userDTO.password
				},
				header: {
					'content-type': 'application/json'
				},
				success: res => {
					// console.log(res.data.data);
					if (res.data.code == 0) {
						//将用户数据记录在本地存储
						uni.setStorageSync('login_key', {
							userId: res.data.data.id,
							nickname: res.data.data.nickname,
							avatar: res.data.data.avatar,
							token: res.data.data.token,
							login: true
						});
						uni.showToast({
							title: '登录成功'
						});
						uni.switchTab({
							url: '../my/my'
						});
				
					}
					//登录失败，弹出各种原因
					else {
						uni.showModal({
							title: '提示',
							content: res.data.msg
						});
					}
				}
			});
		}
	}
};
</script>

<style scoped>
.container{
	height: 100%;
}
input {
	height: 50px;
	margin-bottom: 8px;
	margin-left: 30px;
	border-radius: 5px;
}
.uni-input{
	font-size: 18px;
}
.header{
	display: flex;
	justify-content: center;
	margin-bottom: 60px;
	margin-top: 50px;
	
}
.content{
	margin-bottom: 30px;
}
h2{
	font-size:25px;
	font-weight: 500;
}
.btn{
	margin-bottom: 30px;
}
.btn1{
	border-radius: 20px;
	background-color: rgb(255,102,81);
	width: 90%;
}
.register{
	display: flex;
	justify-content: center;
	margin-bottom:80px;
}
.zhuce{
	color: rgb(92,114,158);
	font-size: 17px;
}
.fenge{
	margin-left: 5px;
	margin-right:5px;
	color: #B5B5B5;
	font-size: 17px;
}
.top{
	display: flex;
	justify-content: center;
	margin-bottom: 35px;
}
.top1{
	color: #b5b5b5;
	font-size: 16px;
}
.content1{
	display: flex;
	justify-content:center;
	margin-bottom:35px;
}
.kuai{
	flex: 1 1 15%;
}
.weixin{
	flex: 1 1 15%;
	margin-left: 20px;
}
image{
	width: 26px;
	height:27px;
	vertical-align:middle;
	margin-right: 5px;
}
.kuai1{
	vertical-align:middle;
	font-size: 17px;
}
.end{
	display: flex;
	justify-content: center;
}
.end1{
	color: #B5B5B5;
	font-size: 16px;
}
.end2{
	color: #B5B5B5;
	font-size: 16px;
	border-bottom: 1px solid #B5B5B5;
}
</style>

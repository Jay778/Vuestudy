<template>
	<view class="uni-flex uni-column container">
		<view class="header">
		<h2>手机号快速注册</h2> 
		</view>
		<view class="content">
		<view>
		<input class="uni-input" placeholder="请输入手机号" type="number" v-model="mobile" required="required"/>
		</view> 
		<view class="xia">
		<view class="left">
		<input class="uni-input" placeholder="请输入验证码" type="number" v-model="verifyCode" required="required"/>
		</view>
		<view class="right">
			<span v-show="show" @tap="getCode()" class="text">获取验证码</span>
			<span v-show="!show"  class="count">{{count}}s</span>
		</view>
		</view>
		</view>
		<view class="btn">
		<button @tap="checkCode" class="btn1">下一步</button>
		</view>
		<view class="register">
		<navigator url="../signin/signin" class="zhuce">帐号密码登录</navigator>
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
				<view class="shang">
				<text class="end1">未注册的手机号登录时将自动注册，且代表您已经同意</text>
				</view>
				<view class="xia">
				<navigator class="end2">用户协议</navigator>
				<text class="end1">和</text>
				<navigator class="end2">隐私政策</navigator>
				</view>
			</view>
		</view>
		</view>
</template>

<script>
	export default{
		data(){
  return {
   show: true,
   count: '',
   timer: null,
   mobile: '',
	verifyCode: ''
  }
 },
 onLoad() {},
 methods:{
   getCode(){
     const TIME_COUNT = 60;
	 var _this = this;
	 uni.request({
				url: this.apiServer + '/user/verify',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					mobile: _this.mobile
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '验证码已发送'
						});
						_this.disabled = true;
						console.log(_this.disabled);
					} else {
						uni.showModal({
							title: '提示',
							content: res.data.msg
						});
					}
				}
			});
     if (!this.timer) {
       this.count = TIME_COUNT;
       this.show = false;
       this.timer = setInterval(() => {
       if (this.count > 0 && this.count <= TIME_COUNT) {
         this.count--;
        } else {
         this.show = true;
         clearInterval(this.timer);
         this.timer = null;
        }
       }, 1000)
      }
   },
	 	checkCode: function() {
			var _this = this;
			console.log(_this.verifyCode);
			uni.request({
				url: this.apiServer + '/user/check',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					mobile: _this.mobile,
					verifyCode: _this.verifyCode
				},
				success: res => {
					console.log(res.data);
					if (res.data.code === 0) {
						uni.navigateTo({
							url: '../password/password?mobile=' + _this.mobile
						});
					} else {
						uni.showModal({
							title: '提示',
							content: res.data.msg
						});
					}
				}
			});
		}
 }
	}
</script>

<style>
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
		margin-top: 48px;
	}
	h2{
		font-size:25px;
		font-weight: 500;
	}
	.xia{
		display: flex;
		justify-content: center;
	}
	.left{
	flex: 1 1 65%;
	}
	
	.right{
	height: 50px;
	color:  rgb(255,102,81);
	border-radius: 5px;
	line-height: 50px;
	flex: 1 1 35%;
	text-align: center;
	}
	.content{
		margin-bottom: 30px;
	}
	.btn{
		margin-bottom: 30px;
	}
	.btn1{
		border-radius: 20px;
		background-color: rgb(255,102,81);
		width: 90%;
		color: #FFFFFF;
	}
	.register{
		display: flex;
		justify-content: center;
		margin-bottom:73px;
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
		
		justify-content: center;
	
	}
	.shang{
		display: flex;
		justify-content: center;
	}
	.end1{
		color: #B5B5B5;
		font-size: 14px;
		margin-left: 5px;
		margin-right: 5px;
	}
	.end2{
		color: #B5B5B5;
		font-size: 14px;
		border-bottom: 1px solid #B5B5B5;
	}
</style>

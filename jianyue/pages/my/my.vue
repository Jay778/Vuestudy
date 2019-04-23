<template>
	<view class="container">
		<view class="top">
		<view class="top_left">
			<image src="../../static/扫码%20.png" class="left_img"></image>
		</view>
		<view class="top_right">
			<image src="../../static/mine_icon_night.png" class="right_img"></image>
			<text class="right_text">夜间</text>
		</view>
		</view>
			<view class="avatar-box" v-if="!storageData.login">
				<view class="left">
				<image src="../../static/default.png" mode="scaleToFill" class="avatar" v-if="!storageData.login"></image>
				</view>
				<view class="right">
				<navigator url="../signin/signin" v-if="!storageData.login" class="right_text1">点击登录</navigator>
				<view class="right1">
				<text v-if="!storageData.login" class="right1_text">立即赢简阅钻福利</text>
				</view>
				</view>
			</view>
			<view class="info-box" v-if="storageData.login">
				<view class="left">
				<image :src="avatar" mode="scaleToFill" class="avatar" v-if="storageData.login"></image>
				</view>
				<view class="right">
				<text v-if="storageData.login" class="right_text1">{{nickname}}</text>
				<view class="right1">
				<text v-if="storageData.login" class="right1_text">关注</text>
				<navigator v-if="storageData.login" url="../setting/setting" class="setting">个人设置</navigator>
				</view>
				</view>
			</view>
		<view class="head1">
			<view class="one">
			<view>
			<image src="../../static/mine_icon_jewel.png" mode="scaleToFill" class="img_h1" ></image>
			<text  class="text_one">简阅钻: 0</text>
			</view>
			<view class="one_right">
			<text class="one_text">查看</text>
			<image src="../../static/箭头.png" class="one_img"></image>
			</view>
			</view>
			<view class="two">
			<view class="kuai">
				<view class="kuai_img">
					<image src="../../static/mine_icon_article.png" class="kuai_img1"></image>
				</view>
				<view class="kuai_text">
				<navigator url="../article_detail/myarticle"><text class="kuai_text1">我的文章</text></navigator>
				</view>
				</view>
				<view class="kuai">
				<view class="kuai_img">
					<image src="../../static/mine_icon_bookshelf.png" class="kuai_img1"></image>
				</view>
				<view class="kuai_text">
					<text class="kuai_text1">我的书架</text>
				</view>
				</view>
				<view class="kuai">
				<view class="kuai_img">
					<image src="../../static/mine_icon_like.png" class="kuai_img1"></image>
				</view>
				<navigator url="../article_detail/like">
				<view class="kuai_text">
					<text class="kuai_text1">赞和收藏</text>
				</view>
				</navigator>
				</view>
				<view class="kuai">
				<view class="kuai_img">
					<image src="../../static/mine_icon_mission.png" class="kuai_img1"></image>
				</view>
				<view class="kuai_text">
					<text class="kuai_text1">有奖任务</text>
				</view>
				</view>
				</view>
		</view>
		<view class="photo">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"  class="carousel">
			<swiper-item>
			<image src="../../static/lun1.jpg" class="photo_img"></image>
			</swiper-item>
			<swiper-item>
			<image src="../../static/lun2.jpg" class="photo_img"></image>
			</swiper-item>
			<swiper-item>
			<image src="../../static/lun3.jpg" class="photo_img"></image>
			</swiper-item>
			<swiper-item>
			<image src="../../static/lun4.jpg" class="photo_img"></image>
			</swiper-item>
			</swiper>
		</view>
		<view class="content">
			<view class="content_small">
				<text class="small_text">简阅会员</text>
				<view class="small_right">
				<text class="right_text2">限时赠简阅钻</text>
				<image src="../../static/箭头.png" class="small_img"></image>
				</view>
			</view>
			<view class="content_small">
				<text class="small_text">简阅活动</text>
				<view class="small_right">
				<text class="right_text2">万元奖金等你</text>
				<image src="../../static/箭头.png" class="small_img"></image>
				</view>
			</view>
			<view class="content_small">
				<text class="small_text">简东西</text>
				<view class="small_right">
				<text class="right_text2">简阅人都爱买</text>
				<image src="../../static/箭头.png" class="small_img"></image>
				</view>
			</view>
			<view class="content_small">
				<text class="small_text">我的钱包</text>
				<image src="../../static/箭头.png" class="small_img1"></image>
			</view>
			<view class="content_small">
				<text class="small_text">我的专题/文集</text>
				<image src="../../static/箭头.png" class="small_img1"></image>
			</view>
			<view class="content_small">
				<text class="small_text">浏览历史</text>
				<image src="../../static/箭头.png" class="small_img1"></image>
			</view>
		</view>
	</view>
</template>

<script>
var loginRes, _self;
export default {
	data() {
		var one=10;
		var two=5;
		var three=66;
		var four=100;
		return {
			avatar:'',
			nickname:'',
			storageData: {},
			headers:[{
				"shang":one,
				"xia":'文章'
			},{
				"shang":two,
				"xia":'关注'
			},
			{
				"shang":three,
				"xia":'消息'
			},
			{
				"shang":four,
				"xia":'积分'
			}
			],
			contents:[{
				"wenzhang":'简阅会员'
			},
			{
				"wenzhang":'简阅活动'
			},
			{
				"wenzhang":'简东西'
			},
			{
				"wenzhang":'我的钱包'
			},
			{
				"wenzhang":'我的专题/文集',
			},
			{
				"wenzhang":'浏览历史'	
			}
			],
			heads:[
				{
				"shang":require('../../static/文章.png'),
				"xia":'我的文章'
			},{
				"shang":require('../../static/书架.png'),
				"xia":'我的书架'
			},
			{
				"shang":require('../../static/收藏.png'),
				"xia":'赞和收藏'
			},
			{
				"shang":require('../../static/任务.png'),
				"xia":'有奖任务'
			}
			]
			
		};
	},
	onLoad: function() {},
	onShow: function() {
		var _this = this;
		const loginKey = uni.getStorageSync('login_key');
		if (loginKey) {
			// console.log(loginKey);
			this.storageData = {
				login: loginKey.login,
				nickname: loginKey.nickname,
				avatar: loginKey.avatar
			};
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
					console.log(res.data.data.avatar+'————————————');
					_this.avatar = res.data.data.avatar;
					_this.nickname = res.data.data.nickname;
				}
			}
		});
	},
	methods: {
	}
};
</script>

<style>
	.info-box{
	display: flex;
	}
	.avatar-box{
		display: flex;
	}
	.top{
		display: flex;
		justify-content: space-between;
		margin-top: 15px;
	}
	.left_img{
		width:25px;
		height:25px;
	}
	.top_right{
		vertical-align:middle;
	}
	.right_img{
		width: 25px;
		height: 25px;
		margin-right: 8px;
		vertical-align:middle;
	}
	.right_text{
		color: #B5B5B5;
		font-size: 15px;
		vertical-align: middle;
	}	
	.left{
		display: flex;
		left: 5%;
		margin-top: 11px;
	}
	.right{
	margin-top: 13px;
	}
	.right1{
	  display: flex;
	  margin-left:10px;
	}
	.right_text1{
		display: flex;
		margin-bottom: 12px;
		margin-left:10px;
	}
	.right1_text{
		font-size: 15px;
		color: rgb(158,158,158);
	}
	.setting{
	display: flex;
	color:rgb(26, 173, 25);
	margin-left: 20px;
	font-size: 15px;
	}
	.head1{
		width: 100%;
		margin-bottom: 15px;
		margin-top: 15px;
		box-shadow:0px  0px  6px 0px #d0d0d0;
		height: 155px;
	}
	.one{
		display: flex;
		height: 54px;
		width: 93%;
		border-bottom: 1px solid rgb(213,213,213);
		margin-left: 12px;
		justify-content: space-between;
	}
	.one_img{
		width: 15px;
		height: 12px;
		vertical-align: middle;
	}
	.one_text{
		color: #B5B5B5;
		font-size: 15px;
		vertical-align: middle;
		line-height: 54px;
		margin-right: 5px;
	}
	.img_h1{
		width: 33px;
		height: 33px;
		margin-left:8px;
		vertical-align: middle;
	}
	.text_one{
	line-height: 54px;
	font-size: 15px;
	vertical-align: middle;
	}
	.two{
		display: flex;
		justify-content: center;
	}
	.kuai{
		flex: 1 1 20%;
	}
	.kuai_img1{
		width: 27px;
		height: 27px;
		margin-top: 15px;
		margin-left: 28px;
	}
	.kuai_text1{
		font-size: 14px;
		margin-left: 15px;
	}
	.photo{
		margin-top: 15px;
		margin-bottom: 11px;
		border-radius: 5px;
		}
	.carousel{
		width: 100%;
		height: 65px;
		border-radius: 5px;
	}
	.photo_img{
		width: 100%;
		height: 65px;
		border-radius: 5px;
	}
	.content{
	margin-top: 20px;
	
	}
	.content_small{
	display: flex;
	border-bottom: 1px solid rgb(213,213,213);
	width: 100%;
	height: 50px;
	margin-left: 8px;
	justify-content: space-between;
	}
	.small_text{
		font-size: 15px;
		line-height: 50px;
		vertical-align: middle;
	}
	.small_img{	
		width: 15px;
		height: 12px;
		vertical-align: middle;
		margin-right: 5px;
	}
	.small_img1{
		width: 15px;
		height: 12px;
		vertical-align: middle;
		margin-top: 18px;
		margin-right: 5px;
	}
	.right_text2{
		color: #B5B5B5;
		font-size: 13px;
		vertical-align: middle;
		line-height: 50px;
		margin-right: 3px;
	}
	.content1{	
		display: flex;
		border-bottom: 1px solid #8F8F94;
		margin-bottom: 20px;
		align-content: center;
	}
	.content2{
		display: flex;
		align-content: center;
		height: 40px;
		margin-left: 15px;
	}
	.container{
		height: 100%;
	}
	.header{
		display: flex;
		width: 100%;
		margin-bottom: 20px;
		margin-top: 40px;
	}
	.header1{
		width: 70%;
		margin-right: 10px;
		text-align: center;
		margin-left: 15px;
		border-right: 1px solid #8F8F94;
		margin-top: 30px;
	}
	.text1{
	font-size: 13px;
	}

.img_h{
	width: 30px;
	height: 30px;
	margin-left:15px;
	line-height: 30px;
}
.two1{
	margin-left: 12px;
	margin-top: 18px;
}
.text_one{
	margin-left: 7px;
	margin-top: 10px;
}
</style>
<template>
	<view class="container">
		<view class="top">
			<view class="avatar-box">
				<image
					src="../../static/default.png"
					mode="scaleToFill"
					class="avatar"
					v-if="!storageData.login">
					</image>
				<navigator url="../signin/signin" v-if="!storageData.login">点击登录</navigator>
			</view>
			<view class="info-box">
				<view class="left">
				<image :src="avatar" mode="scaleToFill" class="avatar" v-if="storageData.login"></image>
				</view>
				<view class="right">
				<text v-if="storageData.login" class="text">{{nickname}}</text>
				<view class="right1">
				<text v-if="storageData.login" class="text">关注 0</text>
				<navigator v-if="storageData.login" url="../setting/setting" class="setting">个人设置</navigator>
				</view>
				</view>
			</view>
		</view>
		<view class="head1" v-if="storageData.login">
			<view class="one">
			<image src="../../static/钻石.png" v-if="storageData.login" mode="scaleToFill" class="img_h1" ></image>
			<text v-if="storageData.login" class="text_one">简阅钻: 0</text>
			</view>
			</hr>
			<view class="two">
			<view class="two1" v-for="(head,index) in heads" :key="index" v-if="storageData.login" >
			<navigator url="../article_detail/myarticle">
			<view class="shang">
			<image v-bind:src="head.shang" mode="scaleToFill" v-if="storageData.login" class="img_h"></image>
			</view>
			<view class="xia">
			<text class="text1">{{head.xia}}</text>
			</view>
			</navigator>
			</view>
		</view>
		</view>
		<view class="photo" v-if="storageData.login">
			<img class="img"  src="../../static/4.jpg" />
		</view>
	
	<view class="content" v-if="storageData.login">
		<view v-for="(content,index) in contents" :key="index" class="content1">
			<view class="content2">
		<navigator >{{content.wenzhang}}</navigator>	
		</view>
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

<style scoped>
	.left{
		display: flex;
		left: 5%;
		margin-top: 13px;
	}
	.right{
	margin-top: 13px;
	}
	.right1{
		display: flex;
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
	.head1{
		width: 100%;
		margin-bottom: 15px;
		margin-top: 15px;
		box-shadow:0px  0px  8px 0px #d0d0d0;
		height: 160px;
	}
	.header1{
		width: 70%;
		margin-right: 10px;
		text-align: center;
		margin-left: 15px;
		border-right: 1px solid #8F8F94;
		margin-top: 30px;
	}
	.content{
	margin-top: 20px;
	box-shadow:0px  0px  8px 0px #d0d0d0;
	}
	.top {
	height: 70px;
	margin-top: 15px;
	margin-bottom: 20px;
	}
.avatar-box{
	text-align: center;
	margin-bottom: 15px;
	}
.info-box{
	display: flex;
	}
	.photo{
		margin-top: 15px;
		margin-bottom: 11px;
	}
.text{
	display: flex;
	margin-bottom: 12px;
	margin-left: 20px;
	}
.text_one{
	
}
.text1{
	font-size: 13px;
}
.setting{
	display: flex;
    color:rgb(26, 173, 25);
	margin-left: 20px;
}
.one{
	display: flex;
	height: 50px;
	width: 100%;
	align-content: center;
	border-bottom: 2px solid #EEEEEE;
}
.two{
	display: flex;
	align-content: center;
}
.img{
	width: 100%;
	height: 85px;
}
.img_h{
	width: 30px;
	height: 30px;
	margin-left:15px;
	line-height: 30px;
}
.img_h1{
	width: 30px;
	height: 30px;
	margin-left:15px;
	line-height: 30px;
	margin-top: 6px;
}
.two1{
	margin-left: 12px;
	margin-top: 18px;
}
.text_one{
	margin-left: 7px;
	margin-top: 10px;
}
view{
	font-weight: 700;
}
</style>
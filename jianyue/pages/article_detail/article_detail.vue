<template>
	<view class="container">
		<view class="article-title">
		<text class="article-title1" >{{article.title}}</text>
		</view>
		<view class="article-info">
			<view class="left">
			<image :src="article.avatar" class="avatar_small"></image>
			<text>{{ article.nickname }}</text>
			<text class="info-text">{{ handleTime(article.createTime) }}</text>
			</view>
			<!-- 登录用户和文章作者不是同一个人，就显示关注或取消关注按钮 -->
			<view class="right">
			<button v-if="userId != article.uId && !followed" class="green-btn follow-btn cancel" @tap="follow">关注</button>
			<button v-if="userId != article.uId && followed" class="green-btn follow-btn cancel" @tap="cancelFollow">取消</button>
			</view>
		</view>
		<view class="grace-text" style="margin-top: 10px;"><rich-text :nodes="article.content" bindtap="tap"></rich-text></view>
		<text class="info-text">评论:{{ comments.length }}</text>
		<view class="comment-item" v-for="(comment, index) in comments" :key="index">
			<view class="left"><image :src="comment.avatar" class="avatar_small"></image></view>
			<view class="right">
				
				<text class="right1">{{ comment.nickname }}</text>
				<text>{{ comment.content }}</text>
				
				<view class="right1">
					<text style="margin-right: 10px;">{{ comments.length - index }}楼</text>
					<text>{{handleTime(comment.commentTime)}}</text>
				</view>
			</view>
		</view>
		<input class="uni-input comment-box" type="text" placeholder="写下你的评论" v-model="content" required="required" />
		<button class="green-btn" @tap="send">提交</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			article: {
				aId: 0,
				uId: 0,
				title: '',
				content: '',
				avatar: '',
				nickname: '',
				createTime: ''
			},
			comments: [],
			content: '',
			userId: uni.getStorageSync('login_key').userId,
			followed: false
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		this.article.aId = option.aId;
	},
	onShow: function() {
		this.getArticle();
	},
	onPullDownRefresh: function() {
		this.getArticle();
	},
	methods: {
		getArticle: function() {
			var _this = this;
			uni.request({
				url: this.apiServer + '/article/' + this.article.aId,
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					userId: this.userId
				},
				success: res => {
					// console.log(res.data.data.article);
					_this.article.aId = res.data.data.article.id;
					_this.article.uId = res.data.data.article.uid;
					_this.article.title = res.data.data.article.title;
					_this.article.content = res.data.data.article.content;
					_this.article.nickname = res.data.data.article.nickname;
					_this.article.avatar = res.data.data.article.avatar;
					_this.article.createTime = res.data.data.article.createTime;
					_this.comments = res.data.data.comments;
					if (res.data.data.followed === '已关注') {
						_this.followed = true;
					}
				},
				complete: function() {
					uni.stopPullDownRefresh();
				}
			});
		},
		handleTime: function(date) {
			var d = new Date(date);
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
			var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
			var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
			var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
			return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
		},
		send: function() {
			console.log('评论人编号：' + this.userId + ',文章编号：' + this.article.aId + '，评论内容：' + this.content);
			uni.request({
				url: this.apiServer + '/comment/add',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					aId: this.article.aId,
					uId: this.userId,
					content: this.content
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '评论成功'
						});
						this.getArticle();
						this.content = '';
					}
				}
			});
		},
		follow:function(){
			uni.request({
				url: this.apiServer + '/follow/add',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: this.userId,
					toUId: this.article.uId
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '关注成功'
						});
						this.followed = true;
					}
				}
			});
		},
		cancelFollow:function(){
			uni.request({
				url: this.apiServer + '/follow/cancel',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: this.userId,
					toUId: this.article.uId
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '已取消关注'
						});
						this.followed = false;
					}
				}
			});
		}
	}
};
</script>

<style >
	.grace-text{
		border-bottom: 4px solid #EEEEEE;
		margin-bottom: 10px;
	}
	.info-text{
		margin-left: 10px;
	}
.article-title1{
	font-weight: 700;
	font-size: 20px;
}
.article-title{
	width: 100%;
	height: 40px;
	margin-top: 20px;
}
.article-info{
	display: flex;
	margin-top: 7px;
}
.left{
	flex: 1 1 70%;
}
.right{
	flex: 1 1 30%;
}
.right1{
	margin-top: 20px;
}
.avatar_small{
	width:45px;
	height: 45px;
	border-radius: 50%;
	margin-top: 20px;
}
.content {
	margin-bottom: 10px;
	margin-top: 20px;
	padding: 5px;
	border-bottom: 1px solid #eee;
}
.img-list {
	display: flex;
	flex-direction: column;
}
.img-item {
	width: 100%;
	height: 150px;
	margin-bottom: 5px;
}
.img-item image {
	width: 100%;
	height: 100%;
	border-radius: 5px;
}
.comment-item {
	display: flex;
	border-bottom: 1px solid #eee;
	margin-bottom: 10px;
	padding: 5px;
	height:100px;
}
.comment-item .left {
	flex: 1 1 17%;
}
.comment-item .right {
	flex: 1 1 75%;
	display: flex;
	flex-direction: column;
}
.comment-box {
	border: 1px solid #fff;
	border-radius: 5px;
	background-color: #eee;
	height: 50px;
}
.follow-btn {
	height: 33px;
	width: 80px;
	font-size: 12pt;
	text-align: center;
	padding-bottom: 20px;
	margin-right: 0px;
}
.green-btn{
	background-color: rgb(65,168,99);
	color: #FFFFFF;
}
.cancel{
	background-color: rgb(26,160,52);
	color: #FFFFFF;
	font-size: 21px;
	line-height: 30px;
}
</style>


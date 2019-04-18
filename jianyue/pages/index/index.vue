<template>
	<view class="container">
		<view class="top">
			<view class="top-left">
				<view class="top-left-box">
					<view class="box" v-show="!recommend"><navigator @tap="clickshow()">推荐</navigator></view>
					<view class="box navigator" v-show="recommend"><navigator>推荐</navigator></view>
				</view>
				<view class="top-left-box">
					<view class="box" v-show="!special"><navigator @tap="clickshow2()">专题</navigator></view>
					<view class="box navigator" v-show="special"><navigator>专题</navigator></view>
				</view>
				<view class="top-left-box">
					<view class="box" v-show="!serialize"><navigator @tap="clickshow3()">连载</navigator></view>
					<view class="box navigator" v-show="serialize"><navigator>连载</navigator></view>
				</view>
			</view>
			<view class="top-right">
				<view class="search">
					<navigator url="../search/search"><image src="../../static/sousuo.png"></image></navigator>
				</view>
			</view>
		</view>
		<view class="article" v-for="(article,index) in articles" :key="index" v-show="recommend">
		<!-- 标题 -->
		<view class="title">
            <text class="article-title" @tap="gotoDetail(article.id)">{{article.title}}</text>
			</view>
			<!-- 大于等于三张图片的显示方式 -->
			<view class="one" v-if="article.imgs.length >= 3">
			<view class="thumbnail-box">
				<view class="thumbnail-item" v-for="(item,index1) in article.imgs" :key="index1">
					<image :src="item.imgUrl" class="img"></image>
				</view>
			</view>
			</view>
			<!-- 小于三种图片的显示方式 -->
			<view class="two" v-else-if="article.imgs.length>= 1">
			<view class="text-img-box">
				<view class="left">
					<text class="info-text2">{{handleContent(article.content)}}</text>
				</view>
				<view class="right"><image :src="article.imgs[article.imgs.length -1].imgUrl" class="img"></image>
				</view>
			</view>
			</view>
			<!-- 没有图片的显示方式 -->
			<view class="text-box" v-else>
				<text>{{article.title}}</text>
			</view>
			<!-- 文章作者等信息 -->
			<view class="article-info">
				<image :src="article.avatar" class="avatar1"></image>
				<text class="info-text">{{article.nickname}}</text>
				<text class="info-text1">{{handleTime(article.createTime)}}</text>
				<text class="info-text">评论{{comments.length}}</text>
			</view>
        </view>
		<navigator url="../write/write" hover-class="navigator-hover">
			<button class="circle-btn"><text class="icon-text">＋</text></button>
		</navigator>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				articles: [],
				comments:[],
				userId: uni.getStorageSync('login_key').userId,
				recommend: true,
				special: false,
				serialize: false
			}
		},
		onLoad: function() {
			this.getArticles();
			
		},
		onShow: function() {},
		onPullDownRefresh: function(){
			this.getArticles();
			
		},
		methods: {	
			clickshow: function() {
				this.recommend = true;
				this.special = false;
				this.serialize = false;
			},
			clickshow2: function() {
				this.recommend = false;
				this.special = true;
				this.serialize = false;
			},
			clickshow3: function() {
				this.recommend = false;
				this.special = false;
				this.serialize = true;
			},
			getArticles: function() {
			var _this= this;
			uni.request({
				url: this.apiServer + '/article/list',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded'},
				success: res => {
					_this.articles = res.data.data;
				},
				complete: function(){
					uni.stopPullDownRefresh();
				}
				});
			},
			gotoDetail:function(aId){
				uni.navigateTo({
					url: '../article_detail/article_detail?aId=' + aId
				});
			},
			handleContent:function(content){
				content = content.replace(/(\n)/g, "");
				content = content.replace(/(\t)/g, "");
				content = content.replace(/(\r)/g, "");
				content = content.replace(/<\/?[^>]*>/g, "");
				content = content.replace(/\s*/g, "");
				return content.substring(0,50);
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
	}
	};
</script>
<style>
.container{
	margin-top: 5px;
	background-color: #E6E7E9;
}
.article-info{
	display: flex;

}
.info-text{
	margin-left: 10px;
	margin-top: 10px;
}
.info-text1{
	margin-left: 10px;
	margin-right: 10px;
	margin-top: 10px;
}
.circle-btn {
	    position: fixed; 
	    right: 10px;
		bottom: 150px;
		width: 45px;
		height: 45px;
		border-radius: 50%;
		background-color: #de533a;
		background: linear-gradient(40deg, #ffd86f, #fc6262);
		box-shadow: 2px 5px 10px #D1D1D1;
		cursor: pointer;
		border: none;
		outline: none;
		display: flex;
		justify-content: center;
		align-items: center;

	}
    .icon-text {
		font-size: 15pt;
		color: #FFFFFF;
		font-weight: 700;
	}
	.top {
		width: 100%;
		height: 35px;
		background: #ffffff;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #aaa;
		/* border: 1px solid #00B26A; */
	}
	.top-left {
		margin-left: 3px;
		display: flex;
		width: 80%;
		/* border: 1px solid #007AFF; */
	}
	.top-left-box {
		height: 100%;
		display: flex;
		flex: 1 1 30%;
	}
	.top-right {
		margin-right: 10px;
		/* border: 1px solid #007AFF; */
	}
	.navigator {
		color: #fd572b;
		border-bottom: 2px solid #fd572b;
	}
	.search image {
		width: 32px;
		height: 32px;
	}
	.article{
		border: 1px solid rgb(238,238,238);
		margin-bottom: 7px;
		background-color: #FFFFFF;
	}
		
	.article-title{
		font-weight: 700;
		font-size: 23px;
	}
	.thumbnail-box{
		display: flex;
		width: 100%;
		height: 80px;
	}
	.thumbnail-item{
	flex: 1 1 33%;
	}
	.title{
	margin-bottom: 5px;
	}
.img{
	width: 100%;
	height: 100%;
}
.avatar1{
	width: 40px;
	height: 40px;
	border-radius: 50%;
}
.text-img-box{
	display: flex;
	width: 100%;
	height: 100px;
}
.left{
	flex: 1 1 70%;
}
.right{
	flex: 1 1 30%;
}
</style>
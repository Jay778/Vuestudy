<template>
	<view class="container">
		<view class="top">
			<view class="top-left">
				<view class="top-left-box">
					<view class="box" v-show="!recommend"><navigator @tap="clickshow()">推荐</navigator></view>
					<view class="box1" v-show="recommend"><navigator class="box1_text">推荐</navigator></view>
				</view>
				<view class="top-left-box">
					<view class="box" v-show="!special"><navigator @tap="clickshow2()">榜单</navigator></view>
					<view class="box1" v-show="special"><navigator class="box1_text">榜单</navigator></view>
				</view>
				<view class="top-left-box">
					<view class="box" v-show="!serialize"><navigator @tap="clickshow3()">专题</navigator></view>
					<view class="box1" v-show="serialize"><navigator class="box1_text">专题</navigator></view>
				</view>
				<view class="top-left-box">
					<view class="box" v-show="!four"><navigator @tap="clickshow4()">连载</navigator></view>
					<view class="box1" v-show="four"><navigator class="box1_text">连载</navigator></view>
				</view>
			</view>
			<view class="top-right">
				<view class="search">
				<image src="../../static/sousuo.png" class="search1"></image>
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
					<text class="left_text">{{handleContent(article.content)}}</text>
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
				<view>
				<text class="info-text">{{article.nickname}}</text>
				<text class="info-text">{{handleTime(article.createTime)}}</text>
				<text class="info-text">{{comments.length}}评论</text>
				<text class="info-text">32 赞</text>
				</view>
			</view>
        </view>
		<navigator url="../write/write" hover-class="navigator-hover">
		<image src="../../static/icon_write.png" class="write_img"></image>
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
				serialize: false,
				four:false,
				article:{	
					aId:0
				}
				
			};
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
				this.four=false;
			},
			clickshow2: function() {
				this.recommend = false;
				this.special = true;
				this.serialize = false;
				this.four=false;
			},
			clickshow3: function() {
				this.recommend = false;
				this.special = false;
				this.serialize = true;
				this.four=false;
			},
			clickshow4: function() {
				this.recommend = false;
				this.special = false;
				this.serialize = false;
				this.four=true;
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
			getContent:function(){
				var _this=this;
				uni.request({
					url:this.apiServer+'/article/'+aId,
					method:'GET',
					header:{'content-type': 'application/x-www-form-urlencoded'},
					success:res =>{
						_this.comments=res.data.data.comments;
					}
				})
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
<style scoped>
	
	.container{
	margin-top: 5px;
	background-color:rgb(244,244,244);
	}
	.top {
		margin-top: 30px;
		height: 35px;
		background: #ffffff;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid rgb(215,215,215);
		/* border: 1px solid #00B26A; */
	}
	.top-left {
		margin-left: 3px;
		display: flex;
		width: 80%;
		/* border: 1px solid #007AFF; */
	}
	.top-right{
		display: flex;
		margin-right: 4px;
	}
	.search{
		
	}
	.search1{
		margin-bottom: 10px;
	}
	.top-left-box {
		height: 100%;
		display: flex;
		flex: 1 1 30%;
	}
	.box{
		color: rgb(136,136,136);
		font-size: 17px;
	}
	.box1{
		border-bottom: 3px solid #fd572b;
	}
	.box1_text{
		font-size: 22px;
		font-weight: 600;
	}
	.top-right {
	margin-right: 10px;
		/* border: 1px solid #007AFF; */
	}
	.article{
		margin-bottom: 8px;
		background-color: #FFFFFF;
	}
	.article-info{
	display: flex;
	margin-top: 8px;
	
	}
	.info-text{
	margin-left: 10px;
	margin-top:10px;
	color: ;
	}
	.article-title{
		
	}
	.title{
	margin-bottom: 10px;
	font-weight: 500;
	font-size: 21px;
	
	}
	.left_text{
	font-size: 16px;
	}
	.info-text{
	margin-left: 10px;
	margin-top: 10px;
	font-size: 16px;
	color: rgb(136,136,136);
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
	.write_img{
		position: fixed; 
		right: 15px;
		bottom: 90px;
		width: 60px;
		height: 60px;
	}
    .icon-text {
		font-size: 15pt;
		color: #FFFFFF;
		font-weight: 700;
	}
	.navigator {
		color: #fd572b;
		border-bottom: 2px solid #fd572b;
	}
	.search image {
		width: 32px;
		height: 32px;
	}
	.article-title{
		font-weight: 700;
		font-size: 20px;
	}
	.thumbnail-box{
		display: flex;
		width: 100%;
		height: 80px;
	}
	.thumbnail-item{
	flex: 1 1 33%;
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
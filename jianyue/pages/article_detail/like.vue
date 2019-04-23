<template>
	<view class="container">
		<view class="article" v-for="(article,index) in articles" :key="index">
		<uni-swipe-action v-on:click="deletArticles(article.id)" :options="options">	
		<!-- 标题 -->
		<view class="title">
		    <text class="article-title" @tap="gotoDetail(article.toId)">{{article.title}}</text>
			</view>
			<!-- 大于等于三张图片的显示方式 -->
			<view class="one" v-if="article.imgs.length >=3">
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
			</uni-swipe-action>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue";
	export default{
		components:{
			uniSwipeAction
		},
		data() {
			return {
				options:[{
		        text: '删除',
		        style: {
		            backgroundColor: '#dd524d'
		        }
		    }],
			articles: [],
			article:{
				toId:0
			}
			}
		},
		onLoad: function() {
		this.getArticles();
		},
		onShow: function() {this.getArticle();
		},
		onPullDownRefresh: function(){
			this.getArticles();
			this.deletArticles()
		},
		methods:{
			getArticles:function(){
				var _this= this;
				uni.request({
					url: this.apiServer + '/collect/list?myUId='+uni.getStorageSync('login_key').userId,
					method: 'GET',
					header: { 'content-type': 'application/x-www-form-urlencoded'},
					success: res => {
						_this.articles = res.data.data;
						_this.article.toId=res.data.data.article.toId;
					},
					complete: function(){
						uni.stopPullDownRefresh();
					}
					});
			},
			deletArticles:function(){
				var _this=this;
				uni.request({
						method: 'POST',
						url:this.apiServer + '/collect/cancel',
						data: {
							myUId: this.userId,
							toId: this.article.toId
						},
						header: { 'content-type': 'application/x-www-form-urlencoded'},
						success: res => {
							uni.startPullDownRefresh();
						},
						complete: function(){
							uni.stopPullDownRefresh();
						}
					})
				},
			gotoDetail:function(toId){
				uni.navigateTo({
					url: '../article_detail/article_detail?aId=' + toId
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
				}
		}
	}
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
			font-size: 20pt;
			color: #fff;
		}
		.article{
		
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

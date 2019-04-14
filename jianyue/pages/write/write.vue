<template>
	<view class="container">
		<view class="head">
		<navigator class="look"  v-on:click= "handleClick" >预览</navigator>
		<navigator @tap="postArticle" class="new">发布</navigator>
		</view>
		<!-- 使用graceUI的富文本解析功能，来预览文章内容 -->
		<view class="grace-text" v-show="show===false">
			<rich-text :nodes="title" bindtap="tap"></rich-text>
			<rich-text :nodes="content" bindtap="tap"></rich-text>
		</view>
		<!-- 文章标题输入框，和title变量绑定 -->
		<view class="title" v-show="show">
		<input type="text" v-model="title" placeholder="请输入标题"  class="title1"/>
		</view>
		<!-- 选择图片的按钮，点击触发chooseImg方法 -->
		</hr>
		<navigator class="add-btn" @tap="chooseImg" v-show="show">
			<image src="../../static/tupian.png" class="img"></image>
		</navigator>
		<!-- 文章内容输入的多行文本域，绑定content变量 -->
		<view class="content1" v-show="show">
		<textarea placeholder="输入内容" v-model="content" class="content" />
		</view>
	</view>
</template>
<script>
	export default{
		data() {
	       return {
			title: '',
			content: '',
			userId: uni.getStorageSync('login_key').userId,
			imgs: [],
			show:true
		};
		},
		methods:{
			chooseImg: function() {
			var _this = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album'],
				success: function(res) {
					console.log(JSON.stringify(res.tempFilePaths));
					uni.uploadFile({
						url: _this.apiServer + '/avatar/upload',
						filePath: res.tempFilePaths[0],
						name: 'file',
						success: uploadFileRes => {
							//图片上传成功，回显图片地址
							console.log(uploadFileRes.data);
							//将图片地址加入imgs数组
							_this.imgs.push(uploadFileRes.data);
							//将图片地址拼接HTML标签，加入文章内容
							_this.content+='<img src="'+uploadFileRes.data+'" width="100%"/>';
						}
					});
				}
			});
		},
			// 发布文章
			postArticle: function() {
			var _this = this;
			uni.request({
				url: this.apiServer + '/article/add',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					uId: this.userId,
					title: this.title,
					content: '<div>' + this.content + '</div>'
				},
				success: res => {
					if (res.data.code === 0) {
						//获得发布文章成功返回的文章id
						var aId = res.data.data;
						console.log(aId);
						uni.showToast({
							title: '发布成功'
						});
						//将文章id和文章对应的图片地址数组传到后台，存入数据库
						uni.request({
							url: this.apiServer + '/img/add',
							method: 'POST',
							header: { 'content-type': 'application/x-www-form-urlencoded' },
							data: {
								aId: aId,
								imgs: JSON.stringify(_this.imgs)  //序列化imgs数组
							},
							success: res => {
								if (res.data.code === 0) {
									console.log('文章图片地址已写入数据库');
								}
							}
						});
						uni.switchTab({
							url: '../index/index'
						});
					}
				}
			});
		},
		handleClick: function(){
			//把当前show属性的值取反
			if(this.show===true){
				this.show=false;
			}else{
				this.show=true;
			}
		}
		}
	}
</script>

<style >
	.img{
		width: 30px;
		height: 30px;
		margin-bottom: 20px;
		margin-top: 10px;
	}
	.hr{
		border: 1px dashed #EEEEEE;
	}
	.head{
		display: flex;
		margin-top: 8px;
		width:100%;
		margin-bottom: 30px;
		border-bottom: 1px solid #EEEEEE;
		height: 30px;
	}
	.look{
		position: absolute;
		margin-right: 30px;
		right: 50px;
	}
	.new{
		position: absolute;
		display: flex;
		color: #E2231A;
		right: 20px;
		
	}
	.title{
		margin-top:10px;
		margin-bottom: 10px;
		border-bottom-style: dashed;
		border-bottom-color: #007AFF;
	}
	.title1{
		margin-bottom: 15px;
	}
	.content1{
		height: 200px;
	}
</style>
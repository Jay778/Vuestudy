<template>
	<view>
	<input class="input" type="text" v-model="changenickname" required="required" value=""/>
	<button @tap="changeNickname(changenickname)" class="btn">确认</button>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				changenickname:''
			};
		},
		onLoad() {
	},
		methods:{
		changeNickname:function(changenickname){
			var _this = this;
			uni.request({
			url: this.apiServer+'/user/nickname?id='+uni.getStorageSync('login_key').userId,
			method:'put',
			data:changenickname,
			header: { 'content-type':'application/json' },
				success: res => {
					uni.navigateBack();
					}
			});
		}	
		}
	}
</script>

<style scoped>
	.input{
		height: 40px;
		border: 1px solid #eee;
		border-radius: 5px;
		margin-bottom: 10px;
	}
	.btn{
		background-color: rgb(120,193,43);
	}
</style>

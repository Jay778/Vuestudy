<template>
	<view>
		<input type="password" v-model="changepassword" required="required" value=""/>
		<button @tap="changePassword(changepassword)" class="btn">确认</button>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				changepassword:''
			};
		},
		onLoad() {
	},
		methods:{
		changePassword:function(changepassword){
			var _this = this;
			uni.request({
			url: this.apiServer+'/user/password?id='+uni.getStorageSync('login_key').userId,
			method:'put',
			data:changepassword,
			header: { 'content-type':'application/json' },
				success: res => {
					uni.navigateBack();
					}
			});
		}	
		}
	}
</script>

<style >
	input{
		height: 40px;
		border: 1px solid #eee;
		border-radius: 5px;
		margin-bottom: 10px;
	}
	.btn{
		background-color: rgb(120,193,43);
	}
</style>

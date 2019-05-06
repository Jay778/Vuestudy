<template>
	<div id="app">
		<header>
		<div class="header">
			<div class="menu">
			<div class="left">
				<img src="./assets/logo_njy.png" class="img"/>
				</div>
				<div class="right">
				<li id="home">
				<router-link to="/index" class="right_text right_style">首页</router-link>
				</li>
				<li id="news">
				<router-link to="/news" class="right_text right_style">资讯</router-link>
				</li>
				<li id="video">
				<router-link to="/video" class="right_text right_style">视频</router-link>
				</li>
				<li id="ask">
				<router-link to="/ask" class="right_text right_style">提问</router-link>
				</li>
				<li id="index">
				<router-link to="/index" class="right_text right_style">交流</router-link>
				</li>
				<li id="zhibo">
				<router-link to="/zhibo" class="right_text right_style">直播</router-link>
				</li>
				</div>
				</div>
		</div>
</header>
</div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header{
	width: 100%;
	height: 138px;
	background-color: #FFFFFF;
}
.menu{
	display: flex;
	padding-top: 1%;
	width: 1024px;
	margin: 0 auto;
}

.left{
	
}
.right{
	
	height: 124px;
	margin-left:120px;
}
.img{
height: 140px;
vertical-align: middle;
margin-right: 60px;
margin-top: -2%;
}
.right_text{
height: 100px;
vertical-align: middle;
line-height: 100px;
text-decoration: none;
color: #818996;
padding: 1.5em 1.5em;
}
.right_style{
border-bottom: 2px solid #009e01;
color: #009e01;
font-weight: bold;
background-color: #009e01;
color: white;
}
#home{

}
li{
list-style: none;
float: left;
padding: 0;
margin-top: 5px;
height: 100px;
width: 80px;
background-color: #009e01;
}
</style>

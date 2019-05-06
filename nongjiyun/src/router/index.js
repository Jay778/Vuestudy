import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
	mode:"history",
  routes: [
    {
      path: '/index',
      name: 'Home',
			component: resolve => require(['../components/Home.vue'], resolve)
    },
		{
			  path: '/news',
				name: 'News',
				component: resolve => require(['../components/News.vue'], resolve)
		},
	  { 
			path: '/video',
			name: 'Video',
			 component: resolve => require(['../components/Video.vue'], resolve)
		},
		{
			path: '/ask',
			name: 'Ask',
			 component: resolve => require(['../components/Ask.vue'], resolve)
		},
		{
			path: '/zhibo',
			name: 'Zhibo',
			 component: resolve => require(['../components/Zhibo.vue'], resolve)
		}
  ]
})

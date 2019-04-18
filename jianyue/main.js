import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.apiServer = 'http://47.102.222.43/api'

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

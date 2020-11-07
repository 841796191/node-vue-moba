import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入全局样式
import './assets/scss/style.scss'
import router from './router'

//引入iconfont
import './assets/iconfont/iconfont.css'

//引入轮播组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper,/* {default global options} */)

//引入封装组件
import Card from './components/Cart.vue'
Vue.component('m-card',Card)

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card',ListCard)

//引入axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL:'http://localhost:3008/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

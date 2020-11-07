import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './style.css'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http=http

//mixin要写在new Vue()前面,写的方法属性能在全局引用
Vue.mixin({
  computed: {
    mixin_uploadUrl(){
      return this.$http.defaults.baseURL+'/upload'
    }
  },
  methods: {
    mixin_getAuthHeaders(){
      return {
        Authorization:`Bearer ${localStorage.token || ''}`
      }
    }
  },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

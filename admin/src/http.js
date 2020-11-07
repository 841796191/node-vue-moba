import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http=axios.create({
    baseURL:'http://localhost:3008/admin/api'
})

//设置请求头携带token便于后台验证
http.interceptors.request.use(function(config){
    if (localStorage.token) {
        //设置请求头信息
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
},function(error){
    return Promise.reject(error)
})
// http.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     if (localStorage.token) {
//       config.headers.Authorization = 'Bearer ' + localStorage.token
//     }
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

//设置response的全局拦截器,拦截后台传回的报错信息
http.interceptors.response.use(res=>{
    return res
},err=>{
    if(err.response.data.message){
        //err.response.data中的信息可以跟后端约定
        // console.log(err.response.data.message)
        //通过Vue把返回的错误信息展示出来,$message是添加element-ui时element添加上去的
        Vue.prototype.$message({
            type:'error',//指定提示框类型
            message:err.response.data.message
        })


        if(err.response.status===401){
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

export default http
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/login',name:'login',component:Login,meta:{isPublic:true}},
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {path:'/categories/create',component:CategoryEdit},
      //props:true  把url中的id注入到CategoryEdit页面里面
      {path:'/categories/edit/:id',component:CategoryEdit,props:true},
      {path:'/categories/list',component:CategoryList},

      {path:'/items/create',component:ItemEdit},
      //props:true  把url中的id注入到CategoryEdit页面里面
      {path:'/items/edit/:id',component:ItemEdit,props:true},
      {path:'/items/list',component:ItemList},

      {path:'/heroes/create',component:HeroEdit},
      //props:true  把url中的id注入到CategoryEdit页面里面
      {path:'/heroes/edit/:id',component:HeroEdit,props:true},
      {path:'/heroes/list',component:HeroList},

      {path:'/articles/create',component:ArticleEdit},
      //props:true  把url中的id注入到CategoryEdit页面里面
      {path:'/articles/edit/:id',component:ArticleEdit,props:true},
      {path:'/articles/list',component:ArticleList},

      {path:'/ads/create',component:AdEdit},
      //props:true  把url中的id注入到CategoryEdit页面里面
      {path:'/ads/edit/:id',component:AdEdit,props:true},
      {path:'/ads/list',component:AdList},

      {path:'/admin_users/create',component:AdminUserEdit},
      //props:true  把url中的id注入到CategoryEdit页面里面
      {path:'/admin_users/edit/:id',component:AdminUserEdit,props:true},
      {path:'/admin_users/list',component:AdminUserList}
    ]
  }
]

const router = new VueRouter({
  routes
})
//全局前置守卫，路由前端校验登录
router.beforeEach((to,from,next)=>{
  //meta在前面不用登录的页面设置isPublic=true,该页面就可以不用登录就能访问
  //判断路由设置和token
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})



export default router

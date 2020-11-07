<template>
    <el-container style="height: 100vh;">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <!-- unique-opened 一次只能展开一个子菜单 :default-active="$route.path" 根据路由高亮导航栏-->
            <el-menu router :default-openeds="dd" unique-opened :default-active="$route.path">
            <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-message"></i>内容管理
                </template>
                
                <el-menu-item-group>
                <template slot="title">物品</template>
                <el-menu-item index="/items/create">新建物品</el-menu-item>
                <el-menu-item index="/items/list">物品列表</el-menu-item>
                </el-menu-item-group>

                <el-menu-item-group>
                <template slot="title">英雄</template>
                <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
                <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
                </el-menu-item-group>

                <el-menu-item-group>
                <template slot="title">文章</template>
                <el-menu-item index="/articles/create">新建文章</el-menu-item>
                <el-menu-item index="/articles/list">文章列表</el-menu-item>
                </el-menu-item-group>

            </el-submenu>
            

            <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-message"></i>运营管理
                </template>
                
                <el-menu-item-group>
                <template slot="title">广告位</template>
                <el-menu-item index="/ads/create">新建广告位</el-menu-item>
                <el-menu-item index="/ads/list">广告位列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-message"></i>系统设置
                </template>
                <el-menu-item-group>
                  <template slot="title">分类</template>
                  <el-menu-item index="/categories/create">新建分类</el-menu-item>
                  <el-menu-item index="/categories/list">分类列表</el-menu-item>
                </el-menu-item-group>

                <el-menu-item-group>
                  <template slot="title">管理员</template>
                  <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
                  <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
                </el-menu-item-group>
              
            </el-submenu>



            </el-menu>
        </el-aside>
    
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
            
            <el-button type="danger" round size="mini" @click="logout">退出登录</el-button>
            </el-header>
            
            <el-main>
              <!-- 绑定key是为了区分使用同一个组件的信息 -->
              <router-view :key="$route.path"></router-view>
              <!-- <el-table :data="tableData">
                  <el-table-column prop="date" label="日期" width="140">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" width="120">
                  </el-table-column>
                  <el-table-column prop="address" label="地址">
                  </el-table-column>
              </el-table> -->
            </el-main>
        </el-container>
    </el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      return {
       dd:['1']
      }
    },
    methods: {
      logout(){
        localStorage.clear()
        this.$router.push('/login')
        this.$message({
          type:'success',
          message:'成功退出'
        })
      }
    },
  };
</script>
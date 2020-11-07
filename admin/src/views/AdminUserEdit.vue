<template>
    <div class="about">
        <h1>{{id?'编辑':'新建'}}管理员</h1>
        <!-- label-width让el-form-item和el-input同一行显示 -->
        <!-- @submit.native.prevent阻止原生默认跳转事件，触发save函数 -->
        <el-form label-width="80px" @submit.native.prevent="save">
            
            <el-form-item label="用户名">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="model.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>    
</template>

<script>
export default {
    props:{//接收路由中props传的id,这样就不用写this.$route.params.xxxx
        id:{}
    },
    data(){
        return {
            model:{}
        }
    },
    methods: {
        async save(){
            let res
            if(this.id){//通过判断有没有id传过来决定使用post还是put
                //修改
                res= await this.$http.put(`rest/admin_users/${this.id}`,this.model)
            }else{
                //新建
                res= await this.$http.post('rest/admin_users',this.model)
            }
            
            if(res){
                //发送请求成功后跳转回categories/list页
                this.$router.push('/admin_users/list')
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
            }else{
                this.$message({
                    type:'fail',
                    message:'保存失败'
                })
            }
        },

        async fetch(){
            //通过id获取分类信息
            const res=await this.$http.get(`rest/admin_users/${this.id}`)
            this.model=res.data 
        },
    },

    created() {
        //当有id传过来才执行函数获取分类信息
        this.id && this.fetch()
    },
    watch:{//解决从编辑页点击新建页后保存时出错
        '$route.path':function(newVal){
            if(newVal==='/admin_users/create'){
                this.model={}
            }
        }
    }
}
</script>
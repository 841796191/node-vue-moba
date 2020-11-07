<template>
    <div class="about">
        <h1>{{id?'编辑':'新建'}}分类</h1>
        <!-- label-width让el-form-item和el-input同一行显示 -->
        <!-- @submit.native.prevent阻止原生默认跳转事件，触发save函数 -->
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="上级分类">
                <el-select v-model="model.parent">
                    <!-- :label展示选项的名称,:value是选中选项后要传的值 -->
                    <el-option v-for="item in parents" :key="item._id"
                    :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
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
            model:{},
            parents:[]
        }
    },
    methods: {
        async save(){
            let res
            if(this.id){//通过判断有没有id传过来决定使用post还是put
                //修改
                res= await this.$http.put(`rest/categories/${this.id}`,this.model)
            }else{
                //新建
                res= await this.$http.post('rest/categories',this.model)
            }
            
            if(res){
                //发送请求成功后跳转回categories/list页
                this.$router.push('/categories/list')
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
            const res=await this.$http.get(`rest/categories/${this.id}`)
            this.model=res.data 
        },

        async fetchParents(){
            const res=await this.$http.get(`rest/categories`)
            this.parents=res.data
        }
    },

    created() {
        //获取父级分类信息
        this.fetchParents()
        //当有id传过来才执行函数获取分类信息
        this.id && this.fetch()
    },
}
</script>
<template>
    <div class="about">
        <h1>{{id?'编辑':'新建'}}文章</h1>
        <!-- label-width让el-form-item和el-input同一行显示 -->
        <!-- @submit.native.prevent阻止原生默认跳转事件，触发save函数 -->
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="所属分类">
                <el-select v-model="model.categories" multiple>
                    <!-- :label展示选项的名称,:value是选中选项后要传的值 -->
                    <el-option v-for="item in categories" :key="item._id"
                    :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="详情">
                <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>    
</template>

<script>
import {VueEditor} from 'vue2-editor'
export default {
    props:{//接收路由中props传的id,这样就不用写this.$route.params.xxxx
        id:{}
    },
    components:{
        VueEditor
    },
    data(){
        return {
            model:{},
            categories:[]
        }
    },
    methods: {
        async handleImageAdded(file,Editor,cursorLocation,resetUploader){
            const formData=new FormData()
            formData.append("file",file)

            const res=await this.$http.post('upload',formData)
            Editor.insertEmbed(cursorLocation,"image",res.data.url)
            resetUploader()
        },


        async save(){
            let res
            if(this.id){//通过判断有没有id传过来决定使用post还是put
                //修改
                res= await this.$http.put(`rest/articles/${this.id}`,this.model)
            }else{
                //新建
                res= await this.$http.post('rest/articles',this.model)
            }
            
            if(res){
                //发送请求成功后跳转回categories/list页
                this.$router.push('/articles/list')
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
            const res=await this.$http.get(`rest/articles/${this.id}`)
            this.model=res.data 
        },

        async fetchCategories(){
            const res=await this.$http.get(`rest/categories`)
            this.categories=res.data
        }
    },

    created() {
        //获取分类信息
        this.fetchCategories()
        //当有id传过来才执行函数获取分类信息
        this.id && this.fetch()
    },
}
</script>
<template>
    <div class="about">
        <h1>{{id?'编辑':'新建'}}物品</h1>
        <!-- label-width让el-form-item和el-input同一行显示 -->
        <!-- @submit.native.prevent阻止原生默认跳转事件，触发save函数 -->
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <!-- headers调用函数为上传图片添加token信息,不然会上传失败 -->
                <el-upload
                class="avatar-uploader"
                :action="mixin_uploadUrl"
                :headers="mixin_getAuthHeaders()"
                :show-file-list="false"
                :on-success="afterUpload"
                >
                <!-- 有图片地址则展示图片,没有就显示设置好的图标 -->
                <img v-if="model.icon" :src="model.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
            model:{
                icon:''
            }
        }
    },
    methods: {
        afterUpload(res){
            console.log(res)
            //显式赋值,以引起vue响应,不然给对象直接添加属性vue不会响应
            this.$set(this.model,'icon',res.url)
            // this.model.icon=res.url
        },

        async save(){
            let res
            if(this.id){//通过判断有没有id传过来决定使用post还是put
                //修改
                res= await this.$http.put(`rest/items/${this.id}`,this.model)
            }else{
                //新建
                res= await this.$http.post('rest/items',this.model)
            }
            
            if(res){
                //发送请求成功后跳转回categories/list页
                this.$router.push('/items/list')
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
            const res=await this.$http.get(`rest/items/${this.id}`)
            this.model=res.data 
        }
    },

    created() {
        //当有id传过来才执行函数获取分类信息
        this.id && this.fetch()
    },
}
</script>

<style>
 
</style>
<template>
    <div class="about">
        <h1>{{id?'编辑':'新建'}}广告位</h1>
        <!-- label-width让el-form-item和el-input同一行显示 -->
        <!-- @submit.native.prevent阻止原生默认跳转事件，触发save函数 -->
        <el-form label-width="80px" @submit.native.prevent="save">
            
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>


            <el-form-item label="广告">
                <!-- type="text" 显示纯文本图标 -->
                <el-button @click="model.items.push({})"> <i class="el-icon-plus"></i> 添加广告</el-button>
                <el-row type="flex" style="flex-wrap:wrap">
                        <el-col :md="12" v-for="(item,i) in model.items" :key="i">
                        <el-form-item label="跳转链接(URL)" label-width="150px">
                            <el-input v-model="item.url"></el-input>
                        </el-form-item>
                        <el-form-item label="图片" style="margin-top:0.5rem;" label-width="150px">
                            <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL+'/upload'"
                            :show-file-list="false"
                            :on-success="res=>$set(item,'image',res.url)"
                            >
                                <!-- 有图片地址则展示图片,没有就显示设置好的图标 -->
                                <img v-if="item.image" :src="item.image" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        
                        <el-form-item label-width="150px">
                            <el-button size="small" type="danger" @click="model.items.splice(i,1)">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>

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
                items:[]
            }
        }
    },
    methods: {
        async save(){
            let res
            if(this.id){//通过判断有没有id传过来决定使用post还是put
                //修改
                res= await this.$http.put(`rest/ads/${this.id}`,this.model)
            }else{
                //新建
                res= await this.$http.post('rest/ads',this.model)
            }
            
            if(res){
                //发送请求成功后跳转回categories/list页
                this.$router.push('/ads/list')
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
            const res=await this.$http.get(`rest/ads/${this.id}`)
            this.model=Object.assign({},this.model,res.data)
        },

    },

    created() {
        //当有id传过来才执行函数获取分类信息
        this.id && this.fetch()
    },
}
</script>

<style>
  
</style>
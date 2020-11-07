<template>
    <div class="about">
        <h1>{{id?'编辑':'新建'}}英雄</h1>
        <!-- label-width让el-form-item和el-input同一行显示 -->
        <!-- @submit.native.prevent阻止原生默认跳转事件，触发save函数 -->
        <el-form label-width="80px" @submit.native.prevent="save">
            
            <el-tabs value="basic" type="border-card">
                <!--el-tabs的value填下面el-tabs-pane的name则默认展开哪个-->
                <el-tab-pane label="基础信息" name="basic">
                    <el-form-item label="名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <!-- 上传头像 -->
                    <el-form-item label="头像">
                        <el-upload 
                        class="avatar-uploader"
                        :action="mixin_uploadUrl"
                        :headers="mixin_getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="res => $set(model,'avatar',res.url)"
                        >
                        <!-- 有图片地址则展示图片,没有就显示设置好的图标 -->
                        <img v-if="model.avatar" :src="model.avatar" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <!-- 上传banner -->
                    <el-form-item label="Banner">
                        <el-upload
                        class="avatar-uploader"
                        :action="mixin_uploadUrl"
                        :headers="mixin_getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="res => $set(model,'banner',res.url)"
                        >
                        <!-- 有图片地址则展示图片,没有就显示设置好的图标 -->
                        <img v-if="model.banner" :src="model.banner" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>

                    <el-form-item label="类型">
                        <el-select v-model="model.categories" multiple>
                            <el-option v-for="item of categories" :key="item._id"
                            :label="item.name" :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="难度">
                        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
                    </el-form-item>

                    <el-form-item label="顺风出装">
                        <el-select v-model="model.items1" multiple>
                            <el-option v-for="item of items" :key="item._id"
                            :label="item.name" :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="逆风出装">
                        <el-select v-model="model.items2" multiple>
                            <el-option v-for="item of items" :key="item._id"
                            :label="item.name" :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane label="技能" name="skills">
                    <!-- type="text" 显示纯文本图标 -->
                    <el-button @click="model.skills.push({})"> <i class="el-icon-plus"></i> 添加技能</el-button>
                    <el-row type="flex" style="flex-wrap:wrap">
                        <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
                            <el-form-item label="名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload
                                class="avatar-uploader"
                                :action="mixin_uploadUrl"
                                :headers="mixin_getAuthHeaders()"
                                :show-file-list="false"
                                :on-success="res=>$set(item,'icon',res.url)"
                                >
                                <!-- 有图片地址则展示图片,没有就显示设置好的图标 -->
                                <img v-if="item.icon" :src="item.icon" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>

                            <el-form-item label="冷却值">
                                <el-input v-model="item.delay"></el-input>
                            </el-form-item>

                            <el-form-item label="消耗">
                                <el-input v-model="item.cost"></el-input>
                            </el-form-item>

                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="item.description"></el-input>
                            </el-form-item>
                            <el-form-item label="小提示">
                                <el-input type="textarea" v-model="item.tips"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>

                <el-tab-pane label="最佳搭档" name="partners">
                    <el-button size="small" @click="model.partners.push({})">
                        <i class="el-icon-plus"></i>添加英雄
                    </el-button>
                    <el-row type="flex" style="flex-wrap:wrap">
                        <el-col :md="12" v-for="(item,i) in model.partners" :key="i">
                            <el-form-item label="英雄">
                                <!-- filterable属性让选择框可以输入信息搜索列表 -->
                                <el-select filterable v-model="item.hero">
                                    <el-option 
                                    v-for="hero in heroes" 
                                    :key="hero._id" 
                                    :value="hero._id" 
                                    :label="hero.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="描述">
                                <el-input v-model="item.description" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="danger" @click="model.partners.splice(i,i)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            
            <el-form-item style="margin-top:1rem;">
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
            categories:[],
            items:[],
            heroes:[],//英雄列表
            model:{
                name:'',
                avatar:'',
                skills:[],
                partners:[],
                scores:{
                    diffcults:0,
                    skills:0,
                    attack:0,
                    survive:0
                }
            }
        }
    },
    methods: {
        // afterUpload(res){
        //     console.log(res)
        //     //显式赋值,以引起vue响应,不然给对象直接添加属性vue不会响应
        //     // this.$set(this.model,'avatar',res.url)
        //     this.model.avatar=res.url
        // },

        async save(){
            let res
            if(this.id){//通过判断有没有id传过来决定使用post还是put
                //修改
                res= await this.$http.put(`rest/heroes/${this.id}`,this.model)
            }else{
                //新建
                res= await this.$http.post('rest/heroes',this.model)
            }
            
            if(res){
                //发送请求成功后跳转回categories/list页

                // this.$router.push('/heroes/list')

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
            const res=await this.$http.get(`rest/heroes/${this.id}`)
            //后端没有返回scores,为了防止model.scores被覆盖,用Object.assign赋值
            this.model=Object.assign({},this.model,res.data) 
        },

        async fetchCategories(){
            //通过id获取职业分类信息
            const res=await this.$http.get(`rest/categories`)
            this.categories=res.data 
        },

        async fetchItems(){
            //通过id获取分类信息
            const res=await this.$http.get(`rest/items`)
            this.items=res.data 
        },

        async fetchHeroes(){
            //通过id获取英雄列表信息
            const res=await this.$http.get(`rest/heroes`)
            this.heroes=res.data 
        }
    },

    created() {
        this.fetchCategories()//获取职业分类
        this.fetchItems()//获取装备数据
        this.fetchHeroes()//获取英雄列表
        //当有id传过来才执行函数获取分类信息
        this.id && this.fetch()
    },
}
</script>

<style>
 
</style>
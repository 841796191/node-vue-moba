const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    username:{type:String},
    password:{
        type:String,
        select:false,//添加select后编辑时不给密码,防止密码被多次加密
        set(val){
            return require('bcryptjs').hashSync(val,5)
        }
    }
})


module.exports=mongoose.model('AdminUser',schema)
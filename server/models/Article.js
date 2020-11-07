const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    title:{type:String},
    body:{type:String}
},{
    timestamps:true//时间戳,录入数据时自动添加时间
})


module.exports=mongoose.model('Article',schema)
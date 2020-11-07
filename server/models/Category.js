const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    name:{type:String},
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}
})

schema.virtual('children',{
    localField:'_id',
    foreignField:'parent',
    justOne:false,
    ref:'Category'
})

//Article中原先已录入了各种标题，所以现在通过virtual关联Article中的
//categories,就可以通过父id匹配子id
schema.virtual('newsList',{
    localField:'_id',
    foreignField:'categories',
    justOne:false,
    ref:'Article'
})

//导出模型
module.exports=mongoose.model('Category',schema)
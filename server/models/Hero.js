const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    name:{type:String},
    avatar:{type:String},
    banner:{type:String},
    title:{type:String},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    scores:{
        difficult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number}
    },
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String},
        delay:{type:String},
        cost:{type:String}
    }],
    items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    usageTips:{type:String},
    battleTips:{type:String},
    teamTips:{type:String},
    partners:[{
        hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description:{type:String}
    }]
})

//指定集合名称为heroes，不然会自动Hero变为小写复数形式填充进第三个参数，
//但其变复数形式不准确，会变为heros
module.exports=mongoose.model('Hero',schema,'heroes')
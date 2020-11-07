module.exports=app=>{
    const mongoose=require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:true
    })

    //引用某个文件夹下的所有文件
    require('require-all')(__dirname + '/../models')

    
}